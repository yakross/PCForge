import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../config/database'
import { cache } from '../config/redis'

// Regional pricing data with real-world multipliers
const REGIONAL_PRICING = [
  {
    region: 'us',
    country: 'United States',
    currency: 'USD',
    symbol: '$',
    multiplier: 1.0,
    vatRate: 0,
    importTax: 0,
    notes: 'Base price. No federal VAT. State taxes vary (0-10%).',
  },
  {
    region: 'co',
    country: 'Colombia',
    currency: 'COP',
    symbol: '$',
    multiplier: 1.28,
    vatRate: 0.19,
    importTax: 0.10,
    exchangeRate: 4100,
    notes: 'IVA 19%, arancel importación ~10-15%, logística y distribución.',
  },
  {
    region: 'mx',
    country: 'México',
    currency: 'MXN',
    symbol: '$',
    multiplier: 1.18,
    vatRate: 0.16,
    importTax: 0.05,
    exchangeRate: 17.5,
    notes: 'IVA 16%, arancel ~5%. Menor costo logístico por cercanía a USA.',
  },
  {
    region: 'ar',
    country: 'Argentina',
    currency: 'ARS',
    symbol: '$',
    multiplier: 1.55,
    vatRate: 0.21,
    importTax: 0.35,
    exchangeRate: 890,
    notes: 'IVA 21%, impuesto PAIS 30%, percepción AFIP 35%. Mayor sobrecosto de LATAM.',
  },
  {
    region: 'br',
    country: 'Brasil',
    currency: 'BRL',
    symbol: 'R$',
    multiplier: 1.38,
    vatRate: 0.17,
    importTax: 0.20,
    exchangeRate: 5.0,
    notes: 'ICMS ~17%, II (imposto de importação) ~20%. Mercado con alta tributación.',
  },
  {
    region: 'cl',
    country: 'Chile',
    currency: 'CLP',
    symbol: '$',
    multiplier: 1.22,
    vatRate: 0.19,
    importTax: 0.06,
    exchangeRate: 950,
    notes: 'IVA 19%, arancel ~6%. Mercado relativamente accesible en LATAM.',
  },
  {
    region: 'de',
    country: 'Alemania',
    currency: 'EUR',
    symbol: '€',
    multiplier: 1.08,
    vatRate: 0.19,
    importTax: 0,
    exchangeRate: 0.92,
    notes: 'MwSt 19%. Libre comercio UE. Precios muy similares a USA.',
  },
  {
    region: 'gb',
    country: 'Reino Unido',
    currency: 'GBP',
    symbol: '£',
    multiplier: 1.12,
    vatRate: 0.20,
    importTax: 0.03,
    exchangeRate: 0.79,
    notes: 'VAT 20%, leve impacto Brexit en importaciones desde Asia.',
  },
  {
    region: 'jp',
    country: 'Japón',
    currency: 'JPY',
    symbol: '¥',
    multiplier: 0.92,
    vatRate: 0.10,
    importTax: 0,
    exchangeRate: 155,
    notes: 'Consumo 10%. Yen débil hace que USD compre más. Frecuentemente más barato que USA.',
  },
  {
    region: 'au',
    country: 'Australia',
    currency: 'AUD',
    symbol: 'A$',
    multiplier: 1.15,
    vatRate: 0.10,
    importTax: 0.05,
    exchangeRate: 1.54,
    notes: 'GST 10%, duty ~5%. Premium por distancia logística.',
  },
  {
    region: 'ca',
    country: 'Canadá',
    currency: 'CAD',
    symbol: 'CA$',
    multiplier: 1.05,
    vatRate: 0.05,
    importTax: 0,
    exchangeRate: 1.37,
    notes: 'GST 5% federal. Libre comercio USMCA. Muy similar a precios USA.',
  },
  {
    region: 'cn',
    country: 'China',
    currency: 'CNY',
    symbol: '¥',
    multiplier: 0.95,
    vatRate: 0.13,
    importTax: 0,
    exchangeRate: 7.25,
    notes: 'IVA 13%. Manufactura local hace que algunos componentes sean más baratos.',
  },
]

export async function pricingRoutes(fastify: FastifyInstance) {
  // ─── Get All Regions ──────────────────────────────────────────────────────
  fastify.get('/regions', async (request, reply) => {
    return reply.send({ success: true, data: REGIONAL_PRICING })
  })

  // ─── Get Product Prices by Region ─────────────────────────────────────────
  fastify.get('/product/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const cacheKey = `pricing:product:${id}`

    const cached = await cache.get(cacheKey)
    if (cached) return reply.send({ success: true, data: cached })

    const product = await prisma.product.findUnique({
      where: { id, isActive: true },
      select: { id: true, name: true, price: true, category: true },
    })

    if (!product) return reply.status(404).send({ success: false, error: 'Product not found' })

    const regionalPrices = REGIONAL_PRICING.map((region) => {
      const localPrice = product.price * region.multiplier
      const localPriceWithCurrency =
        region.exchangeRate ? localPrice * region.exchangeRate : localPrice

      return {
        ...region,
        usdBase: product.price,
        localPrice: Math.round(localPrice * 100) / 100,
        localPriceFormatted: localPriceWithCurrency,
        diffPercent: Math.round((region.multiplier - 1) * 100),
        diffUsd: Math.round((localPrice - product.price) * 100) / 100,
      }
    })

    const result = { product, prices: regionalPrices }
    await cache.set(cacheKey, result, 3600)
    return reply.send({ success: true, data: result })
  })

  // ─── Get Build Total by Region ────────────────────────────────────────────
  fastify.post('/build', async (request, reply) => {
    const body = z.object({
      productIds: z.array(z.string()).min(1),
      region: z.string().default('us'),
    }).parse(request.body)

    const region = REGIONAL_PRICING.find((r) => r.region === body.region)
    if (!region) return reply.status(400).send({ success: false, error: 'Invalid region' })

    const products = await prisma.product.findMany({
      where: { id: { in: body.productIds } },
      select: { id: true, name: true, price: true, category: true },
    })

    const items = products.map((p) => {
      const localPrice = p.price * region.multiplier
      return {
        ...p,
        usdPrice: p.price,
        localPrice: Math.round(localPrice * 100) / 100,
        localPriceFormatted: region.exchangeRate
          ? Math.round(localPrice * region.exchangeRate)
          : Math.round(localPrice * 100) / 100,
      }
    })

    const usdTotal = items.reduce((s, i) => s + i.usdPrice, 0)
    const localTotal = items.reduce((s, i) => s + i.localPrice, 0)

    return reply.send({
      success: true,
      data: {
        region,
        items,
        summary: {
          usdTotal: Math.round(usdTotal * 100) / 100,
          localTotal: Math.round(localTotal * 100) / 100,
          localTotalFormatted: region.exchangeRate
            ? Math.round(localTotal * region.exchangeRate)
            : Math.round(localTotal * 100) / 100,
          diffPercent: Math.round((region.multiplier - 1) * 100),
          diffUsd: Math.round((localTotal - usdTotal) * 100) / 100,
          currency: region.currency,
          symbol: region.symbol,
        },
      },
    })
  })

  // ─── Compare Price Across All Regions for a Build ─────────────────────────
  fastify.post('/build/compare', async (request, reply) => {
    const body = z.object({
      productIds: z.array(z.string()).min(1),
    }).parse(request.body)

    const products = await prisma.product.findMany({
      where: { id: { in: body.productIds } },
      select: { id: true, name: true, price: true },
    })

    const usdTotal = products.reduce((s, p) => s + p.price, 0)

    const comparison = REGIONAL_PRICING.map((region) => {
      const localTotal = usdTotal * region.multiplier
      return {
        region: region.region,
        country: region.country,
        currency: region.currency,
        symbol: region.symbol,
        multiplier: region.multiplier,
        usdEquivalent: Math.round(localTotal * 100) / 100,
        localFormatted: region.exchangeRate
          ? Math.round(localTotal * region.exchangeRate)
          : Math.round(localTotal * 100) / 100,
        diffPercent: Math.round((region.multiplier - 1) * 100),
        notes: region.notes,
      }
    }).sort((a, b) => a.multiplier - b.multiplier)

    return reply.send({
      success: true,
      data: {
        usdBase: Math.round(usdTotal * 100) / 100,
        productCount: products.length,
        comparison,
        cheapest: comparison[0],
        mostExpensive: comparison[comparison.length - 1],
      },
    })
  })
}

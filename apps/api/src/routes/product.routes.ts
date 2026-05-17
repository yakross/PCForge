import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../config/database'
import { cache } from '../config/redis'
import { authenticate, requireAdmin, optionalAuth } from '../middleware/auth.middleware'

const productQuerySchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  search: z.string().optional(),
  sort: z.enum(['price_asc', 'price_desc', 'rating', 'newest']).default('newest'),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  featured: z.coerce.boolean().optional(),
})

export async function productRoutes(fastify: FastifyInstance) {
  // ─── List Products ────────────────────────────────────────────────────────
  fastify.get('/', { preHandler: optionalAuth }, async (request, reply) => {
    const query = productQuerySchema.parse(request.query)
    const cacheKey = `products:${JSON.stringify(query)}`

    const cached = await cache.get(cacheKey)
    if (cached) return reply.send({ success: true, ...cached })

    const where: any = { isActive: true }
    if (query.category) where.category = query.category.toUpperCase()
    if (query.brand) where.brand = { contains: query.brand, mode: 'insensitive' }
    if (query.minPrice || query.maxPrice) {
      where.price = {}
      if (query.minPrice) where.price.gte = query.minPrice
      if (query.maxPrice) where.price.lte = query.maxPrice
    }
    if (query.featured !== undefined) where.isFeatured = query.featured
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { brand: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ]
    }

    const orderBy: any = {
      price_asc: { price: 'asc' },
      price_desc: { price: 'desc' },
      rating: { reviews: { _count: 'desc' } },
      newest: { createdAt: 'desc' },
    }[query.sort]

    const skip = (query.page - 1) * query.limit
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: query.limit,
        include: {
          specs: true,
          reviews: { select: { rating: true } },
          _count: { select: { reviews: true } },
        },
      }),
      prisma.product.count({ where }),
    ])

    const result = {
      data: products.map((p) => ({
        ...p,
        rating: p.reviews.length
          ? p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length
          : 0,
        reviewCount: p._count.reviews,
        reviews: undefined,
        _count: undefined,
      })),
      total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(total / query.limit),
    }

    await cache.set(cacheKey, result, 120)
    return reply.send({ success: true, ...result })
  })

  // ─── Get Single Product ───────────────────────────────────────────────────
  fastify.get('/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string }
    const cacheKey = `product:${slug}`

    const cached = await cache.get(cacheKey)
    if (cached) return reply.send({ success: true, data: cached })

    const product = await prisma.product.findUnique({
      where: { slug, isActive: true },
      include: {
        specs: true,
        reviews: {
          include: { user: { select: { id: true, name: true, avatar: true } } },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: { select: { reviews: true } },
      },
    })

    if (!product) return reply.status(404).send({ success: false, error: 'Product not found' })

    const rating =
      product.reviews.length
        ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
        : 0

    const result = { ...product, rating, reviewCount: product._count.reviews, _count: undefined }
    await cache.set(cacheKey, result, 300)
    return reply.send({ success: true, data: result })
  })

  // ─── Get Compatible Products ──────────────────────────────────────────────
  fastify.get('/:id/compatible', async (request, reply) => {
    const { id } = request.params as { id: string }
    const { category } = request.query as { category?: string }

    const product = await prisma.product.findUnique({ where: { id } })
    if (!product) return reply.status(404).send({ success: false, error: 'Product not found' })

    // Smart compatibility query based on category
    const compatWhere: any = { isActive: true }
    if (category) compatWhere.category = category.toUpperCase()

    // Socket-based compat (CPU ↔ Motherboard)
    if (product.category === 'CPU' && product.socket) {
      compatWhere.socket = product.socket
    }
    if (product.category === 'MOTHERBOARD' && product.socket) {
      if (category === 'CPU') compatWhere.socket = product.socket
    }
    // Memory type compat
    if (product.category === 'MOTHERBOARD' && product.memoryType) {
      if (category === 'RAM') compatWhere.memoryType = product.memoryType
    }

    const compatible = await prisma.product.findMany({
      where: { ...compatWhere, id: { not: id } },
      include: { specs: true },
      take: 20,
    })

    return reply.send({ success: true, data: compatible })
  })

  // ─── Get Categories ───────────────────────────────────────────────────────
  fastify.get('/meta/categories', async (request, reply) => {
    const { category } = request.query as { category?: string }
    const cacheKey = `meta:categories:${category || 'all'}`
    
    const cached = await cache.get(cacheKey)
    if (cached) return reply.send({ success: true, data: cached })

    const categories = await prisma.product.groupBy({
      by: ['category'],
      where: { isActive: true },
      _count: { category: true },
      orderBy: { _count: { category: 'desc' } },
    })

    const brandsWhere: any = { isActive: true }
    if (category) brandsWhere.category = category.toUpperCase()

    const brands = await prisma.product.groupBy({
      by: ['brand'],
      where: brandsWhere,
      _count: { brand: true },
      orderBy: { _count: { brand: 'desc' } },
    })

    const result = {
      categories: categories.map((c) => ({ name: c.category, count: c._count.category })),
      brands: brands.map((b) => ({ name: b.brand, count: b._count.brand })),
    }
    await cache.set(cacheKey, result, 600)
    return reply.send({ success: true, data: result })
  })

  // ─── Add Review ───────────────────────────────────────────────────────────
  fastify.post('/:id/reviews', { preHandler: authenticate }, async (request, reply) => {
    const user = (request as any).currentUser
    const { id } = request.params as { id: string }
    const body = z.object({
      rating: z.number().int().min(1).max(5),
      title: z.string().min(3).max(200),
      body: z.string().min(10).max(2000),
    }).parse(request.body)

    // Check user bought this product
    const hasPurchased = await prisma.orderItem.findFirst({
      where: {
        productId: id,
        order: { userId: user.id, status: 'DELIVERED' },
      },
    })

    const review = await prisma.review.upsert({
      where: { productId_userId: { productId: id, userId: user.id } },
      create: { ...body, productId: id, userId: user.id, isVerified: !!hasPurchased },
      update: { ...body, isVerified: !!hasPurchased },
    })

    await cache.del(`product:${id}`)
    return reply.status(201).send({ success: true, data: review })
  })

  // ─── Admin: Create Product ────────────────────────────────────────────────
  fastify.post('/', { preHandler: requireAdmin }, async (request, reply) => {
    const body = z.object({
      name: z.string(),
      brand: z.string(),
      category: z.string(),
      description: z.string(),
      price: z.number().positive(),
      stock: z.number().int().min(0),
      images: z.array(z.string()).default([]),
      tdp: z.number().optional(),
      socket: z.string().optional(),
      formFactor: z.string().optional(),
      memoryType: z.string().optional(),
      wattage: z.number().optional(),
      specs: z.array(z.object({ key: z.string(), value: z.string(), unit: z.string().optional() })).default([]),
    }).parse(request.body)

    const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

    const product = await prisma.product.create({
      data: {
        ...body,
        slug: `${slug}-${Date.now()}`,
        category: body.category.toUpperCase() as any,
        specs: { create: body.specs },
      },
      include: { specs: true },
    })

    await cache.delPattern('products:*')
    return reply.status(201).send({ success: true, data: product })
  })

  // ─── Admin: Update Product ────────────────────────────────────────────────
  fastify.patch('/:id', { preHandler: requireAdmin }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const body = z.object({
      name: z.string().optional(),
      price: z.number().positive().optional(),
      stock: z.number().int().min(0).optional(),
      isActive: z.boolean().optional(),
      isFeatured: z.boolean().optional(),
    }).parse(request.body)

    const product = await prisma.product.update({ where: { id }, data: body })
    await cache.delPattern('products:*')
    await cache.del(`product:${product.slug}`)
    return reply.send({ success: true, data: product })
  })
}

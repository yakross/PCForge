'use client'

import { useQuery } from '@tanstack/react-query'
import { Globe, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react'
import { pricingApi } from '@/lib/api'
import { useBuildStore } from '@/store'

const REGION_FLAGS: Record<string, string> = {
  us: '🇺🇸', co: '🇨🇴', mx: '🇲🇽', ar: '🇦🇷',
  br: '🇧🇷', cl: '🇨🇱', de: '🇩🇪', gb: '🇬🇧',
  jp: '🇯🇵', au: '🇦🇺', ca: '🇨🇦', cn: '🇨🇳',
}

export default function PricingPage() {
  const { components, totalPrice } = useBuildStore()
  const productIds = Object.values(components).map((p) => p!.id)

  const { data: regions, isLoading: loadingRegions } = useQuery({
    queryKey: ['regions'],
    queryFn: () => pricingApi.regions(),
    select: (res) => res.data.data,
  })

  const { data: comparison, isLoading: loadingComp } = useQuery({
    queryKey: ['build-compare', productIds],
    queryFn: () => pricingApi.buildComparison(productIds),
    enabled: productIds.length > 0,
    select: (res) => res.data.data,
  })

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Globe className="h-6 w-6" /> Precios Globales
        </h1>
        <p className="text-muted-foreground mt-1">
          Variación de precios de componentes PC alrededor del mundo vs precio base USA.
        </p>
      </div>

      {/* Why prices vary */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {[
          { title: 'Aranceles de importación', desc: 'Colombia: 10-35% · Argentina: 20-40% · Brasil: 20% · México: 5-15%', icon: '📦' },
          { title: 'IVA / Impuestos locales', desc: 'CO: 19% · AR: 21% · BR: 17% · DE: 19% · JP: 10% · AU: 10%', icon: '🏛️' },
          { title: 'Tipo de cambio y logística', desc: 'El yen débil hace Japón más barato. El flete aéreo encarece Australia y LATAM.', icon: '✈️' },
        ].map((item) => (
          <div key={item.title} className="border rounded-xl p-5">
            <span className="text-2xl mb-2 block">{item.icon}</span>
            <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Build comparison */}
      {productIds.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">Tu build en el mundo</h2>
          <div className="bg-muted/30 rounded-xl p-4 mb-4 text-sm flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span>Precio base en USA: <strong>${totalPrice.toFixed(2)} USD</strong> · {productIds.length} componentes</span>
          </div>
          {loadingComp ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="skeleton h-24 rounded-xl" />
              ))}
            </div>
          ) : comparison ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {comparison.comparison.map((r: any) => {
                const diff = r.diffPercent
                const isBase = diff === 0
                const isCheap = diff < 0
                return (
                  <div key={r.region}
                    className={`border rounded-xl p-4 ${isBase ? 'border-primary bg-primary/5' : ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl">{REGION_FLAGS[r.region]}</span>
                      {isBase ? (
                        <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-medium">Base</span>
                      ) : isCheap ? (
                        <div className="flex items-center gap-0.5 text-green-600 text-xs font-medium">
                          <TrendingDown className="h-3 w-3" />{diff}%
                        </div>
                      ) : (
                        <div className="flex items-center gap-0.5 text-red-600 text-xs font-medium">
                          <TrendingUp className="h-3 w-3" />+{diff}%
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{r.country}</p>
                    <p className="font-bold">${r.usdEquivalent.toFixed(0)}</p>
                    <p className="text-xs text-muted-foreground">{r.currency}</p>
                  </div>
                )
              })}
            </div>
          ) : null}
          {comparison && (
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="border rounded-xl p-4 bg-green-50 dark:bg-green-950/30">
                <p className="text-xs font-medium text-green-700 dark:text-green-400 mb-1">🏆 Más barato</p>
                <p className="font-bold text-green-700 dark:text-green-400">{REGION_FLAGS[comparison.cheapest.region]} {comparison.cheapest.country}</p>
                <p className="text-sm text-green-600 dark:text-green-500">${comparison.cheapest.usdEquivalent.toFixed(0)} USD · {comparison.cheapest.diffPercent}%</p>
              </div>
              <div className="border rounded-xl p-4 bg-red-50 dark:bg-red-950/30">
                <p className="text-xs font-medium text-red-700 dark:text-red-400 mb-1">💸 Más caro</p>
                <p className="font-bold text-red-700 dark:text-red-400">{REGION_FLAGS[comparison.mostExpensive.region]} {comparison.mostExpensive.country}</p>
                <p className="text-sm text-red-600 dark:text-red-500">${comparison.mostExpensive.usdEquivalent.toFixed(0)} USD · +{comparison.mostExpensive.diffPercent}%</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* All regions table */}
      <h2 className="text-xl font-bold mb-4">Detalle por región</h2>
      {loadingRegions ? (
        <div className="skeleton h-96 rounded-xl" />
      ) : (
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">País</th>
                <th className="text-right px-4 py-3 font-medium">Multiplicador</th>
                <th className="text-right px-4 py-3 font-medium">IVA/VAT</th>
                <th className="text-right px-4 py-3 font-medium">Arancel</th>
                <th className="text-right px-4 py-3 font-medium hidden md:table-cell">Variación</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Notas</th>
              </tr>
            </thead>
            <tbody>
              {regions?.map((r: any) => {
                const diff = Math.round((r.multiplier - 1) * 100)
                return (
                  <tr key={r.region} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <span className="mr-2">{REGION_FLAGS[r.region]}</span>
                      <span className="font-medium">{r.country}</span>
                      <span className="text-xs text-muted-foreground ml-1">({r.currency})</span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">{r.multiplier.toFixed(2)}x</td>
                    <td className="px-4 py-3 text-right">{(r.vatRate * 100).toFixed(0)}%</td>
                    <td className="px-4 py-3 text-right">{(r.importTax * 100).toFixed(0)}%</td>
                    <td className="px-4 py-3 text-right hidden md:table-cell">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${diff === 0 ? 'bg-muted text-muted-foreground' : diff > 0 ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'}`}>
                        {diff > 0 ? <TrendingUp className="h-3 w-3" /> : diff < 0 ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                        {diff > 0 ? '+' : ''}{diff}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell max-w-xs truncate">{r.notes}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {productIds.length === 0 && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-sm text-blue-700 dark:text-blue-400">
          💡 <strong>Tip:</strong> Arma tu build en el <a href="/build" className="underline">Constructor de PC</a> para ver cuánto costaría en cada país.
        </div>
      )}
    </div>
  )
}

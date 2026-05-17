'use client'

import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, SlidersHorizontal, X, Loader2 } from 'lucide-react'
import { productsApi } from '@/lib/api'
import { ProductCard } from '@/components/product/ProductCard'
import { useCartStore, useBuildStore } from '@/store'
import { useToast } from '@/hooks/useToast'
import type { Product } from '@pcforge/types'

const CATEGORIES = ['CPU', 'GPU', 'RAM', 'MOTHERBOARD', 'STORAGE', 'PSU', 'COOLING', 'CASE']
const SORT_OPTIONS = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
  { value: 'rating', label: 'Mejor valorados' },
]

export default function CatalogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addItem } = useCartStore()
  const { setComponent } = useBuildStore()
  const { toast } = useToast()

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') ?? '')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [sort, setSort] = useState('newest')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [page, setPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Fetch Meta (Categories & Brands)
  const { data: metaData } = useQuery({
    queryKey: ['meta', selectedCategory],
    queryFn: () => productsApi.categories(selectedCategory),
    select: (res) => res.data,
  })

  const availableBrands = metaData?.brands ?? []

  const { data, isLoading } = useQuery({
    queryKey: ['products', { search, selectedCategory, selectedBrand, sort, minPrice, maxPrice, page }],
    queryFn: () =>
      productsApi.list({
        search: search || undefined,
        category: selectedCategory || undefined,
        brand: selectedBrand || undefined,
        sort,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        page,
        limit: 24,
      }),
    select: (res) => res.data,
  })

  const products: Product[] = data?.data ?? []
  const total: number = data?.total ?? 0
  const totalPages: number = data?.totalPages ?? 1

  const handleAddToCart = useCallback((product: Product) => {
    addItem(product)
    toast({ title: 'Agregado al carrito', description: product.name })
  }, [addItem, toast])

  const handleAddToBuild = useCallback((product: Product) => {
    setComponent(product.category as any, product)
    toast({ title: 'Agregado al build', description: `${product.name} añadido como ${product.category}` })
  }, [setComponent, toast])

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('')
    setSelectedBrand('')
    setSort('newest')
    setMinPrice('')
    setMaxPrice('')
    setPage(1)
  }

  const hasFilters = search || selectedCategory || selectedBrand || minPrice || maxPrice

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Catálogo</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {total > 0 ? `${total} productos` : 'Cargando...'}
          </p>
        </div>
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors md:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className={`w-full md:w-64 flex-shrink-0 ${filtersOpen ? 'block' : 'hidden md:block'}`}>
          <div className="border rounded-xl p-4 space-y-6 sticky top-24">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Filtros</h3>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1">
                  <X className="h-3 w-3" /> Limpiar
                </button>
              )}
            </div>

            {/* Search */}
            <div>
              <label className="text-sm font-medium mb-2 block">Buscar</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                  placeholder="Nombre o marca..."
                  className="w-full pl-8 pr-3 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium mb-2 block">Categoría</label>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => { setSelectedCategory(''); setSelectedBrand(''); setPage(1) }}
                  className={`text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${!selectedCategory ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                >
                  Todos
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setSelectedBrand(''); setPage(1) }}
                    className={`text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedCategory === cat ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand */}
            {availableBrands.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-2 block">Marca</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => { setSelectedBrand(''); setPage(1) }}
                    className={`px-3 py-1 rounded-full text-xs border transition-colors ${!selectedBrand ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}
                  >
                    Todas
                  </button>
                  {availableBrands.map((b: any) => (
                    <button
                      key={b.name}
                      onClick={() => { setSelectedBrand(b.name); setPage(1) }}
                      className={`px-3 py-1 rounded-full text-xs border transition-colors ${selectedBrand === b.name ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Range */}
            <div>
              <label className="text-sm font-medium mb-2 block">Precio (USD)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => { setMinPrice(e.target.value); setPage(1) }}
                  className="w-full px-2 py-1.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => { setMaxPrice(e.target.value); setPage(1) }}
                  className="w-full px-2 py-1.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="text-sm font-medium mb-2 block">Ordenar por</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-2 py-2 text-sm border rounded-lg bg-background focus:outline-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border rounded-xl p-4 space-y-3">
                  <div className="skeleton h-4 w-16 rounded" />
                  <div className="skeleton h-48 rounded-lg" />
                  <div className="skeleton h-4 w-3/4 rounded" />
                  <div className="skeleton h-3 w-full rounded" />
                  <div className="skeleton h-8 rounded" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No se encontraron productos</p>
              <button onClick={clearFilters} className="mt-4 text-sm text-primary hover:underline">
                Limpiar filtros
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                    onAddToBuild={() => handleAddToBuild(product)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50 hover:bg-accent transition-colors"
                  >
                    Anterior
                  </button>
                  <span className="px-4 py-2 text-sm text-muted-foreground">
                    {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50 hover:bg-accent transition-colors"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

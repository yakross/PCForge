'use client'

import Link from 'next/link'
import { ShoppingCart, Wrench, Star } from 'lucide-react'
import type { Product } from '@pcforge/types'
import { cn } from '@/lib/utils'

const CATEGORY_COLORS: Record<string, string> = {
  CPU: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  GPU: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
  RAM: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
  MOTHERBOARD: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
  STORAGE: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
  PSU: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',
  COOLING: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300',
  CASE: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300',
}

const CATEGORY_EMOJI: Record<string, string> = {
  CPU: '🔲', GPU: '🎮', RAM: '🧩', MOTHERBOARD: '🖥️',
  STORAGE: '💾', PSU: '⚡', COOLING: '❄️', CASE: '🗃️',
}

interface ProductCardProps {
  product: Product
  onAddToCart?: () => void
  onAddToBuild?: () => void
  compact?: boolean
}

export function ProductCard({ product, onAddToCart, onAddToBuild, compact }: ProductCardProps) {
  const rating = (product as any).rating ?? 0
  const reviewCount = (product as any).reviewCount ?? 0

  return (
    <div className={cn('group border rounded-xl bg-card hover:border-primary/50 hover:shadow-sm transition-all flex flex-col', compact && 'text-sm')}>
      {/* Image area */}
      <Link href={`/catalog/${product.slug}`} className="block">
        <div className="aspect-video bg-muted rounded-t-xl flex flex-col items-center justify-center gap-2 text-muted-foreground group-hover:bg-muted/80 transition-colors">
          <span className="text-4xl">{CATEGORY_EMOJI[product.category] ?? '📦'}</span>
          <span className="text-xs font-medium">{product.brand}</span>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Badge + Stock */}
        <div className="flex items-center justify-between gap-2">
          <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', CATEGORY_COLORS[product.category])}>
            {product.category}
          </span>
          {product.stock <= 5 && product.stock > 0 && (
            <span className="text-xs text-orange-600 font-medium">¡Solo {product.stock} quedan!</span>
          )}
          {product.stock === 0 && (
            <span className="text-xs text-destructive font-medium">Agotado</span>
          )}
        </div>

        {/* Name */}
        <Link href={`/catalog/${product.slug}`} className="hover:text-primary transition-colors">
          <h3 className="font-semibold leading-tight line-clamp-2">{product.name}</h3>
        </Link>

        {/* Specs preview */}
        {(product as any).specs?.length > 0 && (
          <div className="text-xs text-muted-foreground space-y-0.5">
            {(product as any).specs.slice(0, 3).map((spec: any) => (
              <div key={spec.key} className="flex gap-1">
                <span className="font-medium">{spec.key}:</span>
                <span>{spec.value}{spec.unit ? ` ${spec.unit}` : ''}</span>
              </div>
            ))}
          </div>
        )}

        {/* Rating */}
        {reviewCount > 0 && (
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={cn('h-3 w-3', i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted')} />
            ))}
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </div>
        )}

        {/* Price + Actions */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <div className="flex gap-1.5">
            {onAddToBuild && (
              <button
                onClick={onAddToBuild}
                title="Agregar al build"
                disabled={product.stock === 0}
                className="p-2 border rounded-lg hover:bg-accent transition-colors disabled:opacity-50"
              >
                <Wrench className="h-3.5 w-3.5" />
              </button>
            )}
            {onAddToCart && (
              <button
                onClick={onAddToCart}
                disabled={product.stock === 0}
                className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                {product.stock === 0 ? 'Agotado' : 'Agregar'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

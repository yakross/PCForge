'use client'

import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } =
    useCartStore()
  const router = useRouter()

  const goToCheckout = () => {
    closeCart()
    router.push('/checkout')
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-2xl transition-transform duration-300 flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <h2 className="font-semibold text-lg">Carrito</h2>
            {itemCount > 0 && (
              <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                {itemCount}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="p-1.5 rounded-md hover:bg-accent transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              <div>
                <p className="font-medium">Tu carrito está vacío</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Agrega componentes para comenzar tu build
                </p>
              </div>
              <button
                onClick={() => { closeCart(); router.push('/catalog') }}
                className="text-sm text-primary hover:underline"
              >
                Ver catálogo →
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3 p-3 border rounded-lg">
                  {/* Image placeholder */}
                  <div className="h-16 w-16 rounded-md bg-muted flex-shrink-0 flex items-center justify-center text-xs text-muted-foreground">
                    {item.product.category}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.product.brand}</p>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity */}
                      <div className="flex items-center gap-1 border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1 hover:bg-accent rounded-l-md transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-sm font-medium min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1 hover:bg-accent rounded-r-md transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-6 py-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-xl font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              IVA e impuestos calculados al finalizar compra
            </p>
            <button
              onClick={goToCheckout}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Ir al checkout <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </>
  )
}

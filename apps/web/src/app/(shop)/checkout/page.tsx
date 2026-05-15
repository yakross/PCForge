'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { CreditCard, Lock, CheckCircle, Package, Truck } from 'lucide-react'
import { useCartStore, useAuthStore } from '@/store'
import { ordersApi } from '@/lib/api'
import { useToast } from '@/hooks/useToast'
import Link from 'next/link'

const PAYMENT_METHODS = [
  { id: 'stripe_card', label: 'Tarjeta de crédito/débito', icon: '💳' },
  { id: 'mercadopago', label: 'MercadoPago', icon: 'Ⓜ️' },
  { id: 'pse', label: 'PSE / Transferencia', icon: '🏦' },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCartStore()
  const { user, isAuthenticated } = useAuthStore()
  const { toast } = useToast()

  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info')
  const [paymentMethod, setPaymentMethod] = useState('stripe_card')
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'CO',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  })

  const tax = subtotal * 0.19
  const total = subtotal + tax

  const orderMutation = useMutation({
    mutationFn: async () => {
      // In production: create address, then create order, then create payment intent
      // Here we simulate the flow
      return new Promise((resolve) => setTimeout(resolve, 1500))
    },
    onSuccess: () => {
      clearCart()
      setStep('success')
    },
    onError: () => {
      toast({ title: 'Error al procesar pago', variant: 'destructive' })
    },
  })

  const handleField = (field: string, value: string) => {
    if (field === 'cardNumber') {
      value = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
    }
    if (field === 'cardExpiry') {
      value = value.replace(/\D/g, '').slice(0, 4)
      if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2)
    }
    if (field === 'cardCvc') value = value.replace(/\D/g, '').slice(0, 4)
    setForm((f) => ({ ...f, [field]: value }))
  }

  if (!isAuthenticated) {
    return (
      <div className="container py-20 text-center">
        <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Inicia sesión para continuar</h2>
        <p className="text-muted-foreground mb-6">Necesitas una cuenta para completar tu compra</p>
        <Link href="/login?redirect=/checkout"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Iniciar sesión
        </Link>
      </div>
    )
  }

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="container py-20 text-center">
        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Tu carrito está vacío</h2>
        <Link href="/catalog" className="text-primary hover:underline">Ver catálogo →</Link>
      </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="container py-20 max-w-lg mx-auto text-center">
        <div className="border rounded-2xl p-10">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">¡Pedido confirmado!</h2>
          <p className="text-muted-foreground mb-6">
            Recibirás un email de confirmación. Tu pedido llegará en 3-5 días hábiles.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
            <Truck className="h-4 w-4" /> Envío gratis · Seguimiento en tiempo real
          </div>
          <div className="flex gap-3">
            <Link href="/account/orders"
              className="flex-1 border rounded-lg py-3 text-sm font-medium hover:bg-accent transition-colors text-center">
              Ver mis pedidos
            </Link>
            <Link href="/catalog"
              className="flex-1 bg-primary text-primary-foreground rounded-lg py-3 text-sm font-medium hover:bg-primary/90 transition-colors text-center">
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8 text-sm">
        {['info', 'payment'].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${step === s || (s === 'info' && step === 'payment') ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              {i + 1}
            </div>
            <span className={step === s ? 'font-medium' : 'text-muted-foreground'}>
              {s === 'info' ? 'Información' : 'Pago'}
            </span>
            {i === 0 && <div className="h-px w-8 bg-border" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 'info' && (
            <div className="border rounded-xl p-6 space-y-5">
              <h2 className="font-semibold text-lg">Dirección de envío</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-medium mb-1 block">Nombre completo</label>
                  <input value={form.name} onChange={(e) => handleField('name', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Juan García" />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium mb-1 block">Dirección</label>
                  <input value={form.street} onChange={(e) => handleField('street', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Cra 7 #32-16" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Ciudad</label>
                  <input value={form.city} onChange={(e) => handleField('city', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Bogotá" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Departamento</label>
                  <input value={form.state} onChange={(e) => handleField('state', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Cundinamarca" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Código Postal</label>
                  <input value={form.postalCode} onChange={(e) => handleField('postalCode', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="110231" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">País</label>
                  <select value={form.country} onChange={(e) => handleField('country', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-background focus:outline-none">
                    <option value="CO">🇨🇴 Colombia</option>
                    <option value="MX">🇲🇽 México</option>
                    <option value="AR">🇦🇷 Argentina</option>
                    <option value="US">🇺🇸 USA</option>
                    <option value="DE">🇩🇪 Alemania</option>
                  </select>
                </div>
              </div>
              <button onClick={() => setStep('payment')}
                disabled={!form.name || !form.street || !form.city}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
                Continuar al pago →
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="border rounded-xl p-6 space-y-5">
              <div className="flex items-center gap-2">
                <button onClick={() => setStep('info')} className="text-sm text-muted-foreground hover:text-foreground">← Volver</button>
                <h2 className="font-semibold text-lg">Método de pago</h2>
              </div>

              {/* Payment method selector */}
              <div className="grid gap-3">
                {PAYMENT_METHODS.map((m) => (
                  <label key={m.id}
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === m.id ? 'border-primary bg-primary/5' : 'hover:bg-accent'}`}>
                    <input type="radio" name="payment" value={m.id}
                      checked={paymentMethod === m.id}
                      onChange={() => setPaymentMethod(m.id)}
                      className="text-primary" />
                    <span className="text-xl">{m.icon}</span>
                    <span className="font-medium">{m.label}</span>
                  </label>
                ))}
              </div>

              {paymentMethod === 'stripe_card' && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Número de tarjeta</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input value={form.cardNumber} onChange={(e) => handleField('cardNumber', e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono"
                        placeholder="4242 4242 4242 4242" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Expiración</label>
                      <input value={form.cardExpiry} onChange={(e) => handleField('cardExpiry', e.target.value)}
                        className="w-full px-3 py-2.5 border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono"
                        placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">CVV</label>
                      <input value={form.cardCvc} onChange={(e) => handleField('cardCvc', e.target.value)}
                        type="password" className="w-full px-3 py-2.5 border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="•••" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                Pago 100% seguro. Tus datos están encriptados con SSL/TLS.
              </div>

              <button
                onClick={() => orderMutation.mutate()}
                disabled={orderMutation.isPending}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2">
                {orderMutation.isPending ? (
                  <><div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Procesando...</>
                ) : (
                  <><Lock className="h-4 w-4" /> Confirmar pago · ${total.toFixed(2)}</>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <div className="border rounded-xl p-5 sticky top-24">
            <h3 className="font-semibold mb-4">Resumen del pedido</h3>
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3 text-sm">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-xs flex-shrink-0">
                    {item.product.category.slice(0, 3)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.product.name}</p>
                    <p className="text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(0)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">IVA (19%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Envío</span>
                <span className="text-green-600">Gratis</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)} USD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

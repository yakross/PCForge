'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { Cpu, Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react'
import { authApi } from '@/lib/api'
import { useAuthStore } from '@/store'
import { useToast } from '@/hooks/useToast'

export default function RegisterPage() {
  const router = useRouter()
  const { setAuth } = useAuthStore()
  const { toast } = useToast()

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPass, setShowPass] = useState(false)

  const passwordStrength = (() => {
    const p = form.password
    if (!p) return 0
    let score = 0
    if (p.length >= 8) score++
    if (/[A-Z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^A-Za-z0-9]/.test(p)) score++
    return score
  })()

  const strengthLabel = ['', 'Débil', 'Regular', 'Buena', 'Fuerte'][passwordStrength]
  const strengthColor = ['', 'text-red-500', 'text-orange-500', 'text-yellow-500', 'text-green-500'][passwordStrength]

  const registerMutation = useMutation({
    mutationFn: () => authApi.register(form),
    onSuccess: (res) => {
      const { user, tokens } = res.data.data
      setAuth(user, tokens.accessToken)
      toast({ title: `¡Bienvenido a PCForge, ${user.name}!` })
      router.push('/')
    },
    onError: (err: any) => {
      toast({
        title: 'Error al registrarse',
        description: err?.response?.data?.error ?? 'Inténtalo de nuevo',
        variant: 'destructive',
      })
    },
  })

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl mb-6">
            <Cpu className="h-7 w-7 text-primary" />
            PC<span className="text-primary">Forge</span>
          </Link>
          <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
          <p className="text-muted-foreground mt-1">Gratis, sin compromisos</p>
        </div>

        <div className="border rounded-xl p-8 space-y-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Nombre completo</label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Juan García"
              autoComplete="name"
              className="w-full px-3 py-2.5 border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="juan@ejemplo.com"
              autoComplete="email"
              className="w-full px-3 py-2.5 border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Contraseña</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="Mínimo 8 caracteres"
                autoComplete="new-password"
                className="w-full px-3 py-2.5 pr-10 border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {form.password && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-1 flex-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${i <= passwordStrength ? (passwordStrength >= 4 ? 'bg-green-500' : passwordStrength >= 3 ? 'bg-yellow-500' : 'bg-red-500') : 'bg-muted'}`} />
                  ))}
                </div>
                <span className={`text-xs font-medium ${strengthColor}`}>{strengthLabel}</span>
              </div>
            )}
          </div>

          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <CheckCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-green-500" />
            Al registrarte aceptas los Términos de Servicio y la Política de Privacidad
          </div>

          <button
            onClick={() => registerMutation.mutate()}
            disabled={!form.name || !form.email || form.password.length < 8 || registerMutation.isPending}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {registerMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Crear cuenta
          </button>

          <div className="text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

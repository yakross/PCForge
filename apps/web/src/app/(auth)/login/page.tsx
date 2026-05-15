'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { Cpu, Eye, EyeOff, Loader2 } from 'lucide-react'
import { authApi } from '@/lib/api'
import { useAuthStore } from '@/store'
import { useToast } from '@/hooks/useToast'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAuth } = useAuthStore()
  const { toast } = useToast()
  const redirect = searchParams.get('redirect') ?? '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  const loginMutation = useMutation({
    mutationFn: () => authApi.login(email, password),
    onSuccess: (res) => {
      const { user, tokens } = res.data.data
      setAuth(user, tokens.accessToken)
      toast({ title: `¡Bienvenido, ${user.name}!` })
      router.push(redirect)
    },
    onError: (err: any) => {
      toast({
        title: 'Error al ingresar',
        description: err?.response?.data?.error ?? 'Credenciales inválidas',
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
          <h1 className="text-2xl font-bold">Inicia sesión</h1>
          <p className="text-muted-foreground mt-1">Accede a tu cuenta PCForge</p>
        </div>

        <div className="border rounded-xl p-8 space-y-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="juan@ejemplo.com"
              autoComplete="email"
              className="w-full px-3 py-2.5 border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              onKeyDown={(e) => e.key === 'Enter' && loginMutation.mutate()}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Contraseña</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full px-3 py-2.5 pr-10 border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                onKeyDown={(e) => e.key === 'Enter' && loginMutation.mutate()}
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            onClick={() => loginMutation.mutate()}
            disabled={!email || !password || loginMutation.isPending}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loginMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Ingresar
          </button>

          <div className="text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="text-primary font-medium hover:underline">
              Regístrate gratis
            </Link>
          </div>
        </div>

        {/* Demo credentials */}
        <div className="mt-4 p-4 bg-muted/50 rounded-lg text-xs text-muted-foreground">
          <p className="font-medium mb-1">Credenciales de prueba:</p>
          <p>Admin: admin@pcforge.dev / Admin123!</p>
          <p>Cliente: juan@example.com / Customer123!</p>
        </div>
      </div>
    </div>
  )
}

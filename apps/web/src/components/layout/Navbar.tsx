'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ShoppingCart, Cpu, User, Menu, X, LogOut,
  Package, Settings, ChevronDown, Wrench, BarChart3,
} from 'lucide-react'
import { useState } from 'react'
import { useCartStore, useAuthStore } from '@/store'
import { authApi } from '@/lib/api'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/catalog', label: 'Catálogo' },
  { href: '/build', label: 'Armar PC' },
  { href: '/pricing', label: 'Precios Globales' },
  { href: '/builds/public', label: 'Builds Públicos' },
]

export function Navbar() {
  const pathname = usePathname()
  const { itemCount, openCart } = useCartStore()
  const { user, isAuthenticated, clearAuth } = useAuthStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const count = itemCount

  const handleLogout = async () => {
    try { await authApi.logout() } catch {}
    clearAuth()
    setUserMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Cpu className="h-6 w-6 text-primary" />
          <span>PC<span className="text-primary">Forge</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname.startsWith(link.href) ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <button
            onClick={openCart}
            className="relative p-2 rounded-md hover:bg-accent transition-colors"
            aria-label={`Cart: ${count} items`}
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </button>

          {/* Auth */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors text-sm"
              >
                <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block font-medium">{user.name.split(' ')[0]}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 w-48 bg-popover border rounded-lg shadow-lg z-20 py-1">
                    <div className="px-3 py-2 border-b">
                      <p className="text-xs font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <Link href="/account" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors">
                      <User className="h-3.5 w-3.5" /> Mi cuenta
                    </Link>
                    <Link href="/account/orders" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors">
                      <Package className="h-3.5 w-3.5" /> Mis pedidos
                    </Link>
                    <Link href="/builds/my" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors">
                      <Wrench className="h-3.5 w-3.5" /> Mis builds
                    </Link>
                    {user.role === 'ADMIN' && (
                      <Link href="/admin" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent text-primary transition-colors">
                        <BarChart3 className="h-3.5 w-3.5" /> Admin
                      </Link>
                    )}
                    <div className="border-t mt-1">
                      <button onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-accent transition-colors">
                        <LogOut className="h-3.5 w-3.5" /> Cerrar sesión
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login"
                className="text-sm font-medium hover:text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-accent">
                Ingresar
              </Link>
              <Link href="/register"
                className="text-sm font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors">
                Registrarse
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background px-4 py-3 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'py-2 text-sm font-medium transition-colors',
                pathname.startsWith(link.href) ? 'text-primary' : 'text-muted-foreground'
              )}>
              {link.label}
            </Link>
          ))}
          {!isAuthenticated && (
            <div className="flex gap-2 pt-2 border-t">
              <Link href="/login" onClick={() => setMobileOpen(false)}
                className="flex-1 text-center text-sm border rounded-md py-2 hover:bg-accent">
                Ingresar
              </Link>
              <Link href="/register" onClick={() => setMobileOpen(false)}
                className="flex-1 text-center text-sm bg-primary text-primary-foreground rounded-md py-2">
                Registrarse
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

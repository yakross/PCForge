import Link from 'next/link'
import { Cpu, Zap, Globe, Shield, ArrowRight, Star, CheckCircle } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PCForge — Tienda de Componentes PC',
  description: 'Arma tu PC ideal con verificación de compatibilidad en tiempo real.',
}

const stats = [
  { label: 'Componentes', value: '500+' },
  { label: 'Marcas', value: '50+' },
  { label: 'Países', value: '12' },
  { label: 'Builds creados', value: '10K+' },
]

const features = [
  {
    icon: Zap,
    title: 'Motor de Compatibilidad',
    desc: 'Verifica socket, DDR, PSU wattage y form factor en tiempo real antes de comprar.',
  },
  {
    icon: Globe,
    title: 'Precios Globales',
    desc: 'Compara precios en 12 países. Ve el impacto de aranceles, IVA y tipo de cambio.',
  },
  {
    icon: Shield,
    title: 'Pagos Seguros',
    desc: 'Stripe y MercadoPago. PCI-DSS compliant. Reembolsos en 24 horas.',
  },
]

const categories = [
  { name: 'CPU', emoji: '🔲', desc: 'Intel & AMD', href: '/catalog?category=CPU' },
  { name: 'GPU', emoji: '🎮', desc: 'NVIDIA & AMD', href: '/catalog?category=GPU' },
  { name: 'RAM', emoji: '🧩', desc: 'DDR4 & DDR5', href: '/catalog?category=RAM' },
  { name: 'Motherboard', emoji: '🖥️', desc: 'AM5, LGA1700', href: '/catalog?category=MOTHERBOARD' },
  { name: 'Storage', emoji: '💾', desc: 'NVMe & SATA', href: '/catalog?category=STORAGE' },
  { name: 'PSU', emoji: '⚡', desc: '650W – 1600W', href: '/catalog?category=PSU' },
  { name: 'Cooling', emoji: '❄️', desc: 'Air & AIO', href: '/catalog?category=COOLING' },
  { name: 'Case', emoji: '🗃️', desc: 'ATX, mATX, ITX', href: '/catalog?category=CASE' },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background border-b">
        <div className="container py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Zap className="h-3.5 w-3.5" />
              Compatibilidad en tiempo real
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Arma tu PC perfecta{' '}
              <span className="text-primary">sin errores de compatibilidad</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              El motor de compatibilidad más completo del mercado. Verifica socket, DDR,
              wattage y form factor en tiempo real. Compara precios en 12 países.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/build"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-primary/90 transition-colors"
              >
                Armar mi PC <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center gap-2 border px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-accent transition-colors"
              >
                <Cpu className="h-4 w-4" />
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-muted/30">
        <div className="container py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16">
        <h2 className="text-2xl font-bold mb-8">Explorar por categoría</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group flex flex-col items-center text-center p-4 border rounded-xl hover:border-primary hover:bg-primary/5 transition-all"
            >
              <span className="text-3xl mb-2">{cat.emoji}</span>
              <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                {cat.name}
              </span>
              <span className="text-xs text-muted-foreground mt-0.5">{cat.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30">
        <div className="container py-16">
          <h2 className="text-2xl font-bold mb-3 text-center">¿Por qué PCForge?</h2>
          <p className="text-center text-muted-foreground mb-12">
            Tecnología usada por las empresas más grandes del mundo.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-background border rounded-xl p-6">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <div className="bg-primary rounded-2xl p-10 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">¿Listo para armar tu PC?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Usa el constructor de builds con compatibilidad automática. Guarda y comparte tu build.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/build"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              Empezar build <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/builds/public"
              className="inline-flex items-center gap-2 border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Ver builds de la comunidad
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

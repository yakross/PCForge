import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/layout/Providers'
import { Navbar } from '@/components/layout/Navbar'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'PCForge — PC Components Store', template: '%s | PCForge' },
  description:
    'Build your perfect PC with real-time compatibility checking. Shop CPUs, GPUs, RAM, Motherboards and more. Global pricing comparison.',
  keywords: ['PC components', 'gaming PC', 'CPU', 'GPU', 'motherboard', 'build PC'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pcforge.dev',
    siteName: 'PCForge',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="border-t py-8 mt-16">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                <p>© 2024 PCForge. Built with Next.js, Fastify & PostgreSQL.</p>
              </div>
            </footer>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}

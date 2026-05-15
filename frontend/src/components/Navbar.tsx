"use client";

import Link from "next/link";
import { useCurrency } from "@/context/CurrencyContext";

export default function Navbar() {
  const { currency, setCurrency } = useCurrency();

  return (
    <nav className="w-full bg-black/50 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition-colors">
              PCForge
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/build" className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Armar PC
              </Link>
              <Link href="/catalog" className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Catálogo
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={() => setCurrency(currency === 'USD' ? 'COP' : 'USD')}
              className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-full px-4 py-1.5 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
            >
              <span>{currency === 'USD' ? '🇺🇸 USD' : '🇨🇴 COP'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

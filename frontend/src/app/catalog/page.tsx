"use client";

import { useState, useMemo } from "react";
import { componentsData } from "@/data/components";
import { useCurrency } from "@/context/CurrencyContext";

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'performance';

export default function CatalogPage() {
  const { formatPrice } = useCurrency();
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [brandFilter, setBrandFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>('default');

  // Extract unique brands dynamically
  const uniqueBrands = useMemo(() => {
    const brands = new Set(componentsData.map(item => item.brand));
    return Array.from(brands).sort();
  }, []);

  const filteredAndSorted = useMemo(() => {
    let result = [...componentsData];
    
    // Filter by category
    if (categoryFilter !== "All") {
      result = result.filter(item => item.category === categoryFilter);
    }

    // Filter by brand
    if (brandFilter !== "All") {
      result = result.filter(item => item.brand === brandFilter);
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.priceUSD - a.priceUSD);
    } else if (sortBy === 'performance') {
      result.sort((a, b) => (b.performanceScore || 0) - (a.performanceScore || 0));
    }

    return result;
  }, [categoryFilter, brandFilter, sortBy]);

  return (
    <div className="flex flex-col flex-1 bg-black text-white p-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-zinc-800 pb-4 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
              Catálogo de Componentes
            </h1>
            <p className="text-zinc-400">
              Encuentra las mejores piezas para armar el equipo de tus sueños.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-wrap">
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 text-white rounded-md px-4 py-2 outline-none focus:border-blue-500 transition-colors w-full sm:w-auto"
            >
              <option value="All">Todos los productos</option>
              <option value="CPU">Procesadores (CPU)</option>
              <option value="GPU">Tarjetas Gráficas (GPU)</option>
              <option value="Motherboard">Tarjetas Madre</option>
              <option value="RAM">Memorias RAM</option>
              <option value="Storage">Almacenamiento</option>
              <option value="PSU">Fuentes de Poder</option>
              <option value="Case">Gabinetes</option>
            </select>

            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 text-white rounded-md px-4 py-2 outline-none focus:border-blue-500 transition-colors w-full sm:w-auto"
            >
              <option value="All">Todas las marcas</option>
              {uniqueBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-zinc-900 border border-zinc-700 text-white rounded-md px-4 py-2 outline-none focus:border-blue-500 transition-colors w-full sm:w-auto"
            >
              <option value="default">Relevancia</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="performance">Mejor Rendimiento</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSorted.map((item) => (
            <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300 group flex flex-col relative">
              <div className={`relative w-full aspect-square p-4 ${['CPU', 'GPU', 'RAM', 'Storage', 'Motherboard', 'PSU'].includes(item.category) ? 'bg-zinc-950' : 'bg-white'}`}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  className={`w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 ${!['CPU', 'GPU', 'RAM', 'Storage', 'Motherboard', 'PSU'].includes(item.category) ? 'mix-blend-multiply' : ''}`}
                />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md w-fit shadow-lg">
                    {item.category}
                  </div>
                  {item.recommendation && (
                    <div className={`text-xs font-bold px-2 py-1 rounded-md shadow-lg w-fit ${
                      item.recommendation.includes('Básico') ? 'bg-zinc-600/90 text-zinc-200' :
                      item.recommendation.includes('Masivo') ? 'bg-indigo-600/90 text-white' :
                      item.recommendation.includes('actualizar') ? 'bg-orange-500/90 text-white' :
                      item.recommendation.includes('Gaming') ? 'bg-red-600/90 text-white' :
                      item.recommendation.includes('Gama') ? 'bg-purple-600/90 text-white' :
                      item.recommendation.includes('Excelente') ? 'bg-emerald-600/90 text-white' :
                      item.recommendation.includes('Calidad') ? 'bg-amber-500/90 text-black' :
                      item.recommendation.includes('recomendado') ? 'bg-sky-600/90 text-white' :
                      item.recommendation.includes('Premium') ? 'bg-pink-600/90 text-white' :
                      'bg-zinc-800/90 text-zinc-200'
                    }`}>
                      {item.recommendation}
                    </div>
                  )}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <div className="text-xs text-zinc-400">{item.brand}</div>
                  {item.performanceScore && (
                    <div className="text-[10px] text-zinc-500 font-mono bg-black px-1.5 py-0.5 rounded border border-zinc-800">
                      Rend: {item.performanceScore}/100
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-lg leading-tight mb-2 flex-1 line-clamp-2">{item.name}</h3>
                
                <div className="text-2xl font-bold text-white mt-auto mb-4">
                  {formatPrice(item.priceUSD)}
                </div>
                
                <button className="w-full bg-zinc-800 hover:bg-blue-600 text-white py-2.5 rounded-xl font-medium transition-colors">
                  Añadir al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

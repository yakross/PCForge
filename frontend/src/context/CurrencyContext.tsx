"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'USD' | 'COP';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  exchangeRate: number;
  formatPrice: (priceUSD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// USD to COP mock exchange rate (in a real app, this would be fetched from an API)
const MOCK_EXCHANGE_RATE = 3950; 

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [exchangeRate, setExchangeRate] = useState(MOCK_EXCHANGE_RATE);

  // Simulate fetching exchange rate periodically
  useEffect(() => {
    // Here you would normally do:
    // fetch('https://api.exchangerate-api.com/v4/latest/USD').then(...)
    const interval = setInterval(() => {
      // Simulate slight fluctuations in exchange rate
      setExchangeRate(prev => prev + (Math.random() * 10 - 5));
    }, 60000); // every minute
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (priceUSD: number) => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceUSD);
    } else {
      const priceCOP = priceUSD * exchangeRate;
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(priceCOP);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, exchangeRate, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

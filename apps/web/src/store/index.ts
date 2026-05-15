import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Product, User, CartItem, BuildCompatResult } from '@pcforge/types'

// ─── Auth Store ───────────────────────────────────────────────────────────────

interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  setAuth: (user: User, accessToken: string) => void
  clearAuth: () => void
  updateUser: (updates: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setAuth: (user, accessToken) => set({ user, accessToken, isAuthenticated: true }),
      clearAuth: () => set({ user: null, accessToken: null, isAuthenticated: false }),
      updateUser: (updates) =>
        set((state) => ({ user: state.user ? { ...state.user, ...updates } : null })),
    }),
    { name: 'pcforge-auth', storage: createJSONStorage(() => localStorage) }
  )
)

// ─── Cart Store ───────────────────────────────────────────────────────────────

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  get subtotal(): number
  get itemCount(): number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.productId === product.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            }
          }
          return {
            items: [
              ...state.items,
              { productId: product.id, product, quantity, price: product.price },
            ],
          }
        })
      },

      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          items: state.items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
        }))
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      get subtotal() {
        return get().items.reduce((s, i) => s + i.price * i.quantity, 0)
      },
      get itemCount() {
        return get().items.reduce((s, i) => s + i.quantity, 0)
      },
    }),
    { name: 'pcforge-cart', storage: createJSONStorage(() => localStorage) }
  )
)

// ─── Build Store ──────────────────────────────────────────────────────────────

type BuildSlot = 'CPU' | 'GPU' | 'RAM' | 'MOTHERBOARD' | 'STORAGE' | 'PSU' | 'CASE' | 'COOLING'

interface BuildState {
  components: Partial<Record<BuildSlot, Product>>
  compatibility: BuildCompatResult | null
  isCheckingCompat: boolean
  setComponent: (slot: BuildSlot, product: Product) => void
  removeComponent: (slot: BuildSlot) => void
  clearBuild: () => void
  setCompatibility: (result: BuildCompatResult | null) => void
  setCheckingCompat: (checking: boolean) => void
  get totalPrice(): number
  get componentCount(): number
}

export const useBuildStore = create<BuildState>()(
  persist(
    (set, get) => ({
      components: {},
      compatibility: null,
      isCheckingCompat: false,

      setComponent: (slot, product) =>
        set((state) => ({ components: { ...state.components, [slot]: product } })),

      removeComponent: (slot) =>
        set((state) => {
          const { [slot]: _, ...rest } = state.components
          return { components: rest, compatibility: null }
        }),

      clearBuild: () => set({ components: {}, compatibility: null }),
      setCompatibility: (result) => set({ compatibility: result }),
      setCheckingCompat: (checking) => set({ isCheckingCompat: checking }),

      get totalPrice() {
        return Object.values(get().components).reduce((s, p) => s + (p?.price ?? 0), 0)
      },
      get componentCount() {
        return Object.keys(get().components).length
      },
    }),
    { name: 'pcforge-build', storage: createJSONStorage(() => localStorage) }
  )
)

// ─── UI Store ─────────────────────────────────────────────────────────────────

interface UIState {
  theme: 'light' | 'dark' | 'system'
  selectedRegion: string
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setRegion: (region: string) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'system',
      selectedRegion: 'us',
      setTheme: (theme) => set({ theme }),
      setRegion: (region) => set({ selectedRegion: region }),
    }),
    { name: 'pcforge-ui' }
  )
)

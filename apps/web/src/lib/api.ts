import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

export const api = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// ─── Request Interceptor ─────────────────────────────────────────────────────

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    try {
      const authState = JSON.parse(localStorage.getItem('pcforge-auth') ?? '{}')
      const token = authState?.state?.accessToken
      if (token) config.headers.Authorization = `Bearer ${token}`
    } catch {}
  }
  return config
})

// ─── Response Interceptor (auto-refresh) ─────────────────────────────────────

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            original.headers.Authorization = `Bearer ${token}`
            resolve(api(original))
          })
        })
      }

      original._retry = true
      isRefreshing = true

      try {
        const authState = JSON.parse(localStorage.getItem('pcforge-auth') ?? '{}')
        const refreshToken = authState?.state?.refreshToken
        if (!refreshToken) throw new Error('No refresh token')

        const { data } = await axios.post(`${BASE_URL}/api/v1/auth/refresh`, { refreshToken })
        const newToken = data.data.tokens.accessToken

        // Update stored token
        authState.state.accessToken = newToken
        localStorage.setItem('pcforge-auth', JSON.stringify(authState))

        refreshSubscribers.forEach((cb) => cb(newToken))
        refreshSubscribers = []

        original.headers.Authorization = `Bearer ${newToken}`
        return api(original)
      } catch {
        // Clear auth on refresh failure
        localStorage.removeItem('pcforge-auth')
        window.location.href = '/login'
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

// ─── Typed API Helpers ────────────────────────────────────────────────────────

export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  updateProfile: (data: { name?: string; avatar?: string }) =>
    api.patch('/auth/me', data),
  changePassword: (currentPassword: string, newPassword: string) =>
    api.post('/auth/change-password', { currentPassword, newPassword }),
}

export const productsApi = {
  list: (params?: Record<string, unknown>) => api.get('/products', { params }),
  get: (slug: string) => api.get(`/products/${slug}`),
  getCompatible: (id: string, category?: string) =>
    api.get(`/products/${id}/compatible`, { params: { category } }),
  categories: () => api.get('/products/meta/categories'),
  addReview: (id: string, data: { rating: number; title: string; body: string }) =>
    api.post(`/products/${id}/reviews`, data),
}

export const cartApi = {
  get: (sessionId?: string) => api.get('/cart', { params: { sessionId } }),
  addItem: (productId: string, quantity?: number, sessionId?: string) =>
    api.post('/cart/items', { productId, quantity, sessionId }),
  updateItem: (itemId: string, quantity: number) =>
    api.patch(`/cart/items/${itemId}`, { quantity }),
  removeItem: (itemId: string) => api.delete(`/cart/items/${itemId}`),
  clear: () => api.delete('/cart'),
}

export const ordersApi = {
  create: (data: {
    shippingAddressId: string
    paymentMethod: string
    currency?: string
    notes?: string
  }) => api.post('/orders', data),
  list: (params?: { page?: number; limit?: number }) => api.get('/orders/my', { params }),
  get: (id: string) => api.get(`/orders/${id}`),
  cancel: (id: string) => api.post(`/orders/${id}/cancel`),
}

export const buildApi = {
  checkCompatibility: (productIds: string[]) =>
    api.post('/builds/check-compatibility', { productIds }),
  save: (name: string, productIds: string[], isPublic?: boolean) =>
    api.post('/builds', { name, productIds, isPublic }),
  myBuilds: () => api.get('/builds/my'),
  publicBuilds: (page?: number) => api.get('/builds/public', { params: { page } }),
  get: (id: string) => api.get(`/builds/${id}`),
  delete: (id: string) => api.delete(`/builds/${id}`),
}

export const paymentsApi = {
  createIntent: (orderId: string, currency?: string) =>
    api.post('/payments/stripe/create-intent', { orderId, currency }),
  getStatus: (orderId: string) => api.get(`/payments/status/${orderId}`),
  refund: (orderId: string) => api.post(`/payments/refund/${orderId}`),
}

export const pricingApi = {
  regions: () => api.get('/pricing/regions'),
  productPrices: (id: string) => api.get(`/pricing/product/${id}`),
  buildPrices: (productIds: string[], region?: string) =>
    api.post('/pricing/build', { productIds, region }),
  buildComparison: (productIds: string[]) =>
    api.post('/pricing/build/compare', { productIds }),
}

export const adminApi = {
  dashboard: () => api.get('/admin/dashboard'),
  users: (params?: Record<string, unknown>) => api.get('/admin/users', { params }),
  updateUser: (id: string, data: { role?: string; isActive?: boolean }) =>
    api.patch(`/admin/users/${id}`, data),
  orders: (params?: Record<string, unknown>) => api.get('/admin/orders', { params }),
  updateOrderStatus: (id: string, status: string, trackingNumber?: string) =>
    api.patch(`/admin/orders/${id}/status`, { status, trackingNumber }),
  updateStock: (id: string, stock: number) =>
    api.patch(`/admin/products/${id}/stock`, { stock }),
}

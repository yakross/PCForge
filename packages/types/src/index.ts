// ─── Product Types ────────────────────────────────────────────────────────────

export type ComponentCategory =
  | 'CPU'
  | 'GPU'
  | 'RAM'
  | 'Motherboard'
  | 'Storage'
  | 'PSU'
  | 'Case'
  | 'Cooling'
  | 'Monitor'
  | 'Keyboard'
  | 'Mouse';

export interface ProductSpec {
  key: string;
  value: string | number | boolean;
  unit?: string;
}

export interface CompatibilityRule {
  type: 'socket' | 'ddr' | 'pcie' | 'form_factor' | 'power' | 'clearance';
  field: string;
  requiredValues?: string[];
  minValue?: number;
  maxValue?: number;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ComponentCategory;
  description: string;
  price: number; // USD base price
  stock: number;
  images: string[];
  specs: ProductSpec[];
  compatibility: CompatibilityRule[];
  tdp?: number; // Watts
  socket?: string;
  formFactor?: string;
  memoryType?: string;
  wattage?: number;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilters {
  category?: ComponentCategory;
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
  page?: number;
  limit?: number;
}

// ─── Compatibility Types ──────────────────────────────────────────────────────

export type CompatibilityStatus = 'ok' | 'warning' | 'error' | 'info';

export interface CompatibilityCheck {
  id: string;
  status: CompatibilityStatus;
  message: string;
  components: string[]; // Product IDs involved
  details?: string;
}

export interface BuildCompatibility {
  overallStatus: CompatibilityStatus;
  score: number; // 0-100
  checks: CompatibilityCheck[];
  estimatedTdp: number;
  recommendedPsu: number;
}

// ─── Build Types ──────────────────────────────────────────────────────────────

export interface BuildItem {
  product: Product;
  quantity: number;
}

export interface Build {
  id: string;
  name: string;
  userId?: string;
  items: BuildItem[];
  compatibility: BuildCompatibility;
  totalPrice: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ─── User Types ───────────────────────────────────────────────────────────────

export type UserRole = 'customer' | 'admin' | 'vendor';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  addresses: Address[];
  createdAt: Date;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

// ─── Order Types ──────────────────────────────────────────────────────────────

export type OrderStatus =
  | 'pending'
  | 'payment_processing'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  shippingAddress: Address;
  stripePaymentIntentId?: string;
  mercadopagoOrderId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Cart Types ───────────────────────────────────────────────────────────────

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  subtotal: number;
  updatedAt: Date;
}

// ─── Pricing Types ────────────────────────────────────────────────────────────

export interface RegionalPricing {
  region: string;
  country: string;
  currency: string;
  multiplier: number;
  vatRate: number;
  importTax: number;
  notes: string;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

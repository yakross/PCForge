# 🔧 PCForge — E-commerce de Componentes PC

Stack completo de producción para tienda de componentes PC con motor de compatibilidad en tiempo real, pagos globales y comparación de precios por país.

---

## 🏗️ Stack Tecnológico

| Capa | Tecnología | Propósito |
|------|-----------|-----------|
| **Frontend** | Next.js 14 (App Router + SSR) | UI, SEO, performance |
| **Estado** | Zustand | Cart, auth, build state |
| **Queries** | TanStack React Query | Cache, sync server state |
| **Estilos** | TailwindCSS + shadcn/ui | Design system |
| **Backend** | Fastify (Node.js) | API REST, alta performance |
| **ORM** | Prisma | PostgreSQL type-safe |
| **DB Principal** | PostgreSQL 16 | Users, orders, products |
| **Cache/Queue** | Redis 7 + BullMQ | Sessions, cart, jobs |
| **DB Specs** | MongoDB 7 | Specs JSON de componentes |
| **Search** | Elasticsearch 8 | Búsqueda full-text |
| **Queue** | RabbitMQ | Eventos async (email, stock) |
| **Pagos** | Stripe + MercadoPago | Global + LATAM |
| **Auth** | JWT (access + refresh) | Stateless auth |
| **Monorepo** | Turborepo | Build pipeline |
| **CI/CD** | GitHub Actions | Test → Build → Deploy |
| **Infra** | Docker Compose | Dev local completo |

---

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 20+
- Docker & Docker Compose
- npm 10+

### 1. Clonar y configurar

```bash
git clone https://github.com/tu-usuario/pcforge.git
cd pcforge

# Instalar dependencias de todo el monorepo
npm install
```

### 2. Variables de entorno

```bash
# API
cp apps/api/.env.example apps/api/.env
# Edita apps/api/.env con tus credenciales de Stripe, etc.

# Web
cp apps/web/.env.example apps/web/.env.local
```

### 3. Levantar infraestructura con Docker

```bash
# Levanta PostgreSQL, Redis, MongoDB, RabbitMQ, Elasticsearch
npm run docker:up

# Verifica que todos los servicios están corriendo
docker-compose ps
```

### 4. Migraciones y seed

```bash
# Genera el cliente de Prisma y crea las tablas
npm run db:migrate

# Poblar la base de datos con productos de prueba
npm run db:seed
```

### 5. Iniciar en desarrollo

```bash
# Inicia API (puerto 4000) + Web (puerto 3000) en paralelo
npm run dev
```

### URLs

| Servicio | URL |
|---------|-----|
| Web App | http://localhost:3000 |
| API REST | http://localhost:4000 |
| Swagger Docs | http://localhost:4000/docs |
| RabbitMQ UI | http://localhost:15672 (pcforge/rabbit_secret) |
| Prisma Studio | `npm run db:studio` |

---

## 👤 Credenciales de Prueba

| Rol | Email | Contraseña |
|-----|-------|-----------|
| Admin | admin@pcforge.dev | Admin123! |
| Cliente | juan@example.com | Customer123! |

### Tarjeta de prueba Stripe
```
Número: 4242 4242 4242 4242
Expiry: 12/26
CVV: 123
```

---

## 📁 Estructura del Proyecto

```
pcforge/
├── apps/
│   ├── api/                    # Fastify REST API
│   │   ├── prisma/
│   │   │   ├── schema.prisma   # Modelos de BD
│   │   │   └── seed.ts         # Datos de prueba (22 productos)
│   │   └── src/
│   │       ├── config/         # DB, Redis, env
│   │       ├── middleware/      # Auth, error handler
│   │       ├── routes/         # auth, products, cart, orders, payments, builds, pricing, admin
│   │       └── services/       # compatibility.service.ts
│   └── web/                    # Next.js 14
│       └── src/
│           ├── app/            # App Router pages
│           ├── components/     # Navbar, CartDrawer, ProductCard, etc.
│           ├── hooks/          # useToast
│           ├── lib/            # api client, utils
│           └── store/          # Zustand (auth, cart, build, ui)
├── packages/
│   └── types/                  # Tipos TypeScript compartidos
├── .github/workflows/ci.yml    # CI/CD Pipeline
├── docker-compose.yml          # Infraestructura completa
└── turbo.json                  # Monorepo config
```

---

## 🔌 API Endpoints

### Auth
```
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
GET  /api/v1/auth/me
PATCH /api/v1/auth/me
POST /api/v1/auth/change-password
```

### Products
```
GET  /api/v1/products              # Lista con filtros
GET  /api/v1/products/:slug        # Detalle
GET  /api/v1/products/:id/compatible?category=CPU
GET  /api/v1/products/meta/categories
POST /api/v1/products/:id/reviews  # Auth required
POST /api/v1/products              # Admin only
PATCH /api/v1/products/:id         # Admin only
```

### Cart
```
GET    /api/v1/cart
POST   /api/v1/cart/items
PATCH  /api/v1/cart/items/:itemId
DELETE /api/v1/cart/items/:itemId
DELETE /api/v1/cart
```

### Orders
```
POST /api/v1/orders               # Crea orden desde carrito
GET  /api/v1/orders/my            # Mis pedidos
GET  /api/v1/orders/:id
POST /api/v1/orders/:id/cancel
```

### Builds
```
POST /api/v1/builds/check-compatibility  # Sin auth
POST /api/v1/builds                      # Guardar build
GET  /api/v1/builds/my
GET  /api/v1/builds/public
GET  /api/v1/builds/:id
DELETE /api/v1/builds/:id
```

### Payments
```
POST /api/v1/payments/stripe/create-intent
POST /api/v1/payments/stripe/webhook
GET  /api/v1/payments/status/:orderId
POST /api/v1/payments/refund/:orderId
```

### Pricing
```
GET  /api/v1/pricing/regions
GET  /api/v1/pricing/product/:id
POST /api/v1/pricing/build          # Precio build en región
POST /api/v1/pricing/build/compare  # Comparar en todas las regiones
```

### Admin
```
GET   /api/v1/admin/dashboard
GET   /api/v1/admin/users
PATCH /api/v1/admin/users/:id
GET   /api/v1/admin/orders
PATCH /api/v1/admin/orders/:id/status
PATCH /api/v1/admin/products/:id/stock
```

---

## 🧪 Motor de Compatibilidad

El servicio `compatibility.service.ts` verifica automáticamente:

| Check | Qué verifica |
|-------|-------------|
| **Socket CPU↔MB** | LGA1700, AM5, AM4, etc. |
| **RAM DDR type** | DDR4 vs DDR5 en CPU y MB |
| **PSU Wattage** | TDP total + 30% headroom |
| **Form Factor** | Case soporta el tamaño del MB |
| **Score** | 0-100 (penaliza errores -30, warnings -10) |

---

## 🌍 Variación de Precios Globales

| País | Multiplicador | Factores principales |
|------|-------------|---------------------|
| 🇺🇸 USA | 1.00x | Base |
| 🇯🇵 Japón | 0.92x | Yen débil, bajo IVA |
| 🇨🇳 China | 0.95x | Manufactura local |
| 🇨🇦 Canadá | 1.05x | USMCA, GST 5% |
| 🇩🇪 Alemania | 1.08x | MwSt 19%, libre comercio UE |
| 🇲🇽 México | 1.18x | IVA 16%, USMCA |
| 🇦🇺 Australia | 1.15x | GST 10%, logística |
| 🇨🇴 Colombia | 1.28x | IVA 19%, arancel ~10% |
| 🇧🇷 Brasil | 1.38x | ICMS 17%, II 20% |
| 🇦🇷 Argentina | 1.55x | IVA 21%, impuesto PAIS 30% |

---

## 🚀 Deploy en Producción

### Frontend → Vercel
```bash
npx vercel --prod
```

### Backend → Railway / AWS ECS
```bash
# Railway
railway up

# o AWS ECS con la imagen Docker
docker build -t pcforge-api ./apps/api
```

### Variables críticas de producción
- `JWT_SECRET` → mínimo 64 caracteres aleatorios
- `STRIPE_SECRET_KEY` → clave live de Stripe
- `DATABASE_URL` → PostgreSQL con SSL
- `REDIS_URL` → Redis con contraseña

---

## 📝 Licencia

MIT © 2024 PCForge

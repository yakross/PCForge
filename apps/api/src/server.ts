import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import jwt from '@fastify/jwt'
import cookie from '@fastify/cookie'
import rateLimit from '@fastify/rate-limit'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { config } from './config/env'
import { prisma } from './config/database'
import { redis } from './config/redis'
import { authRoutes } from './routes/auth.routes'
import { productRoutes } from './routes/product.routes'
import { cartRoutes } from './routes/cart.routes'
import { orderRoutes } from './routes/order.routes'
import { buildRoutes } from './routes/build.routes'
import { paymentRoutes } from './routes/payment.routes'
import { pricingRoutes } from './routes/pricing.routes'
import { adminRoutes } from './routes/admin.routes'
import { errorHandler } from './middleware/error.middleware'

const server = Fastify({
  logger: {
    level: config.NODE_ENV === 'production' ? 'info' : 'debug',
    transport:
      config.NODE_ENV !== 'production'
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined,
  },
  trustProxy: true,
})

async function bootstrap() {
  // ─── Plugins ────────────────────────────────────────────────────────────────
  await server.register(helmet, { contentSecurityPolicy: false })

  await server.register(cors, {
    origin: config.ALLOWED_ORIGINS.split(','),
    credentials: true,
  })

  await server.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
    redis,
  })

  await server.register(jwt, {
    secret: config.JWT_SECRET,
    sign: { expiresIn: config.JWT_ACCESS_EXPIRES },
  })

  await server.register(cookie, {
    secret: config.COOKIE_SECRET,
  })

  // ─── Swagger Docs ───────────────────────────────────────────────────────────
  await server.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'PCForge API',
        description: 'E-commerce API for PC components with compatibility engine',
        version: '1.0.0',
      },
      servers: [{ url: `http://localhost:${config.PORT}` }],
      components: {
        securitySchemes: {
          bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        },
      },
    },
  })

  await server.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: { docExpansion: 'list', deepLinking: true },
  })

  // ─── Routes ─────────────────────────────────────────────────────────────────
  await server.register(authRoutes, { prefix: '/api/v1/auth' })
  await server.register(productRoutes, { prefix: '/api/v1/products' })
  await server.register(cartRoutes, { prefix: '/api/v1/cart' })
  await server.register(orderRoutes, { prefix: '/api/v1/orders' })
  await server.register(buildRoutes, { prefix: '/api/v1/builds' })
  await server.register(paymentRoutes, { prefix: '/api/v1/payments' })
  await server.register(pricingRoutes, { prefix: '/api/v1/pricing' })
  await server.register(adminRoutes, { prefix: '/api/v1/admin' })

  // ─── Health Check ────────────────────────────────────────────────────────────
  server.get('/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      database: 'connected',
      redis: redis.status === 'ready' ? 'connected' : 'disconnected',
    },
  }))

  // ─── Error Handler ───────────────────────────────────────────────────────────
  server.setErrorHandler(errorHandler)

  // ─── Start Server ───────────────────────────────────────────────────────────
  try {
    await server.listen({ port: config.PORT, host: '0.0.0.0' })
    console.log(`🚀 PCForge API running at http://localhost:${config.PORT}`)
    console.log(`📚 Swagger docs at http://localhost:${config.PORT}/docs`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

// ─── Graceful Shutdown ──────────────────────────────────────────────────────
const signals = ['SIGINT', 'SIGTERM']
signals.forEach((signal) => {
  process.on(signal, async () => {
    server.log.info(`Received ${signal}, shutting down gracefully...`)
    await server.close()
    await prisma.$disconnect()
    await redis.quit()
    process.exit(0)
  })
})

bootstrap()

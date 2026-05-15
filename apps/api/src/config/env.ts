import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),

  // Database
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string(),
  MONGODB_URL: z.string(),

  // Auth
  JWT_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES: z.string().default('15m'),
  JWT_REFRESH_EXPIRES: z.string().default('7d'),
  COOKIE_SECRET: z.string().min(32),

  // CORS
  ALLOWED_ORIGINS: z.string().default('http://localhost:3000'),

  // Stripe
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // MercadoPago
  MERCADOPAGO_ACCESS_TOKEN: z.string().optional(),

  // Storage (AWS S3 or compatible)
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_REGION: z.string().default('us-east-1'),
  AWS_S3_BUCKET: z.string().optional(),

  // Email (Resend)
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().default('noreply@pcforge.dev'),

  // Elasticsearch
  ELASTICSEARCH_URL: z.string().default('http://localhost:9200'),

  // RabbitMQ
  RABBITMQ_URL: z.string().default('amqp://localhost:5672'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('❌ Invalid environment variables:')
  console.error(parsed.error.flatten().fieldErrors)
  process.exit(1)
}

export const config = parsed.data
export type Config = typeof config

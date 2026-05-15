import Redis from 'ioredis'
import { config } from './env'

export const redis = new Redis(config.REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => Math.min(times * 100, 3000),
  lazyConnect: true,
})

redis.on('connect', () => console.log('✅ Redis connected'))
redis.on('error', (err) => console.error('❌ Redis error:', err.message))

// ─── Cache Helpers ────────────────────────────────────────────────────────────

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key)
    return data ? JSON.parse(data) : null
  },

  async set(key: string, value: unknown, ttlSeconds = 300): Promise<void> {
    await redis.setex(key, ttlSeconds, JSON.stringify(value))
  },

  async del(key: string): Promise<void> {
    await redis.del(key)
  },

  async delPattern(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) await redis.del(...keys)
  },
}

// ─── Session Store ────────────────────────────────────────────────────────────

export const session = {
  async setRefreshToken(userId: string, token: string): Promise<void> {
    await redis.setex(`refresh:${userId}`, 7 * 24 * 60 * 60, token)
  },

  async getRefreshToken(userId: string): Promise<string | null> {
    return redis.get(`refresh:${userId}`)
  },

  async deleteRefreshToken(userId: string): Promise<void> {
    await redis.del(`refresh:${userId}`)
  },
}

import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import argon2 from 'argon2'
import { prisma } from '../config/database'
import { session } from '../config/redis'
import { authenticate } from '../middleware/auth.middleware'
import { config } from '../config/env'

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function authRoutes(fastify: FastifyInstance) {
  // ─── Register ──────────────────────────────────────────────────────────────
  fastify.post('/register', async (request, reply) => {
    const body = registerSchema.parse(request.body)

    const existing = await prisma.user.findUnique({ where: { email: body.email } })
    if (existing) {
      return reply.status(409).send({ success: false, error: 'Email already registered' })
    }

    const passwordHash = await argon2.hash(body.password)
    const user = await prisma.user.create({
      data: { name: body.name, email: body.email, passwordHash },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    })

    const { accessToken, refreshToken } = await generateTokens(fastify, user)

    return reply.status(201).send({
      success: true,
      data: { user, tokens: { accessToken, refreshToken } },
    })
  })

  // ─── Login ────────────────────────────────────────────────────────────────
  fastify.post('/login', async (request, reply) => {
    const body = loginSchema.parse(request.body)

    const user = await prisma.user.findUnique({
      where: { email: body.email, isActive: true },
    })

    if (!user || !user.passwordHash) {
      return reply.status(401).send({ success: false, error: 'Invalid credentials' })
    }

    const valid = await argon2.verify(user.passwordHash, body.password)
    if (!valid) {
      return reply.status(401).send({ success: false, error: 'Invalid credentials' })
    }

    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role }
    const { accessToken, refreshToken } = await generateTokens(fastify, safeUser)

    return reply.send({
      success: true,
      data: { user: safeUser, tokens: { accessToken, refreshToken } },
    })
  })

  // ─── Refresh Token ────────────────────────────────────────────────────────
  fastify.post('/refresh', async (request, reply) => {
    const { refreshToken } = (request.body as any) || {}
    if (!refreshToken) {
      return reply.status(400).send({ success: false, error: 'Refresh token required' })
    }

    let payload: any
    try {
      payload = fastify.jwt.verify(refreshToken, { secret: config.JWT_SECRET + '_refresh' })
    } catch {
      return reply.status(401).send({ success: false, error: 'Invalid refresh token' })
    }

    const stored = await session.getRefreshToken(payload.id)
    if (stored !== refreshToken) {
      return reply.status(401).send({ success: false, error: 'Refresh token revoked' })
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.id, isActive: true },
      select: { id: true, name: true, email: true, role: true },
    })

    if (!user) {
      return reply.status(401).send({ success: false, error: 'User not found' })
    }

    const tokens = await generateTokens(fastify, user)
    return reply.send({ success: true, data: { tokens } })
  })

  // ─── Logout ───────────────────────────────────────────────────────────────
  fastify.post('/logout', { preHandler: authenticate }, async (request, reply) => {
    const user = (request as any).currentUser
    await session.deleteRefreshToken(user.id)
    return reply.send({ success: true, message: 'Logged out successfully' })
  })

  // ─── Me ───────────────────────────────────────────────────────────────────
  fastify.get('/me', { preHandler: authenticate }, async (request, reply) => {
    const user = (request as any).currentUser
    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        isVerified: true,
        addresses: true,
        createdAt: true,
      },
    })
    return reply.send({ success: true, data: fullUser })
  })

  // ─── Update Profile ───────────────────────────────────────────────────────
  fastify.patch('/me', { preHandler: authenticate }, async (request, reply) => {
    const user = (request as any).currentUser
    const body = z.object({ name: z.string().min(2).optional(), avatar: z.string().url().optional() }).parse(request.body)

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: body,
      select: { id: true, name: true, email: true, role: true, avatar: true },
    })

    return reply.send({ success: true, data: updated })
  })

  // ─── Change Password ──────────────────────────────────────────────────────
  fastify.post('/change-password', { preHandler: authenticate }, async (request, reply) => {
    const user = (request as any).currentUser
    const body = z.object({
      currentPassword: z.string(),
      newPassword: z.string().min(8),
    }).parse(request.body)

    const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
    if (!dbUser?.passwordHash) {
      return reply.status(400).send({ success: false, error: 'Password change not available' })
    }

    const valid = await argon2.verify(dbUser.passwordHash, body.currentPassword)
    if (!valid) {
      return reply.status(400).send({ success: false, error: 'Current password incorrect' })
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: await argon2.hash(body.newPassword) },
    })

    await session.deleteRefreshToken(user.id)
    return reply.send({ success: true, message: 'Password updated. Please log in again.' })
  })
}

// ─── Token Helper ─────────────────────────────────────────────────────────────

async function generateTokens(fastify: FastifyInstance, user: { id: string; role: string }) {
  const accessToken = fastify.jwt.sign(
    { id: user.id, role: user.role },
    { expiresIn: config.JWT_ACCESS_EXPIRES }
  )

  const refreshToken = fastify.jwt.sign(
    { id: user.id },
    { secret: config.JWT_SECRET + '_refresh', expiresIn: config.JWT_REFRESH_EXPIRES }
  )

  await session.setRefreshToken(user.id, refreshToken)
  return { accessToken, refreshToken }
}

import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../config/database'
import { authenticate, optionalAuth } from '../middleware/auth.middleware'
import { checkBuildCompatibility } from '../services/compatibility.service'

export async function buildRoutes(fastify: FastifyInstance) {
  // ─── Check Compatibility (no auth needed) ─────────────────────────────────
  fastify.post('/check-compatibility', async (request, reply) => {
    const body = z.object({
      productIds: z.array(z.string()).min(1).max(20),
    }).parse(request.body)

    const result = await checkBuildCompatibility(body.productIds)
    return reply.send({ success: true, data: result })
  })

  // ─── Save Build ───────────────────────────────────────────────────────────
  fastify.post('/', { preHandler: authenticate }, async (request, reply) => {
    const user = (request as any).currentUser
    const body = z.object({
      name: z.string().min(1).max(200),
      productIds: z.array(z.string()).min(1),
      isPublic: z.boolean().default(false),
    }).parse(request.body)

    const products = await prisma.product.findMany({
      where: { id: { in: body.productIds } },
      include: { specs: true },
    })

    const compatibility = await checkBuildCompatibility(body.productIds)
    const total = products.reduce((s, p) => s + p.price, 0)

    const build = await prisma.savedBuild.create({
      data: {
        userId: user.id,
        name: body.name,
        isPublic: body.isPublic,
        data: { productIds: body.productIds, compatibility, total, products },
      },
    })

    return reply.status(201).send({ success: true, data: build })
  })

  // ─── My Builds ────────────────────────────────────────────────────────────
  fastify.get('/my', { preHandler: authenticate }, async (request, reply) => {
    const user = (request as any).currentUser
    const builds = await prisma.savedBuild.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    })
    return reply.send({ success: true, data: builds })
  })

  // ─── Public Builds ────────────────────────────────────────────────────────
  fastify.get('/public', async (request, reply) => {
    const { page = 1, limit = 12 } = request.query as { page?: number; limit?: number }
    const skip = (Number(page) - 1) * Number(limit)

    const [builds, total] = await Promise.all([
      prisma.savedBuild.findMany({
        where: { isPublic: true },
        include: { user: { select: { id: true, name: true, avatar: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(limit),
      }),
      prisma.savedBuild.count({ where: { isPublic: true } }),
    ])

    return reply.send({
      success: true,
      data: builds,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    })
  })

  // ─── Get Build by ID ──────────────────────────────────────────────────────
  fastify.get('/:id', { preHandler: optionalAuth }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const currentUser = (request as any).currentUser

    const build = await prisma.savedBuild.findUnique({
      where: { id },
      include: { user: { select: { id: true, name: true, avatar: true } } },
    })

    if (!build) return reply.status(404).send({ success: false, error: 'Build not found' })
    if (!build.isPublic && build.userId !== currentUser?.id) {
      return reply.status(403).send({ success: false, error: 'Private build' })
    }

    return reply.send({ success: true, data: build })
  })

  // ─── Delete Build ─────────────────────────────────────────────────────────
  fastify.delete('/:id', { preHandler: authenticate }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const user = (request as any).currentUser

    const build = await prisma.savedBuild.findUnique({ where: { id } })
    if (!build || build.userId !== user.id) {
      return reply.status(404).send({ success: false, error: 'Build not found' })
    }

    await prisma.savedBuild.delete({ where: { id } })
    return reply.send({ success: true, message: 'Build deleted' })
  })
}

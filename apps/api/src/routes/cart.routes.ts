import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../config/database'
import { optionalAuth } from '../middleware/auth.middleware'

export async function cartRoutes(fastify: FastifyInstance) {
  const getOrCreateCart = async (userId?: string, sessionId?: string) => {
    if (!userId && !sessionId) throw new Error('userId or sessionId required')
    const where = userId ? { userId } : { sessionId }
    let cart = await prisma.cartSession.findUnique({
      where: where as any,
      include: { items: { include: { product: { include: { specs: true } } } } },
    })
    if (!cart) {
      cart = await prisma.cartSession.create({
        data: where as any,
        include: { items: { include: { product: { include: { specs: true } } } } },
      })
    }
    return cart
  }

  // ─── Get Cart ─────────────────────────────────────────────────────────────
  fastify.get('/', { preHandler: optionalAuth }, async (request, reply) => {
    const user = (request as any).currentUser
    const { sessionId } = request.query as { sessionId?: string }
    const cart = await getOrCreateCart(user?.id, sessionId)
    const subtotal = cart.items.reduce((s, i) => s + i.price * i.quantity, 0)
    return reply.send({ success: true, data: { ...cart, subtotal } })
  })

  // ─── Add to Cart ──────────────────────────────────────────────────────────
  fastify.post('/items', { preHandler: optionalAuth }, async (request, reply) => {
    const user = (request as any).currentUser
    const body = z.object({
      productId: z.string(),
      quantity: z.number().int().min(1).default(1),
      sessionId: z.string().optional(),
    }).parse(request.body)

    const product = await prisma.product.findUnique({
      where: { id: body.productId, isActive: true },
    })
    if (!product) return reply.status(404).send({ success: false, error: 'Product not found' })
    if (product.stock < body.quantity) {
      return reply.status(400).send({ success: false, error: 'Insufficient stock' })
    }

    const cart = await getOrCreateCart(user?.id, body.sessionId)

    const existing = cart.items.find((i) => i.productId === body.productId)
    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: { increment: body.quantity } },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartSessionId: cart.id,
          productId: body.productId,
          quantity: body.quantity,
          price: product.price,
        },
      })
    }

    const updated = await prisma.cartSession.findUnique({
      where: { id: cart.id },
      include: { items: { include: { product: true } } },
    })

    return reply.send({ success: true, data: updated })
  })

  // ─── Update Item Quantity ─────────────────────────────────────────────────
  fastify.patch('/items/:itemId', { preHandler: optionalAuth }, async (request, reply) => {
    const { itemId } = request.params as { itemId: string }
    const { quantity } = z.object({ quantity: z.number().int().min(0) }).parse(request.body)

    if (quantity === 0) {
      await prisma.cartItem.delete({ where: { id: itemId } })
      return reply.send({ success: true, message: 'Item removed' })
    }

    const item = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    })
    return reply.send({ success: true, data: item })
  })

  // ─── Remove Item ──────────────────────────────────────────────────────────
  fastify.delete('/items/:itemId', async (request, reply) => {
    const { itemId } = request.params as { itemId: string }
    await prisma.cartItem.delete({ where: { id: itemId } })
    return reply.send({ success: true, message: 'Item removed' })
  })

  // ─── Clear Cart ───────────────────────────────────────────────────────────
  fastify.delete('/', { preHandler: optionalAuth }, async (request, reply) => {
    const user = (request as any).currentUser
    const { sessionId } = request.query as { sessionId?: string }
    const cart = await getOrCreateCart(user?.id, sessionId)
    await prisma.cartItem.deleteMany({ where: { cartSessionId: cart.id } })
    return reply.send({ success: true, message: 'Cart cleared' })
  })
}

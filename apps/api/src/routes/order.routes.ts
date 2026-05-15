import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../config/database'
import { authenticate } from '../middleware/auth.middleware'

export async function orderRoutes(fastify: FastifyInstance) {
  // ─── Create Order from Cart ───────────────────────────────────────────────
  fastify.post('/', { preHandler: authenticate }, async (request, reply) => {
    const user = (request as any).currentUser
    const body = z.object({
      shippingAddressId: z.string(),
      paymentMethod: z.string(),
      currency: z.string().default('USD'),
      notes: z.string().optional(),
    }).parse(request.body)

    // Get user's cart
    const cart = await prisma.cartSession.findUnique({
      where: { userId: user.id },
      include: {
        items: {
          include: { product: true },
        },
      },
    })

    if (!cart || cart.items.length === 0) {
      return reply.status(400).send({ success: false, error: 'Cart is empty' })
    }

    // Validate stock
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return reply.status(400).send({
          success: false,
          error: `Insufficient stock for ${item.product.name}`,
        })
      }
    }

    const subtotal = cart.items.reduce((s, i) => s + i.price * i.quantity, 0)
    const tax = subtotal * 0.19 // 19% IVA Colombia
    const total = subtotal + tax

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        paymentMethod: body.paymentMethod,
        subtotal,
        tax,
        shipping: 0,
        total,
        currency: body.currency,
        shippingAddressId: body.shippingAddressId,
        notes: body.notes,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            productName: item.product.name,
            quantity: item.quantity,
            unitPrice: item.price,
            totalPrice: item.price * item.quantity,
          })),
        },
      },
      include: { items: true, shippingAddress: true },
    })

    // Clear cart after order creation
    await prisma.cartItem.deleteMany({ where: { cartSessionId: cart.id } })

    return reply.status(201).send({ success: true, data: order })
  })

  // ─── My Orders ────────────────────────────────────────────────────────────
  fastify.get('/my', { preHandler: authenticate }, async (request, reply) => {
    const user = (request as any).currentUser
    const { page = 1, limit = 10 } = request.query as any
    const skip = (Number(page) - 1) * Number(limit)

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId: user.id },
        include: {
          items: { include: { product: { select: { images: true } } } },
          shippingAddress: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(limit),
      }),
      prisma.order.count({ where: { userId: user.id } }),
    ])

    return reply.send({ success: true, data: orders, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) })
  })

  // ─── Get Single Order ─────────────────────────────────────────────────────
  fastify.get('/:id', { preHandler: authenticate }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const user = (request as any).currentUser

    const order = await prisma.order.findUnique({
      where: { id, userId: user.id },
      include: {
        items: { include: { product: { select: { id: true, name: true, images: true, slug: true } } } },
        shippingAddress: true,
      },
    })

    if (!order) return reply.status(404).send({ success: false, error: 'Order not found' })
    return reply.send({ success: true, data: order })
  })

  // ─── Cancel Order ─────────────────────────────────────────────────────────
  fastify.post('/:id/cancel', { preHandler: authenticate }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const user = (request as any).currentUser

    const order = await prisma.order.findUnique({ where: { id, userId: user.id } })
    if (!order) return reply.status(404).send({ success: false, error: 'Order not found' })

    const cancellable = ['PENDING', 'CONFIRMED']
    if (!cancellable.includes(order.status)) {
      return reply.status(400).send({ success: false, error: `Cannot cancel order with status: ${order.status}` })
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status: 'CANCELLED' },
    })

    return reply.send({ success: true, data: updated })
  })
}

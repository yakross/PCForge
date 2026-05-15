import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../config/database'
import { requireAdmin } from '../middleware/auth.middleware'

export async function adminRoutes(fastify: FastifyInstance) {
  // All admin routes require admin role
  fastify.addHook('preHandler', requireAdmin)

  // ─── Dashboard Stats ──────────────────────────────────────────────────────
  fastify.get('/dashboard', async (request, reply) => {
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      pendingOrders,
      revenueResult,
      recentOrders,
      lowStockProducts,
      topProducts,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.order.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.aggregate({
        where: { paymentStatus: 'SUCCEEDED' },
        _sum: { total: true },
      }),
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true } },
          items: { take: 1 },
        },
      }),
      prisma.product.findMany({
        where: { stock: { lte: 5 }, isActive: true },
        select: { id: true, name: true, stock: true, category: true },
        orderBy: { stock: 'asc' },
        take: 10,
      }),
      prisma.orderItem.groupBy({
        by: ['productId', 'productName'],
        _sum: { quantity: true, totalPrice: true },
        orderBy: { _sum: { totalPrice: 'desc' } },
        take: 5,
      }),
    ])

    // Monthly revenue (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyOrders = await prisma.order.findMany({
      where: { paymentStatus: 'SUCCEEDED', createdAt: { gte: sixMonthsAgo } },
      select: { total: true, createdAt: true },
    })

    const monthlyRevenue = monthlyOrders.reduce((acc: Record<string, number>, order) => {
      const key = order.createdAt.toISOString().slice(0, 7) // YYYY-MM
      acc[key] = (acc[key] || 0) + order.total
      return acc
    }, {})

    return reply.send({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalProducts,
          totalOrders,
          pendingOrders,
          totalRevenue: revenueResult._sum.total ?? 0,
        },
        recentOrders,
        lowStockProducts,
        topProducts,
        monthlyRevenue: Object.entries(monthlyRevenue).map(([month, revenue]) => ({
          month,
          revenue: Math.round(revenue * 100) / 100,
        })),
      },
    })
  })

  // ─── List All Users ───────────────────────────────────────────────────────
  fastify.get('/users', async (request, reply) => {
    const { page = 1, limit = 20, search } = request.query as any
    const skip = (Number(page) - 1) * Number(limit)

    const where: any = {}
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true, name: true, email: true, role: true,
          isActive: true, isVerified: true, createdAt: true,
          _count: { select: { orders: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(limit),
      }),
      prisma.user.count({ where }),
    ])

    return reply.send({ success: true, data: users, total, page: Number(page) })
  })

  // ─── Update User Role / Status ────────────────────────────────────────────
  fastify.patch('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const body = z.object({
      role: z.enum(['CUSTOMER', 'ADMIN', 'VENDOR']).optional(),
      isActive: z.boolean().optional(),
    }).parse(request.body)

    const user = await prisma.user.update({
      where: { id },
      data: body,
      select: { id: true, name: true, email: true, role: true, isActive: true },
    })

    return reply.send({ success: true, data: user })
  })

  // ─── List All Orders ──────────────────────────────────────────────────────
  fastify.get('/orders', async (request, reply) => {
    const { page = 1, limit = 20, status } = request.query as any
    const skip = (Number(page) - 1) * Number(limit)
    const where: any = {}
    if (status) where.status = status

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          user: { select: { name: true, email: true } },
          items: true,
          shippingAddress: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(limit),
      }),
      prisma.order.count({ where }),
    ])

    return reply.send({ success: true, data: orders, total, page: Number(page) })
  })

  // ─── Update Order Status ──────────────────────────────────────────────────
  fastify.patch('/orders/:id/status', async (request, reply) => {
    const { id } = request.params as { id: string }
    const body = z.object({
      status: z.enum(['CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
      trackingNumber: z.string().optional(),
    }).parse(request.body)

    const order = await prisma.order.update({
      where: { id },
      data: body,
    })

    return reply.send({ success: true, data: order })
  })

  // ─── Inventory Management ──────────────────────────────────────────────────
  fastify.patch('/products/:id/stock', async (request, reply) => {
    const { id } = request.params as { id: string }
    const body = z.object({
      stock: z.number().int().min(0),
    }).parse(request.body)

    const product = await prisma.product.update({
      where: { id },
      data: { stock: body.stock },
      select: { id: true, name: true, stock: true },
    })

    return reply.send({ success: true, data: product })
  })
}

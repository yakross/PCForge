import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import Stripe from 'stripe'
import { prisma } from '../config/database'
import { authenticate } from '../middleware/auth.middleware'
import { config } from '../config/env'

const stripe = new Stripe(config.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' })

export async function paymentRoutes(fastify: FastifyInstance) {
  // ─── Create Stripe Payment Intent ─────────────────────────────────────────
  fastify.post('/stripe/create-intent', { preHandler: authenticate }, async (request, reply) => {
    const user = (request as any).currentUser
    const body = z.object({
      orderId: z.string(),
      currency: z.string().length(3).default('usd'),
    }).parse(request.body)

    const order = await prisma.order.findUnique({
      where: { id: body.orderId, userId: user.id },
    })

    if (!order) return reply.status(404).send({ success: false, error: 'Order not found' })
    if (order.paymentStatus !== 'PENDING') {
      return reply.status(400).send({ success: false, error: 'Order already processed' })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.total * 100), // Stripe uses cents
      currency: body.currency.toLowerCase(),
      metadata: { orderId: order.id, userId: user.id },
      automatic_payment_methods: { enabled: true },
    })

    await prisma.order.update({
      where: { id: order.id },
      data: {
        stripePaymentIntentId: paymentIntent.id,
        paymentStatus: 'PROCESSING',
        status: 'PAYMENT_PROCESSING',
      },
    })

    return reply.send({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
    })
  })

  // ─── Stripe Webhook ───────────────────────────────────────────────────────
  fastify.post(
    '/stripe/webhook',
    { config: { rawBody: true } },
    async (request, reply) => {
      const sig = request.headers['stripe-signature'] as string
      const webhookSecret = config.STRIPE_WEBHOOK_SECRET

      let event: Stripe.Event
      try {
        event = stripe.webhooks.constructEvent(
          (request as any).rawBody,
          sig,
          webhookSecret ?? ''
        )
      } catch {
        return reply.status(400).send({ error: 'Invalid webhook signature' })
      }

      switch (event.type) {
        case 'payment_intent.succeeded': {
          const intent = event.data.object as Stripe.PaymentIntent
          const orderId = intent.metadata.orderId

          await prisma.order.update({
            where: { stripePaymentIntentId: intent.id },
            data: { paymentStatus: 'SUCCEEDED', status: 'CONFIRMED' },
          })

          // Reduce stock
          const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { items: true },
          })
          if (order) {
            await Promise.all(
              order.items.map((item) =>
                prisma.product.update({
                  where: { id: item.productId },
                  data: { stock: { decrement: item.quantity } },
                })
              )
            )
          }
          break
        }

        case 'payment_intent.payment_failed': {
          const intent = event.data.object as Stripe.PaymentIntent
          await prisma.order.update({
            where: { stripePaymentIntentId: intent.id },
            data: { paymentStatus: 'FAILED', status: 'CANCELLED' },
          })
          break
        }

        case 'charge.refunded': {
          const charge = event.data.object as Stripe.Charge
          if (charge.payment_intent) {
            await prisma.order.update({
              where: { stripePaymentIntentId: charge.payment_intent as string },
              data: { paymentStatus: 'REFUNDED', status: 'REFUNDED' },
            })
          }
          break
        }
      }

      return reply.send({ received: true })
    }
  )

  // ─── Get Payment Status ───────────────────────────────────────────────────
  fastify.get('/status/:orderId', { preHandler: authenticate }, async (request, reply) => {
    const { orderId } = request.params as { orderId: string }
    const user = (request as any).currentUser

    const order = await prisma.order.findUnique({
      where: { id: orderId, userId: user.id },
      select: { id: true, status: true, paymentStatus: true, stripePaymentIntentId: true },
    })

    if (!order) return reply.status(404).send({ success: false, error: 'Order not found' })

    let stripeStatus = null
    if (order.stripePaymentIntentId) {
      const intent = await stripe.paymentIntents.retrieve(order.stripePaymentIntentId)
      stripeStatus = intent.status
    }

    return reply.send({ success: true, data: { ...order, stripeStatus } })
  })

  // ─── Refund ───────────────────────────────────────────────────────────────
  fastify.post('/refund/:orderId', { preHandler: authenticate }, async (request, reply) => {
    const { orderId } = request.params as { orderId: string }
    const user = (request as any).currentUser

    const order = await prisma.order.findUnique({
      where: { id: orderId, userId: user.id },
    })

    if (!order) return reply.status(404).send({ success: false, error: 'Order not found' })
    if (order.status !== 'CONFIRMED' && order.status !== 'DELIVERED') {
      return reply.status(400).send({ success: false, error: 'Order cannot be refunded' })
    }
    if (!order.stripePaymentIntentId) {
      return reply.status(400).send({ success: false, error: 'No payment found' })
    }

    const refund = await stripe.refunds.create({
      payment_intent: order.stripePaymentIntentId,
    })

    if (refund.status === 'succeeded') {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'REFUNDED', paymentStatus: 'REFUNDED' },
      })
    }

    return reply.send({ success: true, data: { refundId: refund.id, status: refund.status } })
  })
}

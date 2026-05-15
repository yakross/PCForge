import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../config/database'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    await request.jwtVerify()
    const payload = request.user as { id: string; email: string; role: string }

    const user = await prisma.user.findUnique({
      where: { id: payload.id, isActive: true },
      select: { id: true, email: true, role: true, name: true },
    })

    if (!user) {
      return reply.status(401).send({ success: false, error: 'User not found or inactive' })
    }

    // Attach full user to request
    ;(request as any).currentUser = user
  } catch {
    return reply.status(401).send({ success: false, error: 'Invalid or expired token' })
  }
}

export async function requireAdmin(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  await authenticate(request, reply)
  const user = (request as any).currentUser
  if (user?.role !== 'ADMIN') {
    return reply.status(403).send({ success: false, error: 'Admin access required' })
  }
}

export async function optionalAuth(request: FastifyRequest): Promise<void> {
  try {
    await request.jwtVerify()
  } catch {
    // No-op: optional auth doesn't fail if token is missing
  }
}

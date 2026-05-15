import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.error(error)

  // Zod validation errors
  if (error.code === 'FST_ERR_VALIDATION') {
    return reply.status(400).send({
      success: false,
      error: 'Validation error',
      details: error.message,
    })
  }

  // JWT errors
  if (error.code === 'FST_JWT_NO_AUTHORIZATION_IN_HEADER') {
    return reply.status(401).send({ success: false, error: 'Authorization header required' })
  }

  // Prisma errors
  if ((error as any).code === 'P2002') {
    return reply.status(409).send({ success: false, error: 'Resource already exists' })
  }
  if ((error as any).code === 'P2025') {
    return reply.status(404).send({ success: false, error: 'Resource not found' })
  }

  // Rate limit
  if (error.statusCode === 429) {
    return reply.status(429).send({ success: false, error: 'Too many requests' })
  }

  const statusCode = error.statusCode ?? 500
  return reply.status(statusCode).send({
    success: false,
    error: statusCode >= 500 ? 'Internal server error' : error.message,
  })
}

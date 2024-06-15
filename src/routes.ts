import { FastifyInstance } from 'fastify'
import { register } from './http/register'
import { authenticate } from './http/authenticate'
import { profile } from './http/profile'
import { verifyJwt } from './http/middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  app.get('/me', { onRequest: [verifyJwt] }, profile)
}

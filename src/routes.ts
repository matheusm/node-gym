import { FastifyInstance } from 'fastify'
import { register } from './http/register'
import { authenticate } from './http/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)
}

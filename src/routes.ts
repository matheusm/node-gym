import { FastifyInstance } from 'fastify'
import { register } from './http/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}

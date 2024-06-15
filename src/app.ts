import fastifyJwt from '@fastify/jwt'

import fastify from 'fastify'
import { appRoutes } from './routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Log error to a service like Sentry/DataDog
  }

  return reply.status(500).send({ message: 'Internal server error' })
})

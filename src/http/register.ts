import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import { registerUseCase } from '@/use-cases/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
  })
  const { email, name, password } = registerBodySchema.parse(request.body)

  try {
    await registerUseCase({
      email,
      name,
      password
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}

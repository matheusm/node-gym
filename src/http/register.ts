import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { hash } from 'bcryptjs'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
  })
  const { email, name, password } = registerBodySchema.parse(request.body)

  const password_hash = await hash(password, 6)

  await prisma.user.create({
    data: {
      email,
      name,
      password_hash,
    },
  })

  return reply.status(201).send()
}

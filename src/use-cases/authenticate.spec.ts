import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('authenticate use case', () => {
  let sut: AuthenticateUseCase
  let usersRepository: InMemoryUsersRepository

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should authenticate user', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'a@a.com',
      password_hash: await hash('12345678', 6),
    })

    await sut.execute({
      email: 'a@a.com',
      password: '12345678',
    })
  })

  it('should not be able to authenticate user with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'a@a.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate user with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'a@a.com',
      password_hash: await hash('12345678', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'a@a.com',
        password: '12312312',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

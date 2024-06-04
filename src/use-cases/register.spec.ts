import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

describe('register use case', () => {
  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const password = '12345678'

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@ex.com',
      password,
    })

    const isPasswordCorrectlyHashed = await compare(password, user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not allow registration with the same email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'johndoe@ex.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '12345678',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '12345678',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should register user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john@jon.com',
      password: '12345678',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})

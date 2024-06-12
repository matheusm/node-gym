import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { GetUserProfileUseCase } from '../get-user-profile.ts'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { USERS_REPOSITORY } from 'src/core/domain/repositories/user.repository';
import { PrismaUsersRepository } from '../infraestructure/prisma-users.repository';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { GetUserUseCase } from '../application/use-cases/get-user.usecase';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    {
      provide: USERS_REPOSITORY,
      useClass: PrismaUsersRepository,
    },
    CreateUserUseCase,
    GetUserUseCase,
  ],
})
export class UsersModule {}

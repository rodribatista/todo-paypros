import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../infrastructure/jwt.strategy';
import { USERS_REPOSITORY } from 'src/core/domain/repositories/user.repository';
import { PrismaUsersRepository } from 'src/modules/users/infraestructure/prisma-users.repository';
import { LoginUseCase } from '../application/use-cases/login.usecase';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'paypros_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: USERS_REPOSITORY,
      useClass: PrismaUsersRepository,
    },
    LoginUseCase,
  ],
  exports: [JwtModule],
})
export class AuthModule {}

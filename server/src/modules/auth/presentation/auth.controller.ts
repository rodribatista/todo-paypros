import { Controller, Post, Body } from '@nestjs/common';
import { LoginUseCase } from '../application/use-cases/login.usecase';
import { LoginRequest } from './dto/login.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUser: LoginUseCase) {}

  @Post('/login')
  create(@Body() body: LoginRequest) {
    return this.loginUser.execute({
      username: body.username,
      password: body.password,
    });
  }
}

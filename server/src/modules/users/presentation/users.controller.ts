import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { CreateUserRequest } from './dto/create-user.request';

@Controller('users')
export class UsersController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @Post('/register')
  create(@Body() body: CreateUserRequest) {
    return this.createUser.execute({
      username: body.username,
      password: body.password,
    });
  }
}

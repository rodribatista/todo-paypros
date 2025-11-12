import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { UsersRepository } from 'src/core/domain/repositories/user.repository';
import { USERS_REPOSITORY } from 'src/core/domain/repositories/user.repository';
import { CreateUserInput } from '../dto/create-user.input';
import { UserEntity } from '../../../../core/domain/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly repository: UsersRepository,
  ) {}

  async execute(input: CreateUserInput): Promise<UserEntity> {
    const existing = await this.repository.findByUsername(input.username);
    if (existing) throw new ConflictException('Username already taken');
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = new UserEntity('', input.username, hashedPassword);
    return this.repository.create(user);
  }
}

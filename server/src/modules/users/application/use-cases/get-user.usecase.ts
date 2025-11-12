import { NotFoundException, Inject, Injectable } from '@nestjs/common';
import type { UsersRepository } from 'src/core/domain/repositories/user.repository';
import { USERS_REPOSITORY } from 'src/core/domain/repositories/user.repository';
import { UserEntity } from '../../../../core/domain/entities/user.entity';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly repository: UsersRepository,
  ) {}
  async execute(input: string): Promise<UserEntity> {
    const user = await this.repository.findById(input);
    if (!user) throw new NotFoundException(`User with id '${input}' not found`);
    return user;
  }
}

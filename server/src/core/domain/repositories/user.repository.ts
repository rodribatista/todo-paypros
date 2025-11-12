import { UserEntity } from '../entities/user.entity';

export interface UsersRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByUsername(username: string): Promise<UserEntity | null>;
  create(user: UserEntity): Promise<UserEntity>;
}

export const USERS_REPOSITORY = Symbol('USERS_REPOSITORY');

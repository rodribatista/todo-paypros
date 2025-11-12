import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../modules/datasource/prisma.service';
import { UsersRepository } from '../../../core/domain/repositories/user.repository';
import { UserEntity } from '../../../core/domain/entities/user.entity';
import { User } from '@prisma/client';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(u: User): UserEntity {
    return new UserEntity(u.id, u.username, u.password);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const found = await this.prisma.user.findUnique({ where: { id } });
    if (!found) return null;
    return this.toDomain(found);
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const found = await this.prisma.user.findUnique({ where: { username } });
    if (!found) return null;
    return this.toDomain(found);
  }

  async create(data: UserEntity): Promise<UserEntity> {
    const created = await this.prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
      },
    });
    return this.toDomain(created);
  }
}

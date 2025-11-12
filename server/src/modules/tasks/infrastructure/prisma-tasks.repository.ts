import { Injectable } from '@nestjs/common';
import { TasksRepository } from '../../../core/domain/repositories/task.repository';
import {
  TaskEntity,
  type TaskStatus,
} from '../../../core/domain/entities/task.entity';
import { PrismaService } from '../../../modules/datasource/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(t: Task): TaskEntity {
    return new TaskEntity(
      t.id,
      t.title,
      t.description,
      t.status as TaskStatus,
      t.dueDate,
      t.userId,
    );
  }

  async findAllByUser(id: string): Promise<TaskEntity[]> {
    const found = await this.prisma.task.findMany({ where: { userId: id } });
    return found.map((t) => this.toDomain(t));
  }

  async findById(id: string): Promise<TaskEntity | null> {
    const found = await this.prisma.task.findUnique({ where: { id } });
    if (!found) return null;
    return this.toDomain(found);
  }

  async create(data: TaskEntity): Promise<TaskEntity> {
    const created = await this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: data.dueDate,
        userId: data.userId,
      },
    });
    return this.toDomain(created);
  }

  async update(id: string, data: Partial<TaskEntity>): Promise<TaskEntity> {
    const updated = await this.prisma.task.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: data.dueDate,
      },
    });
    return this.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }
}

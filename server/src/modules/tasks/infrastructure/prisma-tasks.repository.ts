import { Injectable } from '@nestjs/common';
import { TasksRepository } from '../../../core/domain/repositories/task.repository';
import {
  TaskEntity,
  type TaskStatus,
} from '../../../core/domain/entities/task.entity';
import { PrismaService } from '../../../modules/datasource/prisma.service';

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<TaskEntity[]> {
    const tasks = await this.prisma.task.findMany();
    return tasks.map(
      (t) =>
        new TaskEntity(
          t.id,
          t.title,
          t.description,
          t.status as TaskStatus,
          t.dueDate,
        ),
    );
  }

  async findById(id: string): Promise<TaskEntity | null> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) return null;
    return new TaskEntity(
      task.id,
      task.title,
      task.description,
      task.status as TaskStatus,
      task.dueDate,
    );
  }

  async create(data: TaskEntity): Promise<TaskEntity> {
    const created = await this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: data.dueDate,
      },
    });
    return new TaskEntity(
      created.id,
      created.title,
      created.description,
      created.status as TaskStatus,
      created.dueDate,
    );
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
    return new TaskEntity(
      updated.id,
      updated.title,
      updated.description,
      updated.status as TaskStatus,
      updated.dueDate,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }
}

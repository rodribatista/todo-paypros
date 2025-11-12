import { Injectable } from '@nestjs/common';
import { TasksRepository } from '../../../core/domain/repositories/task.repository';
import { TaskEntity } from '../../../core/domain/entities/task.entity';

@Injectable()
export class MemoryTasksRepository implements TasksRepository {
  private tasks: TaskEntity[] = [];
  private nextId = 1;

  findAllByUser(id: string): Promise<TaskEntity[]> {
    console.log(id);
    return new Promise((resolve) => resolve(this.tasks));
  }

  findById(id: string): Promise<TaskEntity | null> {
    return new Promise((resolve) =>
      resolve(this.tasks.find((t) => t.id === id) || null),
    );
  }

  create(data: TaskEntity): Promise<TaskEntity> {
    return new Promise((resolve) => {
      data.id = this.nextId.toString();
      this.tasks.push(data);
      this.nextId++;
      resolve(data);
    });
  }

  update(id: string, data: Partial<TaskEntity>): Promise<TaskEntity> {
    return new Promise((resolve) => {
      const task = this.tasks.find((t) => t.id === id) || null;
      if (task) {
        Object.assign(task, data);
        resolve(task);
        return;
      }
      throw new Error('Task not found');
    });
  }

  delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      this.tasks = this.tasks.filter((t) => t.id !== id);
      resolve();
    });
  }
}

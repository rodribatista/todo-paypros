import { TaskEntity } from '../entities/task.entity';

export interface TasksRepository {
  findAllByUser(id: string): Promise<TaskEntity[]>;
  findById(id: string): Promise<TaskEntity | null>;
  create(task: TaskEntity): Promise<TaskEntity>;
  update(id: string, task: Partial<TaskEntity>): Promise<TaskEntity>;
  delete(id: string): Promise<void>;
}

export const TASKS_REPOSITORY = Symbol('TASKS_REPOSITORY');

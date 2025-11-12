import { Inject, Injectable } from '@nestjs/common';
import type { TasksRepository } from 'src/core/domain/repositories/task.repository';
import { TASKS_REPOSITORY } from 'src/core/domain/repositories/task.repository';
import { CreateTaskInput } from '../dto/create-task.input';
import {
  TaskEntity,
  TaskStatus,
} from '../../../../core/domain/entities/task.entity';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject(TASKS_REPOSITORY)
    private readonly repository: TasksRepository,
  ) {}

  execute(input: CreateTaskInput): Promise<TaskEntity> {
    const dueDateFinalDay = input.dueDate;
    dueDateFinalDay.setUTCHours(23, 59, 59, 999);
    const task = new TaskEntity(
      '',
      input.title,
      input.description,
      TaskStatus.PENDING,
      dueDateFinalDay,
    );
    return this.repository.create(task);
  }
}

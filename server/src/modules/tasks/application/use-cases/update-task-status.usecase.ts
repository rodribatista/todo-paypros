import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { TasksRepository } from 'src/core/domain/repositories/task.repository';
import { TASKS_REPOSITORY } from 'src/core/domain/repositories/task.repository';
import {
  TaskEntity,
  TaskStatus,
} from '../../../../core/domain/entities/task.entity';

@Injectable()
export class UpdateTaskStatusUseCase {
  constructor(
    @Inject(TASKS_REPOSITORY)
    private readonly repository: TasksRepository,
  ) {}

  async execute(input: string): Promise<TaskEntity> {
    const isTaskExist = await this.repository.findById(input);
    if (!isTaskExist) {
      throw new NotFoundException(`Task with id '${input}' not found`);
    }
    const task = {
      status:
        isTaskExist.status === TaskStatus.PENDING
          ? TaskStatus.COMPLETED
          : TaskStatus.PENDING,
    };
    return this.repository.update(input, task);
  }
}

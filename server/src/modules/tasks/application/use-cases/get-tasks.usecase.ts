import { Inject, Injectable } from '@nestjs/common';
import type { TasksRepository } from 'src/core/domain/repositories/task.repository';
import { TASKS_REPOSITORY } from 'src/core/domain/repositories/task.repository';
import { TaskEntity } from 'src/core/domain/entities/task.entity';

@Injectable()
export class GetTasksUseCase {
  constructor(
    @Inject(TASKS_REPOSITORY)
    private readonly repository: TasksRepository,
  ) {}
  execute(): Promise<TaskEntity[]> {
    return this.repository.findAll();
  }
}

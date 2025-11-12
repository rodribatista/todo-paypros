import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { TasksRepository } from 'src/core/domain/repositories/task.repository';
import { TASKS_REPOSITORY } from 'src/core/domain/repositories/task.repository';
import { UpdateTaskInput } from '../dto/update-task.input';
import { TaskEntity } from '../../../../core/domain/entities/task.entity';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject(TASKS_REPOSITORY)
    private readonly repository: TasksRepository,
  ) {}

  async execute(input: UpdateTaskInput): Promise<TaskEntity> {
    const isTaskExist = await this.repository.findById(input.id);
    if (!isTaskExist) {
      throw new NotFoundException(`Task with id '${input.id}' not found`);
    }
    const dueDateFinalDay = input.dueDate;
    dueDateFinalDay?.setUTCHours(23, 59, 59, 999);
    const task = {
      title: input.title,
      description: input.description,
      dueDate: dueDateFinalDay,
    };
    return this.repository.update(input.id, task);
  }
}

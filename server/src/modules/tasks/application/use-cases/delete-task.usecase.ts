import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { TasksRepository } from 'src/core/domain/repositories/task.repository';
import { TASKS_REPOSITORY } from 'src/core/domain/repositories/task.repository';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject(TASKS_REPOSITORY)
    private readonly repository: TasksRepository,
  ) {}
  async execute(input: string): Promise<void> {
    const isTaskExist = await this.repository.findById(input);
    if (!isTaskExist) {
      throw new NotFoundException(`Task with id '${input}' not found`);
    }
    return this.repository.delete(input);
  }
}

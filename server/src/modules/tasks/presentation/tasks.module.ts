import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TASKS_REPOSITORY } from 'src/core/domain/repositories/task.repository';
import { MemoryTasksRepository } from '../infrastructure/memory-tasks.repository';
import { CreateTaskUseCase } from '../application/use-cases/create-task.usecase';
import { GetTasksUseCase } from '../application/use-cases/get-tasks.usecase';
import { UpdateTaskUseCase } from '../application/use-cases/update-task.usecase';
import { DeleteTaskUseCase } from '../application/use-cases/delete-task.usecase';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [
    {
      provide: TASKS_REPOSITORY,
      useClass: MemoryTasksRepository,
    },
    CreateTaskUseCase,
    GetTasksUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
  ],
})
export class TasksModule {}

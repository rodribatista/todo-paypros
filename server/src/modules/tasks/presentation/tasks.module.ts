import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TASKS_REPOSITORY } from 'src/core/domain/repositories/task.repository';
import { PrismaTasksRepository } from '../infrastructure/prisma-tasks.repository';
import { CreateTaskUseCase } from '../application/use-cases/create-task.usecase';
import { GetTasksUseCase } from '../application/use-cases/get-tasks.usecase';
import { UpdateTaskUseCase } from '../application/use-cases/update-task.usecase';
import { UpdateTaskStatusUseCase } from '../application/use-cases/update-task-status.usecase';
import { DeleteTaskUseCase } from '../application/use-cases/delete-task.usecase';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [
    {
      provide: TASKS_REPOSITORY,
      useClass: PrismaTasksRepository,
    },
    CreateTaskUseCase,
    GetTasksUseCase,
    UpdateTaskUseCase,
    UpdateTaskStatusUseCase,
    DeleteTaskUseCase,
  ],
})
export class TasksModule {}

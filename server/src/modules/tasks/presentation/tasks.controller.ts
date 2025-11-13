import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskUseCase } from '../application/use-cases/create-task.usecase';
import { GetTasksUseCase } from '../application/use-cases/get-tasks.usecase';
import { UpdateTaskUseCase } from '../application/use-cases/update-task.usecase';
import { UpdateTaskStatusUseCase } from '../application/use-cases/update-task-status.usecase';
import { DeleteTaskUseCase } from '../application/use-cases/delete-task.usecase';
import { CreateTaskRequest } from './dto/create-task.request';
import { UpdateTaskRequest } from './dto/update-task.request';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/jwt.guard';
import { CurrentUser } from 'src/modules/auth/infrastructure/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTask: CreateTaskUseCase,
    private readonly getTasks: GetTasksUseCase,
    private readonly updateTask: UpdateTaskUseCase,
    private readonly UpdateTaskStatusUseCase: UpdateTaskStatusUseCase,
    private readonly deleteTask: DeleteTaskUseCase,
  ) {}

  @Get()
  getAll(@CurrentUser() userId: string) {
    return this.getTasks.execute(userId);
  }

  @Post()
  create(@CurrentUser() userId: string, @Body() body: CreateTaskRequest) {
    return this.createTask.execute({
      title: body.title,
      description: body.description,
      dueDate: new Date(body.dueDate),
      userId,
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateTaskRequest) {
    return this.updateTask.execute({
      id: id,
      title: body.title,
      description: body.description,
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
    });
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string) {
    return this.UpdateTaskStatusUseCase.execute(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.deleteTask.execute(id);
  }
}

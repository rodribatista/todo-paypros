import type { TaskRequest } from "../domain/dto/task.request";
import { TaskSchema } from "../domain/task.schema";
import { tasksService } from "../../infrastructure/services/task.service";
import { AppError, ErrorType, isAppError } from "../../../../infrastructure/http/error.mapper";

export async function createTaskUseCase(input: TaskRequest) {
  try {
    const data = TaskSchema.parse(input);
    return await tasksService.createTask(data);
  } catch(error) {
    if (isAppError(error)) {
      handleRegisterErrors(error);
    } else {
      throw new AppError(ErrorType.UNKNOWN, "Error desconocido")
    }
  }
}

function handleRegisterErrors(error: AppError) {
  switch (error.type) {
    case ErrorType.VALIDATION:
      throw new AppError(ErrorType.VALIDATION, "Hay errores en el formulario")
    default:
      throw error;
  }
}

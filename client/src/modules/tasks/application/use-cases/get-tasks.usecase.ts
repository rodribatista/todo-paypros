import type { TaskModel } from "../domain/dto/task.dto";
import { tasksService } from "../../infrastructure/services/task.service";
import { AppError, ErrorType, isAppError } from "../../../../infrastructure/http/error.mapper";
import { useAuthStore } from "../../../../infrastructure/store/auth.store";

export async function getTasksUseCase(): Promise<TaskModel[]> {
  try {
    const data: TaskModel[] = await tasksService.getTasks();
    return data ?? [];
  } catch(error) {
    if (isAppError(error)) {
      handleGetTasksErrors(error);
      throw error;
    } else {
      throw new AppError(ErrorType.UNKNOWN, "Error desconocido")
    }
  }
}

function handleGetTasksErrors(error: AppError) {
  switch (error.type) {
    case ErrorType.UNAUTHORIZED:
      useAuthStore.getState().clearAuth();
      break;
    default:
      throw error;
  }
}

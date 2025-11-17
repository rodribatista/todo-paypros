import { tasksService } from "../../infrastructure/services/task.service";
import { AppError, ErrorType, isAppError } from "../../../../infrastructure/http/error.mapper";
import { useAuthStore } from "../../../../infrastructure/store/auth.store";

export async function changeTaskStatusUseCase(input: string) {
  try {
    await tasksService.changeTaskStatus(input);
  } catch(error) {
    if (isAppError(error)) {
      handleGetTasksErrors(error);
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

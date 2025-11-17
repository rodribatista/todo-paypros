import { tasksService } from "../../infrastructure/services/task.service";
import { AppError, ErrorType, isAppError } from "../../../../infrastructure/http/error.mapper";
import { useAuthStore } from "../../../../infrastructure/store/auth.store";

export async function deleteTaskUseCase(input:string) {
  try {
    const response = await tasksService.deleteTask(input);
    console.log(response);
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

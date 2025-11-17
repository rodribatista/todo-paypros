import type { LoginModel } from "../domain/dto/login.dto";
import { LoginSchema } from "../domain/login.schema";
import { authService } from "../../infrastructure/services/auth.service";
import { AppError, ErrorType, isAppError } from "../../../../infrastructure/http/error.mapper";
import { useAuthStore } from "../../../../infrastructure/store/auth.store";

export async function authLoginUseCase(input: LoginModel) {
  try {
    const data = LoginSchema.parse(input);
    const response = await authService.login(data);
    useAuthStore.getState().setAuth({
      token: response.access_token,
    })
    return response;
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
    case ErrorType.UNAUTHORIZED:
      throw new AppError(ErrorType.CONFLICT, "Credenciales invalidas. Intenta nuevamente!")
    default:
      throw error;
  }
}

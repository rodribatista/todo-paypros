import type { RegisterModel } from "../domain/dto/register.dto";
import { RegisterSchema } from "../domain/register.schema";
import { authService } from "../../infrastructure/services/auth.service";
import { AppError, ErrorType, isAppError } from "../../../../infrastructure/http/error.mapper";

export async function registerUserUseCase(input: RegisterModel) {
  try {
    const data = RegisterSchema.parse(input);
    return await authService.register(data);
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
    case ErrorType.CONFLICT:
      throw new AppError(ErrorType.CONFLICT, "El usuario ya está registrado")
    case ErrorType.VALIDATION:
      throw new AppError(ErrorType.VALIDATION, "Hay errores en el formulario")
    default:
      throw error;
  }
}
 
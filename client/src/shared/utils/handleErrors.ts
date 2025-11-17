import { isAppError } from "../../infrastructure/http/error.mapper";
export function handleErrors(error: any): string {
  if (isAppError(error)) return error.message;
  return "Error desconocido";
}

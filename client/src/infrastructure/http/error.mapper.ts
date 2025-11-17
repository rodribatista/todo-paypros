import axios from "axios";

export class AppError extends Error {
  type: ErrorType;
  status?: number;
  constructor(type: ErrorType, message: string, status?: number) {
    super(message);
    this.type = type;
    this.status = status;
  }
}

export const ErrorType = {
  NETWORK: "network",
  UNAUTHORIZED: "unauthorized",
  VALIDATION: "validation",
  NOT_FOUND: "not_found",
  CONFLICT: "conflict",
  SERVER: "server",
  UNKNOWN: "unknown",
} as const;

export type ErrorType = typeof ErrorType[keyof typeof ErrorType];

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function mapHttpError(error: unknown): AppError {
  if (!axios.isAxiosError(error)) {
    return new AppError(ErrorType.UNKNOWN, "Ha ocurrido un error inesperado.");
  }

  if (!error.response) {
    return new AppError(ErrorType.NETWORK, "No hay conexión con el servidor");
  }

  const status = error.response.status;
  const message =
    error.response.data?.message ||
    "Error inesperado en el servidor.";

  switch (status) {
    case 400:
      return new AppError(ErrorType.VALIDATION, message, status);
    case 401:
      return new AppError(ErrorType.UNAUTHORIZED, message, status);
    case 404:
      return new AppError(ErrorType.NOT_FOUND, message, status);
    case 409:
      return new AppError(ErrorType.CONFLICT, message, status);
    case 500:
      return new AppError(ErrorType.SERVER, "Hay un problema inesperado en el servidor", status);
    default:
      return new AppError(ErrorType.UNKNOWN, message, status);
  }
}

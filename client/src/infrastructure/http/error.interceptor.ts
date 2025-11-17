import { api } from "./axios.instance";
import { mapHttpError } from "./error.mapper";

export function errorsInterceptor() {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      throw mapHttpError(error);
    }
  );
}

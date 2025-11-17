import { api } from "../../../../infrastructure/http/axios.instance";
import type { RegisterModel } from "../../application/domain/dto/register.dto";
import type { LoginModel } from "../../application/domain/dto/login.dto";

export const authService = {
  async register(data: RegisterModel) {
    const res = await api.post("/users/register", data);
    return res.data;
  },
  async login(data: LoginModel) {
    const res = await api.post("/auth/login", data);
    return res.data;
  },
};

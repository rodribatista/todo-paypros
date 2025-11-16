import { api } from "../../../../lib/http/axios.instance";
import type { RegisterModel } from "../../application/domain/dto/register.dto";

export const authService = {
  async register(data: RegisterModel) {
    const res = await api.post("/users/register", data);
    return res.data;
  },
};

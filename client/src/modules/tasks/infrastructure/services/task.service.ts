import { api } from "../../../../infrastructure/http/axios.instance";

export const tasksService = {
  async getTasks() {
    const res = await api.get("/tasks");
    return res.data;
  },
};

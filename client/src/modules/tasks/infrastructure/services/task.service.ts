import { api } from "../../../../infrastructure/http/axios.instance";

export const tasksService = {
  async getTasks() {
    const res = await api.get("/tasks");
    return res.data;
  },
  async changeTaskStatus(id: string) {
    return await api.patch(`/tasks/${id}/status`);
  },
  async deleteTask(id: string) {
    return await api.delete(`/tasks/${id}`);
  },
};

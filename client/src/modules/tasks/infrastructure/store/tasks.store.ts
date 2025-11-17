import { create } from "zustand";
import type { TaskModel } from "../../application/domain/dto/task.dto";
import { getTasksUseCase } from "../../application/use-cases/get-tasks.usecase";
import { changeTaskStatusUseCase } from "../../application/use-cases/change-task-status.usecase";
import { deleteTaskUseCase } from "../../application/use-cases/delete-task.usecase";

interface TasksStore {
  isLoading: boolean;
  tasks: TaskModel[];
  getTasks: () => void;
  changeTaskStatus: (id: string) => void;
  deleteTask: (id: string) => void
}

export const useTaskStore = create<TasksStore>((set, get) => ({
  isLoading: true,
  tasks: [],

  getTasks: async () => {
    set({ isLoading: true });
    const tasks = await getTasksUseCase();
    set({ isLoading: false, tasks });
  },

  changeTaskStatus: async (id) => {
    set({ isLoading: true });
    await changeTaskStatusUseCase(id);
    get().getTasks();
  },

  deleteTask: async (id) => {
    set({ isLoading: true });
    await deleteTaskUseCase(id);
    get().getTasks();
  },
}));

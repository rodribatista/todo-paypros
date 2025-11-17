import { useState, useEffect } from "react";
import type { TaskModel } from "../../application/domain/dto/task.dto";
import { getTasksUseCase } from "../../application/use-cases/get-tasks.usecase";

export function useTasks() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getTasksUseCase();
        setTasks(data);
      } finally {
        setLoading(false);
      }
    })()
  }, []);

  return { tasks, loading };
}

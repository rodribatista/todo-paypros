import { useEffect } from "react";
import { useTaskStore } from "../../infrastructure/store/tasks.store";
import { TasksHeader } from "../components/TaskHeader";
import { TaskList } from "../components/TaskList";

function Tasks() {
  const { isLoading, tasks, getTasks } = useTaskStore();

  useEffect(() => {
    getTasks();
  }, [])

  return (
    <main className="w-full px-50 py-25 flex flex-col gap-20">
      <TasksHeader />
      {isLoading ? (
        <p className="text-2xl text-neutral-400 text-center">Cargando tareas...</p>
      ) : (
        <TaskList tasks={tasks} />
      )}
    </main>
  );
}
export default Tasks;

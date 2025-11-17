import type { TaskModel } from "../../application/domain/dto/task.dto";
import { useTaskStore } from "../../infrastructure/store/tasks.store";

export const TaskItem = ({ task }: { task: TaskModel }) => {
  const { changeTaskStatus, deleteTask } = useTaskStore();
  const isCompleted: boolean = task.status === 'completed';

  return (
    <div className={`w-full flex px-8 py-6 bg-indigo-800 rounded-lg justify-between items-center shadow-md border border-indigo-900 hover:border-amber-600 transition ${isCompleted && 'opacity-50'}`}>
      <div className="flex flex-col gap-1">
        <h2 className={`text-lg font-semibold ${isCompleted && 'line-through'}`}>{task.title}</h2>
        <p className={`text-neutral-400 text-sm ${isCompleted && 'line-through'}`}>{task.description}</p>
      </div>
      <div className="flex gap-2">
        <button
          className={`text-sm px-3 py-1 rounded-xl ${isCompleted ? "bg-green-700 text-green-200" : "bg-indigo-900 text-neutral-300"} hover:cursor-pointer`}
          onClick={() => changeTaskStatus(task.id)}
        >
          {isCompleted ? "Completada" : `${task.dueDate}`}
        </button>
        {isCompleted &&
          <button
            className={`text-sm px-3 py-1 rounded-xl bg-indigo-900 text-neutral-300"} hover:cursor-pointer`}
            onClick={() => deleteTask(task.id)}
          >
            Eliminar
          </button>
        }
      </div>
    </div>
  );
}

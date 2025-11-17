import type { TaskModel } from "../../application/domain/dto/task.dto";
import { EmptyList } from "./EmptyList";
import { TaskItem } from "./TaskItem";

export const TaskList = ({ tasks }: { tasks: TaskModel[] }) => {
  if (tasks.length === 0) return <EmptyList/>;
  return (
    <div className="w-full flex flex-col gap-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

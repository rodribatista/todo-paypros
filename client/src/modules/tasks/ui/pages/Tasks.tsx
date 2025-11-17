import { useTasks } from "../hooks/useTasks";

function Tasks() {
  const { tasks, loading } = useTasks();

  return (
    <div>
      <h1>Tasks</h1>
      { loading && <p>Cargando tareas...</p> }
      {tasks.map((task) => <p key={task.id}>{task.title}</p>)}
    </div>
  );
}
export default Tasks;

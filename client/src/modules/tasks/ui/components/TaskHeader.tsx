import { authLogoutUseCase } from "../../../auth/application/use-cases/auth-logout.usecase";

interface TaskHeaderProps {
  showForm: boolean;
  toggleForm: (show: boolean) => void;
}

export const TasksHeader = ({ showForm, toggleForm }: TaskHeaderProps) => {
  return (
    <header className="w-full flex items-center justify-between">
      <h1 className="text-6xl font-light">Tareas</h1>
      <div className="flex gap-2">
        <button
          className={`px-5 py-3 rounded-lg ${showForm ? 'bg-indigo-700 hover:bg-indigo-800' : 'bg-amber-600 hover:bg-amber-700'} transition font-semibold cursor-pointer`}
          onClick={() => toggleForm(!showForm)}
        >
          { showForm ? 'Cerrar' : 'Nueva tarea' }
        </button>
        <button
          className="px-5 py-3 rounded-lg bg-indigo-700 hover:bg-indigo-800 transition font-semibold cursor-pointer"
          onClick={() => authLogoutUseCase()}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

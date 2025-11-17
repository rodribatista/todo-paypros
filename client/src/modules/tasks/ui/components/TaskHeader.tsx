import { authLogoutUseCase } from "../../../auth/application/use-cases/auth-logout.usecase";

export const TasksHeader = () => {
  return (
    <header className="w-full flex items-center justify-between">
      <h1 className="text-6xl font-light">Tareas</h1>
      <button
        className="px-5 py-3 rounded-lg bg-indigo-700 hover:bg-indigo-800 transition font-semibold cursor-pointer"
        onClick={() => authLogoutUseCase()}
      >
        Cerrar sesión
      </button>
    </header>
  );
}

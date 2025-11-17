import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema } from "../../application/domain/task.schema";
import type { TaskRequest } from "../../application/domain/dto/task.request";
import { useTaskStore } from "../../infrastructure/store/tasks.store";
import { handleErrors } from "../../../../shared/utils/handleErrors";
import { useNotify } from "../../../../shared/ui/hooks/useNotify";

interface TaskFormProps {
  toggleForm: (show: boolean) => void;
}

export const TaskForm = ({ toggleForm }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    resolver: zodResolver(TaskSchema),
  });
  const notify = useNotify();
  const { createTask } = useTaskStore();

  const onSubmit = async (data: TaskRequest) => {
    try {
      notify.loading('create', 'Creando tarea...');
      await createTask(data);
      notify.success('create', 'Tarea creada correctamente');
      toggleForm(false);
      reset();
    } catch(error) {
      notify.error('create', handleErrors(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className="w-full p-10 flex flex-col gap-5 bg-neutral-800 rounded-xl">
      <input
        type="text"
        maxLength={50}
        {...register("title")}
        className={`px-4 py-5 rounded bg-neutral-700 text-white outline-none focus:ring-2 focus:ring-indigo-700 ${errors.title && "ring-2 ring-red-400"}`}
        placeholder="Titulo de la tarea"
      />
      <input
        type="textarea"
        maxLength={150}
        {...register("description")}
        className={`px-4 py-5 rounded bg-neutral-700 text-white outline-none focus:ring-2 focus:ring-indigo-700 ${errors.description && "ring-2 ring-red-400"}`}
        placeholder="Descripcion de la tarea"
      />
      <input
        type="date"
        {...register("dueDate")}
        className={`px-4 py-5 rounded bg-neutral-700 text-white outline-none focus:ring-2 focus:ring-indigo-700 ${errors.dueDate && "ring-2 ring-red-400"}`}
        placeholder="Fecha límite"
      />
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full py-4 rounded bg-amber-600 hover:bg-amber-500 transition font-semibold cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-600"
      >
        Agregar nueva tarea
      </button>
    </form>
  );
}

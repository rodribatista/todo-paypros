import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "../../application/domain/login.schema";
import type { LoginModel } from "../../application/domain/dto/login.dto";
import { authLoginUseCase } from "../../application/use-cases/auth-login.usecase";
import { handleErrors } from "../../../../shared/utils/handleErrors";
import { useNotify } from "../../../../shared/ui/hooks/useNotify";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const navigate = useNavigate();
  const notify = useNotify();

  const onSubmit = async (data: LoginModel) => {
    try {
      notify.loading('login', 'Iniciando sesion...');
      await authLoginUseCase(data);
      notify.success('login', 'Inicio de sesion exitoso');
      navigate('/')
    } catch(error) {
      notify.error('login', handleErrors(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          {...register("username")}
          className={`px-4 py-5 rounded bg-neutral-700 text-white outline-none focus:ring-2 focus:ring-indigo-700 ${errors.username && "ring-2 ring-red-400"}`}
          placeholder="Usuario"
        />
      </div>
      <div className="flex flex-col gap-1">
        <input
          type="password"
          {...register("password")}
          className={`px-4 py-5 rounded bg-neutral-700 text-white outline-none focus:ring-2 focus:ring-indigo-700 ${errors.password && "ring-2 ring-red-400"}`}
          placeholder="********"
        />
      </div>
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full py-4 rounded bg-amber-600 hover:bg-amber-500 transition font-semibold cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-600"
      >
        Iniciar sesion
      </button>
    </form>
  );
}

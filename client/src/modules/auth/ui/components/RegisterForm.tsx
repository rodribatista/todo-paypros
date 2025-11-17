import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { RegisterSchema } from "../../application/domain/register.schema";
import type { RegisterModel } from "../../application/domain/dto/register.dto";
import { registerUserUseCase } from "../../application/use-cases/register-user.usecase";
import { handleErrors } from "../../../../shared/utils/handleErrors";
import { useNotify } from "../../../../shared/ui/hooks/useNotify";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });
  const navigate = useNavigate();
  const notify = useNotify();

  const onSubmit = async (data: RegisterModel) => {
    try {
      notify.loading('register', 'Creando cuenta del usuario...');
      await registerUserUseCase(data);
      notify.success('register', 'Usuario registrado correctamente');
      navigate('/login')
    } catch(error) {
      notify.error('register', handleErrors(error));
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
          onFocus={(e) => {
            const small = e.target.nextSibling as HTMLElement;
            small.classList.remove("hidden");
          }}
          onBlur={(e) => {
            const small = e.target.nextSibling as HTMLElement;
            small.classList.add("hidden");
          }}
        />
        <small className="hidden mt-2 text-neutral-400 text-center">Entre 4 y 24 caracteres. No puede contener espacios.</small>
      </div>
      <div className="flex flex-col gap-1">
        <input
          type="password"
          {...register("password")}
          className={`px-4 py-5 rounded bg-neutral-700 text-white outline-none focus:ring-2 focus:ring-indigo-700 ${errors.password && "ring-2 ring-red-400"}`}
          placeholder="********"
          onFocus={(e) => {
            const small = e.target.nextSibling as HTMLElement;
            small.classList.remove("hidden");
          }}
          onBlur={(e) => {
            const small = e.target.nextSibling as HTMLElement;
            small.classList.add("hidden");
          }}
        />
        <small className="hidden mt-2 text-neutral-400 text-center">Entre 8 y 24 caracteres. Debe incluir al menos una mayúscula y un número.</small>
      </div>
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full py-4 rounded bg-amber-600 hover:bg-amber-500 transition font-semibold cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-600"
      >
        Registrarse
      </button>
    </form>
  );
}

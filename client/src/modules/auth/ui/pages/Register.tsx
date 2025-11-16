import { RegisterForm } from "../components/RegisterForm";
import { Link } from "react-router-dom";

function Register() {
  return (
    <main className="w-full flex flex-col gap-10 items-center justify-center">
      <p className="w-1/2 text-6xl font-light text-center">Crea tu cuenta y registra tus tareas</p>
      <div className="w-1/2 p-20 flex flex-col gap-10 bg-neutral-800 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center">Registrarse</h1>
        <RegisterForm />
        <p className="text-sm text-neutral-400 text-center">
          ¿Ya tenes cuenta?{" "}
          <Link to="/login" className="text-amber-600 hover:text-amber-500">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
export default Register;

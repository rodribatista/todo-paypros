import { LoginForm } from "../components/LoginForm";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <main className="w-full flex flex-col gap-10 items-center justify-center">
      <p className="w-1/2 text-6xl font-light text-center">Bienvenido!</p>
      <div className="w-1/2 p-20 flex flex-col gap-10 bg-neutral-800 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>
        <LoginForm />
        <p className="text-sm text-neutral-400 text-center">
          ¿No tenes cuenta?{" "}
          <Link to="/register" className="text-amber-600 hover:text-amber-500">
            Registrate
          </Link>
        </p>
      </div>
    </main>
  );
}
export default LoginPage;

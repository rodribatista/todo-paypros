import { Link } from "react-router-dom";

function NotFound() {
  return (
  <div className="flex flex-col justify-center text-center gap-5">
    <h1 className="text-4xl">Página no encontrada</h1>
    <Link to="/" className="text-neutral-400 hover:underline">
      Volver al inicio
    </Link>
  </div>
  );
}
export default NotFound;

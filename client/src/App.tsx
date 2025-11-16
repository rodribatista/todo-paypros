import AppRouter from "./router/AppRouter";
import { Toaster } from "sonner";

function App() {
  return <>
    <Toaster
      position="top-center"
      theme='dark'
      richColors
      closeButton
    />
    <AppRouter />
  </>
}
export default App;

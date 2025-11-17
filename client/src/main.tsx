import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { authInterceptor } from './infrastructure/http/auth.interceptor.ts'
import { errorsInterceptor } from './infrastructure/http/error.interceptor.ts'
import App from './App.tsx'
import './index.css'

authInterceptor();
errorsInterceptor();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

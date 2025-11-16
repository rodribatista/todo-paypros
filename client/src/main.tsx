import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { errorsInterceptor } from './lib/http/error.interceptor.ts'
import App from './App.tsx'
import './index.css'

errorsInterceptor();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

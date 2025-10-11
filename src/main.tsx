import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx' 
import {Login} from "./pages/Login/Login.tsx"
import { Register } from './pages/Register/Register.tsx'

import {BrowserRouter} from "react-router-dom"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

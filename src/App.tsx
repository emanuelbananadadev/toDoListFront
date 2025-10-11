import styles from "./App.module.css"
import {Routes, Route} from 'react-router-dom'
import { Login } from "./pages/Login/Login"
import { Register } from "./pages/Register/Register"
import { Dashboard } from "./pages/Dashboard/Dashboard"

export function App() {
  return(
   <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
   </Routes>
  )
}
import styles from "./App.module.css"
import {Routes, Route} from 'react-router-dom'
import { Login } from "./pages/Login/Login"
import { Register } from "./pages/Register/Register"
import { Dashboard } from "./pages/Dashboard/Dashboard"
import { ChangePassword } from "./pages/Profile/ChangePassword"

export function App() {
  return(
   <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/profile/change-password" element={<ChangePassword/>}  />
   </Routes>
  )
}
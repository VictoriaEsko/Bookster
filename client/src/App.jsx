import { Route, Routes } from "react-router-dom"

import Start from "./pages/start"
import LoginForm from "./pages/login"
import RegisterForm from "./pages/register"
import Dashboard from "./pages/Dashboard"


export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Start/>}/>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/register" element={<RegisterForm/>}/>
      <Route path="/admin/dashboard" element={<Dashboard/>}/>
    </Routes>
    
    </>
  )
  }


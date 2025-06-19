import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { Empleados } from "./pages/Empleados"
import { CrearEmpleado } from "./pages/CrearEmpleado"
import { NotFound } from "./components/NotFound"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/empleados" element={<Empleados />}/>
        <Route path="/empleados/nuevo" element={<CrearEmpleado />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </Router>
  )
}


export default App
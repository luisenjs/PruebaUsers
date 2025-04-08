import { BrowserRouter, Route, Routes } from "react-router"
import { MainLayout } from "./layout/mainlayout"
import { Inicio } from "./pages/inicio"
import { Usuarios } from "./pages/usuarios"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

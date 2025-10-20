import "./index.css";
import { Routes, Route } from "react-router-dom";
import Encabezado from "./components/Encabezado"
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MiniCatalogo from "./components/MiniCatalogo";
import ProgresoScroll from "./components/ProgresoScroll";
import Piedepagina from "./components/Piedepagina";
import Register from "./pages/Register";
import { Link } from "react-router-dom";
import PanelAdmin from "./components/PanelAdmin";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ProgresoScroll />
      <Encabezado />
      <main className="flex-grow-1 container my-4">

        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <MiniCatalogo />
              <div className="mb-3">
                <Link to="/admin" className="btn btn-primary">Ir al Panel Admin</Link>
              </div>
            </>
          } />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<PanelAdmin />} />
        </Routes>
      </main>
      <Piedepagina />
    </div>
  );
}

export default App;
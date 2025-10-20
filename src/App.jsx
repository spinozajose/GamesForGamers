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
import PanelAdmin from "./components/Admin/PanelAdmin";
import Checkout from './pages/Checkout';
import Precompras from './pages/Precompras'; // AGREGAR ESTA IMPORTACIÓN
import Ordenes from './components/Admin/ordenes'; 
import Boletas from './components/Admin/Boletas';
import Productos from './components/Admin/Productos';
import Categorias from './components/Admin/Categorias';
import Usuarios from './components/Admin/Usuarios';
import Reportes from './components/Admin/Reportes';
import NuevoProducto from './components/Admin/NuevoProducto';
import NuevaCategoria from './components/Admin/NuevaCategoria';

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
                
                <Link to="/precompras" className="btn btn-warning ms-2">Ver Precompras</Link> {/* ✅ AGREGAR BOTÓN */}
              </div>
            </>
          } />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<PanelAdmin />} />
          <Route path="/admin/productos" element={<Productos />} />
          <Route path="/admin/categorias" element={<Categorias />} />
          <Route path="/admin/ordenes" element={<Ordenes />} />
          <Route path= "/admin/usuarios" element= {<Usuarios />} />
          <Route path="/admin/reportes" element={<Reportes />} />
          <Route path="/admin/productos/nuevoproducto" element={<NuevoProducto />} />
          <Route path="/admin/categorias/nuevacategoria" element={<NuevaCategoria />} />
          <Route path="/admin/ordenes/:id" element={<Boletas />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/precompras" element={<Precompras />} /> {/* ✅ AGREGAR ESTA RUTA */}
        </Routes>
      </main>
      <Piedepagina />
    </div>
  );
}

export default App;
import "./index.css";
import { Routes, Route } from "react-router-dom";

// Layout
import Encabezado from "./components/layouts/Header/Encabezado";
import Piedepagina from "./components/layouts/Footer/Piedepagina";

// Páginas
import Inicio from "./pages/Home/Inicio";
import Contacto from "./pages/Contact/Contacto";
import InicioSesion from "./pages/Login/InicioSesion";
import Registro from "./pages/Register/Registro";
import VerificarCompra from "./pages/Checkout/VerificarCompra";
import Precompras from "./pages/Catalog/CatalogoPrecompras";
import Catalogo from "./pages/Catalog/Catalogo"; 
import CatalogoOfertas from "./pages/Catalog/CatalogoOfertas";

// Admin
import PanelAdmin from "./components/Admin/PanelAdmin";
import Ordenes from "./components/Admin/ordenes";
import Boletas from "./components/Admin/Boletas";
import Productos from "./components/Admin/Productos";
import Categorias from "./components/Admin/Categorias";
import Usuarios from "./components/Admin/Usuarios";
import Reportes from "./components/Admin/Reportes";
import NuevoProducto from "./components/Admin/NuevoProducto";
import NuevaCategoria from "./components/Admin/NuevaCategoria";

function App() {
  return (
    <div className="app">
      <Encabezado />

      <main className="main-content">
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Inicio />} />

          {/* Rutas públicas principales */}
          <Route path="/catalogo" element={<Catalogo />} /> {/* <--- NUEVA RUTA AÑADIDA */}
          <Route path="/ofertas" element={<CatalogoOfertas />} />
          <Route path="/precompras" element={<Precompras />} />
          <Route path="/contact" element={<Contacto />} />
          <Route path="/login" element={<InicioSesion />} />
          <Route path="/register" element={<Registro />} />
          <Route path="/checkout" element={<VerificarCompra />} />

          {/* Rutas admin */}
          <Route path="/admin" element={<PanelAdmin />} />
          <Route path="/admin/productos" element={<Productos />} />
          <Route path="/admin/categorias" element={<Categorias />} />
          <Route path="/admin/ordenes" element={<Ordenes />} />
          <Route path="/admin/usuarios" element={<Usuarios />} />
          <Route path="/admin/reportes" element={<Reportes />} />
          <Route path="/admin/productos/nuevoproducto" element={<NuevoProducto />} />
          <Route path="/admin/categorias/nuevacategoria" element={<NuevaCategoria />} />
          <Route path="/admin/ordenes/:id" element={<Boletas />} />
        </Routes>
      </main>

      <Piedepagina />
    </div>
  );
}

export default App;
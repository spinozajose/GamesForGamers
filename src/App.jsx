import "./index.css";
import { Routes, Route } from "react-router-dom";

// Layout
import Encabezado from "./components/layouts/Header/Encabezado";
import Piedepagina from "./components/layouts/Footer/Piedepagina";

// Páginas Públicas
import Inicio from "./pages/Home/Inicio";
import Contacto from "./pages/Contact/Contacto";
import InicioSesion from "./pages/Login/InicioSesion";
import Registro from "./pages/Register/Registro";
import VerificarCompra from "./pages/Checkout/VerificarCompra";
import CatalogoPrecompras from "./pages/Catalog/CatalogoPrecompras"; 
import Catalogo from "./pages/Catalog/Catalogo"; 
import CatalogoOfertas from "./pages/Catalog/CatalogoOfertas";
import MisCompras from "./pages/Profile/MisCompras"; 

// Admin (Si tienes estos componentes creados)
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
          {/* === Rutas Públicas === */}
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/ofertas" element={<CatalogoOfertas />} />
          <Route path="/precompras" element={<CatalogoPrecompras />} />
          <Route path="/contact" element={<Contacto />} /> {/* Ruta coincide con el nombre de carpeta si prefieres */}
          <Route path="/contacto" element={<Contacto />} /> {/* Alias en español por si acaso */}
          
          {/* Autenticación */}
          <Route path="/login" element={<InicioSesion />} />
          <Route path="/register" element={<Registro />} />
          
          {/* Proceso de Compra */}
          <Route path="/checkout" element={<VerificarCompra />} />
          
          {/* Perfil de Usuario Protegido */}
          <Route path="/mis-compras" element={<MisCompras />} />

          {/* === Rutas de Administración === */}
          <Route path="/panel-admin" element={<PanelAdmin />} />
          <Route path="/panel-admin/productos" element={<Productos />} />
          <Route path="/panel-admin/categorias" element={<Categorias />} />
          <Route path="/panel-admin/ordenes" element={<Ordenes />} />
          <Route path="/panel-admin/usuarios" element={<Usuarios />} />
          <Route path="/panel-admin/reportes" element={<Reportes />} />
          <Route path="/panel-admin/productos/nuevoproducto" element={<NuevoProducto />} />
          <Route path="/panel-admin/categorias/nuevacategoria" element={<NuevaCategoria />} />
          <Route path="/panel-admin/ordenes/:id" element={<Boletas />} />
        </Routes>
      </main>

      <Piedepagina />
    </div>
  );
}

export default App;
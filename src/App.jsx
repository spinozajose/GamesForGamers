import "./index.css";
import { Routes, Route, useLocation } from "react-router-dom";

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
import DetalleJuego from "./pages/GamesDetails/DetalleJuego";
import MisCompras from "./pages/Profile/MisCompras"; 

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
import EditarProducto from "./components/Admin/EditarProducto";

function App() {
  const location = useLocation();
  
  // Detectar si estamos en una ruta de administración
  const esRutaAdmin = location.pathname.startsWith('/panel-admin');

  return (
    <div className="app">
      {/* 1. Ocultar Encabezado público en rutas de Admin */}
      {!esRutaAdmin && <Encabezado />}

      {/* Si es admin, quitamos la clase "main-content" (que tiene márgenes para el header fijo)
         y dejamos que el PanelAdmin maneje su propio layout (sidebar + contenido).
      */}
      <main className={!esRutaAdmin ? "main-content" : ""}>
        <Routes>
          {/* === Rutas Públicas === */}
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/ofertas" element={<CatalogoOfertas />} />
          <Route path="/detalle/:id" element={<DetalleJuego />} />
          <Route path="/precompras" element={<CatalogoPrecompras />} />
          <Route path="/contact" element={<Contacto />} />
          <Route path="/contacto" element={<Contacto />} />
          
          <Route path="/login" element={<InicioSesion />} />
          <Route path="/register" element={<Registro />} />
          <Route path="/checkout" element={<VerificarCompra />} />
          <Route path="/mis-compras" element={<MisCompras />} />

          {/* === Rutas de Administración (ANIDADAS) === */}
          {/* Al anidar, PanelAdmin actúa como "Layout" y el Sidebar se mantiene fijo */}
          <Route path="/panel-admin" element={<PanelAdmin />}>
            
            {/* Rutas Hijas (se renderizan dentro del <Outlet /> de PanelAdmin) */}
            <Route path="productos" element={<Productos />} />
            <Route path="productos/nuevoproducto" element={<NuevoProducto />} />
            <Route path="productos/editar/:id" element={<EditarProducto />} />

            <Route path="categorias" element={<Categorias />} />
            <Route path="categorias/nuevacategoria" element={<NuevaCategoria />} />

            <Route path="ordenes" element={<Ordenes />} />
            <Route path="ordenes/:id" element={<Boletas />} />

            <Route path="usuarios" element={<Usuarios />} />
            <Route path="reportes" element={<Reportes />} />
            
          </Route>
        </Routes>
      </main>

      {/* 2. Ocultar Footer público en rutas de Admin */}
      {!esRutaAdmin && <Piedepagina />}
    </div>
  );
}

export default App;
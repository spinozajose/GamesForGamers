import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import './PanelAdmin.css';

const PanelAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);

  // 1. Seguridad: Verificar si es admin al cargar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (!usuarioGuardado) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(usuarioGuardado);
    // Verificación robusta de permisos
    const esAdmin = user.esAdmin || user.permisosAdmin || user.permisos_admin;

    if (!esAdmin) {
      alert("Acceso denegado: Se requieren permisos de Administrador.");
      navigate('/');
      return;
    }
    setUsuario(user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  if (!usuario) return null;

  // Helper para marcar el enlace activo en el menú
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="admin-layout">
      
      {/* === SIDEBAR LATERAL === */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>GFG Admin</h2>
          <span className="admin-badge">PRO</span>
        </div>

        <nav className="admin-nav">
          <Link to="/panel-admin" className={`admin-link ${location.pathname === '/panel-admin' ? 'active' : ''}`}>
             Dashboard
          </Link>
          <Link to="/panel-admin/ordenes" className={`admin-link ${isActive('/panel-admin/ordenes') ? 'active' : ''}`}>
             Órdenes
          </Link>
          <Link to="/panel-admin/productos" className={`admin-link ${isActive('/panel-admin/productos') ? 'active' : ''}`}>
             Productos
          </Link>
          <Link to="/panel-admin/usuarios" className={`admin-link ${isActive('/panel-admin/usuarios') ? 'active' : ''}`}>
             Usuarios
          </Link>
          <Link to="/panel-admin/reportes" className={`admin-link ${isActive('/panel-admin/reportes') ? 'active' : ''}`}>
             Reportes
          </Link>
        </nav>

        <div className="admin-user-info">
          <p>Admin: {usuario.username || usuario.nombre || "Usuario"}</p>
          <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
          <Link to="/" className="btn-tienda-link" style={{display:'block', textAlign:'center', marginTop:'10px', fontSize:'0.8rem', color:'#00f2ff', textDecoration:'none'}}>
            Ir a la Tienda →
          </Link>
        </div>
      </aside>

      {/* === CONTENIDO PRINCIPAL === */}
      <main className="admin-content">
        
        {/* Si estamos en la raíz del panel, mostramos el Dashboard de bienvenida */}
        {location.pathname === '/panel-admin' ? (
          <div className="dashboard-welcome">
            <h1>Panel de Control</h1>
            
            <div className="stats-overview">
              <div className="stat-card">
                <h3>Ingresos Totales</h3>
                <p className="stat-value">$12,450</p>
                <small style={{color:'#00ff88'}}>↑ 15% este mes</small>
              </div>
              <div className="stat-card">
                <h3>Pedidos Nuevos</h3>
                <p className="stat-value">58</p>
                <small style={{color:'#ffbb33'}}>10 pendientes</small>
              </div>
              <div className="stat-card">
                <h3>Usuarios Activos</h3>
                <p className="stat-value">1,203</p>
                <small style={{color:'#00ff88'}}>↑ 8 nuevos hoy</small>
              </div>
            </div>

            <div className="quick-actions">
                <h3>Accesos Directos</h3>
                <div className="action-buttons">
                    <button onClick={() => navigate('/panel-admin/productos')} className="btn-action">
                         Inventario
                    </button>
                    <button onClick={() => navigate('/panel-admin/usuarios')} className="btn-action">
                         Usuarios
                    </button>
                    <button onClick={() => navigate('/panel-admin/ordenes')} className="btn-action">
                         Órdenes
                    </button>
                </div>
            </div>
          </div>
        ) : (
          /* IMPORTANTE: Aquí se renderizan las sub-rutas (Productos, Ordenes, etc.) */
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default PanelAdmin;
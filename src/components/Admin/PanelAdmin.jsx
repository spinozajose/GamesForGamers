import React from 'react';
import { Link } from 'react-router-dom';
import "./PanelAdmin.css";

function PanelAdmin() {
  return (
    <div className="panel-admin">
      
      
      <aside className="sidebar-wrapper">
        <div className="brand-logo">
          GAMES<span className="text-gradient">FOR</span>GAMERS
        </div>

        <nav className="nav flex-column">
          <Link to="/panel-admin" className="nav-link active">
            <i className="bi bi-speedometer2" /> Dashboard
          </Link>
          <Link to="/panel-admin/ordenes" className="nav-link">
            <i className="bi bi-cart-check" /> Ordenes
          </Link>
          <Link to="/panel-admin/productos" className="nav-link">
            <i className="bi bi-box-seam" /> Productos
          </Link>
          <Link to="/panel-admin/usuarios" className="nav-link">
            <i className="bi bi-people" /> Usuarios
          </Link>
          <Link to="/panel-admin/reportes" className="nav-link">
            <i className="bi bi-graph-up" /> Reportes
          </Link>
        </nav>


        <div className="mt-auto px-3">
          <Link to="/" className="btn btn-outline-info w-100 mb-2">
            <i className="bi bi-shop me-2"></i> Ir a Tienda
          </Link>
          <Link to="/login" className="btn btn-outline-danger w-100">
             Cerrar Sesión
          </Link>
        </div>
      </aside>


      <main className="main-content-admin">

        <div className="top-header">
          <h2 className="text-white">Dashboard General</h2>
          <div className="text-white">Bienvenido, Admin</div>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="dashboard-card d-flex justify-content-between align-items-center">
              <div>
                <div className="card-title">Ingresos Totales</div>
                <div className="card-value">$12,450</div>
                <small className="text-success">↑ 15% este mes</small>
              </div>
              <i className="bi bi-currency-dollar icon-bg"></i>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="dashboard-card d-flex justify-content-between align-items-center">
              <div>
                <div className="card-title">Pedidos Nuevos</div>
                <div className="card-value">58</div>
                <small className="text-warning">10 pendientes</small>
              </div>
              <i className="bi bi-bag icon-bg"></i>
            </div>
          </div>

          <div className="col-md-4">
            <div className="dashboard-card d-flex justify-content-between align-items-center">
              <div>
                <div className="card-title">Usuarios Activos</div>
                <div className="card-value">1,203</div>
                <small className="text-success">↑ 8 nuevos hoy</small>
              </div>
              <i className="bi bi-people icon-bg"></i>
            </div>
          </div>
        </div>

        <h4 className="text-white mb-3">Accesos Directos</h4>
        <div className="row g-4">
            <div className="col-md-3 col-sm-6">
                <Link to="/panel-admin/productos" className="text-decoration-none">
                    <div className="dashboard-card text-center hover-effect">
                        <i className="bi bi-box-seam fs-1 text-info mb-3 d-block"></i>
                        <h5 className="text-white">Inventario</h5>
                    </div>
                </Link>
            </div>
            <div className="col-md-3 col-sm-6">
                <Link to="/panel-admin/usuarios" className="text-decoration-none">
                    <div className="dashboard-card text-center hover-effect">
                        <i className="bi bi-person-gear fs-1 text-info mb-3 d-block"></i>
                        <h5 className="text-white">Usuarios</h5>
                    </div>
                </Link>
            </div>
             <div className="col-md-3 col-sm-6">
                <Link to="/panel-admin/ordenes" className="text-decoration-none">
                    <div className="dashboard-card text-center hover-effect">
                        <i className="bi bi-file-earmark-text fs-1 text-info mb-3 d-block"></i>
                        <h5 className="text-white">Ordenes</h5>
                    </div>
                </Link>
            </div>
             <div className="col-md-3 col-sm-6">
                <Link to="/panel-admin/config" className="text-decoration-none">
                    <div className="dashboard-card text-center hover-effect">
                        <i className="bi bi-gear fs-1 text-info mb-3 d-block"></i>
                        <h5 className="text-white">Ajustes</h5>
                    </div>
                </Link>
            </div>
        </div>

      </main>
    </div>
  );
}

export default PanelAdmin;
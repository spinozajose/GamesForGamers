import React from 'react';
import { Link } from 'react-router-dom';
import "./PanelAdmin.css";

function Reportes() {
  return (
    <div className="panel-admin">
      <aside className="sidebar-wrapper">
        <div className="brand-logo">GAMES<span className="text-gradient">FOR</span>GAMERS</div>
        <nav className="nav flex-column">
          <Link to="/panel-admin" className="nav-link"><i className="bi bi-speedometer2" /> Dashboard</Link>
          <Link to="/panel-admin/ordenes" className="nav-link"><i className="bi bi-cart-check" /> Ordenes</Link>
          <Link to="/panel-admin/productos" className="nav-link"><i className="bi bi-box-seam" /> Productos</Link>
          <Link to="/panel-admin/usuarios" className="nav-link"><i className="bi bi-people" /> Usuarios</Link>
          <Link to="/panel-admin/reportes" className="nav-link active"><i className="bi bi-graph-up" /> Reportes</Link>
        </nav>
        <div className="mt-auto px-3">
          <Link to="/" className="btn btn-outline-info w-100 mb-2">Ir a Tienda</Link>
          <Link to="/login" className="btn btn-outline-danger w-100">Cerrar Sesión</Link>
        </div>
      </aside>

      <main className="main-content-admin">
        <h2 className="text-white mb-2">Analíticas y Reportes</h2>
        <p className="text-white mb-4">Visión integral del rendimiento de tu tienda.</p>

        <div className="row g-4">
            <div className="col-md-6">
                <div className="dashboard-card h-100">
                    <h5 className="card-title">Ventas Mensuales</h5>
                    <p className="small text-white">Comparativa semestre actual</p>
                    <div style={{minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <canvas id="barChart" />
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="dashboard-card h-100">
                    <h5 className="card-title">Nuevos Usuarios</h5>
                    <p className="small text-white">Crecimiento últimos 30 días</p>
                    <div style={{minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                         <canvas id="lineChart" />
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="dashboard-card h-100">
                    <h5 className="card-title">Categorías Top</h5>
                     <div style={{minHeight: '200px'}}>
                        <canvas id="pieChart" />
                    </div>
                </div>
            </div>
             <div className="col-md-8">
                <div className="dashboard-card h-100">
                    <h5 className="card-title">Rendimiento por Región</h5>
                     <div style={{minHeight: '200px'}}>
                        <canvas id="mapChart" />
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
export default Reportes;
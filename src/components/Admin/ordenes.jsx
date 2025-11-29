import React from 'react';
import { Link } from 'react-router-dom';
import "./PanelAdmin.css";

function Ordenes() {
  return (
    <div className="panel-admin">
      <aside className="sidebar-wrapper">
        <div className="brand-logo">GAMES<span className="text-gradient">FOR</span>GAMERS</div>
        <nav className="nav flex-column">
          <Link to="/panel-admin" className="nav-link"><i className="bi bi-speedometer2" /> Dashboard</Link>
          <Link to="/panel-admin/ordenes" className="nav-link active"><i className="bi bi-cart-check" /> Ordenes</Link>
          <Link to="/panel-admin/productos" className="nav-link"><i className="bi bi-box-seam" /> Productos</Link>
          <Link to="/panel-admin/usuarios" className="nav-link"><i className="bi bi-people" /> Usuarios</Link>
          <Link to="/panel-admin/reportes" className="nav-link"><i className="bi bi-graph-up" /> Reportes</Link>
        </nav>
        <div className="mt-auto px-3">
          <Link to="/" className="btn btn-outline-info w-100 mb-2">Ir a Tienda</Link>
          <Link to="/login" className="btn btn-outline-danger w-100">Cerrar Sesión</Link>
        </div>
      </aside>

      <main className="main-content-admin">
        <h2 className="text-white mb-4">Historial de Órdenes</h2>
        
        <div className="dashboard-card p-0">
            <div className="table-responsive">
                <table className="table table-neon mb-0">
                    <thead>
                        <tr>
                            <th>ID Orden</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Monto</th>
                            <th>Estado</th>
                            <th>Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-info">#ORD-1001</td>
                            <td>Juan Pérez</td>
                            <td>2023-10-25</td>
                            <td className="text-white fw-bold">$150.00</td>
                            <td><span className="badge badge-neon-success">Completado</span></td>
                            <td><button className="btn btn-sm btn-outline-info">Ver</button></td>
                        </tr>
                        <tr>
                            <td className="text-info">#ORD-1002</td>
                            <td>María González</td>
                            <td>2023-10-26</td>
                            <td className="text-white fw-bold">$45.00</td>
                            <td><span className="badge badge-neon-warning">Pendiente</span></td>
                            <td><button className="btn btn-sm btn-outline-info">Ver</button></td>
                        </tr>
                        <tr>
                            <td className="text-info">#ORD-1003</td>
                            <td>Carlos Ruiz</td>
                            <td>2023-10-26</td>
                            <td className="text-white fw-bold">$200.00</td>
                            <td><span className="badge badge-neon-danger">Cancelado</span></td>
                            <td><button className="btn btn-sm btn-outline-info">Ver</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </main>
    </div>
  );
}
export default Ordenes;
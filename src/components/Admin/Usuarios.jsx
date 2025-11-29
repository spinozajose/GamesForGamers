import React from 'react';
import { Link } from 'react-router-dom';
import "./PanelAdmin.css";

function Usuarios() {
  return (
    <div className="panel-admin">
      <aside className="sidebar-wrapper">
        <div className="brand-logo">GAMES<span className="text-gradient">FOR</span>GAMERS</div>
        <nav className="nav flex-column">
          <Link to="/panel-admin" className="nav-link"><i className="bi bi-speedometer2" /> Dashboard</Link>
          <Link to="/panel-admin/ordenes" className="nav-link"><i className="bi bi-cart-check" /> Ordenes</Link>
          <Link to="/panel-admin/productos" className="nav-link"><i className="bi bi-box-seam" /> Productos</Link>
          <Link to="/panel-admin/usuarios" className="nav-link active"><i className="bi bi-people" /> Usuarios</Link>
          <Link to="/panel-admin/reportes" className="nav-link"><i className="bi bi-graph-up" /> Reportes</Link>
        </nav>
        <div className="mt-auto px-3">
          <Link to="/" className="btn btn-outline-info w-100 mb-2">Ir a Tienda</Link>
          <Link to="/login" className="btn btn-outline-danger w-100">Cerrar Sesión</Link>
        </div>
      </aside>

      <main className="main-content-admin">
        <h2 className="text-white mb-4">Gestión de Usuarios</h2>

        <div className="dashboard-card p-0">
            <div className="table-responsive">
                <table className="table table-neon mb-0">
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src="https://via.placeholder.com/50" alt="User" className="img-thumb img-user-circle" /></td>
                            <td className="text-white">Luna Admin</td>
                            <td>luna@example.com</td>
                            <td><span className="badge bg-info text-dark">ADMIN</span></td>
                            <td><button className="btn btn-sm btn-outline-light"><i className="bi bi-gear"></i></button></td>
                        </tr>
                        <tr>
                            <td><img src="https://via.placeholder.com/50" alt="User" className="img-thumb img-user-circle" /></td>
                            <td>Pedro Cliente</td>
                            <td>pedro@example.com</td>
                            <td><span className="badge bg-secondary">CLIENTE</span></td>
                            <td><button className="btn btn-sm btn-outline-light"><i className="bi bi-pencil"></i></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </main>
    </div>
  );
}
export default Usuarios;

import React from 'react';
import { Link } from 'react-router-dom';
import "./PanelAdmin.css";

function Productos() {
  return (
    <div className="panel-admin">
      <aside className="sidebar-wrapper">
        <div className="brand-logo">GAMES<span className="text-gradient">FOR</span>GAMERS</div>
        <nav className="nav flex-column">
          <Link to="/panel-admin" className="nav-link"><i className="bi bi-speedometer2" /> Dashboard</Link>
          <Link to="/panel-admin/ordenes" className="nav-link"><i className="bi bi-cart-check" /> Ordenes</Link>
          <Link to="/panel-admin/productos" className="nav-link active"><i className="bi bi-box-seam" /> Productos</Link>
          <Link to="/panel-admin/usuarios" className="nav-link"><i className="bi bi-people" /> Usuarios</Link>
          <Link to="/panel-admin/reportes" className="nav-link"><i className="bi bi-graph-up" /> Reportes</Link>
        </nav>
        <div className="mt-auto px-3">
          <Link to="/" className="btn btn-outline-info w-100 mb-2">Ir a Tienda</Link>
          <Link to="/login" className="btn btn-outline-danger w-100">Cerrar Sesión</Link>
        </div>
      </aside>

      <main className="main-content-admin">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-white">Inventario de Productos</h2>
            <Link to="/admin/productos/nuevo" className="btn btn-success">
                <i className="bi bi-plus-lg me-2"></i>Nuevo Producto
            </Link>
        </div>

        <div className="dashboard-card p-0"> 
            <div className="table-responsive">
                <table className="table table-neon mb-0">
                    <thead>
                        <tr>
                            <th>Img</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src="https://via.placeholder.com/50" alt="Juego" className="img-thumb" /></td>
                            <td className="fw-bold text-white">The Legend of Zelda</td>
                            <td>Aventura</td>
                            <td className="text-info">$59.99</td>
                            <td>120</td>
                            <td><span className="badge badge-neon-success">Disponible</span></td>
                            <td><button className="btn btn-sm btn-outline-light"><i className="bi bi-pencil"></i></button></td>
                        </tr>
                        <tr>
                            <td><img src="https://via.placeholder.com/50" alt="Juego" className="img-thumb" /></td>
                            <td className="fw-bold text-white">Cyberpunk 2077</td>
                            <td>RPG</td>
                            <td className="text-info">$39.99</td>
                            <td>5</td>
                            <td><span className="badge badge-neon-warning">Bajo Stock</span></td>
                            <td><button className="btn btn-sm btn-outline-light"><i className="bi bi-pencil"></i></button></td>
                        </tr>
                        <tr>
                            <td><img src="https://via.placeholder.com/50" alt="Juego" className="img-thumb" /></td>
                            <td className="fw-bold text-white">Elden Ring</td>
                            <td>RPG</td>
                            <td className="text-info">$69.99</td>
                            <td>0</td>
                            <td><span className="badge badge-neon-danger">Agotado</span></td>
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
export default Productos;
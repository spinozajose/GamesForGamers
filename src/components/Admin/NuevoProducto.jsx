import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./PanelAdmin.css";

function NuevoProducto() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Guardando producto:", formData);
    alert("¡Producto creado con éxito!");
    navigate('/panel-admin/productos');
  };

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
        <div className="d-flex align-items-center mb-4">
            <Link to="/panel-admin/productos" className="btn btn-outline-light me-3">
                <i className="bi bi-arrow-left"></i>
            </Link>
            <h2 className="text-white m-0">Crear Nuevo Producto</h2>
        </div>
        <div className="dashboard-card p-4">
            <form onSubmit={handleSubmit}>
                <div className="row g-4">
                    <div className="col-md-6">
                        <label htmlFor="nombre" className="form-label">Nombre del Juego <span className="text-danger">*</span></label>
                        <input 
                            type="text" 
                            className="form-control form-control-neon" 
                            id="nombre" 
                            placeholder="Escribe el nombre del juego" 
                            required 
                            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="categoria" className="form-label">Categoría <span className="text-danger">*</span></label>
                        <select 
                            className="form-select form-select-neon" 
                            id="categoria" 
                            required
                            onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                        >
                            <option value="" disabled selected>Seleccionar...</option>
                            <option value="accion">Acción / Aventura</option>
                            <option value="rpg">RPG</option>
                            <option value="shooter">Shooter</option>
                            <option value="deportes">Deportes</option>
                            <option value="terror">Terror</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <label htmlFor="descripcion" className="form-label">Descripción</label>
                        <textarea 
                            className="form-control form-control-neon" 
                            id="descripcion" 
                            rows="3" 
                            placeholder="Breve reseña del juego..."
                            onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                        ></textarea>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="precio" className="form-label">Precio (CLP) <span className="text-danger">*</span></label>
                        <div className="input-group">
                            <input 
                                type="number" 
                                className=" form-control-neon" 
                                id="precio" 
                                placeholder="59990" 
                                required 
                                onChange={(e) => setFormData({...formData, precio: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="stock" className="form-label">Stock<span className="text-danger">*</span></label>
                        <input 
                            type="number" 
                            className="form-control form-control-neon" 
                            id="stock" 
                            placeholder="100" 
                            required 
                            onChange={(e) => setFormData({...formData, stock: e.target.value})}
                        />
                    </div>
                    <div className="col-md-4">
                         <label htmlFor="imagen" className="form-label">Imagen de Portada</label>
                         <input type="file" className="form-control form-control-neon" id="imagen" accept="image/*" />
                    </div>
                    <div className="col-12 mt-5 d-flex justify-content-end gap-2">
                        <Link to="/panel-admin/productos" className="btn btn-outline-secondary px-4">
                            Cancelar
                        </Link>
                        <button type="submit" className="btn btn-success px-5 fw-bold">
                            <i className="bi bi-save me-2"></i> Guardar Producto
                        </button>
                    </div>
                </div>
            </form>
        </div>
      </main>
    </div>
  );
}

export default NuevoProducto;
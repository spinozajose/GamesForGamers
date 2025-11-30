import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import './AdminTablas.css'; 

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  const obtenerProductos = async () => {
    try {
      const respuesta = await clienteAxios.get('/videojuegos');
      setProductos(respuesta.data);
      setCargando(false);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este juego? Esta acción no se puede deshacer.')) {
      try {
        await clienteAxios.delete(`/videojuegos/${id}`);
        setProductos(productos.filter(prod => prod.id !== id));
        alert('Producto eliminado correctamente');
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert('Hubo un error al intentar eliminar el producto.');
      }
    }
  };

  const formatearPrecio = (precio) => `$${precio.toLocaleString('es-CL')}`;

  if (cargando) return <div className="admin-container" style={{color:'white'}}>Cargando inventario...</div>;

  return (
    <div className="admin-container">
      <div className="admin-header-actions">
        <h2>Inventario de Productos</h2>
        <button 
          className="btn-add-new" 
          onClick={() => navigate('/panel-admin/productos/nuevoproducto')}
        >
          + Nuevo Producto
        </button>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{width: '80px'}}>Img</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>
                  <img 
                    src={prod.image || prod.imagenUrl || "https://via.placeholder.com/50"} 
                    alt={prod.name} 
                    className="table-img" 
                  />
                </td>
                <td className="fw-bold">{prod.name || prod.titulo}</td>
                <td>{prod.category || prod.categoria}</td>
                <td className="text-accent">{formatearPrecio(prod.price || prod.precio)}</td>
                <td>
                  {/* Badge de Stock */}
                  <span className={`badge ${(prod.stock || 0) < 10 ? 'bg-danger' : 'bg-primary'}`}>
                    {prod.stock}
                  </span>
                </td>
                <td>
                   {/* Estado calculado */}
                   <span className={`badge ${(prod.stock || 0) > 0 ? 'bg-success' : 'bg-danger'}`}>
                    {(prod.stock || 0) > 0 ? 'Disponible' : 'Agotado'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                        className="btn-icon edit" 
                        title="Editar"
                        onClick={() => navigate(`/panel-admin/productos/editar/${prod.id}`)}
                    >
                        ✏️
                    </button>
                    
                    <button 
                      className="btn-icon delete" 
                      title="Eliminar"
                      onClick={() => handleEliminar(prod.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {productos.length === 0 && (
                <tr>
                    <td colSpan="7" style={{textAlign:'center', padding:'2rem'}}>
                        No hay productos registrados.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Productos;
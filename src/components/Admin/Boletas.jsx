import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import './AdminTablas.css';

const Boletas = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orden, setOrden] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchOrden = async () => {
      try {
        // Asumiendo que reutilizas el endpoint GET /api/ordenes/{id}
        // Necesitarás crear este endpoint en tu OrdenController
        const respuesta = await clienteAxios.get(`/ordenes/${id}`);
        setOrden(respuesta.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setCargando(false);
      }
    };
    fetchOrden();
  }, [id]);

  if (cargando) return <div className="admin-loading">Cargando boleta...</div>;
  if (!orden) return <div className="admin-container">Orden no encontrada</div>;

  return (
    <div className="admin-container">
      <div className="admin-header-actions">
        <h2>Detalle Orden #{orden.id}</h2>
        <button className="btn-back" onClick={() => navigate('/panel-admin/ordenes')}>
          ← Volver
        </button>
      </div>

      <div className="boleta-info-card">
        <div className="info-row">
          <strong>Cliente:</strong> <span>{orden.usuario?.nombre}</span>
        </div>
        <div className="info-row">
          <strong>Email:</strong> <span>{orden.usuario?.email}</span>
        </div>
        <div className="info-row">
          <strong>Fecha:</strong> <span>{new Date(orden.fecha).toLocaleString()}</span>
        </div>
      </div>

      <h3 style={{marginTop: '2rem'}}>Productos Comprados</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio Unit.</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {orden.detalles?.map((item, index) => (
            <tr key={index}>
              <td>{item.videojuego?.titulo}</td>
              <td>${item.precioUnitario?.toLocaleString('es-CL')}</td>
              <td>{item.cantidad}</td>
              <td>${(item.precioUnitario * item.cantidad).toLocaleString('es-CL')}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
            <tr>
                <td colSpan="3" style={{textAlign: 'right', fontWeight: 'bold'}}>TOTAL:</td>
                <td style={{fontWeight: 'bold', color: '#00ff88', fontSize: '1.2rem'}}>
                    ${orden.total?.toLocaleString('es-CL')}
                </td>
            </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Boletas;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import './AdminTablas.css'; 

const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        // Necesitarás crear un endpoint GET /api/ordenes (para admin) en tu backend
        // que devuelva TODAS las órdenes, no solo las de un usuario.
        const respuesta = await clienteAxios.get('/ordenes/todas'); 
        setOrdenes(respuesta.data);
      } catch (error) {
        console.error("Error al cargar órdenes:", error);
        // Datos mock temporales por si el backend aún no tiene el endpoint
        setOrdenes([
            { id: 1001, usuario: { nombre: "Admin Test" }, fecha: "2024-05-20", total: 45000, estado: "COMPLETADA" }
        ]);
      } finally {
        setCargando(false);
      }
    };
    fetchOrdenes();
  }, []);

  const formatearFecha = (fecha) => new Date(fecha).toLocaleDateString();
  const formatearPrecio = (precio) => `$${precio.toLocaleString('es-CL')}`;

  if (cargando) return <div className="admin-loading">Cargando ventas...</div>;

  return (
    <div className="admin-container">
      <div className="admin-header-actions">
        <h2>Historial de Ventas</h2>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID Orden</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.id}>
                <td>#{orden.id}</td>
                <td>{orden.usuario?.nombre || "Usuario Eliminado"}</td>
                <td>{formatearFecha(orden.fecha)}</td>
                <td className="fw-bold text-accent">{formatearPrecio(orden.total)}</td>
                <td>
                  <span className={`badge ${orden.estado === 'COMPLETADA' ? 'bg-success' : 'bg-danger'}`}>
                    {orden.estado}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn-icon" 
                    title="Ver Detalles"
                    onClick={() => navigate(`/panel-admin/ordenes/${orden.id}`)}
                  >
                    👁️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ordenes;
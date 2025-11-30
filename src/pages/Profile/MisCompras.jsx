import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import './MisCompras.css';

const MisCompras = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    
    if (!usuarioGuardado) {
      navigate('/login');
      return;
    }

    const usuario = JSON.parse(usuarioGuardado);
    
    const fetchOrdenes = async () => {
      try {
        // Petición al endpoint de historial
        const respuesta = await clienteAxios.get(`/ordenes/usuario/${usuario.idUsuario}`);
        // Ordenamos por fecha (la más reciente primero)
        const ordenesOrdenadas = respuesta.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setOrdenes(ordenesOrdenadas);
      } catch (error) {
        console.error("Error al cargar historial:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchOrdenes();
  }, [navigate]);

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const formatearPrecio = (precio) => `$${precio.toLocaleString('es-CL')}`;

  if (cargando) {
    return <div className="historial-loading">Cargando tus compras...</div>;
  }

  return (
    <div className="historial-page">
      <div className="historial-container">
        <h1 className="historial-title">Mis Compras</h1>

        {ordenes.length === 0 ? (
          <div className="historial-vacio">
            <p>Aún no has realizado ninguna compra.</p>
            <button onClick={() => navigate('/catalogo')} className="btn-explorar">Ir al Catálogo</button>
          </div>
        ) : (
          <div className="ordenes-lista">
            {ordenes.map((orden) => (
              <div key={orden.id} className="orden-card">
                <div className="orden-header">
                  <div className="orden-info">
                    <span className="orden-id">Orden #{orden.id}</span>
                    <span className="orden-fecha">{formatearFecha(orden.fecha)}</span>
                  </div>
                  <div className="orden-estado completed">{orden.estado}</div>
                </div>

                <div className="orden-items">
                  {orden.detalles.map((detalle) => (
                    <div key={detalle.id} className="item-row">
                      <div className="item-img">
                        <img src={detalle.videojuego.imagenUrl} alt={detalle.videojuego.titulo} />
                      </div>
                      <div className="item-data">
                        <h4>{detalle.videojuego.titulo}</h4>
                        <p>Plataforma: {detalle.videojuego.plataforma}</p>
                      </div>
                      <div className="item-price">
                        <p>{detalle.cantidad} x {formatearPrecio(detalle.precioUnitario)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="orden-footer">
                  <span className="total-label">Total Pagado:</span>
                  <span className="total-amount">{formatearPrecio(orden.total)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MisCompras;
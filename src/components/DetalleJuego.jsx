import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import '../assets/css/DetalleJuego.css';

const DetalleJuego = ({ juego, onVolver }) => {
  const { agregarAlCarrito, estaEnCarrito } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [yaEnCarrito, setYaEnCarrito] = useState(false);
  const [rawgData, setRawgData] = useState(null);
  const [loading, setLoading] = useState(true); // Iniciar en true para la carga inicial de API
  const [errorAPI, setErrorAPI] = useState(null);
  const navigate = useNavigate();

  // Asegúrate de que esta clave esté en tu archivo .env (VITE_RAWG_API_KEY)
  const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  // Lógica de búsqueda en RAWG
  useEffect(() => {
    setYaEnCarrito(estaEnCarrito(juego.id));

    const buscarEnRawg = async () => {
      if (!RAWG_API_KEY) {
        setLoading(false);
        setErrorAPI('⚠️ No se encontró la API Key de RAWG.');
        return;
      }
      setLoading(true);
      setErrorAPI(null);
      
      try {
        const apiClient = axios.create({
          baseURL: 'https://api.rawg.io/api',
          timeout: 10000,
        });

        // 1. Buscar el ID exacto usando el nombre del JSON
        const searchResponse = await apiClient.get('/games', {
          params: {
            key: RAWG_API_KEY,
            search: juego.name,
            page_size: 1,
            search_precise: true,
          },
        });

        if (searchResponse.data.results.length > 0) {
          const gameResult = searchResponse.data.results[0];
          
          // 2. Obtener los detalles completos con el ID encontrado
          const detailsResponse = await apiClient.get(`/games/${gameResult.id}`, {
            params: { key: RAWG_API_KEY },
          });
          setRawgData(detailsResponse.data);
        } else {
          setErrorAPI(`"${juego.name}" no encontrado en RAWG. Mostrando solo datos del JSON.`);
        }
      } catch (error) {
        setErrorAPI('Error de conexión con RAWG. Intenta recargar.');
      } finally {
        setLoading(false);
      }
    };

    if (juego.name) buscarEnRawg();
  }, [juego.name, RAWG_API_KEY, juego.id, estaEnCarrito]);

  const aumentarCantidad = () => setCantidad(prev => prev + 1);
  const disminuirCantidad = () => cantidad > 1 && setCantidad(prev => prev - 1);

  const manejarAgregarAlCarrito = () => {
    agregarAlCarrito(juego, cantidad);
    setMostrarMensaje(true);
    setYaEnCarrito(true);
    setTimeout(() => setMostrarMensaje(false), 3000);
  };

  const manejarComprarAhora = () => {
    agregarAlCarrito(juego, cantidad);
    navigate('/checkout');
  };

  const formatearFecha = fecha => new Date(fecha).toLocaleDateString('es-CL');
  // Se usa el rating de RAWG, si está disponible, si no, se usa el del JSON.
  const renderizarRating = rating => '⭐'.repeat(Math.round(rating / 2)) + '☆'.repeat(5 - Math.round(rating / 2)); 

  const descripcionPrincipal = juego.description;

  return (
    <div className="detalle-contenedor">
      {mostrarMensaje && (
        <div className="mensaje-agregado">
          ¡{juego.name} agregado al carrito con éxito!
        </div>
      )}

      <div className="detalle-tarjeta">
        <div className="orden-detalle-juego">
          <button onClick={onVolver} className="boton-volver">← Volver al Catálogo</button>

          <div className="imagen-contenedor">
            {/* Si RAWG tiene una mejor imagen (background_image), la usa, sino usa la de tu JSON */}
            <img
              src={rawgData?.background_image || juego.image}
              alt={rawgData?.name || juego.name}
              className="detalle-imagen"
              onError={(e) => e.target.src = juego.image}
            />
          </div>
        </div>

        <div className="detalle-info">
          <h2 className="detalle-titulo">{juego.name}</h2>

          {loading && <p style={{color: '#fff'}}>Cargando información adicional...</p>}
          {errorAPI && <p style={{color: '#ff6b6b'}}>{errorAPI}</p>}

          {/* DESCRIPCIÓN PRINCIPAL (VIENE DE TU JSON) */}
          <p className="detalle-descripcion">
            {descripcionPrincipal}
          </p>
          
          {/* METADATOS ESTÁTICOS (VIENEN DE TU JSON: Género, Creador, etc.) */}
          <div className='rawg-details' style={{marginBottom: '20px'}}>
             {juego.creador && <div className='metadato-item'><span>Creador:</span> <strong>{juego.creador}</strong></div>}
             {juego.genero && <div className='metadato-item'><span>Género:</span> <strong>{juego.genero}</strong></div>}
             {juego.plataformas && <div className='metadato-item'><span>Plataformas:</span> <strong>{juego.plataformas}</strong></div>}
             {juego.valoracion && <div className='metadato-item'><span>Valoración:</span> <strong>{juego.valoracion}</strong></div>}
          </div>
          
          <div className="detalle-metadatos">
            {/* ... (Controles de cantidad y botones de compra) ... */}
            <div className="selector-cantidad-container">
              <strong>Cantidad:</strong>
              <div className="selector-cantidad">
                <button onClick={disminuirCantidad} disabled={cantidad <= 1}>-</button>
                <span className="cantidad-actual">{cantidad}</span>
                <button onClick={aumentarCantidad}>+</button>
              </div>
            </div>

            <div className="detalle-acciones">
              <button 
                className="detalle-comprar-boton"
                onClick={manejarComprarAhora}
              >
                Comprar Ahora
              </button>

              <button 
                className={`boton-carrito ${yaEnCarrito ? 'agregado' : ''}`}
                onClick={manejarAgregarAlCarrito}
                disabled={yaEnCarrito}
              >
                {yaEnCarrito ? 'Agregado al Carrito' : 'Agregar al Carrito'}
              </button>
            </div>
          </div>

          {/* INFORMACIÓN ADICIONAL (VIENE DE LA API DE RAWG) */}
          {rawgData && (
            <div className="rawg-section">
              <h3 className="rawg-title">Información Adicional RAWG</h3>

              <div className="rawg-stats">
                {rawgData.rating > 0 && (
                  <div className="rawg-stat-item">
                    <div className="rawg-stat-value">{rawgData.rating.toFixed(1)}/5</div>
                    <div className="rawg-stat-label">Rating promedio</div>
                  </div>
                )}
                {rawgData.metacritic && (
                  <div className="rawg-stat-item">
                    <div className="rawg-stat-value">{rawgData.metacritic}</div>
                    <div className="rawg-stat-label">Metacritic</div>
                  </div>
                )}
                {rawgData.playtime > 0 && (
                  <div className="rawg-stat-item">
                    <div className="rawg-stat-value">{rawgData.playtime}h</div>
                    <div className="rawg-stat-label">Duración promedio</div>
                  </div>
                )}
                {rawgData.released && (
                  <div className="rawg-stat-item">
                    <div className="rawg-stat-value">{new Date(rawgData.released).getFullYear()}</div>
                    <div className="rawg-stat-label">Año lanzamiento</div>
                  </div>
                )}
              </div>

              {/* Detalles de la API (Géneros, Desarrolladores, Plataformas de RAWG) */}
              <div className="rawg-details">
                {rawgData.released && <div className="metadato-item"><strong>Fecha lanzamiento:</strong> {formatearFecha(rawgData.released)}</div>}
                {rawgData.genres?.length > 0 && <div className="metadato-item"><strong>Géneros (RAWG):</strong> {rawgData.genres.map(g => g.name).join(', ')}</div>}
                {rawgData.developers?.length > 0 && <div className="metadato-item"><strong>Desarrolladores (RAWG):</strong> {rawgData.developers.map(d => d.name).join(', ')}</div>}
              </div>

              {/* Descripción extendida de RAWG */}
              {rawgData.description_raw && (
                <div style={{marginTop: '20px'}}>
                    <h4 style={{color: '#66c0f4', fontSize: '1.1rem', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>Acerca del Juego (Fuente: RAWG)</h4>
                    <p style={{color: '#ffffff', fontSize: '0.9rem', lineHeight: '1.5'}}>{rawgData.description_raw.substring(0, 500)}...</p> 
                </div>
              )}
              
              {/* Enlaces de RAWG */}
              {rawgData.website || rawgData.reddit_url ? (
                <div className="rawg-actions">
                  {rawgData.website && <a href={rawgData.website} target="_blank" rel="noopener noreferrer" className="rawg-link">Sitio Oficial</a>}
                  {rawgData.reddit_url && <a href={rawgData.reddit_url} target="_blank" rel="noopener noreferrer" className="rawg-link reddit-link">Comunidad Reddit</a>}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleJuego;
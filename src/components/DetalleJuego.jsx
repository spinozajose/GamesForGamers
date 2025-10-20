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
  const [loading, setLoading] = useState(false);
  const [errorAPI, setErrorAPI] = useState(null);
  const navigate = useNavigate();

  const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    setYaEnCarrito(estaEnCarrito(juego.id));
  }, [juego.id, estaEnCarrito]);

  useEffect(() => {
    const buscarEnRawg = async () => {
      if (!RAWG_API_KEY) {
        setErrorAPI('API Key de RAWG no configurada.');
        return;
      }
      setLoading(true);
      setErrorAPI(null);
      try {
        const apiClient = axios.create({
          baseURL: 'https://api.rawg.io/api',
          timeout: 10000,
          headers: { 'Content-Type': 'application/json' },
        });

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
          const detailsResponse = await apiClient.get(`/games/${gameResult.id}`, {
            params: { key: RAWG_API_KEY },
          });
          setRawgData(detailsResponse.data);
        } else {
          setErrorAPI(`"${juego.name}" no encontrado en RAWG`);
        }
      } catch (error) {
        setErrorAPI('Error al conectar con RAWG');
      } finally {
        setLoading(false);
      }
    };

    if (juego.name && RAWG_API_KEY) buscarEnRawg();
  }, [juego.name, RAWG_API_KEY]);

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
  const renderizarRating = rating => '⭐'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));

  const descripcion = rawgData?.description_es || rawgData?.description_raw || 'Descripción no disponible.';

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

          {loading && <p style={{color: '#fff'}}>Cargando información...</p>}
          {errorAPI && <p style={{color: '#ff6b6b'}}>{errorAPI}</p>}

          <p className="detalle-descripcion">
            {juego.description
              ?.split(/Español/i)[1] // toma solo el texto después de “Español”
              ?.replace(/<\/?[^>]+(>|$)/g, "") // elimina etiquetas HTML si existen
              ?.trim() ||
              juego.description?.split(/Español/i)[0]?.replace(/<\/?[^>]+(>|$)/g, "").trim()}
          </p>
          <div className="detalle-metadatos">
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

          {rawgData && (
            <div className="rawg-section">
              <h3 className="rawg-title">Información RAWG</h3>

              <div className="rawg-stats">
                {rawgData.rating && (
                  <div className="rawg-stat-item">
                    <div className="rawg-stat-value">{rawgData.rating.toFixed(1)}/5</div>
                    <div className="rawg-stat-label">{renderizarRating(rawgData.rating)}</div>
                  </div>
                )}
                {rawgData.metacritic && (
                  <div className="rawg-stat-item">
                    <div className="rawg-stat-value">{rawgData.metacritic}</div>
                    <div className="rawg-stat-label">Metacritic</div>
                  </div>
                )}
                {rawgData.playtime && (
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

              <div className="rawg-details">
                {rawgData.released && <div className="metadato-item"><strong>Fecha lanzamiento:</strong> {formatearFecha(rawgData.released)}</div>}
                {rawgData.genres?.length > 0 && <div className="metadato-item"><strong>Géneros:</strong> {rawgData.genres.map(g => g.name).join(', ')}</div>}
                {rawgData.platforms?.length > 0 && <div className="metadato-item"><strong>Plataformas:</strong> {rawgData.platforms.map(p => p.platform.name).slice(0,3).join(', ')}{rawgData.platforms.length>3 ? ` +${rawgData.platforms.length-3} más` : ''}</div>}
                {rawgData.developers?.length > 0 && <div className="metadato-item"><strong>Desarrolladores:</strong> {rawgData.developers.map(d => d.name).join(', ')}</div>}
                {rawgData.publishers?.length > 0 && <div className="metadato-item"><strong>Publicadores:</strong> {rawgData.publishers.map(p => p.name).join(', ')}</div>}
              </div>

              {rawgData.description_raw && (
                <div className="rawg-actions">
                  {rawgData.website && <a href={rawgData.website} target="_blank" rel="noopener noreferrer" className="rawg-link">Sitio Oficial</a>}
                  {rawgData.reddit_url && <a href={rawgData.reddit_url} target="_blank" rel="noopener noreferrer" className="rawg-link reddit-link">Comunidad Reddit</a>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleJuego;

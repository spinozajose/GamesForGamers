import React, { useState } from 'react';
import { useCarrito } from '../../context/CarritoContext';
import { useNavigate } from 'react-router-dom'; // <--- 1. IMPORTAR
import './CatalogoOfertas.css';

// Importación de imágenes (se mantienen igual)
import witcher3 from '../../assets/images/witcher3.jpg';
import doom from '../../assets/images/doom.jpg';
import nes from '../../assets/images/nesunbound.jpg';
import Cyberpunk2077 from '../../assets/images/Cyberpunk-2077.jpg';
import fc26 from '../../assets/images/fc26.webp';
import assasinscread from '../../assets/images/Assassins-Creed.webp';
import hades from '../../assets/images/Hades.webp';
import re4 from '../../assets/images/re4.jpg';

const OFERTAS_MOCK = [
  { id: 101, name: "Cyberpunk 2077", price: 35000, discount: 50, category: "RPG", image: Cyberpunk2077 },
  { id: 102, name: "EA FC 26", price: 60000, discount: 30, category: "Deportes", image: fc26 },
  { id: 103, name: "Assassin's Creed Mirage", price: 45000, discount: 20, category: "Acción", image: assasinscread },
  { id: 104, name: "Hades", price: 15000, discount: 40, category: "Indie", image: hades },
  { id: 105, name: "Resident Evil 4 Remake", price: 40000, discount: 25, category: "Terror", image: re4 },
  { id: 106, name: "Need for Speed Unbound", price: 50000, discount: 60, category: "Carreras", image: nes },
  { id: 107, name: "The Witcher 3", price: 20000, discount: 75, category: "RPG", image: witcher3 },
  { id: 108, name: "Doom Eternal", price: 25000, discount: 55, category: "Shooter", image: doom },
];

function CatalogoOfertas() {
  const { agregarAlCarrito } = useCarrito();
  const navigate = useNavigate(); // <--- 2. INICIALIZAR HOOK
  
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("mayor_descuento");

  const ofertasFiltradas = OFERTAS_MOCK.filter(juego => 
    juego.name.toLowerCase().includes(busqueda.toLowerCase())
  ).sort((a, b) => {
    const precioA = a.price * (1 - a.discount / 100);
    const precioB = b.price * (1 - b.discount / 100);

    if (orden === "menor_precio") return precioA - precioB;
    if (orden === "mayor_precio") return precioB - precioA;
    if (orden === "mayor_descuento") return b.discount - a.discount;
    return 0;
  });

  const formatearPrecio = (precio) => `$${precio.toLocaleString('es-CL')}`;

  return (
    <div className="ofertas-page">
      <div className="ofertas-container">
        
        <div className="ofertas-hero">
          <h1 className="ofertas-title">🔥 Oportunidades Flash</h1>
          <p className="ofertas-subtitle">Descuentos por tiempo limitado en títulos seleccionados</p>
        </div>

        <div className="ofertas-controls">
          <div className="search-box-ofertas">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Buscar oferta..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="sort-box-ofertas">
            <label>Ordenar por:</label>
            <select value={orden} onChange={(e) => setOrden(e.target.value)}>
              <option value="mayor_descuento">Mayor Descuento %</option>
              <option value="menor_precio">Precio: Más bajo</option>
              <option value="mayor_precio">Precio: Más alto</option>
            </select>
          </div>
        </div>

        <div className="ofertas-grid">
          {ofertasFiltradas.length > 0 ? (
            ofertasFiltradas.map((juego) => {
              const precioFinal = juego.price * (1 - juego.discount / 100);
              
              return (
                <div 
                  key={juego.id} 
                  className="offer-card"
                  // 3. EVENTO CLICK EN LA TARJETA COMPLETA
                  onClick={() => navigate(`/detalle/${juego.id}`)}
                  style={{ cursor: 'pointer' }} // Para que se vea la manito
                >
                  <div className="corner-ribbon">-{juego.discount}%</div>
                  
                  <div className="offer-image">
                    <img src={juego.image} alt={juego.name} />
                    <div className="offer-category">{juego.category}</div>
                  </div>
                  
                  <div className="offer-content">
                    <h3 className="offer-title">{juego.name}</h3>
                    
                    <div className="offer-pricing">
                      <div className="price-stack">
                        <span className="price-original">{formatearPrecio(juego.price)}</span>
                        <span className="price-final">{formatearPrecio(precioFinal)}</span>
                      </div>
                      <button 
                        className="btn-add-offer"
                        // 4. STOP PROPAGATION PARA QUE NO REDIRIJA AL AGREGAR
                        onClick={(e) => {
                          e.stopPropagation(); 
                          agregarAlCarrito({
                            id: juego.id,
                            name: juego.name,
                            price: precioFinal,
                            image: juego.image,
                            cantidad: 1,
                            precioNumerico: precioFinal
                          });
                        }}
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-offers">
              <p>No se encontraron ofertas con ese nombre.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default CatalogoOfertas;
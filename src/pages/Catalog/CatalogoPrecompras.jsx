import React, { useState } from 'react';
import { useCarrito } from '../../context/CarritoContext'; // Ajusta la ruta a tu context
import './CatalogoPrecompras.css';
import gta6 from '../../assets/images/gta6.jpg';
import monsterhunter from '../../assets/images/monsterhunter.webp';
import silksong from '../../assets/images/silksong.jpg';
import dragonage from '../../assets/images/dragonage.jpg';
import silenthill2 from '../../assets/images/silenthill2.jpg';
import metalgear from '../../assets/images/metalgear.jpg';

// Mock de datos para Precompras
const PRECOMPRAS_MOCK = [
  { id: 201, name: "Grand Theft Auto VI", price: 70000, releaseDate: "2025-10-15", category: "Mundo Abierto", image: gta6 },
  { id: 202, name: "Monster Hunter Wilds", price: 65000, releaseDate: "2025-02-28", category: "RPG", image: monsterhunter },
  { id: 203, name: "Hollow Knight: Silksong", price: 25000, releaseDate: "2024-12-01", category: "Indie", image: silksong },
  { id: 204, name: "Dragon Age: Dreadwolf", price: 60000, releaseDate: "2024-11-15", category: "RPG", image: dragonage },
  { id: 205, name: "Silent Hill 2 Remake", price: 55000, releaseDate: "2024-10-08", category: "Terror", image: silenthill2 },
  { id: 206, name: "Metal Gear Solid Delta", price: 60000, releaseDate: "2025-03-10", category: "Acción", image: metalgear },
];

function CatalogoPrecompras() {
  const { agregarAlCarrito } = useCarrito();
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("fecha_cercana");

  // Lógica de filtrado y ordenamiento
  const precomprasFiltradas = PRECOMPRAS_MOCK.filter(juego => 
    juego.name.toLowerCase().includes(busqueda.toLowerCase())
  ).sort((a, b) => {
    if (orden === "fecha_cercana") return new Date(a.releaseDate) - new Date(b.releaseDate);
    if (orden === "fecha_lejana") return new Date(b.releaseDate) - new Date(a.releaseDate);
    if (orden === "precio_bajo") return a.price - b.price;
    return 0;
  });

  const formatearPrecio = (precio) => `$${precio.toLocaleString('es-CL')}`;

  const formatearFecha = (fechaString) => {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fechaString).toLocaleDateString('es-ES', opciones);
  };

  return (
    <div className="precompras-page">
      <div className="precompras-container">
        
        {/* Banner Hero Futurista */}
        <div className="precompras-hero">
          <div className="hero-content">
            <h1 className="precompras-title">🚀 Próximos Lanzamientos</h1>
            <p className="precompras-subtitle">Asegura tu copia digital antes que nadie y recibe bonificaciones exclusivas.</p>
          </div>
        </div>

        {/* Controles */}
        <div className="precompras-controls">
          <div className="search-box-pre">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Buscar lanzamiento..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="sort-box-pre">
            <label>Ordenar por:</label>
            <select value={orden} onChange={(e) => setOrden(e.target.value)}>
              <option value="fecha_cercana">Lanzamiento: Más próximo</option>
              <option value="fecha_lejana">Lanzamiento: Más lejano</option>
              <option value="precio_bajo">Precio: Menor a Mayor</option>
            </select>
          </div>
        </div>

        {/* Grid Timeline */}
        <div className="precompras-grid">
          {precomprasFiltradas.length > 0 ? (
            precomprasFiltradas.map((juego) => (
              <div key={juego.id} className="preorder-card">
                {/* Badge de Fecha */}
                <div className="date-badge">
                  <span className="date-icon">📅</span>
                  {formatearFecha(juego.releaseDate)}
                </div>

                <div className="preorder-image">
                  <img src={juego.image} alt={juego.name} />
                  <div className="preorder-category">{juego.category}</div>
                </div>

                <div className="preorder-content">
                  <h3 className="preorder-title">{juego.name}</h3>
                  
                  <div className="preorder-footer">
                    <div className="price-info">
                      <span className="price-label">Precio Pre-venta</span>
                      <span className="price-value">{formatearPrecio(juego.price)}</span>
                    </div>

                    <button 
                      className="btn-preorder"
                      onClick={() => agregarAlCarrito({
                        id: juego.id,
                        name: juego.name,
                        price: juego.price,
                        image: juego.image,
                        cantidad: 1
                      })}
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No hay lanzamientos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default CatalogoPrecompras;
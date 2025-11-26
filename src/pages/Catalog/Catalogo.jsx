import React, { useState } from 'react';
import { useCarrito } from '../../context/CarritoContext'; // Ajusta la ruta a tu context
import './Catalogo.css';

// Datos de ejemplo (idealmente vendrían de una API o base de datos)
const JUEGOS_MOCK = [
  { id: 1, name: "Elden Ring", price: 45000, discount: 0, category: "RPG", image: "https://via.placeholder.com/300x400?text=Elden+Ring" },
  { id: 2, name: "God of War Ragnarok", price: 55000, discount: 10, category: "Acción", image: "https://via.placeholder.com/300x400?text=GoW" },
  { id: 3, name: "FIFA 24", price: 60000, discount: 20, category: "Deportes", image: "https://via.placeholder.com/300x400?text=FIFA" },
  { id: 4, name: "Cyberpunk 2077", price: 35000, discount: 50, category: "RPG", image: "https://via.placeholder.com/300x400?text=Cyberpunk" },
  { id: 5, name: "Call of Duty: MW3", price: 50000, discount: 0, category: "Shooter", image: "https://via.placeholder.com/300x400?text=COD" },
  { id: 6, name: "Hollow Knight", price: 15000, discount: 0, category: "Indie", image: "https://via.placeholder.com/300x400?text=Hollow+Knight" },
  { id: 7, name: "Resident Evil 4", price: 40000, discount: 15, category: "Terror", image: "https://via.placeholder.com/300x400?text=RE4" },
  { id: 8, name: "Minecraft", price: 20000, discount: 0, category: "Aventura", image: "https://via.placeholder.com/300x400?text=Minecraft" },
];

function Catalogo() {
  const { agregarAlCarrito } = useCarrito();
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [orden, setOrden] = useState("defecto");

  // Lógica de filtrado
  const juegosFiltrados = JUEGOS_MOCK.filter(juego => {
    const coincideNombre = juego.name.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoria === "Todos" || juego.category === categoria;
    return coincideNombre && coincideCategoria;
  }).sort((a, b) => {
    const precioA = a.price * (1 - a.discount / 100);
    const precioB = b.price * (1 - b.discount / 100);
    
    if (orden === "menor") return precioA - precioB;
    if (orden === "mayor") return precioB - precioA;
    return 0;
  });

  const formatearPrecio = (precio) => `$${precio.toLocaleString('es-CL')}`;

  return (
    <div className="catalogo-page">
      <div className="catalogo-container">
        
        {/* Encabezado del Catálogo */}
        <div className="catalogo-header">
          <h1 className="catalogo-title">Catálogo Completo</h1>
          <p className="catalogo-subtitle">Explora nuestra colección de claves digitales</p>
        </div>

        {/* Barra de Controles (Búsqueda y Filtros) */}
        <div className="catalogo-controls">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Buscar juego..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="filters-box">
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="Todos">Todas las categorías</option>
              <option value="Acción">Acción</option>
              <option value="RPG">RPG</option>
              <option value="Shooter">Shooter</option>
              <option value="Deportes">Deportes</option>
              <option value="Indie">Indie</option>
            </select>

            <select value={orden} onChange={(e) => setOrden(e.target.value)}>
              <option value="defecto">Relevancia</option>
              <option value="menor">Precio: Menor a Mayor</option>
              <option value="mayor">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="games-grid">
          {juegosFiltrados.length > 0 ? (
            juegosFiltrados.map((juego) => {
              const precioFinal = juego.price * (1 - juego.discount / 100);
              
              return (
                <div key={juego.id} className="game-card">
                  <div className="card-image">
                    <img src={juego.image} alt={juego.name} />
                    {juego.discount > 0 && (
                      <span className="discount-badge">-{juego.discount}%</span>
                    )}
                    <div className="platform-tag">PC / Steam</div>
                  </div>
                  
                  <div className="card-content">
                    <span className="card-category">{juego.category}</span>
                    <h3 className="card-title">{juego.name}</h3>
                    
                    <div className="card-footer">
                      <div className="price-block">
                        {juego.discount > 0 && (
                          <span className="old-price">{formatearPrecio(juego.price)}</span>
                        )}
                        <span className="current-price">{formatearPrecio(precioFinal)}</span>
                      </div>
                      
                      <button 
                        className="add-btn"
                        onClick={() => agregarAlCarrito({
                          id: juego.id,
                          name: juego.name,
                          price: precioFinal,
                          image: juego.image,
                          cantidad: 1
                        })}
                      >
                        Añadir
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-results">
              <p>No se encontraron juegos con esos filtros.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Catalogo;
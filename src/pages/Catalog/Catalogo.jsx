import React, { useState, useEffect } from 'react';
import { useCarrito } from '../../context/CarritoContext';
import clienteAxios from '../../config/axios'; // Asegúrate de haber creado este archivo
import './Catalogo.css';

function Catalogo() {
  const { agregarAlCarrito } = useCarrito();
  
  // Estados para datos reales
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Estados de filtros
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [orden, setOrden] = useState("defecto");

  // EFECTO: Cargar juegos del Backend al iniciar
  useEffect(() => {
    const obtenerJuegos = async () => {
      try {
        setCargando(true);
        // Petición a tu controlador Spring Boot: VideojuegoController
        const respuesta = await clienteAxios.get('/videojuegos');
        setJuegos(respuesta.data);
        setCargando(false);
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        setError("No se pudo cargar el catálogo. Intenta más tarde.");
        setCargando(false);
      }
    };

    obtenerJuegos();
  }, []);

  // Lógica de filtrado (Igual que antes, pero usando el estado 'juegos')
  const juegosFiltrados = juegos.filter(juego => {
    // Protección por si algún dato viene nulo del backend
    const nombreJuego = juego.name ? juego.name.toLowerCase() : "";
    const categoriaJuego = juego.category ? juego.category : "";

    const coincideNombre = nombreJuego.includes(busqueda.toLowerCase());
    const coincideCategoria = categoria === "Todos" || categoriaJuego === categoria;
    
    return coincideNombre && coincideCategoria;
  }).sort((a, b) => {
    const precioA = a.price * (1 - (a.discount || 0) / 100);
    const precioB = b.price * (1 - (b.discount || 0) / 100);
    
    if (orden === "menor") return precioA - precioB;
    if (orden === "mayor") return precioB - precioA;
    return 0;
  });

  const formatearPrecio = (precio) => {
    if (precio === undefined || precio === null) return "$0";
    return `$${precio.toLocaleString('es-CL')}`;
  };

  // Renderizado de carga o error
  if (cargando) {
    return (
      <div className="catalogo-page">
        <div className="catalogo-container" style={{ textAlign: 'center', paddingTop: '150px' }}>
          <div className="spinner-neon"></div>
          <h2 style={{ color: 'white', marginTop: '20px' }}>Cargando juegos...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="catalogo-page">
        <div className="catalogo-container" style={{ textAlign: 'center', paddingTop: '150px' }}>
          <h2 style={{ color: '#ff4444' }}>Error: {error}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="catalogo-page">
      <div className="catalogo-container">
        
        {/* Encabezado */}
        <div className="catalogo-header">
          <h1 className="catalogo-title">Catálogo Completo</h1>
          <p className="catalogo-subtitle">Explora nuestra colección de claves digitales</p>
        </div>

        {/* Controles */}
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
              <option value="Aventura">Aventura</option>
              <option value="Terror">Terror</option>
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
              // Cálculos seguros
              const descuento = juego.discount || 0;
              const precioBase = juego.price || 0;
              const precioFinal = precioBase * (1 - descuento / 100);
              
              return (
                <div key={juego.id} className="game-card">
                  <div className="card-image">
                    {/* Fallback de imagen si viene vacía */}
                    <img 
                      src={juego.image || "https://via.placeholder.com/300x400?text=No+Image"} 
                      alt={juego.name} 
                      onError={(e) => { e.target.src = "https://via.placeholder.com/300x400?text=Error+Carga"; }}
                    />
                    {descuento > 0 && (
                      <span className="discount-badge">-{descuento}%</span>
                    )}
                    <div className="platform-tag">
                      {juego.plataformas || "PC / Steam"}
                    </div>
                  </div>
                  
                  <div className="card-content">
                    <span className="card-category">{juego.category || "General"}</span>
                    <h3 className="card-title">{juego.name}</h3>
                    
                    <div className="card-footer">
                      <div className="price-block">
                        {descuento > 0 && (
                          <span className="old-price">{formatearPrecio(precioBase)}</span>
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
                          cantidad: 1,
                          // Campos opcionales para el carrito
                          precioNumerico: precioFinal 
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
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Precompras.css';

const Precompras = () => {
  const navigate = useNavigate();
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [precompraProcesando, setPrecompraProcesando] = useState(null);

  // DATOS ACTUALIZADOS CON TUS 6 JUEGOS DE 2026
  const juegosPrecompra = [
    {
      id: 1,
      titulo: "Grand Theft Auto VI",
      imagen: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
      precioActual: 74990,
      precioOriginal: 84990,
      descuento: 12,
      fechaLanzamiento: "2026-05-26",
      plataforma: "PS5, Xbox Series X/S",
      descripcion: "La esperada octava entrega de Rockstar Games ambientada en Vice City, sigue a Jason Duval y Lucia Caminos en su ascenso criminal."
    },
    {
      id: 2,
      titulo: "Resident Evil Requiem",
      imagen: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop",
      precioActual: 59990,
      precioOriginal: 69990,
      descuento: 14,
      fechaLanzamiento: "2026-02-27",
      plataforma: "PS5, Xbox Series X/S, PC, Nintendo Switch 2",
      descripcion: "Secuela de Resident Evil Village que regresa a Raccoon City con nuevo protagonista y narrativa centrada en horror y supervivencia."
    },
    {
      id: 3,
      titulo: "Invincible VS",
      imagen: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      precioActual: 54990,
      precioOriginal: 64990,
      descuento: 15,
      fechaLanzamiento: "2026-09-15",
      plataforma: "PS5, Xbox Series X/S, PC",
      descripcion: "Juego de lucha en equipos de tres basado en la serie 'Invincible', con modo historia cinemático y multijugador en línea."
    },
    {
      id: 4,
      titulo: "Lego Batman: Legacy of the Dark Knight",
      imagen: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      precioActual: 49990,
      precioOriginal: 59990,
      descuento: 17,
      fechaLanzamiento: "2026-10-10",
      plataforma: "PS5, Xbox Series X/S, Nintendo Switch 2, PC",
      descripcion: "Cuarta entrega de Lego Batman con historia original que rinde homenaje al universo de Batman a través de diversos medios."
    },
    {
      id: 5,
      titulo: "The Duskbloods",
      imagen: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=400&h=300&fit=crop",
      precioActual: 64990,
      precioOriginal: 74990,
      descuento: 13,
      fechaLanzamiento: "2026-11-20",
      plataforma: "Nintendo Switch 2",
      descripcion: "Juego multijugador de rol de acción de FromSoftware, con hasta 8 jugadores como Bloodsworn en mundo oscuro y sobrenatural."
    },
    {
      id: 6,
      titulo: "WWE 2K26",
      imagen: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=300&fit=crop",
      precioActual: 59990,
      precioOriginal: 69990,
      descuento: 14,
      fechaLanzamiento: "2026-03-18",
      plataforma: "PS4, PS5, Xbox One, Xbox Series X/S, PC",
      descripcion: "Vigésima quinta entrega con nuevas mecánicas, roster actualizado y banda sonora seleccionada por Cody Rhodes."
    }
  ];

  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setJuegos(juegosPrecompra);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handlePrecompra = async (juego) => {
    // Prevenir múltiples clics
    if (precompraProcesando === juego.id) return;
    
    setPrecompraProcesando(juego.id);

    try {
      // Guardar información del juego para el checkout
      const juegoData = {
        id: juego.id,
        titulo: juego.titulo,
        precio: juego.precioActual,
        tipo: 'precompra',
        fechaLanzamiento: juego.fechaLanzamiento,
        imagen: juego.imagen,
        plataforma: juego.plataforma,
        descuento: juego.descuento,
        precioOriginal: juego.precioOriginal
      };
      
      console.log('Iniciando precompra para:', juegoData.titulo);
      
      // Limpiar cualquier carrito existente primero
      localStorage.removeItem('carritoPrecompra');
      localStorage.removeItem('esPrecompra');
      localStorage.removeItem('ultimaPrecompra');
      
      // Guardar nuevos datos
      localStorage.setItem('carritoPrecompra', JSON.stringify([juegoData]));
      localStorage.setItem('esPrecompra', 'true');
      localStorage.setItem('ultimaPrecompra', Date.now().toString());
      
      console.log('Datos guardados en localStorage');
      console.log('carritoPrecompra:', localStorage.getItem('carritoPrecompra'));
      console.log('esPrecompra:', localStorage.getItem('esPrecompra'));
      
      // Pequeño delay para feedback visual
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navegar al checkout
      console.log('Navegando a checkout...');
      navigate('/checkout');
      
    } catch (error) {
      console.error('Error en precompra:', error);
      // Aquí podrías mostrar un toast de error
    } finally {
      setPrecompraProcesando(null);
    }
  };

  const formatearPrecio = (precio) => {
    return `$${precio.toLocaleString('es-CL')}`;
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Función para generar partículas de fondo
  const generarParticulas = () => {
    const particles = [];
    for (let i = 0; i < 15; i++) {
      particles.push(
        <div 
          key={i}
          className="particle"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${Math.random() * 4 + 4}s`
          }}
        />
      );
    }
    return particles;
  };

  if (loading) {
    return (
      <div className="featured-games-section">
        <div className="particles-container">
          {generarParticulas()}
        </div>
        <div className="container">
          <h2 className="featured-title text-center">Próximos Lanzamientos 2026</h2>
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p className="mt-3">Cargando los juegos más esperados del 2026...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="featured-games-section">
      {/* Partículas de fondo */}
      <div className="particles-container">
        {generarParticulas()}
      </div>
      
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="featured-title">Próximos Lanzamientos 2026</h2>
          <p className="text-light opacity-75 fs-5">
            Sé el primero en jugar - Reserva ahora con descuentos exclusivos de precompra
          </p>
        </div>

        <div className="featured-games-grid">
          {juegos.map((juego) => (
            <div key={juego.id} className="featured-game-item">
              <div className="game-card-3d">
                <div className="game-card-inner">
                  {/* Badge de precompra */}
                  <div className="game-discount-badge">
                    <i className="bi bi-lightning-charge me-1"></i>
                    PREVENTA -{juego.descuento}%
                  </div>

                  {/* Imagen del juego */}
                  <div className="game-image-container">
                    <img 
                      src={juego.imagen} 
                      alt={juego.titulo}
                      className="game-cover-image"
                      loading="lazy"
                    />
                    <div className="game-overlay"></div>
                    
                    {/* Badge de fecha de lanzamiento */}
                    <div className="release-date-badge">
                      <i className="bi bi-calendar-event me-2"></i>
                      {formatearFecha(juego.fechaLanzamiento)}
                    </div>
                  </div>

                  {/* Contenido de la tarjeta */}
                  <div className="game-card-content">
                    <h3 className="game-title">{juego.titulo}</h3>
                    
                    <div className="game-platforms mb-2">
                      <small className="text-light opacity-75">
                        <i className="bi bi-controller me-1"></i>
                        {juego.plataforma}
                      </small>
                    </div>

                    <p className="game-description">
                      {juego.descripcion}
                    </p>

                    <div className="game-price-container">
                      <span className="current-price">
                        {formatearPrecio(juego.precioActual)}
                      </span>
                      <span className="original-price">
                        {formatearPrecio(juego.precioOriginal)}
                      </span>
                    </div>

                    <button 
                      className={`buy-now-btn preorder-btn ${
                        precompraProcesando === juego.id ? 'processing' : ''
                      }`}
                      onClick={() => handlePrecompra(juego)}
                      disabled={precompraProcesando === juego.id}
                    >
                      {precompraProcesando === juego.id ? (
                        <>
                          <i className="bi bi-arrow-repeat spinner-small me-2"></i>
                          Procesando...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-cart-check me-2"></i>
                          Precomprar Ahora
                        </>
                      )}
                    </button>

                    <div className="preorder-benefits mt-3">
                      <div className="benefit-item">
                        <i className="bi bi-shield-check text-success me-2"></i>
                        <small>Garantía de entrega día de lanzamiento</small>
                      </div>
                      <div className="benefit-item">
                        <i className="bi bi-gift text-warning me-2"></i>
                        <small>Contenido adicional exclusivo</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-shadow"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional sobre precompras */}
        <div className="preorder-info-section mt-5">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="preorder-info-card">
                <h4 className="text-center mb-4 text-white">
                  <i className="bi bi-info-circle me-2"></i>
                  Beneficios Exclusivos de Precompra 2026
                </h4>
                <div className="row text-center">
                  <div className="col-md-4 mb-3">
                    <div className="benefit-icon">
                      <i className="bi bi-clock-history"></i>
                    </div>
                    <h6 className="text-white">Acceso Anticipado</h6>
                    <small className="text-light opacity-75">
                      Pre-descarga disponible 72 horas antes del lanzamiento oficial
                    </small>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="benefit-icon">
                      <i className="bi bi-piggy-bank"></i>
                    </div>
                    <h6 className="text-white">Precio Especial</h6>
                    <small className="text-light opacity-75">
                      Hasta 25% de descuento sobre el precio de lanzamiento
                    </small>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="benefit-icon">
                      <i className="bi bi-stars"></i>
                    </div>
                    <h6 className="text-white">Contenido Extra</h6>
                    <small className="text-light opacity-75">
                      DLCs, skins y items exclusivos incluidos gratis
                    </small>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <div className="alert alert-dark border-primary mb-0">
                    <i className="bi bi-exclamation-triangle me-2 text-warning"></i>
                    <strong>Importante:</strong> Las precompras pueden cancelarse hasta 14 días antes del lanzamiento
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Precompras;
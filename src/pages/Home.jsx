import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CatalogoOfertas from "../components/CatalogoOfertas";
import "../assets/css/Precompras.css";
import "../assets/css/AnimacionBalatro.css";
import "../assets/css/Piedepagina.css";
import "../assets/css/Inicio.css";
import cubiertaFlotante1 from '../assets/images/Comod_n.png';
import cubiertaFlotante2 from '../assets/images/Comod_n.png';

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  // Efecto Parallax 3D con el movimiento del mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Solo 3 juegos destacados para el home (sin funcionalidad de precompra)
  const featuredGames = [
    {
      id: 1,
      title: "Grand Theft Auto VI",
      image:
        "https://imagenes.elpais.com/resizer/v2/XOC4Q6EPWECJADRXQLJIXU5PNE.jpg?auth=ee24d91053a568132991fa4bd996180e6a2d47a05155287955e67f00ae49d046&width=1000",
      price: "$74.990",
      originalPrice: "$84.990",
      discount: "12%",
      rotation: -3,
    },
    {
      id: 2,
      title: "Resident Evil Requiem",
      image:
        "https://i.3djuegos.com/juegos/20054/subnautica_2/fotos/ficha/subnautica_2-5929425.webp",
      price: "$59.990",
      originalPrice: "$69.990",
      discount: "14%",
      rotation: 3,
    },
    {
      id: 3,
      title: "The Duskbloods",
      image:
        "https://image.api.playstation.com/vulcan/ap/rnd/202506/0700/3f30b1b8ee413768bb08940e8f848cf88b430aa6622a8873.png",
      price: "$64.990",
      originalPrice: "$74.990",
      discount: "13%",
      rotation: 3,
    },
  ];

  // Funciones de navegación
  const handleVerCatalogo = () => {
    navigate('/');
  };

  const handleVerOfertas = () => {
    // Scroll a la sección de ofertas
    const ofertasSection = document.querySelector('.catalogo-ofertas-section');
    ofertasSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVerPrecompras = () => {
    navigate('/precompras');
  };

  return (
    <div className="home-page">
      {/* Cubiertas flotantes laterales */}
      <div
        className="cubierta-flotante cubierta-izquierda"
        style={{
          transform: `translate(${-mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      >
        <img src={cubiertaFlotante1} alt="Cubierta izquierda" className="cubierta-3d" />
        <div className="resplandor-cubierta"></div>
      </div>

      <div
        className="cubierta-flotante cubierta-derecha"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      >
        <img src={cubiertaFlotante2} alt="Cubierta derecha" className="cubierta-3d" />
        <div className="resplandor-cubierta"></div>
      </div>

      {/* Hero Section Mejorada con Animaciones */}
      <section className="hero-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-12 text-center">
              
              {/* Título Principal con Animaciones Mejoradas */}
              <div className="hero-title-container mb-4">
                <div className="title-glitch-container">
                  <h1 className="hero-main-title glitch-text" data-text="GAMESFORGAMERS">
                    GAMESFORGAMERS
                  </h1>
                  <div className="glitch-layers">
                    <div className="glitch-layer"></div>
                    <div className="glitch-layer"></div>
                    <div className="glitch-layer"></div>
                  </div>
                </div>
                
                {/* Línea decorativa animada mejorada */}
                <div className="title-underline-animated">
                  <div className="underline-beam"></div>
                  <div className="underline-particles">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="particle-dot" style={{ animationDelay: `${i * 0.2}s` }}></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subtítulo Animado */}
              <div className="hero-subtitle mb-4">
                <div className="typing-animation-container">
                  <h2 className="typing-text">
                    TU PORTAL DEFINITIVO HACIA LOS <span className="highlight-text">MEJORES VIDEOJUEGOS</span>
                  </h2>
                </div>
                <div className="pulse-glow"></div>
              </div>

              {/* Descripción del Negocio Mejorada - TEXTO CORREGIDO */}
              <div className="hero-description mb-5">
                <div className="floating-text-container">
                  <p className="lead description-text floating-item">
                    Donde los <strong className="gradient-text">verdaderos gamers</strong> encuentran sus próximas <span className="neon-underline">aventuras épicas</span>
                  </p>
                  <p className="description-tagline floating-item delay-1">
                    Precompra los títulos más esperados y descubre ofertas exclusivas
                  </p>
                </div>
              </div>

              {/* Botones de Acción Mejorados */}
              <div className="hero-actions">
                <div className="action-buttons-grid">
                  <button 
                    className="action-btn btn-catalogo animate__animated animate__fadeInUp"
                    onClick={handleVerCatalogo}
                  >
                    <div className="btn-icon">
                      <i className="bi bi-grid-3x3-gap"></i>
                    </div>
                    <div className="btn-content">
                      <span className="btn-title">Explorar Catálogo</span>
                      <span className="btn-subtitle">+500 juegos disponibles</span>
                    </div>
                    <div className="btn-arrow">
                      <i className="bi bi-arrow-right"></i>
                    </div>
                  </button>

                  <button 
                    className="action-btn btn-ofertas animate__animated animate__fadeInUp animate__delay-1s"
                    onClick={handleVerOfertas}
                  >
                    <div className="btn-icon">
                      <i className="bi bi-lightning-charge"></i>
                    </div>
                    <div className="btn-content">
                      <span className="btn-title">Ofertas Flash</span>
                      <span className="btn-subtitle">Hasta 80% descuento</span>
                    </div>
                    <div className="btn-arrow">
                      <i className="bi bi-arrow-right"></i>
                    </div>
                  </button>

                  <button 
                    className="action-btn btn-precompras animate__animated animate__fadeInUp animate__delay-2s"
                    onClick={handleVerPrecompras}
                  >
                    <div className="btn-icon">
                      <i className="bi bi-cart-check"></i>
                    </div>
                    <div className="btn-content">
                      <span className="btn-title">Precompras 2026</span>
                      <span className="btn-subtitle">Juegos más esperados</span>
                    </div>
                    <div className="btn-arrow">
                      <i className="bi bi-arrow-right"></i>
                    </div>
                  </button>
                </div>

                {/* Stats del Sitio */}
                <div className="hero-stats animate__animated animate__fadeIn animate__delay-3s">
                  <div className="stat-item">
                    <div className="stat-number">10K+</div>
                    <div className="stat-label">Jugadores Activos</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">500+</div>
                    <div className="stat-label">Juegos Disponibles</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">24/7</div>
                    <div className="stat-label">Soporte</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">98%</div>
                    <div className="stat-label">Satisfacción</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Juegos Destacados (Solo visual, sin funcionalidad de precompra) */}
      <section className="featured-games-section py-5">
        <div className="container">
          <h2 className="featured-title text-center mb-5 neon-title">
            Próximos Lanzamientos
          </h2>

          <div className="row justify-content-center">
            {featuredGames.map((game) => (
              <div key={game.id} className="col-md-4 col-lg-4 mb-4">
                <div
                  className="game-card-3d"
                  style={{
                    transform: `perspective(1000px) rotateY(${game.rotation}deg) 
                                translateX(${mousePosition.x}px) translateY(${mousePosition.y}px)`,
                    transition: "transform 0.1s ease-out",
                  }}
                >
                  <div className="game-card-inner">
                    <div className="game-image-container">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="game-cover-image"
                      />
                      <div className="game-overlay"></div>
                      <div className="game-discount-badge">-{game.discount}</div>
                    </div>

                    <div className="game-card-content text-center">
                      <h3 className="game-title">{game.title}</h3>
                      <div className="game-price-container">
                        <span className="current-price">{game.price}</span>
                        <span className="original-price">{game.originalPrice}</span>
                      </div>
                      <button className="btn btn-outline-light buy-now-btn mt-2" disabled>
                        Próximamente
                      </button>
                    </div>
                  </div>
                  <div className="card-shadow"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Banner para redirigir a Precompras reales */}
          <div className="row justify-content-center mt-4">
            <div className="col-md-8">
              <div className="precompra-banner-home text-center p-4">
                <h4 className="text-warning mb-3">
                  <i className="bi bi-lightning-charge me-2"></i>
                  ¿Buscas los próximos lanzamientos?
                </h4>
                <p className="text-light mb-3">
                  Descubre nuestra sección exclusiva de precompras con descuentos especiales 
                  y contenido adicional para los juegos más esperados del 2026.
                </p>
                <button 
                  className="btn btn-warning btn-lg"
                  onClick={handleVerPrecompras}
                >
                  <i className="bi bi-cart-check me-2"></i>
                  Explorar Precompras 2026
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de Ofertas */}
      <section className="catalogo-ofertas-section">
        <CatalogoOfertas />
      </section>
    </div>
  );
}

export default Home;
import { useState, useEffect } from 'react';
import GameTicker from "../components/CatalogoOfertas";
import "../assets/css/Precompras.css";
import "../assets/css/AnimacionBalatro.css";
import cubiertaFlotante1 from '../assets/images/Comod_n.png';
import cubiertaFlotante2 from '../assets/images/Comod_n.png';

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Efecto parallax con movimiento del mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const featuredGames = [
    {
      id: 1,
      title: "Grand Theft Auto VI",
      image: "https://imagenes.elpais.com/resizer/v2/XOC4Q6EPWECJADRXQLJIXU5PNE.jpg?auth=ee24d91053a568132991fa4bd996180e6a2d47a05155287955e67f00ae49d046&width=1000",
      price: "$27.99",
      originalPrice: "$39.99",
      discount: "30%",
      rotation: -3
    },
    {
      id: 2,
      title: "Subnautica 2",
      image: "https://i.3djuegos.com/juegos/20054/subnautica_2/fotos/ficha/subnautica_2-5929425.webp",
      price: "$37.49",
      originalPrice: "$49.99",
      discount: "25%",
      rotation: 3
    },
    {
      id: 3,
      title: "Resident Evil Requiem",
      image: "https://image.api.playstation.com/vulcan/ap/rnd/202506/0700/3f30b1b8ee413768bb08940e8f848cf88b430aa6622a8873.png",
      price: "$37.49",
      originalPrice: "$49.99",
      discount: "25%",
      rotation: 3
    }
  ];

  return (
    <div>
      {/* Cubiertas flotantes */}
      <div 
        className="cubierta-flotante cubierta-izquierda"
        style={{
          transform: `translate(${-mousePosition.x}px, ${mousePosition.y}px)`
        }}
      >
        <img 
          src={cubiertaFlotante1} 
          alt="Cubierta izquierda" 
          className="cubierta-3d"
        />
        <div className="resplandor-cubierta"></div>
      </div>

      <div 
        className="cubierta-flotante cubierta-derecha"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      >
        <img 
          src={cubiertaFlotante2} 
          alt="Cubierta derecha" 
          className="cubierta-3d"
        />
        <div className="resplandor-cubierta"></div>
      </div>

      {/* Sección Juegos Destacados 2.5D */}
      <section className="featured-games-section py-5">
        <div className="container">
          <h2 className="featured-title text-center mb-5">
              Precompra tu Juego!
          </h2>
          
          <div className="row justify-content-center">
            {featuredGames.map((game, index) => (
              <div key={game.id} className="col-md-4 col-lg-4 mb-4">
                <div 
                  className="game-card-3d"
                  style={{
                    transform: `perspective(1000px) rotateY(${game.rotation}deg) translateX(${mousePosition.x}px) translateY(${mousePosition.y}px)`,
                    transition: 'transform 0.1s ease-out'
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
                      <div className="game-discount-badge">
                        -{game.discount}
                      </div>
                    </div>
                    
                    <div className="game-card-content">
                      <h3 className="game-title">{game.title}</h3>
                      <div className="game-price-container">
                        <span className="current-price">{game.price}</span>
                        <span className="original-price">{game.originalPrice}</span>
                      </div>
                      <button className="btn buy-now-btn">
                        Reservar Ahora
                      </button>
                    </div>
                  </div>
                  
                  {/* Efecto de sombra 3D */}
                  <div className="card-shadow"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GameTicker */}
      <GameTicker />
    </div>
  );
}

export default Home;
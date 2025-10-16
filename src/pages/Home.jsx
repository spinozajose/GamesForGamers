import { useState, useEffect } from 'react';
import GameTicker from "../components/GameTicker";
import "../assets/css/Precompras.css"; // Importa el CSS de covers 3D

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
      title: "Grand Thef Auto VI",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=300&h=400&fit=crop",
      price: "$27.99",
      originalPrice: "$39.99",
      discount: "30%",
      rotation: -3
    },
    {
      id: 2,
      title: "Subnautica 2",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=400&fit=crop",
      price: "$37.49",
      originalPrice: "$49.99",
      discount: "25%",
      rotation: 3
    },
    {
      id: 3,
      title: "Resident Evil Requiem",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=400&fit=crop",
      price: "$37.49",
      originalPrice: "$49.99",
      discount: "25%",
      rotation: 3
    }
  ];

  return (
    <div>
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
                        Comprar Ahora
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
      
      {/* Resto del contenido */}
    </div>
  );
}

export default Home;
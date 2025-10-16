import React from 'react';
import { motion } from 'framer-motion';

const GameTicker = () => {
  const games = [
    { 
      id: 1, 
      name: 'The Legend of Zelda', 
      price: '$53.99', 
      originalPrice: '$59.99',
      discount: '10%',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop&crop=center' // Imagen más grande
    },
    { 
      id: 2, 
      name: 'Cyberpunk 2077', 
      price: '$27.99', 
      originalPrice: '$39.99',
      discount: '30%',
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 3, 
      name: 'Elden Ring', 
      price: '$37.49', 
      originalPrice: '$49.99',
      discount: '25%',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 4, 
      name: 'Minecraft', 
      price: '$22.90', 
      originalPrice: '$26.95',
      discount: '15%',
      image: 'https://images.unsplash.com/photo-1627856013091-fd9c2d2c8eff?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 5, 
      name: 'God of War', 
      price: '$39.99', 
      originalPrice: '$49.99',
      discount: '20%',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 6, 
      name: 'Fortnite', 
      price: 'Gratis', 
      originalPrice: '',
      discount: '',
      image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=300&h=300&fit=crop&crop=center'
    }
  ];

  const duplicatedGames = [...games, ...games];

  return (
    <div className="ticker-container">
      <div className="ticker-header">
        <h2>🎮 Ofertas Especiales en Juegos</h2>
      </div>
      
      <div className="ticker-wrapper">
        <motion.div
          className="ticker-track"
          animate={{
            x: ['0%', '-50%']
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 45, // Un poco más lento para imágenes grandes
              ease: "linear",
            }
          }}
        >
          {duplicatedGames.map((game, index) => (
            <div key={`${game.id}-${index}`} className="game-item">
              <img 
                src={game.image} 
                alt={game.name}
                className="game-image"
                onError={(e) => {
                  // Fallback image más grande
                  e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop&crop=center';
                }}
              />
              <div className="game-info">
                <span className="game-name">{game.name}</span>
                <div className="game-price-container">
                  <span className="game-price">{game.price}</span>
                  {game.originalPrice && game.originalPrice !== game.price && (
                    <span className="game-original-price">{game.originalPrice}</span>
                  )}
                  {game.discount && (
                    <span className="game-discount">-{game.discount}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default GameTicker;
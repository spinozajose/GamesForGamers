import React from 'react';
import { motion } from 'framer-motion';
import zelda from '../assets/images/zelda.jpg';
import cyberpunk from '../assets/images/Cyberpunk-2077.jpg';
import eldenring from '../assets/images/EldenRin.jpg';
import minecraft from '../assets/images/maicra.jpg';
import gow from '../assets/images/god-war-ragnarok-2872129.webp';
import fornai from '../assets/images/fornai.jpg';
import '../assets/css/ofertas.css';
import { useInView } from 'react-intersection-observer';
import '../assets/css/ComponenteAnimado.css';

const GameTicker = () => {
  const games = [
    { 
      id: 1, 
      name: 'The Legend of Zelda', 
      price: '$53.99', 
      originalPrice: '$59.99',
      discount: '10%',
      image: zelda // Imagen más grande
    },
    { 
      id: 2, 
      name: 'Cyberpunk 2077', 
      price: '$27.99', 
      originalPrice: '$39.99',
      discount: '30%',
      image: cyberpunk
    },
    { 
      id: 3, 
      name: 'Elden Ring', 
      price: '$37.49', 
      originalPrice: '$49.99',
      discount: '25%',
      image: eldenring
    },
    { 
      id: 4, 
      name: 'Minecraft', 
      price: '$22.90', 
      originalPrice: '$26.95',
      discount: '15%',
      image: minecraft
    },
    { 
      id: 5, 
      name: 'God of War', 
      price: '$39.99', 
      originalPrice: '$49.99',
      discount: '20%',
      image: gow
    },
    { 
      id: 6, 
      name: 'Fortnite', 
      price: 'Gratis', 
      originalPrice: '',
      discount: '',
      image: fornai
    }
  ];

  const duplicatedGames = [...games, ...games];
  const { ref, inView } = useInView({
      threshold: 0, 
      triggerOnce: true, 
    });

  return (

    <div ref={ref} className={`ticker-container componente ${inView ? 'visible' : 'oculto'}`}>
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
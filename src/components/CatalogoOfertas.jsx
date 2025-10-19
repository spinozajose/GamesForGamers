import React, { useState, useEffect } from 'react';
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
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 0,
    seconds: 0
  });

  const games = [
    { 
      id: 1, 
      name: 'The Legend of Zelda', 
      price: '$53.99', 
      originalPrice: '$59.99',
      discount: '10%',
      image: zelda
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

  // Contador de ofertas Deluxe - 14 horas
  useEffect(() => {
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 14);
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = endTime - now;

      if (difference <= 0) {
        // Reiniciar el contador cuando llegue a 0
        endTime.setHours(endTime.getHours() + 14);
      } else {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          hours: hours,
          minutes: minutes,
          seconds: seconds
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const duplicatedGames = [...games, ...games];
  const { ref, inView } = useInView({
    threshold: 0, 
    triggerOnce: true, 
  });

  return (
    <div ref={ref} className={`ticker-container componente ${inView ? 'visible' : 'oculto'}`}>
      
      {/* Contador de Ofertas Deluxe */}
      <div className="deluxe-counter-container">
        <div 
          className="counter-card p-4 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 12, 41, 0.95), rgba(25, 20, 60, 0.95))',
            border: '2px solid rgba(0, 255, 255, 0.4)',
            borderRadius: '15px',
            boxShadow: '0 0 40px rgba(0, 255, 255, 0.5), inset 0 0 25px rgba(0, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Efecto de brillo superior */}
          <div 
            className="counter-glow"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, transparent, rgb(var(--rgb-primary)), rgb(var(--rgb-secondary)), transparent)',
              animation: 'slideGlow 3s infinite linear'
            }}
          ></div>

          <h3 
            className="counter-title mb-3"
            style={{
              color: '#fff',
              fontSize: '2.2rem',
              fontWeight: '800',
              textShadow: '0 0 20px rgba(0, 255, 255, 0.9)',
              background: 'linear-gradient(90deg, #ff00ff, #00ffff, #ffff00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '1px'
            }}
          >
            🚨 OFERTAS DELUXE 🚨
          </h3>
          
          <p 
            className="counter-subtitle mb-4"
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1.2rem',
              fontWeight: '400',
              textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
            }}
          >
            ¡Descuentos exclusivos terminan en!
          </p>

          {/* Contador */}
          <div className="counter-timer">
            <div className="row justify-content-center">
              <div className="col-auto">
                <div className="time-unit">
                  <div 
                    className="time-value"
                    style={{
                      fontSize: '2.8rem',
                      fontWeight: '900',
                      color: '#00ffff',
                      textShadow: '0 0 25px rgba(0, 255, 255, 0.9)',
                      background: 'rgba(0, 0, 0, 0.4)',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      border: '2px solid rgba(0, 255, 255, 0.6)',
                      minWidth: '90px',
                      fontFamily: 'Courier New, monospace'
                    }}
                  >
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </div>
                  <div 
                    className="time-label"
                    style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '1rem',
                      marginTop: '8px',
                      textTransform: 'uppercase',
                      fontWeight: '600'
                    }}
                  >
                    Horas
                  </div>
                </div>
              </div>
              
              <div className="col-auto d-flex align-items-center">
                <div 
                  style={{
                    color: '#00ffff',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    margin: '0 15px',
                    textShadow: '0 0 15px rgba(0, 255, 255, 0.7)'
                  }}
                >
                  :
                </div>
              </div>
              
              <div className="col-auto">
                <div className="time-unit">
                  <div 
                    className="time-value"
                    style={{
                      fontSize: '2.8rem',
                      fontWeight: '900',
                      color: '#ff00ff',
                      textShadow: '0 0 25px rgba(255, 0, 255, 0.9)',
                      background: 'rgba(0, 0, 0, 0.4)',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      border: '2px solid rgba(255, 0, 255, 0.6)',
                      minWidth: '90px',
                      fontFamily: 'Courier New, monospace'
                    }}
                  >
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </div>
                  <div 
                    className="time-label"
                    style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '1rem',
                      marginTop: '8px',
                      textTransform: 'uppercase',
                      fontWeight: '600'
                    }}
                  >
                    Minutos
                  </div>
                </div>
              </div>
              
              <div className="col-auto d-flex align-items-center">
                <div 
                  style={{
                    color: '#00ffff',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    margin: '0 15px',
                    textShadow: '0 0 15px rgba(0, 255, 255, 0.7)'
                  }}
                >
                  :
                </div>
              </div>
              
              <div className="col-auto">
                <div className="time-unit">
                  <div 
                    className="time-value"
                    style={{
                      fontSize: '2.8rem',
                      fontWeight: '900',
                      color: '#ffff00',
                      textShadow: '0 0 25px rgba(255, 255, 0, 0.9)',
                      background: 'rgba(0, 0, 0, 0.4)',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      border: '2px solid rgba(255, 255, 0, 0.6)',
                      minWidth: '90px',
                      fontFamily: 'Courier New, monospace'
                    }}
                  >
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </div>
                  <div 
                    className="time-label"
                    style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '1rem',
                      marginTop: '8px',
                      textTransform: 'uppercase',
                      fontWeight: '600'
                    }}
                  >
                    Segundos
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mensaje de urgencia */}
          <div 
            className="urgency-message mt-4"
            style={{
              color: '#ff4444',
              fontSize: '1.1rem',
              fontWeight: '700',
              textShadow: '0 0 15px rgba(255, 68, 68, 0.7)',
              animation: 'pulseUrgent 1s infinite alternate',
              letterSpacing: '0.5px'
            }}
          >
            ⚡ ¡NO PIERDAS ESTA OPORTUNIDAD ÚNICA! ⚡
          </div>
        </div>
      </div>

      {/* Ticker de Ofertas */}
      <div className="ticker-header">
        <h2>🎮 Ofertas Especiales en Juegos</h2>
        <p className="ticker-subtitle">Desliza para descubrir más ofertas increíbles</p>
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
              duration: 45,
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
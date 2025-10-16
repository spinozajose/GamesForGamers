import React, { useState } from 'react';
import zelda from '../assets/images/zelda.jpg';
import cyberpunk from '../assets/images/Cyberpunk-2077.jpg';
import eldenring from '../assets/images/EldenRin.jpg';
import minecraft from '../assets/images/maicra.jpg';
import gow from '../assets/images/god-war-ragnarok-2872129.webp';
import fornai from '../assets/images/fornai.jpg';
import '../assets/css/ofertas.css';
import { useInView } from 'react-intersection-observer';
import '../assets/css/ComponenteAnimado.css';

const MiniCatalogo = () => {
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

    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true,
    });

    const [juegos] = useState(games);
    return (
        <div ref={ref} className={`ticker-container componente ${inView ? 'visible' : 'oculto'}`}>
            <h1>🎮 Nuestro Mini Catálogo de Videojuegos</h1>
            <p className="total-juegos">Total de títulos: {juegos.length}</p>

            <div className="lista-juegos">
                {/* 2. Mapeamos el array de 'juegos' para renderizar un componente por cada juego */}
                {juegos.map((game) => (
                    <div key={game.id} className="game-item">
                        <img
                            src={game.image}
                            alt={game.name}
                            className="game-image"
                            onError={(e) => {
                                // Fallback image más grande
                                e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop&crop=center';
                            }}
                        />
                        <h2 className="game-name">{game.name}
                        </h2>
                        <p className="game-plataforma">
                            **Precio:** {game.originalPrice}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );


}
export default MiniCatalogo;
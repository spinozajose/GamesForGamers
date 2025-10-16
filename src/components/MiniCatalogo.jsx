import React, { useState } from 'react';
import silksong from '../assets/images/Silksong.jpg';
import peak from '../assets/images/peak.jpg';
import hd2 from '../assets/images/helldivers.jpg';
import bloodborne from '../assets/images/Bloodborne.jpg';

import gow from '../assets/images/god-war-ragnarok-2872129.webp';
import fornai from '../assets/images/fornai.jpg';
import '../assets/css/MiniCatalogo.css';
import { useInView } from 'react-intersection-observer';
import '../assets/css/ComponenteAnimado.css';

const MiniCatalogo = () => {
    const games = [
        {
            id: 1,
            name: 'Hollow Knight: Silksong',
            originalPrice: '$7.99',
            image: silksong // Imagen más grande
        },
        {
            id: 2,
            name: 'Peak',
            originalPrice: '$10.99',
            image: peak
        },
        {
            id: 3,
            name: 'Helldivers 2',
            originalPrice: '$49.99',
            image: hd2
        },
        {
            id: 4,
            name: 'Bloodborne',
            originalPrice: '$26.95',
            image: bloodborne
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
            <h2 className='ticker-header featured-title'>🎮 Catálogo de Videojuegos</h2>
            <p className="ticker-header featured-title">Total de títulos: {juegos.length}</p>

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
                        <p className="game-price">
                            {game.originalPrice}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );


}
export default MiniCatalogo;
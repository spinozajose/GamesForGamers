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
import DetalleJuego from './DetalleJuego';
import { desc } from 'framer-motion/client';

const MiniCatalogo = () => {
    const games = [
        {
            id: 1,
            name: 'Hollow Knight: Silksong',
            originalPrice: '$7.99',
            image: silksong,
            description: 'Embárcate en una nueva aventura en el reino de Hallownest como Hornet, enfrentándote a nuevos enemigos y explorando vastos paisajes.'
        },
        {
            id: 2,
            name: 'Peak',
            originalPrice: '$10.99',
            image: peak,
            description: 'Experimenta la emoción de escalar montañas impresionantes, enfrentándote a desafíos climáticos y descubriendo vistas panorámicas.'
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
            originalPrice: '$49.99',
            image: gow
        },
        {
            id: 6,
            name: 'Fortnite',
            originalPrice: 'Gratis',
            image: fornai
        }
    ];

    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true,
    });
    const [juegoSeleccionado, setJuegoSeleccionado] = useState(null); 

    const handleSeleccionarJuego = (juego) => {
        setJuegoSeleccionado(juego);
    };

    const handleVolverACatalogo = () => {
        setJuegoSeleccionado(null);
    };
    const [juegos] = useState(games);

    if (juegoSeleccionado) {
        return (
            <DetalleJuego 
                juego={juegoSeleccionado} 
                onVolver={handleVolverACatalogo} 
            />
        );
    }


    
    return (
        <div ref={ref} className={`ticker-container componente ${inView ? 'visible' : 'oculto'}`}>
            <h2 className='ticker-header featured-title'>🎮 Catálogo de Videojuegos</h2>
            <p className="ticker-header featured-title">Total de títulos: {juegos.length}</p>

            <div className="lista-juegos">
                {juegos.map((game) => (
                    <div 
                        key={game.id} 
                        className="game-item clickable"
                        onClick={() => handleSeleccionarJuego(game)} 
                    >                        
                        <img
                            src={game.image}
                            alt={game.name}
                            className="game-image"
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=200&fit=crop&crop=center';
                            }}
                        />
                        <h2 className="game-name">{game.name}
                        </h2>
                        <div className="price-container">
                            {game.price && game.price !== game.originalPrice && (
                                <p className="original-price-tachado">{game.originalPrice}</p>
                            )}
                            <p className="game-price">{game.price || game.originalPrice}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );


}
export default MiniCatalogo;
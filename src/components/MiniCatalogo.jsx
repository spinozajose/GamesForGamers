import React, { useState } from 'react';
import silksong from '../assets/images/Silksong.jpg';
import peak from '../assets/images/peak.jpg';
import hd2 from '../assets/images/helldivers.jpg';
import bloodborne from '../assets/images/Bloodborne.jpg';
import got from '../assets/images/got.jpg';
import gta5 from '../assets/images/gta5.jpg';
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
            originalPrice: '$7.990',
            image: silksong,
            description: 'Embárcate en una nueva aventura en el reino de Hallownest como Hornet, enfrentándote a nuevos enemigos y explorando vastos paisajes.',
            valoracion: '⭐⭐⭐⭐⭐',
            plataformas:'PC / PS4 / PS5 / Xbox Series X/S / Nintendo Switch 2',
            creador: 'Team Cherry',
            genero: 'Metroidvania'
        },
        {
            id: 2,
            name: 'Peak',
            originalPrice: '$9.990',
            image: peak,
            description: 'Experimenta la emoción de escalar montañas impresionantes, enfrentándote a desafíos climáticos y descubriendo vistas panorámicas.',
            valoracion: '⭐⭐⭐⭐',
            plataformas:'PC',
            creador: 'Mountain Games',
            genero: 'Aventura / Simulación'
        },
        {
            id: 3,
            name: 'Helldivers 2',
            originalPrice: '$49.990',
            image: hd2,
            description: 'Únete a la élite de los Helldivers en esta secuela llena de acción, luchando contra amenazas alienígenas para proteger la Super Tierra.',
            valoracion: '⭐⭐⭐⭐⭐',
            plataformas:'PC / PS5 / Xbox Series X/S',
            creador: 'Arrowhead Game Studios',
            genero: 'Shooter / Cooperativo'
        },
        {
            id: 4,
            name: 'Bloodborne',
            originalPrice: '$14.990',
            image: bloodborne,
            description: 'Adéntrate en la oscura y gótica ciudad de Yharnam, enfrentándote a bestias aterradoras y desentrañando los secretos de una antigua maldición.',
            valoracion: '⭐⭐⭐⭐⭐',
            plataformas:'PS4 / PS5',
            creador: 'FromSoftware',
            genero: 'RPG / Acción'
        },
        {
            id: 5,
            name: 'Ghost of Tsushima',
            originalPrice: '$19.990',
            image: got,
            description: 'Embárcate en un viaje épico como Jin Sakai, un samurái que lucha por salvar su hogar de la invasión mongola.',
            valoracion: '⭐⭐⭐⭐⭐',
            plataformas:'PS4 / PS5',
            creador: 'Sucker Punch Productions',
            genero: 'Acción / Aventura'
        },
        {
            id: 6,
            name: 'Grand Theft Auto V',
            originalPrice: '$19.990',
            image: gta5,
            description: 'Sumérgete en el mundo abierto de Los Santos, realizando misiones emocionantes y explorando una ciudad vibrante llena de vida.',
            valoracion: '⭐⭐⭐⭐⭐',
            plataformas:'PC / PS4 / PS5 / Xbox One / Xbox Series X/S',
            creador: 'Rockstar Games',
            genero: 'Acción / Aventura'
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
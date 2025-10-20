import React, { useState } from 'react';
const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
import gamesData from '../juegosjson/juegosCatalogo.json';
import silksong from '../assets/images/Silksong.jpg';
import peak from '../assets/images/peak.jpg';
import hd2 from '../assets/images/helldivers.jpg';
import bloodborne from '../assets/images/Bloodborne.jpg';
import got from '../assets/images/got.jpg';
import gta5 from '../assets/images/gta5.jpg';
import softf from '../assets/images/Sons_of_the_Forest.jpg';
import zelda2 from '../assets/images/zelda2.jpg';
import daystodie from '../assets/images/7dtd.jpg';
import palworld from '../assets/images/palworld.jpg';
import dl2 from '../assets/images/dl2.jpg';
import '../assets/css/MiniCatalogo.css';
import { useInView } from 'react-intersection-observer';
import '../assets/css/ComponenteAnimado.css';
import DetalleJuego from './DetalleJuego';

const imageMap = {
    'silksong.jpg': silksong,
    'peak.jpg': peak,
    'hd2.jpg': hd2,
    'bloodborne.jpg': bloodborne,
    'got.jpg': got,
    'gta5.jpg': gta5,
    'softf.jpg': softf,
    'zelda2.jpg': zelda2,
    'daystodie.jpg': daystodie,
    'palworld.jpg': palworld,
    'dl2.jpg': dl2,
};

const games = gamesData.map(game => ({
    ...game,
    image: imageMap[game.image] 
}));

const MiniCatalogo = () => {
    
    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true,
    });
    const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);


    const [juegos] = useState(games);

    const [filtroCategoria, setFiltroCategoria] = useState('Todos');

    const handleSeleccionarJuego = (juego) => {
        setJuegoSeleccionado(juego);
    };

    const handleVolverACatalogo = () => {
        setJuegoSeleccionado(null);
    };

    const handleFiltrarPorCategoria = (categoria) => {
        setFiltroCategoria(categoria);
        setJuegoSeleccionado(null);
    };

    const juegosFiltrados = juegos.filter(juego => {
        if (filtroCategoria === 'Todos') {
            return true;
        }
        return juego.genero.includes(filtroCategoria); 
    });

    const categoriasUnicas = ['Todos', ...new Set(juegos.flatMap(j => (j.genero ?? '').split(' / ')))];

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
            <div className="filtro-botones">
                <h3>Filtrar por:</h3>
                {categoriasUnicas.map(categoria => (
                    <button
                        key={categoria}
                        className={filtroCategoria === categoria ? 'filtro-activo' : 'filtro-inactivo'}
                        onClick={() => handleFiltrarPorCategoria(categoria)}
                    >
                        {categoria}
                    </button>
                ))}
            </div>

            <p className="ticker-header featured-title">
                Total de títulos disponibles: {juegosFiltrados.length}
            </p>

            <div className="lista-juegos"></div>

            <div className="lista-juegos">
                {juegosFiltrados.map((game) => (
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
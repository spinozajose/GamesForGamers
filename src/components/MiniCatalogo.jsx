import React, { useState } from 'react';
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

const MiniCatalogo = () => {
    const games = [
        {
            id: 1,
            name: 'Hollow Knight: Silksong',
            originalPrice: '$7.990',
            image: silksong,
            description: 'Embárcate en una nueva aventura en el reino de Hallownest como Hornet, enfrentándote a nuevos enemigos y explorando vastos paisajes.',
            valoracion: '⭐⭐⭐⭐⭐',
            plataformas: 'PC / PS4 / PS5 / Xbox Series X/S / Nintendo Switch 2',
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
            plataformas: 'PC',
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
            plataformas: 'PC / PS5 / Xbox Series X/S',
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
            plataformas: 'PS4 / PS5',
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
            plataformas: 'PS4 / PS5',
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
            plataformas: 'PC / PS4 / PS5 / Xbox One / Xbox Series X/S',
            creador: 'Rockstar Games',
            genero: 'Acción / Aventura'
        },
        {
            id: 7,
            name: 'Sons of the Forest',
            originalPrice: '$29.99',
            image: softf, 
            description: 'Un simulador de terror y supervivencia en mundo abierto donde eres enviado a una isla remota para encontrar a un multimillonario desaparecido. Te encuentras en un infierno de caníbales y mutantes. Cuenta con mecánicas de crafteo y construcción muy mejoradas respecto al original.',
            valoracion: '⭐⭐⭐⭐⭐', 
            plataformas: 'PC.',
            creador: 'Endnight Games Ltd.',
            genero: 'Supervivencia / Terror / Mundo Abierto / Cooperativo'    
        },
        {
            
            id: 8,
            name: 'The Legend of Zelda: Tears of the Kingdom',
            originalPrice: '$39.99',
            image: zelda2,
            description: 'Una secuela directa de Breath of the Wild, donde el héroe Link explora un mundo abierto masivo que ahora se extiende desde las profundidades de la tierra hasta las islas flotantes en el cielo de Hyrule. El juego se centra en la **experimentación** y la **creatividad** del jugador, introduciendo nuevas y poderosas habilidades de construcción y fusión de objetos.',
            valoracion: '⭐⭐⭐⭐⭐',
            plataformas: 'Nintendo Switch',
            creador: 'Nintendo',
            genero: 'Aventura / Acción / RPG / Mundo Abierto' 
        },
        {
            id: 9,
            name: "7 Days to Die",
            originalPrice: "$24.99",
            image: daystodie,
            description: "Un híbrido de supervivencia, shooter, RPG, crafting y defensa de torres. Los jugadores exploran un vasto mundo abierto post-apocalíptico lleno de zombis, construyen fortificaciones robustas y se preparan para las hordas que atacan cada siete días. El sistema RPG de habilidades permite la progresión en un mundo hostil.",
            modoJuego: "Un Jugador, Cooperativo Online (P2P o Servidor), Multijugador PvP.",
            valoracion: '⭐⭐⭐⭐⭐',
            plataformas: "PC (Steam), PS4, Xbox One.",
            creador: "The Fun Pimps",
            genero: "Supervivencia / Acción / RPG / Shooter / Terror / Mundo Abierto / Cooperativo"

        },
        {
            id: 10,
            name: "Palworld",
            originalPrice: "$29.99",
            image: palworld,
            description: "Un juego de mundo abierto de supervivencia y crafting con elementos de shooter. El objetivo es explorar un vasto mundo, construir bases, fabricar tecnología y capturar criaturas (Pals) para que luchen o trabajen. Incluye fuerte progresión RPG a través de niveles y el desbloqueo de un gran árbol de tecnología.",
            valoracion: '⭐⭐⭐⭐⭐',
            plataformas: "PC (Steam), Xbox Series X/S, Xbox One (Disponible en Game Pass).",
            creador: "Pocketpair",
            genero: "Supervivencia / Acción / RPG / Shooter / Simulación / Mundo Abierto / Cooperativo"
        },
        {
        id: 11,
        name: "Dying Light 2 Stay Human",
        originalPrice: "$39.99",
        image: dl2,
        description: "Un juego de Acción-RPG en primera persona con un mundo abierto. Destaca por el parkour fluido y el intenso combate. El ciclo día-noche introduce un fuerte elemento de terror y supervivencia, ya que la noche trae consigo zombis mucho más agresivos. La progresión se basa en el desbloqueo de habilidades para acceder a nuevas zonas de la ciudad (similar a la progresión Metroidvania).",
        valoracion: '⭐⭐⭐⭐⭐',
        plataformas: "PC, PS5, PS4, Xbox Series X/S, Xbox One.",
        creador: "Techland",
        genero: "Mundo Abierto / Acción / RPG / Terror / Supervivencia / Acción / Shooter / Cooperativo"
    }
    ]; 

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
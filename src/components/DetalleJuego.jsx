import React from 'react';
import '../assets/css/DetalleJuego.css';

const DetalleJuego = ({ juego, onVolver }) => {
  return (
    <div className="detalle-contenedor">
      <div className="orden-detalle-juego">
        <button onClick={onVolver} className="boton-volver">
          ← Volver al Catálogo
        </button>


        <div className="detalle-tarjeta">
          <img
            src={juego.image}
            alt={juego.name}
            className="detalle-imagen"
          />
        </div>
        <p className="detalle-informacion">Valoración: {juego.valoracion}</p>
        <p className="detalle-informacion">Plataformas: {juego.plataformas}</p>
        <p className="detalle-informacion">Creador: {juego.creador}</p>
        <p className="detalle-informacion">Género: {juego.genero}</p>
      </div>

      <div className="detalle-info">
        <h1>{juego.name}</h1>
        <p className="detalle-precio">
          <span className="precio-actual">{juego.originalPrice}</span>
        </p>
        <div className="detalle-descripcion">
          <p>{juego.description}</p>
        </div>

      </div>
      <div className="detalle-comprar-seccion">
        <div className="">
          <button className="detalle-comprar-boton">
            Comprar Ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleJuego;

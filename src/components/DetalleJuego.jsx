import React from 'react';
import '../assets/css/DetalleJuego.css';

const DetalleJuego = ({ juego, onVolver }) => {
  return (
    <div className="detalle-contenedor">
      <button onClick={onVolver} className="boton-volver">
        ← Volver al Catálogo
      </button>
      
      <div className="detalle-tarjeta">
        <img
          src={juego.image}
          alt={juego.name}
          className="detalle-imagen"
        />
        <div className="detalle-info">
          <h1>{juego.name}</h1>
          <p className="detalle-precio">
            <span className="precio-actual">{juego.originalPrice}</span>
          </p>
          <div className="detalle-descripcion">
            <p>{juego.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleJuego;

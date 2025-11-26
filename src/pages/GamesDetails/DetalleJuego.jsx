import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import "./DetalleJuego.css";

const DetalleJuego = ({ juego, onVolver }) => {
  const { agregarAlCarrito, estaEnCarrito } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const navigate = useNavigate();

  const yaEnCarrito = estaEnCarrito(juego.id);

  const aumentarCantidad = () => setCantidad(prev => prev + 1);
  const disminuirCantidad = () => cantidad > 1 && setCantidad(prev => prev - 1);

  const manejarAgregarAlCarrito = () => {
    agregarAlCarrito(juego, cantidad);
    setMostrarMensaje(true);
    setTimeout(() => setMostrarMensaje(false), 3000);
  };

  const manejarComprarAhora = () => {
    agregarAlCarrito(juego, cantidad);
    navigate("/checkout");
  };

  return (
    <div className="detalle-contenedor">

      {mostrarMensaje && (
        <div className="mensaje-agregado">
          ¡{juego.name} agregado al carrito con éxito!
        </div>
      )}

      <div className="detalle-tarjeta">

        {/* COLUMNA IZQUIERDA */}
        <div className="orden-detalle-juego">
          <button onClick={onVolver} className="boton-volver">← Volver al Catálogo</button>

          <div className="imagen-contenedor">
            <img
              src={juego.image}
              alt={juego.name}
              className="detalle-imagen"
              onError={e => e.target.src =
                "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&h=300&fit=crop&crop=center"
              }
            />
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="detalle-info">

          <h2 className="detalle-titulo">{juego.name}</h2>

          {/* DESCRIPCIÓN PRINCIPAL LOCAL */}
          {juego.description && (
            <p className="detalle-descripcion">{juego.description}</p>
          )}

          {/* METADATOS LOCALES */}
          <div className="rawg-details" style={{ marginBottom: "20px" }}>
            {juego.creador && (
              <div className="metadato-item">
                <span>Creador:</span> <strong>{juego.creador}</strong>
              </div>
            )}
            {juego.genero && (
              <div className="metadato-item">
                <span>Género:</span> <strong>{juego.genero}</strong>
              </div>
            )}
            {juego.plataformas && (
              <div className="metadato-item">
                <span>Plataformas:</span> <strong>{juego.plataformas}</strong>
              </div>
            )}
            {juego.valoracion && (
              <div className="metadato-item">
                <span>Valoración:</span> <strong>{juego.valoracion}</strong>
              </div>
            )}
          </div>

          {/* CONTROLES DE COMPRA */}
          <div className="detalle-metadatos">

            {/* Cantidad */}
            <div className="selector-cantidad-container">
              <strong>Cantidad:</strong>
              <div className="selector-cantidad">
                <button onClick={disminuirCantidad} disabled={cantidad <= 1}>-</button>
                <span className="cantidad-actual">{cantidad}</span>
                <button onClick={aumentarCantidad}>+</button>
              </div>
            </div>

            {/* Botones */}
            <div className="detalle-acciones">
              <button className="detalle-comprar-boton" onClick={manejarComprarAhora}>
                Comprar Ahora
              </button>

              <button
                className={`boton-carrito ${yaEnCarrito ? "agregado" : ""}`}
                onClick={manejarAgregarAlCarrito}
                disabled={yaEnCarrito}
              >
                {yaEnCarrito ? "Agregado al Carrito" : "Agregar al Carrito"}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default DetalleJuego;

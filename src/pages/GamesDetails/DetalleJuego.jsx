import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import clienteAxios from "../../config/axios";
import DOMPurify from 'dompurify'; // <--- 1. IMPORTANTE: Importar el sanitizador
import "./DetalleJuego.css";

const DetalleJuego = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito, estaEnCarrito } = useCarrito();

  const [juego, setJuego] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Estados de UI
  const [cantidad, setCantidad] = useState(1);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  useEffect(() => {
    const obtenerJuego = async () => {
      try {
        setCargando(true);
        // Nota: Asegúrate que tu backend devuelva 'description' o 'descripcion' correctamente
        const respuesta = await clienteAxios.get(`/videojuegos/${id}`);
        setJuego(respuesta.data);
        setCargando(false);
      } catch (error) {
        console.error("Error al cargar el juego:", error);
        setError("No se pudo cargar la información del juego.");
        setCargando(false);
      }
    };

    if (id) {
      obtenerJuego();
    }
  }, [id]);

  const formatearPrecio = (precio) => {
    if (precio === undefined || precio === null) return "$0";
    return `$${precio.toLocaleString('es-CL')}`;
  };

  const aumentarCantidad = () => setCantidad(prev => prev + 1);
  const disminuirCantidad = () => cantidad > 1 && setCantidad(prev => prev - 1);

  const manejarAgregarAlCarrito = () => {
    if (!juego) return;
    
    const descuento = juego.discount || 0;
    const precioFinal = juego.price * (1 - descuento / 100);

    agregarAlCarrito({
        ...juego,
        price: precioFinal
    }, cantidad);

    setMostrarMensaje(true);
    setTimeout(() => setMostrarMensaje(false), 3000);
  };

  const manejarComprarAhora = () => {
    manejarAgregarAlCarrito();
    navigate("/checkout");
  };

  if (cargando) {
    return (
        <div className="detalle-contenedor" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div className="spinner-neon"></div>
        </div>
    );
  }

  if (error || !juego) {
    return (
        <div className="detalle-contenedor" style={{ textAlign: 'center', color: 'white' }}>
            <h2>{error || "Juego no encontrado"}</h2>
            <button onClick={() => navigate('/catalogo')} className="boton-volver">Volver al Catálogo</button>
        </div>
    );
  }

  const yaEnCarrito = estaEnCarrito(juego.id);
  const descuento = juego.discount || 0;
  const precioFinal = juego.price * (1 - descuento / 100);

  // Preparamos la descripción (soporta tanto 'description' como 'descripcion')
  const descripcionHtml = juego.description || juego.descripcion || "";

  return (
    <div className="detalle-contenedor">

      {mostrarMensaje && (
        <div className="mensaje-agregado">
          ¡{juego.name || juego.titulo} agregado al carrito con éxito!
        </div>
      )}

      <div className="detalle-tarjeta">

        {/* COLUMNA IZQUIERDA */}
        <div className="orden-detalle-juego">
          <button onClick={() => navigate('/catalogo')} className="boton-volver">← Volver al Catálogo</button>

          <div className="imagen-contenedor">
            <img
              src={juego.image || juego.imagenUrl || "https://via.placeholder.com/500x300"}
              alt={juego.name}
              className="detalle-imagen"
              onError={e => e.target.src = "https://via.placeholder.com/500x300?text=Sin+Imagen"}
            />
             {descuento > 0 && <span className="etiqueta-descuento">-{descuento}%</span>}
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="detalle-info">

          <h2 className="detalle-titulo">{juego.name || juego.titulo}</h2>
          
          <div className="detalle-precio-block">
             {descuento > 0 && <span className="precio-tachado">{formatearPrecio(juego.price || juego.precio)}</span>}
             <span className="precio-principal">{formatearPrecio(precioFinal)}</span>
          </div>

          {/* 2. CAMBIO AQUÍ: Renderizar HTML de CKEditor */}
          {descripcionHtml && (
            <div 
                className="detalle-descripcion ck-content"
                dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(descripcionHtml) 
                }}
            />
          )}
          {/* ------------------------------------------- */}

          <div className="rawg-details" style={{ marginBottom: "20px" }}>
            {(juego.category || juego.categoria) && (
              <div className="metadato-item">
                <span>Categoría:</span> <strong>{juego.category || juego.categoria}</strong>
              </div>
            )}
            {(juego.plataformas || juego.plataforma) && (
              <div className="metadato-item">
                <span>Plataformas:</span> <strong>{juego.plataformas || juego.plataforma}</strong>
              </div>
            )}
            {(juego.developer || juego.creador) && (
              <div className="metadato-item">
                <span>Desarrollador:</span> <strong>{juego.developer || juego.creador}</strong>
              </div>
            )}
          </div>

          <div className="detalle-metadatos">
            <div className="selector-cantidad-container">
              <strong>Cantidad:</strong>
              <div className="selector-cantidad">
                <button onClick={disminuirCantidad} disabled={cantidad <= 1}>-</button>
                <span className="cantidad-actual">{cantidad}</span>
                <button onClick={aumentarCantidad}>+</button>
              </div>
            </div>

            <div className="detalle-acciones">
              <button className="detalle-comprar-boton" onClick={manejarComprarAhora}>
                Comprar Ahora
              </button>

              <button
                className={`boton-carrito ${yaEnCarrito ? "agregado" : ""}`}
                onClick={manejarAgregarAlCarrito}
                disabled={yaEnCarrito}
              >
                {yaEnCarrito ? "En el carrito" : "Agregar al Carrito"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetalleJuego;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // <--- Importamos useParams
import { useCarrito } from "../../context/CarritoContext";
import clienteAxios from "../../config/axios"; // <--- Importamos axios
import "./DetalleJuego.css";

const DetalleJuego = () => {
  // 1. Obtener el ID de la URL
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito, estaEnCarrito } = useCarrito();

  // 2. Estado local para el juego individual
  const [juego, setJuego] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Estados de UI
  const [cantidad, setCantidad] = useState(1);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  // 3. EFECTO: Cargar el juego al entrar a la página
  useEffect(() => {
    const obtenerJuego = async () => {
      try {
        setCargando(true);
        // Hacemos la petición al backend buscando por ID
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

  // Funciones auxiliares
  const formatearPrecio = (precio) => {
    if (precio === undefined || precio === null) return "$0";
    return `$${precio.toLocaleString('es-CL')}`;
  };

  const aumentarCantidad = () => setCantidad(prev => prev + 1);
  const disminuirCantidad = () => cantidad > 1 && setCantidad(prev => prev - 1);

  const manejarAgregarAlCarrito = () => {
    if (!juego) return;
    
    // Calculamos el precio final por si tiene descuento
    const descuento = juego.discount || 0;
    const precioFinal = juego.price * (1 - descuento / 100);

    agregarAlCarrito({
        ...juego,
        price: precioFinal // Aseguramos enviar el precio con descuento al carrito
    }, cantidad);

    setMostrarMensaje(true);
    setTimeout(() => setMostrarMensaje(false), 3000);
  };

  const manejarComprarAhora = () => {
    manejarAgregarAlCarrito();
    navigate("/checkout");
  };

  // 4. Renderizado Condicional (Carga / Error / Datos)
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

  // Verificación segura si está en carrito
  const yaEnCarrito = estaEnCarrito(juego.id);

  // Cálculos de precio para mostrar
  const descuento = juego.discount || 0;
  const precioFinal = juego.price * (1 - descuento / 100);

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
          {/* Cambiado onVolver por navigate */}
          <button onClick={() => navigate('/catalogo')} className="boton-volver">← Volver al Catálogo</button>

          <div className="imagen-contenedor">
            <img
              src={juego.image || "https://via.placeholder.com/500x300"}
              alt={juego.name}
              className="detalle-imagen"
              onError={e => e.target.src = "https://via.placeholder.com/500x300?text=Sin+Imagen"}
            />
             {descuento > 0 && <span className="etiqueta-descuento">-{descuento}%</span>}
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="detalle-info">

          <h2 className="detalle-titulo">{juego.name}</h2>
          
          {/* Bloque de Precio (Nuevo, para que se vea claro) */}
          <div className="detalle-precio-block">
             {descuento > 0 && <span className="precio-tachado">{formatearPrecio(juego.price)}</span>}
             <span className="precio-principal">{formatearPrecio(precioFinal)}</span>
          </div>

          {juego.description && (
            <p className="detalle-descripcion">{juego.description}</p>
          )}

          {/* METADATOS */}
          <div className="rawg-details" style={{ marginBottom: "20px" }}>
            {juego.category && (
              <div className="metadato-item">
                <span>Categoría:</span> <strong>{juego.category}</strong>
              </div>
            )}
            {juego.plataformas && (
              <div className="metadato-item">
                <span>Plataformas:</span> <strong>{juego.plataformas}</strong>
              </div>
            )}
            {/* Si tu backend envía 'creador' o 'desarrollador', úsalo aquí */}
            {juego.developer && (
              <div className="metadato-item">
                <span>Desarrollador:</span> <strong>{juego.developer}</strong>
              </div>
            )}
          </div>

          {/* CONTROLES DE COMPRA */}
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
                disabled={yaEnCarrito} // Opcional: Si quieres permitir agregar más cantidad, quita el disabled
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
import React, { useState, useEffect } from "react";
import { useCarrito } from "../../context/CarritoContext";
import { useNavigate } from "react-router-dom";
// Importamos tus validaciones y cliente axios
import { useValidacionesCheckout, validarFormularioCompleto } from "../../assets/js/ValidacionesCheckout";
import clienteAxios from "../../config/axios"; // <--- IMPORTANTE
import "./VerificarCompra.css";

const VerificarCompra = () => {
  const { carrito, totalPrecio, limpiarCarrito, eliminarDelCarrito, totalItems } = useCarrito();
  const navigate = useNavigate();
  
  const { validarCampoEnTiempoReal } = useValidacionesCheckout();

  const [procesando, setProcesando] = useState(false);
  const [ordenCompletada, setOrdenCompletada] = useState(false);
  const [ordenId, setOrdenId] = useState(null);
  const [usuario, setUsuario] = useState(null); // Estado para el usuario logueado

  const [errores, setErrores] = useState({});
  const [camposTocados, setCamposTocados] = useState({});

  const [datosEnvio, setDatosEnvio] = useState({
    rut: "",
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    region: "",
    comuna: "",
    ciudad: "",
    codigoPostal: "",
    metodoPago: "tarjeta",
  });

  const [datosPago, setDatosPago] = useState({
    numeroTarjeta: "",
    fechaExpiracion: "",
    cvv: "",
  });

  // AL CARGAR: Verificar si hay usuario logueado
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const user = JSON.parse(usuarioGuardado);
      setUsuario(user);
      // Pre-llenar email si está disponible
      setDatosEnvio(prev => ({ ...prev, email: user.email || "" }));
    } else {
      // Si no está logueado, podrías redirigirlo al login o dejar que compre como invitado (si tu backend lo permite)
      // Por ahora asumiremos que debe estar logueado para guardar la orden
      alert("Debes iniciar sesión para completar la compra");
      navigate('/login');
    }
  }, [navigate]);

  const formatearRUT = (rut) => {
    let valor = rut.replace(/[^0-9kK]/g, "");
    if (valor.length > 1) {
      const cuerpo = valor.slice(0, -1);
      const dv = valor.slice(-1);
      valor = `${cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}-${dv}`;
    }
    return valor;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let valorFinal = value;

    if (name === "rut") valorFinal = formatearRUT(value);

    if (name in datosEnvio) {
      setDatosEnvio(prev => ({ ...prev, [name]: valorFinal }));
    } else {
      setDatosPago(prev => ({ ...prev, [name]: valorFinal }));
    }

    if (camposTocados[name]) {
        const todosLosDatos = { ...datosEnvio, ...datosPago, [name]: valorFinal };
        const error = validarCampoEnTiempoReal(name, valorFinal, todosLosDatos);
        setErrores(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setCamposTocados(prev => ({ ...prev, [name]: true }));
    const todosLosDatos = { ...datosEnvio, ...datosPago };
    const error = validarCampoEnTiempoReal(name, value, todosLosDatos);
    setErrores(prev => ({ ...prev, [name]: error }));
  };

  const handleProcesarOrden = async (e) => {
    e.preventDefault();

    // 1. Validaciones Frontend
    const validacion = validarFormularioCompleto(datosEnvio, datosPago);
    if (!validacion.esValido) {
        setErrores(validacion.errores);
        const toques = {};
        Object.keys({...datosEnvio, ...datosPago}).forEach(k => toques[k] = true);
        setCamposTocados(toques);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    if (!usuario || !usuario.idUsuario) {
        alert("Error: No se identificó al usuario. Por favor inicia sesión nuevamente.");
        return;
    }

    setProcesando(true);

    try {
      // 2. PREPARAR DATOS PARA EL BACKEND
      // Formato esperado por OrdenRequest.java
      const ordenPayload = {
        usuarioId: usuario.idUsuario, // ID del usuario logueado
        items: carrito.map(item => ({
            videojuegoId: item.id, // ID del juego
            cantidad: item.cantidad
        }))
      };

      // 3. ENVIAR AL BACKEND
      const respuesta = await clienteAxios.post('/ordenes', ordenPayload);
      
      // 4. ÉXITO
      const ordenCreada = respuesta.data;
      setOrdenId(ordenCreada.id); // Guardamos el ID real de la BD
      setOrdenCompletada(true);
      limpiarCarrito();

    } catch (error) {
      console.error("Error al procesar orden:", error);
      alert("Hubo un error al procesar tu compra. Por favor intenta nuevamente.");
    } finally {
      setProcesando(false);
    }
  };

  const formatearPrecio = (precio) => `$${precio.toLocaleString("es-CL")}`;
  const getInputClass = (campo) => {
    if (camposTocados[campo] && errores[campo]) return "input-error";
    if (camposTocados[campo] && !errores[campo]) return "input-success";
    return "";
  };

  if (ordenCompletada) {
    return (
      <div className="checkout-page">
        <div className="orden-exitosa-card">
            <div className="icon-success">✅</div>
            <h2>¡Gracias por tu compra!</h2>
            <p>Tu orden <strong>#{ordenId}</strong> ha sido guardada exitosamente.</p>
            <p className="email-note">Hemos enviado los detalles a <strong>{datosEnvio.email}</strong></p>
            <button onClick={() => navigate("/")} className="btn-home">Volver al Inicio</button>
        </div>
      </div>
    );
  }

  if (totalItems === 0) {
    return (
        <div className="checkout-page">
            <div className="carrito-vacio-msg">
                <h2>Tu carrito está vacío 🛒</h2>
                <button onClick={() => navigate("/catalogo")} className="btn-volver">Ir al Catálogo</button>
            </div>
        </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Finalizar Compra</h1>

        <div className="checkout-grid">
          
          {/* FORMULARIO */}
          <div className="checkout-form-section">
            <form onSubmit={handleProcesarOrden} noValidate>
              
              {/* 1. Datos de Contacto */}
              <div className="form-group-section">
                <h3>1. Datos de Contacto</h3>
                <div className="form-row">
                    <div className="input-group">
                        <label>Nombre Completo</label>
                        <input 
                            type="text" name="nombre" 
                            value={datosEnvio.nombre} 
                            onChange={handleInputChange} 
                            onBlur={handleBlur}
                            className={getInputClass('nombre')}
                        />
                        {errores.nombre && <span className="error-text">{errores.nombre}</span>}
                    </div>
                    <div className="input-group">
                        <label>RUT</label>
                        <input 
                            type="text" name="rut" placeholder="12.345.678-9"
                            value={datosEnvio.rut} 
                            onChange={handleInputChange} 
                            onBlur={handleBlur}
                            className={getInputClass('rut')}
                        />
                        {errores.rut && <span className="error-text">{errores.rut}</span>}
                    </div>
                </div>
                <div className="form-row">
                    <div className="input-group">
                        <label>Email</label>
                        <input 
                            type="email" name="email" 
                            value={datosEnvio.email} 
                            onChange={handleInputChange} 
                            onBlur={handleBlur}
                            className={getInputClass('email')}
                        />
                        {errores.email && <span className="error-text">{errores.email}</span>}
                    </div>
                    <div className="input-group">
                        <label>Teléfono (Opcional)</label>
                        <input 
                            type="tel" name="telefono" 
                            value={datosEnvio.telefono} 
                            onChange={handleInputChange} 
                            onBlur={handleBlur}
                            className={getInputClass('telefono')}
                        />
                        {errores.telefono && <span className="error-text">{errores.telefono}</span>}
                    </div>
                </div>
              </div>

              {/* 2. Dirección */}
              <div className="form-group-section">
                <h3>2. Dirección de Envío</h3>
                <div className="input-group full">
                    <label>Dirección</label>
                    <input 
                        type="text" name="direccion" 
                        value={datosEnvio.direccion} 
                        onChange={handleInputChange} 
                        onBlur={handleBlur}
                        className={getInputClass('direccion')}
                    />
                    {errores.direccion && <span className="error-text">{errores.direccion}</span>}
                </div>
                
                <div className="form-row">
                    <div className="input-group">
                        <label>Ciudad</label>
                        <input 
                            type="text" name="ciudad" 
                            value={datosEnvio.ciudad} 
                            onChange={handleInputChange} 
                            onBlur={handleBlur}
                            className={getInputClass('ciudad')}
                        />
                        {errores.ciudad && <span className="error-text">{errores.ciudad}</span>}
                    </div>
                    <div className="input-group">
                        <label>Código Postal (Opcional)</label>
                        <input 
                            type="text" name="codigoPostal" 
                            value={datosEnvio.codigoPostal} 
                            onChange={handleInputChange} 
                            onBlur={handleBlur}
                            className={getInputClass('codigoPostal')}
                        />
                        {errores.codigoPostal && <span className="error-text">{errores.codigoPostal}</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-group">
                        <label>Región</label>
                        <select 
                            name="region" 
                            value={datosEnvio.region} 
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className={getInputClass('region')}
                        >
                            <option value="">Seleccionar...</option>
                            <option value="rm">Metropolitana</option>
                            <option value="valpo">Valparaíso</option>
                            <option value="biobio">Biobío</option>
                        </select>
                        {errores.region && <span className="error-text">{errores.region}</span>}
                    </div>
                    <div className="input-group">
                        <label>Comuna</label>
                        <select 
                            name="comuna" 
                            value={datosEnvio.comuna} 
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className={getInputClass('comuna')}
                        >
                            <option value="">Seleccionar...</option>
                            <option value="santiago">Santiago</option>
                            <option value="providencia">Providencia</option>
                            <option value="vina">Viña del Mar</option>
                        </select>
                        {errores.comuna && <span className="error-text">{errores.comuna}</span>}
                    </div>
                </div>
              </div>

              {/* 3. Pago */}
              <div className="form-group-section">
                <h3>3. Método de Pago</h3>
                <div className="payment-options">
                    <label className={`payment-card ${datosEnvio.metodoPago === 'tarjeta' ? 'selected' : ''}`}>
                        <input type="radio" name="metodoPago" value="tarjeta" checked={datosEnvio.metodoPago === 'tarjeta'} onChange={handleInputChange} />
                        <span>💳 Crédito / Débito</span>
                    </label>
                    <label className={`payment-card ${datosEnvio.metodoPago === 'transferencia' ? 'selected' : ''}`}>
                        <input type="radio" name="metodoPago" value="transferencia" checked={datosEnvio.metodoPago === 'transferencia'} onChange={handleInputChange} />
                        <span>🏦 Transferencia</span>
                    </label>
                </div>

                {datosEnvio.metodoPago === 'tarjeta' && (
                    <div className="card-details">
                        <div className="input-group full">
                            <label>Número de Tarjeta</label>
                            <input 
                                type="text" name="numeroTarjeta" 
                                placeholder="0000 0000 0000 0000" maxLength="16" 
                                value={datosPago.numeroTarjeta}
                                onChange={handleInputChange} 
                                onBlur={handleBlur}
                                className={getInputClass('numeroTarjeta')}
                            />
                            {errores.numeroTarjeta && <span className="error-text">{errores.numeroTarjeta}</span>}
                        </div>
                        <div className="form-row">
                            <div className="input-group">
                                <label>Expira (MM/AA)</label>
                                <input 
                                    type="text" name="fechaExpiracion" 
                                    placeholder="MM/AA" maxLength="5" 
                                    value={datosPago.fechaExpiracion}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={getInputClass('fechaExpiracion')}
                                />
                                {errores.fechaExpiracion && <span className="error-text">{errores.fechaExpiracion}</span>}
                            </div>
                            <div className="input-group">
                                <label>CVV</label>
                                <input 
                                    type="password" name="cvv" 
                                    placeholder="123" maxLength="4" 
                                    value={datosPago.cvv}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={getInputClass('cvv')}
                                />
                                {errores.cvv && <span className="error-text">{errores.cvv}</span>}
                            </div>
                        </div>
                    </div>
                )}
              </div>

              <button type="submit" className="btn-pay" disabled={procesando}>
                {procesando ? "Procesando..." : `Pagar ${formatearPrecio(totalPrecio)}`}
              </button>
            </form>
          </div>

          {/* RESUMEN */}
          <div className="checkout-summary-section">
            <div className="summary-card">
                <h3>Resumen del Pedido</h3>
                <div className="summary-items">
                    {carrito.map((item) => (
                        <div key={item.id} className="summary-item">
                            <div className="summary-img">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="summary-info">
                                <h4>{item.name}</h4>
                                <p className="qty">Cant: {item.cantidad}</p>
                                <p className="price">{formatearPrecio((item.precioNumerico || item.price) * item.cantidad)}</p>
                                {item.releaseDate && <span className="badge-preorder">🚀 Precompra</span>}
                            </div>
                            <button onClick={() => eliminarDelCarrito(item.id)} className="btn-remove-sm">×</button>
                        </div>
                    ))}
                </div>
                
                <div className="summary-totals">
                    <div className="row">
                        <span>Subtotal</span>
                        <span>{formatearPrecio(totalPrecio)}</span>
                    </div>
                    <div className="row">
                        <span>Envío (Digital)</span>
                        <span className="free">Gratis</span>
                    </div>
                    <div className="row total">
                        <span>Total</span>
                        <span>{formatearPrecio(totalPrecio)}</span>
                    </div>
                </div>

                <div className="security-badge">
                    🔒 Pago 100% Seguro y Encriptado
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VerificarCompra;
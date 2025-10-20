import React, { useState, useEffect } from 'react';
import { useCarrito } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import { useValidacionesCheckout } from '../assets/js/ValidacionesCheckout';
import '../assets/css/Checkout.css';

const Checkout = () => {
  const { carrito, totalPrecio, limpiarCarrito, actualizarCantidad, eliminarDelCarrito } = useCarrito();
  const navigate = useNavigate();
  const { validarFormularioCompleto, validarCampoEnTiempoReal } = useValidacionesCheckout();
  
  const [procesando, setProcesando] = useState(false);
  const [ordenCompletada, setOrdenCompletada] = useState(false);
  const [errores, setErrores] = useState({});
  const [camposTocados, setCamposTocados] = useState({});
  const [esPrecompra, setEsPrecompra] = useState(false);
  const [carritoPrecompra, setCarritoPrecompra] = useState([]);
  const [ordenData, setOrdenData] = useState(null);

  const [datosEnvio, setDatosEnvio] = useState({
    rut: '',
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    region: '',
    comuna: '',
    codigoPostal: '',
    metodoPago: 'tarjeta'
  });

  const [datosPago, setDatosPago] = useState({
    numeroTarjeta: '',
    fechaExpiracion: '',
    cvv: ''
  });

  // Cargar datos de precompra al montar el componente
  useEffect(() => {
    const cargarPrecompra = () => {
      const precompraFlag = localStorage.getItem('esPrecompra') === 'true';
      const carritoPrecompraData = JSON.parse(localStorage.getItem('carritoPrecompra') || '[]');
      
      console.log('Checkout - Cargando precompra:', { precompraFlag, carritoPrecompraData });
      
      if (precompraFlag && carritoPrecompraData.length > 0) {
        setEsPrecompra(true);
        setCarritoPrecompra(carritoPrecompraData);
      }
    };

    cargarPrecompra();
  }, []);

  // Obtener los items actuales (normales o precompra)
  const getItemsActuales = () => {
    return esPrecompra ? carritoPrecompra : carrito;
  };

  // Obtener el total actual
  const getTotalActual = () => {
    if (esPrecompra && carritoPrecompra.length > 0) {
      return carritoPrecompra.reduce((total, item) => total + (item.precio || 0), 0);
    }
    return totalPrecio;
  };

  // Función para formatear RUT mientras se escribe
  const formatearRUT = (rut) => {
    if (!rut) return '';
    
    const rutLimpio = rut.replace(/[^0-9kK]/g, '');
    
    if (rutLimpio.length === 0) return '';
    
    let cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1);
    
    if (cuerpo.length > 0) {
      cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    
    return `${cuerpo}-${dv}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name in datosEnvio) {
      if (name === 'rut') {
        const rutFormateado = formatearRUT(value);
        setDatosEnvio(prev => ({
          ...prev,
          [name]: rutFormateado
        }));
      } else {
        setDatosEnvio(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else {
      setDatosPago(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (camposTocados[name]) {
      const valorValidar = name === 'rut' ? formatearRUT(value) : value;
      const error = validarCampoEnTiempoReal(name, valorValidar, { ...datosEnvio, ...datosPago, [name]: valorValidar });
      setErrores(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (campo) => {
    setCamposTocados(prev => ({
      ...prev,
      [campo]: true
    }));

    const valor = campo in datosEnvio ? datosEnvio[campo] : datosPago[campo];
    const error = validarCampoEnTiempoReal(campo, valor, { ...datosEnvio, ...datosPago });
    setErrores(prev => ({
      ...prev,
      [campo]: error
    }));
  };

  const handleProcesarOrden = async (e) => {
    e.preventDefault();
    
    const todosLosCampos = { ...datosEnvio, ...datosPago };
    const nuevosTocados = {};
    Object.keys(todosLosCampos).forEach(campo => {
      nuevosTocados[campo] = true;
    });
    setCamposTocados(nuevosTocados);

    const validacion = validarFormularioCompleto(datosEnvio, datosPago);
    
    if (!validacion.esValido) {
      setErrores(validacion.errores);
      const primerError = Object.keys(validacion.errores)[0];
      const elementoError = document.querySelector(`[name="${primerError}"]`);
      elementoError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setProcesando(true);

    const orden = {
      id: Date.now().toString(),
      fecha: new Date().toISOString(),
      items: getItemsActuales(),
      total: getTotalActual(),
      datosEnvio: { ...datosEnvio },
      datosPago: datosEnvio.metodoPago === 'tarjeta' ? { ...datosPago } : null,
      tipo: esPrecompra ? 'precompra' : 'compra_normal',
      estado: esPrecompra ? 'precompra_confirmada' : 'completada'
    };

    setOrdenData(orden);

    setTimeout(() => {
      setProcesando(false);
      setOrdenCompletada(true);
      
      if (esPrecompra) {
        localStorage.removeItem('carritoPrecompra');
        localStorage.removeItem('esPrecompra');
        localStorage.removeItem('ultimaPrecompra');
      } else {
        limpiarCarrito();
      }
      
      const ordenesPrevias = JSON.parse(localStorage.getItem('ordenes') || '[]');
      ordenesPrevias.push(orden);
      localStorage.setItem('ordenes', JSON.stringify(ordenesPrevias));
      
    }, 3000);
  };

  const aumentarCantidad = (itemId) => {
    if (esPrecompra) return;
    
    const item = carrito.find(item => item.id === itemId);
    if (item) {
      actualizarCantidad(itemId, item.cantidad + 1);
    }
  };

  const disminuirCantidad = (itemId) => {
    if (esPrecompra) return;
    
    const item = carrito.find(item => item.id === itemId);
    if (item && item.cantidad > 1) {
      actualizarCantidad(itemId, item.cantidad - 1);
    }
  };

  const eliminarItem = (itemId) => {
    if (esPrecompra) {
      navigate('/precompras');
      return;
    }
    eliminarDelCarrito(itemId);
  };

  const formatearPrecio = (precio) => {
    return `$${precio.toLocaleString('es-CL')}`;
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getInputStyle = (campo) => {
    if (camposTocados[campo] && errores[campo]) {
      return { 
        borderColor: '#ff4444', 
        boxShadow: '0 0 10px rgba(255, 0, 0, 0.3)' 
      };
    }
    if (camposTocados[campo] && !errores[campo] && (datosEnvio[campo] || datosPago[campo])) {
      return { 
        borderColor: '#00ff88', 
        boxShadow: '0 0 10px rgba(0, 255, 136, 0.3)' 
      };
    }
    return {};
  };

  const itemsActuales = getItemsActuales();
  const totalActual = getTotalActual();

  if (itemsActuales.length === 0 && !ordenCompletada) {
    return (
      <div className="checkout-vacio">
        <div className="checkout-contenedor">
          <h2>🛒 {esPrecompra ? 'Precompra No Encontrada' : 'Carrito Vacío'}</h2>
          <p>{esPrecompra ? 'No se encontraron datos de precompra' : 'No hay productos en tu carrito'}</p>
          <button 
            onClick={() => navigate(esPrecompra ? '/precompras' : '/')}
            className="btn-volver-tienda"
          >
            ← Volver a {esPrecompra ? 'Precompras' : 'Tienda'}
          </button>
        </div>
      </div>
    );
  }

  if (ordenCompletada) {
    return (
      <div className="orden-completada">
        <div className="checkout-contenedor">
          <div className="orden-exitosa">
            <div className="icono-exito">
              {esPrecompra ? '🎮' : '✅'}
            </div>
            <h2>
              {esPrecompra ? '¡Precompra Confirmada!' : '¡Orden Completada!'}
            </h2>
            <p>
              {esPrecompra 
                ? 'Tu precompra ha sido confirmada exitosamente' 
                : 'Tu pedido ha sido procesado exitosamente'
              }
            </p>
            <div className="orden-detalles">
              <p><strong>Número de {esPrecompra ? 'precompra' : 'orden'}:</strong> #{ordenData?.id.slice(-8)}</p>
              <p><strong>Total:</strong> {formatearPrecio(ordenData?.total || 0)}</p>
              <p><strong>Método de pago:</strong> {datosEnvio.metodoPago === 'tarjeta' ? 'Tarjeta de Crédito' : 'Transferencia'}</p>
              {esPrecompra && ordenData?.items[0]?.fechaLanzamiento && (
                <p><strong>Fecha de lanzamiento:</strong> {formatearFecha(ordenData.items[0].fechaLanzamiento)}</p>
              )}
            </div>
            <div className="orden-acciones">
              <button 
                onClick={() => navigate(esPrecompra ? '/precompras' : '/')}
                className="btn-continuar-comprando"
              >
                {esPrecompra ? 'Ver Más Precompras' : 'Continuar Comprando'}
              </button>
              <button 
                onClick={() => window.print()}
                className="btn-imprimir"
              >
                🖨️ Imprimir Comprobante
              </button>
            </div>
            {esPrecompra && (
              <div className="precompra-alerta">
                <div className="alert alert-info">
                  <i className="bi bi-info-circle me-2"></i>
                  <strong>Recordatorio:</strong> Te enviaremos un email cuando el juego esté disponible para descarga.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-contenedor">
        <div className="checkout-header">
          <button 
            onClick={() => navigate(esPrecompra ? '/precompras' : -1)}
            className="btn-volver"
          >
            ← Volver {esPrecompra ? 'a Precompras' : ''}
          </button>
          <h1>
            {esPrecompra ? 'Confirmar Precompra' : 'Finalizar Compra'}
            {esPrecompra && <span className="badge-precompra">PREVENTA</span>}
          </h1>
        </div>

        {esPrecompra && (
          <div className="precompra-banner">
            <div className="precompra-info">
              <i className="bi bi-megaphone"></i>
              <div>
                <h4>Estás realizando una precompra</h4>
                <p>El juego se entregará en la fecha de lanzamiento especificada</p>
              </div>
            </div>
          </div>
        )}

        <div className="checkout-grid">
          {/* Columna izquierda - Formulario */}
          <div className="checkout-formulario">
            <form onSubmit={handleProcesarOrden}>
              {/* Información de Contacto */}
              <div className="form-section">
                <h3>📧 Información de Contacto</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>RUT *</label>
                    <input
                      type="text"
                      name="rut"
                      value={datosEnvio.rut}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('rut')}
                      style={getInputStyle('rut')}
                      placeholder="12.345.678-9"
                      required
                    />
                    {errores.rut && <span className="error-mensaje">{errores.rut}</span>}
                  </div>
                  <div className="form-group">
                    <label>Nombre Completo *</label>
                    <input
                      type="text"
                      name="nombre"
                      value={datosEnvio.nombre}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('nombre')}
                      style={getInputStyle('nombre')}
                      required
                    />
                    {errores.nombre && <span className="error-mensaje">{errores.nombre}</span>}
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={datosEnvio.email}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('email')}
                      style={getInputStyle('email')}
                      required
                    />
                    {errores.email && <span className="error-mensaje">{errores.email}</span>}
                  </div>
                  <div className="form-group">
                    <label>Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={datosEnvio.telefono}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('telefono')}
                      style={getInputStyle('telefono')}
                    />
                    {errores.telefono && <span className="error-mensaje">{errores.telefono}</span>}
                  </div>
                </div>
              </div>

              {/* Dirección de Envío */}
              <div className="form-section">
                <h3>🏠 Dirección de Envío</h3>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Dirección *</label>
                    <input
                      type="text"
                      name="direccion"
                      value={datosEnvio.direccion}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('direccion')}
                      style={getInputStyle('direccion')}
                      placeholder="Calle, número, departamento"
                      required
                    />
                    {errores.direccion && <span className="error-mensaje">{errores.direccion}</span>}
                  </div>
                  <div className="form-group">
                    <label>Región *</label>
                    <select
                      name="region"
                      value={datosEnvio.region}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('region')}
                      style={getInputStyle('region')}
                      required
                    >
                      <option value="">Selecciona región</option>
                      <option value="rm">Región Metropolitana</option>
                      <option value="v">Valparaíso</option>
                      <option value="viii">Biobío</option>
                      <option value="x">Los Lagos</option>
                    </select>
                    {errores.region && <span className="error-mensaje">{errores.region}</span>}
                  </div>
                  <div className="form-group">
                    <label>Comuna *</label>
                    <select
                      name="comuna"
                      value={datosEnvio.comuna}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('comuna')}
                      style={getInputStyle('comuna')}
                      required
                    >
                      <option value="">Selecciona comuna</option>
                      <option value="santiago">Santiago</option>
                      <option value="providencia">Providencia</option>
                      <option value="las-condes">Las Condes</option>
                      <option value="nunoa">Ñuñoa</option>
                      <option value="maipu">Maipú</option>
                      <option value="vinadelmar">Viña del Mar</option>
                      <option value="valparaiso">Valparaíso</option>
                      <option value="concepcion">Concepción</option>
                      <option value="puertomontt">Puerto Montt</option>
                    </select>
                    {errores.comuna && <span className="error-mensaje">{errores.comuna}</span>}
                  </div>
                  <div className="form-group">
                    <label>Ciudad *</label>
                    <input
                      type="text"
                      name="ciudad"
                      value={datosEnvio.ciudad}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('ciudad')}
                      style={getInputStyle('ciudad')}
                      required
                    />
                    {errores.ciudad && <span className="error-mensaje">{errores.ciudad}</span>}
                  </div>
                  <div className="form-group">
                    <label>Código Postal</label>
                    <input
                      type="text"
                      name="codigoPostal"
                      value={datosEnvio.codigoPostal}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('codigoPostal')}
                      style={getInputStyle('codigoPostal')}
                    />
                    {errores.codigoPostal && <span className="error-mensaje">{errores.codigoPostal}</span>}
                  </div>
                </div>
              </div>

              {/* Método de Pago */}
              <div className="form-section">
                <h3>💳 Método de Pago</h3>
                <div className="metodo-pago-opciones">
                  <label className="metodo-pago-option">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="tarjeta"
                      checked={datosEnvio.metodoPago === 'tarjeta'}
                      onChange={handleInputChange}
                    />
                    <span>💳 Tarjeta de Crédito/Débito</span>
                  </label>
                  <label className="metodo-pago-option">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="transferencia"
                      checked={datosEnvio.metodoPago === 'transferencia'}
                      onChange={handleInputChange}
                    />
                    <span>🏦 Transferencia Bancaria</span>
                  </label>
                </div>
                {errores.metodoPago && <span className="error-mensaje">{errores.metodoPago}</span>}

                {datosEnvio.metodoPago === 'tarjeta' && (
                  <div className="tarjeta-info">
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label>Número de Tarjeta *</label>
                        <input
                          type="text"
                          name="numeroTarjeta"
                          placeholder="1234 5678 9012 3456"
                          value={datosPago.numeroTarjeta}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('numeroTarjeta')}
                          style={getInputStyle('numeroTarjeta')}
                          required
                        />
                        {errores.numeroTarjeta && <span className="error-mensaje">{errores.numeroTarjeta}</span>}
                      </div>
                      <div className="form-group">
                        <label>Fecha Expiración *</label>
                        <input
                          type="text"
                          name="fechaExpiracion"
                          placeholder="MM/AA"
                          value={datosPago.fechaExpiracion}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('fechaExpiracion')}
                          style={getInputStyle('fechaExpiracion')}
                          required
                        />
                        {errores.fechaExpiracion && <span className="error-mensaje">{errores.fechaExpiracion}</span>}
                      </div>
                      <div className="form-group">
                        <label>CVV *</label>
                        <input
                          type="text"
                          name="cvv"
                          placeholder="123"
                          value={datosPago.cvv}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('cvv')}
                          style={getInputStyle('cvv')}
                          required
                        />
                        {errores.cvv && <span className="error-mensaje">{errores.cvv}</span>}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                className={`btn-procesar-pago ${esPrecompra ? 'btn-precompra' : ''}`}
                disabled={procesando}
              >
                {procesando ? (
                  <>
                    <i className="bi bi-arrow-repeat spinner-small"></i>
                    Procesando...
                  </>
                ) : (
                  <>
                    {esPrecompra ? '🎮 ' : ''}
                    {esPrecompra ? 'Confirmar Precompra' : 'Pagar'} {formatearPrecio(totalActual)}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Columna derecha - Resumen */}
          <div className="checkout-resumen">
            <div className="resumen-contenedor">
              <h3>
                {esPrecompra ? 'Resumen de Precompra' : 'Resumen del Pedido'}
                {esPrecompra && <span className="badge-preventa">PREVENTA</span>}
              </h3>
              
              <div className="resumen-items">
                {itemsActuales.map(item => (
                  <div key={item.id} className="resumen-item">
                    <div className="item-imagen">
                      <img src={item.imagen || item.image} alt={item.titulo || item.name} />
                      {esPrecompra && (
                        <div className="precompra-badge-item">
                          <i className="bi bi-clock"></i>
                        </div>
                      )}
                    </div>
                    <div className="item-info">
                      <h4>{item.titulo || item.name}</h4>
                      {esPrecompra && item.fechaLanzamiento && (
                        <p className="item-fecha-lanzamiento">
                          <i className="bi bi-calendar me-1"></i>
                          Lanzamiento: {formatearFecha(item.fechaLanzamiento)}
                        </p>
                      )}
                      <p className="item-precio">{formatearPrecio(item.precio || item.precioNumerico)}</p>
                      {!esPrecompra && (
                        <div className="item-cantidad">
                          <button 
                            onClick={() => disminuirCantidad(item.id)}
                            disabled={item.cantidad <= 1}
                          >
                            -
                          </button>
                          <span>{item.cantidad}</span>
                          <button onClick={() => aumentarCantidad(item.id)}>
                            +
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="item-total">
                      {formatearPrecio(item.precioTotal || item.precio || item.precioNumerico)}
                    </div>
                    <button 
                      onClick={() => eliminarItem(item.id)}
                      className="btn-eliminar"
                      title={esPrecompra ? 'Cancelar precompra' : 'Eliminar del carrito'}
                    >
                      {esPrecompra ? '❌' : '🗑️'}
                    </button>
                  </div>
                ))}
              </div>

              <div className="resumen-totales">
                <div className="total-line">
                  <span>Subtotal:</span>
                  <span>{formatearPrecio(totalActual)}</span>
                </div>
                <div className="total-line">
                  <span>Envío:</span>
                  <span>Gratis</span>
                </div>
                <div className="total-line total-final">
                  <span>Total:</span>
                  <span>{formatearPrecio(totalActual)}</span>
                </div>
              </div>

              <div className="resumen-seguridad">
                <p>🔒 Pago 100% seguro</p>
                {esPrecompra ? (
                  <p>🎁 Recibirás contenido adicional exclusivo</p>
                ) : (
                  <p>↩️ Te entregamos tu clave, de inmediato!.</p>
                )}
              </div>

              {esPrecompra && (
                <div className="precompra-beneficios">
                  <h5>Beneficios de tu precompra:</h5>
                  <ul>
                    <li>✅ Acceso anticipado 48 horas antes</li>
                    <li>✅ Contenido adicional exclusivo</li>
                    <li>✅ Precio especial de preventa</li>
                    <li>✅ Garantía de entrega día de lanzamiento</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
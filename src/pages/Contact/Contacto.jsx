import React, { useState } from 'react';
import './Contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const [estado, setEstado] = useState('idle'); // idle, enviando, exito, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEstado('enviando');

    // Simulación de envío
    setTimeout(() => {
      setEstado('exito');
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
      
      // Resetear mensaje de éxito después de 5 segundos
      setTimeout(() => setEstado('idle'), 5000);
    }, 2000);
  };

  return (
    <div className="contacto-page">
      <div className="contacto-container">
        
        {/* Cabecera */}
        <div className="contacto-header">
          <h1 className="contacto-title">Centro de Soporte</h1>
          <p className="contacto-subtitle">
            ¿Tienes problemas con una key? ¿Dudas sobre una precompra? Estamos aquí para ayudarte.
          </p>
        </div>

        <div className="contacto-grid">
          
          {/* Columna Izquierda: Info Directa */}
          <div className="info-column">
            
            <div className="info-card discord">
              <div className="info-icon">🎮</div>
              <div className="info-text">
                <h3>Comunidad Discord</h3>
                <p>Únete a nuestro servidor para soporte en tiempo real y noticias.</p>
                <a href="#" className="link-neon">Unirse al Server →</a>
              </div>
            </div>

            <div className="info-card email">
              <div className="info-icon">📧</div>
              <div className="info-text">
                <h3>Correo Electrónico</h3>
                <p>Para consultas comerciales o problemas de facturación.</p>
                <span className="info-data">soporte@gfg.cl</span>
              </div>
            </div>

            <div className="faq-preview">
              <h3>Preguntas Frecuentes</h3>
              <ul className="faq-list">
                <li>
                  <details>
                    <summary>¿Cuánto tarda en llegar mi key?</summary>
                    <p>Las entregas son automáticas e inmediatas tras confirmar el pago.</p>
                  </details>
                </li>
                <li>
                  <details>
                    <summary>¿Qué hago si la clave no funciona?</summary>
                    <p>Contáctanos inmediatamente con una captura del error en la plataforma (Steam/Epic).</p>
                  </details>
                </li>
                <li>
                  <details>
                    <summary>¿Tienen garantía de reembolso?</summary>
                    <p>Solo si la clave no ha sido revelada o si hay un error comprobable de región.</p>
                  </details>
                </li>
              </ul>
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="form-column">
            <div className="contact-form-wrapper">
              <h2>Envíanos un mensaje</h2>
              
              {estado === 'exito' ? (
                <div className="mensaje-exito">
                  <div className="check-icon">✅</div>
                  <h3>¡Mensaje Recibido!</h3>
                  <p>Un agente de soporte te contactará en breve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Tu Nombre</label>
                    <input 
                      type="text" 
                      name="nombre" 
                      value={formData.nombre} 
                      onChange={handleChange} 
                      placeholder="Ej: Player One"
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label>Correo Electrónico</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="nombre@ejemplo.com"
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label>Asunto</label>
                    <select 
                      name="asunto" 
                      value={formData.asunto} 
                      onChange={handleChange} 
                      required
                    >
                      <option value="">Selecciona un motivo...</option>
                      <option value="pedido">Problema con mi pedido</option>
                      <option value="stock">Consulta de Stock</option>
                      <option value="colaboracion">Colaboración / Partners</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Mensaje</label>
                    <textarea 
                      name="mensaje" 
                      value={formData.mensaje} 
                      onChange={handleChange} 
                      rows="5" 
                      placeholder="Describe tu situación detalladamente..."
                      required
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-enviar"
                    disabled={estado === 'enviando'}
                  >
                    {estado === 'enviando' ? 'Enviando...' : 'Enviar Mensaje'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contacto;
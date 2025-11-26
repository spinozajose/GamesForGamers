import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useValidacionesLogin } from '../../assets/js/ValidacionesLogin'; // Importamos tus validaciones
import './InicioSesion.css';

const InicioSesion = () => {
  const navigate = useNavigate();
  
  // Usamos tu hook personalizado
  const { validaciones, validarFormularioLogin, validarCredenciales } = useValidacionesLogin();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errores, setErrores] = useState({});
  const [procesando, setProcesando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Limpiar el error específico cuando el usuario escribe para mejorar la UX
    if (errores[name]) {
      setErrores({ ...errores, [name]: null });
    }
    // Limpiar error general de credenciales si existe
    if (errorGeneral) setErrorGeneral(null);
  };

  // Validar campo individual al perder el foco (onBlur)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    // Buscamos la función de validación correspondiente en tu objeto 'validaciones'
    const funcionValidar = validaciones[name]; 
    
    if (funcionValidar) {
      const error = funcionValidar(value);
      setErrores(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorGeneral(null);

    // 1. Validar todo el formulario con tu función
    const validacion = validarFormularioLogin(formData);

    if (!validacion.esValido) {
      setErrores(validacion.errores);
      return;
    }

    // 2. Si el formato es válido, simulamos la verificación de credenciales
    setProcesando(true);
    
    try {
      const resultado = await validarCredenciales(formData.email, formData.password);
      
      if (resultado.esValido) {
        // Login Exitoso
        navigate('/');
      } else {
        // Credenciales incorrectas (según tu simulación)
        setErrorGeneral(resultado.mensaje);
      }
    } catch (error) {
      setErrorGeneral("Error de conexión. Intente nuevamente.");
    } finally {
      setProcesando(false);
    }
  };

  // Helper para clases CSS
  const getInputClass = (campo) => {
    return errores[campo] ? 'input-error' : '';
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Bienvenido Jugador</h1>
            <p className="auth-subtitle">Ingresa tus credenciales para continuar</p>
          </div>

          {errorGeneral && (
            <div className="alert-error">
              ⚠️ {errorGeneral}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            
            {/* EMAIL */}
            <div className="form-group-neon">
              <label>Correo Electrónico</label>
              <div className="input-wrapper">
                <span className="input-icon"></span>
                <input 
                  type="email" 
                  name="email"
                  placeholder="usuario@ejemplo.com" 
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('email')}
                  disabled={procesando}
                />
              </div>
              {errores.email && <span className="error-msg">{errores.email}</span>}
            </div>

            {/* PASSWORD */}
            <div className="form-group-neon">
              <label>Contraseña</label>
              <div className="input-wrapper">
                <span className="input-icon"></span>
                <input 
                  type="password" 
                  name="password"
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('password')}
                  disabled={procesando}
                />
              </div>
              {errores.password && <span className="error-msg">{errores.password}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" disabled={procesando} />
                <span className="checkmark"></span>
                Recordarme
              </label>
              <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="btn-auth" disabled={procesando}>
              {procesando ? (
                <>
                  <span className="spinner-small"></span> Verificando...
                </>
              ) : (
                <>
                  INICIAR SESIÓN
                  <span className="btn-glitch"></span>
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>¿No tienes cuenta? <Link to="/register" className="register-link">Regístrate aquí</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;
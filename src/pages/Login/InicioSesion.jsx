import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useValidacionesLogin } from '../../assets/js/ValidacionesLogin';
import clienteAxios from '../../config/axios'; // <--- IMPORTANTE: Conexión con Backend
import './InicioSesion.css';

const InicioSesion = () => {
  const navigate = useNavigate();
  
  // Usamos tu hook solo para validaciones de formato (frontend)
  const { validaciones, validarFormularioLogin } = useValidacionesLogin();

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

    // Limpiar errores visuales al escribir
    if (errores[name]) {
      setErrores({ ...errores, [name]: null });
    }
    if (errorGeneral) setErrorGeneral(null);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const funcionValidar = validaciones[name]; 
    
    if (funcionValidar) {
      const error = funcionValidar(value);
      setErrores(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorGeneral(null);

    // 1. Validar formato antes de enviar nada
    const validacion = validarFormularioLogin(formData);

    if (!validacion.esValido) {
      setErrores(validacion.errores);
      return;
    }

    setProcesando(true);
    
    try {
      // 2. PETICIÓN REAL AL BACKEND
      // Enviamos las credenciales al endpoint que acabas de crear en Java
      const respuesta = await clienteAxios.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // 3. SI ES EXITOSO (Status 200)
      const { username, esAdmin, idUsuario } = respuesta.data;

      // Guardamos la sesión en LocalStorage para saber que está logueado
      localStorage.setItem('usuario', JSON.stringify({ username, esAdmin, idUsuario }));
      
      // Feedback visual y redirección
      // Puedes quitar el alert si prefieres algo más sutil
      alert(`¡Bienvenido de nuevo, ${username}!`); 
      navigate('/'); // Redirigir al Home

    } catch (error) {
      console.error("Error en login:", error);
      
      // 4. MANEJO DE ERRORES REALES
      if (error.response && error.response.status === 401) {
        // Backend respondió "Credenciales inválidas"
        setErrorGeneral("Correo o contraseña incorrectos.");
      } else {
        setErrorGeneral("Error de conexión con el servidor. Intenta más tarde.");
      }
    } finally {
      setProcesando(false);
    }
  };

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
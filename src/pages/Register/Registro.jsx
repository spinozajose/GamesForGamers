import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useValidacionesRegister } from '../../assets/js/ValidacionesRegister';
import './Registro.css';

const Registro = () => {
  const navigate = useNavigate();
  
  // Hook con tus validaciones
  const { validaciones, validarFormularioCompleto, formatearRUT } = useValidacionesRegister();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    rut: '',
    direccion: '',
    ciudad: '',
    region: '',
    comuna: '',
    aceptaTerminos: false
  });

  const [errores, setErrores] = useState({});
  const [procesando, setProcesando] = useState(false);

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let valorFinal = type === 'checkbox' ? checked : value;

    // Si es RUT, aplicamos formato automático
    if (name === 'rut') {
      valorFinal = formatearRUT(value);
    }

    setFormData({ ...formData, [name]: valorFinal });

    // Limpiar error al escribir
    if (errores[name]) {
      setErrores({ ...errores, [name]: null });
    }
  };

  // Validar al perder el foco
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const funcionValidar = validaciones[name];

    if (funcionValidar) {
      // Pasamos 'value' y 'formData' porque confirmPassword necesita ambos
      const error = funcionValidar(value, formData);
      setErrores(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar todo el formulario antes de enviar
    const validacion = validarFormularioCompleto(formData);

    if (!validacion.esValido) {
      setErrores(validacion.errores);
      // Scroll al primer error (opcional)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!formData.aceptaTerminos) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    setProcesando(true);

    // Simulación de envío al Backend
    setTimeout(() => {
      console.log('Datos Registro:', formData);
      setProcesando(false);
      navigate('/login');
    }, 2000);
  };

  // Helper para clases CSS de error
  const getInputClass = (campo) => errores[campo] ? 'input-error' : '';

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1 className="register-title">Crear Cuenta</h1>
            <p className="register-subtitle">Únete a GFG y empieza tu aventura</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form" noValidate>
            
            <div className="form-grid-layout">
              {/* === COLUMNA 1: CUENTA === */}
              <div className="form-column">
                <h3 className="section-title">Datos de Cuenta</h3>
                
                <div className="form-group-neon">
                  <label>Usuario</label>
                  <input 
                    type="text" name="username" placeholder="GamerPro123"
                    value={formData.username} onChange={handleChange} onBlur={handleBlur}
                    className={getInputClass('username')}
                  />
                  {errores.username && <span className="error-msg">{errores.username}</span>}
                </div>

                <div className="form-group-neon">
                  <label>Email</label>
                  <input 
                    type="email" name="email" placeholder="correo@ejemplo.com"
                    value={formData.email} onChange={handleChange} onBlur={handleBlur}
                    className={getInputClass('email')}
                  />
                  {errores.email && <span className="error-msg">{errores.email}</span>}
                </div>

                <div className="form-group-neon">
                  <label>Contraseña</label>
                  <input 
                    type="password" name="password" placeholder="Mínimo 6 caracteres"
                    value={formData.password} onChange={handleChange} onBlur={handleBlur}
                    className={getInputClass('password')}
                  />
                  {errores.password && <span className="error-msg">{errores.password}</span>}
                </div>

                <div className="form-group-neon">
                  <label>Confirmar Contraseña</label>
                  <input 
                    type="password" name="confirmPassword" placeholder="Repite la contraseña"
                    value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlur}
                    className={getInputClass('confirmPassword')}
                  />
                  {errores.confirmPassword && <span className="error-msg">{errores.confirmPassword}</span>}
                </div>
              </div>

              {/* === COLUMNA 2: PERSONALES === */}
              <div className="form-column">
                <h3 className="section-title">Datos Personales</h3>

                <div className="form-group-neon">
                  <label>Nombre Completo</label>
                  <input 
                    type="text" name="nombre" placeholder="Juan Pérez"
                    value={formData.nombre} onChange={handleChange} onBlur={handleBlur}
                    className={getInputClass('nombre')}
                  />
                  {errores.nombre && <span className="error-msg">{errores.nombre}</span>}
                </div>

                <div className="form-group-neon">
                  <label>RUT</label>
                  <input 
                    type="text" name="rut" placeholder="12.345.678-9"
                    value={formData.rut} onChange={handleChange} onBlur={handleBlur}
                    className={getInputClass('rut')}
                    maxLength={12}
                  />
                  {errores.rut && <span className="error-msg">{errores.rut}</span>}
                </div>

                <div className="form-group-neon">
                  <label>Dirección</label>
                  <input 
                    type="text" name="direccion" placeholder="Calle Falsa 123"
                    value={formData.direccion} onChange={handleChange} onBlur={handleBlur}
                    className={getInputClass('direccion')}
                  />
                  {errores.direccion && <span className="error-msg">{errores.direccion}</span>}
                </div>

                <div className="row-2-col">
                    <div className="form-group-neon">
                        <label>Ciudad</label>
                        <input 
                            type="text" name="ciudad"
                            value={formData.ciudad} onChange={handleChange} onBlur={handleBlur}
                            className={getInputClass('ciudad')}
                        />
                        {errores.ciudad && <span className="error-msg">{errores.ciudad}</span>}
                    </div>
                    
                    {/* Selects Simplificados para demo (se pueden llenar con API) */}
                    <div className="form-group-neon">
                        <label>Región</label>
                        <select 
                            name="region" value={formData.region} 
                            onChange={handleChange} onBlur={handleBlur}
                            className={getInputClass('region')}
                        >
                            <option value="">Elegir...</option>
                            <option value="rm">RM</option>
                            <option value="valpo">Valparaíso</option>
                            <option value="biobio">Biobío</option>
                        </select>
                        {errores.region && <span className="error-msg">{errores.region}</span>}
                    </div>
                </div>

                <div className="form-group-neon">
                    <label>Comuna</label>
                    <select 
                        name="comuna" value={formData.comuna} 
                        onChange={handleChange} onBlur={handleBlur}
                        className={getInputClass('comuna')}
                    >
                        <option value="">Elegir...</option>
                        <option value="stgo">Santiago</option>
                        <option value="provi">Providencia</option>
                        <option value="florida">La Florida</option>
                    </select>
                    {errores.comuna && <span className="error-msg">{errores.comuna}</span>}
                </div>

              </div>
            </div>

            <div className="form-footer">
              <label className="checkbox-neon">
                <input 
                  type="checkbox" name="aceptaTerminos"
                  checked={formData.aceptaTerminos} onChange={handleChange}
                />
                <span className="checkmark"></span>
                Acepto los Términos y Condiciones
              </label>

              <button type="submit" className="btn-register" disabled={procesando}>
                {procesando ? 'Creando Cuenta...' : 'REGISTRARSE'}
              </button>
            </div>

          </form>

          <div className="register-footer-link">
            <p>¿Ya tienes cuenta? <Link to="/login" className="login-link">Inicia sesión</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
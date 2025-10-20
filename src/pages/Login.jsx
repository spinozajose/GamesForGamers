import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useValidacionesLogin } from "../assets/js/ValidacionesLogin.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Usar el hook de validaciones
  const { validaciones, validarFormularioLogin, validarCredenciales } = useValidacionesLogin();

  // Manejar cambios en los inputs
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpiar error general al escribir
    if (loginError) {
      setLoginError("");
    }

    // Validar en tiempo real solo si el campo ya fue tocado
    if (touched[field]) {
      const error = validaciones[field](value);
      setErrors(prev => ({
        ...prev,
        [field]: error
      }));
    }
  };

  // Manejar blur (cuando el usuario sale del campo)
  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    const error = validaciones[field](formData[field]);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  // Validar todo el formulario
  const validateForm = () => {
    const { esValido, errores } = validarFormularioLogin(formData);
    
    // Marcar todos los campos como tocados
    const newTouched = {};
    Object.keys(formData).forEach(field => {
      newTouched[field] = true;
    });
    
    setTouched(newTouched);
    setErrors(errores);
    
    return esValido;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // Validar credenciales con el backend (simulado)
        const { esValido, mensaje } = await validarCredenciales(formData.email, formData.password);
        
        if (esValido) {
          // Login exitoso
          console.log("Login exitoso:", formData);
          alert("¡Bienvenido!");
          
          // Aquí rediriges al usuario o manejas el login exitoso
          // Ejemplo: 
          // localStorage.setItem('token', 'tu-token-aqui');
          // navigate('/dashboard');
          
          // Resetear formulario después de éxito
          setFormData({
            email: "",
            password: ""
          });
          setErrors({});
          setTouched({});
        } else {
          setLoginError(mensaje || "Credenciales incorrectas");
        }
      } catch (error) {
        setLoginError("Error de conexión. Intenta nuevamente.");
        console.error("Error en login:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Errores en el formulario:", errors);
    }
  };

  // Función para obtener estilo del input basado en errores
  const getInputStyle = (field, baseColor = "0,255,255") => {
    if (touched[field] && errors[field]) {
      return { 
        boxShadow: "0 0 10px rgba(255,0,0,0.5)", 
        border: "1px solid rgba(255,0,0,0.3)" 
      };
    }
    if (touched[field] && !errors[field] && formData[field]) {
      return { 
        boxShadow: "0 0 10px rgba(0,255,0,0.3)", 
        border: "1px solid rgba(0,255,0,0.3)" 
      };
    }
    return { boxShadow: `0 0 10px rgba(${baseColor},0.2)` };
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="card p-4 shadow-lg"
        style={{
          width: "380px",
          background: "rgba(15, 12, 41, 0.85)",
          borderRadius: "1rem",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 0 20px rgba(255, 0, 128, 0.4)",
        }}
      >
        <motion.h2
          className="text-center mb-4 fw-bold"
          style={{
            background: "linear-gradient(90deg, rgb(var(--rgb-primary)), rgb(var(--rgb-secondary)))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Iniciar Sesión
        </motion.h2>

        {/* Mensaje de error general */}
        {loginError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="alert alert-danger d-flex align-items-center"
            role="alert"
          >
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <div>{loginError}</div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-light">Correo electrónico</label>
            <input
              type="email"
              className="form-control bg-dark text-light border-0"
              placeholder="tucorreo@ejemplo.com"
              style={getInputStyle('email')}
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              disabled={isLoading}
            />
            {touched.email && errors.email && (
              <div className="text-warning small mt-1">{errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Contraseña</label>
            <input
              type="password"
              className="form-control bg-dark text-light border-0"
              placeholder="********"
              style={getInputStyle('password', "255,0,128")}
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              disabled={isLoading}
            />
            {touched.password && errors.password && (
              <div className="text-warning small mt-1">{errors.password}</div>
            )}
          </div>

          {/* Enlace de "Olvidé mi contraseña" (opcional) */}
          <div className="mb-3 text-end">
            <Link
              to="/forgot-password"
              style={{
                color: "rgb(var(--rgb-accent))",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <motion.button
            type="submit"
            whileHover={!isLoading ? { 
              scale: 1.05, 
              boxShadow: "0 0 15px rgba(255,255,0,0.7)" 
            } : {}}
            whileTap={!isLoading ? { scale: 0.95 } : {}}
            className="btn w-100 fw-bold mt-3"
            style={{
              background: isLoading 
                ? "rgba(128, 128, 128, 0.5)" 
                : "linear-gradient(90deg, rgb(var(--rgb-primary)), rgb(var(--rgb-secondary)))",
              color: "#fff",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer"
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="d-flex align-items-center justify-content-center">
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                Verificando...
              </div>
            ) : (
              "Entrar"
            )}
          </motion.button>

          <div className="text-center mt-3">
            <small className="text-light">
              ¿No tienes cuenta?{" "}
              <Link
                to="/register"
                style={{
                  color: "rgb(var(--rgb-accent))",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Regístrate aquí
              </Link>
            </small>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
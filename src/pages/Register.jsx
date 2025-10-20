import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  useValidacionesRegister, 
  formatearRUT 
} from "../assets/js/ValidacionesRegister.js";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    rut: "",
    username: "",
    email: "",
    direccion: "",
    region: "",
    ciudad: "",
    comuna: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Usar el hook de validaciones
  const { validaciones, validarFormularioCompleto } = useValidacionesRegister();

  // Manejar cambios en los inputs
  const handleChange = (field, value) => {
    let valorFinal = value;

    // Formatear RUT automáticamente
    if (field === 'rut') {
      valorFinal = formatearRUT(value);
    }

    setFormData(prev => ({
      ...prev,
      [field]: valorFinal
    }));

    // Validar en tiempo real solo si el campo ya fue tocado
    if (touched[field]) {
      const error = validaciones[field](valorFinal, formData);
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

    const error = validaciones[field](formData[field], formData);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  // Validar todo el formulario
  const validateForm = () => {
    const { esValido, errores } = validarFormularioCompleto(formData);
    
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
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Aquí envías los datos al backend
      console.log("Formulario válido:", formData);
      alert("¡Registro exitoso!");
      // Tu lógica de envío al backend aquí
      
      // Resetear formulario después de éxito
      setFormData({
        nombre: "",
        rut: "",
        username: "",
        email: "",
        direccion: "",
        region: "",
        ciudad: "",
        comuna: "",
        password: "",
        confirmPassword: ""
      });
      setErrors({});
      setTouched({});
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
          width: "450px",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "rgba(15, 12, 41, 0.85)",
          borderRadius: "1rem",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 0 25px rgba(0,255,255,0.4)",
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
          Crear Cuenta
        </motion.h2>

        <form onSubmit={handleSubmit}>
          {/* Información Personal */}
          <div className="mb-3">
            <label className="form-label text-light">Nombre completo *</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-0"
              placeholder="Tu nombre completo"
              style={getInputStyle('nombre', "255,255,0")}
              value={formData.nombre}
              onChange={(e) => handleChange('nombre', e.target.value)}
              onBlur={() => handleBlur('nombre')}
              required
            />
            {touched.nombre && errors.nombre && (
              <div className="text-warning small mt-1">{errors.nombre}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label text-light">RUT *</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-0"
              placeholder="12.345.678-9"
              style={getInputStyle('rut')}
              value={formData.rut}
              onChange={(e) => handleChange('rut', e.target.value)}
              onBlur={() => handleBlur('rut')}
              required
            />
            {touched.rut && errors.rut && (
              <div className="text-warning small mt-1">{errors.rut}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Nombre de usuario *</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-0"
              placeholder="Tu nombre o alias"
              style={getInputStyle('username', "255,255,0")}
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              onBlur={() => handleBlur('username')}
              required
            />
            {touched.username && errors.username && (
              <div className="text-warning small mt-1">{errors.username}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Correo electrónico *</label>
            <input
              type="email"
              className="form-control bg-dark text-light border-0"
              placeholder="tucorreo@ejemplo.com"
              style={getInputStyle('email')}
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              required
            />
            {touched.email && errors.email && (
              <div className="text-warning small mt-1">{errors.email}</div>
            )}
          </div>

          {/* Información de Dirección */}
          <div className="mb-3">
            <label className="form-label text-light">Dirección *</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-0"
              placeholder="Calle, número, departamento"
              style={getInputStyle('direccion', "255,0,128")}
              value={formData.direccion}
              onChange={(e) => handleChange('direccion', e.target.value)}
              onBlur={() => handleBlur('direccion')}
              required
            />
            {touched.direccion && errors.direccion && (
              <div className="text-warning small mt-1">{errors.direccion}</div>
            )}
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label text-light">Región *</label>
              <select 
                className="form-control bg-dark text-light border-0"
                style={getInputStyle('region', "255,255,0")}
                value={formData.region}
                onChange={(e) => handleChange('region', e.target.value)}
                onBlur={() => handleBlur('region')}
                required
              >
                <option value="">Selecciona región</option>
                <option value="rm">Región Metropolitana</option>
                <option value="v">Valparaíso</option>
                <option value="viii">Biobío</option>
                <option value="x">Los Lagos</option>
                {/* Agrega más regiones según necesites */}
              </select>
              {touched.region && errors.region && (
                <div className="text-warning small mt-1">{errors.region}</div>
              )}
            </div>
            
            <div className="col-md-6 mb-3">
              <label className="form-label text-light">Ciudad *</label>
              <input
                type="text"
                className="form-control bg-dark text-light border-0"
                placeholder="Tu ciudad"
                style={getInputStyle('ciudad')}
                value={formData.ciudad}
                onChange={(e) => handleChange('ciudad', e.target.value)}
                onBlur={() => handleBlur('ciudad')}
                required
              />
              {touched.ciudad && errors.ciudad && (
                <div className="text-warning small mt-1">{errors.ciudad}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Comuna *</label>
            <select 
              className="form-control bg-dark text-light border-0"
              style={getInputStyle('comuna', "255,0,128")}
              value={formData.comuna}
              onChange={(e) => handleChange('comuna', e.target.value)}
              onBlur={() => handleBlur('comuna')}
              required
            >
              <option value="">Selecciona comuna</option>
              <option value="santiago">Santiago</option>
              <option value="providencia">Providencia</option>
              <option value="las-condes">Las Condes</option>
              <option value="nunoa">Ñuñoa</option>
              <option value="maipu">Maipú</option>
              {/* Agrega más comunas según necesites */}
            </select>
            {touched.comuna && errors.comuna && (
              <div className="text-warning small mt-1">{errors.comuna}</div>
            )}
          </div>

          {/* Contraseñas */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label text-light">Contraseña *</label>
              <input
                type="password"
                className="form-control bg-dark text-light border-0"
                placeholder="********"
                style={getInputStyle('password', "255,0,128")}
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                onBlur={() => handleBlur('password')}
                required
              />
              {touched.password && errors.password && (
                <div className="text-warning small mt-1">{errors.password}</div>
              )}
            </div>

            <div className="col-md-6 mb-4">
              <label className="form-label text-light">Confirmar contraseña *</label>
              <input
                type="password"
                className="form-control bg-dark text-light border-0"
                placeholder="********"
                style={getInputStyle('confirmPassword', "255,255,0")}
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                onBlur={() => handleBlur('confirmPassword')}
                required
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <div className="text-warning small mt-1">{errors.confirmPassword}</div>
              )}
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,0,128,0.8)" }}
            whileTap={{ scale: 0.95 }}
            className="btn w-100 fw-bold mt-2"
            style={{
              background: "linear-gradient(90deg, rgb(var(--rgb-primary)), rgb(var(--rgb-secondary)))",
              color: "#fff",
              border: "none",
            }}
          >
            Registrarse
          </motion.button>

          <div className="text-center mt-3">
            <small className="text-light">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                style={{
                  color: "rgb(var(--rgb-accent))",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Inicia sesión
              </Link>
            </small>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Register;
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useValidacionesRegister, formatearRUT } from "../assets/js/ValidacionesRegister.js";
import "bootstrap/dist/css/bootstrap.min.css";

function Register({ onRegister }) {
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

  const { validaciones, validarFormularioCompleto } = useValidacionesRegister();

  const handleChange = (field, value) => {
    let valorFinal = field === "rut" ? formatearRUT(value) : value;
    setFormData(prev => ({ ...prev, [field]: valorFinal }));

    if (touched[field]) {
      setErrors(prev => ({ ...prev, [field]: validaciones[field](valorFinal, formData) }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: validaciones[field](formData[field], formData) }));
  };

  const validateForm = () => {
    const { esValido, errores } = validarFormularioCompleto(formData);
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);
    setErrors(errores);
    return esValido;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (onRegister) {
        onRegister(formData);
      } else {
        console.log("Formulario válido:", formData);
      }
      setFormData({
        nombre: "", rut: "", username: "", email: "",
        direccion: "", region: "", ciudad: "", comuna: "",
        password: "", confirmPassword: ""
      });
      setErrors({});
      setTouched({});
    }
  };

  const getInputStyle = (field, baseColor = "0,255,255") => {
    if (touched[field] && errors[field]) return { boxShadow: "0 0 10px rgba(255,0,0,0.5)", border: "1px solid rgba(255,0,0,0.3)" };
    if (touched[field] && !errors[field] && formData[field]) return { boxShadow: "0 0 10px rgba(0,255,0,0.3)", border: "1px solid rgba(0,255,0,0.3)" };
    return { boxShadow: `0 0 10px rgba(${baseColor},0.2)` };
  };

  const renderInput = (label, field, type = "text", placeholder = "", color) => (
    <div className="mb-3">
      <label htmlFor={field} className="form-label text-light">{label} *</label>
      <input
        id={field}
        name={field}
        type={type}
        className="form-control bg-dark text-light border-0"
        placeholder={placeholder}
        style={getInputStyle(field, color)}
        value={formData[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        onBlur={() => handleBlur(field)}
        required
      />
      {touched[field] && errors[field] && <div className="text-warning small mt-1">{errors[field]}</div>}
    </div>
  );

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="card p-4 shadow-lg"
        style={{
          width: "450px", maxHeight: "90vh", overflowY: "auto",
          background: "rgba(15, 12, 41, 0.85)", borderRadius: "1rem",
          border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)",
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
          {renderInput("Nombre completo", "nombre", "text", "Tu nombre completo", "255,255,0")}
          {renderInput("RUT", "rut", "text", "12.345.678-9")}
          {renderInput("Nombre de usuario", "username", "text", "Tu nombre o alias", "255,255,0")}
          {renderInput("Correo electrónico", "email", "email", "tucorreo@ejemplo.com")}
          {renderInput("Dirección", "direccion", "text", "Calle, número, departamento", "255,0,128")}

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="region" className="form-label text-light">Región *</label>
              <select
                id="region"
                name="region"
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
              </select>
              {touched.region && errors.region && <div className="text-warning small mt-1">{errors.region}</div>}
            </div>

            <div className="col-md-6 mb-3">
              {renderInput("Ciudad", "ciudad", "text", "Tu ciudad")}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="comuna" className="form-label text-light">Comuna *</label>
            <select
              id="comuna"
              name="comuna"
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
            </select>
            {touched.comuna && errors.comuna && <div className="text-warning small mt-1">{errors.comuna}</div>}
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              {renderInput("Contraseña", "password", "password", "********", "255,0,128")}
            </div>
            <div className="col-md-6 mb-4">
              {renderInput("Confirmar contraseña", "confirmPassword", "password", "********", "255,255,0")}
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,0,128,0.8)" }}
            whileTap={{ scale: 0.95 }}
            className="btn w-100 fw-bold mt-2"
            style={{
              background: "linear-gradient(90deg, rgb(var(--rgb-primary)), rgb(var(--rgb-secondary)))",
              color: "#fff", border: "none",
            }}
          >
            Registrarse
          </motion.button>

          <div className="text-center mt-3">
            <small className="text-light">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                style={{ color: "rgb(var(--rgb-accent))", textDecoration: "none", fontWeight: "bold" }}
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
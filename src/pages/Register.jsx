import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
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

        <form>
          {/* Información Personal */}
          <div className="mb-3">
            <label className="form-label text-light">Nombre completo *</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-0"
              placeholder="Tu nombre completo"
              style={{ boxShadow: "0 0 10px rgba(255,255,0,0.2)" }}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">RUT *</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-0"
              placeholder="12.345.678-9"
              style={{ boxShadow: "0 0 10px rgba(0,255,255,0.2)" }}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Nombre de usuario *</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-0"
              placeholder="Tu nombre o alias"
              style={{ boxShadow: "0 0 10px rgba(255,255,0,0.2)" }}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Correo electrónico *</label>
            <input
              type="email"
              className="form-control bg-dark text-light border-0"
              placeholder="tucorreo@ejemplo.com"
              style={{ boxShadow: "0 0 10px rgba(0,255,255,0.2)" }}
              required
            />
          </div>

          {/* Información de Dirección */}
          <div className="mb-3">
            <label className="form-label text-light">Dirección *</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-0"
              placeholder="Calle, número, departamento"
              style={{ boxShadow: "0 0 10px rgba(255,0,128,0.2)" }}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label text-light">Región *</label>
              <select 
                className="form-control bg-dark text-light border-0"
                style={{ boxShadow: "0 0 10px rgba(255,255,0,0.2)" }}
                required
              >
                <option value="">Selecciona región</option>
                <option value="rm">Región Metropolitana</option>
                <option value="v">Valparaíso</option>
                <option value="viii">Biobío</option>
                <option value="x">Los Lagos</option>
                {/* Agrega más regiones según necesites */}
              </select>
            </div>
            
            <div className="col-md-6 mb-3">
              <label className="form-label text-light">Ciudad *</label>
              <input
                type="text"
                className="form-control bg-dark text-light border-0"
                placeholder="Tu ciudad"
                style={{ boxShadow: "0 0 10px rgba(0,255,255,0.2)" }}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Comuna *</label>
            <select 
              className="form-control bg-dark text-light border-0"
              style={{ boxShadow: "0 0 10px rgba(255,0,128,0.2)" }}
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
          </div>

          {/* Contraseñas */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label text-light">Contraseña *</label>
              <input
                type="password"
                className="form-control bg-dark text-light border-0"
                placeholder="********"
                style={{ boxShadow: "0 0 10px rgba(255,0,128,0.2)" }}
                required
              />
            </div>

            <div className="col-md-6 mb-4">
              <label className="form-label text-light">Confirmar contraseña *</label>
              <input
                type="password"
                className="form-control bg-dark text-light border-0"
                placeholder="********"
                style={{ boxShadow: "0 0 10px rgba(255,255,0,0.2)" }}
                required
              />
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
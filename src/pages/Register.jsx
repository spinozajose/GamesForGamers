import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="card p-4 shadow-lg"
        style={{
          width: "420px",
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
          <div className="mb-3">
            <label className="form-label text-light">Nombre de usuario</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-0"
              placeholder="Tu nombre o alias"
              style={{ boxShadow: "0 0 10px rgba(255,255,0,0.2)" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Correo electrónico</label>
            <input
              type="email"
              className="form-control bg-dark text-light border-0"
              placeholder="tucorreo@ejemplo.com"
              style={{ boxShadow: "0 0 10px rgba(0,255,255,0.2)" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Contraseña</label>
            <input
              type="password"
              className="form-control bg-dark text-light border-0"
              placeholder="********"
              style={{ boxShadow: "0 0 10px rgba(255,0,128,0.2)" }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-light">Confirmar contraseña</label>
            <input
              type="password"
              className="form-control bg-dark text-light border-0"
              placeholder="********"
              style={{ boxShadow: "0 0 10px rgba(255,255,0,0.2)" }}
            />
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

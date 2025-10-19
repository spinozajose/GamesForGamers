import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-neon text-white py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center">

          {/* 🔗 Enlaces de navegación (Izquierda) */}
          <div className="col-md-6 text-md-start text-center mb-3 mb-md-0">
            <motion.ul
              className="list-inline mb-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <li className="list-inline-item mx-2">
                <Link to="/" className="footer-link">Inicio</Link>
              </li>
              <li className="list-inline-item mx-2">
                <Link to="/contact" className="footer-link">Contacto</Link>
              </li>
              <li className="list-inline-item mx-2">
                <Link to="/register" className="footer-link">Registro</Link>
              </li>
              <li className="list-inline-item mx-2">
                <Link to="/login" className="footer-link">Login</Link>
              </li>
            </motion.ul>

            <motion.p
              className="mb-0 small"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              © 2025 <span className="text-gradient">GamesForGamers</span>. Todos los derechos reservados.
            </motion.p>
          </div>

          {/* 👥 Quiénes Somos (Derecha) */}
          <div className="col-md-6 text-md-end text-center">
            <motion.div
              className="about-footer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h5 className="text-gradient mb-2">Quiénes Somos</h5>
              <p className="small text-light mb-0">
                En <strong>GamesForGamers</strong>, vivimos y respiramos videojuegos.  
                Nuestro objetivo es conectar jugadores, ofrecer experiencias únicas  
                y mantener viva la pasión por el gaming en todas sus formas.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;

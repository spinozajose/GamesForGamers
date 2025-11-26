import React from 'react';
import { Link } from 'react-router-dom';
import './Piedepagina.css';

const Piedepagina = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-neon">
      <div className="footer-container">
        
        {/* Sección Superior: Grid de Contenido */}
        <div className="footer-content">
          
          {/* Columna 1: Marca */}
          <div className="footer-brand">
            <h2 className="text-gradient">GFG</h2>
            <p className="about-text">
              Tu destino definitivo para claves digitales, ofertas y lanzamientos. 
              Jugamos contigo.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div className="footer-links">
            <h4>Explorar</h4>
            <ul className="links-list">
              <li><Link to="/catalogo" className="footer-link">Catálogo</Link></li>
              <li><Link to="/ofertas" className="footer-link">Ofertas Flash</Link></li>
              <li><Link to="/precompras" className="footer-link">Próximos Lanzamientos</Link></li>
            </ul>
          </div>

          {/* Columna 3: Soporte */}
          <div className="footer-links">
            <h4>Soporte</h4>
            <ul className="links-list">
              <li><Link to="/contact" className="footer-link">Centro de Ayuda</Link></li>
              <li><Link to="/login" className="footer-link">Mi Cuenta</Link></li>
              <li><Link to="/register" className="footer-link">Registrarse</Link></li>
            </ul>
          </div>

          {/* Columna 4: Redes (Simuladas) */}
          <div className="footer-social">
            <h4>Síguenos</h4>
            <div className="social-icons">
              <span className="social-icon">Discord</span>
              <span className="social-icon">Twitter</span>
              <span className="social-icon">Instagram</span>
            </div>
          </div>

        </div>

        {/* Sección Inferior: Copyright */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} GamesForGamers. Todos los derechos reservados.</p>
        </div>

      </div>
    </footer>
  );
};

export default Piedepagina;
import { Link, NavLink } from 'react-router-dom';
import 'animate.css';

function Header() {
  return (
    <>
      {/* Barra de navegacion */}
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand animate__animated animate__bounce" to="/">GamesForGamers</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Inicio</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">Acerca</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">Contacto</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  </>
  );
}

export default Header;

import { Link, NavLink } from 'react-router-dom';
import 'animate.css';
import '../assets/css/header.css';

function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-neon px-3">
        <Link className="navbar-brand navbar-brand-neon animate__animated animate__bounce" to="/">
          🎮 GamesForGamers
        </Link>
        
        <button className="navbar-toggler nav-toggler-neon" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link nav-link-neon" to="/login">
                Iniciar Sesion
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-neon" to="/register">
                Registrate
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
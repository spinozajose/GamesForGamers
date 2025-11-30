import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCarrito } from '../../../context/CarritoContext';

// Estilos
import './Encabezado.css';
import '../../../pages/Checkout/Carrito.css';

function Header() {
  const { carrito, eliminarDelCarrito, actualizarCantidad, totalItems, totalPrecio } = useCarrito();
  const [showCart, setShowCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Estado para el usuario logueado
  const [usuario, setUsuario] = useState(null);
  const location = useLocation(); // Detecta cambios de ruta (login/logout)
  const navigate = useNavigate();

  // Verificar sesión cada vez que cambiamos de página
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    } else {
      setUsuario(null);
    }
  }, [location]);

  // Cerrar carrito cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCart && !event.target.closest('.cart-dropdown') && !event.target.closest('.cart-icon')) {
        setShowCart(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showCart]);

  const toggleCart = () => setShowCart(!showCart);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/');
  };

  const aumentarCantidad = (itemId) => {
    const item = carrito.find(item => item.id === itemId);
    if (item) actualizarCantidad(itemId, item.cantidad + 1);
  };

  const disminuirCantidad = (itemId) => {
    const item = carrito.find(item => item.id === itemId);
    if (item && item.cantidad > 1) actualizarCantidad(itemId, item.cantidad - 1);
  };

  const formatearPrecio = (precio) => `$${precio.toLocaleString('es-CL')}`;

  return (
    <>
      <header className="header">
        <div className="header-container">
          
          {/* LOGO */}
          <Link to="/" className="logo">
            <span style={{ marginRight: '8px', fontSize: '1.4rem' }}>🎮</span> 
            GFG
          </Link>
          
          {/* NAVEGACIÓN */}
          <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <NavLink to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Inicio
            </NavLink>
            <NavLink to="/catalogo" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Catálogo
            </NavLink>
            <NavLink to="/ofertas" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Ofertas
            </NavLink>
            <NavLink to="/precompras" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Precompras
            </NavLink>
          </nav>

          {/* ACCIONES */}
          <div className="header-actions">
            <button className="cart-icon" onClick={toggleCart}>
              <span className="cart-icon-symbol">🛒</span>
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </button>

            <div className="user-actions">
              {usuario ? (
                // MENÚ DE USUARIO LOGUEADO
                <>
                  <NavLink to="/mis-compras" className="user-link" onClick={() => setMobileMenuOpen(false)}>
                   Mis Compras
                  </NavLink>
                  <span className="separator">|</span>
                  <button 
                    onClick={handleLogout} 
                    className="user-link"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem' }}
                  >
                    Salir
                  </button>
                </>
              ) : (
                // MENÚ DE INVITADO
                <>
                  <NavLink to="/login" className="user-link" onClick={() => setMobileMenuOpen(false)}>
                    Ingresar
                  </NavLink>
                  <span className="separator">|</span>
                  <NavLink to="/register" className="user-link register" onClick={() => setMobileMenuOpen(false)}>
                    Registrarse
                  </NavLink>
                </>
              )}
            </div>
            
            <button className="menu-toggle" onClick={toggleMobileMenu}>
              <span className="menu-bar"></span>
              <span className="menu-bar"></span>
              <span className="menu-bar"></span>
            </button>
          </div>
        </div>
      </header>

      {/* DROPDOWN CARRITO */}
      {showCart && (
        <>
          <div className="cart-dropdown">
            <div className="cart-header">
              <h5>Tu Carrito</h5>
              <button className="close-cart" onClick={() => setShowCart(false)}>×</button>
            </div>

            <div className="cart-items">
              {carrito.length === 0 ? (
                <div className="empty-cart">
                  <p>Tu carrito está vacío</p>
                  <Link to="/catalogo" className="btn-continue" onClick={() => setShowCart(false)}>
                    Ver Juegos
                  </Link>
                </div>
              ) : (
                <>
                  {carrito.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="item-details">
                        <h6>{item.name}</h6>
                        <p className="item-price">{formatearPrecio(item.precioNumerico || 0)}</p>
                        
                        <div className="quantity-controls">
                          <button 
                            onClick={() => disminuirCantidad(item.id)} 
                            className="quantity-btn" 
                            disabled={item.cantidad <= 1}
                          >
                            -
                          </button>
                          <span className="quantity">{item.cantidad}</span>
                          <button 
                            onClick={() => aumentarCantidad(item.id)} 
                            className="quantity-btn"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={() => eliminarDelCarrito(item.id)} 
                        className="remove-btn" 
                        title="Eliminar"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>

            {carrito.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <strong>Total:</strong>
                  <strong>{formatearPrecio(totalPrecio)}</strong>
                </div>
                <div className="cart-actions">
                  <button className="btn-secondary" onClick={() => setShowCart(false)}>
                    Seguir Comprando
                  </button>
                  <Link to="/checkout" className="btn-primary" onClick={() => setShowCart(false)}>
                    Comprar
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <div className="cart-overlay" onClick={() => setShowCart(false)}></div>
        </>
      )}
    </>
  );
}

export default Header;
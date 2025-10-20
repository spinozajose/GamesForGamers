import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCarrito } from '../context/CarritoContext';
import 'animate.css';
import '../assets/css/header.css';

function Header() {
  const { carrito, eliminarDelCarrito, actualizarCantidad, totalItems } = useCarrito();
  const [showCart, setShowCart] = useState(false);

  // Cerrar carrito cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCart && !event.target.closest('.cart-dropdown') && !event.target.closest('.cart-icon-btn')) {
        setShowCart(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showCart]);

  // Calcular total del carrito
  const calcularTotal = () => {
    return carrito.reduce((total, item) => {
      return total + (item.precioTotal || 0);
    }, 0);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const aumentarCantidad = (itemId) => {
    const item = carrito.find(item => item.id === itemId);
    if (item) {
      actualizarCantidad(itemId, item.cantidad + 1);
    }
  };

  const disminuirCantidad = (itemId) => {
    const item = carrito.find(item => item.id === itemId);
    if (item && item.cantidad > 1) {
      actualizarCantidad(itemId, item.cantidad - 1);
    }
  };

  const formatearPrecio = (precio) => {
    return `$${precio.toLocaleString('es-CL')}`;
  };

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
            {/* Ícono del Carrito */}
            <li className="nav-item position-relative me-3">
              <button 
                className="nav-link nav-link-neon cart-icon-btn position-relative"
                onClick={toggleCart}
              >
                🛒
                {totalItems > 0 && (
                  <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </button>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link nav-link-neon" to="/login">
                Iniciar Sesión
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-neon" to="/register">
                Regístrate
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Dropdown del Carrito */}
      {showCart && (
        <div className="cart-dropdown">
          <div className="cart-header">
            <h5>🛒 Tu Carrito</h5>
            <button 
              className="close-cart"
              onClick={() => setShowCart(false)}
            >
              ×
            </button>
          </div>

          <div className="cart-items">
            {carrito.length === 0 ? (
              <div className="empty-cart text-center py-4">
                <p className="text-light mb-3">Tu carrito está vacío</p>
                <Link 
                  to="/" 
                  className="btn btn-primary"
                  onClick={() => setShowCart(false)}
                >
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
                      title="Eliminar del carrito"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>

          {carrito.length > 0 && (
            <div className="cart-footer">
              <div className="cart-total">
                <strong>Total: {formatearPrecio(calcularTotal())}</strong>
              </div>
              <div className="cart-actions">
                <button 
                  className="btn btn-view-cart"
                  onClick={() => setShowCart(false)}
                >
                  Seguir Comprando
                </button>
                <Link 
                  to="/checkout" 
                  className="btn btn-checkout"
                  onClick={() => setShowCart(false)}
                >
                  Finalizar Compra
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Overlay para cerrar el carrito */}
      {showCart && (
        <div 
          className="cart-overlay"
          onClick={() => setShowCart(false)}
        ></div>
      )}
    </>
  );
}

export default Header;
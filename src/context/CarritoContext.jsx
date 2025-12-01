import React, { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carritoGames');
    if (carritoGuardado) {
      try {
        setCarrito(JSON.parse(carritoGuardado));
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
        localStorage.removeItem('carritoGames');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('carritoGames', JSON.stringify(carrito));
  }, [carrito]);

  const extraerPrecioNumerico = (precio) => {
    if (!precio) return 0;
    if (typeof precio === 'number') return precio;
    const numero = precio.toString().replace(/[^0-9]/g, '');
    return parseInt(numero) || 0;
  };

  const agregarAlCarrito = (juego, cantidad = 1) => {
    const precioUnitario = extraerPrecioNumerico(juego.price);

    setCarrito(prevCarrito => {
      const juegoExistente = prevCarrito.find(item => item.id === juego.id);
      
      if (juegoExistente) {
        return prevCarrito.map(item =>
          item.id === juego.id
            ? { 
                ...item, 
                cantidad: item.cantidad + cantidad,
                precioTotal: item.precioNumerico * (item.cantidad + cantidad)
              }
            : item
        );
      } else {
        const nuevoJuego = {
          id: juego.id,
          name: juego.name,
          image: juego.image,
          price: juego.price,
          cantidad: cantidad,
          precioNumerico: precioUnitario,
          precioTotal: precioUnitario * cantidad
        };
        return [...prevCarrito, nuevoJuego];
      }
    });
  };

  const estaEnCarrito = (id) => {
    return carrito.some((producto) => producto.id === id);
  };

  const eliminarDelCarrito = (juegoId) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== juegoId));
  };

  const actualizarCantidad = (juegoId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    
    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === juegoId 
          ? { 
              ...item, 
              cantidad: nuevaCantidad,
              precioTotal: item.precioNumerico * nuevaCantidad
            } 
          : item
      )
    );
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  
  const totalPrecio = carrito.reduce((total, item) => {
    return total + (item.precioTotal || 0);
  }, 0);

  const value = {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    limpiarCarrito,
    estaEnCarrito,
    totalItems,
    totalPrecio
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};
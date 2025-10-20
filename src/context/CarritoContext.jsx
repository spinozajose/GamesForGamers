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

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carritoGames');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  // Guardar en localStorage cuando cambie el carrito
  useEffect(() => {
    localStorage.setItem('carritoGames', JSON.stringify(carrito));
  }, [carrito]);

  // Función para extraer precio numérico de strings como "$7.990"
  const extraerPrecioNumerico = (precioString) => {
    if (typeof precioString === 'number') return precioString;
    
    const numero = precioString.replace(/[^0-9]/g, '');
    return parseInt(numero) || 0;
  };

  const agregarAlCarrito = (juego, cantidad = 1) => {
    setCarrito(prevCarrito => {
      const juegoExistente = prevCarrito.find(item => item.id === juego.id);
      
      if (juegoExistente) {
        // Actualizar cantidad si ya existe
        return prevCarrito.map(item =>
          item.id === juego.id
            ? { 
                ...item, 
                cantidad: item.cantidad + cantidad,
                precioTotal: extraerPrecioNumerico(juego.originalPrice) * (item.cantidad + cantidad)
              }
            : item
        );
      } else {
        // Agregar nuevo juego al carrito
        const nuevoJuego = {
          ...juego,
          cantidad: cantidad,
          precioNumerico: extraerPrecioNumerico(juego.originalPrice),
          precioTotal: extraerPrecioNumerico(juego.originalPrice) * cantidad
        };
        return [...prevCarrito, nuevoJuego];
      }
    });
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

  const estaEnCarrito = (juegoId) => {
    return carrito.some(item => item.id === juegoId);
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
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
      try {
        setCarrito(JSON.parse(carritoGuardado));
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
        localStorage.removeItem('carritoGames');
      }
    }
  }, []);

  // Guardar en localStorage cuando cambie el carrito
  useEffect(() => {
    localStorage.setItem('carritoGames', JSON.stringify(carrito));
  }, [carrito]);

  // Función robusta para asegurar que siempre trabajamos con números
  const extraerPrecioNumerico = (precio) => {
    if (!precio) return 0;
    if (typeof precio === 'number') return precio;
    // Si es string "$10.000", quita todo lo que no sea número
    const numero = precio.toString().replace(/[^0-9]/g, '');
    return parseInt(numero) || 0;
  };

  const agregarAlCarrito = (juego, cantidad = 1) => {
    // Aseguramos el precio unitario desde el principio usando la propiedad 'price'
    const precioUnitario = extraerPrecioNumerico(juego.price);

    setCarrito(prevCarrito => {
      const juegoExistente = prevCarrito.find(item => item.id === juego.id);
      
      if (juegoExistente) {
        // Actualizar cantidad si ya existe
        return prevCarrito.map(item =>
          item.id === juego.id
            ? { 
                ...item, 
                cantidad: item.cantidad + cantidad,
                // Usamos el precio unitario que ya teníamos guardado o el nuevo
                precioTotal: item.precioNumerico * (item.cantidad + cantidad)
              }
            : item
        );
      } else {
        // Agregar nuevo juego al carrito
        const nuevoJuego = {
          id: juego.id,
          name: juego.name,
          image: juego.image,
          price: juego.price, // Guardamos el precio original por si acaso
          cantidad: cantidad,
          precioNumerico: precioUnitario, // Precio limpio numérico
          precioTotal: precioUnitario * cantidad
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
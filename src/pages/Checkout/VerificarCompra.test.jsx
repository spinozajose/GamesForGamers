// components/Checkout.test.jsx
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import Checkout from './Checkout';

// Mock de useNavigate
const mockNavigate = vi.fn();

// Mock de react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock del contexto del carrito
const mockCarritoContext = {
  carrito: [
    {
      id: '1',
      name: 'Juego de Prueba',
      precio: 19990,
      precioNumerico: 19990,
      imagen: 'test.jpg',
      cantidad: 1
    }
  ],
  totalPrecio: 19990,
  limpiarCarrito: vi.fn(),
  actualizarCantidad: vi.fn(),
  eliminarDelCarrito: vi.fn()
};

vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => mockCarritoContext,
}));

// Mock de validaciones
vi.mock('../assets/js/ValidacionesCheckout', () => ({
  useValidacionesCheckout: () => ({
    validarFormularioCompleto: vi.fn(() => ({ esValido: true, errores: {} })),
    validarCampoEnTiempoReal: vi.fn(() => '')
  }),
}));

// Mock de CSS
vi.mock('../assets/css/Checkout.css', () => ({}));

describe('Checkout - Test Simple', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Configurar localStorage para carrito normal
    vi.mocked(localStorage.getItem).mockImplementation((key) => {
      if (key === 'esPrecompra') return 'false';
      if (key === 'carritoPrecompra') return '[]';
      return null;
    });
  });

  test('renderiza correctamente con productos en el carrito', () => {
    render(
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    );

    expect(screen.getByText('Finalizar Compra')).toBeInTheDocument();
    expect(screen.getByText('Juego de Prueba')).toBeInTheDocument();
    
    // Usar getAllByText para manejar múltiples elementos con el mismo texto
    const precios = screen.getAllByText('$19.990');
    expect(precios.length).toBeGreaterThan(0);
    expect(precios[0]).toBeInTheDocument();
  });

  test('muestra carrito vacío cuando no hay productos', () => {
    // Mock temporal de carrito vacío
    const originalCarrito = [...mockCarritoContext.carrito];
    const originalTotal = mockCarritoContext.totalPrecio;
    
    mockCarritoContext.carrito = [];
    mockCarritoContext.totalPrecio = 0;

    render(
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    );

    expect(screen.getByText('🛒 Carrito Vacío')).toBeInTheDocument();
    expect(screen.getByText('No hay productos en tu carrito')).toBeInTheDocument();

    // Restaurar valores originales
    mockCarritoContext.carrito = originalCarrito;
    mockCarritoContext.totalPrecio = originalTotal;
  });

  test('navega correctamente al hacer clic en volver', async () => {
    render(
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    );

    const botonVolver = screen.getByText('← Volver');
    await act(async () => {
      fireEvent.click(botonVolver);
    });

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('permite llenar campos básicos del formulario usando querySelector', async () => {
    render(
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    );

    // Usar querySelector para encontrar el input por name attribute
    const nombreInput = document.querySelector('input[name="nombre"]');
    expect(nombreInput).toBeInTheDocument();
    
    await act(async () => {
      fireEvent.change(nombreInput, { target: { value: 'Juan Pérez' } });
    });

    expect(nombreInput.value).toBe('Juan Pérez');
  });

  test('maneja el formato de RUT correctamente usando querySelector', async () => {
    render(
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    );

    // Buscar el input por su name attribute usando querySelector
    const rutInput = document.querySelector('input[name="rut"]');
    expect(rutInput).toBeInTheDocument();
    
    await act(async () => {
      fireEvent.change(rutInput, { target: { value: '123456789' } });
    });

    // El RUT debería formatearse automáticamente
    expect(rutInput.value).toBe('12.345.678-9');
  });

  test('muestra todas las secciones del formulario', () => {
    render(
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    );

    expect(screen.getByText('📧 Información de Contacto')).toBeInTheDocument();
    expect(screen.getByText('🏠 Dirección de Envío')).toBeInTheDocument();
    expect(screen.getByText('💳 Método de Pago')).toBeInTheDocument();
  });

  test('muestra opciones de método de pago', () => {
    render(
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    );

    expect(screen.getByText('💳 Tarjeta de Crédito/Débito')).toBeInTheDocument();
    expect(screen.getByText('🏦 Transferencia Bancaria')).toBeInTheDocument();
  });

  test('muestra resumen de seguridad', () => {
    render(
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    );

    expect(screen.getByText('🔒 Pago 100% seguro')).toBeInTheDocument();
    expect(screen.getByText('↩️ Te entregamos tu clave, de inmediato!.')).toBeInTheDocument();
  });

  test('botón de pagar está presente y muestra el total correcto', () => {
    render(
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    );

    // Buscar el botón que contiene "Pagar" y "$19.990"
    const botones = screen.getAllByRole('button');
    const botonPagar = botones.find(button => 
      button.textContent.includes('Pagar') && 
      button.textContent.includes('$19.990')
    );

    expect(botonPagar).toBeInTheDocument();
    expect(botonPagar).not.toBeDisabled();
  });

  test('contiene elementos de resumen del pedido', () => {
    render(
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    );

    expect(screen.getByText('Resumen del Pedido')).toBeInTheDocument();
    expect(screen.getByText('Subtotal:')).toBeInTheDocument();
    expect(screen.getByText('Envío:')).toBeInTheDocument();
    expect(screen.getByText('Total:')).toBeInTheDocument();
  });
});
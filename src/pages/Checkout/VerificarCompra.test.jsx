import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import VerificarCompra from './VerificarCompra';
import clienteAxios from '../../config/axios';

// --- 1. MOCK ROBUSTO DE LOCALSTORAGE ---
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value.toString(); }),
    removeItem: vi.fn((key) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// --- 2. MOCKS DE LIBRERÍAS ---
const mocksValidaciones = vi.hoisted(() => ({
  mockValidarFormularioCompleto: vi.fn(),
  mockValidarCampoEnTiempoReal: vi.fn()
}));

vi.mock('../../assets/js/ValidacionesCheckout', () => ({
  useValidacionesCheckout: () => ({
    validarCampoEnTiempoReal: mocksValidaciones.mockValidarCampoEnTiempoReal
  }),
  validarFormularioCompleto: mocksValidaciones.mockValidarFormularioCompleto
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock('../../config/axios');

// --- 3. MOCK DEL CARRITO ---
const mockLimpiarCarrito = vi.fn();
const mockEliminarDelCarrito = vi.fn();
let mockCarritoState = {
  carrito: [{ id: 1, name: 'Juego Test', price: 10000, precioNumerico: 10000, cantidad: 1, image: 'img.jpg' }],
  totalPrecio: 10000,
  totalItems: 1
};

vi.mock('../../context/CarritoContext', () => ({
  useCarrito: () => ({
    ...mockCarritoState,
    limpiarCarrito: mockLimpiarCarrito,
    eliminarDelCarrito: mockEliminarDelCarrito
  }),
}));

window.scrollTo = vi.fn();

describe('Pruebas del Componente VerificarCompra', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear(); // Limpiamos nuestro mock manual
    
    // Configuración Base: Usuario logueado
    localStorage.setItem('usuario', JSON.stringify({ idUsuario: 99, email: 'test@user.com' }));
    
    // Reset mocks validación
    mocksValidaciones.mockValidarFormularioCompleto.mockReturnValue({ esValido: true, errores: {} });
    mocksValidaciones.mockValidarCampoEnTiempoReal.mockReturnValue('');
    
    // Reset carrito
    mockCarritoState = {
      carrito: [{ id: 1, name: 'Juego Test', price: 10000, precioNumerico: 10000, cantidad: 1, image: 'img.jpg' }],
      totalPrecio: 10000,
      totalItems: 1
    };
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <VerificarCompra />
      </BrowserRouter>
    );
  };

  test('Debe redirigir al Login si no hay usuario en LocalStorage', async () => {
    localStorage.removeItem('usuario');
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    renderComponent();

    // Esperamos a que el useEffect se ejecute
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Debes iniciar sesión para completar la compra");
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('Debe mostrar mensaje de "Carrito Vacío" si no hay items', () => {
    mockCarritoState = { carrito: [], totalPrecio: 0, totalItems: 0 };
    renderComponent();
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });

  test('Debe renderizar el formulario correctamente', () => {
    renderComponent();
    expect(screen.getByText('Finalizar Compra')).toBeInTheDocument();
  });

  test('Debe mostrar errores de validación y NO enviar orden si falla', async () => {
    mocksValidaciones.mockValidarFormularioCompleto.mockReturnValue({
      esValido: false,
      errores: { nombre: 'Requerido' }
    });

    renderComponent();

    const botonPagar = screen.getByRole('button', { name: /Pagar/i });
    fireEvent.click(botonPagar);

    expect(screen.getByText('Requerido')).toBeInTheDocument();
    expect(clienteAxios.post).not.toHaveBeenCalled();
  });

  test('Debe procesar la orden EXITOSAMENTE', async () => {
    // 1. Preparamos el mock de éxito
    clienteAxios.post.mockResolvedValue({ data: { id: 'ORD-123' } });

    renderComponent();

    // 2. IMPORTANTE: Esperar a que el componente lea el usuario del LocalStorage
    // Si no esperamos, el state "usuario" es null y falla el "if (!usuario)"
    await waitFor(() => {
      // Verificamos que el input de email se haya rellenado con el dato del localStorage
      // Esto confirma que el useEffect ya corrió
      expect(screen.getByDisplayValue('test@user.com')).toBeInTheDocument();
    });

    // 3. Ahora sí clickeamos
    const botonPagar = screen.getByRole('button', { name: /Pagar/i });
    await act(async () => {
      fireEvent.click(botonPagar);
    });

    // 4. Verificamos éxito
    await waitFor(() => {
      expect(clienteAxios.post).toHaveBeenCalled();
      expect(screen.getByText('¡Gracias por tu compra!')).toBeInTheDocument();
    });
  });

  test('Debe manejar ERROR del servidor al procesar la orden', async () => {
    clienteAxios.post.mockRejectedValue(new Error('Error interno'));
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderComponent();

    // Esperar carga de usuario
    await waitFor(() => {
        expect(screen.getByDisplayValue('test@user.com')).toBeInTheDocument();
    });

    const botonPagar = screen.getByRole('button', { name: /Pagar/i });
    await act(async () => {
      fireEvent.click(botonPagar);
    });

    await waitFor(() => {
      // Usamos stringContaining para ser flexibles con el mensaje exacto
      expect(alertMock).toHaveBeenCalledWith(expect.stringContaining("error"));
    });
  });
});
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import InicioSesion from './InicioSesion';
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

// --- 2. MOCKS ---
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock('../../config/axios');

const mockValidarFormulario = vi.fn();
vi.mock('../../assets/js/ValidacionesLogin', () => ({
  useValidacionesLogin: () => ({
    validaciones: { email: vi.fn(), password: vi.fn() },
    validarFormularioLogin: mockValidarFormulario,
  }),
}));

describe('Pruebas del Componente InicioSesion', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockValidarFormulario.mockReturnValue({ esValido: true, errores: {} });
  });

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <InicioSesion />
      </BrowserRouter>
    );
  };

  test('Debe realizar el login EXITOSO, guardar en LocalStorage y redirigir', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    // Mock respuesta backend
    clienteAxios.post.mockResolvedValue({
      data: { username: 'GamerPro', esAdmin: false, idUsuario: 123 }
    });

    renderComponent();

    // Llenar formulario
    fireEvent.change(screen.getByPlaceholderText('usuario@ejemplo.com'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: '123456' } });

    const boton = screen.getByRole('button', { name: /INICIAR SESIÓN/i });
    fireEvent.click(boton);

    await waitFor(() => {
      // 1. Verificar llamada a Axios
      expect(clienteAxios.post).toHaveBeenCalled();
      
      // 2. Verificar LocalStorage usando nuestro mock manual
      expect(localStorage.setItem).toHaveBeenCalled();
      
      // 3. Verificar redirección y alerta
      expect(alertMock).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('Debe manejar error de credenciales incorrectas (Error 401)', async () => {
    clienteAxios.post.mockRejectedValue({ response: { status: 401 } });

    renderComponent();
    const boton = screen.getByRole('button', { name: /INICIAR SESIÓN/i });
    fireEvent.click(boton);

    await waitFor(() => {
      expect(screen.getByText(/Correo o contraseña incorrectos/i)).toBeInTheDocument();
    });
  });

  test('Debe manejar error de conexión (Error Genérico)', async () => {
    clienteAxios.post.mockRejectedValue(new Error('Network Error'));

    renderComponent();
    const boton = screen.getByRole('button', { name: /INICIAR SESIÓN/i });
    fireEvent.click(boton);

    await waitFor(() => {
      expect(screen.getByText(/Error de conexión/i)).toBeInTheDocument();
    });
  });

  test('Debe mostrar estado de carga', async () => {
    clienteAxios.post.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    renderComponent();
    const boton = screen.getByRole('button', { name: /INICIAR SESIÓN/i });
    fireEvent.click(boton);

    expect(screen.getByText(/Verificando.../i)).toBeInTheDocument();
    expect(boton).toBeDisabled();
  });
});
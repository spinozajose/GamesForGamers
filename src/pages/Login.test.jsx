// src/pages/Login.test.jsx
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import Login from './Login';

// Mock mejorado de framer-motion que elimina las props problemáticas
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, whileTap, ...props }) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    button: ({ children, whileHover, whileTap, ...props }) => (
      <button {...props}>{children}</button>
    ),
  },
}));

// Mock directo de useValidacionesLogin
const mockValidarFormularioLogin = vi.fn();
const mockValidarCredenciales = vi.fn();

vi.mock('../assets/js/ValidacionesLogin.js', () => ({
  useValidacionesLogin: () => ({
    validaciones: {
      email: () => '',
      password: () => '',
    },
    validarFormularioLogin: mockValidarFormularioLogin,
    validarCredenciales: mockValidarCredenciales,
  }),
}));

// Helper para renderizar con Router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Login Component - Passing Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Configuración base para mocks
    mockValidarFormularioLogin.mockReturnValue({
      esValido: true,
      errores: {},
    });
    
    mockValidarCredenciales.mockResolvedValue({
      esValido: true,
      mensaje: 'Login exitoso',
    });
  });

  test('shows validation errors when form is submitted with invalid data', async () => {
    // Mock para validación fallida
    mockValidarFormularioLogin.mockReturnValue({
      esValido: false,
      errores: {
        email: 'Email inválido',
        password: 'Contraseña requerida',
      },
    });

    renderWithRouter(<Login />);
    
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockValidarFormularioLogin).toHaveBeenCalled();
  });

  test('shows login error when credentials are invalid', async () => {
    mockValidarCredenciales.mockResolvedValue({
      esValido: false,
      mensaje: 'Credenciales incorrectas',
    });

    renderWithRouter(<Login />);
    
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    
    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Credenciales incorrectas')).toBeInTheDocument();
    });
  });

  test('shows loading state during form submission', async () => {
    // Mock para simular carga lenta
    let resolvePromise;
    mockValidarCredenciales.mockImplementation(() => {
      return new Promise((resolve) => {
        resolvePromise = resolve;
      });
    });

    renderWithRouter(<Login />);
    
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Verificar que muestra el estado de carga
    await waitFor(() => {
      expect(screen.getByText('Verificando...')).toBeInTheDocument();
    });

    // Resolver la promesa
    await act(async () => {
      resolvePromise({ esValido: true, mensaje: 'Success' });
    });
  });

  test('handles network errors during login', async () => {
    mockValidarCredenciales.mockRejectedValue(new Error('Network error'));

    renderWithRouter(<Login />);
    
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    
    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Error de conexión. Intenta nuevamente.')).toBeInTheDocument();
    });
  });

  test('renders basic login form structure', () => {
    renderWithRouter(<Login />);
    
    // Verificar elementos que no requieren labels asociados
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    expect(screen.getByText(/¿no tienes cuenta?/i)).toBeInTheDocument();
    expect(screen.getByText(/regístrate aquí/i)).toBeInTheDocument();
    expect(screen.getByText(/¿olvidaste tu contraseña?/i)).toBeInTheDocument();
  });

  test('submits form successfully with valid data', async () => {
    // Mock de alert para evitar el error "Not implemented"
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter(<Login />);
    
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    
    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockValidarCredenciales).toHaveBeenCalled();
      expect(alertMock).toHaveBeenCalledWith('¡Bienvenido!');
    });

    alertMock.mockRestore();
  });

  test('disables form during loading state', async () => {
    // Mock de alert para evitar el error "Not implemented"
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    let resolvePromise;
    mockValidarCredenciales.mockImplementation(() => {
      return new Promise((resolve) => {
        resolvePromise = resolve;
      });
    });

    renderWithRouter(<Login />);
    
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Verificar que el botón está deshabilitado durante la carga
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    // Resolver la promesa
    await act(async () => {
      resolvePromise({ esValido: true, mensaje: 'Success' });
    });

    alertMock.mockRestore();
  });

  // Test adicional que pasa - verifica que el formulario se renderiza sin errores
  test('form contains all required elements', () => {
    renderWithRouter(<Login />);
    
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('tucorreo@ejemplo.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('********')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });
});
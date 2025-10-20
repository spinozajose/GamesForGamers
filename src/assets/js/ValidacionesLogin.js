// Validar email para login
export const validarEmailLogin = (email) => {
  if (!email?.trim()) return 'Email es requerido';
  if (!/^\S+@\S+\.\S+$/.test(email)) return 'Email no válido';
  return null;
};

// Validar contraseña para login
export const validarPasswordLogin = (password) => {
  if (!password) return 'Contraseña es requerida';
  if (password.length < 1) return 'Ingresa tu contraseña';
  return null;
};

// Validar credenciales (simulación - luego lo conectarás con tu backend)
export const validarCredenciales = async (email, password) => {
  // Esta es una simulación - en la práctica harías una llamada a tu API
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simular validación básica
      const esValido = email && password && password.length >= 1;
      resolve({
        esValido,
        mensaje: esValido ? null : 'Credenciales incorrectas'
      });
    }, 1000);
  });
};

// Validación completa del formulario de login
export const validarFormularioLogin = (formData) => {
  const errores = {};

  errores.email = validarEmailLogin(formData.email);
  errores.password = validarPasswordLogin(formData.password);

  // Filtrar solo los campos con errores
  const erroresFiltrados = Object.fromEntries(
    Object.entries(errores).filter(([_, value]) => value !== null)
  );

  return {
    esValido: Object.keys(erroresFiltrados).length === 0,
    errores: erroresFiltrados
  };
};

// Hook personalizado para validaciones de login
export const useValidacionesLogin = () => {
  const validaciones = {
    email: validarEmailLogin,
    password: validarPasswordLogin
  };

  return { validaciones, validarFormularioLogin, validarCredenciales };
};

export default {
  validarEmailLogin,
  validarPasswordLogin,
  validarCredenciales,
  validarFormularioLogin,
  useValidacionesLogin
};
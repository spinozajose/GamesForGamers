// Validar RUT
export const validarRUT = (rut) => {
  if (!rut) return false;
  
  // Limpiar RUT
  const rutLimpio = rut.replace(/[\.\-]/g, '').toLowerCase();
  
  if (rutLimpio.length < 2) return false;
  
  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1);
  
  // Validar que el cuerpo sea numérico
  if (!/^\d+$/.test(cuerpo)) return false;
  
  // Calcular DV esperado
  let suma = 0;
  let multiplo = 2;
  
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i)) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  
  const dvEsperado = 11 - (suma % 11);
  const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'k' : dvEsperado.toString();
  
  return dvCalculado === dv;
};

// Formatear RUT mientras escribe
export const formatearRUT = (rut) => {
  if (!rut) return '';
  
  // Limpiar el RUT
  const rutLimpio = rut.replace(/[^0-9kK]/g, '');
  
  if (rutLimpio.length === 0) return '';
  
  // Separar cuerpo y dígito verificador
  let cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1);
  
  // Formatear cuerpo con puntos
  if (cuerpo.length > 0) {
    cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  
  return `${cuerpo}-${dv}`;
};

// Validar email
export const validarEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validar fortaleza de contraseña
export const validarPassword = (password) => {
  if (!password) return { valido: false, errores: ['Contraseña es requerida'] };
  
  const errores = [];
  
  if (password.length < 6) {
    errores.push('Mínimo 6 caracteres');
  }
  if (!/(?=.*[a-z])/.test(password)) {
    errores.push('Al menos una minúscula');
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    errores.push('Al menos una mayúscula');
  }
  if (!/(?=.*\d)/.test(password)) {
    errores.push('Al menos un número');
  }
  
  return {
    valido: errores.length === 0,
    errores: errores
  };
};

// Validar nombre completo
export const validarNombre = (nombre) => {
  if (!nombre?.trim()) return 'Nombre completo es requerido';
  if (nombre.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres';
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) return 'El nombre solo puede contener letras y espacios';
  return null;
};

// Validar nombre de usuario
export const validarUsername = (username) => {
  if (!username?.trim()) return 'Nombre de usuario es requerido';
  if (username.length < 3) return 'El usuario debe tener al menos 3 caracteres';
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Solo letras, números y _ permitidos';
  if (username.length > 20) return 'Máximo 20 caracteres';
  return null;
};

// Validar dirección
export const validarDireccion = (direccion) => {
  if (!direccion?.trim()) return 'Dirección es requerida';
  if (direccion.length < 5) return 'La dirección debe ser más específica';
  if (direccion.length > 100) return 'Máximo 100 caracteres';
  return null;
};

// Validar ciudad
export const validarCiudad = (ciudad) => {
  if (!ciudad?.trim()) return 'Ciudad es requerida';
  if (ciudad.length < 3) return 'Ciudad no válida';
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(ciudad)) return 'La ciudad solo puede contener letras y espacios';
  return null;
};

// Validar selección (región, comuna)
export const validarSeleccion = (valor, campo) => {
  if (!valor) return `Selecciona una ${campo}`;
  return null;
};

// Validar confirmación de contraseña
export const validarConfirmPassword = (confirmPassword, password) => {
  if (!confirmPassword) return 'Confirma tu contraseña';
  if (confirmPassword !== password) return 'Las contraseñas no coinciden';
  return null;
};

// Validar teléfono (si lo agregas después)
export const validarTelefono = (telefono) => {
  if (!telefono) return null; // Opcional
  
  const telefonoLimpio = telefono.replace(/\s/g, '');
  if (!/^\+?[\d\s\-\(\)]{8,}$/.test(telefonoLimpio)) {
    return 'Teléfono no válido';
  }
  return null;
};

// Validación completa del formulario
export const validarFormularioCompleto = (formData) => {
  const errores = {};

  // Aplicar todas las validaciones
  errores.nombre = validarNombre(formData.nombre);
  errores.rut = validarRUT(formData.rut) ? null : 'RUT no válido';
  errores.username = validarUsername(formData.username);
  errores.email = validarEmail(formData.email) ? null : 'Email no válido';
  errores.direccion = validarDireccion(formData.direccion);
  errores.region = validarSeleccion(formData.region, 'región');
  errores.ciudad = validarCiudad(formData.ciudad);
  errores.comuna = validarSeleccion(formData.comuna, 'comuna');
  
  const passwordValidation = validarPassword(formData.password);
  errores.password = passwordValidation.valido ? null : passwordValidation.errores[0];
  
  errores.confirmPassword = validarConfirmPassword(
    formData.confirmPassword, 
    formData.password
  );

  // Filtrar solo los campos con errores
  const erroresFiltrados = Object.fromEntries(
    Object.entries(errores).filter(([_, value]) => value !== null)
  );

  return {
    esValido: Object.keys(erroresFiltrados).length === 0,
    errores: erroresFiltrados
  };
};

// Hook personalizado para validaciones (opcional)
export const useValidacionesRegister = () => {
  const validaciones = {
    nombre: validarNombre,
    rut: (value) => validarRUT(value) ? null : 'RUT no válido',
    username: validarUsername,
    email: (value) => validarEmail(value) ? null : 'Email no válido',
    direccion: validarDireccion,
    region: (value) => validarSeleccion(value, 'región'),
    ciudad: validarCiudad,
    comuna: (value) => validarSeleccion(value, 'comuna'),
    password: (value) => {
      const validation = validarPassword(value);
      return validation.valido ? null : validation.errores[0];
    },
    confirmPassword: (value, allValues) => 
      validarConfirmPassword(value, allValues.password)
  };

  return { validaciones, validarFormularioCompleto, formatearRUT };
};

export default {
  validarRUT,
  validarEmail,
  validarPassword,
  validarNombre,
  validarUsername,
  validarDireccion,
  validarCiudad,
  validarSeleccion,
  validarConfirmPassword,
  validarTelefono,
  validarFormularioCompleto,
  formatearRUT,
  useValidacionesRegister
};
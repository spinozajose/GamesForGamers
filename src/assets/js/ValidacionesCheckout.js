// Validaciones para información de contacto
export const validarContacto = (datos) => {
  const errores = {};

  // Validar RUT
  if (!datos.rut?.trim()) {
    errores.rut = 'El RUT es requerido';
  } else if (!validarRUT(datos.rut)) {
    errores.rut = 'El RUT no es válido';
  }

  // Validar nombre
  if (!datos.nombre?.trim()) {
    errores.nombre = 'El nombre es requerido';
  } else if (datos.nombre.trim().length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres';
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(datos.nombre)) {
    errores.nombre = 'El nombre solo puede contener letras y espacios';
  }

  // Validar email
  if (!datos.email?.trim()) {
    errores.email = 'El email es requerido';
  } else if (!/^\S+@\S+\.\S+$/.test(datos.email)) {
    errores.email = 'El formato del email no es válido';
  }

  // Validar teléfono (opcional pero si se ingresa debe ser válido)
  if (datos.telefono && !/^[\+]?[0-9\s\-\(\)]{8,}$/.test(datos.telefono.replace(/\s/g, ''))) {
    errores.telefono = 'El formato del teléfono no es válido';
  }

  return {
    esValido: Object.keys(errores).length === 0,
    errores
  };
};

// Validaciones para dirección de envío
export const validarDireccion = (datos) => {
  const errores = {};

  // Validar dirección
  if (!datos.direccion?.trim()) {
    errores.direccion = 'La dirección es requerida';
  } else if (datos.direccion.trim().length < 5) {
    errores.direccion = 'La dirección debe ser más específica';
  }

  // Validar ciudad
  if (!datos.ciudad?.trim()) {
    errores.ciudad = 'La ciudad es requerida';
  } else if (datos.ciudad.trim().length < 3) {
    errores.ciudad = 'La ciudad no es válida';
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(datos.ciudad)) {
    errores.ciudad = 'La ciudad solo puede contener letras y espacios';
  }

  // Validar región
  if (!datos.region) {
    errores.region = 'Selecciona una región';
  }

  // Validar comuna
  if (!datos.comuna) {
    errores.comuna = 'Selecciona una comuna';
  }

  // Validar código postal (opcional pero si se ingresa debe ser válido)
  if (datos.codigoPostal && !/^\d{7}$/.test(datos.codigoPostal.replace(/\s/g, ''))) {
    errores.codigoPostal = 'El código postal debe tener 7 dígitos';
  }

  return {
    esValido: Object.keys(errores).length === 0,
    errores
  };
};

// Validaciones para método de pago
export const validarMetodoPago = (datos) => {
  const errores = {};

  if (!datos.metodoPago) {
    errores.metodoPago = 'Selecciona un método de pago';
  }

  // Validaciones específicas para tarjeta
  if (datos.metodoPago === 'tarjeta') {
    if (!datos.numeroTarjeta?.trim()) {
      errores.numeroTarjeta = 'El número de tarjeta es requerido';
    } else if (!/^\d{16}$/.test(datos.numeroTarjeta.replace(/\s/g, ''))) {
      errores.numeroTarjeta = 'El número de tarjeta debe tener 16 dígitos';
    }

    if (!datos.fechaExpiracion?.trim()) {
      errores.fechaExpiracion = 'La fecha de expiración es requerida';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(datos.fechaExpiracion)) {
      errores.fechaExpiracion = 'Formato inválido (MM/AA)';
    } else {
      // Validar que la fecha no esté expirada
      const [mes, año] = datos.fechaExpiracion.split('/');
      const fechaExpiracion = new Date(2000 + parseInt(año), parseInt(mes) - 1);
      const hoy = new Date();
      
      if (fechaExpiracion < hoy) {
        errores.fechaExpiracion = 'La tarjeta está expirada';
      }
    }

    if (!datos.cvv?.trim()) {
      errores.cvv = 'El CVV es requerido';
    } else if (!/^\d{3,4}$/.test(datos.cvv)) {
      errores.cvv = 'El CVV debe tener 3 o 4 dígitos';
    }
  }

  return {
    esValido: Object.keys(errores).length === 0,
    errores
  };
};

// Validar RUT chileno
const validarRUT = (rut) => {
  if (!rut) return false;
  
  const rutLimpio = rut.replace(/[\.\-]/g, '').toLowerCase();
  
  if (rutLimpio.length < 2) return false;
  
  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1);
  
  if (!/^\d+$/.test(cuerpo)) return false;
  
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

// Validación completa del formulario
export const validarFormularioCompleto = (datosEnvio, datosPago = {}) => {
  const contacto = validarContacto(datosEnvio);
  const direccion = validarDireccion(datosEnvio);
  const metodoPago = validarMetodoPago({ ...datosEnvio, ...datosPago });

  const todosLosErrores = {
    ...contacto.errores,
    ...direccion.errores,
    ...metodoPago.errores
  };

  return {
    esValido: contacto.esValido && direccion.esValido && metodoPago.esValido,
    errores: todosLosErrores,
    secciones: {
      contacto: contacto.esValido,
      direccion: direccion.esValido,
      metodoPago: metodoPago.esValido
    }
  };
};

// Validaciones específicas en tiempo real
export const useValidacionesCheckout = () => {
  const validarCampoEnTiempoReal = (campo, valor, datosCompletos = {}) => {
    switch (campo) {
      case 'rut':
        if (!valor?.trim()) return 'El RUT es requerido';
        if (!validarRUT(valor)) return 'RUT no válido';
        return null;

      case 'nombre':
        if (!valor?.trim()) return 'El nombre es requerido';
        if (valor.trim().length < 3) return 'Mínimo 3 caracteres';
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) return 'Solo letras y espacios';
        return null;

      case 'email':
        if (!valor?.trim()) return 'El email es requerido';
        if (!/^\S+@\S+\.\S+$/.test(valor)) return 'Formato de email inválido';
        return null;

      case 'telefono':
        if (valor && !/^[\+]?[0-9\s\-\(\)]{8,}$/.test(valor.replace(/\s/g, ''))) {
          return 'Formato de teléfono inválido';
        }
        return null;

      case 'direccion':
        if (!valor?.trim()) return 'La dirección es requerida';
        if (valor.trim().length < 5) return 'Debe ser más específica';
        return null;

      case 'ciudad':
        if (!valor?.trim()) return 'La ciudad es requerida';
        if (valor.trim().length < 3) return 'Ciudad no válida';
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) return 'Solo letras y espacios';
        return null;

      case 'region':
        if (!valor) return 'Selecciona una región';
        return null;

      case 'comuna':
        if (!valor) return 'Selecciona una comuna';
        return null;

      case 'codigoPostal':
        if (valor && !/^\d{7}$/.test(valor.replace(/\s/g, ''))) {
          return 'Debe tener 7 dígitos';
        }
        return null;

      case 'numeroTarjeta':
        if (datosCompletos.metodoPago === 'tarjeta') {
          if (!valor?.trim()) return 'Número de tarjeta requerido';
          if (!/^\d{16}$/.test(valor.replace(/\s/g, ''))) return '16 dígitos requeridos';
        }
        return null;

      case 'fechaExpiracion':
        if (datosCompletos.metodoPago === 'tarjeta') {
          if (!valor?.trim()) return 'Fecha requerida';
          if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(valor)) return 'Formato MM/AA';
          
          // Validar expiración
          const [mes, año] = valor.split('/');
          const fechaExpiracion = new Date(2000 + parseInt(año), parseInt(mes) - 1);
          const hoy = new Date();
          if (fechaExpiracion < hoy) return 'Tarjeta expirada';
        }
        return null;

      case 'cvv':
        if (datosCompletos.metodoPago === 'tarjeta') {
          if (!valor?.trim()) return 'CVV requerido';
          if (!/^\d{3,4}$/.test(valor)) return '3 o 4 dígitos';
        }
        return null;

      default:
        return null;
    }
  };

  return {
    validarContacto,
    validarDireccion,
    validarMetodoPago,
    validarFormularioCompleto,
    validarCampoEnTiempoReal
  };
};

export default {
  validarContacto,
  validarDireccion,
  validarMetodoPago,
  validarFormularioCompleto,
  useValidacionesCheckout,
  validarRUT // Exportamos también la función individual si la necesitas
};
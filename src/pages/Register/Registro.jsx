import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useValidacionesRegister } from '../../assets/js/ValidacionesRegister';
import clienteAxios from '../../config/axios';
import './Registro.css';

// --- DATOS DE CHILE (COPIAR Y PEGAR ESTA LISTA SIEMPRE QUE LA NECESITES) ---
const REGIONES_CHILE = [
  { region: "Arica y Parinacota", comunas: ["Arica", "Camarones", "Putre", "General Lagos"] },
  { region: "Tarapacá", comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"] },
  { region: "Antofagasta", comunas: ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"] },
  { region: "Atacama", comunas: ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"] },
  { region: "Coquimbo", comunas: ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"] },
  { region: "Valparaíso", comunas: ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"] },
  { region: "Metropolitana", comunas: ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"] },
  { region: "O'Higgins", comunas: ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"] },
  { region: "Maule", comunas: ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"] },
  { region: "Ñuble", comunas: ["Chillán", "Chillán Viejo", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"] },
  { region: "Biobío", comunas: ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"] },
  { region: "Araucanía", comunas: ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"] },
  { region: "Los Ríos", comunas: ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"] },
  { region: "Los Lagos", comunas: ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"] },
  { region: "Aysén", comunas: ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"] },
  { region: "Magallanes", comunas: ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"] }
];

const Registro = () => {
  const navigate = useNavigate();
  const { validaciones, validarFormularioCompleto, formatearRUT } = useValidacionesRegister();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    rut: '',
    direccion: '',
    ciudad: '',
    region: '',
    comuna: '',
    aceptaTerminos: false
  });

  const [errores, setErrores] = useState({});
  const [procesando, setProcesando] = useState(false);

  // --- LOGICA DE REGIONES Y COMUNAS ---
  const comunasDisponibles = useMemo(() => {
    const regionSeleccionada = REGIONES_CHILE.find(r => r.region === formData.region);
    return regionSeleccionada ? regionSeleccionada.comunas : [];
  }, [formData.region]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let valorFinal = type === 'checkbox' ? checked : value;

    if (name === 'rut') {
      valorFinal = formatearRUT(value);
    }

    // SI CAMBIA LA REGION, BORRAMOS LA COMUNA ANTERIOR
    if (name === 'region') {
      setFormData({ 
        ...formData, 
        [name]: valorFinal,
        comuna: '' // Reset
      });
    } else {
      setFormData({ ...formData, [name]: valorFinal });
    }

    if (errores[name]) {
      setErrores({ ...errores, [name]: null });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const funcionValidar = validaciones[name];

    if (funcionValidar) {
      const error = funcionValidar(value, formData);
      setErrores(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validacion = validarFormularioCompleto(formData);

    if (!validacion.esValido) {
      setErrores(validacion.errores);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!formData.aceptaTerminos) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    setProcesando(true);

    try {
      const usuarioParaBackend = {
        nombreUsuario: formData.username,
        email: formData.email,
        password: formData.password,
        nombre: formData.nombre,
        rut: formData.rut,
        direccion: formData.direccion,
        ciudad: formData.ciudad,
        region: formData.region,
        comuna: formData.comuna,
        permisosAdmin: false
      };

      await clienteAxios.post('/usuarios', usuarioParaBackend);
      
      alert("¡Cuenta creada con éxito! Bienvenido a GFG.");
      navigate('/login');

    } catch (error) {
      console.error("Error en registro:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message || "No se pudo crear la cuenta"}`);
      } else {
        alert("Error de conexión con el servidor.");
      }
    } finally {
      setProcesando(false);
    }
  };

  const getInputClass = (campo) => errores[campo] ? 'input-error' : '';

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1 className="register-title">Crear Cuenta</h1>
            <p className="register-subtitle">Únete a GFG y empieza tu aventura</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form" noValidate>
            
            <div className="form-grid-layout">
              {/* === COLUMNA 1: CUENTA === */}
              <div className="form-column">
                <h3 className="section-title">Datos de Cuenta</h3>
                
                <div className="form-group-neon">
                  <label>Usuario</label>
                  <input 
                    type="text" name="username" placeholder="GamerPro123"
                    value={formData.username} onChange={handleChange} onBlur={handleBlur}
                    className={getInputClass('username')}
                  />
                  {errores.username && <span className="error-msg">{errores.username}</span>}
                </div>

                <div className="form-group-neon">
                  <label>Email</label>
                  <input 
                    type="email" name="email" placeholder="correo@ejemplo.com"
                    value={formData.email} onChange={handleChange} onBlur={handleBlur}
                    className={getInputClass('email')}
                  />
                  {errores.email && <span className="error-msg">{errores.email}</span>}
                </div>

                <div className="form-group-neon">
                  <label>Contraseña</label>
                  <input 
                    type="password" name="password" placeholder="Mínimo 6 caracteres"
                    value={formData.password} onChange={handleChange} onBlur={handleBlur}
                    className={getInputClass('password')}
                  />
                  {errores.password && <span className="error-msg">{errores.password}</span>}
                </div>

                <div className="form-group-neon">
                  <label>Confirmar Contraseña</label>
                  <input 
                    type="password" name="confirmPassword" placeholder="Repite la contraseña"
                    value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlur}
                    className={getInputClass('confirmPassword')}
                  />
                  {errores.confirmPassword && <span className="error-msg">{errores.confirmPassword}</span>}
                </div>
              </div>

              {/* === COLUMNA 2: PERSONALES === */}
              <div className="form-column">
                <h3 className="section-title">Datos Personales</h3>

                <div className="form-group-neon">
                  <label>Nombre Completo</label>
                  <input 
                    type="text" name="nombre" placeholder="Juan Pérez"
                    value={formData.nombre} onChange={handleChange} onBlur={handleBlur}
                    className={getInputClass('nombre')}
                  />
                  {errores.nombre && <span className="error-msg">{errores.nombre}</span>}
                </div>

                <div className="form-group-neon">
                  <label>RUT</label>
                  <input 
                    type="text" name="rut" placeholder="12.345.678-9"
                    value={formData.rut} onChange={handleChange} onBlur={handleBlur}
                    className={getInputClass('rut')}
                    maxLength={12}
                  />
                  {errores.rut && <span className="error-msg">{errores.rut}</span>}
                </div>

                <div className="form-group-neon">
                  <label>Dirección</label>
                  <input 
                    type="text" name="direccion" placeholder="Calle Falsa 123"
                    value={formData.direccion} onChange={handleChange} onBlur={handleBlur}
                    className={getInputClass('direccion')}
                  />
                  {errores.direccion && <span className="error-msg">{errores.direccion}</span>}
                </div>

                <div className="row-2-col">
                    <div className="form-group-neon">
                        <label>Ciudad</label>
                        <input 
                            type="text" name="ciudad"
                            value={formData.ciudad} onChange={handleChange} onBlur={handleBlur}
                            className={getInputClass('ciudad')}
                        />
                        {errores.ciudad && <span className="error-msg">{errores.ciudad}</span>}
                    </div>
                    
                    {/* SELECTOR DE REGIÓN DINÁMICO */}
                    <div className="form-group-neon">
                        <label>Región</label>
                        <select 
                            name="region" value={formData.region} 
                            onChange={handleChange} onBlur={handleBlur}
                            className={getInputClass('region')}
                        >
                            <option value="">Elegir Región...</option>
                            {REGIONES_CHILE.map((reg) => (
                                <option key={reg.region} value={reg.region}>
                                    {reg.region}
                                </option>
                            ))}
                        </select>
                        {errores.region && <span className="error-msg">{errores.region}</span>}
                    </div>
                </div>

                {/* SELECTOR DE COMUNA DINÁMICO */}
                <div className="form-group-neon">
                    <label>Comuna</label>
                    <select 
                        name="comuna" value={formData.comuna} 
                        onChange={handleChange} onBlur={handleBlur}
                        className={getInputClass('comuna')}
                        disabled={!formData.region} // Bloqueado si no hay región
                    >
                        <option value="">
                            {formData.region ? "Elegir Comuna..." : "Primero elige Región"}
                        </option>
                        {comunasDisponibles.map((com) => (
                            <option key={com} value={com}>
                                {com}
                            </option>
                        ))}
                    </select>
                    {errores.comuna && <span className="error-msg">{errores.comuna}</span>}
                </div>

              </div>
            </div>

            <div className="form-footer">
              <label className="checkbox-neon">
                <input 
                  type="checkbox" name="aceptaTerminos"
                  checked={formData.aceptaTerminos} onChange={handleChange}
                />
                <span className="checkmark"></span>
                Acepto los Términos y Condiciones
              </label>

              <button type="submit" className="btn-register" disabled={procesando}>
                {procesando ? (
                  <>
                    <span className="spinner-small" style={{display:'inline-block', width:'15px', height:'15px', border:'2px solid white', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 1s linear infinite', marginRight:'10px'}}></span>
                    Procesando...
                  </>
                ) : 'REGISTRARSE'}
              </button>
            </div>

          </form>

          <div className="register-footer-link">
            <p>¿Ya tienes cuenta? <Link to="/login" className="login-link">Inicia sesión</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
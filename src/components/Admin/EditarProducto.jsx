import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import './AdminForm.css'; // Asegúrate de que este CSS exista también

const EditarProducto = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtenemos el ID de la URL
  const [guardando, setGuardando] = useState(false);
  const [cargando, setCargando] = useState(true);
  
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    descuento: 0,
    categoria: '',
    plataforma: 'PC',
    imagenUrl: '',
    stock: 0,
    creador: '',
    valoracion: 5.0
  });

  // 1. Cargar datos del juego existente al abrir la página
  useEffect(() => {
    const obtenerJuego = async () => {
        try {
            const respuesta = await clienteAxios.get(`/videojuegos/${id}`);
            const data = respuesta.data;
            
            // Mapeamos la respuesta del backend al estado del formulario
            setForm({
                titulo: data.name || data.titulo,
                descripcion: data.description || data.descripcion,
                precio: data.price || data.precio,
                descuento: data.discount || data.descuento || 0,
                categoria: data.category || data.categoria,
                plataforma: data.plataformas || data.plataforma || 'PC',
                imagenUrl: data.image || data.imagenUrl,
                stock: data.stock || 0,
                creador: data.creador || '',
                valoracion: data.valoracion || 5.0
            });
            setCargando(false);
        } catch (error) {
            console.error("Error al cargar producto:", error);
            alert("No se pudo cargar el producto o no existe.");
            navigate('/panel-admin/productos');
        }
    };
    if (id) obtenerJuego();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);

    try {
      // Petición PUT para actualizar
      await clienteAxios.put(`/videojuegos/${id}`, form);
      alert('¡Producto actualizado correctamente!');
      navigate('/panel-admin/productos');
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert('Error al guardar los cambios. Verifica la conexión.');
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) return <div className="admin-container" style={{color:'white', padding:'2rem'}}>Cargando datos del juego...</div>;

  return (
    <div className="admin-container">
      <div className="admin-header-actions">
        <h2>Editar Producto #{id}</h2>
        <button className="btn-back" onClick={() => navigate('/panel-admin/productos')}>
          ← Cancelar
        </button>
      </div>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="admin-form">
          
          <div className="form-row">
            <div className="form-group">
              <label>Título del Juego</label>
              <input type="text" name="titulo" required value={form.titulo} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Desarrollador</label>
              <input type="text" name="creador" required value={form.creador} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Precio (CLP)</label>
              <input type="number" name="precio" required value={form.precio} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Descuento (%)</label>
              <input type="number" name="descuento" value={form.descuento} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input type="number" name="stock" required value={form.stock} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Categoría</label>
              <select name="categoria" value={form.categoria} onChange={handleChange} required>
                <option value="">Seleccionar...</option>
                <option value="Acción">Acción</option>
                <option value="RPG">RPG</option>
                <option value="Aventura">Aventura</option>
                <option value="Deportes">Deportes</option>
                <option value="Shooter">Shooter</option>
                <option value="Terror">Terror</option>
                <option value="Indie">Indie</option>
              </select>
            </div>
            <div className="form-group">
              <label>Plataforma</label>
              <select name="plataforma" value={form.plataforma} onChange={handleChange}>
                <option value="PC">PC / Steam</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="Nintendo">Nintendo</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>URL de Imagen</label>
            <input type="text" name="imagenUrl" required value={form.imagenUrl} onChange={handleChange} />
            {form.imagenUrl && (
              <div className="img-preview">
                <img 
                  src={form.imagenUrl} 
                  alt="Preview" 
                  onError={(e) => e.target.style.display = 'none'} 
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea name="descripcion" rows="4" required value={form.descripcion} onChange={handleChange}></textarea>
          </div>

          <button type="submit" className="btn-save" disabled={guardando}>
            {guardando ? 'Guardando...' : 'Actualizar Producto'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditarProducto;
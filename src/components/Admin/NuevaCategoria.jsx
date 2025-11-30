import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminForm.css';

const NuevaCategoria = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la llamada POST a /api/categorias si tuvieras la tabla
    alert(`Categoría "${nombre}" creada (Simulación)`);
    navigate('/panel-admin/categorias');
  };

  return (
    <div className="admin-container">
      <h2>Crear Categoría</h2>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
                <label>Nombre de la Categoría</label>
                <input 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" className="btn-save">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default NuevaCategoria;
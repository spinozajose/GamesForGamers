import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import './AdminTablas.css';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  // Simulamos categorías obteniéndolas de los juegos únicos
  // (En el futuro deberías tener un endpoint /api/categorias)
  useEffect(() => {
    const fetchCategorias = async () => {
        try {
            const res = await clienteAxios.get('/videojuegos');
            // Extraer categorías únicas
            const cats = [...new Set(res.data.map(j => j.category))].map((c, i) => ({ id: i, nombre: c }));
            setCategorias(cats);
        } catch (error) {
            console.error(error);
        }
    };
    fetchCategorias();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header-actions">
        <h2>Categorías</h2>
        <button 
          className="btn-add-new" 
          onClick={() => navigate('/panel-admin/categorias/nuevacategoria')}
        >
          + Nueva Categoría
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.nombre}</td>
              <td>
                <button className="btn-icon edit">✏️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categorias;
import React, { useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import './AdminTablas.css';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const respuesta = await clienteAxios.get('/usuarios');
        setUsuarios(respuesta.data);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };
    fetchUsuarios();
  }, []);

  const toggleAdmin = async (usuario) => {
    if(!window.confirm(`¿Cambiar permisos de admin para ${usuario.nombreUsuario}?`)) return;
    
    try {
      const usuarioActualizado = { ...usuario, permisosAdmin: !usuario.permisosAdmin };
      // Ojo: asegúrate de enviar la contraseña o manejarlo en el backend para que no se borre/encripte doble
      await clienteAxios.put(`/usuarios/${usuario.id}`, usuarioActualizado);
      
      setUsuarios(usuarios.map(u => u.id === usuario.id ? usuarioActualizado : u));
    } catch (error) {
      alert("Error al actualizar permisos");
    }
  };

  if (cargando) return <div className="admin-loading">Cargando usuarios...</div>;

  return (
    <div className="admin-container">
      <h2>Usuarios Registrados</h2>
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nombreUsuario}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.permisosAdmin ? 'bg-success' : 'bg-primary'}`}>
                    {user.permisosAdmin ? 'ADMIN' : 'USER'}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn-icon"
                    onClick={() => toggleAdmin(user)}
                    title="Cambiar Rol"
                  >
                    🔑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuarios;
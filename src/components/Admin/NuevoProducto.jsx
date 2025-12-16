import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Agregué useNavigate para redirección más suave
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// IMPORTANTE: Tu configuración de Axios
import clienteAxios from '../../config/axios'; 

function NuevoProducto() {
    const navigate = useNavigate();

    // 1. Estado del formulario
    const [producto, setProducto] = useState({
        titulo: '',
        creador: '',
        precio: '',
        descuento: 0,
        stock: '',
        categoria: '',
        plataforma: 'PC / Steam',
        imagenUrl: '',
        descripcion: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    // 2. Envío al Backend
    const handleGuardar = async (e) => {
        e.preventDefault();
        
        if (!producto.titulo || !producto.precio || !producto.descripcion) {
            alert("Por favor completa Título, Precio y Descripción.");
            return;
        }

        try {
            // USAMOS clienteAxios: 
            // Esto envía a: http://TU_IP/api/videojuegos
            const response = await clienteAxios.post('/videojuegos', producto);

            if (response.status === 200 || response.status === 201) {
                alert("¡Producto creado con éxito!");
                navigate('/panel-admin/productos'); // Redirección SPA
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al guardar. Verifica la conexión.");
        }
    };

    return (
        <div className="container-fluid fade-in">
            {/* ESTILOS (Dark Mode / Neon) */}
            <style>{`
                .form-container-card { background: rgba(30, 30, 50, 0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 16px; padding: 2rem; }
                .custom-input, .custom-select { background: rgba(15, 12, 30, 0.8) !important; border: 1px solid rgba(255, 255, 255, 0.1); color: #e0e0e0 !important; padding: 10px 15px; border-radius: 8px; }
                .custom-input:focus, .custom-select:focus { background: rgba(20, 20, 40, 1) !important; border-color: #00f2ff; outline: none; }
                .custom-label { color: rgba(255, 255, 255, 0.7); margin-bottom: 8px; font-weight: 600; }
                .btn-neon-save { background: linear-gradient(45deg, #00f2ff, #0099ff); border: none; color: #000; font-weight: 800; padding: 12px 30px; border-radius: 8px; width: 100%; transition: 0.3s;}
                .btn-neon-save:hover { box-shadow: 0 0 15px rgba(0, 242, 255, 0.4); transform: scale(1.02); color: white; }
                .ck-editor__editable { background-color: rgba(15, 12, 30, 0.8) !important; color: #e0e0e0 !important; min-height: 200px; }
                .ck.ck-editor__main>.ck-editor__editable { background: #1a1a2e !important; color: white !important; }
                .fade-in { animation: fadeIn 0.5s ease-in-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>

            <div className="dashboard-welcome d-flex justify-content-between align-items-center mb-4">
                <h1>
                    <Link to="/panel-admin/productos" className="text-decoration-none me-3" style={{color: '#00f2ff'}}>
                        <i className="bi bi-arrow-left-circle"></i>
                    </Link>
                    Nuevo Producto
                </h1>
            </div>

            <div className="form-container-card">
                <form onSubmit={handleGuardar}>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <label className="custom-label">Título del Juego</label>
                            <input type="text" className="form-control custom-input" name="titulo" value={producto.titulo} onChange={handleChange} placeholder="Ej: Cyberpunk 2077" required />
                        </div>
                        <div className="col-md-6">
                            <label className="custom-label">Desarrollador</label>
                            <input type="text" className="form-control custom-input" name="creador" value={producto.creador} onChange={handleChange} placeholder="Ej: CD Projekt Red" />
                        </div>
                        <div className="col-md-4">
                            <label className="custom-label">Precio (CLP)</label>
                            <input type="number" className="form-control custom-input" name="precio" value={producto.precio} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <label className="custom-label">Descuento (%)</label>
                            <input type="number" className="form-control custom-input" name="descuento" value={producto.descuento} onChange={handleChange} />
                        </div>
                        <div className="col-md-4">
                            <label className="custom-label">Stock</label>
                            <input type="number" className="form-control custom-input" name="stock" value={producto.stock} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="custom-label">Categoría</label>
                            <select className="form-select custom-select" name="categoria" value={producto.categoria} onChange={handleChange} required>
                                <option value="" disabled>Seleccionar...</option>
                                <option value="Aventura">Aventura</option>
                                <option value="RPG">RPG</option>
                                <option value="Shooter">Shooter</option>
                                <option value="Estrategia">Estrategia</option>
                                <option value="Deportes">Deportes</option>
                                <option value="Terror">Terror</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="custom-label">Plataforma</label>
                            <select className="form-select custom-select" name="plataforma" value={producto.plataforma} onChange={handleChange}>
                                <option value="PC / Steam">PC / Steam</option>
                                <option value="PlayStation 5">PlayStation 5</option>
                                <option value="Xbox Series X">Xbox Series X</option>
                                <option value="Nintendo Switch">Nintendo Switch</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label className="custom-label">URL de Imagen</label>
                            <input type="text" className="form-control custom-input" name="imagenUrl" value={producto.imagenUrl} onChange={handleChange} placeholder="https://..." />
                        </div>
                        <div className="col-12">
                            <label className="custom-label">Descripción Detallada</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={producto.descripcion}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setProducto({ ...producto, descripcion: data });
                                }}
                                config={{ placeholder: 'Describe la historia, requisitos y detalles del juego...' }}
                            />
                        </div>
                        <div className="col-12 mt-4">
                            <button type="submit" className="btn-neon-save">
                                <i className="bi bi-save me-2"></i> Guardar Producto
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NuevoProducto;
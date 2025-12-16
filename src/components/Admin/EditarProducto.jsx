import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// IMPORTANTE: Tu configuración de Axios
import clienteAxios from '../../config/axios';

function EditarProducto() {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [cargando, setCargando] = useState(true);

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

    // 1. Cargar datos (GET)
    useEffect(() => {
        const obtenerJuego = async () => {
            try {
                // Axios llama a: http://TU_IP/api/videojuegos/{id}
                const response = await clienteAxios.get(`/videojuegos/${id}`);
                const data = response.data;
                
                // Mapeo inteligente (DTO Backend -> Estado Frontend)
                setProducto({
                    titulo: data.name || data.titulo || '',
                    creador: data.creador || '',
                    precio: data.price || data.precio || '',
                    descuento: data.discount || data.descuento || 0,
                    stock: data.stock || '',
                    categoria: data.category || data.categoria || '',
                    plataforma: data.plataformas || data.plataforma || 'PC / Steam',
                    imagenUrl: data.image || data.imagenUrl || '',
                    descripcion: data.description || data.descripcion || ''
                });

            } catch (error) {
                console.error("Error al cargar:", error);
                alert("No se pudo cargar el juego.");
                navigate('/panel-admin/productos');
            } finally {
                setCargando(false);
            }
        };
        obtenerJuego();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    // 2. Actualizar (PUT)
    const handleActualizar = async (e) => {
        e.preventDefault();
        
        try {
            // Axios llama a: PUT http://TU_IP/api/videojuegos/{id}
            await clienteAxios.put(`/videojuegos/${id}`, producto);

            alert("¡Producto actualizado con éxito!");
            navigate('/panel-admin/productos');
            
        } catch (error) {
            console.error(error);
            alert("Error al actualizar. Verifica la conexión.");
        }
    };

    if (cargando) {
        return <div className="text-white p-5 text-center"><h2>Cargando datos...</h2></div>;
    }

    return (
        <div className="container-fluid fade-in">
            {/* ESTILOS (Mismos que NuevoProducto, pero botón naranja) */}
            <style>{`
                .form-container-card { background: rgba(30, 30, 50, 0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 16px; padding: 2rem; }
                .custom-input, .custom-select { background: rgba(15, 12, 30, 0.8) !important; border: 1px solid rgba(255, 255, 255, 0.1); color: #e0e0e0 !important; padding: 10px 15px; border-radius: 8px; }
                .custom-input:focus, .custom-select:focus { background: rgba(20, 20, 40, 1) !important; border-color: #00f2ff; outline: none; }
                .custom-label { color: rgba(255, 255, 255, 0.7); margin-bottom: 8px; font-weight: 600; }
                .btn-neon-update { background: linear-gradient(45deg, #f59e0b, #d97706); border: none; color: #fff; font-weight: 800; padding: 12px 30px; border-radius: 8px; width: 100%; transition: 0.3s; }
                .btn-neon-update:hover { box-shadow: 0 0 15px rgba(245, 158, 11, 0.4); transform: scale(1.02); }
                .img-preview { max-width: 100px; margin-top: 10px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.2); }
                .ck-editor__editable { background-color: rgba(15, 12, 30, 0.8) !important; color: #e0e0e0 !important; min-height: 200px; }
                .ck.ck-editor__main>.ck-editor__editable { background: #1a1a2e !important; color: white !important; }
                .fade-in { animation: fadeIn 0.5s ease-in-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>

            <div className="dashboard-welcome d-flex justify-content-between align-items-center mb-4">
                <h1>
                    <Link to="/panel-admin/productos" className="text-decoration-none me-3" style={{color: '#f59e0b'}}>
                        <i className="bi bi-arrow-left-circle"></i>
                    </Link>
                    Editar Producto <span style={{fontSize:'0.6em', opacity: 0.5}}>#{id}</span>
                </h1>
            </div>

            <div className="form-container-card">
                <form onSubmit={handleActualizar}>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <label className="custom-label">Título del Juego</label>
                            <input type="text" className="form-control custom-input" name="titulo" value={producto.titulo} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="custom-label">Desarrollador</label>
                            <input type="text" className="form-control custom-input" name="creador" value={producto.creador} onChange={handleChange} />
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
                            <div className="d-flex gap-3 align-items-center">
                                <input type="text" className="form-control custom-input" name="imagenUrl" value={producto.imagenUrl} onChange={handleChange} style={{flex: 1}} />
                                {producto.imagenUrl && (
                                    <img src={producto.imagenUrl} alt="Vista previa" className="img-preview" onError={(e) => e.target.style.display = 'none'} />
                                )}
                            </div>
                        </div>
                        <div className="col-12">
                            <label className="custom-label">Descripción Detallada</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={producto.descripcion || ''} 
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setProducto({ ...producto, descripcion: data });
                                }}
                            />
                        </div>
                        <div className="col-12 mt-4">
                            <button type="submit" className="btn-neon-update">
                                <i className="bi bi-pencil-square me-2"></i> Actualizar Producto
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditarProducto;
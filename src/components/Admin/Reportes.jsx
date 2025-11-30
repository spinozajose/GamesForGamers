import React from 'react';
import './AdminTablas.css';

const Reportes = () => {
  return (
    <div className="admin-container">
      <div className="admin-header-actions">
        <h2>Reportes y Analíticas</h2>
        <div className="d-flex gap-2">
            <button className="btn-icon" title="Descargar CSV">📥</button>
            <button className="btn-icon" title="Imprimir">🖨️</button>
        </div>
      </div>
      
      {/* Grid de KPIs (Indicadores Clave) */}
      <div className="report-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        
        <div className="report-card" style={{ background: 'rgba(30, 30, 50, 0.6)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '5rem', opacity: '0.05', transform: 'rotate(15deg)' }}>🏆</div>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '1px', margin: '0' }}>Producto Estrella</h3>
            <p style={{ fontSize: '1.8rem', color: '#00ff88', fontWeight: '800', margin: '10px 0 5px 0' }}>Elden Ring</p>
            <small style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' }}>45 unidades vendidas este mes</small>
        </div>

        <div className="report-card" style={{ background: 'rgba(30, 30, 50, 0.6)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '5rem', opacity: '0.05', transform: 'rotate(15deg)' }}>💰</div>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '1px', margin: '0' }}>Ingresos Mensuales</h3>
            <p style={{ fontSize: '1.8rem', color: '#00f2ff', fontWeight: '800', margin: '10px 0 5px 0' }}>$2.450.000</p>
            <small style={{ color: '#00ff88', fontSize: '0.85rem' }}>▲ +15% vs mes anterior</small>
        </div>

        <div className="report-card" style={{ background: 'rgba(30, 30, 50, 0.6)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '5rem', opacity: '0.05', transform: 'rotate(15deg)' }}>👥</div>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '1px', margin: '0' }}>Tasa de Conversión</h3>
            <p style={{ fontSize: '1.8rem', color: '#ff0055', fontWeight: '800', margin: '10px 0 5px 0' }}>3.2%</p>
            <small style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' }}>Visitas a Compras</small>
        </div>

      </div>
      
      {/* Sección de Gráficos (Placeholder Visual) */}
      <div className="charts-section" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Gráfico Principal */}
        <div style={{ background: 'rgba(30, 30, 50, 0.4)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Rendimiento de Ventas (Anual)</h3>
            <div style={{ height: '250px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '10px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                {/* Barras simuladas con CSS */}
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 100].map((h, i) => (
                    <div key={i} style={{ width: '100%', height: `${h}%`, background: 'linear-gradient(to top, rgba(0, 242, 255, 0.2), rgba(0, 242, 255, 0.8))', borderRadius: '4px 4px 0 0', position: 'relative', transition: 'height 1s ease' }}></div>
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: '10px' }}>
                <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span><span>Jul</span><span>Ago</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dic</span>
            </div>
        </div>

        {/* Lista Lateral */}
        <div style={{ background: 'rgba(30, 30, 50, 0.4)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Categorías Top</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1.2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                        <span style={{ color: '#e0e0e0' }}>RPG</span>
                        <span style={{ color: '#00ff88' }}>45%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                        <div style={{ width: '45%', height: '100%', background: '#00ff88', borderRadius: '3px' }}></div>
                    </div>
                </li>
                <li style={{ marginBottom: '1.2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                        <span style={{ color: '#e0e0e0' }}>Acción</span>
                        <span style={{ color: '#00f2ff' }}>30%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                        <div style={{ width: '30%', height: '100%', background: '#00f2ff', borderRadius: '3px' }}></div>
                    </div>
                </li>
                <li style={{ marginBottom: '1.2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                        <span style={{ color: '#e0e0e0' }}>Deportes</span>
                        <span style={{ color: '#ff0055' }}>15%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                        <div style={{ width: '15%', height: '100%', background: '#ff0055', borderRadius: '3px' }}></div>
                    </div>
                </li>
                <li>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                        <span style={{ color: '#e0e0e0' }}>Otros</span>
                        <span style={{ color: '#ffbb33' }}>10%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                        <div style={{ width: '10%', height: '100%', background: '#ffbb33', borderRadius: '3px' }}></div>
                    </div>
                </li>
            </ul>
        </div>

      </div>
    </div>
  );
};

export default Reportes;
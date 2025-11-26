import React from "react";
import { useNavigate } from "react-router-dom";
import "./Inicio.css";

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      
      {/* Fondo animado exclusivo del Home */}
      <div className="home-background-effect"></div>

      {/* Contenedor Principal */}
      <div className="home-content">
        
        {/* SECCIÓN 1: HERO (Título y Bienvenida) */}
        <section className="hero-header">
          <h1 className="main-title">
            GAMES<span className="text-gradient">FOR</span>GAMERS
          </h1>
          <p className="hero-tagline">
            Tu nexo digital para <span className="highlight">claves</span>, <span className="highlight">ofertas</span> y <span className="highlight">lanzamientos</span>.
          </p>
        </section>

        {/* SECCIÓN 2: HUB DE NAVEGACIÓN (Tarjetas Principales) */}
        <section className="navigation-hub">
          
          {/* Tarjeta Catálogo */}
          <div className="hub-card card-catalog" onClick={() => navigate("/catalogo")}>
            <div className="card-bg"></div>
            <div className="card-content">
              <div className="card-icon">🕹️</div>
              <h2>Catálogo</h2>
              <p>Explora nuestra biblioteca completa de títulos digitales.</p>
              <span className="card-action">Ver Juegos &rarr;</span>
            </div>
          </div>

          {/* Tarjeta Ofertas (Destacada) */}
          <div className="hub-card card-offers" onClick={() => navigate("/ofertas")}>
            <div className="card-bg"></div>
            <div className="corner-badge">HOT</div>
            <div className="card-content">
              <div className="card-icon">🔥</div>
              <h2>Ofertas</h2>
              <p>Descuentos relámpago y precios imbatibles.</p>
              <span className="card-action">Ahorrar Ahora &rarr;</span>
            </div>
          </div>

          {/* Tarjeta Precompras */}
          <div className="hub-card card-preorder" onClick={() => navigate("/precompras")}>
            <div className="card-bg"></div>
            <div className="card-content">
              <div className="card-icon">🚀</div>
              <h2>Precompras</h2>
              <p>Asegura los lanzamientos más esperados del año.</p>
              <span className="card-action">Reservar &rarr;</span>
            </div>
          </div>

        </section>

        {/* SECCIÓN 3: ESTADÍSTICAS (Footer visual del Home) */}
        <section className="stats-strip">
          <div className="stat-box">
            <span className="stat-num">+500</span>
            <span className="stat-label">Juegos</span>
          </div>
          <div className="divider"></div>
          <div className="stat-box">
            <span className="stat-num">24/7</span>
            <span className="stat-label">Entrega Inmediata</span>
          </div>
          <div className="divider"></div>
          <div className="stat-box">
            <span className="stat-num">100%</span>
            <span className="stat-label">Seguro</span>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Inicio;
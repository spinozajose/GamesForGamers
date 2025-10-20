import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/PanelAdmin.css';

function Reportes() {
  return (


<div>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content />
  <title>Tienda | Administrador</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3" />
  {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous"> */}
  <link href="/assets/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossOrigin="anonymous" />
  {/* Custom styles for this template */}
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.min.css" rel="stylesheet" />
  {/* Custom styles for this template */}
  <link href="/assets/admin/dashboard.css" rel="stylesheet" />
  <style dangerouslySetInnerHTML={{__html: "\n        a.nav-link.nav-menu.nav-active {\n            background-color: #0d6efd;\n            /* Color de fondo azul primario de Bootstrap */\n            color: white !important;\n            /* Texto en blanco */\n            border-radius: 50rem;\n            /* Bordes redondeados para darle forma de píldora */\n            padding: 0.375rem 0.75rem;\n            /* Relleno consistente con los enlaces de Bootstrap */\n            display: inline-flex;\n            /* Asegurar alineación de ícono y texto */\n            align-items: center;\n            gap: 0.5rem;\n            /* Espaciado entre ícono y texto */\n            text-decoration: none;\n            /* Sin subrayado */\n\n        }\n\n        a.nav-link.nav-menu {\n            color: #000000;\n        }\n\n        .bi {\n            vertical-align: -.125em;\n            fill: currentColor;\n        }\n\n        .user-img {\n            width: 50px;\n            height: 50px;\n            object-fit: cover;\n            border-radius: 50%;\n        }\n\n        .popover-body {\n            padding: 0.5rem;\n        }\n\n      \n    " }} />
  <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
    <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="/#">Company name</a>
    <ul className="navbar-nav flex-row d-md-none">
      <li className="nav-item text-nowrap">
        <button className="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <i className="bi bi-list" />
        </button>
      </li>
    </ul>
    <div id="navbarSearch" className="navbar-search w-100 collapse">
      <input className="form-control w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" />
    </div>
  </header>
  <div className="container-fluid">
    <div className="row">
      {/* ***************** */}
      {/*        MENU       */}
      {/* ***************** */}
      <div className="sidebar border-right col-md-3 col-lg-2 p-0 custom-sidebar" >
        <div className="offcanvas-md offcanvas-start custom-sidebar" tabIndex={-1} id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close" />
          </div>
          <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
            <ul className="nav flex-column">
              <li className="nav-item mx-2">
                              <Link to="/admin" className="nav-link nav-menu d-flex gap-2">
              +                  <i className="bi bi-house-fill" />
              +                  Dashboard
              +                </Link>
                            </li>
                            <li className="nav-item mx-2">
                              <Link className="nav-link nav-menu d-flex gap-2" to="/admin/ordenes">
                                <i className="bi bi-file-earmark" />
                                Ordenes
                              </Link>
                            </li>
                            <li className="nav-item mx-2">
                              <Link className="nav-link nav-menu d-flex gap-2" to="/admin/Productos">
                                <i className="bi bi-cart" />
                                Productos
                              </Link>
                            </li>
                            <li className="nav-item mx-2">
                              <Link className="nav-link nav-menu d-flex gap-2" to="/admin/Categorias">
                                <i className="bi bi-list-ul" />
                                Categorías
                              </Link>
                            </li>
                            <li className="nav-item mx-2">
                              <Link className="nav-link nav-menu d-flex gap-2" to="/admin/Usuarios">
                                <i className="bi bi-people" />
                                Usuarios
                              </Link>
                            </li>
                            <li className="nav-item mx-2">
                              <Link className="nav-link nav-menu d-flex gap-2 nav-active" to="/admin/Reportes">
                                <i className="bi bi-graph-up" />
                                Reportes
                              </Link>
                            </li>
                          </ul>
                          <hr className="my-3" />
                          <ul className="nav flex-column mb-auto">
                            <li className="nav-item mx-2">
                              <a className="nav-link nav-menu d-flex gap-2" href="/admin/perfil/index.html">
                                <i className="bi bi-person-circle" />
                                Perfil
                              </a>
                            </li>
                          </ul>
                          <hr className="my-3" />
                          <ul className="nav flex-column mb-auto">
                            <li className="nav-item mt-2 mx-2">
                              <a className="mx-4 text-center d-flex gap-2 btn btn-dark" href="/">
                                <i className="bi bi-shop" />
                                <strong>Tienda</strong>
                              </a>
                            </li>
                            <li className="nav-item mt-2 mx-2">
                              <a className="mx-4 text-center d-flex gap-2 btn btn-danger" href="/iniciar-sesion.html">
                                <i className="bi bi-door-closed" />
                                Cerrar Sesión
                              </a>
                            </li>
                          </ul>
          </div>
        </div>
      </div>
      {/* ***************** */}
      {/*        MENU       */}
      {/* ***************** */}
      {/* ***************** */}
      {/* contenido interno */}
      {/* ***************** */}
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="mt-4">
          <h4 className="card-title">Reportes</h4>
          <p className="card-text">Explora nuestros reportes detallados que ofrecen una visión integral del rendimiento empresarial, tendencias de mercado y segmentación de clientes.</p>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h4>1. Gráfico de Barras: Ventas Mensuales</h4>
                  <small>Este gráfico muestra las ventas mensuales para el primer semestre del año. Proporciona una visión clara de las fluctuaciones en las ventas, identificando los meses con mejor y peor rendimiento.</small>
                  <canvas id="barChart" />
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h4>2. Gráfico de Líneas: Crecimiento de Usuarios</h4>
                  <small>Este gráfico de líneas representa el crecimiento de usuarios a lo largo de seis meses. Muestra tendencias en la adquisición de nuevos usuarios y permite analizar el impacto de campañas de marketing.</small>
                  <canvas id="lineChart" />
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h4>3. Gráfico Circular: Distribución de Productos</h4>
                  <small>El gráfico circular muestra la distribución de ventas entre diferentes categorías de productos. Permite identificar qué categoría es la más popular entre los consumidores.</small>
                  <canvas id="pieChart" />
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h4>4. Gráfico de Radar: Evaluación de Proyectos</h4>
                  <small>Este gráfico de radar evalúa el desempeño de un proyecto en varias etapas: planificación, ejecución, entrega y evaluación. Ayuda a visualizar áreas de fortaleza y mejora.</small>
                  <canvas id="radarChart" />
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h4>5. Gráfico de Donut: Segmentación de Clientes</h4>
                  <small>El gráfico de donut representa la segmentación de clientes en categorías como nuevos, recurrentes y perdidos. Ofrece insights sobre la lealtad del cliente y efectividad de retención.</small>
                  <canvas id="doughnutChart" />
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h4>6. Gráfico de Polar Area: Popularidad de Marcas</h4>
                  <small>Este gráfico de área polar compara la popularidad de diferentes marcas dentro de un mercado. Muestra cómo los consumidores perciben cada marca en términos de reconocimiento.</small>
                  <canvas id="polarAreaChart" />
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h4>7. Gráfico de Dispersión: Análisis de Mercado</h4>
                  <small>El gráfico de dispersión analiza el mercado en términos de correlación entre dos variables, como precio y demanda, para identificar patrones o relaciones.</small>
                  <canvas id="scatterChart" />
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h4>8. Gráfico de Burbujas: Evaluación de Riesgos</h4>
                  <small>Este gráfico de burbujas evalúa diferentes riesgos potenciales en proyectos. El tamaño de cada burbuja representa la magnitud del riesgo, mientras que la posición indica probabilidad e impacto.</small>
                  <canvas id="bubbleChart" />
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h4>9. Gráfico de Barras Apiladas: Producción Anual</h4>
                  <small>El gráfico de barras apiladas presenta la producción anual de diferentes productos. Ayuda a identificar tendencias de producción y contribuciones relativas de cada producto.</small>
                  <canvas id="stackedBarChart" />
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h4>10. Gráfico de Línea Apilada: Ingresos vs Gastos</h4>
                  <small>Este gráfico de línea apilada compara ingresos y gastos anuales, visualizando cómo se relacionan estas métricas para ayudar a evaluar la salud financiera.</small>
                  <canvas id="stackedLineChart" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</div>
    );
}
export default Reportes;

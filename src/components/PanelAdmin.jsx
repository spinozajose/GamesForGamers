import React from 'react';
import '../assets/css/PanelAdmin.css';


function PanelAdmin() {
  return (


<div className="panel-admin">
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
  <style dangerouslySetInnerHTML={{__html: "\n        a.nav-link.nav-menu.nav-active {\n  background-color: #0d6efd; /* Color de fondo azul primario de Bootstrap */\n            color: white !important;              /* Texto en blanco */\n            border-radius: 50rem;       /* Bordes redondeados para darle forma de píldora */\n            padding: 0.375rem 0.75rem; /* Relleno consistente con los enlaces de Bootstrap */\n            display: inline-flex;      /* Asegurar alineación de ícono y texto */\n            align-items: center;\n            gap: 0.5rem;               /* Espaciado entre ícono y texto */\n            text-decoration: none;     /* Sin subrayado */\n            \n        }\n\n        a.nav-link.nav-menu {\n            color: #000000;\n        }\n\n        .bi {\n            vertical-align: -.125em;\n            fill: currentColor;\n        }\n\n        .dashboard-card {\n            transition: transform 0.2s, box-shadow 0.2s;\n            border-radius: 8px;\n        }\n\n        .dashboard-card:hover {\n            transform: translateY(-5px);\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        }\n\n        .dashboard-icon {\n            font-size: 3rem;\n            opacity: 0.7;\n        }\n\n        .dashboard-section {\n            margin-top: 20px;\n        }\n\n        .card-primary {\n            background-color: #0d6efd; /* Bootstrap primary color */\n        }\n\n        .card-success {\n            background-color: #198754; /* Bootstrap success color */\n        }\n\n        .card-warning {\n            background-color: #ffc107; /* Bootstrap warning color */\n        }\n\n        .card-icon {\n            font-size: 2rem;\n            color: #007bff;\n        }\n\n        \n        .card-item {\n            transition: box-shadow 0.3s ease; /* Suaviza la transición de la sombra */\n        }\n        .card-item:hover {\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra al pasar el mouse */\n            cursor: pointer;\n        }\n\n    " }} />
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
      <div className="sidebar border-right col-md-3 col-lg-2 p-0 custom-sidebar">
        <div className="offcanvas-md offcanvas-start custom-sidebar" tabIndex={-1} id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close" />
          </div>
          <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
            <ul className="nav flex-column">
              <li className="nav-item mx-2">
                <a href="/admin/index.html" className="nav-link nav-menu d-flex gap-2 nav-active">
                  <i className="bi bi-house-fill" />
                  Dashboard
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link nav-menu d-flex gap-2" href="/admin/ordenes/index.html">
                  <i className="bi bi-file-earmark" />
                  Ordenes
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link nav-menu d-flex gap-2" href="/admin/producto/index.html">
                  <i className="bi bi-cart" />
                  Productos
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link nav-menu d-flex gap-2" href="/admin/categoria/index.html">
                  <i className="bi bi-list-ul" />
                  Categorías
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link nav-menu d-flex gap-2" href="/admin/usuario/index.html">
                  <i className="bi bi-people" />
                  Usuarios
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link nav-menu d-flex gap-2" href="/admin/reporte/index.html">
                  <i className="bi bi-graph-up" />
                  Reportes
                </a>
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
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mb-3">
        <div className="mt-4">
          <h4 className="card-title">Dashboard</h4>
          <p className="card-text">Resumen de las actividades diarias</p>
          <div className="container dashboard-section mb-3">
            <div className="row g-4">
              <div className="col-6 col-md-4">
                <div className="card text-white dashboard-card ">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="dashboard-icon">
                        <i className="bi bi-cart-fill" />
                      </div>
                      <div className="ms-5">
                        <h5 className="card-title">Compras</h5>
                        <h3 className="card-text">1,234</h3>
                      </div>
                    </div>
                    <p className="card-text text-center mt-3">Probabilidad de aumento: <strong>20%</strong></p>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="card text-white dashboard-card ">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="dashboard-icon">
                        <i className="bi bi-box-seam" />
                      </div>
                      <div className="ms-5">
                        <h5 className="card-title">Productos</h5>
                        <h3 className="card-text">400</h3>
                      </div>
                    </div>
                    <p className="card-text text-center mt-3">Inventario actual: <strong>500</strong></p>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="card text-white dashboard-card ">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="dashboard-icon">
                        <i className="bi bi-people-fill" />
                      </div>
                      <div className="ms-5">
                        <h5 className="card-title">Usuarios</h5>
                        <h3 className="card-text">890</h3>
                      </div>
                    </div>
                    <p className="card-text text-center mt-3">Nuevos usuarios este mes: <strong>120</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-3">
            <div className="row row-cols-2 row-cols-md-4 g-4">
              {/* Dashboard Card */}
              <div className="col">
                <div className="card h-100 card-item">
                  <div className="card-body text-center">
                    <i className="bi bi-speedometer2 card-icon" />
                    <h5 className="card-title mt-3">Dashboard</h5>
                    <p className="card-text">Visión general de todas las métricas y estadísticas clave del sistema.</p>
                  </div>
                </div>
              </div>
              {/* Ordenes Card */}
              <div className="col">
                <div className="card h-100 card-item">
                  <div className="card-body text-center">
                    <i className="bi bi-cart-check card-icon" />
                    <h5 className="card-title mt-3">Órdenes</h5>
                    <p className="card-text">Gestión y seguimiento de todas las órdenes de compra realizadas.</p>
                  </div>
                </div>
              </div>
              {/* Productos Card */}
              <div className="col">
                <div className="card h-100 card-item">
                  <div className="card-body text-center">
                    <i className="bi bi-box-seam card-icon" />
                    <h5 className="card-title mt-3">Productos</h5>
                    <p className="card-text">Administrar inventario y detalles de los productos disponibles.</p>
                  </div>
                </div>
              </div>
              {/* Categorías Card */}
              <div className="col">
                <div className="card h-100 card-item">
                  <div className="card-body text-center">
                    <i className="bi bi-tags card-icon" />
                    <h5 className="card-title mt-3">Categorías</h5>
                    <p className="card-text">Organizar productos en categorías para facilitar su navegación.</p>
                  </div>
                </div>
              </div>
              {/* Usuarios Card */}
              <div className="col">
                <div className="card h-100 card-item">
                  <div className="card-body text-center">
                    <i className="bi bi-people card-icon" />
                    <h5 className="card-title mt-3">Usuarios</h5>
                    <p className="card-text">Gestión de cuentas de usuario y sus roles dentro del sistema.</p>
                  </div>
                </div>
              </div>
              {/* Reportes Card */}
              <div className="col">
                <div className="card h-100 card-item">
                  <div className="card-body text-center">
                    <i className="bi bi-bar-chart-line card-icon" />
                    <h5 className="card-title mt-3">Reportes</h5>
                    <p className="card-text">Generación de informes detallados sobre las operaciones del sistema.</p>
                  </div>
                </div>
              </div>
              {/* Perfil Card */}
              <div className="col">
                <div className="card h-100 card-item">
                  <div className="card-body text-center">
                    <i className="bi bi-person card-icon" />
                    <h5 className="card-title mt-3">Perfil</h5>
                    <p className="card-text">Administración de la información personal y configuraciones de cuenta.</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 card-item">
                  <div className="card-body text-center">
                    <i className="bi bi-shop card-icon" />
                    <h5 className="card-title mt-3">Tienda</h5>
                    <p className="card-text">Visualiza tu tienda en tiempo real, visualiza los reportes de los usuarios.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* ***************** */}
      {/* contenido interno */}
      {/* ***************** */}
    </div>
  </div>
</div>
    );
}
export default PanelAdmin;

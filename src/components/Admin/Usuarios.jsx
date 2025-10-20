import React from 'react';
import '../../assets/css/PanelAdmin.css';
import { Link } from 'react-router-dom';

function Usuarios() {
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
  <style dangerouslySetInnerHTML={{__html: "\n        a.nav-link.nav-menu.nav-active {\n            background-color: #0d6efd;\n            /* Color de fondo azul primario de Bootstrap */\n            color: white !important;\n            /* Texto en blanco */\n            border-radius: 50rem;\n            /* Bordes redondeados para darle forma de píldora */\n            padding: 0.375rem 0.75rem;\n            /* Relleno consistente con los enlaces de Bootstrap */\n            display: inline-flex;\n            /* Asegurar alineación de ícono y texto */\n            align-items: center;\n            gap: 0.5rem;\n            /* Espaciado entre ícono y texto */\n            text-decoration: none;\n            /* Sin subrayado */\n\n        }\n\n        a.nav-link.nav-menu {\n            color: #000000;\n        }\n\n        .bi {\n            vertical-align: -.125em;\n            fill: currentColor;\n        }\n\n        .user-img {\n            width: 50px;\n            height: 50px;\n            object-fit: cover;\n            border-radius: 50%;\n        }\n\n        .popover-body {\n            padding: 0.5rem;\n        }\n    " }} />
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
      <div className="sidebar  border-right col-md-3 col-lg-2 p-0 custom-sidebar" >
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
                              <Link className="nav-link nav-menu d-flex gap-2 nav-active" to="/admin/Usuarios">
                                <i className="bi bi-people" />
                                Usuarios
                              </Link>
                            </li>
                            <li className="nav-item mx-2">
                              <Link className="nav-link nav-menu d-flex gap-2" to="/admin/Reportes">
                                <i className="bi bi-graph-up" />
                                Reportes
                              </Link>
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
                              <Link className="mx-4 text-center d-flex gap-2 btn btn-danger" to="/login">
                                <i className="bi bi-door-closed" />
                                Cerrar Sesión
                              </Link>
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
          <h4 className="card-title">Usuarios</h4>
          <p className="card-text">Listado de usuarios</p>
          {/* <h2>Section title</h2> */}
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link nav-menu active" aria-current="page" href="/admin/usuario/index.html">Listado de usuarios</a>
            </li>
            {/* <li class="nav-item dropdown">
                      <a class="nav-link nav-menu dropdown-toggle" data-bs-toggle="dropdown" href="/#" role="button"
                          aria-expanded="false">Dropdown</a>
                      <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="/#">Action</a></li>
                          <li><a class="dropdown-item" href="/#">Another action</a></li>
                          <li><a class="dropdown-item" href="/#">Something else here</a></li>
                          <li>
                              <hr class="dropdown-divider">
                          </li>
                          <li><a class="dropdown-item" href="/#">Separated link</a></li>
                      </ul>
                  </li> */}
          </ul>
          <div className="card text-start">
            <div className="card-body">
              <div className="table-responsive small">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Imagen</th>
                      <th scope="col">Nombre Completo</th>
                      <th scope="col">Correo Electrónico</th>
                      <th scope="col">Teléfono</th>
                      <th scope="col">Tipo</th>
                    </tr>
                  </thead>
                  <tbody id="userTableBody">
                    {/* Usuario estático en HTML */}
                    <tr>
                      <th scope="row">998</th>
                      <td><img src="/assets/img/Luna.png" alt="Usuario 1" className="user-img" /></td>
                      <td><a href="/admin/usuario/3312" id="userLink10000">Luna</a></td>
                      <td>luna.scrummaster@example.com</td>
                      <td />
                      <td><h6><span className="badge bg-primary">ADMINISTRADOR</span></h6></td>
                    </tr>
                    <tr>
                      <th scope="row">999</th>
                      <td><img src="/assets/img/pedro.png" alt="Usuario 1" className="user-img" /></td>
                      <td><a href="/admin/usuario/3312" id="userLink10000">Pedro Desarrollador</a></td>
                      <td>pedro.hacker@example.com</td>
                      <td>+1 (555) 111-4567</td>
                      <td><h6><span className="badge bg-success">VENDEDOR</span></h6></td>
                    </tr>
                    <tr>
                      <th scope="row">1000</th>
                      <td><img src="/assets/img/face-programador2.png" alt="Usuario 1" className="user-img" /></td>
                      <td><a href="/admin/usuario/3312" id="userLink10000">Joseph MT</a></td>
                      <td>joseph.devops@example.com</td>
                      <td>+1 (555) 556-5525</td>
                      <td><h6><span className="badge bg-warning">CLIENTE</span></h6></td>
                    </tr>
                  </tbody>
                </table>
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
export default Usuarios;

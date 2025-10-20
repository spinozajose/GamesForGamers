import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/PanelAdmin.css';

function Categorias() {
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
  <style dangerouslySetInnerHTML={{__html: "\n        a.nav-link.nav-menu.nav-active {\n            background-color: #0d6efd; /* Color de fondo azul primario de Bootstrap */\n            color: white !important;              /* Texto en blanco */\n            border-radius: 50rem;       /* Bordes redondeados para darle forma de píldora */\n            padding: 0.375rem 0.75rem; /* Relleno consistente con los enlaces de Bootstrap */\n            display: inline-flex;      /* Asegurar alineación de ícono y texto */\n            align-items: center;\n            gap: 0.5rem;               /* Espaciado entre ícono y texto */\n            text-decoration: none;     /* Sin subrayado */\n            \n        }\n\n        a.nav-link.nav-menu {\n            color: #000000;\n        }\n\n        .bi {\n            vertical-align: -.125em;\n            fill: currentColor;\n        }\n\n        .product-img {\n            width: 50px;\n            height: 50px;\n            object-fit: cover;\n            border-radius: 4px;\n        }\n    " }} />
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
                <Link className="nav-link nav-menu d-flex gap-2 nav-active" to="/admin/Categorias">
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
          <h4 className="card-title">Categorías</h4>
          <p className="card-text">Listado de categorías de los productos</p>
          {/* <h2>Section title</h2> */}
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link nav-menu active" aria-current="page" href="/admin/categoria">Listado de categorías</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-menu" to="/admin/categorias/nuevacategoria">Nueva categoría</Link>
            </li>
          </ul>
          <div className="card text-start">
            <div className="card-body">
              <div className="table-responsive small">
                <table className="table table-striped table-sm table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Imagen</th>
                      <th scope="col">Categoría</th>
                      <th scope="col">Descripción</th>
                      <th scope="col">Cantidad de Productos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td><img src="https://via.placeholder.com/50" alt="Aventura" className="category-img" /></td>
                      <td><a href="/admin/categoria/2000/index.html">Aventura</a></td>
                      <td>Juegos de exploración y aventuras en mundos abiertos.</td>
                      <td>150</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td><img src="https://via.placeholder.com/50" alt="Plataforma" className="category-img" /></td>
                      <td><a href="/admin/categoria/2000/index.html">Plataforma</a></td>
                      <td>Juegos que desafían las habilidades de salto y carrera.</td>
                      <td>90</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td><img src="https://via.placeholder.com/50" alt="RPG" className="category-img" /></td>
                      <td><a href="/admin/categoria/2000">RPG</a></td>
                      <td>Juegos de rol con historias envolventes y personajes personalizables.</td>
                      <td>200</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td><img src="https://via.placeholder.com/50" alt="Shooter" className="category-img" /></td>
                      <td><a href="/admin/categoria/2000">Shooter</a></td>
                      <td>Juegos de disparos en primera y tercera persona.</td>
                      <td>120</td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <td><img src="https://via.placeholder.com/50" alt="Simulación" className="category-img" /></td>
                      <td>Simulación</td>
                      <td>Juegos que simulan actividades de la vida real.</td>
                      <td>80</td>
                    </tr>
                    <tr>
                      <th scope="row">6</th>
                      <td><img src="https://via.placeholder.com/50" alt="Estrategia" className="category-img" /></td>
                      <td>Estrategia</td>
                      <td>Juegos que requieren planificación y táctica para ganar.</td>
                      <td>70</td>
                    </tr>
                    <tr>
                      <th scope="row">7</th>
                      <td><img src="https://via.placeholder.com/50" alt="Deportes" className="category-img" /></td>
                      <td>Deportes</td>
                      <td>Juegos que simulan deportes del mundo real.</td>
                      <td>60</td>
                    </tr>
                    <tr>
                      <th scope="row">8</th>
                      <td><img src="https://via.placeholder.com/50" alt="Carreras" className="category-img" /></td>
                      <td>Carreras</td>
                      <td>Juegos de carreras de autos y otros vehículos.</td>
                      <td>50</td>
                    </tr>
                    <tr>
                      <th scope="row">9</th>
                      <td><img src="https://via.placeholder.com/50" alt="Lucha" className="category-img" /></td>
                      <td>Lucha</td>
                      <td>Juegos de combate cuerpo a cuerpo entre personajes.</td>
                      <td>40</td>
                    </tr>
                    <tr>
                      <th scope="row">10</th>
                      <td><img src="https://via.placeholder.com/50" alt="Puzzle" className="category-img" /></td>
                      <td>Puzzle</td>
                      <td>Juegos que desafían la lógica y la resolución de problemas.</td>
                      <td>30</td>
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
export default Categorias;

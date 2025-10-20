import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/PanelAdmin.css';

function Productos() {
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
                <Link className="nav-link nav-menu d-flex gap-2 nav-active" to="/admin/Productos">
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
                <Link className="nav-link nav-menu d-flex gap-2" to="/admin/Reportes">
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
          <h4 className="card-title">Productos</h4>
          <p className="card-text">Listado de productos</p>
          {/* <h2>Section title</h2> */}
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link nav-menu active" aria-current="page" href="/admin/producto/index.html">Listado de productos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-menu" aria-current="page" href="/admin/producto/index-critico.html">Listado de productos criticos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-menu" aria-current="page" href="/admin/producto/index-formato.html">Formato tarjeta</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-menu" aria-current="page" href="/admin/producto/reporte.html">Reportes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-menu" href="/admin/producto/nuevo.html">Nuevo producto</a>
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
                      <th scope="col">Juego</th>
                      <th scope="col">Categoría</th>
                      <th scope="col">Descripción</th>
                      <th scope="col">Precio</th>
                      <th scope="col">Disponibilidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 1" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">The Legend of Zelda</a></td>
                      <td>Aventura</td>
                      <td>Juego de acción y aventura con mundo abierto.</td>
                      <td>$59.99</td>
                      <td>20/100</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 2" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">Super Mario Odyssey</a></td>
                      <td>Plataforma</td>
                      <td>Aventura de plataformas 3D en varios mundos.</td>
                      <td>$49.99</td>
                      <td>20/100</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 3" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">Minecraft</a></td>
                      <td>Sandbox</td>
                      <td>Juego de construcción y aventuras en mundo abierto.</td>
                      <td>$26.95</td>
                      <td>20/100</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 4" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">Fortnite</a></td>
                      <td>Battle Royale</td>
                      <td>Juego multijugador masivo en línea de supervivencia.</td>
                      <td>Gratis</td>
                      <td>20/100</td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 5" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">Overwatch</a></td>
                      <td>Shooter</td>
                      <td>Juego de disparos multijugador en equipo.</td>
                      <td>$19.99</td>
                      <td>Agotado</td>
                    </tr>
                    <tr>
                      <th scope="row">6</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 6" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">Red Dead Redemption 2</a></td>
                      <td>Aventura</td>
                      <td>Juego de acción y aventuras en el lejano oeste.</td>
                      <td>$59.99</td>
                      <td>20/100</td>
                    </tr>
                    <tr>
                      <th scope="row">7</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 7" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">Among Us</a></td>
                      <td>Misterio</td>
                      <td>Juego multijugador de deducción social.</td>
                      <td>$4.99</td>
                      <td>20/100</td>
                    </tr>
                    <tr>
                      <th scope="row">8</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 8" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">The Witcher 3</a></td>
                      <td>RPG</td>
                      <td>Juego de rol de acción en un mundo abierto.</td>
                      <td>$39.99</td>
                      <td>20/100</td>
                    </tr>
                    <tr>
                      <th scope="row">9</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 9" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">Animal Crossing</a></td>
                      <td>Simulación</td>
                      <td>Juego de simulación de vida en una isla.</td>
                      <td>$59.99</td>
                      <td>20/100</td>
                    </tr>
                    <tr>
                      <th scope="row">10</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 10" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">Call of Duty: Warzone</a></td>
                      <td>Shooter</td>
                      <td>Juego de disparos y estrategia multijugador.</td>
                      <td>Gratis</td>
                      <td>20/100</td>
                    </tr>
                    <tr>
                      <th scope="row">11</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 11" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">Hollow Knight</a></td>
                      <td>Plataforma</td>
                      <td>Juego de plataformas y aventuras en 2D.</td>
                      <td>$14.99</td>
                      <td>20/100</td>
                    </tr>
                    <tr>
                      <th scope="row">12</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 12" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">Dark Souls III</a></td>
                      <td>RPG</td>
                      <td>Juego de rol de acción en un entorno oscuro.</td>
                      <td>$59.99</td>
                      <td>Agotado</td>
                    </tr>
                    <tr>
                      <th scope="row">13</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 13" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">FIFA 21</a></td>
                      <td>Deportes</td>
                      <td>Simulador de fútbol con modos de juego realistas.</td>
                      <td>$49.99</td>
                      <td>20/100</td>
                    </tr>
                    <tr>
                      <th scope="row">14</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 14" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">Mortal Kombat 11</a></td>
                      <td>Lucha</td>
                      <td>Juego de lucha con gráficos avanzados.</td>
                      <td>$59.99</td>
                      <td>20/100</td>
                    </tr>
                    <tr>
                      <th scope="row">15</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 15" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">The Sims 4</a></td>
                      <td>Simulación</td>
                      <td>Juego de simulación de vida con creación de personajes.</td>
                      <td>$39.99</td>
                      <td>20/100</td>
                    </tr>
                    <tr>
                      <th scope="row">16</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 16" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">Assassin's Creed Valhalla</a></td>
                      <td>Aventura</td>
                      <td>Juego de acción y aventuras ambientado en la era vikinga.</td>
                      <td>$59.99</td>
                      <td>20/100</td>
                    </tr>
                    <tr>
                      <th scope="row">17</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 17" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">Cuphead</a></td>
                      <td>Plataforma</td>
                      <td>Juego de plataformas inspirado en dibujos animados.</td>
                      <td>$19.99</td>
                      <td>20/100</td>
                    </tr>
                    <tr>
                      <th scope="row">18</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 18" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">Star Wars Jedi: Fallen Order</a></td>
                      <td>Aventura</td>
                      <td>Juego de acción y aventuras en el universo Star Wars.</td>
                      <td>$39.99</td>
                      <td>Agotado</td>
                    </tr>
                    <tr>
                      <th scope="row">19</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 19" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">Ghost of Tsushima</a></td>
                      <td>Aventura</td>
                      <td>Juego de acción y aventuras ambientado en el Japón feudal.</td>
                      <td>$59.99</td>
                      <td>20/100</td>
                    </tr>
                    <tr>
                      <th scope="row">20</th>
                      <td><img src="https://via.placeholder.com/50" alt="Juego 20" className="product-img" /></td>
                      <td><a href="/admin/producto/1000">Cyberpunk 2077</a></td>
                      <td>RPG</td>
                      <td>Juego de rol y acción en un futuro distópico.</td>
                      <td>$59.99</td>
                      <td>20/100</td>
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
export default Productos;

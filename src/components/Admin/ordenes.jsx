import React from 'react';
import "./PanelAdmin.css";
import { Link } from 'react-router-dom';

function Ordenes() {
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
      <div className="sidebar border-right col-md-3 col-lg-2 p-0 custom-sidebar">
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
                              <Link className="nav-link nav-menu d-flex gap-2 nav-active" to="/admin/ordenes">
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
      <main className="col-md-9 ms-sm-auto col-lg-10 ">
        <div className="mt-4">
          <h4 className="card-title">Ordenes de compra</h4>
          <p className="card-text">Listado de todas las boletas emitidas.</p>
          {/* <ul class="nav nav-tabs">
                  <li class="nav-item">
                      <a class="nav-link nav-menu active" aria-current="page" href="/admin/producto/index.html">Ordenes</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link nav-menu" aria-current="page" href="/admin/producto/index-critico.html">Listado de productos criticos</a>
                  </li>
              </ul> */}
          <div className="card text-start table-card">
            <div className="card-body">
              <div className="table-responsive small">
                <table className="table table-striped table-sm table-hover custom-table">
                  <thead>
                    <tr>
                      <th>ID de Orden</th>
                      <th>Código</th>
                      <th>Fecha y Hora</th>
                      <th>Monto Final</th>
                      <th>Comuna</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Orden de Compra 1 */}
                    <tr>
                      <td>#10001</td>
                      <td><Link to="/admin/ordenes/10001">ORDER12345</Link></td>
                      <td>05/08/2024 14:30</td>
                      <td>$15000</td>
                      <td>Santiago Centro</td>
                      <td><a href="/admin/ordenes/10001/" className="btn btn-primary btn-sm">DETALLES</a></td>
                    </tr>
                    {/* Orden de Compra 2 */}
                    <tr>
                      <td>#10002</td>
                      <td><a href="/admin/ordenes/10001/" className>ORDER67890</a></td>
                      <td>06/08/2024 10:15</td>
                      <td>$30000</td>
                      <td>Las Condes</td>
                      <td><a href="/admin/ordenes/10001/" className="btn btn-primary btn-sm">DETALLES</a></td>
                    </tr>
                    {/* Orden de Compra 3 */}
                    <tr>
                      <td>#10003</td>
                      <td><a href="/admin/ordenes/10001/" className>ORDER24680</a></td>
                      <td>07/08/2024 09:00</td>
                      <td>$12000</td>
                      <td>Providencia</td>
                      <td><a href="/admin/ordenes/10001/" className="btn btn-primary btn-sm">DETALLES</a></td>
                    </tr>
                    {/* Orden de Compra 4 */}
                    <tr>
                      <td>#10004</td>
                      <td><a href="/admin/ordenes/10001/" className>ORDER13579</a></td>
                      <td>08/08/2024 15:45</td>
                      <td>$20000</td>
                      <td>Ñuñoa</td>
                      <td><a href="/admin/ordenes/10001/" className="btn btn-primary btn-sm">DETALLES</a></td>
                    </tr>
                    {/* Orden de Compra 5 */}
                    <tr>
                      <td>#10005</td>
                      <td><a href="/admin/ordenes/10001/" className>ORDER11223</a></td>
                      <td>09/08/2024 11:20</td>
                      <td>$18000</td>
                      <td>La Florida</td>
                      <td><a href="/admin/ordenes/10001/" className="btn btn-primary btn-sm">DETALLES</a></td>
                    </tr>
                    {/* Orden de Compra 6 */}
                    <tr>
                      <td>#10006</td>
                      <td><a href="/admin/ordenes/10001/" className>ORDER55678</a></td>
                      <td>10/08/2024 16:50</td>
                      <td>$25000</td>
                      <td>Puente Alto</td>
                      <td><a href="/admin/ordenes/10001/" className="btn btn-primary btn-sm">DETALLES</a></td>
                    </tr>
                    {/* Orden de Compra 7 */}
                    <tr>
                      <td>#10007</td>
                      <td><a href="/admin/ordenes/10001/" className>ORDER99887</a></td>
                      <td>11/08/2024 13:35</td>
                      <td>$32000</td>
                      <td>Maipú</td>
                      <td><a href="/admin/ordenes/10001/" className="btn btn-primary btn-sm">DETALLES</a></td>
                    </tr>
                    {/* Orden de Compra 8 */}
                    <tr>
                      <td>#10008</td>
                      <td><a href="/admin/ordenes/10001/" className>ORDER44556</a></td>
                      <td>12/08/2024 17:45</td>
                      <td>$23000</td>
                      <td>Peñalolén</td>
                      <td><a href="/admin/ordenes/10001/" className="btn btn-primary btn-sm">DETALLES</a></td>
                    </tr>
                    {/* Orden de Compra 9 */}
                    <tr>
                      <td>#10009</td>
                      <td><a href="/admin/ordenes/10001/" className>ORDER66789</a></td>
                      <td>13/08/2024 12:10</td>
                      <td>$40000</td>
                      <td>Vitacura</td>
                      <td><a href="/admin/ordenes/10001/" className="btn btn-primary btn-sm">DETALLES</a></td>
                    </tr>
                    {/* Orden de Compra 10 */}
                    <tr>
                      <td>#10010</td>
                      <td><a href="/admin/ordenes/10001/" className>ORDER33445</a></td>
                      <td>14/08/2024 09:50</td>
                      <td>$28000</td>
                      <td>Independencia</td>
                      <td><a href="/admin/ordenes/10001/" className="btn btn-primary btn-sm">DETALLES</a></td>
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

export default Ordenes;

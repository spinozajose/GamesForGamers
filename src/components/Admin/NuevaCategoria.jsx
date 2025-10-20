import React from 'react';
import '../../assets/css/PanelAdmin.css';
import { Link } from 'react-router-dom';

function NuevaCategoria() {
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
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css" />
  <style dangerouslySetInnerHTML={{__html: "\n        a.nav-link.nav-menu.nav-active {\n            background-color: #0d6efd;\n            /* Color de fondo azul primario de Bootstrap */\n            color: white !important;\n            /* Texto en blanco */\n            border-radius: 50rem;\n            /* Bordes redondeados para darle forma de píldora */\n            padding: 0.375rem 0.75rem;\n            /* Relleno consistente con los enlaces de Bootstrap */\n            display: inline-flex;\n            /* Asegurar alineación de ícono y texto */\n            align-items: center;\n            gap: 0.5rem;\n            /* Espaciado entre ícono y texto */\n            text-decoration: none;\n            /* Sin subrayado */\n\n        }\n\n        a.nav-link.nav-menu {\n            color: #000000;\n        }\n\n        .bi {\n            vertical-align: -.125em;\n            fill: currentColor;\n        }\n\n        .product-img {\n            width: 50px;\n            height: 50px;\n            object-fit: cover;\n            border-radius: 4px;\n        }\n\n        a.decoration-none {\n            text-decoration: none;\n        }\n\n        a.decoration-none > i.bi {\n            justify-items: center;\n            align-items: center;\n        }\n        \n    " }} />
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
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mb-3">
        <div className="mt-4">
          <div className="col-sm-12">
            <h4>
              <Link to="/admin/categorias" className="text-secondary me-2 decoration-none">
                <i className="bi bi-arrow-left-circle-fill" />
              </Link>
              Crear nueva categoría
            </h4>
          </div>
          {/* <h2>Section title</h2> */}
          <div className="card text-start">
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">Nombre del Juego<small className="text-danger">*</small></label>
                  <input type="text" className="form-control" id="productName" placeholder="Ingrese el nombre del juego" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="productDescription" className="form-label">Descripción<small className="text-danger">*</small></label>
                  <textarea className="form-control" id="productDescription" rows={3} placeholder="Ingrese una descripción del juego" required defaultValue={""} />
                </div>
                <div className="mb-3">
                  <label htmlFor="productImage" className="form-label">Imagen</label>
                  <input type="file" className="form-control" id="productImage" accept="image/*" />
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-primary" onclick="handleGuardar()">Guardar</button>
                </div>
              </form>
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
export default NuevaCategoria;

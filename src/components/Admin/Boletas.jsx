import React from 'react';
import "./PanelAdmin.css";
import { Link, useParams } from 'react-router-dom';

function Boletas() {
    const { id } = useParams();
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
  <style dangerouslySetInnerHTML={{__html: "\n        a.nav-link.nav-menu.nav-active {\n            background-color: #0d6efd;\n            /* Color de fondo azul primario de Bootstrap */\n            color: white !important;\n            /* Texto en blanco */\n            border-radius: 50rem;\n            /* Bordes redondeados para darle forma de píldora */\n            padding: 0.375rem 0.75rem;\n            /* Relleno consistente con los enlaces de Bootstrap */\n            display: inline-flex;\n            /* Asegurar alineación de ícono y texto */\n            align-items: center;\n            gap: 0.5rem;\n            /* Espaciado entre ícono y texto */\n            text-decoration: none;\n            /* Sin subrayado */\n\n        }\n\n        a.nav-link.nav-menu {\n            color: #000000;\n        }\n\n        .bi {\n            vertical-align: -.125em;\n            fill: currentColor;\n        }\n\n        .product-img {\n            width: 50px;\n            height: 50px;\n            object-fit: cover;\n            border-radius: 4px;\n        }\n    " }} />
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
                            <li className="nav-item mx-2 nav-active">
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
          <div className="col-sm-12">
            <h4 className="card-text">
              <Link to="/admin/ordenes/" className="text-secondary me-2 decoration-none">
                <i className="bi bi-arrow-left-circle-fill" />
              </Link>
              Orden de compra #ffffffff
            </h4>
          </div>
          <p className="card-text">Boleta emitida 05/08/2024 14:30</p>
          {/* <h2>Section title</h2> */}
          {/* <ul class="nav nav-tabs">
                  <li class="nav-item">
                      <a class="nav-link nav-menu active" aria-current="page" href="/admin/producto/index.html">Ordenes</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link nav-menu" aria-current="page" href="/admin/producto/index-critico.html">Listado de productos criticos</a>
                  </li>
              </ul> */}
          <div className="card text-start mb-5">
            <div className="card-body">
              <section id="productos-comprados" className="py-3">
                <div className="container">
                  <h5 className="card-title">
                    {/* <i class="bi bi-check-circle text-success"></i> */}
                    Orden de compra. nro #20240705
                  </h5>
                  <div className>
                    <em><small>Código de orden: ORDER12345</small></em>
                  </div>
                  <div className="row my-3">
                    <div className="card mb-3">
                      <div className="card-body row">
                        <div className="col-3 col-md-4 mb-3">
                          <label htmlFor="nombre" className="form-label">Nombre<small className="text-danger">*</small></label>
                          <input type="text" className="form-control" id="nombre" defaultValue="pedro" disabled readOnly name="nombre" required />
                        </div>
                        <div className="col-6 col-md-4 mb-3">
                          <label htmlFor="apellidos" className="form-label">Apellidos<small className="text-danger">*</small></label>
                          <input type="text" className="form-control" id="apellidos" defaultValue="hacker" disabled readOnly name="apellidos" required />
                        </div>
                        <div className="mb-3 col-md-4 col-6">
                          <label htmlFor="correo" className="form-label">Correo<small className="text-danger">*</small></label>
                          <input type="email" className="form-control" id="correo" name="correo" disabled defaultValue="pedro.hacer20@example.com" required />
                        </div>
                      </div>
                    </div>
                    <div className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title">Dirección de entrega de los productos</h5>
                        <div className="row">
                          <div className="mb-3 col-12 col-md-6">
                            <label htmlFor="fechaNacimiento" className="form-label">Calle<small className="text-danger">*</small></label>
                            <input type="text" className="form-control" id="fechaNacimiento" defaultValue="Los crisantemos, Edificio Norte" disabled name="fechaNacimiento" required />
                          </div>
                          <div className="mb-3 col-12 col-md-6">
                            <label htmlFor="fechaNacimiento" className="form-label">Departamento
                              (opcional)</label>
                            <input type="text" className="form-control" id="fechaNacimiento" name="fechaNacimiento" disabled defaultValue="Depto 603" placeholder="Ej: 603" />
                          </div>
                          <div className="mb-3 col-6 col-md-6">
                            <label htmlFor="regionSelect" className="form-label">Región<small className="text-danger">*</small></label>
                            <select className="form-select" id="regionSelect" disabled required>
                              {/* <option value="" disabled selected>Seleccione una región</option> */}
                              <option value={1000}>Región Metropolitana de Santiago</option>
                              <option value={2000}>Tarapacá</option>
                              <option value={3000}>Antofagasta</option>
                              <option value={4000}>Atacama</option>
                              <option value={5000}>Coquimbo</option>
                              <option value={6000}>Valparaíso</option>
                              <option value={7000}>Región del Libertador Gral. Bernardo O’Higgins
                              </option>
                              <option value={8000}>Región del Maule</option>
                              <option value={9000}>Región del Biobío</option>
                              <option value={10000}>Región de la Araucanía</option>
                              <option value={11000}>Región de Los Ríos</option>
                              <option value={12000}>Región de Los Lagos</option>
                              <option value={13000}>Región Aisén del Gral. Carlos Ibáñez del Campo
                              </option>
                              <option value={14000}>Región de Magallanes y de la Antártica Chilena
                              </option>
                              <option value={15000}>Arica y Parinacota</option>
                              <option value={16000}>Región de Ñuble</option>
                            </select>
                          </div>
                          <div className="mb-3 col-6 col-md-6">
                            <label htmlFor="comunaSelect" className="form-label">Comuna<small className="text-danger">*</small></label>
                            <select className="form-select" id="comunaSelect" disabled required>
                              <option value={1001}>Cerrillos</option>
                              <option value={1002}>Cerro Navia</option>
                              <option value={1003}>Conchalí</option>
                              <option value={1004}>El Bosque</option>
                              <option value={1005}>Estación Central</option>
                              <option value={1006}>Huechuraba</option>
                              <option value={1007}>Independencia</option>
                              <option value={1008}>La Cisterna</option>
                              <option value={1009}>La Florida</option>
                              <option value={1010}>La Granja</option>
                              <option value={1011}>La Pintana</option>
                              <option value={1012}>La Reina</option>
                              <option value={1013}>Las Condes</option>
                              <option value={1014}>Lo Barnechea</option>
                              <option value={1015}>Lo Espejo</option>
                              <option value={1016}>Lo Prado</option>
                              <option value={1017}>Macul</option>
                              <option value={1018}>Maipú</option>
                              <option value={1019}>Ñuñoa</option>
                              <option value={1020}>Pedro Aguirre Cerda</option>
                              <option value={1021}>Peñalolén</option>
                              <option value={1022}>Providencia</option>
                              <option value={1023}>Pudahuel</option>
                              <option value={1024}>Quilicura</option>
                              <option value={1025}>Quinta Normal</option>
                              <option value={1026}>Recoleta</option>
                              <option value={1027}>Renca</option>
                              <option value={1028}>Santiago</option>
                              <option value={1029}>San Joaquín</option>
                              <option value={1030}>San Miguel</option>
                              <option value={1031}>San Ramón</option>
                              <option value={1032}>Vitacura</option>
                              <option value={1033}>Puente Alto</option>
                              <option value={1034}>Pirque</option>
                              <option value={1035}>San José de Maipo</option>
                              <option value={1036}>Colina</option>
                              <option value={1037}>Lampa</option>
                              <option value={1038}>Tiltil</option>
                              <option value={1039}>San Bernardo</option>
                              <option value={1040}>Buin</option>
                              <option value={1041}>Calera de Tango</option>
                              <option value={1042}>Paine</option>
                              <option value={1043}>Melipilla</option>
                              <option value={1044}>Alhué</option>
                              <option value={1045}>Curacaví</option>
                              <option value={1046}>María Pinto</option>
                              <option value={1047}>San Pedro</option>
                              <option value={1048}>Talagante</option>
                              <option value={1049}>El Monte</option>
                              <option value={1050}>Isla de Maipo</option>
                              <option value={1051}>Padre Hurtado</option>
                              <option value={1052}>Peñaflor</option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <label htmlFor className="form-label">Indicaciones para la entrega
                              (opcional)</label>
                            <textarea className="form-control" name id rows={3} placeholder="Ej.: Entre calles, color del edificio, no tiene timbre." disabled defaultValue={"El martes no estaremos en el depto, pero puede dejarselo con el conserje."} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">
                          Detalle de la compra
                        </h5>
                        <div className="table-responsive">
                          <table className="table table-hover table-sm custom-table">
                            <thead>
                              <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                              </tr>
                            </thead>
                            <tbody id="comprados-list">
                              <tr>
                                <td>1</td>
                                <td>Fortnite</td>
                                <td>$ 0</td>
                                <td>1</td>
                                <td>$ 0</td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>Minecraft</td>
                                <td>$ 2695</td>
                                <td>4</td>
                                <td>$ 10780</td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>Red Dead Redemption 2</td>
                                <td>$ 5999</td>
                                <td>1</td>
                                <td>$ 5999</td>
                              </tr>
                              <tr>
                                <td>4</td>
                                <td>Among Us</td>
                                <td>$ 499</td>
                                <td>1</td>
                                <td>$ 499</td>
                              </tr>
                              <tr>
                                <td>5</td>
                                <td>The Witcher 3</td>
                                <td>$ 3999</td>
                                <td>1</td>
                                <td>$ 3999</td>
                              </tr>
                              <tr>
                                <td>6</td>
                                <td>Hollow Knight</td>
                                <td>$ 1499</td>
                                <td>1</td>
                                <td>$ 1499</td>
                              </tr>
                              <tr>
                                <td>
                                  7
                                </td>
                                <td>Animal Crossing</td>
                                <td>$ 5999</td>
                                <td>1</td>
                                <td>$ 5999</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mb-3">
                    <div className="card ">
                      <div className="card-body">
                        <h4>Total pagado: $ 28775</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
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
export default Boletas;

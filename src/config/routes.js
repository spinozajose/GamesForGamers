import Inicio from "../pages/Home/Inicio";
import VerificarCompra from "../pages/Checkout/VerificarCompra";

import CatalogoPrecompras from "../pages/Catalog/CatalogoPrecompras"; 

import InicioSesion from "../pages/Login/InicioSesion";
import Registro from "../pages/Register/Registro";
import Contacto from "../pages/Contact/Contacto";

import Catalogo from "../pages/Catalog/Catalogo"; 
import CatalogoOfertas from "../pages/Catalogo/CatalogoOfertas";

export const ROUTES = {
  HOME: "/",
  CHECKOUT: "/checkout",
  PREORDER: "/precompras",
  LOGIN: "/login",
  REGISTER: "/register",
  CONTACT: "/contacto",
  CATALOG: "/catalogo",
  OFFERS: "/ofertas",
};

export const ROUTE_COMPONENTS = [
  { path: ROUTES.HOME, element: <Inicio /> },
  { path: ROUTES.CHECKOUT, element: <VerificarCompra /> },
  
  // 3. Actualizado el elemento
  { path: ROUTES.PREORDER, element: <CatalogoPrecompras /> }, 
  
  { path: ROUTES.LOGIN, element: <InicioSesion /> },
  { path: ROUTES.REGISTER, element: <Registro /> },
  { path: ROUTES.CONTACT, element: <Contacto /> },
  { path: ROUTES.CATALOG, element: <Catalogo /> },
  { path: ROUTES.OFFERS, element: <CatalogoOfertas /> }
];
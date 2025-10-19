import "./index.css"; 
import { Routes, Route } from "react-router-dom";
import Encabezado from "./components/Encabezado"
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MiniCatalogo from "./components/MiniCatalogo";
import ProgresoScroll from "./components/ProgresoScroll";
import Piedepagina from "./components/Piedepagina";
import Register from "./pages/Register";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ProgresoScroll />
      <Encabezado />
      <main className="flex-grow-1 container my-4">
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <MiniCatalogo />
            </>
          } />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Piedepagina />
    </div>
  );
}

export default App;
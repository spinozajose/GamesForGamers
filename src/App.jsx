import "./index.css"; 
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ScrollProgress from "./components/ScrollProgress";
import GameTicker from "./components/GameTIcker";


function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollProgress />
      <Header />
      <GameTicker/>
      <main className="flex-grow-1 container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

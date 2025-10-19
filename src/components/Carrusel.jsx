import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

function Carousel() {
    return (
        <>
        {/* Carrusel*/}
        <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
            <div className="carousel-item active">
            <img src="src/assets/images/foto-carousel1.png" className="d-block w-100" alt="imagen1_del_carrusel" />
            </div>
            <div className="carousel-item">
            <img src="src/assets/images/foto-carousel1.png" className="d-block w-100" alt="imagen2_del_carrusel" />
            </div>
            <div className="carousel-item">
            <img src="src/assets/images/foto-carousel1.png" className="d-block w-100" alt="imagen3_del_carrusel" />
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
        </button>
        </div>
        </>
    );
}

export default Carousel;
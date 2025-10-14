function Contact() {
  return (
    <div className="text-center">
      <h2>Contacto</h2>
      <p>¿Tienes dudas o sugerencias? ¡Escríbenos!</p>
      <form className="w-50 mx-auto mt-3">
        <input type="text" className="form-control mb-2" placeholder="Tu nombre" />
        <input type="email" className="form-control mb-2" placeholder="Tu correo" />
        <textarea className="form-control mb-2" rows="4" placeholder="Mensaje"></textarea>
        <button type="submit" className="btn btn-primary w-100">Enviar</button>
      </form>
    </div>
  );
}

export default Contact;

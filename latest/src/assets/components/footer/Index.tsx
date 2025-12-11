

function Footer() {
  return (

    <footer className="footer bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} WorkshopsDev. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
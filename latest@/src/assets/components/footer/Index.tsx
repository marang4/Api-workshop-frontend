

function Footer() {
  return (
    // bg-dark e text-white para combinar com o header
    // py-3 adiciona um espaçamento vertical (padding)
    // mt-auto é a classe MÁGICA do Bootstrap. Em um container flex,
    // ela adiciona uma margem no topo que empurra o elemento para o fim do espaço disponível.
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
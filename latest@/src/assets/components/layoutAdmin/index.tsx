// Exemplo no seu arquivo de layout: src/assets/components/layoytAdmin.tsx
import { Outlet } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer/Index';


function LayoutAdmin() {
  return (
    // 2. Adicione estas 3 classes na div principal:
    // d-flex: Ativa o layout Flexbox.
    // flex-column: Organiza os itens em coluna (Header, main, Footer).
    // min-vh-100: Define a altura mínima como 100% da altura da tela (viewport height).
    <div className="d-flex flex-column min-vh-100">
      <Header />

      {/* O conteúdo principal da sua página */}
      <main className="container my-4"> {/* Usei my-4 para dar margem em cima e embaixo */}
        <Outlet />
      </main>

      <Footer /> {/* 3. Adicione o componente Footer no final */}
    </div>
  );
}

export default LayoutAdmin;
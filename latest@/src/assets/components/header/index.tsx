import React from 'react';
// 1. Importe o 'useNavigate' para podermos redirecionar o usuário
import { NavLink, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  // 2. Crie uma instância do hook de navegação
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  // 3. Crie a função de logout
  const handleLogout = () => {
    // Remove o token de autenticação do armazenamento local do navegador
    localStorage.removeItem('authToken');

    // Redireciona o usuário para a página de login com um recarregamento completo.
    // Isso garante que qualquer estado da aplicação seja limpo.
    window.location.href = '/login';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          WorkshopsDev
        </NavLink>

        {/* Botão "hambúrguer" que aparece em telas menores */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Container dos links de navegação */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center"> {/* Usei align-items-center para alinhar verticalmente */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/gerenciar-workshops">
                Gerenciar Workshop
              </NavLink>
            </li>
            {/* 4. Adicione o item e o botão de Logout */}
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0"> {/* Adiciona margem em telas grandes e espaço no topo em telas pequenas */}
              <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i> {/* Ícone opcional do Bootstrap Icons */}
                Sair
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
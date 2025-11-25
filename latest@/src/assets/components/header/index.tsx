import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Adicione useDispatch
import { logout } from '../../../store/authSlice'; // Importe a ação de logout
import type { RootState } from '../../../store/store';

function Header() {
  const dispatch = useDispatch();
  const { usuario, isAutenticado } = useSelector((state: RootState) => state.auth);

  const role = usuario?.role ? usuario.role.toUpperCase() : "";
  const ehAdmin = role.includes("ADMIN");
  const ehOrganizador = role.includes("ORGANIZADOR");
  
  const podeGerenciarWorkshops = isAutenticado && (ehAdmin || ehOrganizador);
  const podeGerenciarUsuarios = isAutenticado && ehAdmin;
  const podeVerHome = !isAutenticado || !ehOrganizador || ehAdmin;

  const handleLogout = () => {
   
    dispatch(logout());
    

    window.location.href = '/login'; 
  };

  const linkLogo = (isAutenticado && ehOrganizador && !ehAdmin) ? "/gerenciar-workshops" : "/";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to={linkLogo}>
          WorkshopsDev
        </NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            
            {podeVerHome && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/" end>Home</NavLink>
              </li>
            )}

            {podeGerenciarWorkshops && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/gerenciar-workshops">
                  {ehAdmin ? "Todos Workshops" : "Meus Workshops"}
                </NavLink>
              </li>
            )}

            {podeGerenciarUsuarios && (
              <li className="nav-item">
                <NavLink className="nav-link text-warning" to="/gerenciar-usuarios">
                  <i className="bi bi-people-fill me-1"></i>
                  Usuários
                </NavLink>
              </li>
            )}

            {isAutenticado ? (
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <div className="d-flex align-items-center gap-3">
                  <span className="text-light d-none d-lg-block small">
                    Olá, {usuario?.nome?.split(' ')[0]}
                  </span>
                  <button 
                    className="btn btn-outline-danger btn-sm" 
                    onClick={handleLogout}
                    title="Sair"
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Sair
                  </button>
                </div>
              </li>
            ) : (
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <NavLink className="btn btn-primary btn-sm" to="/login">
                  Entrar
                </NavLink>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../store/authSlice';
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
    window.location.href = '/'; 
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
                <NavLink className="nav-link" to="/" end>
                  Home
                </NavLink>
              </li>
            )}

     
            {isAutenticado && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/meu-historico">
                  <i className="bi bi-clock-history me-1"></i>
                  Histórico
                </NavLink>
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
              <li className="nav-item ms-lg-3 d-flex align-items-center gap-2">
                
                <NavLink 
                  to="/meu-perfil" 
                  className="text-light text-decoration-none d-flex align-items-center gap-2 btn btn-outline-secondary border-0 py-1 px-2"
                  title="Meu Perfil"
                >
                  <i className="bi bi-person-circle fs-4"></i>
                  <div className="d-none d-md-flex flex-column text-start lh-1">
                    <small style={{ fontSize: '0.7rem', opacity: 0.7 }}>Olá,</small>
                    <span className="fw-bold" style={{ fontSize: '0.9rem' }}>
                        {usuario?.nome?.split(' ')[0]}
                    </span>
                  </div>
                </NavLink>

                <button 
                  className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1" 
                  onClick={handleLogout}
                  title="Sair"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span className="d-none d-md-inline">Sair</span>
                </button>

              </li>
            ) : (
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <NavLink className="btn btn-primary btn-sm px-4" to="/login">
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
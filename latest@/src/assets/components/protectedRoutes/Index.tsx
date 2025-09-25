import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  // Ele verifica se o token existe no armazenamento local
  const token = localStorage.getItem('authToken');

  // Se o token existe, ele renderiza a página solicitada (<Outlet />).
  // Se não, ele redireciona para a página de login.
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
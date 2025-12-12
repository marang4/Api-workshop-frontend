
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';

const ProtectedRoute = () => {

  const { isAutenticado } = useSelector((state: RootState) => state.auth);


  if (!isAutenticado) {

    return <Navigate to="/" replace />;
  }


  return <Outlet />;
};

export default ProtectedRoute;

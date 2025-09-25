import { Route, Routes } from "react-router-dom";

// Seus componentes de página e layout

import Home from "./pages/home/Index";
import GerenciarWorkshops from "./pages/gerenciarWorkshops/Index";

import Login from "./pages/login/Index";

import ProtectedRoute from "./assets/components/protectedRoutes/Index";
import LayoutLogin from "./assets/components/layoutLogin/Index";
import Cadastro from "./assets/components/cadastroUsuario/Index";
import LayoutAdmin from "./assets/components/layoutAdmin";

// O componente porteiro
 // Verifique se o caminho do import está correto

function AppRoutes() {
  return (
    <Routes>
      {/* --- Rotas Públicas --- */}
      {/* O usuário SEMPRE pode acessar estas rotas */}
      <Route element={<LayoutLogin />}>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastre-se" element={<Cadastro />} />
      </Route>

      {/* --- Rotas Protegidas --- */}
      {/* O usuário SÓ PODE acessar estas rotas se tiver um token */}
      <Route element={<ProtectedRoute />}>
        <Route element={<LayoutAdmin />}>
          <Route path="/" element={<Home />} />
          <Route path="/gerenciar-workshops" element={<GerenciarWorkshops />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
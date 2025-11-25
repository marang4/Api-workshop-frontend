import { Route, Routes } from "react-router-dom";

// Seus componentes
import Home from "./pages/home/Index";
import GerenciarWorkshops from "./pages/gerenciarWorkshops/Index";
import Login from "./pages/login/Index";
import LayoutLogin from "./assets/components/layoutLogin/Index";
import Cadastro from "./assets/components/cadastroUsuario/Index";
import LayoutAdmin from "./assets/components/layoutAdmin"; 

// CORREÇÃO AQUI: Adicione o "/Index" no final se você criou a pasta "gerenciarUsuarios" com um arquivo "Index.tsx" dentro.
import GerenciarUsuarios from "./pages/gerenciarUsuarios/Index" 
import EsqueciSenha from "./pages/esqueciSenha/Index";
import RedefinirSenha from "./pages/redefinirSenha/Index";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<LayoutLogin />}>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastre-se" element={<Cadastro />} />
        {/* NOVAS ROTAS AQUI */}
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/resetar-senha" element={<RedefinirSenha />} />
      </Route>

      <Route element={<LayoutAdmin />}>
        <Route path="/" element={<Home />} />
        
        <Route
          path="/gerenciar-workshops"
          element={<GerenciarWorkshops />}
        />

                      <Route 
          path="/gerenciar-usuarios" 
          element={<GerenciarUsuarios />} 
        />


        
      </Route>
    </Routes>
  );
}

export default AppRoutes;
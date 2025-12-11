import { Route, Routes } from "react-router-dom";

// Seus componentes (Páginas)
import Home from "./pages/home/Index";
import GerenciarWorkshops from "./pages/gerenciarWorkshops/Index";
import GerenciarUsuarios from "./pages/gerenciarUsuarios/Index"; 
import Historico from "./pages/historico/Index";
import Login from "./pages/login/Index";
import EsqueciSenha from "./pages/esqueciSenha/Index";
import RedefinirSenha from "./pages/redefinirSenha/Index";

// Layouts
import LayoutLogin from "./assets/components/layoutLogin/Index";
import LayoutAdmin from "./assets/components/layoutAdmin"; 
import Cadastro from "./assets/components/cadastroUsuario/Index";

// IMPORTAMOS O NOSSO NOVO COMPONENTE
import ProtectedRoute from "./assets/components/protectedRoutes/Index"; 
import Perfil from "./pages/perfil/Index";

function AppRoutes() {
  return (
    <Routes>
      
 
      <Route element={<LayoutLogin />}>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastre-se" element={<Cadastro />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/resetar-senha" element={<RedefinirSenha />} />
      </Route>

 
      <Route element={<LayoutAdmin />}>
        
       
        <Route path="/" element={<Home />} />
        

        <Route element={<ProtectedRoute />}>
            
            <Route path="/meu-perfil" element={<Perfil />} />
            <Route
              path="/gerenciar-workshops"
              element={<GerenciarWorkshops />}
            />

            <Route 
              path="/gerenciar-usuarios" 
              element={<GerenciarUsuarios />} 
            />

            <Route 
              path="/meu-historico" 
              element={<Historico />} 
            />

        </Route>
      

      </Route>
    </Routes>
  );
}

export default AppRoutes;
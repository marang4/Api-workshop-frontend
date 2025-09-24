import {Route, Routes} from "react-router-dom"
import Home from "./pages/home/Index";
import GerenciarWorkshops from "./pages/gerenciarWorkshops/Index";

import Login from "./pages/login/Index";
import LayoutLogin from "./assets/components/layoutLogin/Index";
import Cadastro from "./assets/components/cadastroUsuario/Index";
import LayoutAdmin from "./assets/components/layoutAdmin";


function AppRoutes() {
  return (
    <Routes>
      <Route element={<LayoutLogin/>}>
      <Route path="/login" element={<Login/>}/>
      <Route path="/cadastre-se" element={<Cadastro/>}/>


      </Route>


      <Route element={<LayoutAdmin />}>
        <Route path="/" element={<Home />} />
        <Route path="/gerenciar-workshops" element={<GerenciarWorkshops />} />

        
      </Route>
    </Routes>
  )
}

export default AppRoutes;
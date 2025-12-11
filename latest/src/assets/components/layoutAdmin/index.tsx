
import { Outlet } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer/Index';


function LayoutAdmin() {
  return (

    <div className="d-flex flex-column min-vh-100">
      <Header />

      
      <main className="container my-4"> 
        <Outlet />
      </main>

      <Footer /> 
    </div>
  );
}

export default LayoutAdmin;
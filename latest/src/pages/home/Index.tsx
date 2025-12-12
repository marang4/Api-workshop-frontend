import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import type { RootState } from '../../store/store';
import { setWorkshops } from '../../store/workshopSlice';
import { addToHistory } from '../../store/historySlice';
import { getWorkshops } from '../../services/workshopService';
import type { Workshop } from '../../types/workshop';

import WorkshopCard from '../../assets/components/workshopCards/Index';
import WorkshopDetailsModal from '../../assets/components/workshopDetailsModal/Index';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { usuario, isAutenticado } = useSelector((state: RootState) => state.auth);
  const workshops = useSelector((state: RootState) => state.workshop.lista);
  
  const [loading, setLoading] = useState(true);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [termoBusca, setTermoBusca] = useState("");


  const role = usuario?.role ? usuario.role.toUpperCase() : "";
  const ehAdmin = role.includes("ADMIN");
  const ehOrganizador = role.includes("ORGANIZADOR");


  const deveSerRedirecionado = isAutenticado && ehOrganizador && !ehAdmin;



  useEffect(() => {
    if (deveSerRedirecionado) {
      navigate("/gerenciar-workshops");
    }
  }, [deveSerRedirecionado, navigate]);

  // 2. BUSCA DE DADOS
  useEffect(() => {

    if (deveSerRedirecionado) {
        setLoading(false);
        return; 
    }


    if (!isAutenticado) {
        setLoading(false);
        return;
    }

    const carregarDados = async () => {
      setLoading(true);
      try {
        const data = await getWorkshops(termoBusca);
        dispatch(setWorkshops(data));
      } catch (error) {
        console.error("Erro ao buscar workshops:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
        carregarDados();
    }, 500);

    return () => clearTimeout(delayDebounce);

  }, [dispatch, isAutenticado, deveSerRedirecionado, termoBusca]);


  if (deveSerRedirecionado) return null;

  const handleVerDetalhes = (ws: Workshop) => {
      dispatch(addToHistory(ws));
      setSelectedWorkshop(ws);
  };

  return (
    <div className="container py-5">
      

      <div className="p-5 mb-5 bg-light rounded-3 shadow-sm text-center border">
        <div className="container-fluid py-3">
          <h1 className="display-5 fw-bold text-primary">Explore, Aprenda e Evolua</h1>
          <p className="col-md-8 fs-4 mx-auto text-muted mt-3 mb-4">
            Encontre o workshop perfeito para impulsionar sua carreira.
          </p>
          
          {isAutenticado ? (

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="input-group input-group-lg shadow-sm">
                        <span className="input-group-text bg-white border-end-0">
                            <i className="bi bi-search text-muted"></i>
                        </span>
                        <input 
                            type="text" 
                            className="form-control border-start-0" 
                            placeholder="Buscar por tema..." 
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                        />
                    </div>
                </div>
            </div>
          ) : (

            <div className="d-flex gap-3 justify-content-center mt-4">
                <Link to="/cadastre-se" className="btn btn-primary btn-lg px-5 rounded-pill shadow-sm">
                  Começar Agora
                </Link>
                <Link to="/login" className="btn btn-outline-secondary btn-lg px-4 rounded-pill">
                  Já tenho conta
                </Link>
            </div>
          )}
        </div>
      </div>


      {!isAutenticado ? (

        <div className="row text-center mt-5">
            <div className="col-md-4 mb-4">
                <div className="p-4 h-100 border rounded-3 bg-white shadow-sm">
                    <div className="mb-3 text-primary"><i className="bi bi-laptop fs-1"></i></div>
                    <h4 className="fw-bold">Prática Real</h4>
                    <p className="text-muted">Projetos mão na massa alinhados com o mercado.</p>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="p-4 h-100 border rounded-3 bg-white shadow-sm">
                    <div className="mb-3 text-primary"><i className="bi bi-people-fill fs-1"></i></div>
                    <h4 className="fw-bold">Networking</h4>
                    <p className="text-muted">Conecte-se com outros devs e expanda sua rede.</p>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="p-4 h-100 border rounded-3 bg-white shadow-sm">
                    <div className="mb-3 text-primary"><i className="bi bi-patch-check-fill fs-1"></i></div>
                    <h4 className="fw-bold">Certificação</h4>
                    <p className="text-muted">Garanta conhecimento validado para o seu currículo.</p>
                </div>
            </div>
        </div>
      ) : (
        /* LISTA DE WORKSHOPS (Admin e User) */
        <div className="row g-4">
            {loading ? (
            <div className="col-12 text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
            </div>
            ) : workshops.length > 0 ? (
            <>
                <div className="col-12 mb-2">
                    <h3 className="fw-bold border-start border-5 border-primary ps-3">
                        {termoBusca ? `Resultados para "${termoBusca}"` : "Próximos Eventos"}
                    </h3>
                </div>
                {workshops.map((ws) => (
                <div key={ws.id} className="col-12 col-md-6 col-lg-4">
                    <WorkshopCard 
                      workshop={ws} 
                      onVerDetalhes={handleVerDetalhes} 
                    />
                </div>
                ))}
            </>
            ) : (
            <div className="col-12 text-center py-5">
                <div className="text-muted">
                    <i className="bi bi-calendar-x display-4"></i>
                    <p className="mt-3">
                        {termoBusca ? `Nenhum workshop encontrado.` : "Nenhum workshop disponível no momento."}
                    </p>
                </div>
            </div>
            )}
        </div>
      )}

      {selectedWorkshop && (
        <WorkshopDetailsModal 
          workshop={selectedWorkshop} 
          onClose={() => setSelectedWorkshop(null)} 
        />
      )}
    </div>
  );
};

export default Home;

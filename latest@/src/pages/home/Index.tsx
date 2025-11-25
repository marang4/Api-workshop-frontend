import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../store/store';
import { setWorkshops } from '../../store/workshopSlice';
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

  // 1. EFEITO DE SEGURANÇA: Expulsa Organizador da Home
  useEffect(() => {
    if (isAutenticado && usuario) {
      const role = usuario.role ? usuario.role.toUpperCase() : "";
      
      // Se for Organizador ou Admin, manda pro painel
      if (role.includes("ORGANIZADOR") || role.includes("ADMIN")) {
        navigate("/gerenciar-workshops");
      }
    }
  }, [isAutenticado, usuario, navigate]);


  // 2. Busca workshops PÚBLICOS (Só executa se não for redirecionar)
  useEffect(() => {
    const role = usuario?.role ? usuario.role.toUpperCase() : "";
    const deveRedirecionar = isAutenticado && (role.includes("ORGANIZADOR") || role.includes("ADMIN"));

    if (deveRedirecionar) {
        setLoading(false);
        return; 
    }

    const fetchWorkshops = async () => {
      try {
        const data = await getWorkshops();
        dispatch(setWorkshops(data));
      } catch (error) {
        console.error("Erro ao buscar workshops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, [dispatch, isAutenticado, usuario]);


  const role = usuario?.role ? usuario.role.toUpperCase() : "";
  if (isAutenticado && (role.includes("ORGANIZADOR") || role.includes("ADMIN"))) {
    return null; 
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Explore, Aprenda e Evolua</h1>
        <p className="lead text-muted">
          Garanta sua vaga nos melhores workshops de tecnologia.
        </p>
      </div>

      <div className="row g-4">
        {loading ? (
          <div className="col-12 text-center py-5">
             <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
             </div>
          </div>
        ) : workshops.length > 0 ? (
          workshops.map((ws) => (
            <div key={ws.id} className="col-12 col-md-6 col-lg-4">
              <WorkshopCard 
                workshop={ws} 
                onVerDetalhes={setSelectedWorkshop}
              />
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="alert alert-info d-inline-block">
                <i className="bi bi-info-circle me-2"></i>
                Nenhum workshop disponível para inscrição no momento.
            </div>
          </div>
        )}
      </div>

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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { setWorkshops } from '../../store/workshopSlice';
import { getWorkshops } from '../../services/workshopService';
import WorkshopCard from '../../assets/components/workshopCards/Index';

function Home() {
  const dispatch = useDispatch();
  const workshops = useSelector((state: RootState) => state.workshop.lista);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        // Chama o service
        const data = await getWorkshops();
        // Atualiza o Redux
        dispatch(setWorkshops(data));
      } catch (error) {
        console.error("Erro ao buscar workshops na home:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, [dispatch]);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Explore, Aprenda e Evolua</h1>
        <p className="lead text-muted">
          Dê uma olhada nos workshops em destaque logo abaixo e garanta sua vaga. Quer compartilhar seu conhecimento com a comunidade? Participe!
        </p>
      </div>

      <div className="row">
        {loading ? (
          <p className="text-center">Carregando workshops...</p>
        ) : workshops.length > 0 ? (
          workshops.map((ws) => (
            <div key={ws.id} className="col-md-6 col-lg-4 mb-4">
              <WorkshopCard workshop={ws} />
            </div>
          ))
        ) : (
          <p className="text-center">Nenhum workshop cadastrado no momento.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
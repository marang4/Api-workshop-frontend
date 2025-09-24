import React, { useState, useEffect } from 'react';
import type { Workshop } from '../gerenciarWorkshops/Index';
import WorkshopCard from '../../assets/components/workshopCards/Index';
import api from '../../services/api';
// Importando a interface diretamente do GerenciarWorkshops


const Home: React.FC = () => {
  const API_URL = "http://localhost:8080";
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarWorkshops = async () => {
      try {
        const response = await api.get<Workshop[]>(`${API_URL}/workshop`);
        setWorkshops(response.data);
      } catch (error) {
        console.error("Erro ao buscar workshops na home:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarWorkshops();
  }, []);

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
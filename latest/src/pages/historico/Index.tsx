
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { clearHistory } from '../../store/historySlice';
import WorkshopCard from '../../assets/components/workshopCards/Index';
import type { Workshop } from '../../types/workshop';

function Historico() {
  const dispatch = useDispatch();

  const historico = useSelector((state: RootState) => state.history.itens);


  const handleCardClick = (ws: Workshop) => {
     console.log("Item clicado no histórico:", ws.tema);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2><i className="bi bi-clock-history me-2"></i>Vistos Recentemente</h2>
        
        {historico.length > 0 && (
          <button 
            className="btn btn-outline-danger btn-sm" 
            onClick={() => dispatch(clearHistory())}
          >
            Limpar Histórico
          </button>
        )}
      </div>

      {historico.length === 0 ? (
        <div className="alert alert-secondary text-center py-5">
          <i className="bi bi-journal-x mb-3" style={{fontSize: '2rem'}}></i>
          <p>Você ainda não visualizou nenhum workshop nesta sessão.</p>
        </div>
      ) : (
        <div className="row g-4">
          {historico.map((ws) => (
            <div key={ws.id} className="col-12 col-md-6 col-lg-4">
              <WorkshopCard 
                workshop={ws} 
                onVerDetalhes={handleCardClick} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Historico;

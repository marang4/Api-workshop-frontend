import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import type { RootState } from '../../../store/store';
import { updateWorkshopInList } from '../../../store/workshopSlice';
import type { Workshop } from '../../../types/workshop';
import { realizarInscricao, cancelarInscricao, verificarStatusInscricao } from '../../../services/inscricaoService';

type WorkshopDetailsModalProps = {
  workshop: Workshop | null;
  onClose: () => void;
};

const WorkshopDetailsModal: React.FC<WorkshopDetailsModalProps> = ({ workshop, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const { usuario, isAutenticado } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const [jaInscrito, setJaInscrito] = useState(false);


  useEffect(() => {
    const checkStatus = async () => {
     
      if (isAutenticado && usuario && workshop) {
        try {
          const status = await verificarStatusInscricao(usuario.id, workshop.id);
          setJaInscrito(status);
        } catch (error) {
          console.error("Erro ao verificar status", error);
        }
      }
    };
    checkStatus();
  }, [workshop, usuario, isAutenticado]);


  if (!workshop) return null;

  
  const vagasRestantes = workshop.vagasTotais - workshop.vagasOcupadas;
  const temVagas = vagasRestantes > 0;

 
  const handleAcao = async () => {
    if (!isAutenticado || !usuario) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
    
      const dadosEnvio = { 
          usuarioId: usuario.id, 
          workshopId: workshop.id 
      };

      if (jaInscrito) {
      
        await cancelarInscricao(dadosEnvio);
        alert("Inscrição cancelada com sucesso!");
        
        dispatch(updateWorkshopInList({ 
            ...workshop, 
            vagasOcupadas: workshop.vagasOcupadas - 1 
        }));
        setJaInscrito(false);
        
      } else {
        
        await realizarInscricao(dadosEnvio);
        alert("Inscrição realizada com sucesso!");
        
        dispatch(updateWorkshopInList({ 
            ...workshop, 
            vagasOcupadas: workshop.vagasOcupadas + 1 
        }));
        setJaInscrito(true);
      }
      
      onClose(); 
    } catch (error) {
      let msg = "Erro na operação.";
      
      if (axios.isAxiosError(error)) {
        
         msg = error.response?.data || "Erro ao processar solicitação.";
      }
      
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  // 6. JSX (Visual)
  return (
    <>
      <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            
            {/* Cabeçalho */}
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">{workshop.tema}</h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            
            {/* Corpo */}
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong><i className="bi bi-calendar-event me-2"></i> Data:</strong> {new Date(workshop.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
                  <p><strong><i className="bi bi-geo-alt-fill me-2"></i> Local:</strong> {workshop.local || "Online/A definir"}</p>
                </div>
                <div className="col-md-6">
                  <p><strong><i className="bi bi-people-fill me-2"></i> Vagas Totais:</strong> {workshop.vagasTotais}</p>
                  <p className={temVagas ? "text-success" : "text-danger"}>
                    <strong><i className="bi bi-ticket-perforated me-2"></i> Vagas Restantes:</strong> {vagasRestantes}
                  </p>
                </div>
              </div>
              <hr />
              <p className="text-muted">
                Este workshop é uma oportunidade incrível para aprender sobre {workshop.tema}.
                Garanta sua vaga e participe!
              </p>
            </div>
            
           
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Fechar</button>
              
             
              <button 
                type="button" 
                className={`btn ${jaInscrito ? 'btn-danger' : 'btn-success'}`} 
                onClick={handleAcao}
               
                disabled={loading || (!jaInscrito && !temVagas)}
              >
                {loading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Processando...
                    </>
                ) : jaInscrito ? (
                    'Cancelar Inscrição'
                ) : temVagas ? (
                    'Inscrever-se'
                ) : (
                    'Esgotado'
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
     
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default WorkshopDetailsModal;
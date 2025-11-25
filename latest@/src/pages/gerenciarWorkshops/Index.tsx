import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import type { RootState } from '../../store/store'; // Importe seu RootState
import { 
  setWorkshops, 
  addWorkshopToList, 
  updateWorkshopInList, 
  removeWorkshopFromList 
} from '../../store/workshopSlice';
import { getMeusWorkshops, createWorkshop, updateWorkshop, deleteWorkshop as deleteWorkshopService } from '../../services/workshopService';
import type { Workshop, WorkshopRequest } from '../../types/workshop';

import WorkshopList from '../../assets/components/workshopList/Index';
import WorkshopForm from '../../assets/components/workshopForm/Index';

function GerenciarWorkshops() {
  const dispatch = useDispatch();
  // Buscamos a lista do Redux
  const workshops = useSelector((state: RootState) => state.workshop.lista);

  // Estados locais apenas para controle de UI (Modais e Mensagens)
  const [showModal, setShowModal] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Carregar dados ao iniciar
  useEffect(() => {
    const fetchDados = async () => {
      try {
        // MUDANÇA: Chamamos getMeusWorkshops() em vez de getWorkshops()
        // Assim o Organizador só vê os dele, e o Admin (se o back tratar) vê todos ou os dele.
        const dados = await getMeusWorkshops();
        
        dispatch(setWorkshops(dados)); 
      } catch (error) {
        console.error("Erro ao buscar meus workshops:", error);
      }
    };
    fetchDados();
  }, [dispatch]);
  // Limpar mensagem de sucesso
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSave = async (workshopData: WorkshopRequest) => {
    try {
      if (editingWorkshop) {
        // Editar
        const atualizado = await updateWorkshop(editingWorkshop.id, workshopData);
        dispatch(updateWorkshopInList(atualizado)); // Atualiza Redux
        setSuccessMessage('Workshop atualizado com sucesso!');
      } else {
        // Criar
        const novo = await createWorkshop(workshopData);
        dispatch(addWorkshopToList(novo)); // Atualiza Redux
        setSuccessMessage('Workshop cadastrado com sucesso!');
      }
      
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar workshop:", error);
      alert("Falha ao salvar o workshop.");
    }
  };

 // <--- Não esqueça de importar isso lá em cima!

// ...

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este workshop?')) {
      try {
        await deleteWorkshopService(id);
        
        dispatch(removeWorkshopFromList(id));
        setSuccessMessage("Workshop excluído com sucesso!");
        
      } catch (error) { // <--- 1. REMOVA O ": any" DAQUI
        console.error("Erro ao excluir:", error);
        
        // 2. USE A VERIFICAÇÃO DO AXIOS
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;

            if (status === 500 || status === 409) {
                alert("Não é possível excluir este workshop porque já existem inscritos nele.\n\nPara cancelar o evento, edite o título para 'CANCELADO'.");
            } else if (status === 403) {
                alert("Você não tem permissão para excluir este workshop.");
            } else {
                alert("Falha ao excluir o workshop. Tente novamente.");
            }
        } else {
            // Erro genérico (não foi requisição HTTP)
            alert("Ocorreu um erro inesperado.");
        }
      }
    }
  };
  
  const handleOpenCreateModal = () => {
    setEditingWorkshop(null);
    setShowModal(true);
  };
  
  const handleOpenEditModal = (workshop: Workshop) => {
    setEditingWorkshop(workshop);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingWorkshop(null);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Workshops Cadastrados</h3>
        <button className="btn btn-primary" onClick={handleOpenCreateModal}>
          <i className="bi bi-plus-circle-fill me-2"></i>
          Cadastrar Workshop
        </button>
      </div>

      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMessage}
          <button type="button" className="btn-close" onClick={() => setSuccessMessage("")} aria-label="Close"></button>
        </div>
      )}

      {/* Passamos a lista vinda do Redux */}
      <WorkshopList 
        workshops={workshops} 
        onDelete={handleDelete} 
        onEdit={handleOpenEditModal}
      />

      {showModal && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editingWorkshop ? 'Editar Workshop' : 'Cadastrar Novo Workshop'}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <WorkshopForm
                    onSave={handleSave}
                    onClose={handleCloseModal}
                    initialData={editingWorkshop}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default GerenciarWorkshops;
import React, { useState, useEffect } from 'react';
import WorkshopList from '../../assets/components/workshopList/Index';
import WorkshopForm from '../../assets/components/workshopForm/Index';
import axios from 'axios';

export interface Workshop {
  id: number;
  tema: string;
  data: string;
  vagasTotais: number;
  vagasOcupadas: number;
}

function GerenciarWorkshops() {
  const API_URL = "http://localhost:8080";

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null);
  // NOVO: Estado para a mensagem de sucesso
  const [successMessage, setSuccessMessage] = useState<string>("");

  const buscarWorkshops = async () => {
    try {
      const response = await axios.get<Workshop[]>(`${API_URL}/workshop`);
      setWorkshops(response.data);
    } catch (error) {
      console.error("Erro ao buscar workshops:", error);
      setWorkshops([]);
    }
  };

  useEffect(() => {
    buscarWorkshops();
  }, []);

  // NOVO: useEffect para limpar a mensagem de sucesso após 5 segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000); // 5 segundos
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const getToken = () => {
    const token = "";
    if (!token) {
      console.error("Token de autenticação não encontrado!");
      return null;
    }
    return token;
  };

  const getAuthHeaders = () => {
    const token = getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  const handleSave = async (workshopData: Omit<Workshop, 'id' | 'vagasOcupadas'>) => {
    try {
      if (editingWorkshop) {
        await axios.put(`${API_URL}/workshop/${editingWorkshop.id}`, workshopData, {
          headers: getAuthHeaders()
        });
      } else {
        const workshopCompleto = { ...workshopData, vagasOcupadas: 0 };
        await axios.post(`${API_URL}/workshop`, workshopCompleto, {
          headers: getAuthHeaders()
        });
      }

      // ALTERADO: Definir a mensagem de sucesso
      setSuccessMessage(
        editingWorkshop 
          ? 'Workshop atualizado com sucesso!' 
          : 'Workshop cadastrado com sucesso!'
      );
      
      handleCloseModal();
      buscarWorkshops();
    } catch (error) {
      console.error("Erro ao salvar workshop:", error);
      alert("Falha ao salvar o workshop. Verifique o console para mais detalhes.");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este workshop?')) {
      try {
        await axios.delete(`${API_URL}/workshop/${id}`, {
          headers: getAuthHeaders()
        });
        buscarWorkshops();
        // Opcional: Adicionar mensagem de sucesso para exclusão também
        setSuccessMessage("Workshop excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir workshop:", error);
        alert("Falha ao excluir o workshop. Verifique o console para mais detalhes.");
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

      {/* NOVO: Bloco para exibir a mensagem de sucesso */}
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMessage}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setSuccessMessage("")}
            aria-label="Close"
          ></button>
        </div>
      )}

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
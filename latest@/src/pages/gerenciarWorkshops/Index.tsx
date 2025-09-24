import React, { useState, useEffect } from 'react';
import WorkshopForm from '../../assets/components/workshopForm/Index';
import WorkshopList from '../../assets/components/workshopList/Index';
import api from '../../services/api';

export interface Workshop {
  id: number;
  tema: string;
  data: string;
  vagasTotais: number;
  vagasOcupadas: number;
}

function GerenciarWorkshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [showModal, setShowModal] = useState(false);
  
  // 1. ADICIONADO: Estado para guardar os dados do workshop que está sendo editado.
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null);

  const buscarWorkshops = async () => {
    try {
      // Dica: Geralmente a rota para buscar todos é no plural ('/workshops'). Verifique se a sua API usa '/workshop' ou '/workshops'.
      const response = await api.get<Workshop[]>('/workshop');
      setWorkshops(response.data);
    } catch (error) {
      console.error("Erro ao buscar workshops:", error);
    }
  };

  useEffect(() => {
    buscarWorkshops();
  }, []);

  const handleCreate = async (novoWorkshop: Omit<Workshop, 'id' | 'vagasOcupadas'>) => {
    const workshopCompleto = { ...novoWorkshop, vagasOcupadas: 0 };
    await api.post('/workshop', workshopCompleto);
    buscarWorkshops();
  };

  // 2. ADICIONADO: Função para ATUALIZAR um workshop existente
  const handleUpdate = async (workshopData: Omit<Workshop, 'id'>) => {
    if (!editingWorkshop) return;
    await api.put(`/workshop/${editingWorkshop.id}`, workshopData);
    buscarWorkshops();
  };

  // 3. ADICIONADO: Função 'Salvar' unificada que decide se deve criar ou atualizar
  const handleSave = async (workshopData: Omit<Workshop, 'id'>) => {
    try {
      if (editingWorkshop) {
        await handleUpdate(workshopData);
      } else {
        await handleCreate(workshopData);
      }
      handleCloseModal(); // Fecha o modal após o sucesso
    } catch (error) {
      console.error("Erro ao salvar workshop:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza?')) {
      try {
        await api.delete(`/workshop/${id}`);
        buscarWorkshops();
      } catch (error) {
        console.error("Erro ao excluir workshop:", error);
      }
    }
  };
  
  // 4. ADICIONADO: Funções para abrir o modal de forma controlada
  const handleOpenCreateModal = () => {
    setEditingWorkshop(null); // Limpa o estado de edição
    setShowModal(true);
  };
  
  const handleOpenEditModal = (workshop: Workshop) => {
    setEditingWorkshop(workshop); // Define qual workshop será editado
    setShowModal(true);
  };
  
  // 5. ADICIONADO: Função para fechar e limpar o modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingWorkshop(null);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Workshops Cadastrados</h3>
        {/* ALTERADO: O botão agora chama a função específica para criar */}
        <button className="btn btn-primary" onClick={handleOpenCreateModal}>
          <i className="bi bi-plus-circle-fill me-2"></i>
          Cadastrar Workshop
        </button>
      </div>

      <WorkshopList 
        workshops={workshops} 
        onDelete={handleDelete} 
        onEdit={handleOpenEditModal} // <-- ALTERADO: Passando a função de editar
      />

      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                {/* ALTERADO: Título dinâmico */}
                <h5 className="modal-title">{editingWorkshop ? 'Editar Workshop' : 'Cadastrar Novo Workshop'}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <WorkshopForm
                  onSave={handleSave} // <-- ALTERADO: Agora chama a função unificada
                  onClose={handleCloseModal}
                  initialData={editingWorkshop} // <-- ALTERADO: Passa os dados para o formulário
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default GerenciarWorkshops;
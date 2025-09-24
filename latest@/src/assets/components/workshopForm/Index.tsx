import React, { useState, useEffect } from 'react';
import type { Workshop } from '../../../pages/gerenciarWorkshops/Index'; // Ajuste o caminho

// 1. ALTERADO: Adicionado 'initialData' para receber os dados do workshop para editar
//    E o tipo do onSave foi ajustado para enviar todos os campos necessários.
type WorkshopFormProps = {
  onSave: (data: Omit<Workshop, 'id'>) => void;
  onClose: () => void;
  initialData: Workshop | null;
};

const WorkshopForm: React.FC<WorkshopFormProps> = ({ onSave, onClose, initialData }) => {
  const [tema, setTema] = useState('');
  const [data, setData] = useState('');
  const [vagasTotais, setVagasTotais] = useState(0);
  const [vagasOcupadas, setVagasOcupadas] = useState(0);

  // 2. ADICIONADO: Este 'useEffect' preenche o formulário quando o modo de edição é ativado
  useEffect(() => {
    if (initialData) {
      setTema(initialData.tema);
      setData(initialData.data.split('T')[0]); // Formato AAAA-MM-DD para o input
      setVagasTotais(initialData.vagasTotais);
      setVagasOcupadas(initialData.vagasOcupadas);
    }
  }, [initialData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ tema, data, vagasTotais: Number(vagasTotais), vagasOcupadas: Number(vagasOcupadas) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="tema" className="form-label">Tema do Workshop</label>
        <input type="text" className="form-control" id="tema" value={tema} onChange={(e) => setTema(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="data" className="form-label">Data</label>
        <input type="date" className="form-control" id="data" value={data} onChange={(e) => setData(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="vagasTotais" className="form-label">Vagas Totais</label>
        <input type="number" className="form-control" id="vagasTotais" value={vagasTotais} onChange={(e) => setVagasTotais(Number(e.target.value))} required />
      </div>
       <div className="mb-3">
        <label htmlFor="vagasOcupadas" className="form-label">Vagas Ocupadas</label>
        <input type="number" className="form-control" id="vagasOcupadas" value={vagasOcupadas} onChange={(e) => setVagasOcupadas(Number(e.target.value))} required />
      </div>
      <div className="d-grid gap-2 mt-4">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Atualizar Workshop' : 'Salvar Novo Workshop'}
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default WorkshopForm;
import React, { useState, useEffect } from 'react';
// MUDANÇA: Usando os tipos centralizados
import type { Workshop, WorkshopRequest } from '../../../types/workshop'; 

type WorkshopFormProps = {
  // MUDANÇA: Tipando explicitamente o dado que será salvo
  onSave: (data: WorkshopRequest) => void;
  onClose: () => void;
  initialData: Workshop | null;
};

const WorkshopForm: React.FC<WorkshopFormProps> = ({ onSave, onClose, initialData }) => {
  const [tema, setTema] = useState('');
  const [data, setData] = useState('');
  const [vagasTotais, setVagasTotais] = useState(0);
  const [vagasOcupadas, setVagasOcupadas] = useState(0);

  useEffect(() => {
    if (initialData) {
      setTema(initialData.tema);
      setData(initialData.data.split('T')[0]);
      setVagasTotais(initialData.vagasTotais);
      setVagasOcupadas(initialData.vagasOcupadas);
    } else {
      // Opcional: Limpar campos se for um novo cadastro
      setTema('');
      setData('');
      setVagasTotais(0);
      setVagasOcupadas(0);
    }
  }, [initialData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // MUDANÇA: Enviando o objeto conforme o tipo WorkshopRequest
    onSave({ 
        tema, 
        data, 
        vagasTotais: Number(vagasTotais), 
        // Incluímos vagasOcupadas aqui caso a API precise na edição, 
        // mas no create o service vai ignorar ou sobrescrever com 0.
        vagasOcupadas: Number(vagasOcupadas) 
    });
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
       {/* Campo de vagas ocupadas, geralmente visível apenas na edição ou para admin */}
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
import React, { useState, useEffect } from 'react';
import type { Workshop, WorkshopRequest } from '../../../types/workshop'; 

type WorkshopFormProps = {
  onSave: (data: WorkshopRequest) => void;
  onClose: () => void;
  initialData: Workshop | null;
};

const WorkshopForm: React.FC<WorkshopFormProps> = ({ onSave, onClose, initialData }) => {
  const [tema, setTema] = useState('');
  const [data, setData] = useState('');
  const [vagasTotais, setVagasTotais] = useState(0);
  const [vagasOcupadas, setVagasOcupadas] = useState(0);
  const [local, setLocal] = useState(''); 
  

  const [errorVagas, setErrorVagas] = useState(''); 

  useEffect(() => {
    if (initialData) {
      setTema(initialData.tema);
      setData(initialData.data.split('T')[0]);
      setVagasTotais(initialData.vagasTotais);
      setVagasOcupadas(initialData.vagasOcupadas);
      setLocal(initialData.local); 
    } else {
      setTema('');
      setData('');
      setVagasTotais(0);
      setVagasOcupadas(0);
      setLocal(''); 
    }
    
    setErrorVagas(''); 
  }, [initialData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
   
    if (Number(vagasTotais) <= 0) {
        setErrorVagas("O número de vagas totais deve ser maior que zero.");
        return; 
    }

    
    setErrorVagas('');

    onSave({ 
        tema, 
        data, 
        vagasTotais: Number(vagasTotais), 
        vagasOcupadas: Number(vagasOcupadas),
        local 
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
        <label htmlFor="local" className="form-label">Local do Workshop</label>
        <input 
          type="text" 
          className="form-control" 
          id="local" 
          value={local} 
          onChange={(e) => setLocal(e.target.value)} 
          placeholder="Ex: Sala 101 ou Online"
          required 
        />
      </div>

      <div className="mb-3">
        <label htmlFor="vagasTotais" className="form-label">Vagas Totais</label>
        
      
        <input 
            type="number" 
            className={`form-control ${errorVagas ? 'is-invalid' : ''}`} 
            id="vagasTotais" 
            value={vagasTotais} 
            onChange={(e) => {
                setVagasTotais(Number(e.target.value));
                if(Number(e.target.value) > 0) setErrorVagas(''); 
            }} 
            required 
        />
        
     
        {errorVagas && (
            <div className="invalid-feedback">
                {errorVagas}
            </div>
        )}
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
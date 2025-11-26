import React, { useState, useEffect } from 'react';
import type { Workshop, WorkshopRequest } from '../../../types/workshop'; 

type WorkshopFormProps = {
  onSave: (data: WorkshopRequest) => void;
  onClose: () => void;
  initialData: Workshop | null;
};

const WorkshopForm: React.FC<WorkshopFormProps> = ({ onSave, onClose, initialData }) => {
  const [tema, setTema] = useState('');
  const [descricao, setDescricao] = useState(''); // <--- State Descrição
  const [data, setData] = useState('');
  const [local, setLocal] = useState(''); 
  const [vagasTotais, setVagasTotais] = useState(0);
  const [vagasOcupadas, setVagasOcupadas] = useState(0);
  
  // Estados de Erro
  const [errorVagas, setErrorVagas] = useState(''); 
  const [errorData, setErrorData] = useState(''); // <--- Erro Data

  useEffect(() => {
    if (initialData) {
      setTema(initialData.tema);
      setDescricao(initialData.descricao || ''); // Preenche se existir
      setData(initialData.data.split('T')[0]);
      setLocal(initialData.local); 
      setVagasTotais(initialData.vagasTotais);
      setVagasOcupadas(initialData.vagasOcupadas);
    } else {
      setTema('');
      setDescricao('');
      setData('');
      setLocal(''); 
      setVagasTotais(0);
      setVagasOcupadas(0);
    }
    setErrorVagas(''); 
    setErrorData('');
  }, [initialData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let temErro = false;


    if (Number(vagasTotais) <= 0) {
        setErrorVagas("O número de vagas totais deve ser maior que zero.");
        temErro = true;
    } else {
        setErrorVagas('');
    }

    


    if (data < new Date().toISOString().split('T')[0]) {
         setErrorData("A data não pode ser anterior a hoje.");
         temErro = true;
    } else {
         setErrorData('');
    }

    if (temErro) return;

    onSave({ 
        tema, 
        descricao, 
        data, 
        local,
        vagasTotais: Number(vagasTotais), 
        vagasOcupadas: Number(vagasOcupadas)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="tema" className="form-label">Tema do Workshop</label>
        <input type="text" className="form-control" id="tema" value={tema} onChange={(e) => setTema(e.target.value)} required />
      </div>

      {/* CAMPO DESCRIÇÃO */}
      <div className="mb-3">
        <label htmlFor="descricao" className="form-label">Descrição Detalhada</label>
        <textarea 
            className="form-control" 
            id="descricao" 
            rows={3} 
            value={descricao} 
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="O que será ensinado neste workshop?"
            required 
        />
      </div>
      
 
      <div className="mb-3">
        <label htmlFor="data" className="form-label">Data</label>
        <input 
            type="date" 
            className={`form-control ${errorData ? 'is-invalid' : ''}`} 
            id="data" 
            value={data} 
            onChange={(e) => {
                setData(e.target.value);
                setErrorData(''); 
            }} 
            required 
        />
        {errorData && <div className="invalid-feedback">{errorData}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="local" className="form-label">Local</label>
        <input type="text" className="form-control" id="local" value={local} onChange={(e) => setLocal(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label htmlFor="vagasTotais" className="form-label">Vagas Totais</label>
        <input 
            type="number" 
            className={`form-control ${errorVagas ? 'is-invalid' : ''}`} 
            id="vagasTotais" 
            value={vagasTotais} 
            onChange={(e) => setVagasTotais(Number(e.target.value))} 
            required 
        />
        {errorVagas && <div className="invalid-feedback">{errorVagas}</div>}
      </div>

 
       <div className="mb-3">
        <label htmlFor="vagasOcupadas" className="form-label">Vagas Ocupadas</label>
        <input type="number" className="form-control" value={vagasOcupadas} onChange={(e) => setVagasOcupadas(Number(e.target.value))} required />
      </div>

      <div className="d-grid gap-2 mt-4">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Atualizar Workshop' : 'Salvar Novo Workshop'}
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancelar</button>
      </div>
    </form>
  );
};

export default WorkshopForm;
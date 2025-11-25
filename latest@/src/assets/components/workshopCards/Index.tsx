import React from 'react';

import type { Workshop } from '../../../types/workshop'; 

type WorkshopCardProps = {
  workshop: Workshop;
  onVerDetalhes: (workshop: Workshop) => void; 
};

const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop, onVerDetalhes }) => {
  const vagasRestantes = workshop.vagasTotais - workshop.vagasOcupadas;

  return (
    <div className="card h-100 shadow-sm hover-shadow">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{workshop.tema}</h5>
        <hr />
        <p className="card-text d-flex align-items-center mb-2">
          <i className="bi bi-calendar-event me-2"></i>
          {new Date(workshop.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
        </p>
        <p className="card-text d-flex align-items-center mb-2">
          <i className="bi bi-people-fill me-2"></i>
          Vagas restantes: {vagasRestantes}
        </p>
        <p className="card-text d-flex align-items-center text-muted">
          <i className="bi bi-person-check-fill me-2"></i>
          Inscritos: {workshop.vagasOcupadas} / {workshop.vagasTotais}
        </p>
<button 
          className="btn btn-primary mt-auto w-100" 
          onClick={() => onVerDetalhes(workshop)}
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  );
};

export default WorkshopCard;
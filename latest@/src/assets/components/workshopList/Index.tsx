

import React from "react";
import type { Workshop } from "../../../types/workshop";

type WorkshopListProps = {
  workshops: Workshop[];
  onDelete: (id: number) => void;
  onEdit: (workshop: Workshop) => void;
};

const WorkshopList: React.FC<WorkshopListProps> = ({ workshops, onDelete, onEdit }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className="text-center align-middle">Tema</th>
            <th className="text-center align-middle">Data</th>
            <th className="text-center align-middle">Vagas Totais</th>
            <th className="text-center align-middle">Vagas Ocupadas</th>
            <th className="text-center align-middle">Ações</th>
          </tr>
        </thead>
        <tbody>
          {workshops.map((ws) => (
            <tr key={ws.id}>
              <td className="text-center align-middle">{ws.tema}</td>
              <td className="text-center align-middle">
                {new Date(ws.data).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
              </td>
              <td className="text-center align-middle">{ws.vagasTotais}</td>
              <td className="text-center align-middle">{ws.vagasOcupadas}</td>
              <td className="text-center align-middle">
                <button
                  className="btn btn-primary btn-sm me-2"
                  title="Editar"
                  onClick={() => onEdit(ws)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  title="Excluir"
                  onClick={() => {
                    if (confirm(`Deseja realmente excluir "${ws.tema}"?`)) {
                      onDelete(ws.id);
                    }
                  }}
                >
                  <i className="bi bi-trash3-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkshopList;
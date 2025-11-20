export interface Workshop {
  id: number;
  tema: string;
  data: string;
  vagasTotais: number;
  vagasOcupadas: number;
}

// Tipo para criação/edição (sem ID e sem vagasOcupadas no cadastro)
export type WorkshopRequest = Omit<Workshop, "id">;

export interface Workshop {
  id: number;
  tema: string;
  data: string;
  vagasTotais: number;
  vagasOcupadas: number;
  local: string;
}


export type WorkshopRequest = Omit<Workshop, "id">;

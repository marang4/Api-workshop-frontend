import api from "./api"; // O mesmo api que você usou no Login
import type { Workshop, WorkshopRequest } from "../types/workshop";

// Buscar todos
export async function getWorkshops(): Promise<Workshop[]> {
  const response = await api.get<Workshop[]>("workshop");
  return response.data;
}

// Criar novo
export async function createWorkshop(workshop: WorkshopRequest): Promise<Workshop> {
  // Assumindo que o backend retorna o objeto criado
  const response = await api.post<Workshop>("workshop", { ...workshop, vagasOcupadas: 0 });
  return response.data;
}

// Atualizar
export async function updateWorkshop(id: number, workshop: WorkshopRequest): Promise<Workshop> {
  const response = await api.put<Workshop>(`workshop/${id}`, workshop);
  return response.data;
}

// Deletar
export async function deleteWorkshop(id: number): Promise<void> {
  await api.delete(`workshop/${id}`);
}
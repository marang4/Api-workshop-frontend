import api from "./api"; 
import type { Workshop, WorkshopRequest } from "../types/workshop";
import { store } from "../store/store";

// Buscar todos (Vitrine)
export async function getWorkshops(): Promise<Workshop[]> {
  
  const response = await api.get<Workshop[]>("workshop");
  return response.data;
}

export async function getMeusWorkshops(): Promise<Workshop[]> {

  const state = store.getState();
  const token = state.auth.token;

  const response = await api.get<Workshop[]>("workshop/gerenciar", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}


export async function createWorkshop(workshop: WorkshopRequest): Promise<Workshop> {
  const response = await api.post<Workshop>("workshop", { ...workshop, vagasOcupadas: 0 });
  return response.data;
}

export async function updateWorkshop(id: number, workshop: WorkshopRequest): Promise<Workshop> {
  const response = await api.put<Workshop>(`workshop/${id}`, workshop);
  return response.data;
}

export async function deleteWorkshop(id: number): Promise<void> {
  await api.delete(`workshop/${id}`);
}
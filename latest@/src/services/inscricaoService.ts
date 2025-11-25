import api from "./api";


export interface InscricaoRequest {
  usuarioId: number;
  workshopId: number;
}


export interface InscricaoResponse {
  id: number;
  nomeUsuario: string;
  temaWorkshop: string;
  dataInscricao: string;
}


export async function realizarInscricao(dados: InscricaoRequest): Promise<InscricaoResponse> {
  const response = await api.post<InscricaoResponse>("inscricoes", dados);
  return response.data;
}


export async function verificarStatusInscricao(idUsuario: number, idWorkshop: number): Promise<boolean> {
  const response = await api.get<boolean>(`/inscricoes/status?idUsuario=${idUsuario}&idWorkshop=${idWorkshop}`);
  return response.data;
}

// Cancelar
export async function cancelarInscricao(dados: InscricaoRequest): Promise<void> {
 
  await api.delete("/inscricoes/cancelar", { data: dados });
}
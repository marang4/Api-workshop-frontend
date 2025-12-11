import api from "./api"; // O mesmo api que você usou no Login
import type { Workshop, WorkshopRequest } from "../types/workshop";


export interface UsuarioDTO {
  id: number;
  nome: string;
  email: string;
  role: string;
}

export interface CriarUsuarioRequest {
  nome: string;
  email: string;
  senha: string;
  role: string;
  cpf: string;
}

export interface CadastroPublicoRequest {
  nome: string;
  email: string;
  senha: string;
  cpf: string; 
  role: string; 
}


export async function getUsuarios(): Promise<UsuarioDTO[]> {
  const response = await api.get<UsuarioDTO[]>("/usuarios");
  return response.data;
}


export async function criarUsuarioAdmin(dados: CriarUsuarioRequest): Promise<UsuarioDTO> {
  const response = await api.post<UsuarioDTO>("/usuarios/admin/criar", dados);
  return response.data;
}


export async function getWorkshops(): Promise<Workshop[]> {
  const response = await api.get<Workshop[]>("workshop");
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

export async function deleteUsuario(id: number): Promise<void> {

  await api.delete(`/usuarios/${id}`);
}

export async function cadastrarUsuarioPublico(dados: CadastroPublicoRequest): Promise<void> {
  
  await api.post("/usuarios", dados);
}
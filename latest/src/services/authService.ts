import api from "./api";

export interface EsqueciSenhaRequest {
  email: string;
}

export interface RedefinirSenhaRequest {
  token: string;
  senha: string; 
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
}

export interface AlterarSenhaRequest {
  senhaAtual: string;
  novaSenha: string;
}

export async function solicitarRecuperacaoSenha(email: string): Promise<void> {

  await api.post("/auth/esqueciminhasenha", { email });
}


export async function salvarNovaSenha(dados: RedefinirSenhaRequest): Promise<void> {
  await api.post("/auth/registrarnovasenha", dados);
}

export async function LoginNovo(loginRequest:LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("auth/login",loginRequest);
 
  return response.data;
}

export async function alterarSenhaLogado(dados: AlterarSenhaRequest): Promise<void> {
  // O token vai automático pelo interceptor do api.ts
  await api.post("/auth/alterarsenha", dados);
}



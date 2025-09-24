import axios from 'axios';

// Criamos uma instância "inteligente" do Axios
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Esta é a parte mais importante: O Interceptor de Requisição
// Ele "intercepta" cada requisição ANTES dela ser enviada.
api.interceptors.request.use(
  (config) => {
    // 1. Pega o token salvo no localStorage
    const token = localStorage.getItem('authToken');

    // 2. Se o token existir, ele o anexa no cabeçalho 'Authorization'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 3. Deixa a requisição continuar, agora com o token
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// (O interceptor de resposta para 401 também é útil, mas o de requisição resolve o problema principal)
api.interceptors.response.use(
  (response) => response,
  (error) => {
      if (error.response && error.response.status === 401) {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
      }
      return Promise.reject(error);
  }
);


export default api;
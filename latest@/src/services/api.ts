import axios from 'axios';
import { store } from '../store/store'; 
import { logout } from '../store/authSlice';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
});


api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
     
      console.warn("Sessão expirada. Fazendo logout...");
      
     
      store.dispatch(logout());
      

    }
    return Promise.reject(error);
  }
);

export default api;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// Supondo que você tenha estas interfaces no arquivo
interface LoginRequest {
  email: string;
  senha: string;
}

interface LoginResponse {
  token: string;
}

const Login = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  const API_URL = "http://localhost:8080";

  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    senha: "",
  });

  // 1. Criamos um estado para armazenar a mensagem de erro (isto não muda)
  const [error, setError] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Limpamos qualquer erro anterior
    setError("");

    try {
      const response = await axios.post<LoginResponse>(
        `${API_URL}/auth/login`,
        formData
      );

      const token = response.data.token;

      if (token) {
        // 2. Como não temos contexto, salvamos o token diretamente no localStorage
        localStorage.setItem('authToken', token);

        // 3. Para garantir que o resto da aplicação reconheça o novo login,
        // forçar um recarregamento completo da página é a abordagem mais segura.
        window.location.href = "/";
      } else {
        setError("Ocorreu um erro inesperado. Tente novamente.");
      }

    } catch (err) {
      // 4. Se o login falhar, mostramos a mensagem de erro
      console.error("Erro de login:", err);
      setError("Email ou senha inválidos. Por favor, tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* O alerta de erro continua funcionando da mesma forma */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          name="email"
          type="email"
          className="form-control"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Senha</label>
        <input
          name="senha"
          type="password"
          className="form-control"
          id="password"
          value={formData.senha}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100 mb-3">
        Entrar
      </button>
      <div className="text-center">
        <p>
          Não tem uma conta? <Link to="/cadastre-se">Cadastre-se</Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
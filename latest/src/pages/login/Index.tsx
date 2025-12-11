import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginNovo } from "../../services/authService";
import { loginSuccess } from "../../store/authSlice";

// Interfaces...
interface LoginResponseData {
  token: string;
  usuario: {
    id: number;
    nome: string;
    email: string;
    role: string;
  };
}

interface LoginRequest {
  email: string;
  senha: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    senha: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const data = (await LoginNovo(formData)) as unknown as LoginResponseData;

      if (data.token) {
        const usuarioLogin = {
          usuario: {
            id: data.usuario.id,
            email: data.usuario.email,
            nome: data.usuario.nome,
            role: data.usuario.role || "USER",
          },
          token: data.token,
        };

        dispatch(loginSuccess(usuarioLogin));
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 401 || status === 403 || status === 400) {
          setErrorMessage("Email ou senha inválidos.");
        } else {
          setErrorMessage("Erro ao processar login.");
        }
      } else {
        setErrorMessage("Erro de conexão com o servidor.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-3" style={{ maxWidth: "400px" }}>
      
  
      <div className="mb-3">
        <Link to="/" className="text-decoration-none text-secondary small">
          <i className="bi bi-arrow-left me-1"></i>
          Voltar para o site
        </Link>
      </div>

      <div className="card shadow-sm p-4 border-0">
        <h4 className="text-center mb-4 text-primary">Login</h4>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              name="email"
              type="text"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
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
              disabled={isLoading}
              required
            />
          </div>

          <div className="text-end mb-3">
            <Link 
                to="/esqueci-senha" 
                className="text-decoration-none small text-muted"
            >
                Esqueci minha senha
            </Link>
          </div>

          {errorMessage && (
            <div className="alert alert-danger py-2 small" role="alert">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </button>

          <div className="text-center mt-3">
            <p className="mb-0 small text-muted">
              Não tem uma conta? <Link to="/cadastre-se" className="fw-bold text-decoration-none">Cadastre-se</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
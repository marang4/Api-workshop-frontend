import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginNovo } from "../../services/authService";
import { loginSuccess } from "../../store/authSlice";

// Suas interfaces permanecem as mesmas
interface LoginRequest {
  email: string;
  senha: string;
}


const Login = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  // Seu estado de formulário permanece o mesmo
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    senha: "",
  });

  // 1. Adicionado um novo estado APENAS para a mensagem de erro
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Sua função handleChange permanece a mesma
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(""); // Limpa erros antigos antes de uma nova tentativa

    try {
      const loginResponse = await LoginNovo(formData);

      const token = loginResponse.token;
      console.log(token);

      if (token != null) {
         const usuarioLogin = { 
          usuario: { email: formData.email, nome: ""},
          token: token
         };
         dispatch(loginSuccess(usuarioLogin));
        navigator("/");
      }

    } catch (error) {
      // 2. Lógica de erro atualizada para definir a mensagem no estado
      if (axios.isAxiosError(error) && error.response) {
        // Erro vindo da API (ex: 400, 401, 403)
        setErrorMessage("Email ou senha inválidos. Por favor, tente novamente.");
      } else {
        // Outros erros (ex: rede)
        setErrorMessage("Não foi possível conectar ao servidor. Verifique sua conexão.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          name="email"
          type="text"
          className="form-control"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Senha
        </label>
        <input
          name="senha"
          type="password"
          className="form-control"
          id="password"
          value={formData.senha}
          onChange={handleChange}
        />
      </div>

      {/* 3. Bloco para exibir a mensagem de erro, somente se ela existir */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <button type="submit" className="btn btn-primary w-100 mb-3 mt-2">
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

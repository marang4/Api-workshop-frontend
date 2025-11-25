import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { cadastrarUsuarioPublico } from "../../../services/usuarioService";

function Cadastro() {
  const navigate = useNavigate();
  
  
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState(""); 
  const [loading, setLoading] = useState(false);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true);

    try {
      await cadastrarUsuarioPublico({
        nome,
        email,
        senha,
        cpf,
        role: "USER" 
      });

      alert("Conta criada com sucesso! Faça login.");
      navigate("/login"); 

    } catch (error) {
      console.error(error);
      alert("Erro ao criar conta. Verifique se o email ou CPF já existem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Adicionamos onSubmit no formulário
    <form onSubmit={handleSubmit}>
      
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nome Completo</label>
        <input 
          type="text" 
          className="form-control" 
          id="name" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>

      
      <div className="mb-3">
        <label htmlFor="cpf" className="form-label">CPF</label>
        <input 
          type="text" 
          className="form-control" 
          id="cpf" 
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
          maxLength={11} 
          placeholder="Somente números"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input 
          type="email" 
          className="form-control" 
          id="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Senha</label>
        <input 
          type="password" 
          className="form-control" 
          id="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>

      <button 
        type="submit" 
        className="btn btn-success w-100 mb-3"
        disabled={loading}
      >
        {loading ? "Criando..." : "Criar Conta"}
      </button>

      <div className="text-center">
        <p>
          Já tem uma conta? <Link to="/login">Faça Login</Link>
        </p>
      </div>
    </form>
  );
};

export default Cadastro;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { solicitarRecuperacaoSenha } from '../../services/authService';

function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensagem("");

    try {
      await solicitarRecuperacaoSenha(email);
      setMensagem("Se este e-mail estiver cadastrado, você receberá um link em instantes.");
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao solicitar recuperação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-3">Recuperar Senha</h3>
        <p className="text-muted small text-center">
          Digite seu e-mail para receber o link de redefinição.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          {mensagem && (
            <div className={`alert ${mensagem.includes("Erro") ? "alert-danger" : "alert-success"} small`}>
              {mensagem}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
            {loading ? "Enviando..." : "Enviar Link"}
          </button>

          <div className="text-center">
            <Link to="/login">Voltar para o Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EsqueciSenha;
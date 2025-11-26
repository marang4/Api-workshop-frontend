import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { salvarNovaSenha } from '../../services/authService';

function RedefinirSenha() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  

  const token = searchParams.get('token');

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      alert("Link inválido.");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (!token) return;

    setLoading(true);
    try {
      
      await salvarNovaSenha({
        token: token,
        senha: novaSenha
      });

      alert("Senha alterada com sucesso!");
      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Erro ao redefinir. O link pode ter expirado.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) return null;

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-3">Nova Senha</h3>
        <form onSubmit={handleSubmit}>
        
           <div className="mb-3">
            <label className="form-label">Nova Senha</label>
            <input type="password" className="form-control" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} required minLength={6} />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirmar</label>
            <input type="password" className="form-control" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? "Salvando..." : "Redefinir Senha"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RedefinirSenha;
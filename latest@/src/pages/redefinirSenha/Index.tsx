import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { salvarNovaSenha } from '../../services/authService';

function RedefinirSenha() {
  const navigate = useNavigate();
  
 
  const [searchParams] = useSearchParams();
  
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    if (!token || !email) {
      alert("Link inválido ou expirado.");
      navigate("/login");
    }
  }, [token, email, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (!token || !email) return;

    setLoading(true);
    try {
      await salvarNovaSenha({
        email: email,
        token: token,
        senha: novaSenha
      });

      alert("Senha alterada com sucesso! Faça login com a nova senha.");
      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Erro ao redefinir senha. O link pode ter expirado.");
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) return null;

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-3">Nova Senha</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nova Senha</label>
            <input 
              type="password" 
              className="form-control" 
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              required 
              minLength={6}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirmar Nova Senha</label>
            <input 
              type="password" 
              className="form-control" 
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required 
            />
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
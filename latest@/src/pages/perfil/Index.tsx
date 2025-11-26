import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { alterarSenhaLogado } from '../../services/authService';

function Perfil() {
  const { usuario } = useSelector((state: RootState) => state.auth);
  
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAlterarSenha = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await alterarSenhaLogado({ senhaAtual, novaSenha });
      alert("Senha alterada com sucesso!");
      setSenhaAtual("");
      setNovaSenha("");
    } catch (error: any) {

      const msg = error.response?.data || "Erro ao alterar senha.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0 fs-5"><i className="bi bi-person-circle me-2"></i>Meu Perfil</h4>
            </div>
            
            <div className="card-body p-4">
              
              {/* DADOS DO USUÁRIO (Sem a Role) */}
              <h5 className="mb-3 text-secondary border-bottom pb-2">Informações Pessoais</h5>
              <div className="mb-4">
                <p className="mb-2"><strong>Nome:</strong> {usuario?.nome}</p>
                <p className="mb-2"><strong>Email:</strong> {usuario?.email}</p>
                {/* REMOVIDO O CAMPO PERMISSÃO/ROLE DAQUI */}
              </div>

              {/* FORMULÁRIO DE SENHA */}
              <h5 className="mb-3 text-secondary border-bottom pb-2">Segurança</h5>
              <form onSubmit={handleAlterarSenha}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small text-muted">Senha Atual</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      value={senhaAtual}
                      onChange={e => setSenhaAtual(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small text-muted">Nova Senha</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      value={novaSenha}
                      onChange={e => setNovaSenha(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  
                  <div className="col-12 mt-3">
                    <button type="submit" className="btn btn-warning w-100" disabled={loading}>
                      {loading ? "Salvando..." : "Atualizar Senha"}
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../store/store';

// Imports dos Services e Slices
import { getUsuarios, criarUsuarioAdmin, deleteUsuario } from '../../services/usuarioService';
import { setUsuariosList, addUsuarioToList, removeUsuarioFromList } from '../../store/usuarioSlice';

function GerenciarUsuarios() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dados do Redux
  const usuarios = useSelector((state: RootState) => state.usuarios.lista);
  const { usuario } = useSelector((state: RootState) => state.auth);
  
  const [loading, setLoading] = useState(true);

  // Estados do Formulário
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [novaRole, setNovaRole] = useState("ORGANIZADOR");
  const [showForm, setShowForm] = useState(false);

  // Segurança: Verifica se é Admin
  const ehAdmin = usuario?.role && usuario.role.toUpperCase().includes("ADMIN");

  useEffect(() => {
    if (!ehAdmin) {
      navigate("/");
    }
  }, [ehAdmin, navigate]);

  // Carregar Dados
  useEffect(() => {
    const fetchDados = async () => {
      if (ehAdmin) {
        try {
          const dados = await getUsuarios();
          dispatch(setUsuariosList(dados));
        } catch (error) {
          console.error("Erro ao buscar usuários:", error);
          // alert("Erro ao carregar lista."); // Opcional: comentar para evitar spam de alert
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDados();
  }, [dispatch, ehAdmin]);

  // Criar Usuário
  const handleCriarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const novoUsuario = await criarUsuarioAdmin({
        nome: novoNome,
        email: novoEmail,
        senha: novaSenha,
        role: novaRole,
        cpf: "00000000000"
      });
      
      dispatch(addUsuarioToList(novoUsuario));
      alert("Usuário cadastrado com sucesso!");
      
      // Limpa e fecha
      setShowForm(false);
      setNovoNome("");
      setNovoEmail("");
      setNovaSenha("");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar. Verifique os dados.");
    }
  };

  // Excluir Usuário
  const handleDelete = async (id: number, nome: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o usuário "${nome}"?`)) {
      try {
        await deleteUsuario(id);
        dispatch(removeUsuarioFromList(id));
        alert("Usuário excluído com sucesso!");
      } catch (error) {
        console.error(error);
        alert("Erro ao excluir usuário.");
      }
    }
  };

  if (!ehAdmin) return null;

  return (
    <div className="container mt-5 pb-5"> {/* pb-5 dá um espaço no final da página */}
      
      {/* Cabeçalho da Página - Flex para alinhar botão em telas pequenas */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <h2 className="mb-0">Gerenciar Usuários</h2>
        <button 
          className={`btn ${showForm ? 'btn-secondary' : 'btn-success'}`} 
          onClick={() => setShowForm(!showForm)}
        >
          <i className={`bi ${showForm ? 'bi-x-lg' : 'bi-person-plus-fill'} me-2`}></i>
          {showForm ? 'Cancelar Cadastro' : 'Novo Usuário'}
        </button>
      </div>

      {/* Formulário de Cadastro (Responsivo) */}
      {showForm && (
        <div className="card p-4 mb-4 shadow-sm bg-light border-0">
          <h5 className="mb-3 border-bottom pb-2">Cadastrar Novo Membro</h5>
          <form onSubmit={handleCriarUsuario}>
            <div className="row g-3"> {/* g-3 dá espaçamento uniforme entre colunas */}
              
              <div className="col-12 col-md-6 col-lg-3">
                <label className="form-label small text-muted">Nome</label>
                <input type="text" className="form-control" value={novoNome} onChange={e => setNovoNome(e.target.value)} required />
              </div>
              
              <div className="col-12 col-md-6 col-lg-3">
                <label className="form-label small text-muted">Email</label>
                <input type="email" className="form-control" value={novoEmail} onChange={e => setNovoEmail(e.target.value)} required />
              </div>
              
              <div className="col-12 col-md-6 col-lg-3">
                <label className="form-label small text-muted">Senha</label>
                <input type="password" className="form-control" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} required />
              </div>
              
              <div className="col-12 col-md-6 col-lg-3">
                <label className="form-label small text-muted">Permissão</label>
                <select className="form-select" value={novaRole} onChange={e => setNovaRole(e.target.value)}>
                  <option value="ORGANIZADOR">Organizador</option>
                  <option value="ADMIN">Administrador</option>
                  <option value="USER">Usuário Comum</option>
                </select>
              </div>

              <div className="col-12 mt-4 text-end">
                <button type="submit" className="btn btn-primary px-4">
                  <i className="bi bi-check-lg me-2"></i> Salvar
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Tabela de Usuários (Responsiva) */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          ) : (
            // DIV TABLE-RESPONSIVE: O segredo para não quebrar no celular
            <div className="table-responsive">
              <table className="table table-striped table-hover mb-0 align-middle">
                <thead className="table-dark">
                  <tr>
                    <th className="py-3 ps-3">ID</th>
                    <th className="py-3">Nome</th>
                    <th className="py-3">Email</th>
                    <th className="py-3">Permissão</th>
                    <th className="py-3 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.length > 0 ? (
                    usuarios.map(u => (
                      <tr key={u.id}>
                        <td className="ps-3 fw-bold text-secondary">#{u.id}</td>
                        <td className="fw-medium">{u.nome}</td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`badge rounded-pill ${
                            u.role.includes('ADMIN') ? 'bg-danger' : 
                            u.role.includes('ORGANIZADOR') ? 'bg-warning text-dark' : 
                            'bg-secondary'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        
                        {/* Botão de Ação com text-nowrap para não quebrar */}
                        <td className="text-center text-nowrap">
                          <button 
                            className="btn btn-danger btn-sm" 
                            onClick={() => handleDelete(u.id, u.nome)}
                            title="Excluir Usuário"
                            // Desabilita botão se for o próprio usuário (visual)
                            disabled={u.id === usuario?.id}
                            style={{ opacity: u.id === usuario?.id ? 0.5 : 1 }}
                          >
                            <i className="bi bi-trash3-fill"></i> 
                            <span className="d-none d-md-inline ms-1">Excluir</span> {/* Texto some no celular, fica só ícone */}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-muted">
                        Nenhum usuário encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GerenciarUsuarios;
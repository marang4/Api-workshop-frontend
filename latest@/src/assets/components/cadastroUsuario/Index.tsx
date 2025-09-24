import { Link } from "react-router-dom";

function Cadastro() {
  return (
    <form>
      {/* ... campos de nome, email, senha ... */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nome Completo
        </label>
        <input type="text" className="form-control" id="name" />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input type="email" className="form-control" id="email" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Senha
        </label>
        <input type="password" className="form-control" id="password" />
      </div>
      <button type="submit" className="btn btn-success w-100 mb-3">
        Criar Conta
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

// src/layouts/LayoutLogin.jsx

import { Outlet } from "react-router-dom";

// Imagem de fundo em Base64 (padrão geométrico sutil)
// Você pode gerar a sua em sites como: https://www.base64-image.de/
const base64BgImage =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDIwIDEyIj48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGlkPSJ0aWxlIiBmaWxsPSIjZWRlZGVkIj48cGF0aCBkPSJNMCAwIGg0djRIMHptOCA0aDR2NEg4em04IDRoNHY0aC00ek0wIDhoNHY0SDB6Ii8+PC9nPjwvZz48L3N2Zz4=";

const layoutStyle = {
  backgroundImage: `url("${base64BgImage}")`,
  backgroundRepeat: "repeat", // Repete o padrão
  backgroundSize: "auto", // Tamanho automático para o padrão
};

function LayoutLogin() {
  return (
    // Container principal que ocupa a tela inteira e centraliza o conteúdo
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={layoutStyle}
    >
      {/* Card centralizado que conterá o formulário.
        - w-100 para ser responsivo em telas pequenas
        - col-xx-x para limitar a largura em telas maiores
        - bg-white, rounded, shadow para dar o efeito de "card"
      */}
      <div className="col-11 col-sm-10 col-md-7 col-lg-5 col-xl-4 bg-white p-4 p-md-5 rounded-3 shadow">
        {/* Logo ou Título (Opcional) */}
        <div className="text-center mb-4">
          <h2 className="fw-bold">Bem-vindo(a)</h2>
          <p className="text-muted">
            Acesse sua conta ou crie um novo cadastro.
          </p>
        </div>

        {/* É aqui que o React Router irá renderizar a página de Login ou Cadastro */}
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutLogin;

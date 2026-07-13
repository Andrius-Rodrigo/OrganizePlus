import { FaBars, FaBell } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import "../styles/header.css";

const titulos = {
  "/dashboard": ["Dashboard", "Acompanhe sua vida financeira"],
  "/receitas": ["Receitas", "Gerencie suas entradas financeiras"],
  "/despesas": ["Despesas", "Controle seus gastos e pagamentos"],
  "/categorias": ["Categorias", "Organize seus lançamentos"],
  "/perfil": ["Perfil", "Informações da sua conta"],
};

function Header({ abrirMenu }) {
  const { pathname } = useLocation();
  const [titulo, subtitulo] = titulos[pathname] || ["Organize+", "Controle financeiro"];
  const email = localStorage.getItem("usuario_email") || "Usuário";

  return (
    <header className="header">
      <div className="header-title">
        <button className="menu-button" onClick={abrirMenu}><FaBars /></button>
        <div><h1>{titulo}</h1><p>{subtitulo}</p></div>
      </div>
      <div className="header-actions">
        <button className="icon-button" aria-label="Notificações"><FaBell /></button>
        <div className="user-chip"><span>{email.charAt(0).toUpperCase()}</span><div><strong>{email.split("@")[0]}</strong><small>{email}</small></div></div>
      </div>
    </header>
  );
}

export default Header;

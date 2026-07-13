import { NavLink, useNavigate } from "react-router-dom";
import { FaChartPie, FaMoneyBillTrendUp, FaWallet, FaTags, FaUser, FaRightFromBracket, FaXmark, FaPiggyBank } from "react-icons/fa6";
import "../styles/sidebar.css";

const itens = [
  { to: "/dashboard", label: "Dashboard", icon: FaChartPie },
  { to: "/receitas", label: "Receitas", icon: FaMoneyBillTrendUp },
  { to: "/despesas", label: "Despesas", icon: FaWallet },
  { to: "/categorias", label: "Categorias", icon: FaTags },
  { to: "/perfil", label: "Perfil", icon: FaUser },
];

function Sidebar({ aberto, fechar }) {
  const navigate = useNavigate();

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario_id");
    localStorage.removeItem("usuario_email");
    navigate("/");
  }

  return (
    <aside className={`sidebar ${aberto ? "sidebar-open" : ""}`}>
      <div>
        <div className="sidebar-brand">
          <div className="brand-mark"><FaPiggyBank /></div>
          <div><strong>Organize+</strong><span>Finanças pessoais</span></div>
          <button className="sidebar-close" onClick={fechar}><FaXmark /></button>
        </div>
        <nav className="sidebar-nav">
          {itens.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={fechar} className={({ isActive }) => isActive ? "active" : ""}>
              <Icon /><span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <button className="logout" onClick={sair}><FaRightFromBracket /> Sair da conta</button>
    </aside>
  );
}

export default Sidebar;

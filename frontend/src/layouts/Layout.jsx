import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/layout.css";

function Layout() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar aberto={menuAberto} fechar={() => setMenuAberto(false)} />
      {menuAberto && <button className="sidebar-overlay" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}
      <div className="app-content">
        <Header abrirMenu={() => setMenuAberto(true)} />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;

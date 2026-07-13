import { FaUser, FaEnvelope, FaHashtag, FaShieldHalved } from "react-icons/fa6";
import "../styles/pages.css";

function Perfil() {
  const email = localStorage.getItem("usuario_email") || "Não informado";
  const id = localStorage.getItem("usuario_id") || "-";
  return <div className="profile-page"><section className="profile-card"><div className="profile-cover"></div><div className="profile-main"><div className="profile-avatar">{email.charAt(0).toUpperCase()}</div><div><h2>{email.split("@")[0]}</h2><p>Usuário Organize+</p></div></div><div className="profile-info"><div><span><FaEnvelope /></span><div><small>E-mail</small><strong>{email}</strong></div></div><div><span><FaHashtag /></span><div><small>ID do usuário</small><strong>{id}</strong></div></div><div><span><FaShieldHalved /></span><div><small>Sessão</small><strong>Autenticada com JWT</strong></div></div><div><span><FaUser /></span><div><small>Tipo de conta</small><strong>Conta pessoal</strong></div></div></div></section><aside className="presentation-card"><h3>Organize+</h3><p>Aplicação web para controle financeiro pessoal desenvolvida com React + Vite no frontend e Flask no backend.</p><div><span>Frontend</span><strong>React</strong></div><div><span>Backend</span><strong>Flask</strong></div><div><span>Autenticação</span><strong>JWT</strong></div></aside></div>;
}
export default Perfil;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope, FaPiggyBank } from "react-icons/fa6";
import api from "../api/api";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar(e) {
    e.preventDefault(); setErro(""); setCarregando(true);
    try {
      const resposta = await api.post("/login", { email, senha });
      localStorage.setItem("token", resposta.data.access_token);
      localStorage.setItem("usuario_id", resposta.data.usuario_id);
      localStorage.setItem("usuario_email", email);
      navigate("/dashboard");
    } catch (error) { setErro(error.response?.data?.erro || "Usuário ou senha inválidos"); }
    finally { setCarregando(false); }
  }

  return <div className="login-page">
    <section className="login-hero">
      <div className="login-brand"><span><FaPiggyBank /></span><div>Organize+<small>Finanças pessoais</small></div></div>
      <div className="hero-copy"><div className="mascot"><FaPiggyBank /></div><h1>Organize hoje.<br/>Realize amanhã.</h1><p>Controle suas finanças de um jeito simples, leve e feito para todas as fases da vida.</p></div>
      <small>Organize+ • Seu dinheiro, suas escolhas.</small>
    </section>
    <section className="login-panel"><form className="login-card" onSubmit={entrar}>
      <div className="mobile-brand"><FaPiggyBank /> Organize+</div><span className="login-eyebrow">BEM-VINDO</span><h2>Que bom ter você aqui!</h2><p>Entre na sua conta e continue cuidando dos seus planos.</p>
      {erro && <div className="login-error">{erro}</div>}
      <label>E-mail<div className="input-icon"><FaEnvelope /><input type="email" placeholder="seu@email.com" value={email} onChange={e=>setEmail(e.target.value)} required /></div></label>
      <label>Senha<div className="input-icon"><FaLock /><input type="password" placeholder="Sua senha" value={senha} onChange={e=>setSenha(e.target.value)} required /></div></label>
      <button disabled={carregando}>{carregando ? "Entrando..." : "Entrar no Organize+"}</button>
      <div className="register-call">Ainda não faz parte? <Link to="/cadastro">Criar minha conta</Link></div>
      <small>Controle financeiro simples e seguro.</small>
    </form></section>
  </div>;
}
export default Login;

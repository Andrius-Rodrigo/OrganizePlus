import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPiggyBank, FaArrowLeft } from "react-icons/fa6";
import api from "../api/api";
import "../styles/login.css";

function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", senha: "", confirmar: "" });
  const [erro, setErro] = useState(""); const [sucesso, setSucesso] = useState(""); const [carregando, setCarregando] = useState(false);
  const alterar = e => setForm({ ...form, [e.target.name]: e.target.value });
  async function cadastrar(e) {
    e.preventDefault(); setErro(""); setSucesso("");
    if (form.senha.length < 4) return setErro("A senha deve ter pelo menos 4 caracteres.");
    if (form.senha !== form.confirmar) return setErro("As senhas não são iguais.");
    setCarregando(true);
    try { await api.post("/usuarios", { nome: form.nome, email: form.email, senha: form.senha }); setSucesso("Conta criada! Você já pode entrar."); setTimeout(()=>navigate("/"), 1200); }
    catch (error) { setErro(error.response?.data?.erro || "Não foi possível criar a conta. Verifique se o e-mail já está cadastrado."); }
    finally { setCarregando(false); }
  }
  return <div className="login-page cadastro-page">
    <section className="login-hero"><div className="login-brand"><span><FaPiggyBank /></span><div>Organize+<small>Finanças pessoais</small></div></div><div className="hero-copy"><div className="mascot"><FaPiggyBank /></div><h1>Seu futuro começa com organização.</h1><p>Crie sua conta gratuitamente e dê o primeiro passo para uma vida financeira mais tranquila.</p></div><small>Organize+ • Pequenos hábitos, grandes planos.</small></section>
    <section className="login-panel"><form className="login-card cadastro-card" onSubmit={cadastrar}><Link className="back-login" to="/"><FaArrowLeft /> Voltar ao login</Link><span className="login-eyebrow">NOVA CONTA</span><h2>Faça parte do Organize+</h2><p>Leva menos de um minuto para começar.</p>{erro && <div className="login-error">{erro}</div>}{sucesso && <div className="login-success">{sucesso}</div>}
      <label>Nome<div className="input-icon"><FaUser /><input name="nome" placeholder="Como podemos chamar você?" value={form.nome} onChange={alterar} required /></div></label>
      <label>E-mail<div className="input-icon"><FaEnvelope /><input name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={alterar} required /></div></label>
      <div className="password-grid"><label>Senha<div className="input-icon"><FaLock /><input name="senha" type="password" placeholder="Sua senha" value={form.senha} onChange={alterar} required /></div></label><label>Confirmar senha<div className="input-icon"><FaLock /><input name="confirmar" type="password" placeholder="Repita a senha" value={form.confirmar} onChange={alterar} required /></div></label></div>
      <button disabled={carregando}>{carregando ? "Criando conta..." : "Criar minha conta"}</button><div className="register-call">Já tem uma conta? <Link to="/">Entrar agora</Link></div>
    </form></section>
  </div>;
}
export default Cadastro;

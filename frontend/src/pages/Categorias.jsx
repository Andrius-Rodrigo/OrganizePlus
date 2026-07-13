import { useEffect, useMemo, useState } from "react";
import { FaPlus, FaArrowTrendUp, FaArrowTrendDown, FaTags } from "react-icons/fa6";
import api from "../api/api";
import "../styles/pages.css";

function Categorias() {
  const [categorias, setCategorias] = useState([]); const [nome, setNome] = useState(""); const [tipo, setTipo] = useState("Despesa"); const [salvando, setSalvando] = useState(false);
  useEffect(() => { carregar(); }, []);
  async function carregar() { const r = await api.get("/categorias"); setCategorias(r.data); }
  async function salvar(e) { e.preventDefault(); if (!nome.trim()) return; try { setSalvando(true); await api.post("/categorias", { nome: nome.trim(), tipo }); setNome(""); await carregar(); } catch { alert("Erro ao cadastrar categoria."); } finally { setSalvando(false); } }
  const grupos = useMemo(() => ({ receitas: categorias.filter((c) => c.tipo.toLowerCase() === "receita"), despesas: categorias.filter((c) => c.tipo.toLowerCase() === "despesa") }), [categorias]);
  return <div className="categories-layout"><form className="form-card" onSubmit={salvar}><div className="section-heading"><div><h2>Nova categoria</h2><p>Crie uma categoria para organizar lançamentos.</p></div></div><label>Nome da categoria<input placeholder="Ex.: Alimentação" value={nome} onChange={(e) => setNome(e.target.value)} /></label><label>Tipo<select value={tipo} onChange={(e) => setTipo(e.target.value)}><option value="Despesa">Despesa</option><option value="Receita">Receita</option></select></label><button className="btn-primary" disabled={salvando}><FaPlus /> {salvando ? "Salvando..." : "Adicionar categoria"}</button></form><section className="categories-card"><div className="section-heading"><div><h2>Suas categorias</h2><p>{categorias.length} categoria(s) cadastrada(s)</p></div><FaTags /></div><div className="category-groups"><CategoryGroup titulo="Receitas" items={grupos.receitas} icon={FaArrowTrendUp} tipo="income" /><CategoryGroup titulo="Despesas" items={grupos.despesas} icon={FaArrowTrendDown} tipo="expense" /></div></section></div>;
}
function CategoryGroup({ titulo, items, icon: Icon, tipo }) { return <div className="category-group"><h3><span className={tipo}><Icon /></span>{titulo}</h3>{items.length ? <div className="category-list">{items.map((c) => <div key={c.id}><span className={tipo}></span><strong>{c.nome}</strong><small>#{c.id}</small></div>)}</div> : <p className="empty-text">Nenhuma categoria de {titulo.toLowerCase()}.</p>}</div>; }
export default Categorias;

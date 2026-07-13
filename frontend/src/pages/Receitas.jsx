import { useEffect, useMemo, useState } from "react";
import { FaPlus, FaMagnifyingGlass, FaPen, FaTrash, FaCheck } from "react-icons/fa6";
import api from "../api/api";
import ModalReceita from "../components/ModalReceita";
import "../styles/pages.css";

const moeda = (v) => Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const dataBR = (d) => d ? new Date(`${d}T12:00:00`).toLocaleDateString("pt-BR") : "-";

function Receitas() {
  const [receitas, setReceitas] = useState([]); const [modal, setModal] = useState(false); const [editando, setEditando] = useState(null); const [busca, setBusca] = useState("");
  useEffect(() => { carregarReceitas(); }, []);
  async function carregarReceitas() { try { const r = await api.get("/receitas"); setReceitas(r.data); } catch { alert("Erro ao carregar receitas."); } }
  async function excluir(id) { if (!confirm("Deseja excluir esta receita?")) return; await api.delete(`/receitas/${id}`); carregarReceitas(); }
  async function receber(id) { await api.patch(`/receitas/${id}/receber`); carregarReceitas(); }
  const filtradas = useMemo(() => receitas.filter((r) => `${r.descricao} ${r.categoria?.nome || ""}`.toLowerCase().includes(busca.toLowerCase())), [receitas, busca]);
  const total = receitas.reduce((s, r) => s + Number(r.valor), 0);

  return <div className="entity-page"><div className="page-toolbar"><div className="mini-summary"><span>Total em receitas</span><strong className="positive">{moeda(total)}</strong></div><button className="btn-primary" onClick={() => { setEditando(null); setModal(true); }}><FaPlus /> Nova receita</button></div><div className="table-card"><div className="table-tools"><div className="search-box"><FaMagnifyingGlass /><input placeholder="Buscar receita..." value={busca} onChange={(e) => setBusca(e.target.value)} /></div><span>{filtradas.length} registro(s)</span></div><div className="table-scroll"><table><thead><tr><th>Descrição</th><th>Categoria</th><th>Data</th><th>Status</th><th>Valor</th><th>Ações</th></tr></thead><tbody>{filtradas.length ? filtradas.map((r) => <tr key={r.id}><td><strong>{r.descricao}</strong></td><td><span className="category-badge">{r.categoria?.nome || "Sem categoria"}</span></td><td>{dataBR(r.data)}</td><td><span className={`status ${r.recebido ? "done" : "pending"}`}>{r.recebido ? "Recebida" : "Pendente"}</span></td><td className="positive"><strong>{moeda(r.valor)}</strong></td><td><div className="row-actions">{!r.recebido && <button title="Marcar recebida" onClick={() => receber(r.id)}><FaCheck /></button>}<button title="Editar" onClick={() => { setEditando(r); setModal(true); }}><FaPen /></button><button className="danger" title="Excluir" onClick={() => excluir(r.id)}><FaTrash /></button></div></td></tr>) : <tr><td colSpan="6" className="empty-row">Nenhuma receita encontrada.</td></tr>}</tbody></table></div></div>{modal && <ModalReceita receita={editando} fechar={() => setModal(false)} atualizar={carregarReceitas} />}</div>;
}
export default Receitas;

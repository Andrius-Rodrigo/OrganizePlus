import { useEffect, useMemo, useState } from "react";
import { FaPlus, FaMagnifyingGlass, FaPen, FaTrash, FaCheck } from "react-icons/fa6";
import api from "../api/api";
import ModalDespesa from "../components/ModalDespesa";
import "../styles/pages.css";
const moeda = (v) => Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const dataBR = (d) => d ? new Date(`${d}T12:00:00`).toLocaleDateString("pt-BR") : "-";

function Despesas() {
  const [despesas, setDespesas] = useState([]); const [modal, setModal] = useState(false); const [editando, setEditando] = useState(null); const [busca, setBusca] = useState("");
  useEffect(() => { carregarDespesas(); }, []);
  async function carregarDespesas() { try { const r = await api.get("/despesas"); setDespesas(r.data); } catch { alert("Erro ao carregar despesas."); } }
  async function excluir(id) { if (!confirm("Deseja excluir esta despesa?")) return; await api.delete(`/despesas/${id}`); carregarDespesas(); }
  async function pagar(id) { await api.patch(`/despesas/${id}/pagar`); carregarDespesas(); }
  const filtradas = useMemo(() => despesas.filter((d) => `${d.descricao} ${d.categoria?.nome || ""}`.toLowerCase().includes(busca.toLowerCase())), [despesas, busca]);
  const total = despesas.reduce((s, d) => s + Number(d.valor), 0);
  return <div className="entity-page"><div className="page-toolbar"><div className="mini-summary"><span>Total em despesas</span><strong className="negative">{moeda(total)}</strong></div><button className="btn-primary danger-bg" onClick={() => { setEditando(null); setModal(true); }}><FaPlus /> Nova despesa</button></div><div className="table-card"><div className="table-tools"><div className="search-box"><FaMagnifyingGlass /><input placeholder="Buscar despesa..." value={busca} onChange={(e) => setBusca(e.target.value)} /></div><span>{filtradas.length} registro(s)</span></div><div className="table-scroll"><table><thead><tr><th>Descrição</th><th>Categoria</th><th>Data</th><th>Status</th><th>Valor</th><th>Ações</th></tr></thead><tbody>{filtradas.length ? filtradas.map((d) => <tr key={d.id}><td><strong>{d.descricao}</strong></td><td><span className="category-badge">{d.categoria?.nome || "Sem categoria"}</span></td><td>{dataBR(d.data)}</td><td><span className={`status ${d.pago ? "done" : "pending"}`}>{d.pago ? "Paga" : "Pendente"}</span></td><td className="negative"><strong>{moeda(d.valor)}</strong></td><td><div className="row-actions">{!d.pago && <button title="Marcar paga" onClick={() => pagar(d.id)}><FaCheck /></button>}<button title="Editar" onClick={() => { setEditando(d); setModal(true); }}><FaPen /></button><button className="danger" title="Excluir" onClick={() => excluir(d.id)}><FaTrash /></button></div></td></tr>) : <tr><td colSpan="6" className="empty-row">Nenhuma despesa encontrada.</td></tr>}</tbody></table></div></div>{modal && <ModalDespesa despesa={editando} fechar={() => setModal(false)} atualizar={carregarDespesas} />}</div>;
}
export default Despesas;

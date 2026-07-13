import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import api from "../api/api";
import "../styles/modal.css";

function ModalDespesa({ fechar, atualizar, despesa }) {
  const [form, setForm] = useState({ descricao: despesa?.descricao || "", valor: despesa?.valor || "", data: despesa?.data || new Date().toISOString().slice(0, 10), categoria_id: despesa?.categoria?.id || "", pago: despesa?.pago || false });
  const [categorias, setCategorias] = useState([]);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => { api.get("/categorias").then((r) => setCategorias(r.data.filter((c) => c.tipo.toLowerCase() === "despesa"))).catch(console.error); }, []);

  async function salvar(e) {
    e.preventDefault();
    if (!form.descricao.trim() || !form.valor || !form.data) return alert("Preencha descrição, valor e data.");
    try {
      setSalvando(true);
      const dados = { ...form, valor: Number(form.valor), categoria_id: form.categoria_id ? Number(form.categoria_id) : null };
      if (despesa) await api.put(`/despesas/${despesa.id}`, dados); else await api.post("/despesas", dados);
      await atualizar(); fechar();
    } catch (erro) { alert(erro.response?.data?.erro || "Erro ao salvar despesa."); } finally { setSalvando(false); }
  }

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && fechar()}>
      <form className="modal-box" onSubmit={salvar}>
        <div className="modal-header"><div><h2>{despesa ? "Editar despesa" : "Nova despesa"}</h2><p>Registre uma saída financeira.</p></div><button type="button" onClick={fechar}><FaXmark /></button></div>
        <label>Descrição<input placeholder="Ex.: Aluguel" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} /></label>
        <div className="form-grid"><label>Valor (R$)<input type="number" min="0.01" step="0.01" value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} /></label><label>Data<input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} /></label></div>
        <label>Categoria<select value={form.categoria_id} onChange={(e) => setForm({ ...form, categoria_id: e.target.value })}><option value="">Sem categoria</option>{categorias.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}</select></label>
        <label className="check-label"><input type="checkbox" checked={form.pago} onChange={(e) => setForm({ ...form, pago: e.target.checked })} /> Despesa já foi paga</label>
        <div className="modal-actions"><button type="button" className="btn-secondary" onClick={fechar}>Cancelar</button><button className="btn-primary" disabled={salvando}>{salvando ? "Salvando..." : "Salvar despesa"}</button></div>
      </form>
    </div>
  );
}

export default ModalDespesa;

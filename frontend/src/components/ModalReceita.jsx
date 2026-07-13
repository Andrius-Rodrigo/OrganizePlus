import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import api from "../api/api";
import "../styles/modal.css";

function ModalReceita({ fechar, atualizar, receita }) {
  const [form, setForm] = useState({ descricao: receita?.descricao || "", valor: receita?.valor || "", data: receita?.data || new Date().toISOString().slice(0, 10), categoria_id: receita?.categoria?.id || "" });
  const [categorias, setCategorias] = useState([]);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => { api.get("/categorias").then((r) => setCategorias(r.data.filter((c) => c.tipo.toLowerCase() === "receita"))).catch(console.error); }, []);

  async function salvar(e) {
    e.preventDefault();
    if (!form.descricao.trim() || !form.valor || !form.data) return alert("Preencha descrição, valor e data.");
    try {
      setSalvando(true);
      const dados = { ...form, valor: Number(form.valor), categoria_id: form.categoria_id ? Number(form.categoria_id) : null };
      if (receita) await api.put(`/receitas/${receita.id}`, dados); else await api.post("/receitas", dados);
      await atualizar();
      fechar();
    } catch (erro) { alert(erro.response?.data?.erro || "Erro ao salvar receita."); } finally { setSalvando(false); }
  }

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && fechar()}>
      <form className="modal-box" onSubmit={salvar}>
        <div className="modal-header"><div><h2>{receita ? "Editar receita" : "Nova receita"}</h2><p>Informe os dados da entrada financeira.</p></div><button type="button" onClick={fechar}><FaXmark /></button></div>
        <label>Descrição<input placeholder="Ex.: Salário" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} /></label>
        <div className="form-grid">
          <label>Valor (R$)<input type="number" min="0.01" step="0.01" placeholder="0,00" value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} /></label>
          <label>Data<input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} /></label>
        </div>
        <label>Categoria<select value={form.categoria_id} onChange={(e) => setForm({ ...form, categoria_id: e.target.value })}><option value="">Sem categoria</option>{categorias.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}</select></label>
        <div className="modal-actions"><button type="button" className="btn-secondary" onClick={fechar}>Cancelar</button><button className="btn-primary" disabled={salvando}>{salvando ? "Salvando..." : "Salvar receita"}</button></div>
      </form>
    </div>
  );
}

export default ModalReceita;

import { useEffect, useState } from "react";
import { FaArrowTrendUp, FaArrowTrendDown, FaWallet } from "react-icons/fa6";
import api from "../api/api";
import CardResumo from "../components/CardResumo";
import GraficoEvolucao from "../components/GraficoEvolucao";
import GraficoCategorias from "../components/GraficoCategorias";
import "../styles/dashboard.css";

function Dashboard() {
  const [dados, setDados] = useState({ saldo: 0, total_receitas: 0, total_despesas: 0 });
  const [evolucao, setEvolucao] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => { carregarDashboard(); }, []);
  async function carregarDashboard() {
    try {
      const [resumo, evolucaoResp, categoriasResp] = await Promise.all([api.get("/dashboard/resumo"), api.get("/dashboard/evolucao"), api.get("/dashboard/categorias")]);
      setDados(resumo.data); setEvolucao(evolucaoResp.data); setCategorias(categoriasResp.data);
    } catch { setErro("Não foi possível carregar o dashboard."); }
  }

  return (
    <div className="dashboard-page">
      {erro && <div className="feedback error">{erro}</div>}
      <div className="cards-grid"><CardResumo titulo="Saldo atual" valor={dados.saldo} cor="#2563eb" icon={FaWallet} detalhe="Disponível" /><CardResumo titulo="Total de receitas" valor={dados.total_receitas} cor="#16a34a" icon={FaArrowTrendUp} detalhe="Entradas" /><CardResumo titulo="Total de despesas" valor={dados.total_despesas} cor="#ef4444" icon={FaArrowTrendDown} detalhe="Saídas" /></div>
      <div className="charts-grid"><GraficoEvolucao dados={evolucao} /><GraficoCategorias dados={categorias} /></div>
    </div>
  );
}
export default Dashboard;

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function GraficoEvolucao({ dados }) {
  return (
    <section className="chart-card chart-large">
      <div className="section-heading"><div><h2>Evolução financeira</h2><p>Receitas e despesas por mês</p></div></div>
      <div className="chart-area">
        {dados.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dados} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9eef5" />
              <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: "#718096", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#718096", fontSize: 12 }} />
              <Tooltip formatter={(valor) => Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} />
              <Legend />
              <Bar dataKey="receitas" fill="#16a34a" name="Receitas" radius={[5, 5, 0, 0]} />
              <Bar dataKey="despesas" fill="#ef4444" name="Despesas" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : <div className="empty-chart">Cadastre movimentações para visualizar o gráfico.</div>}
      </div>
    </section>
  );
}

export default GraficoEvolucao;

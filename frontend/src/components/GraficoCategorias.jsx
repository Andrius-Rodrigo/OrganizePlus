import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
const cores = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

function GraficoCategorias({ dados }) {
  return (
    <section className="chart-card">
      <div className="section-heading"><div><h2>Gastos por categoria</h2><p>Distribuição das despesas</p></div></div>
      <div className="chart-area">
        {dados.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={dados} dataKey="total" nameKey="categoria" innerRadius={58} outerRadius={92} paddingAngle={3}>
                {dados.map((item, index) => <Cell key={`${item.categoria}-${index}`} fill={cores[index % cores.length]} />)}
              </Pie>
              <Tooltip formatter={(valor) => Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        ) : <div className="empty-chart">Nenhuma despesa por categoria ainda.</div>}
      </div>
    </section>
  );
}

export default GraficoCategorias;

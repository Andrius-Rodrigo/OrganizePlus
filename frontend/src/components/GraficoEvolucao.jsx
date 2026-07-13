import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

function GraficoEvolucao({ dados }) {

    return (

        <div
            style={{
                background:"#fff",
                padding:"20px",
                marginTop:"30px",
                borderRadius:"12px",
                boxShadow:"0 2px 10px rgba(0,0,0,.08)"
            }}
        >

            <h2>Evolução Financeira</h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart data={dados}>

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis dataKey="mes"/>

                    <YAxis/>

                    <Tooltip/>

                    <Legend/>

                    <Bar
                        dataKey="receitas"
                        fill="#22C55E"
                        name="Receitas"
                    />

                    <Bar
                        dataKey="despesas"
                        fill="#EF4444"
                        name="Despesas"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default GraficoEvolucao;
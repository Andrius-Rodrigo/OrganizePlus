import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

const cores = [
    "#2563EB",
    "#22C55E",
    "#F97316",
    "#EF4444",
    "#9333EA",
    "#14B8A6"
];

function GraficoCategorias({ dados }) {

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

            <h2>Gastos por Categoria</h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <PieChart>

                    <Pie
                        data={dados}
                        dataKey="total"
                        nameKey="categoria"
                        outerRadius={120}
                    >

                        {
                            dados.map(
                                (item,index)=>

                                <Cell
                                    key={index}
                                    fill={
                                        cores[
                                            index %
                                            cores.length
                                        ]
                                    }
                                />
                            )
                        }

                    </Pie>

                    <Tooltip/>

                    <Legend/>

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default GraficoCategorias;
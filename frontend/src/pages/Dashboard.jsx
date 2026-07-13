import { useEffect, useState } from "react";
import api from "../api/api";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CardResumo from "../components/CardResumo";
import GraficoEvolucao from "../components/GraficoEvolucao";
import GraficoCategorias from "../components/GraficoCategorias";

import "../styles/dashboard.css";

function Dashboard(){

    const [dados,setDados] = useState(null);
    const [evolucao,setEvolucao] = useState([]);
    const [categorias,setCategorias] = useState([]);

    useEffect(()=>{

        carregarDashboard();

    },[]);


    async function carregarDashboard(){

        const resumo = await api.get("/dashboard/resumo");
        const evolucao = await api.get("/dashboard/evolucao");
        const categorias = await api.get("/dashboard/categorias");

        setDados(resumo.data);
        setEvolucao(evolucao.data);
        setCategorias(categorias.data);

    }


    return(

        <div>

            <Sidebar />

            <div className="dashboard">

                <Header />

                <h1>Dashboard Financeiro</h1>

                {dados && (

                    <>

                        <div className="cards">

                            <CardResumo
                                titulo="Saldo"
                                valor={dados.saldo}
                                cor="#2563EB"
                            />

                            <CardResumo
                                titulo="Receitas"
                                valor={dados.total_receitas}
                                cor="#16A34A"
                            />

                            <CardResumo
                                titulo="Despesas"
                                valor={dados.total_despesas}
                                cor="#DC2626"
                            />

                        </div>

                        <div className="graficos">

                            <GraficoEvolucao
                                dados={evolucao}
                            />

                            <GraficoCategorias
                                dados={categorias}
                            />

                        </div>

                    </>

                )}

            </div>

        </div>

    );

}

export default Dashboard;
import { useEffect, useState } from "react";
import api from "../api/api";
import Sidebar from "../components/Sidebar";



function Dashboard(){

    const [dados,setDados] = useState(null);


    useEffect(()=>{

        carregarDashboard();

    },[]);



    async function carregarDashboard(){

    console.log(
        "TOKEN:",
        localStorage.getItem("token")
    );

    try{

        const resposta = await api.get(
            "/dashboard/resumo"
        );

        setDados(resposta.data);

    }catch(error){

        console.log(error.response.data);

    }

}


    return(

    <div style={{display:"flex"}}>

        <Sidebar />

        <div
            style={{
                marginLeft:"260px",
                padding:"30px",
                width:"100%"
            }}
        >

            <h1>Dashboard Financeiro</h1>

            {
                dados && (

                    <div>

                        <h3>
                            Saldo: R$ {dados.saldo}
                        </h3>

                        <p>
                            Receitas: R$ {dados.total_receitas}
                        </p>

                        <p>
                            Despesas: R$ {dados.total_despesas}
                        </p>

                    </div>

                )
            }

        </div>

    </div>

    );
}
export default Dashboard;
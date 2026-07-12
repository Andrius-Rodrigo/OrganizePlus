import { useEffect, useState } from "react";
import api from "../api/api";


function Dashboard(){

    const [dados,setDados] = useState(null);


    useEffect(()=>{

        carregarDashboard();

    },[]);



    async function carregarDashboard(){

        try{

            const resposta = await api.get(
                "/dashboard"
            );

            console.log("Resposta dashboard:", resposta.data);
                
            setDados(
                resposta.data
            );

        }
    catch(error){

        console.log(
            "Erro dashboard:",
                error.response
            );



        }

    }



    return(

        <div>

            <h1>
                Organize+
            </h1>


            <h2>
                Dashboard Financeiro
            </h2>


            {
                dados && (

                    <div>

                        <h3>
                            Saldo:
                            R$ {dados.saldo}
                        </h3>


                        <p>
                            Receitas:
                            R$ {dados.total_receitas}
                        </p>


                        <p>
                            Despesas:
                            R$ {dados.total_despesas}
                        </p>


                    </div>

                )
            }


        </div>

    )

}


export default Dashboard;
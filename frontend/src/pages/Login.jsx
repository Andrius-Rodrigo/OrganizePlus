import { useState } from "react";
import api from "../api/api";


function Login(){

    const [email,setEmail] = useState("");
    const [senha,setSenha] = useState("");
    const [erro,setErro] = useState("");


    async function entrar() {

    try {

        const resposta = await api.post(
            "/login",
            {
                email: email,
                senha: senha
            }
        );

        console.log("RESPOSTA:", resposta);
        console.log("DADOS:", resposta.data);
        console.log("TOKEN:", resposta.data.access_token);

        localStorage.setItem(
            "token",
            resposta.data.access_token
        );

        console.log(
            "SALVO:",
            localStorage.getItem("token")
        );

        window.location.href = "/dashboard";

    }
    catch(error){

        console.log(error);

        if(error.response){
            console.log(error.response.data);
        }

        setErro(
            "Usuário ou senha inválidos"
        );

    }

}


    return (

        <div>

            <h1>
                Organize+
            </h1>


            <input
            placeholder="Email"
            value={email}
            onChange={
                e=>setEmail(e.target.value)
            }
            />


            <input
            placeholder="Senha"
            type="password"
            value={senha}
            onChange={
                e=>setSenha(e.target.value)
            }
            />


            <button onClick={entrar}>
                Entrar
            </button>


            <p>
                {erro}
            </p>


        </div>

    )

}


export default Login;
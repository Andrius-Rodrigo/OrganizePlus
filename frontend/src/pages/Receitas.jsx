import { useEffect, useState } from "react";
import api from "../api/api";
import ModalReceita from "../components/ModalReceita";
import "../styles/modal.css";


function Receitas() {

    const [receitas, setReceitas] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {

        carregarReceitas();

    }, []);

    async function carregarReceitas() {

        try {

            const resposta = await api.get("/receitas");

            setReceitas(resposta.data);

        } catch (erro) {

            console.log(erro);

        }

    }

    return (

        <div className="pagina">
            <button
                className="btn-azul"
                onClick={() => setMostrarModal(true)}
            >
                + Nova Receita
            </button>

            <table className="tabela">

                <thead>

                    <tr>

                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Data</th>
                        <th>Valor</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        receitas.map((receita) => (

                            <tr key={receita.id}>

                                <td>{receita.descricao}</td>

                                <td>
                                    {receita.categoria?.nome || "-"}
                                </td>

                                <td>{receita.data}</td>

                                <td>

                                    {
                                        Number(receita.valor).toLocaleString(
                                            "pt-BR",
                                            {
                                                style: "currency",
                                                currency: "BRL"
                                            }
                                        )

                                    }

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );
    {
    mostrarModal && (
        <ModalReceita
            fechar={() => setMostrarModal(false)}
            atualizar={carregarReceitas}
        />
    )
}

}

export default Receitas;
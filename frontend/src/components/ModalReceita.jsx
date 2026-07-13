import { useState, useEffect } from "react";
import api from "../api/api";

function ModalReceita({ fechar, atualizar }) {

    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [data, setData] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [categoriaId, setCategoriaId] = useState("");

    useEffect(() => {

        carregarCategorias();

    }, []);

    async function carregarCategorias() {

        try {

            const resposta = await api.get("/categorias");

            setCategorias(resposta.data);

        } catch (erro) {

            console.log(erro);

        }

    }

    async function salvar() {

        try {

            await api.post("/receitas", {

                descricao,
                valor: Number(valor),
                data,
                categoria_id: categoriaId || null

            });

            atualizar();

            fechar();

        } catch (erro) {

            alert("Erro ao cadastrar receita.");

        }

    }

    return (

        <div className="modal">

            <div className="modal-box">

                <h2>Nova Receita</h2>

                <input
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e)=>setDescricao(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Valor"
                    value={valor}
                    onChange={(e)=>setValor(e.target.value)}
                />

                <input
                    type="date"
                    value={data}
                    onChange={(e)=>setData(e.target.value)}
                />

                <select
                    value={categoriaId}
                    onChange={(e)=>setCategoriaId(e.target.value)}
                >

                    <option value="">
                        Selecione uma categoria
                    </option>

                    {
                        categorias.map(categoria => (

                            <option
                                key={categoria.id}
                                value={categoria.id}
                            >
                                {categoria.nome}
                            </option>

                        ))
                    }

                </select>

                <div className="acoes">

                    <button
                        onClick={salvar}
                    >
                        Salvar
                    </button>

                    <button
                        onClick={fechar}
                    >
                        Cancelar
                    </button>

                    

                </div>

            </div>

        </div>

    );

}

export default ModalReceita;
from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.receita import Receita
from datetime import datetime


receitas_bp = Blueprint(
    "receitas",
    __name__
)


@receitas_bp.route(
    "/receitas",
    methods=["POST"]
)
def criar_receita():

    dados = request.json


    nova_receita = Receita(
        descricao=dados["descricao"],
        valor=dados["valor"],
        tipo="Receita",
        data=datetime.strptime(
            dados["data"],
            "%Y-%m-%d"
        ).date(),
        usuario_id=dados["usuario_id"]
    )


    db.session.add(nova_receita)
    db.session.commit()


    return jsonify(
        {
            "mensagem": "Receita cadastrada",
            "id": nova_receita.id
        }
    ),201



@receitas_bp.route(
    "/receitas",
    methods=["GET"]
)
def listar_receitas():

    receitas = Receita.query.all()

    resultado=[]


    for receita in receitas:

        resultado.append(
            {
                "id": receita.id,
                "descricao": receita.descricao,
                "valor": receita.valor,
                "data": str(receita.data),
                "usuario_id": receita.usuario_id
            }
        )


    return jsonify(resultado)
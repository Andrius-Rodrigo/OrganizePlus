from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.despesa import Despesa
from datetime import datetime


despesas_bp = Blueprint(
    "despesas",
    __name__
)


# Criar despesa
@despesas_bp.route(
    "/despesas",
    methods=["POST"]
)
def criar_despesa():

    dados = request.json


    nova_despesa = Despesa(
        descricao=dados["descricao"],
        valor=dados["valor"],
        tipo="Despesa",
        pago=dados.get("pago", False),
        data=datetime.strptime(
            dados["data"],
            "%Y-%m-%d"
        ).date(),
        usuario_id=dados["usuario_id"]
    )


    db.session.add(nova_despesa)
    db.session.commit()


    return jsonify(
        {
            "mensagem": "Despesa cadastrada",
            "id": nova_despesa.id
        }
    ), 201



# Listar despesas
@despesas_bp.route(
    "/despesas",
    methods=["GET"]
)
def listar_despesas():

    despesas = Despesa.query.all()

    resultado = []


    for despesa in despesas:

        resultado.append(
            {
                "id": despesa.id,
                "descricao": despesa.descricao,
                "valor": despesa.valor,
                "pago": despesa.pago,
                "data": str(despesa.data),
                "usuario_id": despesa.usuario_id
            }
        )


    return jsonify(resultado)
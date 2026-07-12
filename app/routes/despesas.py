from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.despesa import Despesa
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity


despesas_bp = Blueprint(
    "despesas",
    __name__
)


# Criar despesa
@despesas_bp.route(
    "/despesas",
    methods=["POST"]
)
@jwt_required()
def criar_despesa():

    dados = request.json


    nova_despesa = Despesa(
        descricao=dados["descricao"],
        valor=dados["valor"],
        tipo="Despesa",
        categoria_id=dados.get("categoria_id"),
        pago=dados.get("pago", False),
        data=datetime.strptime(
            dados["data"],
            "%Y-%m-%d"
        ).date(),
        usuario_id=get_jwt_identity()
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
@jwt_required()
def listar_despesas():

    usuario_id = get_jwt_identity()


    despesas = Despesa.query.filter_by(
        usuario_id=usuario_id
    ).all()


    resultado = []


    for despesa in despesas:

        resultado.append(
    {
        "id": despesa.id,
        "descricao": despesa.descricao,
        "valor": despesa.valor,
        "tipo": despesa.tipo,
        "pago": despesa.pago,
        "data": str(despesa.data),
        "usuario_id": despesa.usuario_id,

        "categoria": {
            "id": despesa.categoria.id,
            "nome": despesa.categoria.nome
        } if despesa.categoria else None
    }
)


    return jsonify(resultado)


@despesas_bp.route(
    "/despesas/<int:id>",
    methods=["PUT"]
)
@jwt_required()
def editar_despesa(id):

    usuario_id = get_jwt_identity()


    despesa = Despesa.query.filter_by(
        id=id,
        usuario_id=usuario_id
    ).first()


    if not despesa:

        return jsonify(
            {
                "erro":"Despesa não encontrada"
            }
        ),404


    dados = request.json


    despesa.descricao = dados.get(
        "descricao",
        despesa.descricao
    )


    despesa.valor = dados.get(
        "valor",
        despesa.valor
    )


    despesa.pago = dados.get(
        "pago",
        despesa.pago
    )


    db.session.commit()


    return jsonify(
        {
            "mensagem":"Despesa atualizada"
        }
    )

@despesas_bp.route(
    "/despesas/<int:id>/pagar",
    methods=["PATCH"]
)
@jwt_required()
def marcar_pago(id):

    usuario_id = get_jwt_identity()

    despesa = Despesa.query.filter_by(
        id=id,
        usuario_id=usuario_id
    ).first()

    if not despesa:
        return jsonify(
            {
                "erro":"Despesa não encontrada"
            }
        ),404

    despesa.pago = True

    db.session.commit()

    return jsonify(
        {
            "mensagem":"Despesa marcada como paga",
            "id":despesa.id,
            "pago":despesa.pago
        }
    )


@despesas_bp.route(
    "/despesas/<int:id>",
    methods=["DELETE"]
)
@jwt_required()
def excluir_despesa(id):

    usuario_id = get_jwt_identity()


    despesa = Despesa.query.filter_by(
        id=id,
        usuario_id=usuario_id
    ).first()


    if not despesa:
        return jsonify(
            {
                "erro":"Despesa não encontrada"
            }
        ),404


    db.session.delete(despesa)

    db.session.commit()


    return jsonify(
        {
            "mensagem":"Despesa excluída",
            "id":id
        }
    )
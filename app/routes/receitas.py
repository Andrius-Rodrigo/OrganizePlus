from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.receita import Receita
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity


receitas_bp = Blueprint(
    "receitas",
    __name__
)


# Criar receita
@receitas_bp.route(
    "/receitas",
    methods=["POST"]
)
@jwt_required()
def criar_receita():

    dados = request.json


    nova_receita = Receita(
        descricao=dados["descricao"],
        valor=dados["valor"],
        tipo="Receita",
        categoria_id=dados.get("categoria_id"),
        data=datetime.strptime(
            dados["data"],
            "%Y-%m-%d"
        ).date(),
        usuario_id=get_jwt_identity()
    )


    db.session.add(nova_receita)
    db.session.commit()


    return jsonify(
        {
            "mensagem":"Receita cadastrada",
            "id":nova_receita.id
        }
    ),201



# Listar receitas
@receitas_bp.route(
    "/receitas",
    methods=["GET"]
)
@jwt_required()
def listar_receitas():

    usuario_id = get_jwt_identity()


    receitas = Receita.query.filter_by(
        usuario_id=usuario_id
    ).all()


    resultado=[]


    for receita in receitas:

        resultado.append(
    {
        "id": receita.id,
        "descricao": receita.descricao,
        "valor": receita.valor,
        "tipo": receita.tipo,
        "data": str(receita.data),

        "categoria": {
            "id": receita.categoria.id,
            "nome": receita.categoria.nome
        } if receita.categoria else None
    }
)


    return jsonify(resultado)



# Buscar receita
@receitas_bp.route(
    "/receitas/<int:id>",
    methods=["GET"]
)
@jwt_required()
def buscar_receita(id):

    usuario_id = get_jwt_identity()


    receita = Receita.query.filter_by(
        id=id,
        usuario_id=usuario_id
    ).first()


    if not receita:

        return jsonify(
            {
                "erro":"Receita não encontrada"
            }
        ),404


    return jsonify(
        {
            "id":receita.id,
            "descricao":receita.descricao,
            "valor":receita.valor,
            "tipo":receita.tipo,
            "data":str(receita.data)
        }
    )



# Editar receita
@receitas_bp.route(
    "/receitas/<int:id>",
    methods=["PUT"]
)
@jwt_required()
def editar_receita(id):

    usuario_id = get_jwt_identity()


    receita = Receita.query.filter_by(
        id=id,
        usuario_id=usuario_id
    ).first()


    if not receita:

        return jsonify(
            {
                "erro":"Receita não encontrada"
            }
        ),404


    dados=request.json


    receita.descricao = dados.get(
        "descricao",
        receita.descricao
    )


    receita.valor = dados.get(
        "valor",
        receita.valor
    )


    db.session.commit()


    return jsonify(
        {
            "mensagem":"Receita atualizada"
        }
    )



# Excluir receita
@receitas_bp.route(
    "/receitas/<int:id>",
    methods=["DELETE"]
)
@jwt_required()
def excluir_receita(id):

    usuario_id = get_jwt_identity()


    receita = Receita.query.filter_by(
        id=id,
        usuario_id=usuario_id
    ).first()


    if not receita:

        return jsonify(
            {
                "erro":"Receita não encontrada"
            }
        ),404


    db.session.delete(receita)

    db.session.commit()


    return jsonify(
        {
            "mensagem":"Receita excluída"
        }
    )
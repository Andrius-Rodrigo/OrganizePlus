from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.categoria import Categoria
from flask_jwt_extended import jwt_required, get_jwt_identity


categorias_bp = Blueprint(
    "categorias",
    __name__
)



# Criar categoria
@categorias_bp.route(
    "/categorias",
    methods=["POST"]
)
@jwt_required()
def criar_categoria():

    dados = request.json


    nova_categoria = Categoria(
        nome=dados["nome"],
        tipo=dados["tipo"],
        usuario_id=get_jwt_identity()
    )


    db.session.add(nova_categoria)
    db.session.commit()


    return jsonify(
        {
            "mensagem":"Categoria criada",
            "id":nova_categoria.id
        }
    ),201



# Listar categorias
@categorias_bp.route(
    "/categorias",
    methods=["GET"]
)
@jwt_required()
def listar_categorias():

    usuario_id = get_jwt_identity()


    categorias = Categoria.query.filter_by(
        usuario_id=usuario_id
    ).all()


    resultado=[]


    for categoria in categorias:

        resultado.append(
            {
                "id":categoria.id,
                "nome":categoria.nome,
                "tipo":categoria.tipo
            }
        )


    return jsonify(resultado)
from flask import Blueprint, request, jsonify
from app.models.usuario import Usuario
from flask_jwt_extended import create_access_token


auth_bp = Blueprint(
    "auth",
    __name__
)



@auth_bp.route(
    "/login",
    methods=["POST"]
)
def login():

    dados = request.json


    usuario = Usuario.query.filter_by(
        email=dados["email"]
    ).first()


    if not usuario:

        return jsonify(
            {
                "erro":"Usuário não encontrado"
            }
        ),404



    if usuario.senha != dados["senha"]:

        return jsonify(
            {
                "erro":"Senha inválida"
            }
        ),401



    token = create_access_token(
        identity=str(usuario.id)
    )


    return jsonify(
        {
            "mensagem":"Login realizado",
            "token":token,
            "usuario_id":usuario.id
        }
    )
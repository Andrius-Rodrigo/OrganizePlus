from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.usuario import Usuario


usuarios_bp = Blueprint(
    "usuarios",
    __name__
)


# Criar usuário
@usuarios_bp.route(
    "/usuarios",
    methods=["POST"]
)
def criar_usuario():

    dados = request.json

    novo_usuario = Usuario(
        nome=dados["nome"],
        email=dados["email"],
        senha=dados["senha"]
    )

    db.session.add(novo_usuario)
    db.session.commit()

    return jsonify(
        {
            "mensagem": "Usuário criado com sucesso",
            "id": novo_usuario.id
        }
    ), 201



# Listar usuários
@usuarios_bp.route(
    "/usuarios",
    methods=["GET"]
)
def listar_usuarios():

    usuarios = Usuario.query.all()

    resultado = []

    for usuario in usuarios:

        resultado.append(
            {
                "id": usuario.id,
                "nome": usuario.nome,
                "email": usuario.email
            }
        )

    return jsonify(resultado)
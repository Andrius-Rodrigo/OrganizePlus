from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.despesa import Despesa
from app.models.receita import Receita
from sqlalchemy import func
from app.models.categoria import Categoria


dashboard_bp = Blueprint(
    "dashboard",
    __name__
)


@dashboard_bp.route(
    "/dashboard/resumo",
    methods=["GET"]
)
@jwt_required()
def resumo():

    usuario_id = get_jwt_identity()


    receitas = Receita.query.filter_by(
        usuario_id=usuario_id
    ).all()


    despesas = Despesa.query.filter_by(
        usuario_id=usuario_id
    ).all()


    total_receitas = sum(
        r.valor for r in receitas
    )


    total_despesas = sum(
        d.valor for d in despesas
    )


    saldo = total_receitas - total_despesas


    return jsonify(
        {
            "total_receitas": total_receitas,
            "total_despesas": total_despesas,
            "saldo": saldo
        }
    )

@dashboard_bp.route(
    "/dashboard/categorias",
    methods=["GET"]
)
@jwt_required()
def gastos_categoria():

    usuario_id = get_jwt_identity()


    resultado = db.session.query(
        Categoria.nome,
        func.sum(Despesa.valor)
    ).join(
        Despesa,
        Categoria.id == Despesa.categoria_id
    ).filter(
        Despesa.usuario_id == usuario_id
    ).group_by(
        Categoria.nome
    ).all()


    dados = []

    for categoria, total in resultado:

        dados.append(
            {
                "categoria": categoria,
                "total": total
            }
        )


    return jsonify(dados)
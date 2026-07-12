from flask import Blueprint, jsonify
from app.models.despesa import Despesa
from app.models.receita import Receita
from flask_jwt_extended import jwt_required, get_jwt_identity


dashboard_bp = Blueprint(
    "dashboard",
    __name__
)


@dashboard_bp.route(
    "/dashboard",
    methods=["GET"]
)
@jwt_required()
def dashboard():

    usuario_id = get_jwt_identity()


    receitas = Receita.query.filter_by(
        usuario_id=usuario_id
    ).all()


    despesas = Despesa.query.filter_by(
        usuario_id=usuario_id
    ).all()


    total_receitas = sum(
        receita.valor
        for receita in receitas
    )


    total_despesas = sum(
        despesa.valor
        for despesa in despesas
    )


    despesas_pagas = sum(
        despesa.valor
        for despesa in despesas
        if despesa.pago
    )


    despesas_pendentes = sum(
        despesa.valor
        for despesa in despesas
        if not despesa.pago
    )


    saldo = total_receitas - total_despesas


    return jsonify(
        {
            "usuario_id": usuario_id,
            "receitas": total_receitas,
            "despesas": total_despesas,
            "saldo": saldo,
            "despesas_pagas": despesas_pagas,
            "despesas_pendentes": despesas_pendentes
        }
    )
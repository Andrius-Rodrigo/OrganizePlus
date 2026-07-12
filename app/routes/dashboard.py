from flask import Blueprint, jsonify
from app.models.despesa import Despesa
from app.models.receita import Receita


dashboard_bp = Blueprint(
    "dashboard",
    __name__
)


@dashboard_bp.route(
    "/dashboard/<int:usuario_id>",
    methods=["GET"]
)
def dashboard(usuario_id):


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


    saldo = (
        total_receitas -
        total_despesas
    )


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
from app.extensions import db


class Receita(db.Model):

    __tablename__ = "receitas"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    descricao = db.Column(
        db.String(200),
        nullable=False
    )


    valor = db.Column(
        db.Float,
        nullable=False
    )


    tipo = db.Column(
        db.String(50),
        nullable=False
    )


    data = db.Column(
        db.Date,
        nullable=False
    )


    usuario_id = db.Column(
        db.Integer,
        db.ForeignKey("usuarios.id"),
        nullable=False
    )
    categoria_id = db.Column(
        db.Integer,
        db.ForeignKey("categorias.id"),
        nullable=True
    )
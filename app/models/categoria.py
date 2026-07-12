from app.extensions import db


class Categoria(db.Model):

    __tablename__ = "categorias"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    nome = db.Column(
        db.String(100),
        nullable=False
    )


    tipo = db.Column(
        db.String(50),
        nullable=False
    )


    usuario_id = db.Column(
        db.Integer,
        db.ForeignKey("usuarios.id"),
        nullable=False
    )
    despesas = db.relationship(
    "Despesa",
    backref="categoria",
    lazy=True
    )


    receitas = db.relationship(
        "Receita",
        backref="categoria",
        lazy=True
    )
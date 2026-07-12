from app.extensions import db


class Usuario(db.Model):

    __tablename__ = "usuarios"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    nome = db.Column(
        db.String(100),
        nullable=False
    )


    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )


    senha = db.Column(
        db.String(255),
        nullable=False
    )


    criado_em = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )


    despesas = db.relationship(
        "Despesa",
        backref="usuario",
        lazy=True
    )
    
    receitas = db.relationship(
    "Receita",
    backref="usuario",
    lazy=True
    )

    categorias = db.relationship(
    "Categoria",
    backref="usuario",
    lazy=True
    )
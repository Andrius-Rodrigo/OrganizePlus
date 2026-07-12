from flask import Flask

from .config import Config
from .extensions import db, migrate, cors
from .models import Usuario, Categoria, Despesa
from .routes import (
    usuarios_bp,
    despesas_bp,
    receitas_bp,
    dashboard_bp
)
def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)


    # Inicializando extensões

    db.init_app(app)

    migrate.init_app(
        app,
        db
    )

    cors.init_app(app)
    app.register_blueprint(
    usuarios_bp
    )

    app.register_blueprint(
    despesas_bp
    )

    app.register_blueprint(
    receitas_bp
    )
    
    app.register_blueprint(
    dashboard_bp
    )


    @app.route("/")
    def home():

        return {
            "app": "Organize+",
            "status": "online"
        }


    return app
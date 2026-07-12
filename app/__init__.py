from flask import Flask

from .config import Config
from .extensions import db, migrate, cors


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


    @app.route("/")
    def home():

        return {
            "app": "Organize+",
            "status": "online"
        }


    return app
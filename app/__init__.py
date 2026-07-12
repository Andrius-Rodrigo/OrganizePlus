from flask import Flask
from .extensions import db,migrate,login_manager

def create_app():
 app=Flask(__name__)
 app.config['SECRET_KEY']='dev'
 app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///../instance/financeiro.db'
 app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
 db.init_app(app);migrate.init_app(app,db);login_manager.init_app(app)
 from .routes.main import main_bp
 app.register_blueprint(main_bp)
 return app

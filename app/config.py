import os


class Config:

    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "organizeplus-secret-key"
    )

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "sqlite:///organizeplus.db"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False
from pathlib import Path
import tempfile

from sqlmodel import Session, SQLModel, create_engine

# BD en carpeta temporal de Windows (no OneDrive) -> evita bloqueos
tmp_dir = Path(tempfile.gettempdir())
sqlite_file_path = tmp_dir / "sistemasweb_database.db"
sqlite_url = f"sqlite:///{sqlite_file_path}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)


def create_db_and_tables():
    # IMPORTANTE: registrar modelos
    from app.models.product import Product
    from app.models.order import Order, OrderItem
    from app.models.user import User
    from app.models.cart import CartItem

    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
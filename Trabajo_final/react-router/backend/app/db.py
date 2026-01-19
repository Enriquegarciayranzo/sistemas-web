from pathlib import Path
from sqlmodel import Session, SQLModel, create_engine

# Render Disk montado en /var/data
DB_DIR = Path("/var/data")
DB_DIR.mkdir(parents=True, exist_ok=True)

sqlite_file_path = DB_DIR / "database.db"
sqlite_url = f"sqlite:///{sqlite_file_path}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)


def create_db_and_tables():
    # Registrar modelos
    from app.models.product import Product
    from app.models.order import Order, OrderItem
    from app.models.user import User
    from app.models.cart import CartItem

    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
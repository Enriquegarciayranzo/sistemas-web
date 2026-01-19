import os
from sqlmodel import Session, SQLModel, create_engine

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set")

# Fuerza psycopg (v3)
engine = create_engine(DATABASE_URL, pool_pre_ping=True, module=None)

def create_db_and_tables():
    from app.models.product import Product
    from app.models.order import Order, OrderItem
    from app.models.user import User
    from app.models.cart import CartItem
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
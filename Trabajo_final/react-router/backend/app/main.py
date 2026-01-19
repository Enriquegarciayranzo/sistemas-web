from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from app.db import create_db_and_tables, engine
from app.models.product import Product
from app.seed_products import PRODUCTS
from app.routes import health, product, checkout, orders, auth, cart


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()

    # 👉 SEED SOLO SI NO HAY PRODUCTOS
    with Session(engine) as session:
        exists = session.exec(select(Product)).first()
        if not exists:
            session.add_all([Product(**p) for p in PRODUCTS])
            session.commit()

    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"^https:\/\/.*\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(product.router)
app.include_router(checkout.router)
app.include_router(orders.router)
app.include_router(auth.router)
app.include_router(cart.router)
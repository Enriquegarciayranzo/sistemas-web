from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db import create_db_and_tables
from app.routes import health
from app.routes import product
from app.routes import checkout
from app.routes import orders
from app.routes import auth
from app.routes import cart


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)

# Configure CORS policy.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174","http://localhost:5175"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers.
app.include_router(health.router)
app.include_router(product.router)
app.include_router(checkout.router)
app.include_router(orders.router)
app.include_router(auth.router)
app.include_router(cart.router)
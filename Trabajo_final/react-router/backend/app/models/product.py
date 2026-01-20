from typing import Optional
from sqlmodel import SQLModel, Field

class ProductBase(SQLModel):
    name: str
    description: str
    price: float
    stock: int

class Product(ProductBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class ProductCreate(ProductBase):
    pass

class ProductPublic(ProductBase):
    id: int

class ProductUpdate(SQLModel):
    name: str | None = None
    description: str | None = None
    price: float | None = None
    stock: int | None = None
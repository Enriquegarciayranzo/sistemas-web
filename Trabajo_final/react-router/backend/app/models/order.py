from typing import Optional
from sqlmodel import SQLModel, Field

class Order(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    total: float = 0.0

class OrderItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    order_id: int = Field(index=True)
    product_id: int = Field(index=True)
    name: str
    price: float
    qty: int

class OrderItemCreate(SQLModel):
    product_id: int
    qty: int

class OrderCreate(SQLModel):
    items: list[OrderItemCreate]

class OrderItemPublic(SQLModel):
    product_id: int
    name: str
    price: float
    qty: int

class OrderPublic(SQLModel):
    id: int
    total: float
    items: list[OrderItemPublic]
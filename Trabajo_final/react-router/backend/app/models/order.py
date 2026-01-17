from __future__ import annotations

from datetime import datetime
from typing import Optional, List

from sqlmodel import SQLModel, Field, Relationship


class Order(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    # ✅ CLAVE: pedido pertenece a un usuario
    user_id: int = Field(index=True)

    created_at: datetime = Field(default_factory=datetime.utcnow)

    items: List["OrderItem"] = Relationship(back_populates="order")


class OrderItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    order_id: int = Field(foreign_key="order.id", index=True)
    product_id: int = Field(index=True)

    qty: int
    price: float
    name: str

    order: Optional[Order] = Relationship(back_populates="items")
from typing import Optional
from sqlmodel import SQLModel, Field

class CartItemBase(SQLModel):
    product_id: int
    qty: int

class CartItem(CartItemBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(index=True)
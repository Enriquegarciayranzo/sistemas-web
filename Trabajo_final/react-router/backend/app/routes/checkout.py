from fastapi import APIRouter, HTTPException
from sqlmodel import select
from app.dependencies import SessionDep
from app.models.product import Product
from pydantic import BaseModel

router = APIRouter()

class CheckoutItem(BaseModel):
    product_id: int
    qty: int

class CheckoutRequest(BaseModel):
    items: list[CheckoutItem]

@router.post("/checkout")
def checkout(data: CheckoutRequest, session: SessionDep):
    total = 0.0
    for it in data.items:
        p = session.get(Product, it.product_id)
        if not p:
            raise HTTPException(status_code=404, detail="Product not found")
        if it.qty <= 0:
            raise HTTPException(status_code=400, detail="Invalid qty")
        if p.stock < it.qty:
            raise HTTPException(status_code=400, detail=f"Not enough stock for {p.name}")
        total += p.price * it.qty
    return {"ok": True, "total": total}
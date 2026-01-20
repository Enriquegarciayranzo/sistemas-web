from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from app.dependencies import SessionDep
from app.auth import get_current_user
from app.models.user import User
from app.models.product import Product
from app.models.order import Order, OrderItem

router = APIRouter(prefix="/orders", tags=["orders"])

@router.get("")
@router.get("/")
def list_my_orders(session: SessionDep, user: User = Depends(get_current_user)):
    orders = session.exec(
        select(Order).where(Order.user_id == user.id).order_by(Order.id.desc())
    ).all()

    result = []
    for o in orders:
        items = session.exec(
            select(OrderItem).where(OrderItem.order_id == o.id)
        ).all()

        total = sum(it.price * it.qty for it in items)
        result.append(
            {
                "id": o.id,
                "created_at": o.created_at,
                "total": total,
                "items": [
                    {
                        "product_id": it.product_id,
                        "name": it.name,
                        "price": it.price,
                        "qty": it.qty,
                    }
                    for it in items
                ],
            }
        )
    return result

@router.post("")
@router.post("/")
def create_order(payload: dict, session: SessionDep, user: User = Depends(get_current_user)):
    items = payload.get("items", [])
    if not items:
        raise HTTPException(status_code=400, detail="No items")

    order = Order(user_id=user.id)
    session.add(order)
    session.commit()
    session.refresh(order)

    for it in items:
        product_id = int(it["product_id"])
        qty = int(it["qty"])

        product = session.exec(select(Product).where(Product.id == product_id)).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {product_id} not found")
        if qty <= 0:
            raise HTTPException(status_code=400, detail="qty must be > 0")

        # Stock
        if hasattr(product, "stock") and product.stock < qty:
            raise HTTPException(status_code=400, detail="Not enough stock")

        oi = OrderItem(
            order_id=order.id,
            product_id=product.id,
            qty=qty,
            price=float(product.price),
            name=str(product.name),
        )
        session.add(oi)

        # Descontar stock
        if hasattr(product, "stock"):
            product.stock -= qty
            session.add(product)

    session.commit()
    return {"ok": True, "order_id": order.id}
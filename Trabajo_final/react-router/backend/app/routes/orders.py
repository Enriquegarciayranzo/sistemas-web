from fastapi import APIRouter, HTTPException
from sqlmodel import select
from app.dependencies import SessionDep
from app.models.product import Product
from app.models.order import Order, OrderItem, OrderCreate, OrderPublic, OrderItemPublic

router = APIRouter()

@router.post("/orders", response_model=OrderPublic)
def create_order(data: OrderCreate, session: SessionDep):
    # 1) validar y calcular total
    total = 0.0
    products = {}

    for it in data.items:
        if it.qty <= 0:
            raise HTTPException(status_code=400, detail="Invalid qty")

        p = session.get(Product, it.product_id)
        if not p:
            raise HTTPException(status_code=404, detail="Product not found")
        if p.stock < it.qty:
            raise HTTPException(status_code=400, detail=f"Not enough stock for {p.name}")

        products[it.product_id] = p
        total += p.price * it.qty

    # 2) crear order
    order = Order(total=total)
    session.add(order)
    session.commit()
    session.refresh(order)

    # 3) crear items y restar stock
    items_public: list[OrderItemPublic] = []

    for it in data.items:
        p = products[it.product_id]
        p.stock -= it.qty

        oi = OrderItem(
            order_id=order.id,
            product_id=p.id,
            name=p.name,
            price=p.price,
            qty=it.qty,
        )
        session.add(oi)
        session.add(p)

        items_public.append(
            OrderItemPublic(
                product_id=p.id,
                name=p.name,
                price=p.price,
                qty=it.qty,
            )
        )

    session.commit()

    return OrderPublic(id=order.id, total=order.total, items=items_public)

@router.get("/orders", response_model=list[OrderPublic])
def list_orders(session: SessionDep):
    orders = session.exec(select(Order)).all()
    result: list[OrderPublic] = []

    for o in orders:
        items = session.exec(select(OrderItem).where(OrderItem.order_id == o.id)).all()
        items_pub = [
            OrderItemPublic(product_id=i.product_id, name=i.name, price=i.price, qty=i.qty)
            for i in items
        ]
        result.append(OrderPublic(id=o.id, total=o.total, items=items_pub))

    return result
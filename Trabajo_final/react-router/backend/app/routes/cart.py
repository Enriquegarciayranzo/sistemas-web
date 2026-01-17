from fastapi import APIRouter
from sqlmodel import select
from app.dependencies import SessionDep
from app.models.cart import CartItem
from app.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/cart", tags=["cart"])

@router.get("")
def get_my_cart(session: SessionDep, user: User = get_current_user):
    items = session.exec(select(CartItem).where(CartItem.user_id == user.id)).all()
    return items

@router.post("")
def upsert_item(item: CartItem, session: SessionDep, user: User = get_current_user):
    # item aquí trae product_id y qty; user_id lo imponemos nosotros
    existing = session.exec(
        select(CartItem).where(CartItem.user_id == user.id, CartItem.product_id == item.product_id)
    ).first()

    if existing:
        existing.qty = item.qty
        session.add(existing)
    else:
        session.add(CartItem(user_id=user.id, product_id=item.product_id, qty=item.qty))

    session.commit()
    return {"ok": True}

@router.delete("")
def clear_my_cart(session: SessionDep, user: User = get_current_user):
    items = session.exec(select(CartItem).where(CartItem.user_id == user.id)).all()
    for it in items:
        session.delete(it)
    session.commit()
    return {"ok": True}
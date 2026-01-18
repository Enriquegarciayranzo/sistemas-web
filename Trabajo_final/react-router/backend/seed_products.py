# backend/seed_products.py
from sqlmodel import Session, select

from app.db import engine, create_db_and_tables
from app.models.product import Product


PRODUCTS = [
    {
        "name": "Running Shoes Pro",
        "description": "Lightweight running shoes for daily training.",
        "price": 89.99,
        "image_url": "https://picsum.photos/seed/shoes/600/400",
        "stock": 25,
        "category": "Sports",
    },
    {
        "name": "Premium Cotton T-Shirt",
        "description": "100% cotton t-shirt, regular fit.",
        "price": 19.90,
        "image_url": "https://picsum.photos/seed/tshirt/600/400",
        "stock": 80,
        "category": "Clothing",
    },
    {
        "name": "Wireless Headphones",
        "description": "Bluetooth 5.3 with noise cancellation.",
        "price": 59.50,
        "image_url": "https://picsum.photos/seed/headphones/600/400",
        "stock": 40,
        "category": "Electronics",
    },
    {
        "name": "Urban Backpack 20L",
        "description": "Water-resistant backpack for laptop and daily use.",
        "price": 34.95,
        "image_url": "https://picsum.photos/seed/backpack/600/400",
        "stock": 35,
        "category": "Accessories",
    },
]


def create_product_if_not_exists(session: Session, data: dict) -> Product:
    existing = session.exec(
        select(Product).where(Product.name == data["name"])
    ).first()

    if existing:
        return existing

    product = Product(**data)
    session.add(product)
    session.commit()
    session.refresh(product)
    return product


def main():
    create_db_and_tables()

    with Session(engine) as session:
        for product_data in PRODUCTS:
            create_product_if_not_exists(session, product_data)

        total = session.exec(select(Product)).all()
        print(f"✅ Seed completed. Total products in DB: {len(total)}")


if __name__ == "__main__":
    main()
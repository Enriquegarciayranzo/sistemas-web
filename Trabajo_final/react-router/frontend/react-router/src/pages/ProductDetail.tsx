import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../store/cart";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
};

export default function ProductDetail() {
  const { productId } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8001/products/${productId}`)
      .then((res) => res.json())
      .then(setProduct);
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>Price:</strong> {product.price} €</p>
      <p><strong>Stock:</strong> {product.stock}</p>

      <div style={{ marginTop: 16 }}>
        <label>
          Qty:&nbsp;
          <input
            type="number"
            min={1}
            max={product.stock}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />
        </label>

        <button
          style={{
            marginLeft: 12,
            padding: "8px 16px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
          onClick={() => {
            addToCart(
              {
                productId: product.id,
                name: product.name,
                price: product.price,
              },
              qty
            );
            setAdded(true);
          }}
        >
          Add to cart
        </button>

        {added && (
          <p style={{ color: "green", marginTop: 8 }}>
            Added to cart ✓
          </p>
        )}
      </div>
    </div>
  );
}
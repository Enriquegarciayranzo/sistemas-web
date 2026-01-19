import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../store/cart";
import { apiFetch } from "../api/http";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
};

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!productId) return;

    apiFetch<Product>(`/products/${productId}/`)
      .then((p) => {
        setProduct(p);
        setQty(1);
        setAdded(false);
        setError("");
      })
      .catch(() => {
        setProduct(null);
        setError("Error loading product");
      });
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <p>
        <strong>Price:</strong> {product.price} €
      </p>

      <p>
        <strong>Stock:</strong> {product.stock}
      </p>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

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
          onClick={async () => {
            try {
              setError("");
              await addToCart(
                {
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                },
                qty
              );
              setAdded(true);
              navigate("/cart");
            } catch (e: any) {
              setError(e?.message ?? "Could not add to cart");
            }
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
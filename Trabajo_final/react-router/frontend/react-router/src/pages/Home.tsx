import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/products";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError("Error loading products"));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 16 }}>Products</h1>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 16,
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  height: 110,
                  borderRadius: 10,
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(168,85,247,0.25))",
                  marginBottom: 12,
                }}
              />

              <h3 style={{ margin: "0 0 6px 0" }}>{p.name}</h3>
              <p style={{ margin: "0 0 10px 0", color: "#4b5563" }}>
                {p.description}
              </p>

              <p style={{ margin: "0 0 12px 0" }}>
                <strong>{p.price.toFixed(2)} €</strong>{" "}
                <span style={{ color: "#6b7280" }}>(stock: {p.stock})</span>
              </p>

              <Link
                to={`/products/${p.id}`}
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: 8,
                  backgroundColor: "#2563eb",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                View product
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
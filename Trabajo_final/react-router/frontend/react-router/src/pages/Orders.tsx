import { useEffect, useState } from "react";
import { fetchOrders } from "../api/orders";
import type { Order } from "../api/orders";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch((e) => {
        const msg = String(e?.message ?? e);

        // si no estás autenticado -> fuera
        if (msg.includes("401") || msg.toLowerCase().includes("unauthorized")) {
          window.location.href = "/login";
          return;
        }

        setError(msg);
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Orders</h1>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((o) => (
          <div
            key={o.id}
            style={{
              marginBottom: 16,
              padding: 12,
              border: "1px solid #ddd",
              borderRadius: 8,
            }}
          >
            <p>
              <strong>Order #{o.id}</strong> — Total: {o.total.toFixed(2)} €
            </p>
            <ul>
              {o.items.map((it, idx) => (
                <li key={idx}>
                  {it.name} — {it.price} € × {it.qty}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
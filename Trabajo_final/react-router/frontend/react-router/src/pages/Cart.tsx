import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  updateQty,
  removeFromCart,
  clearCart,
  getTotal,
} from "../store/cart";
import { createOrder } from "../api/orders";

export default function Cart() {
  const navigate = useNavigate();

  const [_, forceUpdate] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const cart = getCart();
  const total = getTotal();

  return (
    <div style={{ padding: 20 }}>
      <h1>Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.productId} style={{ marginBottom: 12 }}>
                <strong>{item.name}</strong> — {item.price} € ×{" "}
                <input
                  type="number"
                  min={0}
                  value={item.qty}
                  onChange={(e) => {
                    updateQty(item.productId, Number(e.target.value));
                    forceUpdate((x) => x + 1);
                  }}
                  style={{
                    width: 60,
                    marginLeft: 6,
                    marginRight: 6,
                  }}
                />
                <button
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 12px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    removeFromCart(item.productId);
                    forceUpdate((x) => x + 1);
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <p>
            <strong>Total:</strong> {total.toFixed(2)} €
          </p>

          <div style={{ marginTop: 12 }}>
            <button
              style={{
                backgroundColor: "#374151",
                color: "white",
                border: "none",
                borderRadius: 6,
                padding: "8px 16px",
                cursor: "pointer",
              }}
              onClick={() => {
                clearCart();
                forceUpdate((x) => x + 1);
              }}
            >
              Clear cart
            </button>

            <button
              style={{
                marginLeft: 12,
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: 6,
                padding: "8px 16px",
                cursor: "pointer",
                opacity: placing ? 0.7 : 1,
              }}
              disabled={placing}
              onClick={async () => {
                try {
                  setPlacing(true);
                  setMsg(null);

                  const items = getCart().map((x) => ({
                    product_id: x.productId,
                    qty: x.qty,
                  }));

                  await createOrder({ items });

                  clearCart();
                  forceUpdate((x) => x + 1);

                  setMsg("Order created ✓");
                  navigate("/orders");
                } catch (e) {
                  setMsg(String(e));
                } finally {
                  setPlacing(false);
                }
              }}
            >
              Place order
            </button>
          </div>

          {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
        </>
      )}
    </div>
  );
}
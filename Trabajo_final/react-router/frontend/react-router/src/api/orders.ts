export type OrderItemCreate = { product_id: number; qty: number };
export type OrderCreate = { items: OrderItemCreate[] };

export type OrderItem = { product_id: number; name: string; price: number; qty: number };
export type Order = { id: number; total: number; items: OrderItem[] };

const API_BASE = "http://127.0.0.1:8001";

export async function createOrder(data: OrderCreate): Promise<Order> {
  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchOrders(): Promise<Order[]> {
  const res = await fetch(`${API_BASE}/orders`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}
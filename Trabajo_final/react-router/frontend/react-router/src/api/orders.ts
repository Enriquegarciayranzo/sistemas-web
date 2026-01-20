import { apiFetch } from "./http";

export type OrderItemCreate = { product_id: number; qty: number };
export type OrderCreate = { items: OrderItemCreate[] };

export type OrderItem = { product_id: number; name: string; price: number; qty: number };
export type Order = { id: number; total: number; items: OrderItem[] };

export async function createOrder(data: OrderCreate) {
  return apiFetch("/orders", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function fetchOrders(): Promise<Order[]> {
  return apiFetch("/orders");
}
import { apiFetch } from "./http";

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  qty: number;
};

export function fetchCart() {
  return apiFetch("/cart", { method: "GET" }) as Promise<CartItem[]>;
}

export function addCartItem(productId: number, qty: number) {
  return apiFetch("/cart/add", {
    method: "POST",
    body: JSON.stringify({ productId, qty }),
  });
}

export function updateCartItem(productId: number, qty: number) {
  return apiFetch("/cart/update", {
    method: "PATCH",
    body: JSON.stringify({ productId, qty }),
  });
}

export function removeCartItem(productId: number) {
  return apiFetch(`/cart/${productId}`, { method: "DELETE" });
}

export function clearCartApi() {
  return apiFetch("/cart/clear", { method: "POST" });
}
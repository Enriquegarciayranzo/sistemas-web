import { apiFetch } from "./http";

export type CartItem = {
  product_id: number;
  qty: number;
  price?: number;
  name?: string;
};

// GET /cart
export async function fetchCart(): Promise<CartItem[]> {
  return apiFetch("/cart");
}

// POST /cart
export async function addCartItem(productId: number, qty: number) {
  return apiFetch("/cart", {
    method: "POST",
    body: JSON.stringify({
      product_id: productId,
      qty,
    }),
  });
}

// PUT /cart 
export async function updateCartItem(productId: number, qty: number) {
  return apiFetch("/cart", {
    method: "POST",
    body: JSON.stringify({
      product_id: productId,
      qty,
    }),
  });
}

// DELETE /cart
export async function clearCartApi() {
  return apiFetch("/cart", {
    method: "DELETE",
  });
}

// DELETE item concreto 
export async function removeCartItem(productId: number) {
  return apiFetch("/cart", {
    method: "POST",
    body: JSON.stringify({
      product_id: productId,
      qty: 0,
    }),
  });
}
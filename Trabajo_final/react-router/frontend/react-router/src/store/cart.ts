import {
  addCartItem,
  clearCartApi,
  fetchCart,
  removeCartItem,
  updateCartItem,
  type CartItem,
} from "../api/cart";
import { isLoggedIn } from "./auth";

let cart: CartItem[] = [];

export async function loadCart() {
  if (!isLoggedIn()) {
    cart = [];
    return cart;
  }
  cart = await fetchCart();
  return cart;
}

export function getCart() {
  return cart;
}

export async function addToCart(
  item: { productId: number; name: string; price: number },
  qty: number
) {
  if (!isLoggedIn()) throw new Error("Not logged in");
  await addCartItem(item.productId, qty);
  await loadCart();
}

export async function updateQty(productId: number, qty: number) {
  if (!isLoggedIn()) throw new Error("Not logged in");
  if (qty <= 0) {
    await removeCartItem(productId);
  } else {
    await updateCartItem(productId, qty);
  }
  await loadCart();
}

export async function removeFromCart(productId: number) {
  if (!isLoggedIn()) throw new Error("Not logged in");
  await removeCartItem(productId);
  await loadCart();
}

export async function clearCart() {
  if (!isLoggedIn()) throw new Error("Not logged in");
  await clearCartApi();
  await loadCart();
}

export function getTotal() {
  return cart.reduce((acc, it) => acc + it.price * it.qty, 0);
}
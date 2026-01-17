import {
  addCartItem,
  clearCartApi,
  fetchCart,
  removeCartItem,
  updateCartItem,
  type CartItem as ApiCartItem,
} from "../api/cart";
import { fetchProducts } from "../api/products";
import { isLoggedIn } from "./auth";

export type CartItem = {
  productId: number;
  qty: number;
  name: string;
  price: number;
};

let cart: CartItem[] = [];

export async function loadCart() {
  if (!isLoggedIn()) {
    cart = [];
    return cart;
  }

  // 1) items del carrito (solo product_id, qty)
  const items = (await fetchCart()) as ApiCartItem[];

  // 2) catálogo productos (id, name, price...)
  const products = await fetchProducts();
  const byId = new Map(products.map((p: any) => [p.id, p]));

  // 3) merge
  cart = items
    .map((it: any) => {
      const p = byId.get(it.product_id);
      return {
        productId: it.product_id,
        qty: it.qty,
        name: p?.name ?? `Product #${it.product_id}`,
        price: p?.price ?? 0,
      };
    })
    .filter((it) => it.qty > 0);

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
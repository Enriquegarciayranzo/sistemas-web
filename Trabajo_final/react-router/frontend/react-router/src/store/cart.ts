export type CartItem = {
  productId: number;
  name: string;
  price: number;
  qty: number;
};

let cart: CartItem[] = [];

export function getCart(): CartItem[] {
  return cart;
}

export function addToCart(item: Omit<CartItem, "qty">, qty: number) {
  const existing = cart.find((x) => x.productId === item.productId);
  if (existing) existing.qty += qty;
  else cart.push({ ...item, qty });
}

export function updateQty(productId: number, qty: number) {
  const item = cart.find((x) => x.productId === productId);
  if (!item) return;
  item.qty = qty;
  if (item.qty <= 0) {
    cart = cart.filter((x) => x.productId !== productId);
  }
}

export function removeFromCart(productId: number) {
  cart = cart.filter((x) => x.productId !== productId);
}

export function clearCart() {
  cart = [];
}

export function getTotal(): number {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}
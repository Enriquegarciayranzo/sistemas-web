export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
};

const API_URL = "http://127.0.0.1:8001";

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products/`);
  if (!res.ok) throw new Error("Error loading products");
  return res.json();
}
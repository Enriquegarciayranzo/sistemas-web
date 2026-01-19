import { apiFetch } from "./http";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
};

export async function fetchProducts(): Promise<Product[]> {
  return apiFetch("/products/");
}

export async function fetchProduct(id: number | string): Promise<Product> {
  return apiFetch(`/products/${id}/`);
}
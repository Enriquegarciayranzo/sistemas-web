/**
 * HeroPublic interface represents a hero as returned by the backend API.
 */
export interface HeroPublic {
  id: number;
  name: string;
  age: number | null;
}

/**
 * HeroCreate interface represents the payload needed to create a new hero.
 */
export interface HeroCreate {
  name: string;
  age?: number | null;
  secret_name: string;
}


const BASE_URL = 'http://localhost:8000';

/**
 * Creates a new hero by sending a POST request to the backend API.
 * 
 * @param data - HeroCreate object containing name, age, and secret_name
 * @returns Promise that resolves to the created HeroPublic object
 * @throws Error if the request fails, including HTTP status and error message
 */
export async function createHero(data: HeroCreate): Promise<HeroPublic> {
  const res = await fetch(`${BASE_URL}/heroes/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Create failed (${res.status}): ${text}`);
  }
  
  return res.json();
}

/**
 * Retrieves all heroes from the backend API.
 * 
 * @returns Promise that resolves to an array of HeroPublic objects
 * @throws Error if the request fails, including HTTP status and error message
 */
export async function listHeroes(): Promise<HeroPublic[]> {
  const res = await fetch(`${BASE_URL}/heroes/`);
  
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`List failed (${res.status}): ${text}`);
  }
  
  return res.json();
}

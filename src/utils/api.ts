import type { Book } from "../types/Book.js";

export async function loadBooksFromAPI(url: string): Promise<Book[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  return await res.json();
}
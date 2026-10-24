import { Item, CreateItemDto } from '../types/item';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function fetchItems(): Promise<Item[]> {
  const response = await fetch(`${BASE_URL}/items`);
  if (!response.ok) {
    throw new Error(`HTTP помилка: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function createItem(dto: CreateItemDto): Promise<Item> {
  const response = await fetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto),
  });

  if (!response.ok) {
    throw new Error(`Помилка створення: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

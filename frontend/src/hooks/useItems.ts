import { useState, useCallback } from 'react';
import { Item, CreateItemDto } from '../types/item';
import { fetchItems, createItem } from '../api/itemsApi';

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchItems();
      setItems(data);
      setHasLoaded(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Невідома помилка';
      setError(`Не вдалося з'єднатися з сервером (${message}). Переконайтеся, що бекенд запущено на порту 3000.`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addItem = useCallback(async (dto: CreateItemDto) => {
    setError(null);
    try {
      await createItem(dto);
      // Оновлюємо список після збереження нового товару
      const updated = await fetchItems();
      setItems(updated);
      setHasLoaded(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Не вдалося зберегти товар';
      setError(message);
      throw err;
    }
  }, []);

  return {
    items,
    isLoading,
    hasLoaded,
    error,
    loadItems,
    addItem,
  };
}

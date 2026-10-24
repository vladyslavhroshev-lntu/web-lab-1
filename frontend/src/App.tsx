import React, { useState } from 'react';
import './App.css';

interface Item {
  id: number;
  name: string;
  description?: string;
  price?: number;
}

const BACKEND_URL = 'http://localhost:3000';

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Стан для форми додавання нового товару (бонус)
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemDescription, setNewItemDescription] = useState<string>('');
  const [newItemPrice, setNewItemPrice] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Основна функція: завантаження списку елементів з GET /items
  const loadItems = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/items`);
      if (!response.ok) {
        throw new Error(`HTTP помилка: ${response.status} ${response.statusText}`);
      }
      const data: Item[] = await response.json();
      setItems(data);
      setHasLoaded(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Невідома помилка';
      setError(`Не вдалося з'єднатися з сервером (${message}). Переконайтеся, що бекенд запущено на ${BACKEND_URL}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Додаткова дія: додавання нового запису в SQLite через POST /items
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newItemName.trim(),
          description: newItemDescription.trim() || undefined,
          price: newItemPrice ? parseFloat(newItemPrice) : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Помилка збереження: ${response.status}`);
      }

      setNewItemName('');
      setNewItemDescription('');
      setNewItemPrice('');
      // Перезавантажуємо список після додавання
      await loadItems();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Не вдалося зберегти товар';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="app-container">
      <header className="header">
        <span className="badge">Практична робота №1</span>
        <h1 className="title">Онлайн-магазин: Каталог товарів</h1>
        <p className="subtitle">
          Базова трирівнева архітектура: Клієнт (React + Vite) → Бекенд (NestJS) → База даних (SQLite)
        </p>
      </header>

      <section className="card">
        <div className="actions-bar">
          {/* Обов'язкова кнопка "Load items" відповідно до завдання */}
          <button
            type="button"
            className="load-btn"
            onClick={loadItems}
            disabled={isLoading}
          >
            {isLoading ? '⏳ Завантаження...' : '🔄 Load items'}
          </button>

          <div className="status-info">
            {hasLoaded
              ? `Знайдено товарів: ${items.length}`
              : 'Натисніть «Load items», щоб отримати дані з бекенду'}
          </div>
        </div>

        {error && (
          <div className="error-banner" role="alert">
            <strong>⚠️ Помилка зʼєднання з сервером</strong>
            {error}
          </div>
        )}

        <div className="items-section">
          {items.length > 0 ? (
            <ul className="items-list">
              {items.map((item) => (
                <li key={item.id} className="item-card">
                  <div className="item-left">
                    <span className="item-id">#{item.id}</span>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      {item.description && (
                        <p className="item-description">{item.description}</p>
                      )}
                    </div>
                  </div>
                  {item.price !== undefined && item.price !== null && (
                    <div className="item-price">
                      {item.price.toLocaleString('uk-UA')} ₴
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <p>
                {hasLoaded
                  ? 'У базі даних наразі немає жодного елемента.'
                  : 'Список порожній. Натисніть «Load items» для завантаження.'}
              </p>
            </div>
          )}
        </div>

        {/* Форма швидкого додавання товару */}
        <form onSubmit={handleAddItem} className="add-item-form">
          <h3>➕ Додати новий товар до бази (SQLite)</h3>
          <div className="form-row">
            <input
              type="text"
              placeholder="Назва товару (обов'язково)"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Опис (необов'язково)"
              value={newItemDescription}
              onChange={(e) => setNewItemDescription(e.target.value)}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Ціна, ₴"
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
              className="input-field"
              style={{ maxWidth: '140px' }}
              min="0"
              step="0.01"
            />
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting || !newItemName.trim()}
            >
              {isSubmitting ? 'Збереження...' : 'Додати'}
            </button>
          </div>
        </form>
      </section>

      <footer className="footer">
        <p>Курс «Веб-розробка 2026» • ЛНТУ</p>
      </footer>
    </main>
  );
}

import { useItems } from './hooks/useItems';
import { Header } from './components/Header';
import { ItemsList } from './components/ItemsList';
import { AddItemForm } from './components/AddItemForm';
import { ErrorBanner } from './components/ErrorBanner';
import { Footer } from './components/Footer';
import './App.css';

export default function App() {
  const { items, isLoading, hasLoaded, error, loadItems, addItem } = useItems();

  return (
    <main className="app-container">
      <Header
        title="Онлайн-магазин: Каталог товарів"
        subtitle="Базова трирівнева архітектура: Клієнт (React + Vite) → Бекенд (NestJS) → База даних (SQLite)"
      />

      <section className="card">
        <div className="actions-bar">
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

        {error && <ErrorBanner message={error} />}

        <ItemsList items={items} hasLoaded={hasLoaded} />

        <AddItemForm onAdd={addItem} />
      </section>

      <Footer />
    </main>
  );
}

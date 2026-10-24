import React from 'react';
import { Item } from '../types/item';
import { ItemCard } from './ItemCard';

interface ItemsListProps {
  items: Item[];
  hasLoaded: boolean;
}

export const ItemsList: React.FC<ItemsListProps> = ({ items, hasLoaded }) => {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <p>
          {hasLoaded
            ? 'У базі даних наразі немає жодного елемента.'
            : 'Список порожній. Натисніть «Load items» для завантаження.'}
        </p>
      </div>
    );
  }

  return (
    <div className="items-section">
      <ul className="items-list">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

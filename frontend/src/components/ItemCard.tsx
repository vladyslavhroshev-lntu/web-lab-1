import React from 'react';
import { Item } from '../types/item';

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <li className="item-card">
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
  );
};

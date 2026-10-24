import React, { useState } from 'react';
import { CreateItemDto } from '../types/item';

interface AddItemFormProps {
  onAdd: (dto: CreateItemDto) => Promise<void>;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await onAdd({
        name: name.trim(),
        description: description.trim() || undefined,
        price: price ? parseFloat(price) : undefined,
      });

      setName('');
      setDescription('');
      setPrice('');
    } catch {
      // Помилка вже обробляється у хуку/зовні
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form">
      <h3>➕ Додати новий товар до бази (SQLite)</h3>
      <div className="form-row">
        <input
          type="text"
          placeholder="Назва товару (обов'язково)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="text"
          placeholder="Опис (необов'язково)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Ціна, ₴"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input-field"
          style={{ maxWidth: '140px' }}
          min="0"
          step="0.01"
        />
        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting || !name.trim()}
        >
          {isSubmitting ? 'Збереження...' : 'Додати'}
        </button>
      </div>
    </form>
  );
};

'use client';

import { TEXT } from '../../lib/text';

interface ChangesProps {
  changes: string[];
  selectedChanges: string[];
  onToggle: (change: string) => void;
}

export function Changes({ changes, selectedChanges, onToggle }: ChangesProps) {
  if (changes.length === 0) return null;
  return (
    <div className="epicure-dish-modal__section">
      <h3 className="epicure-dish-modal__section-title">{TEXT.dishModal.changes}</h3>
      {changes.map(change => (
        <label key={change} className="epicure-dish-modal__option">
          <input
            type="checkbox"
            checked={selectedChanges.includes(change)}
            onChange={() => onToggle(change)}
          />
          {change}
        </label>
      ))}
    </div>
  );
}

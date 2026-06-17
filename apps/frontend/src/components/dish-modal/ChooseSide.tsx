'use client';

import { TEXT } from '../../lib/text';

interface ChooseSideProps {
  sides: string[];
  dishId: number;
  selectedSide: string | undefined;
  onChange: (side: string) => void;
}

export function ChooseSide({ sides, dishId, selectedSide, onChange }: ChooseSideProps) {
  if (sides.length === 0) return null;
  return (
    <div className="epicure-dish-modal__section">
      <h3 className="epicure-dish-modal__section-title">{TEXT.dishModal.chooseSide}</h3>
      {sides.map(side => (
        <label key={side} className="epicure-dish-modal__option">
          <input
            type="radio"
            name={`side-${dishId}`}
            value={side}
            checked={selectedSide === side}
            onChange={() => onChange(side)}
          />
          {side}
        </label>
      ))}
    </div>
  );
}

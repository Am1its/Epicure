import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { TEXT } from '../lib/text';

interface PriceFilterProps {
  globalPrices: { min: number; max: number };
  value: [number, number];
  onChange: (range: [number, number]) => void;
  onClear: () => void;
}

export function PriceFilter({ globalPrices, value, onChange, onClear }: PriceFilterProps) {
  const isDirtyLeft = value[0] !== globalPrices.min;
  const isDirtyRight = value[1] !== globalPrices.max;
  const isDirty = isDirtyLeft || isDirtyRight;

  const wrapClass = [
    'epicure-filter-slider-wrap',
    isDirtyLeft ? 'epicure-filter-slider-wrap--dirty-left' : '',
    isDirtyRight ? 'epicure-filter-slider-wrap--dirty-right' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <p className="epicure-filter-dropdown__title">Price Range Selected</p>
      <p className="epicure-filter-dropdown__sublabel">₪{value[0]} – ₪{value[1]}</p>
      <div className={wrapClass}>
        <span className="epicure-filter-slider-edge">₪{globalPrices.min}</span>
        <div className="epicure-price-tier-wrap">
          <Slider
            range
            min={globalPrices.min}
            max={globalPrices.max}
            value={value}
            onChange={(v) => onChange(v as [number, number])}
          />
          <div className="epicure-price-tier-labels">
            {TEXT.restaurantsGrid.priceTierLabels.map(label => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
        <span className="epicure-filter-slider-edge">₪{globalPrices.max}</span>
      </div>
      {isDirty && (
        <button className="epicure-filter-clear-btn" onClick={onClear}>CLEAR</button>
      )}
    </>
  );
}

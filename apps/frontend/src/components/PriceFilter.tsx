import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface PriceFilterProps {
  globalPrices: { min: number; max: number };
  value: [number, number];
  onChange: (range: [number, number]) => void;
}

export function PriceFilter({ globalPrices, value, onChange }: PriceFilterProps) {
  return (
    <>
      <p className="epicure-filter-dropdown__title">Price Range Selected</p>
      <p className="epicure-filter-dropdown__sublabel">₪{value[0]} – ₪{value[1]}</p>
      <div className="epicure-filter-slider-wrap">
        <span className="epicure-filter-slider-edge">₪{globalPrices.min}</span>
        <Slider
          range
          min={globalPrices.min}
          max={globalPrices.max}
          value={value}
          onChange={(v) => onChange(v as [number, number])}
        />
        <span className="epicure-filter-slider-edge">₪{globalPrices.max}</span>
      </div>
    </>
  );
}

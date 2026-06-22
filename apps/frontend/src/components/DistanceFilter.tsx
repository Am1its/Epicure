import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { TEXT } from '../lib/text';

interface DistanceFilterProps {
  value: number;
  isDirty: boolean;
  onChange: (km: number) => void;
  onClear: () => void;
}

export function DistanceFilter({ value, isDirty, onChange, onClear }: DistanceFilterProps) {
  return (
    <>
      <p className="epicure-filter-dropdown__title">{TEXT.restaurantsGrid.distanceFilter}</p>
      <div className={`epicure-filter-slider-wrap${isDirty ? ' epicure-filter-slider-wrap--dirty' : ''}`}>
        <span className="epicure-filter-slider-edge">{TEXT.restaurantsGrid.distanceMyLocation}</span>
        <Slider
          min={0}
          max={20}
          step={1}
          value={value}
          onChange={(v) => onChange(v as number)}
        />
        <span className="epicure-filter-slider-edge">{value}km</span>
      </div>
      {isDirty && (
        <button className="epicure-filter-clear-btn" onClick={onClear}>CLEAR</button>
      )}
    </>
  );
}

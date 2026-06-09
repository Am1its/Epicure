import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface DistanceFilterProps {
  value: number;
  onChange: (km: number) => void;
}

export function DistanceFilter({ value, onChange }: DistanceFilterProps) {
  return (
    <>
      <p className="epicure-filter-dropdown__title">Distance</p>
      <div className="epicure-filter-slider-wrap">
        <span className="epicure-filter-slider-edge">My location</span>
        <Slider
          min={0}
          max={20}
          step={1}
          value={value}
          onChange={(v) => onChange(v as number)}
        />
        <span className="epicure-filter-slider-edge">{value}km</span>
      </div>
    </>
  );
}

import { TEXT } from '../lib/text';

export function IconsLegend() {
  return (
    <div className="epicure-icons-legend">
      <h2 className="epicure-icons-legend__title">{TEXT.home.iconsTitle}</h2>
      <ul className="epicure-icons-legend__list">
        {TEXT.icons.map(icon => (
          <li key={icon.label} className="epicure-icons-legend__item">
            <img src={icon.src} alt="" aria-hidden="true" className="epicure-icons-legend__icon" />
            <span className="epicure-icons-legend__label">{icon.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

'use client';

import { TEXT } from '../lib/text';

export function MobileAppSection() {
  return (
    <div className="epicure-app-section">
      <div className="epicure-app-section__brand">
        <img src="/icons/about-logo.svg" alt="Epicure" width={102} height={102} />
      </div>
      <a href="#" aria-disabled="true" onClick={e => e.preventDefault()} className="epicure-app-section__store-btn">
        <img src="/icons/google.svg" alt="" aria-hidden="true" width={19} height={25} />
        <span className="epicure-app-section__store-text">
          <small className="epicure-app-section__store-subtext">{TEXT.appSection.googlePlay.line1}</small>
          {TEXT.appSection.googlePlay.line2}
        </span>
      </a>
      <a href="#" aria-disabled="true" onClick={e => e.preventDefault()} className="epicure-app-section__store-btn">
        <img src="/icons/apple.svg" alt="" aria-hidden="true" width={23} height={30} />
        <span className="epicure-app-section__store-text">
          <small className="epicure-app-section__store-subtext">{TEXT.appSection.appStore.line1}</small>
          {TEXT.appSection.appStore.line2}
        </span>
      </a>
      <div className="epicure-app-section__about">
        <h2 className="epicure-app-section__about-title">{TEXT.appSection.aboutTitle}</h2>
        <p className="epicure-app-section__about-text">{TEXT.appSection.aboutText}</p>
      </div>
    </div>
  );
}

'use client';

import { TEXT } from '../lib/text';

export function DesktopAboutSection() {
  return (
    <section className="epicure-desktop-about">
      <div className="epicure-desktop-about__inner">
        <div className="epicure-desktop-about__left">
          <h2 className="epicure-desktop-about__title">{TEXT.appSection.aboutTitle}</h2>
          <p className="epicure-desktop-about__text">{TEXT.appSection.aboutText}</p>
          <p className="epicure-desktop-about__text">{TEXT.appSection.aboutText2}</p>
          <div className="epicure-desktop-about__store-btns">
            <a href="#" aria-disabled="true" onClick={e => e.preventDefault()} className="epicure-desktop-about__store-btn">
              <img src="/icons/apple.svg" alt="" aria-hidden="true" width={23} height={30} />
              <span className="epicure-desktop-about__store-text">
                <small className="epicure-desktop-about__store-subtext">{TEXT.appSection.appStore.line1}</small>
                {TEXT.appSection.appStore.line2}
              </span>
            </a>
            <a href="#" aria-disabled="true" onClick={e => e.preventDefault()} className="epicure-desktop-about__store-btn">
              <img src="/icons/google.svg" alt="" aria-hidden="true" width={19} height={25} />
              <span className="epicure-desktop-about__store-text">
                <small className="epicure-desktop-about__store-subtext">{TEXT.appSection.googlePlay.line1}</small>
                {TEXT.appSection.googlePlay.line2}
              </span>
            </a>
          </div>
        </div>
        <div className="epicure-desktop-about__right">
          <img src="/icons/about-logo.svg" alt="Epicure" width={178} height={166} />
        </div>
      </div>
    </section>
  );
}

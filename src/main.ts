import { gsap } from 'gsap';

import { type HtmlEl, type HtmlElWithNull } from './lib/types';
import { parseFloatWithUndefined, parseGsapEaseStrWithUndefined } from './lib/util';

document.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('.home-hero-heading-animation-container');
  const items = document.querySelectorAll('.home-hero-heading-slide-item');

  const tl = gsap.timeline({
    repeat: -1,
  });

  items.forEach((_, i) => {
    if (i === 0) {
      tl.from(target, {
        yPercent: 0,
      });
    } else {
      tl.to(target, {
        yPercent: -((i * 100) / items.length),
        delay: 1,
        duration: 0.5,
        ease: 'power4.inOut',
      });

      if (i === items.length - 1) {
        tl.restart();
      }
    }
  });

  const cards = [...document.querySelectorAll('.card-3d-viewport')] as HtmlEl[];

  cards.forEach((card) => {
    const cardImg = card.querySelector('.card-3d-image-contain') as HtmlElWithNull;

    const rotateXTo = gsap.quickTo(card, 'rotationX', {
      duration: 0.5,
      ease: 'power4',
    });
    const rotateYTo = gsap.quickTo(card, 'rotationY', {
      duration: 0.5,
      ease: 'power4',
    });

    const imageScaleXTo = gsap.quickTo(cardImg, 'scaleX', {
      duration: 0.4,
      ease: 'power4',
    });
    const imageScaleYTo = gsap.quickTo(cardImg, 'scaleY', {
      duration: 0.4,
      ease: 'power4',
    });
    const imageXTo = gsap.quickTo(cardImg, 'xPercent', {
      duration: 0.4,
      ease: 'power4',
    });
    const imageYTo = gsap.quickTo(cardImg, 'yPercent', {
      duration: 0.4,
      ease: 'power4',
    });

    card.addEventListener('mousemove', (e: MouseEvent) => {
      const cardRect = card.getBoundingClientRect();
      const cardX = cardRect.left;
      const cardY = cardRect.y;
      const cardW = cardRect.width;
      const cardH = cardRect.height;

      const mouseX = gsap.utils.clamp(0, cardW, e.clientX - cardX);
      const mouseY = gsap.utils.clamp(0, cardH, e.clientY - cardY);

      rotateXTo(gsap.utils.mapRange(0, cardH, -20, 20, mouseY));
      rotateYTo(gsap.utils.mapRange(0, cardW, 20, -20, mouseX));

      imageXTo(gsap.utils.mapRange(0, cardW, 3.5, -3.5, mouseX));
      imageYTo(gsap.utils.mapRange(0, cardH, -3.5, 3.5, mouseY));
    });

    card.addEventListener('mouseenter', () => {
      imageScaleXTo(1.1);
      imageScaleYTo(1.1);
    });

    card.addEventListener('mouseleave', () => {
      rotateXTo(0);
      rotateYTo(0);
      imageScaleXTo(1);
      imageScaleYTo(1);
      imageXTo(0);
      imageYTo(0);
    });
  });
});

// Generic Expandable Element
const triggers = [...document.querySelectorAll('.expandable-trigger')] as HtmlEl[];

for (let i = 0; i < triggers.length; i++) {
  const trigger = triggers[i];
  const parent = trigger?.closest('.expandable-parent');
  const viewport =
    trigger?.querySelector('.expandable-viewport') || parent?.querySelector('.expandable-viewport');

  if (!viewport) continue;

  gsap.set(viewport, {
    height: 0,
  });

  const durationIn = parseFloatWithUndefined(trigger?.dataset.durationIn) ?? 0.4;
  const durationOut = parseFloatWithUndefined(trigger?.dataset.durationOut) ?? 0.4;
  const delayIn = parseFloatWithUndefined(trigger?.dataset.delayIn) ?? 0.1;
  const delayOut = parseFloatWithUndefined(trigger?.dataset.delayOut) ?? 0.1;
  const easingIn = (parseGsapEaseStrWithUndefined(trigger?.dataset.easeOptionIn) ||
    'back.out') as GSAPTweenVars['ease'];
  const easingOut = (parseGsapEaseStrWithUndefined(trigger?.dataset.easeOptionOut) ||
    'back.in') as GSAPTweenVars['ease'];

  trigger?.addEventListener('mouseenter', () => {
    gsap.to(viewport, {
      height: 'auto',
      duration: durationIn,
      delay: delayIn,
      ease: easingIn,
      overwrite: true,
    });
  });

  trigger?.addEventListener('mouseleave', () => {
    gsap.to(viewport, {
      height: 0,
      duration: durationOut,
      delay: delayOut,
      ease: easingOut,
      overwrite: true,
    });
  });
}

import type { HtmlEl, HtmlElWithNull } from '$/lib/types';
import { parseFloatWithUndefined } from '$/lib/util';
import { gsap } from 'gsap';

const target = document.querySelector('.home-hero-heading-animation-container') as HtmlElWithNull;
const items = [...document.querySelectorAll('.home-hero-heading-slide-item')] as HtmlEl[];

const defaultDuration = 0.5;
const defaultDelay = 1;

const duration = parseFloatWithUndefined(target?.dataset.duration) ?? defaultDuration;
const delay = parseFloatWithUndefined(target?.dataset.delay) ?? defaultDelay;

const tl = gsap.timeline({
  repeat: -1,
});

items.forEach((_, i) => {
  if (i === 0) return;
  console.log((i * 100) / items.length);
  console.log(i, new Date().getSeconds());
  tl.to(target, {
    yPercent: -((i * 100) / items.length),
    delay,
    duration,
    ease: 'power4.inOut',
    willChange: 'transform',
  });

  if (i === items.length - 1) {
    tl.restart();
  }
});

tl.delay(1);

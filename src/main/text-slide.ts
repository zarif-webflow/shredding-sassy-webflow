import { gsap } from 'gsap';

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

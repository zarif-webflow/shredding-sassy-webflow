import { gsap } from 'gsap';
import type { HtmlEl, HtmlElWithNull } from 'src/lib/types';

const cards = [...document.querySelectorAll('.card-3d-viewport')] as HtmlEl[];

cards.forEach((card) => {
  const cardImg = card.querySelector('.card-3d-image-contain') as HtmlElWithNull;

  gsap.set([card, cardImg], { willChange: 'transform' });

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

import { gsap } from 'gsap';

import { type HtmlEl } from '../lib/types';
import { parseFloatWithUndefined, parseGsapEaseStrWithUndefined } from '../lib/util';

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

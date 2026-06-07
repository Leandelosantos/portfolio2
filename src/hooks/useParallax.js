// useParallax.js — SRS §4.2 — Parallax multi-capa con ScrollTrigger
// Desktop: scrub completo | Tablet (768-1279px): 1 capa | Mobile: desactivado
// buenas-practicas §3: ScrollTrigger.matchMedia para breakpoints

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Aplica parallax scrub a un elemento.
 * @param {React.RefObject} elementRef — el elemento a animar
 * @param {Object} options
 * @param {number}  options.speed     — velocidad relativa (0.1–0.5). Default 0.3
 * @param {string}  options.start     — ScrollTrigger start. Default 'top top'
 * @param {string}  options.end       — ScrollTrigger end. Default 'bottom top'
 * @param {React.RefObject} options.triggerRef — trigger alternativo (default: elementRef)
 */
export function useParallax(elementRef, {
  speed = 0.3,
  start = 'top top',
  end = 'bottom top',
  triggerRef = null,
} = {}) {
  useGSAP(() => {
    const el = elementRef.current;
    if (!el) return;

    const trigger = triggerRef?.current ?? el;

    ScrollTrigger.matchMedia({
      // ── Desktop (≥ 1280px): parallax completo
      '(min-width: 1280px)': () => {
        gsap.to(el, {
          yPercent: -(speed * 100),
          ease: 'none',
          scrollTrigger: {
            trigger,
            start,
            end,
            scrub: true,
          },
        });
      },

      // ── Tablet (768-1279px): parallax reducido (1 capa)
      '(min-width: 768px) and (max-width: 1279px)': () => {
        gsap.to(el, {
          yPercent: -(speed * 50),
          ease: 'none',
          scrollTrigger: {
            trigger,
            start,
            end,
            scrub: true,
          },
        });
      },

      // ── Mobile (<768px): sin parallax
      '(max-width: 767px)': () => {
        // noop — no animation
      },
    });
  }, { dependencies: [speed, start, end] });
}

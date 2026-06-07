// lenis.js — Singleton Lenis para smooth scroll global
// Exportado para uso en main.jsx (ticker) y PageTransitionContext (scrollTo)

import Lenis from 'lenis';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const lenis = prefersReducedMotion
  ? null
  : new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

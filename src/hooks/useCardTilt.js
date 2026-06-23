// useCardTilt.js — tilt 3D por cursor para ProjectCard (visualización de proyectos)
// Listener local al elemento (no MouseContext global) — aislado, sin recomputar
// matemática de tilt en cada card por un solo ref global compartido.
// Animar SOLO transform (rotateX/rotateY/scale) — buenas-practicas §3 GPU-only.

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useReducedMotion } from './useReducedMotion';

const isDesktop = window.matchMedia('(min-width: 768px)').matches;

/**
 * @param {Object} options
 * @param {number} options.maxTilt — grados máximos de rotación. Default 8
 */
export function useCardTilt({ maxTilt = 8 } = {}) {
  const cardRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useGSAP(() => {
    const el = cardRef.current;
    if (!el || !isDesktop || prefersReduced) return;

    gsap.set(el, { transformPerspective: 800, transformStyle: 'preserve-3d' });

    // Solo 2 quickTo en propiedades de transform por elemento (rotationX/rotationY) —
    // un tercer quickTo (ej. scale) sobre el mismo target choca con el PropTween
    // compartido de "transform" y GSAP tira "not eligible for reset". El scale on
    // enter/leave es esporádico (no corre a 60fps), por eso usa gsap.to() normal.
    const rotateXTo = gsap.quickTo(el, 'rotationX', { duration: 0.4, ease: 'power3.out' });
    const rotateYTo = gsap.quickTo(el, 'rotationY', { duration: 0.4, ease: 'power3.out' });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const xNorm = (e.clientX - rect.left) / rect.width - 0.5;
      const yNorm = (e.clientY - rect.top) / rect.height - 0.5;
      rotateYTo(xNorm * maxTilt * 2);
      rotateXTo(-yNorm * maxTilt * 2);
    };

    const onEnter = () => gsap.to(el, { scale: 1.03, duration: 0.3, ease: 'power3.out' });

    const onLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
      gsap.to(el, { scale: 1, duration: 0.3, ease: 'power3.out' });
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, { dependencies: [maxTilt, prefersReduced] });

  return cardRef;
}

// useMousePosition.js — SRS §2.4 — Posición del mouse para cursor + Three.js
// Usa ref (no state) para no causar re-renders en cada mousemove

import { useEffect, useRef } from 'react';

/**
 * Retorna un ref con { x, y } de la posición del mouse normalizada.
 * x, y: coordenadas en píxeles (sin normalizar) para GSAP quickTo.
 * También expone xNorm, yNorm: [-1, 1] para Three.js.
 */
export function useMousePosition() {
  const position = useRef({ x: 0, y: 0, xNorm: 0, yNorm: 0 });

  useEffect(() => {
    const handler = (e) => {
      position.current = {
        x: e.clientX,
        y: e.clientY,
        xNorm: (e.clientX / window.innerWidth) * 2 - 1,
        yNorm: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return position;
}

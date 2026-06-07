// useReducedMotion.js — SRS §5.3 — prefers-reduced-motion
// Complementa el timeScale(0) global de main.jsx para uso en componentes

import { useState, useEffect } from 'react';

/**
 * Retorna true si el usuario ha activado prefers-reduced-motion.
 * Sincroniza con cambios en tiempo real (ej. usuario cambia preferencia en OS).
 */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

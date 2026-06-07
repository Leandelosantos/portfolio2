// useNavbarBehavior.js — SRS §4.1 — Navbar hide/show en scroll
// Oculta navbar al scrollear hacia abajo, muestra al scrollear hacia arriba

import { useEffect, useRef, useState } from 'react';

/**
 * @param {number} threshold — píxeles mínimos de scroll para detectar dirección (default 10)
 * @returns {{ isVisible: boolean, isAtTop: boolean }}
 */
export function useNavbarBehavior(threshold = 10) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const current = window.scrollY;
        const diff = current - lastScrollY.current;

        setIsAtTop(current < 20);

        if (Math.abs(diff) > threshold) {
          setIsVisible(diff < 0 || current < 80);
          lastScrollY.current = current;
        }

        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { isVisible, isAtTop };
}

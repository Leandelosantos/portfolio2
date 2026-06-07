// CustomCursor.jsx — SRS §2.4 — Cursor personalizado
// Dot lima 8px + ring 40px con lag. Solo en pointer: fine (desktop).
// buenas-practicas §3: useGSAP + quickTo. Event delegation para hover states.

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useMouse } from '../../context/MouseContext';

const isPointerFine = window.matchMedia('(pointer: fine)').matches;

export function CustomCursor() {
  const mouseRef = useMouse();
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useGSAP(() => {
    if (!isPointerFine) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    // quickTo: performance óptima — evita crear tweens en cada frame
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power2.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power2.out' });

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select';

    const onMove = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    // Event delegation — captura elementos dinámicos (routes futuras)
    const onEnter = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        gsap.to(ring, { scale: 2.5, duration: 0.3, ease: 'power2.out' });
      }
    };
    const onLeave = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power2.out' });
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, []); // [] — setup una sola vez en mount

  if (!isPointerFine) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--color-accent-hot)',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid var(--color-accent-hot)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
    </>
  );
}

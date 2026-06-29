// CustomCursor.jsx — SRS §2.4 — Cursor personalizado
// Dot lima 4px (puntero preciso) + 4 corner-brackets que en reposo siguen
// el mouse formando un recuadro chico, y al hover sobre un interactivo se
// trasladan a las 4 esquinas reales del elemento (getBoundingClientRect) —
// "encuadra" en vez de solo escalar. Solo en pointer: fine (desktop).
// Todo por transform x/y (quickTo) — nunca width/height, ni siquiera acá.
// buenas-practicas §3: useGSAP + quickTo. Event delegation para hover states.

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const isPointerFine = window.matchMedia('(pointer: fine)').matches;

const IDLE_HALF = 14; // mitad del recuadro en reposo (px)
const FRAME_PADDING = 8; // aire entre el elemento real y el bracket al encuadrar
const BRACKET_SIZE = 10; // largo de cada brazo del bracket

// Cada bracket es su propia caja BRACKET_SIZE×BRACKET_SIZE con borde solo en
// 2 lados (forma L). translate(x,y) ubica la esquina (0,0) de esa caja —
// outerX/outerY calculan qué (x,y) hace que la esquina CON BORDE quede
// exactamente sobre la esquina del rect objetivo.
const CORNERS = [
  {
    id: 'tl',
    borderSides: { borderTop: true, borderLeft: true },
    outerX: (rect) => rect.left,
    outerY: (rect) => rect.top,
  },
  {
    id: 'tr',
    borderSides: { borderTop: true, borderRight: true },
    outerX: (rect) => rect.right - BRACKET_SIZE,
    outerY: (rect) => rect.top,
  },
  {
    id: 'bl',
    borderSides: { borderBottom: true, borderLeft: true },
    outerX: (rect) => rect.left,
    outerY: (rect) => rect.bottom - BRACKET_SIZE,
  },
  {
    id: 'br',
    borderSides: { borderBottom: true, borderRight: true },
    outerX: (rect) => rect.right - BRACKET_SIZE,
    outerY: (rect) => rect.bottom - BRACKET_SIZE,
  },
];

function idleRect(clientX, clientY) {
  return {
    left: clientX - IDLE_HALF,
    right: clientX + IDLE_HALF,
    top: clientY - IDLE_HALF,
    bottom: clientY + IDLE_HALF,
  };
}

function targetRect(el) {
  const r = el.getBoundingClientRect();
  return {
    left: r.left - FRAME_PADDING,
    right: r.right + FRAME_PADDING,
    top: r.top - FRAME_PADDING,
    bottom: r.bottom + FRAME_PADDING,
  };
}

export function CustomCursor() {
  const dotRef = useRef(null);
  const bracketRefs = useRef([]);
  const lockedRef = useRef(false);

  useGSAP(() => {
    if (!isPointerFine) return;

    const dot = dotRef.current;

    // quickTo: performance óptima — evita crear tweens en cada frame
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });

    const cornerSetters = CORNERS.map((_, i) => ({
      x: gsap.quickTo(bracketRefs.current[i], 'x', { duration: 0.4, ease: 'power2.out' }),
      y: gsap.quickTo(bracketRefs.current[i], 'y', { duration: 0.4, ease: 'power2.out' }),
    }));

    const applyRect = (rect) => {
      CORNERS.forEach((corner, i) => {
        cornerSetters[i].x(corner.outerX(rect));
        cornerSetters[i].y(corner.outerY(rect));
      });
    };

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select';

    const onMove = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      if (!lockedRef.current) {
        applyRect(idleRect(e.clientX, e.clientY));
      }
    };

    // Event delegation — captura elementos dinámicos (routes futuras)
    const onEnter = (e) => {
      const target = e.target.closest(INTERACTIVE);
      if (!target) return;
      lockedRef.current = true;
      applyRect(targetRect(target));
      gsap.to(dot, { opacity: 0, duration: 0.2, ease: 'power2.out' });
    };
    const onLeave = (e) => {
      if (!e.target.closest(INTERACTIVE)) return;
      lockedRef.current = false;
      gsap.to(dot, { opacity: 1, duration: 0.2, ease: 'power2.out' });
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
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: 'var(--color-accent-hot)',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
      {CORNERS.map((corner, i) => (
        <div
          key={corner.id}
          ref={(el) => (bracketRefs.current[i] = el)}
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: BRACKET_SIZE,
            height: BRACKET_SIZE,
            borderTop: corner.borderSides.borderTop
              ? '1.5px solid var(--color-accent-hot)'
              : 'none',
            borderBottom: corner.borderSides.borderBottom
              ? '1.5px solid var(--color-accent-hot)'
              : 'none',
            borderLeft: corner.borderSides.borderLeft
              ? '1.5px solid var(--color-accent-hot)'
              : 'none',
            borderRight: corner.borderSides.borderRight
              ? '1.5px solid var(--color-accent-hot)'
              : 'none',
            pointerEvents: 'none',
            zIndex: 9999,
            willChange: 'transform',
          }}
        />
      ))}
    </>
  );
}

// Loader.jsx — SRS §3.3 — Secuencia de carga inicial
// Duración total: 1.8s | Counter 0→100 → reveal nombre → wipe out
// buenas-practicas §3: useGSAP, nunca useEffect para GSAP

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { splitChars } from '../../utils/splitTextHelpers';
import { useLoader } from '../../context/LoaderContext';

export function Loader() {
  const { setIsLoaded } = useLoader();
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const [counter, setCounter] = useState(0);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // ── Fase 1: Counter 0 → 100 (0 - 1.0s) ─────────────────
      const proxy = { value: 0 };
      tl.to(proxy, {
        value: 100,
        duration: 1.0,
        ease: 'power1.inOut',
        onUpdate: () => setCounter(Math.round(proxy.value)),
      });

      // ── Fase 2: Reveal nombre con split-type (1.0 - 1.4s) ───
      tl.add(() => {
        if (!nameRef.current) return;
        const split = splitChars(nameRef.current);
        gsap.from(split.chars, {
          opacity: 0,
          yPercent: 120,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.025,
          onComplete: () => split.revert(),
        });
      }, '-=0.2');

      // ── Fase 3: Wipe out del loader (1.4 - 1.8s) ────────────
      // setIsLoaded dispara al EMPEZAR el wipe (no en onComplete del timeline completo):
      // así el Hero ya está revelándose mientras la cortina sale, sin el "pop"
      // visible de opacity 1→0→1 que pasaba cuando esperaba al wipe terminado.
      tl.to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 0.7,
          ease: 'power3.inOut',
          delay: 0.15,
          onStart: () => setIsLoaded(true),
        },
        '+=0.1'
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      role="status"
      aria-label="Cargando"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: 'clamp(24px, 6vw, 80px)',
        overflow: 'hidden',
      }}
    >
      {/* Counter */}
      <span
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--type-mono)',
          color: 'var(--color-text-secondary)',
          letterSpacing: 'var(--ls-mono)',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}
      >
        {String(counter).padStart(3, '0')}
      </span>

      {/* Nombre */}
      <span
        ref={nameRef}
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 5vw, 72px)',
          fontWeight: 900,
          color: 'var(--color-text-primary)',
          lineHeight: 1,
          overflow: 'hidden',
          display: 'block',
        }}
      >
        Leandro De Los Santos Aboy
      </span>

      {/* Línea decorativa inferior */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 'clamp(24px, 6vw, 80px)',
          right: 'clamp(24px, 6vw, 80px)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--type-mono)',
          color: 'var(--color-text-muted)',
          letterSpacing: 'var(--ls-mono)',
        }}
      >
        SOFTWARE DEVELOPER & PROJECT MANAGER
      </div>
    </div>
  );
}

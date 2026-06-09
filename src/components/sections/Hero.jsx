// Hero.jsx — SRS §4.2 — Hero Section
// Layout nuevo: label centrado arriba → headline full-width con 3D inline → nombre → descripción
// Canvas full-bleed como fondo (partículas + HeroObject)
// El spacer transparente en el h1 actúa como "ventana" sobre el objeto 3D centrado
// buenas-practicas §3: useGSAP, split-type con revert en onComplete

import { useRef, Suspense, lazy } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { splitCharsWords } from '../../utils/splitTextHelpers';
import { useLoader } from '../../context/LoaderContext';
import { useParallax } from '../../hooks/useParallax';

// HeroCanvas — lazy loaded. Solo desktop descarga el chunk Three.js.
const isMobile = window.matchMedia('(max-width: 767px)').matches;
const HeroCanvas = !isMobile
  ? lazy(() => import('../three/HeroCanvas'))
  : null;

export function Hero() {
  const { isLoaded } = useLoader();
  const sectionRef   = useRef(null);
  const canvasRef    = useRef(null);
  const taglineRef   = useRef(null);

  // Parallax sutil en el canvas de fondo
  useParallax(canvasRef, { speed: 0.06, triggerRef: sectionRef });

  // ── Animación de entrada — trigger: loader completo ──────────
  useGSAP(
    () => {
      if (!isLoaded || !taglineRef.current) return;

      const tl = gsap.timeline({ delay: 0.15 });

      // Canvas fondo: fade in primero
      tl.from(canvasRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: 'power1.out',
      });

      // Label: fade + y
      tl.from('.hero__label', {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.9');

      // Tagline: chars desde abajo en ambos spans
      const splitL = splitCharsWords(taglineRef.current.querySelector('.hero__tagline-left'));
      const splitR = splitCharsWords(taglineRef.current.querySelector('.hero__tagline-right'));
      tl.from(
        [...splitL.chars, ...splitR.chars],
        {
          opacity: 0,
          yPercent: 110,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.022,
          onComplete: () => { splitL.revert(); splitR.revert(); },
        },
        '-=0.3'
      );

      // Nombre + descripción
      tl.from(
        '.hero__sub, .hero__desc',
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.14,
        },
        '-=0.35'
      );
    },
    { scope: sectionRef, dependencies: [isLoaded] }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Hero — Ingeniería como Arte"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: 'clamp(80px, 10vh, 120px)',
        paddingBottom: 'clamp(60px, 8vh, 100px)',
        gap: 'clamp(1.2rem, 2.5vh, 2rem)',
      }}
    >
      {/* ── Canvas full-bleed: partículas + HeroObject ───────── */}
      <div
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          willChange: 'transform',
        }}
      >
        {HeroCanvas && (
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        )}
      </div>

      {/* ── Contenido — sobre el canvas ──────────────────────── */}

      {/* Label — posicionado cerca del navbar, fuera del flujo flex */}
      <span
        className="hero__label"
        style={{
          position: 'absolute',
          top: 'clamp(88px, 11vh, 112px)',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          zIndex: 2,
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--type-mono)',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: 'var(--ls-mono)',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        Software Developer &amp; Project Manager
      </span>

      {/* Headline: "Ingeniería — [ventana 3D] — como Arte" */}
      <h1
        ref={taglineRef}
        aria-label="Ingeniería como Arte"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(0.75rem, 2vw, 2rem)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.2rem, 7vw, 8rem)',
          fontWeight: 900,
          color: 'var(--color-text-primary)',
          lineHeight: 2,
          margin: 0,
          padding: '0 clamp(16px, 4vw, 48px)',
          width: '100%',
        }}
      >
        <span className="hero__tagline-left" style={{ overflow: 'hidden', display: 'block' }}>
          Ingeniería
        </span>

        {/* Spacer transparente: "ventana" sobre el HeroObject centrado en canvas */}
        {!isMobile && (
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              flexShrink: 0,
              width: 'clamp(160px, 20vw, 360px)',
              height: 'clamp(160px, 20vw, 360px)',
              pointerEvents: 'none',
            }}
          />
        )}

        <span className="hero__tagline-right" style={{ overflow: 'hidden', display: 'block' }}>
          como Arte
        </span>
      </h1>

      {/* Nombre */}
      <p
        className="hero__sub"
        style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1rem, 2.5vw, var(--type-project))',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'var(--color-text-primary)',
          margin: 0,
          textAlign: 'center',
          lineHeight: 1.2,
        }}
      >
        Leandro De Los Santos Aboy
      </p>

      {/* Descripción */}
      <p
        className="hero__desc"
        style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: 'var(--font-ui)',
          fontSize: 'var(--type-body)',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.72)',
          margin: 0,
          maxWidth: '44ch',
          textAlign: 'center',
          lineHeight: 1.6,
        }}
      >
        Construyo experiencias digitales donde la precisión técnica
        y la dirección de arte convergen. Buenos Aires.
      </p>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 4vh, 3rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 1,
        }}
      >
        <span
          style={{
            display: 'block',
            width: 1,
            height: 36,
            backgroundColor: 'var(--color-text-muted)',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--type-mono)',
            color: 'var(--color-text-muted)',
            letterSpacing: 'var(--ls-mono)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}

// Hero.jsx — SRS §4.2 — Hero Section
// Layout: texto izquierda (50%) + canvas derecha (50%)
// Tagline: "Ingeniería como Arte" (Figma)
// HeroCanvas: añadido en FASE 4 via React.lazy()
// buenas-practicas §3: useGSAP, split-type con revert en onComplete

import { useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Button } from '@mui/material';
import { splitCharsWords } from '../../utils/splitTextHelpers';
import { useLoader } from '../../context/LoaderContext';
import { useParallax } from '../../hooks/useParallax';

// HeroCanvas — lazy loaded. Solo se descarga el chunk en desktop (≥ 768px).
// Mobile: no se instancia el lazy, el chunk Three.js nunca descarga.
const isMobile = window.matchMedia('(max-width: 767px)').matches;
const HeroCanvas = !isMobile
  ? lazy(() => import('../three/HeroCanvas'))
  : null;

export function Hero() {
  const { isLoaded } = useLoader();
  const sectionRef = useRef(null);
  const taglineRef = useRef(null);
  const textColRef = useRef(null);
  const canvasColRef = useRef(null);

  // ── Parallax en scroll — desactivado en mobile vía hook ──────
  useParallax(textColRef, { speed: 0.12, triggerRef: sectionRef });
  useParallax(canvasColRef, { speed: 0.06, triggerRef: sectionRef });

  // ── Animación de entrada — trigger: loader completo ──────────
  useGSAP(
    () => {
      if (!isLoaded || !taglineRef.current) return;

      const tl = gsap.timeline({ delay: 0.15 });

      // Label: fade + y
      tl.from('.hero__label', {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: 'power2.out',
      });

      // Tagline: chars desde abajo (split-type)
      const split = splitCharsWords(taglineRef.current);
      tl.from(
        split.chars,
        {
          opacity: 0,
          yPercent: 110,
          duration: 0.65,
          ease: 'power3.out',
          stagger: 0.025,
          onComplete: () => split.revert(),
        },
        '-=0.25'
      );

      // Nombre + descripción + CTA
      tl.from(
        '.hero__sub, .hero__desc, .hero__cta',
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.12,
        },
        '-=0.3'
      );

      // Canvas col: fade in más lento
      tl.from(
        canvasColRef.current,
        {
          opacity: 0,
          duration: 1.0,
          ease: 'power1.out',
        },
        '-=0.8'
      );
    },
    { scope: sectionRef, dependencies: [isLoaded] }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Hero — Ingeniería como Arte"
      className="hero__grid"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        padding: '0 clamp(24px, 6vw, 80px)',
        paddingTop: 'clamp(100px, 12vh, 140px)',
        overflow: 'hidden',
      }}
    >
      {/* ── Columna izquierda: texto ─────────────────────────── */}
      <div
        ref={textColRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '2rem',
          paddingRight: 'clamp(2rem, 4vw, 5rem)',
          willChange: 'transform',
        }}
      >
        {/* Label */}
        <span
          className="hero__label"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--type-mono)',
            fontWeight: 500,
            color: 'var(--color-text-secondary)',
            letterSpacing: 'var(--ls-mono)',
            textTransform: 'uppercase',
          }}
        >
          Software Developer &amp; Project Manager
        </span>

        {/* Tagline — texto principal */}
        <h1
          ref={taglineRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--type-display)',
            fontWeight: 900,
            color: 'var(--color-text-primary)',
            lineHeight: 1.0,
            margin: 0,
            overflow: 'hidden',
            // text-wrap: balance solo en headings cortos
            textWrap: 'balance',
          }}
        >
          Ingeniería como Arte
        </h1>

        {/* Nombre */}
        <p
          className="hero__sub"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--type-project)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'var(--color-text-secondary)',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Leandro De Los Santos Aboy
        </p>

        {/* Descripción breve */}
        <p
          className="hero__desc"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'var(--type-body)',
            fontWeight: 300,
            color: 'var(--color-text-secondary)',
            margin: 0,
            maxWidth: '38ch',
            lineHeight: 1.6,
          }}
        >
          Construyo experiencias digitales donde la precisión técnica
          y la dirección de arte convergen. Buenos Aires.
        </p>

        {/* CTA */}
        <div className="hero__cta" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Button
            component={Link}
            to="/work"
            variant="contained"
            disableElevation
            sx={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--type-mono)',
              letterSpacing: 'var(--ls-mono)',
              textTransform: 'uppercase',
              px: 3,
              py: 1.5,
              border: 'none',
              '&:focus-visible': {
                outline: '2px solid var(--color-accent-hot)',
                outlineOffset: '2px',
              },
            }}
          >
            Ver Proyectos
          </Button>

          <a
            href="#main-content"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--type-mono)',
              color: 'var(--color-text-secondary)',
              letterSpacing: 'var(--ls-mono)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
          >
            Contacto ↓
          </a>
        </div>
      </div>

      {/* ── Columna derecha: canvas 3D ───────────────────────── */}
      <div
        ref={canvasColRef}
        aria-hidden="true"
        className="hero__canvas-col"
        style={{
          height: '100%',
          minHeight: 'clamp(400px, 60vh, 700px)',
          position: 'relative',
          willChange: 'transform',
        }}
      >
        {HeroCanvas ? (
          <Suspense fallback={<HeroCanvasPlaceholder />}>
            <HeroCanvas />
          </Suspense>
        ) : (
          <HeroCanvasPlaceholder />
        )}
      </div>

      {/* ── Línea de scroll indicator ────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 4vh, 3rem)',
          left: 'clamp(24px, 6vw, 80px)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <span
          style={{
            display: 'block',
            width: 40,
            height: 1,
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

// Placeholder hasta que FASE 4 provea HeroCanvas real
function HeroCanvasPlaceholder() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--color-bg-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeft: '1px solid var(--color-border)',
      }}
    />
  );
}

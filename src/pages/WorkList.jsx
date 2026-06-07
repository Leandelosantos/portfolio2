// WorkList.jsx — SRS §4.3 — Listado completo de proyectos (/work)
// Lista estilo Lebedev + filtro por categoría con GSAP Flip
// Hover: imagen preview flotante siguiendo cursor via quickTo
// buenas-practicas §3: useGSAP, Flip en useLayoutEffect post-render

import { useRef, useState, useLayoutEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ProjectRow } from '../components/ui/ProjectRow';
import { projects, CATEGORIES, filterProjects } from '../data/projects';

const isDesktop = window.matchMedia('(min-width: 768px)').matches;

export default function WorkList() {
  const sectionRef = useRef(null);
  const previewRef = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);
  const flipStateRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeThumb, setActiveThumb] = useState(null);

  const filtered = filterProjects(activeCategory);

  // Setup: preview quickTo + reveal inicial de filas
  useGSAP(
    () => {
      let cleanup = () => {};

      if (isDesktop && previewRef.current) {
        gsap.set(previewRef.current, { x: -9999, y: -9999 });

        xTo.current = gsap.quickTo(previewRef.current, 'x', {
          duration: 0.5,
          ease: 'power3.out',
        });
        yTo.current = gsap.quickTo(previewRef.current, 'y', {
          duration: 0.5,
          ease: 'power3.out',
        });

        const onMove = (e) => {
          xTo.current(e.clientX - 140);
          yTo.current(e.clientY - 90);
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        cleanup = () => window.removeEventListener('mousemove', onMove);
      }

      // Reveal inicial: stagger suave en carga de página
      gsap.from('.project-row', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.05,
        delay: 0.1,
      });
      gsap.from('.project-row__line', {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.05,
        delay: 0.1,
      });

      return cleanup;
    },
    { scope: sectionRef }
  );

  // Flip: ejecutar DESPUÉS del re-render por cambio de categoría
  useLayoutEffect(() => {
    if (!flipStateRef.current) return;

    Flip.from(flipStateRef.current, {
      duration: 0.5,
      ease: 'power1.inOut',
      stagger: 0.04,
      absolute: true,
      onEnter: (els) =>
        gsap.fromTo(els, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35 }),
      onLeave: (els) =>
        gsap.to(els, { opacity: 0, y: -10, duration: 0.2 }),
    });

    flipStateRef.current = null;
  }, [activeCategory]);

  const handleFilter = (category) => {
    if (category === activeCategory) return;
    // Capturar estado ANTES del re-render
    flipStateRef.current = Flip.getState('.project-row');
    setActiveCategory(category);
  };

  const handleMouseEnter = (project) => {
    if (!isDesktop) return;
    setActiveThumb(project.thumbnail);
    // opacity 1 solo en img onLoad — evita caja visible cuando imagen no carga
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;
    gsap.to(previewRef.current, { opacity: 0, scale: 0.95, duration: 0.2 });
    setActiveThumb(null);
  };

  return (
    <main
      ref={sectionRef}
      id="main-content"
      style={{
        padding: 'clamp(100px, 12vh, 140px) clamp(24px, 6vw, 80px) clamp(4rem, 8vh, 8rem)',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Preview flotante */}
      <div
        ref={previewRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 280,
          height: 180,
          pointerEvents: 'none',
          zIndex: 50,
          opacity: 0,
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-bg-elevated)',
        }}
      >
        {activeThumb && (
          <img
            src={activeThumb}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onLoad={() => {
              gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' });
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
      </div>

      {/* Header + filtros */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 'clamp(2rem, 5vh, 4rem)',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--type-headline)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Proyectos
        </h1>

        <nav aria-label="Filtrar proyectos" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                aria-pressed={isActive}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--type-mono)',
                  letterSpacing: 'var(--ls-mono)',
                  textTransform: 'uppercase',
                  padding: '6px 14px',
                  border: '1px solid',
                  borderColor: isActive
                    ? 'var(--color-accent-hot)'
                    : 'var(--color-border)',
                  color: isActive
                    ? 'var(--color-accent-hot)'
                    : 'var(--color-text-muted)',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Lista */}
      <div>
        {filtered.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={i}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
        <div style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />
      </div>
    </main>
  );
}

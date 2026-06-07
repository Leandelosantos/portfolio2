// SelectedWork.jsx — SRS §4.3 — Proyectos seleccionados en Home
// Lista estilo Lebedev: top-4 proyectos + hover preview flotante siguiendo cursor
// GSAP: row reveal staggered (ScrollTrigger) + quickTo para preview
// buenas-practicas §3: useGSAP, ScrollTrigger once, sin setState en mousemove

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ProjectRow } from '../ui/ProjectRow';
import { TransitionLink } from '../ui/TransitionLink';
import { projects } from '../../data/projects';

// Preview solo en desktop — touch no dispara mousemove
const isDesktop = window.matchMedia('(min-width: 768px)').matches;

const FEATURED = projects.slice(0, 4);

export function SelectedWork() {
  const sectionRef = useRef(null);
  const previewRef = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);
  const [activeThumb, setActiveThumb] = useState(null);

  useGSAP(
    () => {
      let cleanup = () => {};

      if (isDesktop && previewRef.current) {
        // Posicionar preview fuera de pantalla hasta hover
        gsap.set(previewRef.current, { x: -9999, y: -9999 });

        // quickTo — actualiza transform sin crear nuevo tween por frame
        xTo.current = gsap.quickTo(previewRef.current, 'x', {
          duration: 0.5,
          ease: 'power3.out',
        });
        yTo.current = gsap.quickTo(previewRef.current, 'y', {
          duration: 0.5,
          ease: 'power3.out',
        });

        const onMove = (e) => {
          // Centrar preview en el cursor (280×180 → offset -140, -90)
          xTo.current(e.clientX - 140);
          yTo.current(e.clientY - 90);
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        cleanup = () => window.removeEventListener('mousemove', onMove);
      }

      // Reveal header
      gsap.from('.selectedwork__header', {
        opacity: 0,
        y: 32,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Reveal de cada fila: línea scaleX + index + title + tags
      gsap.utils.toArray('.project-row').forEach((row) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: 'top 87%', once: true },
        });

        tl.from(
          row.querySelector('.project-row__line'),
          { scaleX: 0, transformOrigin: 'left', duration: 0.6, ease: 'power2.out' },
          0
        )
          .from(row.querySelector('.project-row__index'), {
            opacity: 0,
            x: -20,
            duration: 0.4,
          })
          .from(
            row.querySelector('.project-row__title'),
            { opacity: 0, y: 24, duration: 0.5, ease: 'power3.out' },
            '-=0.2'
          )
          .from(
            row.querySelector('.project-row__tags'),
            { opacity: 0, duration: 0.4 },
            '-=0.3'
          );
      });

      return cleanup;
    },
    { scope: sectionRef }
  );

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
    <section
      ref={sectionRef}
      aria-label="Proyectos Seleccionados"
      style={{
        padding: 'clamp(80px, 12vh, 140px) clamp(24px, 6vw, 80px)',
        position: 'relative',
      }}
    >
      {/* Preview flotante — fixed, sigue cursor via quickTo */}
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

      {/* Encabezado */}
      <div
        className="selectedwork__header"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 'clamp(2rem, 5vh, 4rem)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <h2
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
        </h2>
        <TransitionLink
          to="/work"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--type-mono)',
            color: 'var(--color-text-secondary)',
            textDecoration: 'none',
            letterSpacing: 'var(--ls-mono)',
            textTransform: 'uppercase',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = 'var(--color-text-primary)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = 'var(--color-text-secondary)')
          }
        >
          Ver todos →
        </TransitionLink>
      </div>

      {/* Filas de proyectos */}
      <div>
        {FEATURED.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={i}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
        {/* Línea de cierre */}
        <div style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />
      </div>
    </section>
  );
}

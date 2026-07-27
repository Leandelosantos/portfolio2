// ProjectCard.jsx — visualización de proyectos sin salir del portfolio
// Tilt 3D por cursor (useCardTilt) + glow con accentColor de marca del proyecto.
// Click/tap → onExpand(project.id), orquestado por ProjectShowcase (Flip).
// buenas-practicas: solo presentación — sin lógica GSAP propia más allá del tilt.

import { useState } from 'react';
import { useCardTilt } from '../../hooks/useCardTilt';
import { usePostHog } from '@posthog/react';

export function ProjectCard({ project, onExpand, dimmed }) {
  // Tilt aplicado a un wrapper interno — Flip anima el <article> externo (layout),
  // si comparten el mismo nodo, GSAP tira warning "not eligible for reset" al chocar
  // el transform de Flip con los componentes rotateX/rotateY/scale del quickTo.
  const tiltRef = useCardTilt();
  const [isHovering, setIsHovering] = useState(false);
  const posthog = usePostHog();

  return (
    <article
      className="project-card"
      data-project-id={project.id}
      onClick={() => {
        posthog?.capture('project_card_opened', { project_id: project.id, project_title: project.title });
        onExpand(project.id);
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      role="button"
      tabIndex={0}
      aria-label={`Ver caso de estudio: ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onExpand(project.id);
      }}
      style={{
        position: 'relative',
        cursor: 'pointer',
        aspectRatio: '4 / 3',
        border: `1px solid ${isHovering ? project.accentColor : 'var(--color-border)'}`,
        backgroundColor: 'var(--color-bg-elevated)',
        backgroundImage: `radial-gradient(ellipse 120% 80% at 50% 100%, ${project.accentColor}1A 0%, transparent 70%)`,
        boxShadow: isHovering ? `0 0 32px -8px ${project.accentColor}66` : 'none',
        opacity: dimmed ? 0.3 : 1,
        pointerEvents: dimmed ? 'none' : 'auto',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
        overflow: 'hidden',
      }}
    >
      <div ref={tiltRef} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Thumbnail centrado */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(16px, 3vw, 32px)',
            minHeight: 0,
          }}
        >
          <img
            src={project.thumbnail}
            alt=""
            loading="lazy"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Footer — título + año + tag de marca */}
        <div
          style={{
            padding: 'clamp(14px, 2vw, 20px)',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(15px, 1.6vw, 20px)',
              color: 'var(--color-text-primary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {project.title}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--type-mono)',
              letterSpacing: 'var(--ls-mono)',
              color: 'var(--color-text-muted)',
              flexShrink: 0,
            }}
          >
            {project.year ?? '—'}
          </span>
        </div>
      </div>
    </article>
  );
}

// ProjectBentoCard.jsx — card del bento de proyectos (Home + /work)
// Link real a /work/:slug — accesible por construcción (Tab/Enter nativos, sin tabIndex manual)
// Fondo: imagen real con fallback a patrón generado en accentColor; video en hover si existe
// Descripción (project.solution) revelada por CSS :hover/:focus-within — ver globals.css

import { useRef, useState } from 'react';
import { TransitionLink } from './TransitionLink';
import { usePostHog } from '@posthog/react';

const TITLE_SIZE = {
  big: 'clamp(22px, 3vw, 36px)',
  tall: 'clamp(18px, 2.2vw, 26px)',
  small: 'clamp(16px, 1.8vw, 20px)',
};

export function ProjectBentoCard({ project, size = 'small', onHoverStart, onHoverEnd }) {
  const videoRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const posthog = usePostHog();

  const handleEnter = () => {
    if (project.video && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    onHoverStart?.();
  };

  const handleLeave = () => {
    if (project.video && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    onHoverEnd?.();
  };

  return (
    <TransitionLink
      to={`/work/${project.id}`}
      className="bento-card"
      data-project-id={project.id}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      onClick={() => posthog?.capture('project_bento_clicked', { project_id: project.id, project_title: project.title })}
      aria-label={`Ver caso de estudio: ${project.title}`}
      style={{
        position: 'relative',
        display: 'block',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        textDecoration: 'none',
        backgroundColor: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* Fondo generado — patrón técnico en el accentColor del proyecto, tapado si hay foto/video */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(135deg, ${project.accentColor}14 0px, ${project.accentColor}14 1px, transparent 1px, transparent 14px), radial-gradient(ellipse 120% 90% at 50% 100%, ${project.accentColor}26 0%, transparent 65%)`,
        }}
      />

      {/* Imagen real */}
      <img
        className="bento-card__media-img"
        src={project.thumbnail}
        alt=""
        loading="lazy"
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgLoaded(false)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: imgLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Video — solo si el proyecto tiene uno, crossfade en hover/focus vía CSS */}
      {project.video && (
        <video
          ref={videoRef}
          className="bento-card__media-video"
          src={project.video}
          muted
          loop
          playsInline
          preload="none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}

      {/* Gradiente de legibilidad */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.35) 50%, transparent 100%)',
        }}
      />

      {/* Contenido */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: 'clamp(18px, 2.5vw, 32px)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: 'var(--ls-mono)',
            textTransform: 'uppercase',
            color: project.accentColor,
          }}
        >
          {project.category[0]}
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: TITLE_SIZE[size],
            color: 'var(--color-text-primary)',
            margin: '0.3rem 0 0',
            lineHeight: 1.1,
          }}
        >
          {project.title}
        </h3>
        <p
          className="bento-card__desc"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'var(--type-body)',
            color: 'var(--color-text-secondary)',
            marginTop: '0.5rem',
            maxWidth: '42ch',
            lineHeight: 1.5,
          }}
        >
          {project.solution}
        </p>
      </div>
    </TransitionLink>
  );
}

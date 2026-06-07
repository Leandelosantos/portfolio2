// ProjectRow.jsx — SRS §4.3 — Fila de proyecto estilo Lebedev
// Layout: [index] [title ————] [year] [tags]
// Animaciones gestionadas por el padre (SelectedWork / WorkList)
// buenas-practicas: solo presentación — sin lógica GSAP aquí

import { TransitionLink } from './TransitionLink';

export function ProjectRow({ project, index, onMouseEnter, onMouseLeave }) {
  const indexStr = String(index + 1).padStart(2, '0');

  return (
    <article className="project-row" style={{ position: 'relative' }}>
      {/* Línea superior — animada desde el padre con scaleX */}
      <div
        className="project-row__line"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'var(--color-border)',
          transformOrigin: 'left',
        }}
      />

      <TransitionLink
        to={`/work/${project.id}`}
        className="project-row__link"
        style={{
          display: 'grid',
          gridTemplateColumns: '3.5rem 1fr auto auto',
          alignItems: 'center',
          gap: 'clamp(1rem, 2vw, 2.5rem)',
          padding: 'clamp(1.25rem, 2.5vh, 2rem) 0',
          textDecoration: 'none',
          color: 'inherit',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--color-accent)';
          onMouseEnter?.(project);
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'inherit';
          onMouseLeave?.();
        }}
      >
        {/* Índice */}
        <span
          className="project-row__index"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--type-mono)',
            color: 'var(--color-text-muted)',
            letterSpacing: 'var(--ls-mono)',
            flexShrink: 0,
          }}
        >
          {indexStr}
        </span>

        {/* Título */}
        <span
          className="project-row__title"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(18px, 2.2vw, 34px)',
            fontWeight: 400,
            color: 'var(--color-text-primary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {project.title}
        </span>

        {/* Año + Tags — ocultos en mobile via .project-row__meta CSS */}
        <span
          className="project-row__meta"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--type-mono)',
            color: 'var(--color-text-muted)',
            letterSpacing: 'var(--ls-mono)',
            flexShrink: 0,
          }}
        >
          {project.year}
        </span>

        <div
          className="project-row__tags project-row__meta"
          style={{
            display: 'flex',
            gap: '0.4rem',
            flexShrink: 0,
            flexWrap: 'nowrap',
          }}
        >
          {project.category.slice(0, 2).map((cat) => (
            <span
              key={cat}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-accent-hot)',
                letterSpacing: 'var(--ls-mono)',
                textTransform: 'uppercase',
                border: '1px solid var(--color-accent-hot)',
                padding: '2px 8px',
                whiteSpace: 'nowrap',
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </TransitionLink>
    </article>
  );
}

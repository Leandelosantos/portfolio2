// ProjectCaseSummary.jsx — panel de case study expandido in-place (ProjectShowcase)
// Estructura: contexto de negocio → problema → solución → resultados → stack
// buenas-practicas: solo presentación — el Flip/expand lo orquesta el padre

import { TransitionLink } from './TransitionLink';

// Label de sección — itálica serif (mismo registro que --type-project), no el
// eyebrow mono-uppercase-tracked repetido por sección (anti-pattern de marca).
const Label = ({ children, color }) => (
  <span
    style={{
      display: 'block',
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: 'clamp(18px, 2vw, 24px)',
      color,
      marginBottom: '0.4rem',
    }}
  >
    {children}
  </span>
);

export function ProjectCaseSummary({ project, onClose }) {
  return (
    <div
      className="project-case-summary"
      style={{
        position: 'relative',
        padding: 'clamp(24px, 4vw, 48px)',
        backgroundColor: 'var(--color-bg-elevated)',
        border: `1px solid ${project.accentColor}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(1.25rem, 2.5vw, 2rem)',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {/* Cerrar — solo en uso modal/expand-in-place (ProjectShowcase, usado por /ia). */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar case study"
          style={{
            position: 'absolute',
            top: 'clamp(16px, 2vw, 24px)',
            right: 'clamp(16px, 2vw, 24px)',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--color-border)',
            backgroundColor: 'transparent',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: '18px',
            lineHeight: 1,
          }}
        >
          ×
        </button>
      )}

      {/* Header */}
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            color: 'var(--color-text-primary)',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--type-mono)',
            letterSpacing: 'var(--ls-mono)',
            color: 'var(--color-text-secondary)',
            marginTop: '0.5rem',
          }}
        >
          {project.client} · {project.role} {project.year ? `· ${project.year}` : ''}
        </p>
      </div>

      {/* Contexto de negocio */}
      {project.businessContext && (
        <div>
          <Label color={project.accentColor}>Contexto</Label>
          <p style={{ color: 'var(--color-text-primary)', lineHeight: 1.6, margin: 0 }}>
            {project.businessContext}
          </p>
        </div>
      )}

      {/* Problema */}
      <div>
        <Label color={project.accentColor}>Problema</Label>
        <p style={{ color: 'var(--color-text-primary)', lineHeight: 1.6, margin: 0 }}>
          {project.problem}
        </p>
      </div>

      {/* Solución */}
      <div>
        <Label color={project.accentColor}>Solución</Label>
        <p style={{ color: 'var(--color-text-primary)', lineHeight: 1.6, margin: 0 }}>
          {project.solution}
        </p>
      </div>

      {/* Resultados */}
      {project.results?.length > 0 && (
        <div>
          <Label color={project.accentColor}>Resultados</Label>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--color-text-primary)' }}>
            {project.results.map((r) => (
              <li key={r} style={{ marginBottom: '0.35rem', lineHeight: 1.5 }}>
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Stack */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        {project.techStack.map((tech) => (
          <span
            key={tech}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: project.accentColor,
              letterSpacing: 'var(--ls-mono)',
              textTransform: 'uppercase',
              border: `1px solid ${project.accentColor}`,
              padding: '2px 8px',
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: 'auto', flexWrap: 'wrap' }}>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--type-mono)',
              letterSpacing: 'var(--ls-mono)',
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            Visitar sitio →
          </a>
        )}
        <TransitionLink
          to={`/work/${project.id}`}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--type-mono)',
            letterSpacing: 'var(--ls-mono)',
            color: 'var(--color-text-secondary)',
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          Ver caso completo →
        </TransitionLink>
      </div>
    </div>
  );
}

// CaseStudy.jsx — SRS §4.4 — Case Study individual (/work/:slug)
// Long-form: contexto de negocio → problema → solución → resultados → stack → galería

import { useParams, Navigate } from 'react-router-dom';
import { getProjectById } from '../data/projects';
import { TransitionLink } from '../components/ui/TransitionLink';
import { usePostHog } from '@posthog/react';

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProjectById(slug);
  const posthog = usePostHog();

  if (!project) return <Navigate to="/work" replace />;

  return (
    <main
      id="main-content"
      style={{
        minHeight: '100vh',
        padding: 'clamp(100px, 12vh, 140px) clamp(24px, 6vw, 80px) 6rem',
        maxWidth: '900px',
        marginInline: 'auto',
      }}
    >
      <TransitionLink
        to="/work"
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--type-mono)',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--color-text-secondary)',
          textDecoration: 'none',
          textTransform: 'uppercase',
          marginBottom: '2rem',
        }}
      >
        ← Volver a proyectos
      </TransitionLink>

      {/* Hero */}
      <header style={{ marginBottom: 'clamp(2rem, 5vh, 3.5rem)' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 64px)',
            color: 'var(--color-text-primary)',
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          {project.title}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--type-mono)',
            letterSpacing: 'var(--ls-mono)',
            color: project.accentColor,
            marginTop: '0.75rem',
            textTransform: 'uppercase',
          }}
        >
          {project.client} · {project.role} {project.year ? `· ${project.year}` : ''}
        </p>
      </header>

      {/* Thumbnail principal */}
      <div
        style={{
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-bg-elevated)',
          padding: 'clamp(16px, 3vw, 32px)',
          marginBottom: 'clamp(2.5rem, 6vh, 4rem)',
        }}
      >
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', display: 'block' }}
          />
        ) : (
          <img
            src={project.thumbnail}
            alt={`Captura de ${project.title}`}
            style={{ width: '100%', display: 'block' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
      </div>

      {/* Secciones de case study */}
      <CaseSection label="Contexto" accent={project.accentColor}>
        {project.businessContext}
      </CaseSection>
      <CaseSection label="Problema" accent={project.accentColor}>
        {project.problem}
      </CaseSection>
      <CaseSection label="Solución" accent={project.accentColor}>
        {project.solution}
      </CaseSection>

      {project.results?.length > 0 && (
        <section style={{ marginBottom: 'clamp(2rem, 5vh, 3rem)' }}>
          <SectionLabel accent={project.accentColor}>Resultados</SectionLabel>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--color-text-primary)' }}>
            {project.results.map((r) => (
              <li key={r} style={{ marginBottom: '0.5rem', lineHeight: 1.6 }}>
                {r}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Stack + CTA */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--color-border)',
        }}
      >
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

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog?.capture('case_study_live_url_clicked', { project_id: project.id, project_title: project.title })}
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
      </div>

      {/* Galería */}
      {project.images?.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            marginTop: 'clamp(2.5rem, 6vh, 4rem)',
          }}
        >
          {project.images.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              style={{ width: '100%', display: 'block', border: '1px solid var(--color-border)' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
}

// Itálica serif (mismo registro que --type-project) — no el eyebrow
// mono-uppercase-tracked repetido por sección (anti-pattern de marca).
function SectionLabel({ children, accent }) {
  return (
    <span
      style={{
        display: 'block',
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 'clamp(20px, 2.2vw, 28px)',
        color: accent,
        marginBottom: '0.5rem',
      }}
    >
      {children}
    </span>
  );
}

function CaseSection({ label, accent, children }) {
  if (!children) return null;
  return (
    <section style={{ marginBottom: 'clamp(2rem, 5vh, 3rem)' }}>
      <SectionLabel accent={accent}>{label}</SectionLabel>
      <p style={{ color: 'var(--color-text-primary)', lineHeight: 1.7, margin: 0, fontSize: '1.05rem' }}>
        {children}
      </p>
    </section>
  );
}

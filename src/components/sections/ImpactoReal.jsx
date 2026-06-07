// ImpactoReal.jsx — SRS §4 — Bento "Impacto Real" (Figma Home)
// 4 servicios: Ingeniería Web, Sistemas de Diseño, Experiencias 3D, Optimización IA
// GSAP: stagger reveal al entrar en viewport
// buenas-practicas §3: useGSAP, solo transform + opacity

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const SERVICES = [
  {
    id: 'ingenieria-web',
    number: '01',
    title: 'Ingeniería Web',
    description:
      'Aplicaciones React con performance real. Code splitting, animaciones GSAP y arquitectura escalable que resiste el tiempo.',
    tags: ['React', 'GSAP', 'Vite'],
  },
  {
    id: 'sistemas-diseno',
    number: '02',
    title: 'Sistemas de Diseño',
    description:
      'Tokens, componentes y documentación. Del Figma al código sin fricción ni deuda técnica acumulada.',
    tags: ['Figma', 'CSS Variables', 'MUI'],
  },
  {
    id: 'experiencias-3d',
    number: '03',
    title: 'Experiencias 3D',
    description:
      'WebGL con Three.js y React Three Fiber. Escenas interactivas que convierten visitantes en clientes.',
    tags: ['Three.js', 'R3F', 'WebGL'],
  },
  {
    id: 'optimizacion-ia',
    number: '04',
    title: 'Optimización IA',
    description:
      'Integración de LLMs en flujos de trabajo. Búsqueda semántica, revisión autónoma de código y automatización de decisiones.',
    tags: ['Claude API', 'Python', 'CI/CD'],
  },
];

export function ImpactoReal() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from('.impacto__headline', {
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

      gsap.from('.impacto__tile', {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.impacto__grid',
          start: 'top 78%',
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Servicios — Impacto Real"
      style={{
        padding: 'clamp(80px, 12vh, 140px) clamp(24px, 6vw, 80px)',
        backgroundColor: 'var(--color-bg-subtle)',
      }}
    >
      {/* Encabezado */}
      <div
        className="impacto__headline"
        style={{
          marginBottom: 'clamp(3rem, 6vh, 5rem)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
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
          Impacto Real
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'var(--type-body)',
            fontWeight: 300,
            color: 'var(--color-text-secondary)',
            margin: 0,
            maxWidth: '36ch',
            lineHeight: 1.6,
            textAlign: 'right',
          }}
        >
          Disciplinas que convergen en resultados medibles para cada proyecto.
        </p>
      </div>

      {/* Bento grid — 1px gap crea efecto de grilla editorial */}
      <div
        className="impacto__grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1px',
          backgroundColor: 'var(--color-border)',
        }}
      >
        {SERVICES.map((service) => (
          <ServiceTile key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}

function ServiceTile({ service }) {
  return (
    <div
      className="impacto__tile"
      style={{
        backgroundColor: 'var(--color-bg-subtle)',
        padding: 'clamp(2rem, 4vw, 3rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        transition: 'background-color 0.3s ease',
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = 'var(--color-bg-elevated)')
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = 'var(--color-bg-subtle)')
      }
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--type-mono)',
          color: 'var(--color-accent-hot)',
          letterSpacing: 'var(--ls-mono)',
        }}
      >
        {service.number}
      </span>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--type-project)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {service.title}
      </h3>

      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 'var(--type-body)',
          fontWeight: 300,
          color: 'var(--color-text-secondary)',
          margin: 0,
          lineHeight: 1.7,
          flex: 1,
        }}
      >
        {service.description}
      </p>

      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        {service.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              letterSpacing: 'var(--ls-mono)',
              textTransform: 'uppercase',
              border: '1px solid var(--color-border)',
              padding: '2px 8px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

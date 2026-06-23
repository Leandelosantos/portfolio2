// ProjectShowcase.jsx — grid de ProjectCard + expansión in-place del case study
// Usado por SelectedWork (Home, top-4) y WorkList (/work, catálogo filtrado).
// Flip: mismo patrón que el filtro de categorías (captura estado → setState → Flip.from)
// pero el "estado que cambia" es qué card está expandida (SRS §4.3 ampliado a case study).

import { Fragment, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';
import { ProjectCard } from '../ui/ProjectCard';
import { ProjectCaseSummary } from '../ui/ProjectCaseSummary';

const isDesktop = window.matchMedia('(min-width: 768px)').matches;

export function ProjectShowcase({ projects }) {
  const gridRef = useRef(null);
  const flipStateRef = useRef(null);
  const [activeId, setActiveId] = useState(null);

  // Reveal inicial de las cards al entrar en viewport — solo al montar.
  // filterProjects() devuelve un array nuevo en cada render: si este efecto
  // dependiera de `projects`, se re-disparía en cada cambio de categoría,
  // matando/recreando ScrollTriggers a mitad de vuelo (cards quedaban en
  // opacity:0 para siempre). El fade-in de cards que entran al filtro ya lo
  // maneja el Flip onEnter/onLeave del padre (WorkList).
  useGSAP(
    () => {
      gsap.from('.project-card', {
        opacity: 0,
        y: 24,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: gridRef.current, start: 'top 90%', once: true },
      });
    },
    { scope: gridRef }
  );

  // Flip al expandir/colapsar una card
  useLayoutEffect(() => {
    if (!flipStateRef.current) return;

    Flip.from(flipStateRef.current, {
      duration: 0.5,
      ease: 'power2.inOut',
      absolute: true,
    });

    if (activeId) {
      gsap.fromTo(
        '.project-case-summary',
        { opacity: 0, x: 16 },
        { opacity: 1, x: 0, duration: 0.4, delay: 0.2, ease: 'power2.out' }
      );
    }

    flipStateRef.current = null;
  }, [activeId]);

  const selectProject = (id) => {
    flipStateRef.current = Flip.getState('.project-card');
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <div
      ref={gridRef}
      className="project-showcase"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 'clamp(1rem, 2vw, 1.5rem)',
      }}
    >
      {projects.map((project) => {
        const isActive = activeId === project.id;

        // El wrapper de ProjectCard NUNCA se desmonta al expandir — solo cambia su
        // gridColumn/maxWidth. Si se reemplazara por un árbol JSX distinto, React
        // recrearía el <article> y el tween de tilt de GSAP quedaría apuntando a un
        // nodo ya removido del DOM (root cause del warning "not eligible for reset").
        return (
          <Fragment key={project.id}>
            <div
              style={{
                gridColumn: isActive ? '1 / -1' : 'auto',
                maxWidth: isActive && isDesktop ? 340 : undefined,
              }}
            >
              <ProjectCard
                project={project}
                onExpand={selectProject}
                dimmed={Boolean(activeId) && !isActive}
              />
            </div>
            {isActive && (
              <div style={{ gridColumn: '1 / -1' }}>
                <ProjectCaseSummary project={project} onClose={() => selectProject(project.id)} />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

// ProjectGridHome.jsx — grid de proyectos en Home, 2 columnas pareja
// Referencia: madeinuxstudio.com/works (grabación de pantalla compartida por el usuario)
// Reveal lateral por card al hacer scroll: columna izquierda entra desde la izquierda,
// columna derecha desde la derecha. SOLO usado en Home — /work sigue con ProjectBento.jsx.

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ProjectGridCard } from "../ui/ProjectGridCard";
import { TransitionLink } from "../ui/TransitionLink";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const isDesktop = window.matchMedia("(min-width: 768px)").matches;

export function ProjectGridHome({ projects, viewAllHref }) {
  const gridRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReduced) return;
      gsap.utils.toArray(".project-grid-cell").forEach((cell, idx) => {
        const fromLeft = !isDesktop || idx % 2 === 0;
        gsap.from(cell, {
          x: fromLeft ? -60 : 60,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: cell,
            start: "top 50%",
            end: "top 10%",
            scrub: true,
          },
        });
      });
    },
    { scope: gridRef, dependencies: [projects] },
  );

  return (
    <div ref={gridRef}>
      <div
        className="project-grid-home"
        style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "repeat(2, 1fr)" : "1fr",
          gap: "clamp(1.5rem, 3vw, 3rem) clamp(1.5rem, 3vw, 2.5rem)",
        }}
      >
        {projects.map((project) => (
          <div key={project.id} className="project-grid-cell">
            <ProjectGridCard project={project} />
          </div>
        ))}
      </div>

      {viewAllHref && (
        <div
          style={{ marginTop: "clamp(2.5rem, 5vh, 4rem)", textAlign: "center" }}
        >
          <TransitionLink
            to={viewAllHref}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--type-mono)",
              letterSpacing: "var(--ls-mono)",
              textTransform: "uppercase",
              color: "var(--color-text-primary)",
              textDecoration: "none",
              borderBottom: "1px solid var(--color-text-primary)",
              paddingBottom: "4px",
            }}
          >
            Ver todos los proyectos →
          </TransitionLink>
        </div>
      )}
    </div>
  );
}

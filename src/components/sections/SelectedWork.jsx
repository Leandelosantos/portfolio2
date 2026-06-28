// SelectedWork.jsx — SRS §4.3 — Proyectos seleccionados en Home
// Grid 2 columnas con reveal lateral (referencia: madeinuxstudio.com/works) — SOLO Home.
// /work sigue con el bento asimétrico de ProjectBento.jsx, sin cambios.
// buenas-practicas §3: useGSAP, ScrollTrigger once

import { useRef, lazy, Suspense } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ProjectGridHome } from "./ProjectGridHome";
import { projects } from "../../data/projects";

const FEATURED = projects.slice(0, 4);

// Lazy loaded — solo desktop descarga el chunk Three.js
const isMobile = window.matchMedia("(max-width: 767px)").matches;
const ParticlesCanvas = !isMobile
  ? lazy(() => import("../three/ParticlesCanvas"))
  : null;

export function SelectedWork() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".selectedwork__header", {
        opacity: 0,
        y: 32,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Proyectos Seleccionados"
      style={{
        padding: "clamp(80px, 12vh, 140px) clamp(14.4px, 3.6vw, 48px)",
        position: "relative",
      }}
    >
      {/* Fondo — partículas R3F, igual que el hero pero menos densas */}
      {ParticlesCanvas && (
        <Suspense fallback={null}>
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <ParticlesCanvas />
          </div>
        </Suspense>
      )}

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Encabezado — link "Ver todos" vive debajo del grid (ProjectGridHome) */}
        <div
          className="selectedwork__header"
          style={{
            marginBottom: "clamp(2rem, 5vh, 4rem)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--type-display)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Proyectos
          </h2>
        </div>

        <ProjectGridHome projects={FEATURED} viewAllHref="/work" />
      </div>
    </section>
  );
}

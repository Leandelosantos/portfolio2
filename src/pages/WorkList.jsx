// WorkList.jsx — SRS §4.3 — Listado completo de proyectos (/work)
// Bento grid (ProjectBento) — mismo componente que la sección de proyectos del Home
// buenas-practicas §3: Flip en useLayoutEffect post-render, capturado antes del setState

import { useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ProjectBento } from "../components/sections/ProjectBento";
import { CATEGORIES, filterProjects } from "../data/projects";

export default function WorkList() {
  const sectionRef = useRef(null);
  const flipStateRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = filterProjects(activeCategory);

  // Flip: ejecutar DESPUÉS del re-render por cambio de categoría
  useLayoutEffect(() => {
    if (!flipStateRef.current) return;

    Flip.from(flipStateRef.current, {
      duration: 0.5,
      ease: "power1.inOut",
      stagger: 0.04,
      absolute: true,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.35 },
        ),
      onLeave: (els) => gsap.to(els, { opacity: 0, y: -10, duration: 0.2 }),
    });

    flipStateRef.current = null;
  }, [activeCategory]);

  const handleFilter = (category) => {
    if (category === activeCategory) return;
    // Capturar estado ANTES del re-render
    flipStateRef.current = Flip.getState(".bento-cell");
    setActiveCategory(category);
  };

  return (
    <main
      ref={sectionRef}
      id="main-content"
      style={{
        padding:
          "clamp(100px, 12vh, 140px) clamp(24px, 6vw, 80px) clamp(4rem, 8vh, 8rem)",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Header + filtros */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "clamp(2rem, 5vh, 4rem)",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <h1
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
        </h1>

        <nav
          aria-label="Filtrar proyectos"
          style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                aria-pressed={isActive}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--type-mono)",
                  letterSpacing: "var(--ls-mono)",
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  border: "1px solid",
                  borderColor: isActive
                    ? "var(--color-accent-hot)"
                    : "var(--color-border)",
                  color: isActive
                    ? "var(--color-accent-hot)"
                    : "var(--color-text-muted)",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  transition: "border-color 0.2s ease, color 0.2s ease",
                }}
              >
                {cat}
              </button>
            );
          })}
        </nav>
      </div>

      <ProjectBento projects={filtered} />
    </main>
  );
}

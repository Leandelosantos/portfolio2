// ProjectGridCard.jsx — card del grid 2 columnas de Home (referencia: madeinuxstudio.com/works)
// Sin overlay de texto sobre la imagen — título/tags en texto plano debajo, igual que la referencia.
// Idle: imagen fija. Hover: solo zoom leve en la imagen (la card no crece, sin video — Home siempre estático).

import { useState } from "react";
import { TransitionLink } from "./TransitionLink";

export function ProjectGridCard({ project }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleEnter = (e) => {
    e.currentTarget.querySelector(".grid-card__media").style.transform =
      "scale(1.06)";
  };

  const handleLeave = (e) => {
    e.currentTarget.querySelector(".grid-card__media").style.transform =
      "scale(1)";
  };

  return (
    <TransitionLink
      to={`/work/${project.id}`}
      className="project-grid-card"
      data-project-id={project.id}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      aria-label={`Ver caso de estudio: ${project.title}`}
      style={{
        display: "block",
        textDecoration: "none",
      }}
    >
      <div
        className="grid-card__box"
        style={{
          position: "relative",
          aspectRatio: "40 / 33", // +10% altura vs 4/3 original — tamaño general de la card
          overflow: "hidden",
          backgroundColor: "var(--color-bg-elevated)",
          border: "1px solid var(--color-border)",
          borderRadius: "14px", // excepción puntual al borderRadius:0 del SRS, confirmada con el usuario
        }}
      >
        {/* Fondo generado — patrón técnico en el accentColor, tapado si hay foto/video */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(135deg, ${project.accentColor}14 0px, ${project.accentColor}14 1px, transparent 1px, transparent 14px), radial-gradient(ellipse 120% 90% at 50% 100%, ${project.accentColor}26 0%, transparent 65%)`,
          }}
        />

        <img
          className="grid-card__media"
          src={project.thumbnail}
          alt=""
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(false)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: imgLoaded ? 1 : 0,
            transition:
              "opacity 0.3s ease, transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      <div style={{ paddingTop: "clamp(0.825rem, 1.65vw, 1.375rem)" }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 2.4vw, 29px)",
            color: "var(--color-text-primary)",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--type-mono)",
            letterSpacing: "var(--ls-mono)",
            textTransform: "uppercase",
            color: "var(--color-text-secondary)",
            margin: "0.44rem 0 0",
          }}
        >
          {project.category.join(" · ")}
        </p>
      </div>
    </TransitionLink>
  );
}

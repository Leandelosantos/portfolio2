// IAPage.jsx — Página IA & Ecosistema
// Muestra expertise en prompt engineering, Claude Code, Gemini y uso de IA en producción
// GSAP: SplitType hero + stagger reveals ScrollTrigger
// 3D: HelmetCanvas lazy — GLB + Bloom + Float + mouse parallax
// buenas-practicas §3: useGSAP, solo transform + opacity, split.revert() en cleanup

import { useRef, lazy, Suspense } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { ProjectShowcase } from "../components/sections/ProjectShowcase";
import { projects } from "../data/projects";

// Lazy: Three.js chunk solo descarga cuando se visita /ia en desktop
const isMobile = window.innerWidth < 768;
const HelmetCanvas = lazy(() => import("../components/three/HelmetCanvas"));

const AI_PROJECTS = projects.filter((p) => p.category.includes("AI"));

const TOOLS = [
  { name: "Claude API", role: "Modelos de lenguaje y razonamiento" },
  { name: "Claude Code", role: "Pair programming autónomo en CI/CD" },
  { name: "Gemini", role: "Análisis multimodal y visión" },
  { name: "Vector DB", role: "Búsqueda semántica sobre documentación" },
];

// Prompt de ejemplo real — estructura de contexto para revisión autónoma de PRs
const TERMINAL_LINES = [
  "// Contexto inyectado antes de cada PR review:",
  "{",
  '  "role": "Senior code reviewer",',
  '  "stack": "React 18 + Vite 5, TypeScript strict",',
  '  "focus": [',
  '    "Re-renders innecesarios (memo, useMemo)",',
  '    "Violaciones OWASP Top 10",',
  '    "Props drilling mayor a 2 niveles"',
  "  ],",
  '  "output": "Archivo + línea + fix puntual",',
  '  "skip": ["Formateo", "Naming conventions"]',
  "}",
];

export default function IAPage() {
  const pageRef = useRef(null);

  useGSAP(
    () => {
      // ── Hero: SplitType char reveal ──────────────────────
      const split = new SplitType(".ia-hero__title", { types: "chars" });
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(split.chars, {
        opacity: 0,
        yPercent: 110,
        duration: 0.7,
        stagger: 0.025,
        ease: "power3.out",
      }).from(
        ".ia-hero__sub",
        { opacity: 0, y: 24, duration: 0.6, ease: "power2.out" },
        "-=0.35",
      );

      // ── Manifiesto: 2 bloques fade-up ───────────────────
      gsap.from(".ia-manifesto__left", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".ia-manifesto",
          start: "top 80%",
          once: true,
        },
      });
      gsap.from(".ia-manifesto__terminal", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
        scrollTrigger: {
          trigger: ".ia-manifesto",
          start: "top 80%",
          once: true,
        },
      });

      // ── Terminal lines: stagger reveal ───────────────────
      gsap.from(".ia-terminal__line", {
        opacity: 0,
        x: -12,
        duration: 0.35,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".ia-manifesto__terminal",
          start: "top 75%",
          once: true,
        },
      });

      // ── Tools: stagger fade-in ──────────────────────────
      gsap.from(".ia-tool", {
        opacity: 0,
        y: 24,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".ia-tools__grid",
          start: "top 82%",
          once: true,
        },
      });

      // ── Projects: línea scaleX + row content ─────────────
      gsap.from(".ia-projects__header", {
        opacity: 0,
        y: 32,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".ia-projects",
          start: "top 82%",
          once: true,
        },
      });

      gsap.utils.toArray(".project-row").forEach((row) => {
        const rowTl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 87%", once: true },
        });
        rowTl
          .from(
            row.querySelector(".project-row__line"),
            {
              scaleX: 0,
              transformOrigin: "left",
              duration: 0.6,
              ease: "power2.out",
            },
            0,
          )
          .from(row.querySelector(".project-row__index"), {
            opacity: 0,
            x: -20,
            duration: 0.4,
          })
          .from(
            row.querySelector(".project-row__title"),
            { opacity: 0, y: 24, duration: 0.5, ease: "power3.out" },
            "-=0.2",
          )
          .from(
            row.querySelector(".project-row__tags"),
            { opacity: 0, duration: 0.4 },
            "-=0.3",
          );
      });

      return () => split.revert();
    },
    { scope: pageRef },
  );

  return (
    <main ref={pageRef} id="main-content">
      {/* ── HERO 2-COL ───────────────────────────────────────── */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          alignItems: "center",
          minHeight: "clamp(500px, 70vh, 820px)",
          padding:
            "clamp(100px, 14vh, 150px) clamp(24px, 6vw, 80px) clamp(60px, 8vh, 100px)",
          gap: "clamp(2rem, 4vw, 5rem)",
          borderBottom: "1px solid var(--color-border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Columna texto */}
        <div>
          <div style={{ overflow: "hidden" }}>
            <h1
              className="ia-hero__title"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--type-display)",
                fontWeight: 900,
                color: "var(--color-text-primary)",
                lineHeight: 1.0,
                margin: "0 0 clamp(1.5rem, 3vh, 2.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              IA &<br />
              Ecosistema
            </h1>
          </div>
          <p
            className="ia-hero__sub"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "var(--type-body)",
              fontWeight: 300,
              color: "var(--color-text-secondary)",
              maxWidth: "48ch",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            Integro Claude Code, Gemini y técnicas de prompt engineering en cada
            proyecto. No como autocompletado: como capa de razonamiento que
            detecta errores, genera arquitectura y acelera decisiones sin bajar
            la calidad del código entregado.
          </p>
        </div>

        {/* Columna canvas — desktop: Three.js; mobile: imagen estática vía HelmetCanvas */}
        <div
          aria-hidden="true"
          style={{
            height: "clamp(360px, 55vh, 660px)",
            position: "relative",
          }}
        >
          <Suspense fallback={null}>
            <HelmetCanvas />
          </Suspense>
        </div>
      </section>

      {/* ── MANIFIESTO 2-COL ─────────────────────────────────── */}
      <section
        className="ia-manifesto"
        style={{
          padding: "clamp(60px, 10vh, 120px) clamp(24px, 6vw, 80px)",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "clamp(3rem, 6vw, 6rem)",
          alignItems: "start",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {/* Columna izquierda — filosofía editorial */}
        <div className="ia-manifesto__left">
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "clamp(17px, 1.5vw, 22px)",
              fontWeight: 300,
              color: "var(--color-text-primary)",
              lineHeight: 1.75,
              margin: "0 0 clamp(1.5rem, 3vh, 2.5rem)",
              maxWidth: "44ch",
            }}
          >
            Escribir instrucciones precisas no es escribir más texto. Es definir
            contexto, restricciones y formato de salida con la misma disciplina
            que una especificación de software.
          </p>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "var(--type-body)",
              fontWeight: 300,
              color: "var(--color-text-secondary)",
              lineHeight: 1.75,
              margin: "0 0 clamp(1.5rem, 3vh, 2rem)",
              maxWidth: "44ch",
            }}
          >
            Uso Claude Code como par de trabajo permanente: revisión de
            arquitectura, generación de tests y detección de regresiones. El
            resultado es código que pasa review al primer intento.
          </p>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "var(--type-body)",
              fontWeight: 300,
              color: "var(--color-text-secondary)",
              lineHeight: 1.75,
              margin: 0,
              maxWidth: "44ch",
            }}
          >
            Cada entrega incluye análisis semántico de accesibilidad, revisión
            OWASP y validación de contratos de API. El cliente recibe un
            producto más seguro sin pagar el costo de auditorías manuales.
          </p>
        </div>

        {/* Columna derecha — terminal con prompt real */}
        <div className="ia-manifesto__terminal">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--type-mono)",
              color: "var(--color-text-secondary)",
              letterSpacing: "var(--ls-mono)",
              margin: "0 0 0.75rem",
            }}
          >
            Prompt engineering — ejemplo real
          </p>
          <div
            style={{
              backgroundColor: "var(--color-bg-elevated)",
              border: "1px solid var(--color-border)",
              padding: "clamp(1.25rem, 2.5vw, 2rem)",
              overflowX: "auto",
            }}
          >
            {TERMINAL_LINES.map((line, i) => (
              <div
                key={i}
                className="ia-terminal__line"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: line.startsWith("//")
                    ? "var(--color-text-secondary)"
                    : "var(--color-text-primary)",
                  lineHeight: 1.8,
                  whiteSpace: "pre",
                  opacity: line.startsWith("//") ? 0.7 : 1,
                }}
              >
                {line}
              </div>
            ))}
          </div>
          {/* Indicador de resultado */}
          <div
            style={{
              marginTop: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "var(--color-accent-hot)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--type-mono)",
                color: "var(--color-text-secondary)",
                letterSpacing: "var(--ls-mono)",
              }}
            >
              Ejecutado en cada PR — sin intervención manual
            </span>
          </div>
        </div>
      </section>

      {/* ── ECOSISTEMA ───────────────────────────────────────── */}
      <section
        className="ia-tools"
        aria-label="Herramientas del ecosistema IA"
        style={{
          padding: "clamp(60px, 10vh, 120px) clamp(24px, 6vw, 80px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "clamp(2.5rem, 5vh, 4rem)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--type-headline)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Herramientas activas
          </h2>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "var(--type-body)",
              fontWeight: 300,
              color: "var(--color-text-secondary)",
              margin: 0,
              maxWidth: "36ch",
              lineHeight: 1.6,
              textAlign: "right",
            }}
          >
            Stack con el que construyo y reviso código cada semana.
          </p>
        </div>

        <div
          className="ia-tools__grid"
          style={{
            display: "flex",
            flexWrap: "wrap",
            borderTop: "1px solid var(--color-border)",
            borderLeft: "1px solid var(--color-border)",
          }}
        >
          {TOOLS.map((tool) => (
            <ToolItem key={tool.name} tool={tool} />
          ))}
        </div>
      </section>

      {/* ── PROYECTOS IA ─────────────────────────────────────── */}
      {/* <section
        className="ia-projects"
        aria-label="Proyectos con IA en el núcleo"
        style={{
          padding: 'clamp(60px, 10vh, 120px) clamp(24px, 6vw, 80px)',
        }}
      >
        <div
          className="ia-projects__header"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: 'clamp(2rem, 5vh, 4rem)',
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
            Casos reales
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
            Sistemas construidos con IA en el núcleo, no como feature opcional.
          </p>
        </div>

        <ProjectShowcase projects={AI_PROJECTS} />
      </section> */}
    </main>
  );
}

function ToolItem({ tool }) {
  return (
    <div
      className="ia-tool"
      role="listitem"
      style={{
        borderBottom: "1px solid var(--color-border)",
        borderRight: "1px solid var(--color-border)",
        padding: "clamp(1.25rem, 2.5vw, 2rem) clamp(1.5rem, 3vw, 2.5rem)",
        flex: "1 1 clamp(200px, 28%, 320px)",
        transition: "background-color 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--color-bg-elevated)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(17px, 1.8vw, 26px)",
          fontWeight: 700,
          color: "var(--color-text-primary)",
          display: "block",
          marginBottom: "0.4rem",
          letterSpacing: "-0.01em",
        }}
      >
        {tool.name}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--type-mono)",
          color: "var(--color-text-secondary)",
          letterSpacing: "var(--ls-mono)",
          display: "block",
        }}
      >
        {tool.role}
      </span>
    </div>
  );
}

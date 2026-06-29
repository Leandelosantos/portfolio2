// ImpactoReal.jsx — SRS §4 — "Impacto Real" (Figma Home)
// 4 servicios: Ingeniería Web, Sistemas de Diseño, Experiencias 3D, Optimización IA
// Desktop + sin reduced-motion: pin + scroll horizontal (técnica SRS L239-253 "Proyecto Featured",
// nunca implementada — se reutiliza acá). Al terminar el track, libera el pin y continúa
// el scroll vertical normal hacia SelectedWork (Proyectos) — comportamiento nativo de ScrollTrigger.
// Mobile (<768px) / prefers-reduced-motion: fallback bento grid vertical, sin pin — ver globals.css.
// buenas-practicas §3: useGSAP, solo transform + opacity

import { useRef, lazy, Suspense } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

// Lazy loaded — solo desktop descarga el chunk Three.js
const isMobile = window.matchMedia("(max-width: 767px)").matches;
const ParticlesCanvas = !isMobile
  ? lazy(() => import("../three/ParticlesCanvas"))
  : null;

const SERVICES = [
  {
    id: "ingenieria-web",
    number: "01",
    title: "Ingeniería Web",
    description:
      "Aplicaciones React con performance real. Arquitectura escalable que resiste el tiempo. SaaS personalizados hasta en el mas minimo detalle del cliente.",
    tags: ["React", "GSAP", "Vite"],
  },
  {
    id: "sistemas-diseno",
    number: "02",
    title: "Diseño que impacta",
    description:
      "El diseño no es decoración, es el primer argumento de venta del producto. Lo primero que se ve, lo último que se olvida",
    tags: ["Figma", "CSS Variables", "MUI"],
  },
  {
    id: "experiencias-3d",
    number: "03",
    title: "Experiencias 3D",
    description:
      "WebGL con Three.js y React Three Fiber. Escenas interactivas que convierten visitantes en clientes.",
    tags: ["Three.js", "R3F", "WebGL"],
  },
  {
    id: "optimizacion-ia",
    number: "04",
    title: "Optimización IA",
    description:
      "Integración de LLMs en flujos de trabajo. Búsqueda semántica, revisión autónoma de código y automatización de decisiones.",
    tags: ["Claude API", "Python", "CI/CD"],
  },
];

export function ImpactoReal() {
  const sectionRef = useRef(null);
  const pinWrapRef = useRef(null);
  const trackRef = useRef(null);
  const counterRef = useRef(null);
  const progressRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".impacto__headline", {
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

      gsap.matchMedia().add(
        {
          isDesktop:
            "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          isFallback: "(max-width: 767px), (prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop } = context.conditions;

          if (isDesktop) {
            // Desktop, sin reduced-motion — pin + scroll horizontal
            const track = trackRef.current;
            const pinWrap = pinWrapRef.current;
            const getDistance = () =>
              Math.max(track.scrollWidth - pinWrap.clientWidth, 0);

            if (getDistance() === 0) return undefined;

            let lastActive = -1;

            const tween = gsap.to(track, {
              x: () => -getDistance(),
              ease: "none",
              scrollTrigger: {
                trigger: pinWrap,
                start: "top top",
                end: () => "+=" + getDistance(),
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                onEnter: () => (track.style.willChange = "transform"),
                onEnterBack: () => (track.style.willChange = "transform"),
                onLeave: () => (track.style.willChange = "auto"),
                onLeaveBack: () => (track.style.willChange = "auto"),
                onUpdate: (self) => {
                  gsap.set(progressRef.current, { scaleX: self.progress });
                  const active = Math.min(
                    SERVICES.length - 1,
                    Math.round(self.progress * (SERVICES.length - 1)),
                  );
                  if (active !== lastActive) {
                    lastActive = active;
                    if (counterRef.current) {
                      counterRef.current.textContent = `${SERVICES[active].number} / ${String(SERVICES.length).padStart(2, "0")}`;
                    }
                  }
                },
              },
            });

            return () => tween.scrollTrigger?.kill();
          }

          // Mobile o prefers-reduced-motion — bento grid vertical, igual que antes (sin pin)
          const tween = gsap.from(".impacto__tile", {
            opacity: 0,
            y: 40,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top 78%",
              once: true,
            },
          });

          return () => tween.scrollTrigger?.kill();
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Servicios — Impacto Real"
      style={{
        padding: "clamp(80px, 12vh, 140px) 0",
        backgroundColor: "var(--color-bg)",
        position: "relative",
      }}
    >
      {/* Fondo — partículas R3F, igual que SelectedWork */}
      {ParticlesCanvas && (
        <Suspense fallback={null}>
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <ParticlesCanvas />
          </div>
        </Suspense>
      )}

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Encabezado — fuera del track, no se mueve con el pin */}
        <div
          className="impacto__headline"
          style={{
            marginBottom: "clamp(3rem, 6vh, 5rem)",
            padding: "0 clamp(14.4px, 3.6vw, 48px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
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
            Impacto Real
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
            Disciplinas que convergen en resultados medibles para cada proyecto.
          </p>
        </div>

        {/* Pin wrapper — se vuelve position:fixed mientras ScrollTrigger está activo (solo desktop).
            Alto 100vh — cards verticales full-bleed, sin espacio muerto (ref: madeinuxstudio.com) */}
        <div
          ref={pinWrapRef}
          className="impacto__pinwrap"
          style={{
            overflow: "hidden",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className="impacto__trackpad"
            style={{
              flex: 1,
              minHeight: 0,
              paddingLeft: "clamp(14.4px, 3.6vw, 48px)",
            }}
          >
            {/* Track — único elemento animado en x (nunca el pin wrapper) */}
            <div
              ref={trackRef}
              className="impacto__track"
              style={{
                height: "100%",
                display: "flex",
                flexWrap: "nowrap",
                gap: "1px",
                backgroundColor: "var(--color-border)",
              }}
            >
              {SERVICES.map((service) => (
                <ServiceTile key={service.id} service={service} />
              ))}
            </div>
          </div>

          {/* HUD — contador + barra de progreso, franja fija abajo del pin. Oculto en fallback (ver globals.css) */}
          <div
            className="impacto__hud"
            aria-hidden="true"
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem clamp(14.4px, 3.6vw, 48px)",
            }}
          >
            <span
              ref={counterRef}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--type-mono)",
                color: "var(--color-accent-hot)",
                letterSpacing: "var(--ls-mono)",
                whiteSpace: "nowrap",
              }}
            >
              01 / 04
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "var(--color-border)",
              }}
            >
              <div
                ref={progressRef}
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "var(--color-accent-hot)",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceTile({ service }) {
  return (
    <div
      className="impacto__tile impacto__panel"
      style={{
        height: "100%",
        flex: "0 0 clamp(560px, 62vw, 760px)",
        backgroundColor: "var(--color-bg-subtle)",
        padding: "clamp(2rem, 4vw, 3rem)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--color-bg-elevated)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--color-bg-subtle)")
      }
    >
      {/* Número — ancla gráfica dominante (ref: madeinuxstudio.com), título manda la jerarquía de contenido */}
      <span
        className="impacto__panel-number"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(6rem, 16vw, 13rem)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          color: "var(--color-accent-hot)",
        }}
      >
        {service.number}
      </span>

      <div
        className="impacto__panel-body"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "46ch",
        }}
      >
        <h3
          className="impacto__panel-title"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(5.75rem, 3vw, 2.75rem)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          {service.title}
        </h3>

        <p
          className="impacto__panel-desc"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "clamp(1.35rem, 1.2vw, 1.1rem)",
            fontWeight: 300,
            color: "var(--color-text-secondary)",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {service.description}
        </p>

        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {service.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--color-accent-hot)",
                letterSpacing: "var(--ls-mono)",
                textTransform: "uppercase",
                border: "1px solid var(--color-accent-hot)",
                padding: "2px 8px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

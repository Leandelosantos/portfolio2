// Hero.jsx — SRS §4.2 — Hero Section
// Layout editorial por esquinas (ref: markashton.framer.website) — nombre partido
// en dos extremos (LEANDRO arriba-izq / DE LOS SANTOS ABOY abajo-der), tagline +
// descripción abajo-izq, "2026 / línea / ./ PORTFOLIO" en el borde lateral.
// Canvas full-bleed (partículas + HeroObject) intacto — no se toca.
// Scroll (desktop + sin reduced-motion, ver gsap.matchMedia abajo):
//   - edge: sale para arriba, tagline: sale para abajo — cinta transportadora,
//     recorrido corto (140px) así desaparecen enseguida con el primer scroll
//   - LEANDRO: desciende hasta la fila de DE LOS SANTOS ABOY — termina al 45%
//     del alto de la sección (no al final, ahí ya quedaría fuera de pantalla),
//     formando el nombre completo todavía visible, y quedan pegados el resto
//     del scroll (scrub mantiene el valor final tras el end)
// Mobile: layout propio — nombre combinado 1 línea abajo-centro, sin scroll-jack.
// buenas-practicas §3: useGSAP, split-type con revert en onComplete

import { useRef, Suspense, lazy } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { splitCharsWords } from "../../utils/splitTextHelpers";
import { useLoader } from "../../context/LoaderContext";
import { useParallax } from "../../hooks/useParallax";

// HeroCanvas — lazy loaded. Solo desktop descarga el chunk Three.js.
const isMobile = window.matchMedia("(max-width: 767px)").matches;
const HeroCanvas = !isMobile ? lazy(() => import("../three/HeroCanvas")) : null;

const EDGE = "clamp(24px, 6vw, 80px)";
const NAME_SIZE = "clamp(2.4rem, 7vw, 6.5rem)";

export function Hero() {
  const { isLoaded } = useLoader();
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const taglineRef = useRef(null);
  const leandroRef = useRef(null);
  const dlsaRef = useRef(null);

  // Parallax sutil en el canvas de fondo
  useParallax(canvasRef, { speed: 0.06, triggerRef: sectionRef });

  // ── Animación de entrada — trigger: loader completo ──────────
  useGSAP(
    () => {
      if (!isLoaded || !taglineRef.current) return;

      const tl = gsap.timeline({ delay: 0.15 });

      // Canvas fondo: fade in primero
      tl.from(canvasRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power1.out",
      });

      // Label + borde lateral: fade + y
      tl.from(
        ".hero__label, .hero__edge",
        {
          opacity: 0,
          y: 16,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.9",
      );

      // Tagline: chars desde abajo
      const split = splitCharsWords(taglineRef.current);
      tl.from(
        split.chars,
        {
          opacity: 0,
          yPercent: 110,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.022,
          onComplete: () => split.revert(),
        },
        "-=0.3",
      );

      // Descripción
      tl.from(
        ".hero__desc",
        { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" },
        "-=0.3",
      );

      // Nombre — LEANDRO / DE LOS SANTOS ABOY / combinado mobile
      tl.from(
        ".hero__name-left, .hero__name-right, .hero__name-mobile",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.14,
        },
        "-=0.35",
      );

      // ── Scroll — solo desktop, sin reduced-motion ──────────────
      gsap.matchMedia().add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          // Edge + tagline: cinta transportadora — recorrido corto (140px de
          // scroll) y desplazamiento grande, así con apenas tocar el scroll ya
          // desaparecieron. Direcciones opuestas: edge sube, tagline baja.
          // fromTo con start explícito (1/0) — gsap.to() capturaría el valor
          // actual al crear el tween, que puede ser 0 todavía por el
          // immediateRender de la entrada (.from()), dejando el elemento
          // forzado a opacity 0 apenas hay scroll. fromTo no depende de eso.
          const exitTweenEdge = gsap.fromTo(
            ".hero__edge",
            { opacity: 1, y: 0 },
            {
              opacity: 0,
              y: -160,
              ease: "power1.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=140",
                scrub: true,
              },
            },
          );

          const exitTweenCorner = gsap.fromTo(
            ".hero__corner-text",
            { opacity: 1, y: 0 },
            {
              opacity: 0,
              y: 160,
              ease: "power1.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=140",
                scrub: true,
              },
            },
          );

          // LEANDRO desciende hasta la fila de DE LOS SANTOS ABOY — termina al
          // 45% del alto de la sección, NO al final ("bottom top"): a esa altura
          // DLSA ya scrolleó arriba del viewport (su fila vive cerca del borde
          // inferior de la sección), con "bottom top" el cruce pasaba off-screen
          // y nunca se llegaba a ver. Al 45% el destino sigue visible en pantalla,
          // y como scrub mantiene el valor final tras el end, quedan juntos y
          // se van scrolleando pegados el resto del recorrido.
          // Delta calculado con getComputedStyle (top estático, no afectado por
          // el transform del propio scrub) + getBoundingClientRect de DLSA
          // (nunca se mueve) — robusto a refresh/resize en cualquier punto del
          // scroll. fromTo con y:0 explícito por el mismo motivo que arriba.
          const leandroEl = leandroRef.current;
          const dlsaEl = dlsaRef.current;
          const getOffsetY = () => {
            const leandroTop = parseFloat(getComputedStyle(leandroEl).top);
            const dlsaRect = dlsaEl.getBoundingClientRect();
            const sectionRect = sectionRef.current.getBoundingClientRect();
            const dlsaTopRelative = dlsaRect.top - sectionRect.top;
            return dlsaTopRelative - leandroTop;
          };

          const descendTween = gsap.fromTo(
            leandroEl,
            { y: 0 },
            {
              y: getOffsetY,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => "+=" + sectionRef.current.offsetHeight * 0.45,
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );

          return () => {
            exitTweenEdge.scrollTrigger?.kill();
            exitTweenCorner.scrollTrigger?.kill();
            descendTween.scrollTrigger?.kill();
          };
        },
      );
    },
    { scope: sectionRef, dependencies: [isLoaded] },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Hero — Ingeniería como Arte"
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* ── Canvas full-bleed: partículas + HeroObject — sin tocar ───── */}
      <div
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          willChange: "transform",
        }}
      >
        {HeroCanvas && (
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        )}
      </div>

      {/* ── Contenido — sobre el canvas, por esquinas ────────────────── */}

      {/* Label — centrado arriba, cerca del navbar */}
      <span
        className="hero__label"
        style={{
          position: "absolute",
          top: "clamp(88px, 8vh, 112px)",
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
          zIndex: 1,
          fontFamily: "var(--font-mono)",
          fontSize: "var(--type-mono)",
          fontWeight: 500,
          color: "rgba(255,255,255,0.55)",
          letterSpacing: "var(--ls-mono)",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        Software Developer &amp; Project Manager
      </span>

      {/* Nombre — desktop: arriba-izquierda. Oculto en mobile (ver globals.css) */}
      <span
        ref={leandroRef}
        className="hero__name-left"
        style={{
          position: "absolute",
          top: "clamp(96px, 11vh, 130px)",
          left: EDGE,
          zIndex: 1,
          fontFamily: "var(--font-display)",
          fontSize: NAME_SIZE,
          fontWeight: 900,
          color: "var(--color-text-primary)",
          lineHeight: 1,
          letterSpacing: "-0.01em",
          margin: 0,
        }}
      >
        LEANDRO
      </span>

      {/* Nombre — desktop: abajo-derecha, una sola línea, mismo tamaño que LEANDRO.
          Oculto en mobile (ver globals.css) */}
      <span
        ref={dlsaRef}
        className="hero__name-right"
        style={{
          position: "absolute",
          bottom: EDGE,
          right: EDGE,
          zIndex: 1,
          whiteSpace: "nowrap",
          fontFamily: "var(--font-display)",
          fontSize: NAME_SIZE,
          fontWeight: 900,
          color: "var(--color-text-primary)",
          lineHeight: 1,
          letterSpacing: "-0.01em",
          textAlign: "right",
          margin: 0,
        }}
      >
        DE LOS SANTOS ABOY
      </span>

      {/* Wrapper mobile — agrupa edge + tagline + nombre, los distribuye con
          flexbox (space-between) para que nunca se pisen sin importar el alto
          del viewport (causa real del choque anterior: posicionaba con % de
          altura sobre bloques de alto fijo — a menor altura, menos margen).
          display:contents en desktop = no hace nada, cada hijo sigue
          posicionado independiente con su propio position:absolute de siempre. */}
      <div className="hero__mobile-stack">
        {/* Borde lateral izquierdo — 2026 / línea / ./ PORTFOLIO (vertical).
            Tipografía +30% sobre --type-mono. */}
        <div
          className="hero__edge"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "clamp(20px, 4vw, 48px)",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "calc(var(--type-mono) * 1.3)",
              color: "var(--color-text-secondary)",
              letterSpacing: "var(--ls-mono)",
              whiteSpace: "nowrap",
            }}
          >
            2026
          </span>
          <span
            style={{
              display: "block",
              width: 1,
              height: 48,
              backgroundColor: "var(--color-text-muted)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "calc(var(--type-mono) * 1.3)",
              color: "var(--color-text-secondary)",
              letterSpacing: "var(--ls-mono)",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              whiteSpace: "nowrap",
            }}
          >
            ./ PORTFOLIO
          </span>
        </div>

        {/* Tagline + descripción — abajo-izquierda (desktop) */}
        <div
          className="hero__corner-text"
          style={{
            position: "absolute",
            bottom: EDGE,
            left: EDGE,
            zIndex: 1,
            maxWidth: "min(80vw, 420px)",
          }}
        >
          <h1
            ref={taglineRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 3.2vw, 2.75rem)",
              fontWeight: 900,
              color: "var(--color-text-primary)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              margin: "0 0 0.75rem",
            }}
          >
            Ingeniería como Arte
          </h1>
          <p
            className="hero__desc"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "var(--type-body)",
              fontWeight: 500,
              color: "rgba(255,255,255,0.72)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Construyo experiencias digitales donde la precisión técnica y la
            dirección de arte convergen.
          </p>

          {/* Scroll indicator — debajo del tagline. TODO: reemplazar por SVG animado */}
          <div
            aria-hidden="true"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.5rem",
              marginTop: "1.5rem",
            }}
          >
            <span
              style={{
                display: "block",
                width: 1,
                height: 36,
                backgroundColor: "var(--color-text-muted)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--type-mono)",
                color: "var(--color-text-muted)",
                letterSpacing: "var(--ls-mono)",
                textTransform: "uppercase",
              }}
            >
              Scroll
            </span>
          </div>
        </div>

        {/* Nombre — mobile: combinado, una sola línea, ocupando casi todo el
            ancho (6.2vw escala con el viewport, no es un tamaño fijo).
            display:none por default, mostrado en mobile (ver globals.css) */}
        <span
          className="hero__name-mobile"
          style={{
            display: "none",
            zIndex: 1,
            whiteSpace: "nowrap",
            textAlign: "center",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.2rem, 7.4vw, 2.6rem)",
            fontWeight: 900,
            color: "var(--color-text-primary)",
            lineHeight: 1,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          LEANDRO DE LOS SANTOS ABOY
        </span>
      </div>
    </section>
  );
}

// AboutPage.jsx — SRS §4.5 — Sobre mí
// Bio justificada con Kinetic Text (Magic UI, portado sin Tailwind) — peso de cada
// char interpola al pasar el cursor. Foto: public/assets/image-sobremi.png.
// buenas-practicas §3: useGSAP, split.revert() en cleanup, solo transform + opacity

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { splitCharsWords } from "../utils/splitTextHelpers";
import { Marquee } from "../components/ui/Marquee";

const BIO_PARAGRAPHS = [
  `Soy desarrollador de software y project manager con 5 años de
  experiencia. Mi trabajo vive en la intersección entre la lógica
  de negocio y la experiencia de usuario: entiendo los procesos
  antes de escribir una línea de código, porque creo que el mejor
  software no automatiza tareas, sino que transforma la forma en
  que las personas trabajan.`,
  `Construyo productos digitales que combinan arquitecturas
  sólidas con interfaces que se sienten vivas. Tengo una atracción
  genuina por las animaciones, el diseño 3D y las experiencias web
  que van más allá de lo funcional, esas que generan una
  reacción en quien las usa. Esa sensibilidad estética convive
  con criterios técnicos rigurosos: código limpio, estructuras
  escalables, decisiones de diseño que tienen una razón de ser.`,
  `Como project manager, lidero equipos con foco en la
  comunicación clara, la escucha activa y la capacidad de
  traducir necesidades de negocio en soluciones concretas. Me
  adapto rápido a contextos nuevos, trabajo bien en equipo y sé
  cuándo liderar y cuándo escuchar. La creatividad no es un plus
  en mi forma de trabajar — es parte del proceso desde el primer
  sprint.`,
].map((p) => p.replace(/\s+/g, " ").trim());

const TECH_STACK = [
  "React.js",
  "Express.js",
  "PostgreSQL",
  "Supabase",
  "Vite",
  "Three.js",
  "GSAP",
  "Lenis",
  "CSS",
  "Vercel",
];

const SERVICES = ["Web Design", "Webflow Development", "Leadership", "Agile"];

// Chips del marquee — tamaño +70% sobre el chip base (11px/6px·10px) a pedido
const marqueeChipStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: "19px",
  color: "var(--color-text-secondary)",
  letterSpacing: "var(--ls-mono)",
  textTransform: "uppercase",
  border: "1px solid var(--color-border)",
  padding: "10px 17px",
  whiteSpace: "nowrap",
  transition: "border-color 0.3s ease, color 0.3s ease",
};

function onChipHoverLime(e) {
  e.currentTarget.style.borderColor = "var(--color-accent-hot)";
  e.currentTarget.style.color = "var(--color-accent-hot)";
}

function onChipHoverLeave(e) {
  e.currentTarget.style.borderColor = "var(--color-border)";
  e.currentTarget.style.color = "var(--color-text-secondary)";
}

const labelStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--type-mono)",
  color: "var(--color-text-secondary)",
  letterSpacing: "var(--ls-mono)",
  textTransform: "uppercase",
  margin: "0 0 1rem",
};

export default function AboutPage() {
  const sectionRef = useRef(null);
  const bioRef = useRef(null);

  useGSAP(
    () => {
      const split = splitCharsWords(bioRef.current, { tagName: "span" });

      gsap.from(split.chars, {
        opacity: 0,
        y: 14,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.004,
        scrollTrigger: {
          trigger: bioRef.current,
          start: "top 82%",
          once: true,
        },
      });

      // split.revert() solo se llama al desmontar — los chars deben
      // sobrevivir mientras la página esté montada para que el hover funcione
      return () => split.revert();
    },
    { scope: sectionRef },
  );

  return (
    <main id="main-content">
      {/* ── Encabezado ───────────────────────────────────────── */}
      <section
        aria-label="Sobre mí"
        style={{
          padding:
            "clamp(100px, 12vh, 140px) clamp(24px, 6vw, 80px) clamp(40px, 6vh, 60px)",
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
          Sobre mí
        </h1>
      </section>

      {/* ── Foto + Bio ───────────────────────────────────────── */}
      <section
        ref={sectionRef}
        aria-label="Presentación"
        className="about__grid"
        style={{
          padding: "0 clamp(24px, 6vw, 80px) clamp(100px, 14vh, 160px)",
          display: "grid",
          gridTemplateColumns: "minmax(240px, 360px) 1fr",
          gap: "clamp(3rem, 6vw, 6rem)",
          alignItems: "start",
        }}
      >
        {/* Foto */}
        <div
          className="about__photo"
          style={{
            position: "relative",
            aspectRatio: "4 / 5",
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-bg-elevated)",
            overflow: "hidden",
          }}
        >
          <img
            src="/assets/image-sobremi.png"
            alt="Leandro De Los Santos Aboy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Contenido — bio + stack. minWidth:0 — item de grid con marquee adentro;
            sin esto el contenido sin wrap del marquee infla la columna 1fr */}
        <div style={{ minWidth: 0 }}>
          {/* Bio — Kinetic Text: chars con peso interactivo, formato justificado.
              aria-hidden porque split-type fragmenta el texto en spans por letra;
              la copia accesible para lectores de pantalla vive en .sr-only abajo. */}
          <div
            ref={bioRef}
            className="about__bio"
            aria-hidden="true"
            style={{
              maxWidth: "70ch",
              marginLeft: "auto",
              marginBottom: "clamp(3rem, 6vh, 4rem)",
            }}
          >
            {BIO_PARAGRAPHS.map((text, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "var(--type-body)",
                  color: "var(--color-text-primary)",
                  textAlign: "justify",
                  textAlignLast: "left",
                  lineHeight: 1.75,
                  margin: i === BIO_PARAGRAPHS.length - 1 ? 0 : "0 0 1.5em",
                }}
              >
                {text}
              </p>
            ))}
          </div>

          {/* Copia accesible — mismo texto, sin fragmentar, para lectores de pantalla */}
          <div className="sr-only">
            {BIO_PARAGRAPHS.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>

          {/* Tecnologías — marquee hacia la derecha (reverse) */}
          <p style={labelStyle}>Tecnologías</p>
          <Marquee
            reverse
            duration="36s"
            gap="1.25rem"
            style={{ marginBottom: "clamp(2rem, 4vh, 3rem)" }}
          >
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                style={marqueeChipStyle}
                onMouseEnter={onChipHoverLime}
                onMouseLeave={onChipHoverLeave}
              >
                {tech}
              </span>
            ))}
          </Marquee>

          {/* Servicios & metodologías — marquee hacia la izquierda */}
          <p style={labelStyle}>Servicios &amp; metodologías</p>
          <Marquee duration="30s" gap="1.25rem">
            {SERVICES.map((service) => (
              <span
                key={service}
                style={marqueeChipStyle}
                onMouseEnter={onChipHoverLime}
                onMouseLeave={onChipHoverLeave}
              >
                {service}
              </span>
            ))}
          </Marquee>
        </div>
      </section>
    </main>
  );
}

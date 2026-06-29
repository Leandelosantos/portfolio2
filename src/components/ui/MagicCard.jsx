// MagicCard.jsx — Magic UI "Magic Card", portado sin Tailwind/framer-motion
// Spotlight que sigue el puntero + glow de borde al hover. gsap.quickTo anima
// --mx/--my (mismo patrón que CustomCursor — quickTo, lag suave).
// Borde: --color-accent-hot al hover (a pedido, único uso fuera de CTA/cursor).
// Spotlight interno: neutro, sin cambios.
// buenas-practicas §3: useGSAP, gsap.matchMedia para prefers-reduced-motion.

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export function MagicCard({
  children,
  className,
  style,
  gradientSize = 220,
  ...rest
}) {
  const cardRef = useRef(null);
  const setXRef = useRef(null);
  const setYRef = useRef(null);

  useGSAP(
    () => {
      const el = cardRef.current;
      el.style.setProperty("--mx", `${-gradientSize}px`);
      el.style.setProperty("--my", `${-gradientSize}px`);

      gsap.matchMedia().add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          setXRef.current = gsap.quickTo(el, "--mx", {
            duration: 0.3,
            ease: "power3",
          });
          setYRef.current = gsap.quickTo(el, "--my", {
            duration: 0.3,
            ease: "power3",
          });

          return () => {
            setXRef.current = null;
            setYRef.current = null;
          };
        },
      );
    },
    { scope: cardRef },
  );

  function handlePointerMove(e) {
    if (!setXRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setXRef.current(e.clientX - rect.left);
    setYRef.current(e.clientY - rect.top);
  }

  function handlePointerLeave() {
    setXRef.current?.(-gradientSize);
    setYRef.current?.(-gradientSize);
  }

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className ? `magic-card ${className}` : "magic-card"}
      style={{
        "--magic-gradient-size": `${gradientSize}px`,
        position: "relative",
        ...style,
      }}
      {...rest}
    >
      <div className="magic-card__mask" aria-hidden="true" />
      <div className="magic-card__spotlight" aria-hidden="true" />
      <div className="magic-card__content">{children}</div>
    </div>
  );
}

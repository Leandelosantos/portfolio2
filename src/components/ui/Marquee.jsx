// Marquee.jsx — Magic UI "Marquee" portado a CSS plano (sin Tailwind)
// N pistas duplicadas (repeat) animadas en sync vía @keyframes marquee-scroll en globals.css

export function Marquee({
  children,
  reverse = false,
  repeat = 4,
  gap = '2rem',
  duration = '32s',
  className = '',
  style = {},
}) {
  return (
    <div
      className={`marquee ${className}`}
      style={{ '--marquee-gap': gap, ...style }}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={`marquee__track${reverse ? ' marquee__track--reverse' : ''}`}
          style={{ '--marquee-duration': duration }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

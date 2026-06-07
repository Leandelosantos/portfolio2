// SkipLink.jsx — SRS §5.3 — Accesibilidad: saltar al contenido principal
// Visible solo en focus (teclado). Target: <main id="main-content">

export function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Saltar al contenido
    </a>
  );
}

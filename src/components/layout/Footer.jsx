// Footer.jsx — SRS §4.6 — Footer global
// Contenido: brand (nombre dev), links sociales, hora local Buenos Aires
// Estética Lebedev: texto denso, sin adornos, línea superior

import { Link } from 'react-router-dom';
import { useLocalTime } from '../../hooks/useLocalTime';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Leandelosantos' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/leandrodelossantosaboy/' },
];

const FOOTER_LINKS = [
  { label: 'Proyectos', href: '/work' },
  { label: 'IA', href: '/ia' },
  { label: 'Sobre mí', href: '/sobre-mi' },
];

// Estilo compartido para todos los links mono del footer
const monoLinkStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--type-mono)',
  color: 'var(--color-text-secondary)',
  letterSpacing: 'var(--ls-mono)',
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'color 0.2s ease',
};

const onLinkEnter = (e) => (e.currentTarget.style.color = 'var(--color-text-primary)');
const onLinkLeave = (e) => (e.currentTarget.style.color = 'var(--color-text-secondary)');

export function Footer() {
  const localTime = useLocalTime();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: 'clamp(48px, 8vw, 120px) clamp(14.4px, 3.6vw, 48px) clamp(32px, 4vw, 48px)',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      {/* Fila superior: brand + hora local */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 'clamp(40px, 6vw, 80px)',
          flexWrap: 'wrap',
          gap: '2rem',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 56px)',
              fontWeight: 900,
              color: 'var(--color-text-primary)',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Leandro De Los Santos Aboy
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--type-mono)',
              color: 'var(--color-text-secondary)',
              letterSpacing: 'var(--ls-mono)',
              textTransform: 'uppercase',
              margin: '0.75rem 0 0',
            }}
          >
            Software Developer &amp; Project Manager
          </p>
        </div>

        {/* Hora local */}
        <div
          aria-label={`Hora local: ${localTime}`}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--type-mono)',
            color: 'var(--color-text-secondary)',
            letterSpacing: 'var(--ls-mono)',
            textAlign: 'right',
          }}
        >
          <span style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>
            HORA LOCAL
          </span>
          <time>{localTime}</time>
        </div>
      </div>

      {/* Fila inferior: nav + sociales + copyright */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
          paddingTop: 'clamp(24px, 3vw, 40px)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <nav aria-label="Navegación footer">
          <ul
            style={{
              display: 'flex',
              gap: 'clamp(1.5rem, 3vw, 2.5rem)',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {FOOTER_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  to={href}
                  style={monoLinkStyle}
                  onMouseEnter={onLinkEnter}
                  onMouseLeave={onLinkLeave}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} — abre en nueva pestaña`}
              style={monoLinkStyle}
              onMouseEnter={onLinkEnter}
              onMouseLeave={onLinkLeave}
            >
              {label}
            </a>
          ))}

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--type-mono)',
              color: 'var(--color-text-muted)',
              letterSpacing: 'var(--ls-mono)',
            }}
          >
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}

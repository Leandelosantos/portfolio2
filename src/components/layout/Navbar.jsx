// Navbar.jsx — SRS §4.1 — Navegación principal
// Desktop: links horizontales, hide/show en scroll con GSAP
// Mobile (< 768px): hamburger + overlay fullscreen con GSAP stagger
// buenas-practicas §3: useGSAP para animaciones; useEffect para body scroll lock

import { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useNavbarBehavior } from '../../hooks/useNavbarBehavior';
import { usePageTransition } from '../../context/PageTransitionContext';
import { lenis } from '../../lib/lenis';

const NAV_LINKS = [
  { label: 'Proyectos', href: '/work' },
  { label: 'IA', href: '/ia' },
  { label: 'Exhibiciones', href: '/exhibiciones' },
  { label: 'Sobre mí', href: '/sobre-mi' },
];

export function Navbar() {
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isVisible, isAtTop } = useNavbarBehavior();
  const { transitionTo } = usePageTransition();

  // Animar visibilidad con GSAP en scroll
  useGSAP(
    () => {
      gsap.to(navRef.current, {
        yPercent: isVisible ? 0 : -110,
        duration: 0.4,
        ease: isVisible ? 'power2.out' : 'power2.in',
      });
    },
    { dependencies: [isVisible] }
  );

  // Animar overlay mobile al abrir/cerrar
  useGSAP(
    () => {
      if (!menuRef.current) return;

      if (menuOpen) {
        gsap.set(menuRef.current, { pointerEvents: 'all' });
        gsap.to(menuRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out' });
        gsap.from('.nav__overlay-item', {
          y: 40,
          opacity: 0,
          duration: 0.45,
          ease: 'power3.out',
          stagger: 0.07,
          delay: 0.05,
        });
      } else {
        gsap.to(menuRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            if (menuRef.current) {
              gsap.set(menuRef.current, { pointerEvents: 'none' });
            }
          },
        });
      }
    },
    { dependencies: [menuOpen] }
  );

  // Lock scroll cuando menu abierto — lenis.stop/start + overflow fallback
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (e, href) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    closeMenu();
    transitionTo(href);
  };

  return (
    <>
      <header
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem clamp(24px, 6vw, 80px)',
          backgroundColor: isAtTop && !menuOpen
            ? 'transparent'
            : 'rgba(10, 10, 10, 0.95)',
          backdropFilter: isAtTop && !menuOpen ? 'none' : 'blur(12px)',
          borderBottom:
            isAtTop && !menuOpen ? 'none' : '1px solid var(--color-border)',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
          willChange: 'transform',
        }}
      >
        {/* Brand — LDS: caja 1px estilo estudio, tamaño original */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, '/')}
          aria-label="Inicio — Leandro De Los Santos Aboy"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--type-mono)',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            textDecoration: 'none',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            position: 'relative',
            zIndex: 1001,
            lineHeight: 1,
            padding: '5px 9px',
            border: '1px solid rgba(255,255,255,0.28)',
            transition: 'border-color 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(200,240,77,0.55)';
            e.currentTarget.style.color = 'var(--color-accent-hot)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)';
            e.currentTarget.style.color = 'var(--color-text-primary)';
          }}
        >
          LDS
        </a>

        {/* Nav links — desktop (ocultos en mobile via .nav__links CSS) */}
        <nav aria-label="Navegación principal" className="nav__links">
          <ul
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(1.5rem, 3vw, 3rem)',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <NavLink
                  to={href}
                  onClick={(e) => handleNavClick(e, href)}
                  style={({ isActive }) => ({
                    fontFamily: 'var(--font-ui)',
                    fontSize: 'var(--type-label)',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isActive
                      ? 'var(--color-text-primary)'
                      : 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  })}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.classList.contains('active')) {
                      e.currentTarget.style.color = 'var(--color-text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.classList.contains('active')) {
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                    }
                  }}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger button — mobile (oculto en desktop via .nav__burger CSS) */}
        <button
          className="nav__burger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: 5,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 0',
            zIndex: 1001,
            position: 'relative',
          }}
        >
          <span
            style={{
              display: 'block',
              width: 24,
              height: 1,
              backgroundColor: 'var(--color-text-primary)',
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: 18,
              height: 1,
              backgroundColor: 'var(--color-text-primary)',
              transition: 'opacity 0.3s ease',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block',
              width: 24,
              height: 1,
              backgroundColor: 'var(--color-text-primary)',
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </header>

      {/* Overlay menu — mobile fullscreen */}
      <div
        ref={menuRef}
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--color-bg)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(24px, 6vw, 80px)',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_LINKS.map(({ label, href }) => (
            <li
              key={href}
              className="nav__overlay-item"
              style={{ marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)' }}
            >
              <NavLink
                to={href}
                onClick={(e) => handleNavClick(e, href)}
                style={({ isActive }) => ({
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 9vw, 64px)',
                  fontWeight: 700,
                  color: isActive
                    ? 'var(--color-accent-hot)'
                    : 'var(--color-text-primary)',
                  textDecoration: 'none',
                  display: 'block',
                  lineHeight: 1.1,
                  transition: 'color 0.2s ease',
                })}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Footer del overlay — hora + contacto */}
        <div
          className="nav__overlay-item"
          style={{
            position: 'absolute',
            bottom: 'clamp(2rem, 6vh, 4rem)',
            left: 'clamp(24px, 6vw, 80px)',
          }}
        >
          <a
            href={`https://wa.me/5491168116492?text=${encodeURIComponent(
              'Hola! Vi tu portfolio y me gustaría hablar de un proyecto.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--type-mono)',
              color: 'var(--color-text-secondary)',
              letterSpacing: 'var(--ls-mono)',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            WhatsApp ↗
          </a>
        </div>
      </div>
    </>
  );
}

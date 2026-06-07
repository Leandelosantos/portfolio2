// PageTransitionContext.jsx — Overlay curtain para page transitions
// Patrón: overlay slides up (in) → navigate → overlay slides up (out)
// Lima stripe en borde superior — efecto scanner

import { createContext, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { lenis } from '../lib/lenis';

const PageTransitionContext = createContext(null);

export function PageTransitionProvider({ children }) {
  const navigate = useNavigate();
  const overlayRef = useRef(null);

  const transitionTo = (path) => {
    const overlay = overlayRef.current;
    if (!overlay) {
      navigate(path);
      return;
    }

    gsap.timeline()
      // Overlay entra desde abajo
      .to(overlay, { yPercent: 0, duration: 0.45, ease: 'power3.inOut' })
      // Navegar + scroll top mientras overlay cubre pantalla
      .call(() => {
        navigate(path);
        lenis?.scrollTo(0, { immediate: true });
      })
      // Pausa breve antes de salir
      .to(overlay, {
        yPercent: -100,
        duration: 0.45,
        ease: 'power3.inOut',
        delay: 0.08,
      })
      // Reset para próxima transición
      .set(overlay, { yPercent: 100 });
  };

  return (
    <PageTransitionContext.Provider value={{ transitionTo }}>
      {children}

      {/* Overlay curtain — siempre en DOM, z-index bajo cursor */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9997,
          backgroundColor: 'var(--color-bg)',
          transform: 'translateY(100%)',
          willChange: 'transform',
          pointerEvents: 'none',
        }}
      >
        {/* Stripe lima en borde superior — visible al wipe in */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: 'var(--color-accent-hot)',
          }}
        />
      </div>
    </PageTransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(PageTransitionContext);

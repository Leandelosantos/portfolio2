// MouseContext.jsx — SRS §2.4 — Posición del mouse compartida entre cursor + Three.js
// Usa ref para evitar re-renders. Leer con mouseRef.current.{x,y,xNorm,yNorm}

import { createContext, useContext } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

const MouseContext = createContext(null);

export function MouseProvider({ children }) {
  const mouseRef = useMousePosition();

  return (
    <MouseContext.Provider value={mouseRef}>
      {children}
    </MouseContext.Provider>
  );
}

/**
 * @returns {React.MutableRefObject<{x,y,xNorm,yNorm}>}
 */
export function useMouse() {
  const ctx = useContext(MouseContext);
  if (!ctx) throw new Error('useMouse debe usarse dentro de MouseProvider');
  return ctx;
}

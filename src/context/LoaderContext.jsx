// LoaderContext.jsx — SRS §3.3 — Estado global del Loader
// Controla visibilidad de contenido principal hasta que el loader termina

import { createContext, useContext, useState } from 'react';

const LoaderContext = createContext(null);

export function LoaderProvider({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const ctx = useContext(LoaderContext);
  if (!ctx) throw new Error('useLoader debe usarse dentro de LoaderProvider');
  return ctx;
}

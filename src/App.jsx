// App.jsx — SRS §4.1 — Estructura de providers + rutas
// FASE 2: LoaderContext + MouseContext + CustomCursor + Navbar + Footer + SkipLink

import { lazy, Suspense, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Analytics } from '@vercel/analytics/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { muiTheme } from './theme/muiTheme';
import { LoaderProvider } from './context/LoaderContext';
import { MouseProvider } from './context/MouseContext';
import { PageTransitionProvider } from './context/PageTransitionContext';
import { Loader } from './components/sections/Loader';
import { CustomCursor } from './components/cursor/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SkipLink } from './components/ui/SkipLink';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { Home } from './pages/Home';

// Refresca ScrollTrigger en cada cambio de ruta (recalcula posiciones)
function ScrollRefresh() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    ScrollTrigger.refresh();
  }, [pathname]);
  return null;
}

// ── Páginas secundarias — lazy loaded ───────────────────────
const WorkList  = lazy(() => import('./pages/WorkList').catch(() => ({ default: () => <PagePlaceholder label="Proyectos" /> })));
const CaseStudy = lazy(() => import('./pages/CaseStudy').catch(() => ({ default: () => <PagePlaceholder label="Case Study" /> })));
const IAPage    = lazy(() => import('./pages/IAPage').catch(() => ({ default: () => <PagePlaceholder label="IA & Ecosistema" /> })));
const AboutPage = lazy(() => import('./pages/AboutPage').catch(() => ({ default: () => <PagePlaceholder label="Sobre mí" /> })));

const PagePlaceholder = ({ label }) => (
  <main
    id="main-content"
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-text-secondary)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--type-mono)',
      letterSpacing: 'var(--ls-mono)',
    }}
  >
    {label} — próximamente
  </main>
);

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <LoaderProvider>
        <MouseProvider>
          <BrowserRouter>
            <PageTransitionProvider>
              <ScrollRefresh />

              {/* Accesibilidad: skip link (visible en focus) */}
              <SkipLink />

              {/* Cursor personalizado — solo desktop (pointer: fine) */}
              <CustomCursor />

              {/* Loader de entrada — se monta sobre todo */}
              <Loader />

              {/* Navegación global */}
              <Navbar />

              {/* Rutas — SRS §4 / PROJECT_MEMORY rutas actualizadas */}
              <Suspense fallback={null}>
                <Routes>
                  <Route path="/"            element={<Home />} />
                  <Route path="/work"        element={<WorkList />} />
                  <Route path="/work/:slug"  element={<CaseStudy />} />
                  <Route path="/ia"          element={<IAPage />} />
                  <Route path="/sobre-mi"    element={<AboutPage />} />
                </Routes>
              </Suspense>

              {/* Footer global */}
              <Footer />

              {/* WhatsApp sticky — visible solo en mobile (< 768px) */}
              <WhatsAppButton />

              {/* Vercel Web Analytics — pageviews/visitantes, sin cookies */}
              <Analytics />
            </PageTransitionProvider>
          </BrowserRouter>
        </MouseProvider>
      </LoaderProvider>
    </ThemeProvider>
  );
}

export default App;

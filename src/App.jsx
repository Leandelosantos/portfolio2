// App.jsx — SRS §4.1 — Estructura de providers + rutas
// FASE 2: LoaderContext + MouseContext + CustomCursor + Navbar + Footer + SkipLink

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { muiTheme } from './theme/muiTheme';
import { LoaderProvider } from './context/LoaderContext';
import { MouseProvider } from './context/MouseContext';
import { Loader } from './components/sections/Loader';
import { CustomCursor } from './components/cursor/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SkipLink } from './components/ui/SkipLink';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { Home } from './pages/Home';

// ── Páginas secundarias — lazy loaded ───────────────────────
const WorkList  = lazy(() => import('./pages/WorkList').catch(() => ({ default: () => <PagePlaceholder label="Proyectos" /> })));
const CaseStudy = lazy(() => import('./pages/CaseStudy').catch(() => ({ default: () => <PagePlaceholder label="Case Study" /> })));
const IAPage    = lazy(() => import('./pages/IAPage').catch(() => ({ default: () => <PagePlaceholder label="IA & Ecosistema" /> })));
const AboutPage = lazy(() => import('./pages/AboutPage').catch(() => ({ default: () => <PagePlaceholder label="Sobre mí" /> })));
const ExhibicionesPage = lazy(() => import('./pages/ExhibicionesPage').catch(() => ({ default: () => <PagePlaceholder label="Exhibiciones" /> })));

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
                <Route path="/exhibiciones" element={<ExhibicionesPage />} />
              </Routes>
            </Suspense>

            {/* Footer global */}
            <Footer />

            {/* WhatsApp sticky — visible solo en mobile (< 768px) */}
            <WhatsAppButton />
          </BrowserRouter>
        </MouseProvider>
      </LoaderProvider>
    </ThemeProvider>
  );
}

export default App;

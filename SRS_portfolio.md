# Software Requirements Specification (SRS)
## Portfolio Personal — React + GSAP + Three.js
**Versión:** 1.0  
**Estado:** Definitivo / Listo para implementación  
**Stack:** React 18 + Vite 5 | GSAP 3 (ScrollTrigger, Flip, TextPlugin) | Three.js r165 | MUI v5

---

## 1. Introducción

### 1.1 Visión del Proyecto

Portfolio personal de desarrollador/diseñador full-stack con foco en conversión de clientes de alto valor. La experiencia debe comunicar capacidad técnica y sensibilidad estética en simultáneo — el sitio **es** la demostración del trabajo, no solo una descripción de él.

Referencia de feel: [artemiilebedev.com](https://artemiilebedev.com/) — dark, editorial, alta densidad visual controlada, navegación minimalista con peso en tipografía grande, proyectos como objetos de peso visual. Cada scroll event es intencionado.

### 1.2 Objetivos de Conversión

| Objetivo | Métrica de Éxito |
|---|---|
| Generar contacto directo (WhatsApp/formulario) | CTR ≥ 8% en sección Contact |
| Demostrar profundidad técnica sin texto genérico | Tiempo en página ≥ 3 min |
| Posicionamiento en búsquedas de nombre + especialidad | Core Web Vitals: LCP ≤ 2.5s |
| Establecer credibilidad por casos de estudio | Scroll depth ≥ 70% en proyectos |

### 1.3 Alcance Técnico

- **Frontend:** React 18 + Vite 5
- **Animaciones:** GSAP 3.12+ (ScrollTrigger, Flip, TextPlugin, SplitText)
- **3D:** Three.js r165 con `@react-three/fiber` + `@react-three/drei`
- **UI Components:** Material UI v5 (tokens redefinidos, no estilos por defecto)
- **Contacto:** Formulario estático (mailto/EmailJS) + botón WhatsApp directo
- **Backend:** ❌ No requerido
- **Base de datos:** ❌ No requerida
- **Deploy:** Vercel / Netlify (SPA estática)

---

## 2. Especificaciones de UI/UX

### 2.1 Paleta de Colores

```css
:root {
  /* Base */
  --color-bg:           #0A0A0A;   /* Negro profundo — fondo global */
  --color-bg-elevated:  #111111;   /* Cards y overlays */
  --color-bg-subtle:    #161616;   /* Secciones alternadas */

  /* Texto */
  --color-text-primary:   #F0EDE8; /* Blanco roto — jerarquía principal */
  --color-text-secondary: #8A8680; /* Gris cálido — metadata, labels */
  --color-text-muted:     #3D3B38; /* Muy sutil — separadores, placeholders */

  /* Acento */
  --color-accent:         #E8E0D4; /* Crema — hover states, subrayados */
  --color-accent-hot:     #C8F04D; /* Lima eléctrico — CTA único, cursor dot */
  --color-accent-mid:     #4D7CFF; /* Azul eléctrico — links activos */

  /* Borders */
  --color-border:         rgba(240,237,232,0.08);
  --color-border-hover:   rgba(240,237,232,0.20);

  /* Gradientes funcionales */
  --gradient-hero:    radial-gradient(ellipse 80% 50% at 50% -10%, #1a1a2e 0%, transparent 60%);
  --gradient-fade-b:  linear-gradient(to bottom, transparent, #0A0A0A);
}
```

**Lógica cromática:** Fondo casi-negro absoluto + texto blanco roto (no puro, evita fatiga visual). Acento lima (`#C8F04D`) SOLO en CTA y cursor — máximo contraste, máxima atención. Azul eléctrico para estado activo. Nunca más de 2 acentos simultáneos en viewport.

### 2.2 Tipografía

```css
/* Fuente Display — Headlines, nombres de proyecto, hero */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
/* Alt: "Cormorant Garamond" para feel más editorial */

/* Fuente UI — Body, labels, navegación, metadata */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

/* Fuente Mono — Tecnologías, timestamps, código */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
```

| Token | Fuente | Tamaño | Peso | Uso |
|---|---|---|---|---|
| `--type-display` | Playfair Display | clamp(56px, 8vw, 120px) | 900 | Hero heading |
| `--type-headline` | Playfair Display | clamp(32px, 4vw, 64px) | 700 | Títulos de sección |
| `--type-project` | Playfair Display | clamp(24px, 3vw, 48px) | 400 italic | Nombre de proyecto hover |
| `--type-body` | DM Sans | clamp(15px, 1.2vw, 18px) | 300/400 | Body copy |
| `--type-label` | DM Sans | 11px / 12px | 500 | Tags, categorías, años |
| `--type-mono` | JetBrains Mono | 13px | 400 | Stack tech, timestamps |

**Regla de jerarquía:** Máximo 3 niveles tipográficos simultáneos por sección. Contraste de tamaño ≥ 2x entre nivel 1 y nivel 2.

### 2.3 Jerarquía Visual y Layout

```
Layout base: CSS Grid — 12 columnas, gap: 24px, max-width: 1440px
Márgenes laterales: clamp(24px, 6vw, 120px)
Breakpoints: mobile 375px | tablet 768px | desktop 1280px | wide 1600px
```

**Principios de composición (extraídos de la referencia):**
- Texto grande como elemento gráfico, no solo informativo
- Proyectos como objetos visuales pesados — imagen/video dominan, texto es metadata
- Asimetría deliberada: columnas no iguales, elementos que rompen el grid intencionalmente
- Números de índice (`01`, `02`) como elementos decorativos tipográficos
- Timestamps y data contextual (hora local, ubicación) en navbar — humaniza
- Líneas divisoras `1px solid var(--color-border)` en lugar de separadores con volumen

### 2.4 Cursor Personalizado

```javascript
// Custom cursor: dot lima 8px + ring 40px con lag
// El ring sigue al dot con delay via GSAP quickTo
// En hover sobre proyectos: cursor cambia a "VIEW" text
// En hover sobre links: ring expande a 60px + blend-mode: exclusion
```

### 2.5 Componentes MUI — Override Strategy

MUI se usa **exclusivamente como base de accesibilidad y comportamiento**. Todos los estilos visuales se sobreescriben vía `sx` prop + theme tokens. No debe quedar ningún estilo MUI por defecto visible.

```javascript
// theme.js — overrides críticos
const theme = createTheme({
  palette: { mode: 'dark', background: { default: '#0A0A0A' } },
  typography: { fontFamily: '"DM Sans", sans-serif' },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,          // Sin border-radius — estética sharp
          textTransform: 'none',    // Sin uppercase forzado
          letterSpacing: '0.08em',
          fontFamily: '"JetBrains Mono", monospace',
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: { borderRadius: 0 }
      }
    }
  }
});
```

---

## 3. Plan de Animaciones (GSAP Focus)

### 3.1 Setup Global

```javascript
// main.jsx — registro obligatorio de todos los plugins
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Flip from 'gsap/Flip';
import TextPlugin from 'gsap/TextPlugin';
import SplitText from 'gsap/SplitText'; // Requiere licencia Club GSAP

gsap.registerPlugin(ScrollTrigger, Flip, TextPlugin, SplitText);

// Configuración global de ScrollTrigger
ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
```

### 3.2 Loader / Intro Sequence

**Duración total:** 1.8s  
**No skippable** en primera visita, skippable si `sessionStorage.has('visited')`

```
Timeline loader:
0.0s  → Counter numérico 0→100 (TextPlugin, ease: power2.inOut, 1.2s)
0.8s  → Nombre del dev aparece letra por letra (SplitText stagger: 0.04s)
1.2s  → Loader panel split-wipe hacia arriba (2 divs, stagger: 0.15s)
1.5s  → Hero content fade-in + slide-up (y: 40 → 0, opacity: 0 → 1)
1.8s  → Cursor activo, ScrollTrigger habilitado
```

### 3.3 Scroll Experience Completa

#### SECCIÓN: Hero

```javascript
// Hero — parallax de 3 capas independientes
gsap.to('.hero__bg-mesh',   { yPercent: -30, ease: 'none', scrollTrigger: { scrub: 1.5 } });
gsap.to('.hero__headline',  { yPercent: -15, ease: 'none', scrollTrigger: { scrub: 1 } });
gsap.to('.hero__subtext',   { yPercent: -8,  opacity: 0,   scrollTrigger: { scrub: 0.8, end: 'bottom 30%' } });

// Nombre con SplitText — reveal stagger al cargar
const split = new SplitText('.hero__name', { type: 'chars' });
gsap.from(split.chars, {
  opacity: 0, yPercent: 120, rotationZ: 8,
  stagger: 0.05, duration: 0.8, ease: 'back.out(1.4)',
  delay: 1.5 // post-loader
});
```

#### SECCIÓN: Work / Proyectos — Lista estilo Lebedev

```javascript
// Cada fila de proyecto: reveal al entrar en viewport
gsap.utils.toArray('.project-row').forEach((row, i) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: row,
      start: 'top 85%',
      once: true
    }
  });
  tl.from(row.querySelector('.project-row__index'), {
    opacity: 0, x: -20, duration: 0.4
  })
  .from(row.querySelector('.project-row__title'), {
    opacity: 0, y: 24, duration: 0.5, ease: 'power3.out'
  }, '-=0.2')
  .from(row.querySelector('.project-row__tags'), {
    opacity: 0, duration: 0.4
  }, '-=0.3')
  .from(row.querySelector('.project-row__line'), {
    scaleX: 0, transformOrigin: 'left',
    duration: 0.6, ease: 'power2.out'
  }, 0);
});

// Hover de fila: imagen preview aparece siguiendo el mouse
// Imagen posicionada absolute, sigue cursor con GSAP quickTo
const imgPreview = document.querySelector('.project-preview-img');
const xTo = gsap.quickTo(imgPreview, 'x', { duration: 0.5, ease: 'power3' });
const yTo = gsap.quickTo(imgPreview, 'y', { duration: 0.5, ease: 'power3' });
document.addEventListener('mousemove', (e) => { xTo(e.clientX); yTo(e.clientY); });
```

#### SECCIÓN: Proyecto Featured — Pinning + Reveal Horizontal

```javascript
// Sección pinneada: scroll horizontal dentro de pin vertical
ScrollTrigger.create({
  trigger: '.featured-pin',
  pin: true,
  start: 'top top',
  end: '+=300%',
  scrub: 1,
  onUpdate: (self) => {
    // Mueve carrusel horizontal basado en progreso de scroll vertical
    gsap.set('.featured-track', {
      x: -(self.progress * (trackWidth - viewportWidth))
    });
  }
});
```

#### SECCIÓN: About — Text Reveal por Palabras

```javascript
const aboutSplit = new SplitText('.about__paragraph', { type: 'words' });
gsap.from(aboutSplit.words, {
  opacity: 0,
  yPercent: 50,
  stagger: 0.02,
  duration: 0.5,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.about__paragraph',
    start: 'top 75%',
    once: true
  }
});
```

#### SECCIÓN: Skills / Services — Flip Animation

```javascript
// Grid de servicios que se reorganiza con GSAP Flip al filtrar
const state = Flip.getState('.service-card');
// ...cambio de clases para reordenar...
Flip.from(state, {
  duration: 0.6,
  ease: 'power1.inOut',
  stagger: 0.05,
  absolute: true
});
```

#### SECCIÓN: Contact — Entrance dramático

```javascript
gsap.timeline({
  scrollTrigger: { trigger: '.contact', start: 'top 60%', once: true }
})
.from('.contact__big-text', {
  yPercent: 100, duration: 1, ease: 'expo.out'
})
.from('.contact__form', {
  opacity: 0, y: 40, duration: 0.6
}, '-=0.4')
.from('.contact__whatsapp-btn', {
  opacity: 0, scale: 0.8, duration: 0.5, ease: 'back.out(1.7)'
}, '-=0.3');
```

### 3.4 Micro-interacciones

#### Botones

```javascript
// Botón CTA principal — magnetic effect
const btn = document.querySelector('.btn-cta');
btn.addEventListener('mousemove', (e) => {
  const rect = btn.getBoundingClientRect();
  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);
  gsap.to(btn, { x: dx * 0.3, y: dy * 0.3, duration: 0.3, ease: 'power2.out' });
});
btn.addEventListener('mouseleave', () => {
  gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
});

// Hover state interno del botón
// Background fill de izquierda a derecha (clip-path o pseudo-elemento)
// Color text flip via Flip plugin si hay dos capas de texto
```

#### Cards de Proyecto

```javascript
// Card hover: imagen scale up dentro de container (overflow hidden)
// Title desliza de abajo a arriba revelando subtítulo
// Border: de 0.08 opacity a 0.40 con transición 0.3s

gsap.to(card.querySelector('img'), {
  scale: 1.06, duration: 0.6, ease: 'power2.out',
  paused: true // controlado por hover events
});
```

#### Navbar

```javascript
// Navbar: ocultar al bajar, mostrar al subir (dirección de scroll)
// Umbral: >80px scrolled
let lastY = 0;
ScrollTrigger.create({
  onUpdate: (self) => {
    const currentY = self.scroll();
    if (currentY > lastY && currentY > 80) {
      gsap.to('.navbar', { yPercent: -100, duration: 0.3, ease: 'power2.in' });
    } else {
      gsap.to('.navbar', { yPercent: 0, duration: 0.4, ease: 'power2.out' });
    }
    lastY = currentY;
  }
});
```

### 3.5 Three.js — Escenas 3D

#### Hero Background — Mesh de Partículas

```javascript
// Escena: campo de partículas que reacciona a posición del mouse
// ~2000 partículas en BufferGeometry, shader custom con noise
// Mouse influence: radio 150px, fuerza 0.3 — suave, no distractivo
// Performance: instancedMesh si se necesitan > 5000 puntos
// Color: #E8E0D4 con opacity 0.4 sobre fondo negro

// react-three/fiber setup:
<Canvas
  dpr={[1, 1.5]}          // Max pixel ratio 1.5 — performance
  gl={{ antialias: false }} // Desactivar antialias para partículas
  camera={{ position: [0, 0, 5], fov: 75 }}
>
  <ParticleField mouseRef={mouseRef} count={2000} />
</Canvas>
```

#### Objeto 3D Central — Hero Statement

```javascript
// Objeto geométrico abstracto (e.g., torus knot distorsionado, geometría icosaédrica)
// Shader material: wireframe + fill parcial con gradiente de colores de paleta
// Rotación idle: 0.003 rad/frame en Y, 0.001 en X
// ScrollTrigger: al hacer scroll, objeto explota/implota usando morphTargets o scale
// Mouse parallax: rotación extra basada en mouse (0.05 factor)

useFrame(({ clock, mouse }) => {
  meshRef.current.rotation.y = clock.elapsedTime * 0.003 + mouse.x * 0.05;
  meshRef.current.rotation.x = clock.elapsedTime * 0.001 + mouse.y * 0.05;
});
```

#### Transición de Página — Three.js Wipe

```javascript
// Al navegar entre pages: render target con post-process
// Efecto: dissolve/noise-wipe custom en fragment shader
// Duración: 0.6s — no interrumpe UX, confirma la acción
// Implementado como HOC <PageTransition> que wrappea <Outlet>
```

---

## 4. Requerimientos Funcionales

### 4.1 Estructura de Navegación

```
/               → Home (scroll completo, todas las secciones)
/work           → Listado completo de proyectos
/work/:slug     → Case Study individual
/about          → Página About extendida (opcional, puede ser sección en home)
```

**Routing:** React Router v6 con `<BrowserRouter>`. Transiciones entre rutas via GSAP (ver §3.5).

### 4.2 Sección Hero

**Contenido:**
- Nombre completo como headline tipográfico gigante (display, full width)
- Rol/especialidad como subtítulo (una línea, DM Sans 300)
- Timestamp de hora local actual (live, actualiza cada minuto)
- Indicador de disponibilidad ("Available for work" / "Currently booked") — texto + dot animado
- CTA único: botón "Let's Talk" → scroll a Contact
- Background: escena Three.js de partículas (§3.5)

### 4.3 Sección Work — Lista de Proyectos

**Estructura de cada fila:**

```
[Índice 01]  [Nombre del Proyecto ————————————]  [Año]  [Tags: Web / 3D / Branding]
```

**Comportamiento:**
- Hover sobre fila: imagen preview aparece flotante siguiendo cursor
- Click: navega a case study individual
- Fila divisora `1px` aparece con animación `scaleX` al entrar en viewport
- Filtro por categoría (UI/UX, Dev, Branding, 3D) usando GSAP Flip para reordenar sin salto visual

**Datos de cada proyecto (JSON estático en `/src/data/projects.js`):**

```javascript
{
  id: 'project-slug',
  title: 'Nombre del Proyecto',
  year: 2024,
  category: ['Web', 'Development'],
  client: 'Nombre Cliente',
  thumbnail: '/assets/projects/project-slug/thumb.webp',
  video: '/assets/projects/project-slug/preview.mp4', // opcional
  problem: 'Problema que enfrentaba el cliente',
  solution: 'Solución implementada',
  results: ['KPI 1', 'KPI 2'],  // métricas reales si disponibles
  techStack: ['React', 'GSAP', 'Node.js'],
  liveUrl: 'https://...',       // opcional
  images: ['01.webp', '02.webp', '03.webp']
}
```

### 4.4 Case Study Individual (`/work/:slug`)

**Estructura del layout:**

```
1. Hero del caso: título grande + imagen hero full-width
2. Meta info: Cliente / Año / Servicios / URL (si aplica)
3. El Problema: párrafo, max 3 oraciones
4. La Solución: descripción técnica + proceso
5. Resultados: métricas o impacto (cards o lista visual)
6. Galería: grid de imágenes/videos del proyecto
7. Tech Stack: íconos + labels
8. Navegación: ← Proyecto anterior | Siguiente proyecto →
```

**Animaciones del case study:**
- Hero imagen: parallax sutil al scroll (yPercent: -15)
- Texto del problema: reveal palabra por palabra (§3.3)
- Galería: imágenes entran con scale + fade staggered
- Resultados: números cuentan de 0 al valor final (CountUp + ScrollTrigger)

### 4.5 Sección About

**Contenido:**
- Foto o objeto 3D representativo (posicionado a derecha o como background)
- Bio en 2-3 párrafos: quién sos, qué hacés, qué te diferencia
- Valores o forma de trabajo (lista minimalista, sin íconos genéricos)
- Stack tecnológico: tags visuales con nivel de dominio
- Links: GitHub, LinkedIn, CV descargable (PDF)

### 4.6 Sección Contact

**Dos canales paralelos presentados con igual peso visual:**

**Canal 1 — Formulario**
```
Campos: Nombre | Email | Mensaje (textarea libre) | Botón Enviar
Envío: Vercel Function (`/api/contact`) + Resend (server-side)
Validación: inline con feedback visual GSAP (shake en error, confirm state en éxito)
```

**Canal 2 — WhatsApp**
```javascript
// Botón con deep link personalizado
const WHATSAPP_NUMBER = '+549XXXXXXXXXX'; // número con código de país
const DEFAULT_MSG = encodeURIComponent('Hola! Vi tu portfolio y me gustaría hablar de un proyecto.');
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MSG}`;
// Botón: ícono WhatsApp + "Escribime directo" + indicador de tiempo de respuesta
```

**Headline de sección:** Texto enorme tipo Lebedev — "Let's Build Something" o equivalente, ocupa ~60% del viewport.

### 4.7 Footer

```
Línea 1: © 2025 [Nombre] | Hecho con React + GSAP
Línea 2: [LinkedIn] [GitHub] [Behance/Dribbble] 
Línea 3: "Back to top" con animación scroll suave
```

---

## 5. Requerimientos No Funcionales

### 5.1 Performance y 60fps

**Reglas hard para animaciones:**

```javascript
// SIEMPRE animar: transform (x, y, scale, rotation), opacity
// NUNCA animar: width, height, top, left, margin, padding, font-size
// GPU compositing: will-change: transform en elementos animados frecuentemente
// Pero: remover will-change después de la animación → .addEventListener('animationend', cleanup)
```

**Three.js performance budget:**
- Máx. polígonos escena hero: 50k tris
- Máx. draw calls: 10 por frame
- LOD obligatorio para objetos con > 5k polígonos
- `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))` — siempre

**Asset optimization:**
```
Imágenes:    .webp obligatorio | max 200kb por imagen | lazy loading con IntersectionObserver
Videos:      .mp4 H.264 + poster frame | max 3MB | autoplay: muted, loop, playsinline
Fuentes:     font-display: swap | preload de las 2 fuentes principales
JS bundles:  Code splitting por ruta via React.lazy() + Suspense
Total inicial: JS < 150kb gzipped (sin Three.js lazy)
Three.js:    importar de forma lazy, solo cuando el componente canvas monta
```

**Preloading strategy:**

```javascript
// Precargar assets críticos de hero en <head>
<link rel="preload" href="/fonts/playfair-900.woff2" as="font" crossOrigin />
<link rel="preload" href="/assets/hero-bg.webp" as="image" />

// Lazy load Three.js
const HeroCanvas = React.lazy(() => import('./components/HeroCanvas'));
```

### 5.2 SEO Técnico

```html
<!-- index.html — meta tags base -->
<title>[Nombre] — Full Stack Developer & Creative Technologist</title>
<meta name="description" content="Portfolio de [Nombre]. Desarrollo web, animaciones GSAP, experiencias 3D. Buenos Aires." />
<meta property="og:image" content="/og-cover.jpg" /> <!-- 1200x630px -->
<meta name="twitter:card" content="summary_large_image" />
<link rel="canonical" href="https://tudominio.com/" />

<!-- JSON-LD — Person schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[Nombre completo]",
  "jobTitle": "Full Stack Developer",
  "url": "https://tudominio.com",
  "sameAs": ["https://linkedin.com/in/...", "https://github.com/..."]
}
</script>
```

**Pre-rendering:** Configurar Vite plugin `vite-plugin-prerender` o desplegar en Vercel con SSG para `/`, `/work`, y cada `/work/:slug`.

### 5.3 Accesibilidad (a11y)

```javascript
// Motion reducida — OBLIGATORIO
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  gsap.globalTimeline.timeScale(0); // Detener todas las animaciones GSAP
  // O: reemplazar animaciones por opacity-only transitions
}

// Navegación por teclado
// - Todos los elementos interactivos: focus-visible con outline var(--color-accent-hot)
// - Skip link: "Saltar al contenido" visible en focus, oculto visualmente
// - Modal/drawer: focus trap con librería focus-trap-react

// Semántica HTML
// - <nav> para navegación, <main> para contenido, <section> con aria-label
// - Imágenes decorativas: alt="" (vacío)
// - Imágenes de proyecto: alt descriptivo del proyecto
// - Botones con solo íconos: aria-label obligatorio

// Contraste
// Texto primario sobre bg: ratio ≥ 7:1 (AAA)
// Texto secundario sobre bg: ratio ≥ 4.5:1 (AA)
// Verificar con: https://webaim.org/resources/contrastchecker/
```

### 5.4 Responsive Design

**Estrategia Mobile:**

```javascript
// GSAP en mobile: reducir complejidad, NO eliminar
// - Parallax: desactivar en < 768px (ScrollTrigger.matchMedia)
// - Three.js hero: reemplazar por imagen estática en < 768px (performance)
// - Partículas: reducir count de 2000 a 500 en mobile

ScrollTrigger.matchMedia({
  '(max-width: 767px)': () => {
    // Animaciones mobile: solo fade + y translate
    // Sin parallax multi-layer
    // Sin mouse tracking
  },
  '(min-width: 768px)': () => {
    // Animaciones desktop: full experience
  }
});
```

**Layout responsive de proyectos:**
- Desktop (≥1280px): lista horizontal con preview flotante
- Tablet (768-1279px): lista sin preview flotante, thumbnail inline
- Mobile (< 768px): cards verticales apiladas, swipe horizontal opcional

**Touch interactions:**
- Reemplazar hover previews por tap-to-reveal
- Swipe gestures en galería de case study (Swiper.js o custom touch handlers)
- Botón WhatsApp: sticky en mobile bottom-right corner

### 5.5 Core Web Vitals Targets

| Métrica | Target | Estrategia |
|---|---|---|
| LCP | ≤ 2.5s | Preload hero image/font, servidor CDN |
| FID/INP | ≤ 100ms | Code split, defer JS no crítico |
| CLS | ≤ 0.1 | Dimensiones explícitas en img/video, font fallback sizing |
| FPS animaciones | 60fps constante | will-change, GPU layers, sin layout thrash |

---

## 6. Arquitectura de Archivos

```
src/
├── assets/
│   ├── fonts/
│   └── projects/
│       └── [slug]/
│           ├── thumb.webp
│           ├── hero.webp
│           └── 01.webp ... 0N.webp
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── PageTransition.jsx
│   ├── cursor/
│   │   └── CustomCursor.jsx
│   ├── three/
│   │   ├── HeroCanvas.jsx       ← lazy loaded
│   │   ├── ParticleField.jsx
│   │   └── HeroObject.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── Work.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   └── ui/
│       ├── ProjectRow.jsx
│       ├── ProjectCard.jsx
│       ├── TagList.jsx
│       └── WhatsAppButton.jsx
├── pages/
│   ├── Home.jsx
│   ├── WorkList.jsx
│   └── CaseStudy.jsx
├── hooks/
│   ├── useGSAP.js           ← wrapper con cleanup automático
│   ├── useMousePosition.js
│   └── useReducedMotion.js
├── data/
│   └── projects.js          ← JSON estático de proyectos
├── styles/
│   ├── globals.css          ← CSS variables, reset
│   └── typography.css
├── utils/
│   ├── gsapHelpers.js       ← timelines reutilizables
│   └── splitTextHelpers.js
├── theme/
│   └── muiTheme.js          ← MUI theme override
├── App.jsx
└── main.jsx
```

### Hook `useGSAP` — Patrón crítico para React

```javascript
// hooks/useGSAP.js
// Siempre usar este hook en lugar de useEffect para GSAP
// Garantiza cleanup de ScrollTriggers y timelines al desmontar

import { useGSAP } from '@gsap/react'; // paquete oficial
// Registrar: gsap.registerPlugin(useGSAP)
// Uso:
useGSAP(() => {
  // todo el código GSAP va aquí
  // cleanup automático al desmontar
}, { scope: containerRef }); // scope = contenedor del componente
```

---

## 7. Dependencias del Proyecto

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.24.0",
    "gsap": "^3.12.5",
    "@gsap/react": "^2.1.1",
    "three": "^0.165.0",
    "@react-three/fiber": "^8.16.8",
    "@react-three/drei": "^9.108.0",
    "@mui/material": "^5.16.0",
    "@emotion/react": "^11.13.0",
    "@emotion/styled": "^11.13.0",
    "emailjs-com": "^3.2.0"
  },
  "devDependencies": {
    "vite": "^5.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "vite-plugin-prerender": "^1.0.0"
  }
}
```

**Nota sobre SplitText:** Requiere licencia GSAP Club (gratuita para proyectos personales/portfolios en [gsap.com/community/licenses](https://gsap.com/community/licenses/)).

---

## 8. Checklist de Implementación

```
[ ] Setup Vite + React + GSAP plugins registrados
[ ] CSS variables globales definidas (paleta completa)
[ ] MUI theme override aplicado (cero estilos default visibles)
[ ] CustomCursor implementado (dot + ring, quickTo)
[ ] Loader sequence funcionando con sessionStorage check
[ ] Navbar con hide-on-scroll GSAP
[ ] Hero: headline SplitText + Three.js canvas lazy loaded
[ ] Partículas Three.js: mouse reactivo + scroll parallax
[ ] Work list: rows con preview imagen en mouse
[ ] GSAP Flip para filtro de proyectos
[ ] Horizontal scroll con pin en sección featured
[ ] Case study: all scroll animations
[ ] Contact: formulario EmailJS + WhatsApp deeplink
[ ] prefers-reduced-motion implementado
[ ] Imágenes convertidas a .webp
[ ] OG tags + JSON-LD schema
[ ] Responsive breakpoints verificados (375, 768, 1280, 1600)
[ ] Lighthouse score: Performance ≥ 90, Accessibility ≥ 95
[ ] Deploy en Vercel con dominio custom
```

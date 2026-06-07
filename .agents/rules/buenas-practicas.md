---
trigger: always_on
---

# Guía de Buenas Prácticas de Desarrollo
## Portfolio Personal — React + GSAP + Three.js
**Stack:** React 18 + Vite 5 | GSAP 3.12+ | Three.js r165 | MUI v5 | Sin backend, sin DB

---

## 1. Arquitectura y Patrones

**Custom Hook Pattern** — Toda lógica de animación, estado y efectos vive en hooks. Componentes solo renderizan. Si un componente supera 150 líneas, extraer lógica a hook. Si un hook supera 80 líneas, evaluar si hace más de una cosa.

**Data Layer Pattern** — Componentes nunca importan datos directamente. Todo pasa por `/src/data/projects.js`. Si se conecta un CMS en el futuro, solo cambia el data layer.

**Strategy Pattern en animaciones** — Variantes de animación como objetos intercambiables, no hardcodeadas por componente.

```javascript
// utils/gsapHelpers.js
export const REVEAL_STRATEGIES = {
  fadeUp:    { opacity: 0, y: 40,        duration: 0.6, ease: 'power3.out' },
  splitChar: { opacity: 0, yPercent: 120, rotationZ: 8, stagger: 0.05 },
  lineWipe:  { scaleX: 0, transformOrigin: 'left', duration: 0.6 },
};
```

**Observer via ScrollTrigger** — Efectos secundarios del scroll se suscriben de forma independiente. Nunca encadenar efectos no relacionados en el mismo ScrollTrigger.

**Inyección de Dependencias en hooks** — Hooks reciben refs como parámetros para ser testeables.

```javascript
// ✅ Testeable
const useParallax = (containerRef, config = {}) => { ... };
// ❌ Acoplado
const useParallax = () => { const ref = useRef(null); ... };
```

---

## 2. Estructura de Archivos

```
src/
├── components/
│   ├── layout/       Navbar.jsx | Footer.jsx | PageTransition.jsx
│   ├── cursor/       CustomCursor.jsx
│   ├── three/        HeroCanvas.jsx (lazy) | ParticleField.jsx | HeroObject.jsx
│   ├── sections/     Hero.jsx | Work.jsx | About.jsx | Contact.jsx
│   └── ui/           ProjectRow.jsx | ProjectCard.jsx | TagList.jsx | WhatsAppButton.jsx
├── pages/            Home.jsx | WorkList.jsx | CaseStudy.jsx
├── hooks/            useGSAP.js | useMousePosition.js | useReducedMotion.js | useProjects.js
├── data/             projects.js  ← única fuente de verdad
├── styles/           globals.css | typography.css
├── utils/            gsapHelpers.js | splitTextHelpers.js
├── theme/            muiTheme.js
├── App.jsx           Router + PageTransition + CustomCursor
└── main.jsx          GSAP plugins register + React root
```

---

## 3. Reglas de Código

### Componentes
Lógica en hooks, componentes solo renderizan. No usar `useState` para valores derivables — usar `useMemo`. Evitar prop drilling > 2 niveles: usar Context para estado compartido (loaderComplete, activeFilter, mousePosition).

### GSAP — Crítico
- **Siempre `useGSAP` de `@gsap/react`**, nunca `useEffect` para GSAP. Garantiza cleanup de ScrollTriggers al desmontar.
- **Solo propiedades GPU:** `x, y, scale, rotation, opacity`. Nunca `width, height, top, left, margin`.
- **`will-change`:** agregar en `onStart`, remover en `onComplete`.
- **SplitText:** siempre guardar instancia y llamar `revert()` en el return del hook.

```javascript
useGSAP(() => {
  const split = new SplitText('.hero__name', { type: 'chars' });
  gsap.from(split.chars, { opacity: 0, yPercent: 120, stagger: 0.05 });
  return () => split.revert(); // obligatorio
}, { scope: containerRef });
```

### Three.js
- **Lazy load obligatorio** — ~600kb, nunca en el bundle inicial.
- `dpr={[1, 1.5]}` y `antialias: false` en todas las escenas de partículas.
- `dispose()` de geometrías, materiales y texturas al desmontar.
- Pausar render loop cuando el canvas no está en viewport.
- Budget escena hero: máx. 50k triángulos, máx. 10 draw calls.

```javascript
const HeroCanvas = React.lazy(() => import('./components/three/HeroCanvas'));
// En Hero.jsx:
<Suspense fallback={<div className="hero__canvas-placeholder" />}>
  <HeroCanvas mouseRef={mouseRef} />
</Suspense>
```

### Formulario de Contacto
React Hook Form + EmailJS. Validación inline (UX). Botón submit deshabilitado durante envío. Feedback GSAP en éxito (fade-out form → fade-in confirmación) y error (shake horizontal).

### Variables de Entorno
Keys de EmailJS y número WhatsApp en `.env.local`. Nunca hardcodeadas. `.env.local` en `.gitignore`. `.env.example` documentado.

```
VITE_EMAILJS_SERVICE_ID=service_xxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxx
VITE_WHATSAPP_NUMBER=+549XXXXXXXXXX
```

`console.log` solo en `import.meta.env.DEV`. Prohibido en producción.

---

## 4. UX/UI

**Visibilidad de estado:** loader con counter 0→100, formulario con `isSubmitting`, imágenes con placeholder lazy.

**Jerarquía visual:** tipografía display guía el ojo. Proyectos son objetos visuales — imagen domina, texto es metadata. Nunca dos elementos del mismo peso visual compitiendo en el mismo viewport.

**Color:** acento lima `#C8F04D` SOLO en CTA + cursor dot. Nunca más de 2 acentos simultáneos en viewport.

**Contraste mínimo:** texto primario ≥ 7:1 (AAA), texto secundario ≥ 4.5:1 (AA). El color nunca es el único indicador de estado.

**Microinteracciones:** transiciones 150–300ms. Magnetic effect en botón CTA. Todos los botones con estados `hover`, `active` y `disabled` visibles.

**Responsive — degradación por breakpoint:**

| Breakpoint | Three.js | Parallax | Preview hover |
|---|---|---|---|
| ≥ 1280px | Escena completa, 2000 partículas | Multi-capa | Imagen sigue cursor |
| 768–1279px | 1000 partículas | 1 capa | Desactivado, thumbnail inline |
| < 768px | Imagen estática | Desactivado | Tap-to-reveal |

Elementos táctiles mínimo 44×44px. Botón WhatsApp sticky en mobile bottom-right.

---

## 5. Performance y 60fps

```
Imágenes:  .webp | max 200kb | dimensiones explícitas
Videos:    .mp4 H.264 | poster obligatorio | max 3MB | muted loop playsinline
Fuentes:   preload Playfair Display 900 + DM Sans 400 | font-display: swap
JS bundle: < 150kb gzipped sin Three.js | code split por ruta con React.lazy
```

**Core Web Vitals:**

| Métrica | Target | Estrategia |
|---|---|---|
| LCP | ≤ 2.5s | Preload hero font + image, CDN Vercel |
| INP | ≤ 100ms | Code split, defer Three.js |
| CLS | ≤ 0.1 | Dimensiones explícitas en img/video |
| FPS | 60fps | Propiedades GPU only, sin layout thrash |

---

## 6. SEO y Accesibilidad

**SEO:** `<title>` y `<meta description>` únicos por página. OG tags + Twitter Card. JSON-LD Person schema. Pre-rendering con `vite-plugin-prerender` para `/`, `/work`, y cada `/work/:slug` — sin esto, crawlers ven página vacía. `<h1>` único por página.

**Accesibilidad:**
- `prefers-reduced-motion` → `gsap.globalTimeline.timeScale(0)` en `main.jsx`. Obligatorio.
- `focus-visible: outline: 2px solid var(--color-accent-hot)` en todos los elementos interactivos.
- Skip link: "Saltar al contenido principal" → `#main-content`.
- `aria-label` en botones con solo íconos. `alt=""` en imágenes decorativas, alt descriptivo en imágenes de proyectos.
- Semántica: `<nav>`, `<main id="main-content">`, `<section aria-label>`.

---

## 7. Testing

**Pirámide:**
- **Unit:** helpers de GSAP, data layer `projects.js`, utils de filtrado
- **Integration:** `useProjects` (filtro + GSAP Flip), `useReducedMotion`, formulario con React Testing Library
- **E2E:** Home → Work → Case Study → Contact, formulario éxito/error, URL WhatsApp correcta

Patrón AAA: Arrange → Act → Assert. Tests independientes entre sí. Cobertura mínima 70% en hooks y utils.

---

## 8. Git

**Branches:** `main` (prod) | `develop` | `feature/xxx` | `fix/xxx` | `content/xxx` (proyectos en data layer)

**Commits:** `feat:` | `fix:` | `refactor:` | `perf:` | `content:` | `chore:` | `docs:`

Un commit = un cambio lógico. PRs ≤ 400 líneas. Nunca commitear `.env.local`, assets sin optimizar (img > 200kb, video > 3MB), ni keys de servicios.

---

## 9. Checklist de Calidad

**Código**
☐ Sin lógica GSAP en componentes — todo en hooks
☐ `useGSAP` en lugar de `useEffect` para todo código GSAP
☐ Cleanup: `split.revert()` y `dispose()` en todos los componentes con animaciones
☐ Keys en `.env.local` | `.env.local` en `.gitignore` | `.env.example` documentado
☐ Sin `console.log` en producción

**Performance**
☐ Solo propiedades GPU animadas (transform, opacity)
☐ Three.js lazy loaded — no en bundle inicial
☐ `dpr={[1, 1.5]}` en todos los `<Canvas>`
☐ Imágenes `.webp` con dimensiones explícitas | videos con `poster`
☐ Fuentes críticas en `preload`

**UX / Accesibilidad**
☐ `prefers-reduced-motion` en `main.jsx`
☐ Responsive verificado: 375 / 768 / 1280 / 1600px
☐ Táctiles ≥ 44×44px en mobile | WhatsApp sticky
☐ `focus-visible` + skip link + `aria-label` en íconos
☐ Formulario: estados carga / éxito / error | submit deshabilitado durante envío
☐ Contraste WCAG AA verificado

**SEO / Deploy**
☐ OG tags + JSON-LD + pre-rendering configurado
☐ `vercel.json` con security headers
☐ Lighthouse: Performance ≥ 90 | Accessibility ≥ 95 | SEO ≥ 95
☐ README con setup y deploy

---

*"El portfolio es el producto. Cada decisión técnica es diseño."*
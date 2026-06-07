# senior-qa — Contexto del Proyecto Portfolio

> LEER ANTES que el SKILL.md. QA específico para este proyecto — sin backend, sin tests automatizados.

## Alcance del QA en este proyecto

**SÍ aplica:**
- Verificación visual (responsive, animaciones, contraste)
- Core Web Vitals con Lighthouse
- Accesibilidad manual (teclado, lector de pantalla)
- Verificación de variables de entorno
- Build sin errores + bundle size

**NO aplica:**
- Unit tests / integration tests / E2E (no en el alcance actual)
- Tests de API / base de datos (no existe backend)
- Coverage de código

## Checklist de QA — buenas-practicas §9 (COMPLETO)

### Código
- [ ] Sin lógica GSAP en componentes — todo en hooks
- [ ] `useGSAP` en lugar de `useEffect` para todo código GSAP
- [ ] Cleanup: `split.revert()` y `dispose()` en todos los componentes con animaciones
- [ ] Keys en `.env.local` | `.env.local` en `.gitignore` | `.env.example` documentado
- [ ] Sin `console.log` en producción (solo en `import.meta.env.DEV`)

### Performance
- [ ] Solo propiedades GPU animadas (transform, opacity)
- [ ] Three.js lazy loaded — verificar en Network tab (chunk separado)
- [ ] `dpr={[1, 1.5]}` en todos los `<Canvas>`
- [ ] Imágenes `.webp` con dimensiones explícitas
- [ ] Videos con `poster` obligatorio
- [ ] Fuentes críticas en `preload` (Playfair 900, DM Sans 400)

### UX / Accesibilidad — SRS §5.3
- [ ] `prefers-reduced-motion` activo (en `main.jsx` — verificar)
- [ ] Responsive verificado: 375 / 768 / 1280 / 1600px
- [ ] Táctiles ≥ 44×44px en mobile
- [ ] WhatsApp sticky visible en mobile bottom-right
- [ ] `focus-visible` con `--color-accent-hot` en todos los interactivos
- [ ] Skip link "Saltar al contenido" visible en focus
- [ ] `aria-label` en botones con solo íconos
- [ ] `alt=""` en imágenes decorativas, alt descriptivo en proyectos
- [ ] Semántica: `<nav>`, `<main id="main-content">`, `<section aria-label>`
- [ ] Formulario: estados carga / éxito / error | submit deshabilitado durante envío
- [ ] Contraste WCAG AA verificado (texto primario ≥ 7:1, secundario ≥ 4.5:1)

### SEO / Deploy
- [ ] OG tags completos (título, descripción, imagen 1200×630)
- [ ] JSON-LD Person schema válido
- [ ] `vercel.json` con SPA rewrite + security headers
- [ ] `<h1>` único por página
- [ ] `<title>` y `<meta description>` únicos por ruta

## Core Web Vitals targets — SRS §5.5

| Métrica | Target | Herramienta |
|---|---|---|
| LCP | ≤ 2.5s | Lighthouse |
| INP | ≤ 100ms | Lighthouse |
| CLS | ≤ 0.1 | Lighthouse |
| FPS animaciones | 60fps | DevTools Performance |
| JS bundle inicial | < 150kb gzipped | Vite build output |
| Three.js | Chunk separado | Network tab |

## Lighthouse mínimos para aprobar deploy

```
Performance:    ≥ 90
Accessibility:  ≥ 95
Best Practices: ≥ 90
SEO:            ≥ 95
```

## Cómo correr Lighthouse

```bash
# Local (requiere Chrome)
npx lighthouse http://localhost:5173 --view

# O: DevTools → Lighthouse → Mobile → Analyze
```

## Verificación de bundle (FASE 8)

```bash
npm run build
# Verificar en output:
# - dist/assets/index-*.js < 150kb gzipped
# - Three.js en chunk separado (no en index)
# - react-vendor, gsap-vendor, mui-vendor como chunks independientes
```

## Checklist de animaciones

- [ ] Loader: 1.8s total, sin bloqueo de interacción
- [ ] Cursor: no aparece en touch devices (`pointer: coarse`)
- [ ] Navbar: hide/show en scroll, sin flash al cargar
- [ ] Hero parallax: desactivado en mobile
- [ ] Work rows: scaleX reveal visible, preview imagen sigue cursor
- [ ] Contact entrance: `yPercent: 100` visible
- [ ] `prefers-reduced-motion`: todas las animaciones detenidas si está activo

## Verificación de variables de entorno

```bash
# Verificar que .env.local existe y tiene todas las keys
cat .env.example  # Ver qué se necesita
# Verificar que .env.local NO está en git
git status  # No debe aparecer .env.local
```

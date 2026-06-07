# senior-architect — Contexto del Proyecto Portfolio

> LEER ANTES que el SKILL.md genérico. Estas reglas SOBREESCRIBEN cualquier sugerencia genérica.

## Alcance de esta skill en el proyecto

**SOLO FASE 1** — Setup, estructura de archivos, decisiones técnicas, config base.
**NO aplicar** a componentes individuales. Desactivar implícitamente al salir de Fase 1.

## Stack real del proyecto (NO cambiar)

```
React 18 + Vite 5 (SPA estática, sin SSR, sin Next.js)
GSAP 3.12 + @gsap/react
Three.js r165 + @react-three/fiber + @react-three/drei
MUI v5 (solo base de accesibilidad — estilos 100% sobreescritos)
split-type (reemplaza SplitText de Club GSAP)
@emailjs/browser (sin backend, formulario client-side)
react-hook-form
react-router-dom v6
```

## Lo que NO existe en este proyecto

- ❌ Backend / API / servidor
- ❌ Base de datos
- ❌ Docker / Kubernetes / AWS / cloud infra
- ❌ GraphQL
- ❌ SSR / SSG / Next.js
- ❌ React Native / mobile nativo
- ❌ Tests automatizados (no en el alcance actual)
- ❌ CI/CD (solo deploy manual en Vercel)

## Deploy target

**Vercel** — SPA estática. `vercel.json` ya configurado con:
- SPA rewrite: `/* → /index.html`
- Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy

## Estructura de archivos — APROBADA, no cambiar

```
src/
├── assets/projects/[slug]/     ← imágenes webp del proyecto
├── components/
│   ├── layout/                 ← Navbar, Footer, PageTransition
│   ├── cursor/                 ← CustomCursor
│   ├── three/                  ← HeroCanvas (lazy), ParticleField, HeroObject
│   ├── sections/               ← Loader, Hero, Work, FeaturedProject, About, Contact
│   └── ui/                     ← ProjectRow, ProjectCard, TagList, WhatsAppButton, CountUp, SkipLink
├── pages/                      ← Home, WorkList, CaseStudy
├── hooks/                      ← useMousePosition, useReducedMotion, useProjects, useNavbarBehavior, useParallax, useLocalTime
├── context/                    ← LoaderContext, MouseContext, FilterContext
├── data/projects.js            ← ÚNICA fuente de verdad de proyectos
├── styles/                     ← globals.css, typography.css
├── utils/                      ← gsapHelpers.js, splitTextHelpers.js
├── theme/muiTheme.js
├── App.jsx
└── main.jsx
```

## Rutas — APROBADAS

```
/           → Home (todas las secciones en scroll)
/work       → Proyectos lista Lebedev completa
/work/:slug → Case Study individual
/ia         → IA & Ecosistema
/sobre-mi   → About
```

## Principios arquitectónicos del proyecto

1. **Data Layer Pattern**: componentes nunca importan datos directamente — todo vía `data/projects.js`
2. **Hook Pattern**: lógica de animación en hooks, componentes solo renderizan
3. **Context API** (sin Redux/Zustand): LoaderContext, MouseContext, FilterContext
4. **Code splitting**: `React.lazy()` para Three.js (obligatorio) y páginas secundarias
5. **CSS variables** del SRS §2.1 — NUNCA colores hardcodeados en componentes

## Decisión ya tomada: sin backend

El formulario de contacto usa EmailJS client-side. No implementar ni sugerir backend alternativo.

## Performance budget

```
JS bundle inicial: < 150kb gzipped (sin Three.js)
Three.js: lazy loaded, chunk separado
Imágenes: .webp, max 200kb
Videos: .mp4, max 3MB
LCP: ≤ 2.5s
INP: ≤ 100ms
```

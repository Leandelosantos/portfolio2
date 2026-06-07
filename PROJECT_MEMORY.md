# PROJECT_MEMORY.md — Portfolio Personal
**Última actualización:** 2026-06-06
**Sesión:** 2

---

## Estado de fases

| Fase | Estado | Notas |
|---|---|---|
| FASE 1 — Setup | ✅ Completo | Build exitoso, 916 módulos, code splitting OK |
| FASE 2 — Base visual | ✅ Completo | Build OK — index.js 38.96kb gzip (< 150kb target) |
| FASE 3 — Animaciones hero | ✅ Completo | Hero 50/50, split-type, parallax, GSAP reveal |
| FASE 4 — 3D | ✅ Completo | HeroCanvas lazy, chunk 217kb gzip separado ✅ |
| FASE 5 — Secciones | ✅ Completo | Build OK — index.js 55.56kb gzip, WorkList lazy 1.42kb |
| FASE 6 — Mobile | ✅ Completo | Build OK — hamburger Navbar, hero 1col mobile, ProjectRow simplificado, WhatsApp montado |
| FASE 7 — Review | ✅ Completo | code-reviewer + clean-code + senior-qa pasados. Build limpio, cero console.log, a11y OK |
| FASE 8 — Deploy | ⬜ Pendiente | Vercel, dominio portfolioleandro.vercel.app |

---

## Componentes completados

| Componente | Archivo | Fase | Skills aplicadas | Notas |
|---|---|---|---|---|
| splitTextHelpers | src/utils/splitTextHelpers.js | FASE 2 | frontend-design | split-type abstraction |
| gsapHelpers | src/utils/gsapHelpers.js | FASE 2 | frontend-design, gsap-scrolltrigger | REVEAL_STRATEGIES + counter |
| useReducedMotion | src/hooks/useReducedMotion.js | FASE 2 | senior-qa | sync con OS en tiempo real |
| useMousePosition | src/hooks/useMousePosition.js | FASE 2 | frontend-design | ref (no state) — sin re-renders |
| useNavbarBehavior | src/hooks/useNavbarBehavior.js | FASE 2 | frontend-design | rAF + threshold 10px |
| useLocalTime | src/hooks/useLocalTime.js | FASE 2 | frontend-design | Buenos Aires UTC-3, ART |
| LoaderContext | src/context/LoaderContext.jsx | FASE 2 | frontend-design | isLoaded + setIsLoaded |
| MouseContext | src/context/MouseContext.jsx | FASE 2 | frontend-design | ref compartida cursor + Three.js |
| SkipLink | src/components/ui/SkipLink.jsx | FASE 2 | senior-qa | a11y — visible en focus |
| Loader | src/components/sections/Loader.jsx | FASE 2 | gsap-scrolltrigger, frontend-design | 1.8s, counter + split-type + wipe |
| CustomCursor | src/components/cursor/CustomCursor.jsx | FASE 2 | frontend-design, gsap-scrolltrigger | dot 8px lima + ring 40px, quickTo |
| Navbar | src/components/layout/Navbar.jsx | FASE 2 | frontend-design, gsap-scrolltrigger | hide/show scroll, 4 links Figma |
| Footer | src/components/layout/Footer.jsx | FASE 2 | frontend-design | hora local ART, sociales |
| App | src/App.jsx | FASE 2 | senior-architect | providers + rutas todas definidas |
| ImpactoReal | src/components/sections/ImpactoReal.jsx | FASE 5 | frontend-design, gsap-scrolltrigger | bento 4 servicios, stagger reveal |
| SelectedWork | src/components/sections/SelectedWork.jsx | FASE 5 | frontend-design, gsap-scrolltrigger | top-4 Lebedev, quickTo preview hover |
| Contact | src/components/sections/Contact.jsx | FASE 5 | frontend-design, gsap-scrolltrigger | RHF + EmailJS + WhatsApp, yPercent clip |
| ProjectRow | src/components/ui/ProjectRow.jsx | FASE 5 | frontend-design | fila Lebedev compartida SelectedWork/WorkList |
| WhatsAppButton | src/components/ui/WhatsAppButton.jsx | FASE 5 | mobile-design | sticky mobile, isMobile guard |
| WorkList | src/pages/WorkList.jsx | FASE 5 | frontend-design, gsap-scrolltrigger | lista completa + Flip filter categorías |
| Home | src/pages/Home.jsx | FASE 5 | frontend-design | Hero+ImpactoReal+SelectedWork+Contact |

---

## Datos del proyecto confirmados

| Campo | Valor |
|---|---|
| NOMBRE_COMPLETO | Leandro De Los Santos Aboy |
| WHATSAPP | +5491168116492 |
| EMAILJS_SERVICE_ID | Pendiente (configurar antes de FASE 5) |
| EMAILJS_TEMPLATE_ID | Pendiente |
| EMAILJS_PUBLIC_KEY | Pendiente |
| DOMINIO_DEPLOY | portfolioleandro.vercel.app |
| GITHUB_URL | https://github.com/Leandelosantos |
| LINKEDIN_URL | https://www.linkedin.com/in/leandrodelossantosaboy/ |
| ROL_HERO | Software Developer & Project Manager |

---

## Decisiones arquitectónicas tomadas

| Decisión | Motivo | Alternativa descartada |
|---|---|---|
| `split-type` en lugar de SplitText | Sin licencia Club GSAP | SplitText |
| `@emailjs/browser` en lugar de `emailjs-com` | Paquete activo, misma API | emailjs-com (deprecated) |
| `vite-plugin-prerender` omitido en FASE 1 | Compatibilidad Vite 5 incierta | Evaluar en FASE 8 |
| MUI `disableRipple: true` global | Inconsistente con estética del proyecto | default ripple |
| Hero: tagline "Ingeniería como Arte" + 3D derecha | Figma (aprobado por usuario) | SRS: nombre como headline full-width |
| Work: lista Lebedev (filas + línea divisora) | SRS + usuario (puede cambiar a cards Figma después) | Grid de cards Figma |
| Página IA incluida | Usuario lo confirmó | Solo páginas del SRS |
| Brand name en footer: nombre del dev | Usuario (reemplaza "MONOLITH_" del Figma) | MONOLITH_ placeholder |
| Nav links: Proyectos, IA, Exhibiciones, Sobre mí | Figma (aprobado) | SRS: Work, About |
| MouseContext usa ref (no state) | Evita re-render en cada mousemove | useState |
| Navbar hide/show via useGSAP (no CSS transition) | Control preciso del timing | CSS transition |

## Divergencias Figma vs SRS — RESUELTAS

| # | Elemento | Decisión final |
|---|---|---|
| 1-2 | Hero | "Ingeniería como Arte" + 3D a la derecha (Figma) |
| 3-4 | Navegación + página IA | Incluir página IA. Nav del Figma |
| 5 | Work section | Lista Lebedev (SRS), puede cambiar a cards Figma después |
| 6 | Bento "Impacto Real" | Incluir (está en Figma Home) |
| 7 | Contact headline | "Iniciemos el diálogo." (Figma) |
| 8 | Brand name | Nombre del dev (Leandro De Los Santos Aboy) |

## Estructura de rutas actualizada

```
/              → Home (Hero + Impacto Real + Selected Work)
/work          → Proyectos lista Lebedev completa
/work/:slug    → Case Study individual
/ia            → IA & Ecosistema (página del Figma)
/sobre-mi      → About
/exhibiciones  → Exhibiciones (placeholder)
```

## Proyectos en Figma (usar como base para data/projects.js)

- DiamondRose Sanctuary
- Vital Stats App
- Sistema de Diseño
- Bold Flavor
- Semantic Search Engine (en página IA)
- Autonomous Code Reviewer (en página IA)

## Servicios del Figma (para sección Services)

- Ingeniería Web
- Sistemas de Diseño
- Experiencias 3D
- Optimización IA

---

## Pendientes no bloqueantes

- EmailJS: configurar cuenta antes de FASE 5
- Contenido real de proyectos (reemplazar placeholders en data/projects.js)
- og-cover.jpg (1200×630px) para OG meta
- Fuentes locales: public/fonts/playfair-900.woff2 + dm-sans-400.woff2

---

## Próxima sesión — continuar en

- Fase actual: FASE 8 — Deploy
- Próximo: `vercel deploy` o Vercel Dashboard → conectar repo → configurar env vars EmailJS
- Bloqueantes: EmailJS keys (VITE_EMAILJS_SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY) — configurar en Vercel Dashboard antes de deploy

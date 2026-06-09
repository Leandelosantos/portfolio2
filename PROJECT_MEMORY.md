# PROJECT_MEMORY.md — Portfolio Personal
**Última actualización:** 2026-06-08
**Sesión:** 3

---

## Estado de fases

| Fase | Estado | Notas |
|---|---|---|
| FASE 1 — Setup | ✅ Completo | Build exitoso, 916 módulos, code splitting OK |
| FASE 2 — Base visual | ✅ Completo | Build OK — index.js 38.96kb gzip (< 150kb target) |
| FASE 3 — Animaciones hero | ✅ Completo | Hero 50/50, split-type, parallax, GSAP reveal |
| FASE 4 — 3D | ✅ Completo | HeroCanvas lazy, chunk 218kb gzip separado ✅ |
| FASE 5 — Secciones | ✅ Completo | Build OK — index.js 55.56kb gzip, WorkList lazy 1.42kb |
| FASE 6 — Mobile | ✅ Completo | Build OK — hamburger Navbar, hero 1col mobile, ProjectRow simplificado, WhatsApp montado |
| FASE 7 — Review | ✅ Completo | code-reviewer + clean-code + senior-qa pasados. Build limpio, cero console.log, a11y OK |
| FASE 8 — Deploy | ⬜ Pendiente | Vercel, dominio portfolioleandro.vercel.app |
| IAPage | ✅ Completo | Página /ia completa con 3D casco GLB funcionando |

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
| CustomCursor | src/components/cursor/CustomCursor.jsx | FASE 2 | frontend-design, gsap-scrolltrigger | dot 8px lima + ring 40px, quickTo. Hover scale: 0.5 (no 2.5) |
| Navbar | src/components/layout/Navbar.jsx | FASE 2 | frontend-design, gsap-scrolltrigger | hide/show scroll, 4 links Figma |
| Footer | src/components/layout/Footer.jsx | FASE 2 | frontend-design | hora local ART, sociales |
| App | src/App.jsx | FASE 2 | senior-architect | providers + rutas todas definidas |
| ImpactoReal | src/components/sections/ImpactoReal.jsx | FASE 5 | frontend-design, gsap-scrolltrigger | bento 4 servicios, stagger reveal. Tags: --color-accent-hot |
| SelectedWork | src/components/sections/SelectedWork.jsx | FASE 5 | frontend-design, gsap-scrolltrigger | top-4 Lebedev, quickTo preview hover. Preview opacity en onLoad (no onMouseEnter) |
| Contact | src/components/sections/Contact.jsx | FASE 5 | frontend-design, gsap-scrolltrigger | RHF + EmailJS + WhatsApp, yPercent clip. Labels: --color-text-secondary |
| ProjectRow | src/components/ui/ProjectRow.jsx | FASE 5 | frontend-design | fila Lebedev compartida. Tags: --color-accent-hot |
| WhatsAppButton | src/components/ui/WhatsAppButton.jsx | FASE 5 | mobile-design | sticky mobile, isMobile guard |
| WorkList | src/pages/WorkList.jsx | FASE 5 | frontend-design, gsap-scrolltrigger | lista completa + Flip filter categorías |
| Home | src/pages/Home.jsx | FASE 5 | frontend-design | Hero+ImpactoReal+SelectedWork+Contact |
| TransitionLink | src/components/ui/TransitionLink.jsx | SESIÓN 2 | frontend-design | intercepts clicks, modifier keys pass-through |
| PageTransitionContext | src/context/PageTransitionContext.jsx | SESIÓN 2 | frontend-design | overlay curtain wipe, yPercent 100→0→-100 |
| lenis | src/lib/lenis.js | SESIÓN 2 | frontend-design | singleton Lenis 1.0, integrado con GSAP ticker |
| IAPage | src/pages/IAPage.jsx | SESIÓN 3 | frontend-design, impeccable | hero 2-col + manifiesto + terminal prompt + tools + proyectos AI |
| HelmetObject | src/components/three/HelmetObject.jsx | SESIÓN 3 | react-three-fiber | useGLTF + Float + mouse parallax. Entrada en useFrame (NO useGSAP) |
| HelmetCanvas | src/components/three/HelmetCanvas.jsx | SESIÓN 3 | react-three-fiber | Canvas sin postprocessing. CanvasErrorBoundary DOM-level |
| HelmetFallback | src/components/three/HelmetFallback.jsx | SESIÓN 3 | react-three-fiber | icosaedro wireframe fallback mientras no hay GLB |

---

## Datos del proyecto confirmados

| Campo | Valor |
|---|---|
| NOMBRE_COMPLETO | Leandro De Los Santos Aboy |
| WHATSAPP | +5491168116492 |
| EMAILJS_SERVICE_ID | Pendiente |
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
| Work: lista Lebedev (filas + línea divisora) | SRS + usuario | Grid de cards Figma |
| Página IA incluida | Usuario lo confirmó | Solo páginas del SRS |
| Brand name en footer: nombre del dev | Usuario | MONOLITH_ placeholder |
| Nav links: Proyectos, IA, Exhibiciones, Sobre mí | Figma (aprobado) | SRS: Work, About |
| MouseContext usa ref (no state) | Evita re-render en cada mousemove | useState |
| Navbar hide/show via useGSAP (no CSS transition) | Control preciso del timing | CSS transition |
| Lenis smooth scroll singleton en src/lib/lenis.js | Compartido entre main.jsx y PageTransitionContext | instancia por componente |
| Page transitions: overlay curtain yPercent 100→0→-100 | Limpio, sin bloquear navegación | fade, crossfade |
| useGSAP PROHIBIDO dentro de Canvas R3F | No ejecuta animaciones en el reconciler de R3F — objetos quedan en estado inicial | useGSAP en R3F |
| @react-three/postprocessing eliminado | Crash con Suspense en R3F v8: "Cannot read .length of undefined" | EffectComposer + Bloom |
| @react-three/postprocessing v2.19.1 instalado pero NO usado | v3 requiere R3F v9; v2 tiene bug Suspense | postprocessing v3 |
| Glow simulado con pointLight lima + emissiveIntensity | Reemplaza Bloom eliminado | postprocessing Bloom |
| HelmetObject: escala GLB Sketchfab 0.1345 → compensar con scale={5} | GLB de Sketchfab tiene escala interna reducida | ajustar cámara |
| CanvasErrorBoundary DOM-level (fuera del Canvas) | ErrorBoundary dentro de Canvas no captura errores R3F correctamente | ErrorBoundary dentro Canvas |
| Animación entrada 3D en useFrame con easeOutBack manual | useGSAP no funciona en reconciler R3F | gsap.to() en R3F |

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
/              → Home (Hero + Impacto Real + Selected Work + Contact)
/work          → Proyectos lista Lebedev completa
/work/:slug    → Case Study individual
/ia            → IA & Ecosistema (página completa con 3D casco)
/sobre-mi      → About (placeholder)
/exhibiciones  → Exhibiciones (placeholder)
```

## Archivos 3D en /public/assets/

- `helmet.glb` ✅ — casco Sketchfab, 2.4MB, 3 meshes, escala interna 0.1345
- `helmet-mobile.webp` — pendiente (fallback mobile)

## Problemas resueltos esta sesión

| Problema | Causa | Solución |
|---|---|---|
| Pantalla negra en /ia | @react-three/postprocessing v3 requiere R3F v9 | Desinstalar postprocessing |
| Pantalla negra (2) | EffectComposer crashea con Suspense en R3F v8 | Eliminar EffectComposer completamente |
| Modelo invisible | useGSAP hace scale.set(0,0,0) pero gsap.to no ejecuta en R3F | Reemplazar con useFrame + easeOutBack |
| Modelo muy pequeño | GLB tiene escala interna 0.1345 (Sketchfab export) | scale={5} en primitive |
| GLB no encontrado | /public/assets/ no existía | Crear directorio, usuario colocó helmet.glb |

---

## Pendientes no bloqueantes

- EmailJS: configurar VITE_EMAILJS_SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY en Vercel Dashboard
- Contenido real de proyectos (reemplazar placeholders en data/projects.js)
- og-cover.jpg (1200×630px) para OG meta
- Fuentes locales: public/fonts/playfair-900.woff2 + dm-sans-400.woff2
- helmet-mobile.webp (fallback mobile para /ia)

---

## Próxima sesión — continuar en

- Fase actual: FASE 8 — Deploy
- Próximo: `vercel deploy` o Vercel Dashboard → conectar repo → configurar env vars EmailJS
- Bloqueantes: EmailJS keys — configurar en Vercel Dashboard antes de deploy

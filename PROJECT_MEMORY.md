# PROJECT_MEMORY.md — Portfolio Personal
**Última actualización:** 2026-06-29 (sesión 11)
**Sesión:** 11

---

## Estado de fases

| Fase | Estado | Notas |
|---|---|---|
| FASE 1 — Setup | ✅ Completo | Build exitoso, code splitting OK |
| FASE 2 — Base visual | ✅ Completo | Build OK |
| FASE 3 — Animaciones hero | ✅ Completo | Hero 50/50, split-type, parallax, GSAP reveal |
| FASE 4 — 3D | ✅ Completo | HeroCanvas lazy, chunk separado |
| FASE 5 — Secciones | ✅ Completo | Build OK |
| FASE 6 — Mobile | ✅ Completo | Hamburger Navbar, hero 1col mobile, WhatsApp montado |
| FASE 7 — Review | ✅ Completo | code-reviewer + clean-code + senior-qa pasados |
| FASE 8 — Deploy | ⬜ Pendiente | Vercel, dominio portfolioleandro.vercel.app |
| IAPage | ✅ Completo | Página /ia completa con 3D casco GLB — **NO tocada en rediseño bento**, sigue con ProjectShowcase/ProjectCard/useCardTilt/ProjectCaseSummary tal como estaban |
| Case studies (negocio→problema→solución) | ✅ Completo | Esquema projects.js: businessContext/role/accentColor/video por proyecto |
| Proyectos — Bento grid (sesión 7) | ✅ Completo | **Reemplaza** la galería editorial de monitor-mockup de sesión 6. Bento asimétrico (big 2×2 + medium 1×2 + 3 small 1×1, ciclo de 5) en Home y `/work`. Hover-grow en tamaño real (no scale), click navega a `/work/:slug` |
| Contenido Huevos Point ERP-SaaS (sesión 7) | ✅ Completo | Segunda card del bento — case study completo + video propio |
| Contenido Cecilia Brook (sesión 8) | ✅ Completo | Tercera card del bento — case study completo + video propio (web artista plástica, Next.js+GSAP+Three.js) |
| Thumbnails Huevos Point ERP + Cecilia Brook (sesión 8) | ✅ Completo | Frames mal elegidos en sesión 7/8 inicial (intro cortada / pantalla de login poco representativa) — reextraídos en timestamps que muestran contenido real |
| Grid 2 columnas + reveal lateral en Home (sesión 9) | ✅ Completo | **Reemplaza el bento solo en Home** (`SelectedWork.jsx`). `/work` sigue 100% con `ProjectBento.jsx`/`ProjectBentoCard.jsx`, sin cambios. Verificado con Playwright. |
| Fondo de partículas R3F en ImpactoReal + Contact (sesión 11) | ✅ Completo | Mismo `ParticlesCanvas` lazy que `SelectedWork`, fondo `var(--color-bg)` (negro puro, igual que Proyectos) en vez de `--color-bg-subtle`. Commiteado por el usuario (`fd278c1`) |
| Sección "Sobre mí" / `/sobre-mi` (sesión 11) | 🔄 En progreso | Headline + bio justificada (Kinetic Text) + stack tecnológico en Marquee. Foto y background de sección **pendientes** (usuario los va a compartir) |

---

## Componentes completados — vigentes (sesión 9)

| Componente | Archivo | Fase | Notas |
|---|---|---|---|
| ProjectGridHome | src/components/sections/ProjectGridHome.jsx | Sesión 9 | **Solo Home.** Grid 2 columnas (1 en mobile, `isDesktop` matchMedia), reveal lateral por card vía GSAP ScrollTrigger individual (`x:-60`/`+60` según columna) con `scrub:true` (no `once`/`toggleActions`) — el scroll maneja el progreso en ambas direcciones tipo manivela: bajar entra, subir revierte hacia el lateral, en cualquier punto intermedio. Gateado por `useReducedMotion`. Reemplaza `ProjectBento` en `SelectedWork.jsx` |
| ProjectGridCard | src/components/ui/ProjectGridCard.jsx | Sesión 9-10 | Card sin overlay de texto: imagen full-bleed arriba + título/tags en texto plano debajo. Tamaño +10% (`aspect-ratio: 40/33` antes 4/3, tipografía/padding escalados), `borderRadius:14px` (excepción puntual confirmada al `borderRadius:0` del SRS — solo esta card). Hover: **solo `scale(1.06)` en la imagen interna (`.grid-card__media`)**, el box nunca crece — probado y revertido dos veces (crecimiento del box, luego swap a video), ambos rechazados explícitamente por el usuario. **Sin `<video>` en este componente, sin `useRef`/lógica de video — eliminados de raíz**, no solo dormidos. Home es 100% estático en idle y en hover. `TransitionLink` a `/work/:slug` |
| ProjectBento | src/components/sections/ProjectBento.jsx | Sesión 7 | **Solo `/work` desde sesión 9** (antes compartido con Home). Grid bento 5 slots cíclico, hover-grow width/height real + anclaje por slot (`SLOT_ANCHOR`), `minmax(0,1fr)` en columnas, reveal por ScrollTrigger individual. NO TOCAR sin pedido explícito — usuario decidió mantenerlo solo en /work |
| ProjectBentoCard | src/components/ui/ProjectBentoCard.jsx | Sesión 7 | **Solo `/work` desde sesión 9.** Card individual: `TransitionLink` a `/work/:slug`, fondo imagen+fallback patrón generado en `accentColor`, video en hover si existe, descripción = `project.solution` |
| CaseStudy | src/pages/CaseStudy.jsx | Sesión 6, 10 | Página `/work/:slug` completa: contexto/problema/solución/resultados/stack/galería. Único destino de case-study desde Home y /work. **Sesión 10:** thumbnail principal ahora `<video autoPlay loop muted playsInline>` si `project.video` existe (persiste reproduciendo, no requiere hover), fallback a `<img>` si no — aplica igual para todos los proyectos |
| WorkList | src/pages/WorkList.jsx | Sesión 5/7 | Filtro por categoría con Flip + `<ProjectBento>` |
| SelectedWork | src/components/sections/SelectedWork.jsx | Sesión 9 | Home: `<ProjectGridHome projects={FEATURED} viewAllHref="/work">` (antes `ProjectBento`, cambiado en sesión 9) |
| ProjectCard / ProjectShowcase / ProjectCaseSummary / useCardTilt | src/components/ui+sections/ + hooks/ | Sesión 6 | **Solo `/ia`** — intacto, no migrado al bento ni al grid nuevo |
| AboutPage | src/pages/AboutPage.jsx | Sesión 11 | `/sobre-mi`. Headline + grid 2 col (foto placeholder izq / bio+stack der). Bio: Kinetic Text (Magic UI portado sin Tailwind) vía `split-type` (`tagName:'span'`) + CSS `:has()` — ventana ±3 chars, pesos reales DM Sans 300/400/500/600/700 (sin font-synthesis). `marginLeft:auto` + `maxWidth:70ch` empuja el bloque hacia el margen derecho. Accesibilidad: bio visual `aria-hidden`, copia `.sr-only` paralela para lectores de pantalla (SplitType fragmenta el texto en spans por letra). Cue de "pasar el cursor" **eliminado** a pedido explícito — no reintroducir |
| Marquee | src/components/ui/Marquee.jsx | Sesión 11 | Magic UI "Marquee" portado sin Tailwind — N pistas duplicadas (`repeat`, default 4) animadas en sync vía `@keyframes marquee-scroll` (globals.css). Usado en AboutPage: Tecnologías `reverse` (mueve a la derecha), Servicios sin reverse (izquierda). Hover de sus chips usa `--color-accent-hot` — **única excepción** a la regla de restricción de ese color (CTA+cursor), por pedido explícito del usuario |

### Datos cargados en sesión 8
- `src/data/projects.js`: tercer entry real `cecilia-brook` reemplaza placeholder `vital-stats-app` (mismo criterio que sesión 7 con `diamondrose-sanctuary`→`huevos-point-erp`: reemplazar placeholder en orden, no insertar/reordenar)
- `public/assets/projects/cecilia-brook/preview.mp4` + `thumb.jpg` — mismo pipeline ffmpeg (960px/30fps/h264/crf28, frame extraído)
- Thumbnails corregidos: `huevos-point-erp/thumb.jpg` (frame en 9s: dashboard+modal venta, antes 2s mostraba solo login) y `cecilia-brook/thumb.jpg` (frame en 12s: grilla de obras, antes 2s mostraba intro con texto cortado por el crop 4:3 del card)

### Eliminados en sesión 7 (reemplazados por bento)
`src/components/sections/ProjectGallery.jsx`, `src/components/ui/MonitorFrame.jsx` — el grid 2col+mockup-monitor+panel-sticky de sesión 6 quedó descartado tras feedback directo del usuario ("cards grandes, vistosas... no cuadrado/básico").

(Componentes de sesiones 1-5 sin cambios — ver historial git para detalle completo si se necesita.)

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

## Decisiones arquitectónicas — sesión 7 (rediseño bento + fix hover-grow)

| Decisión | Motivo | Alternativa descartada |
|---|---|---|
| Bento grid asimétrico (1 big + 1 medium + 3 small, ciclo de 5) en Home y /work | Referencia visual del usuario — "cards grandes, vistosas", alejarse del look cuadrado del monitor-mockup | Mantener galería 2col+mockup de sesión 6 |
| `/ia` excluido del rediseño bento | Decisión explícita del usuario — ProjectShowcase sigue siendo el sistema correcto ahí | Migrar todo a bento |
| Hover-grow: tamaño real (`width`/`height` + `x`/`y`), NO `transform:scale` | `scaleX`/`scaleY` no uniforme deforma el texto del subárbol — bug reportado y verificado con Playwright | scale uniforme con transform-origin por esquina (insuficiente, seguía distorsionando en casos no uniformes) |
| Anclaje de crecimiento por slot (`SLOT_ANCHOR`: big→top-left, medium→top-right, smallA/B→bottom-left, smallC→bottom-right) | Crecer siempre hacia abajo-derecha sacaba del viewport a las cards de la última fila/columna del bloque — bug reportado y verificado | Transform-origin dinámico (no resuelve overflow, solo el punto de pivote de scale) |
| `gridTemplateColumns: repeat(3, minmax(0,1fr))` | Sin `minmax(0,...)`, el contenido de una card creciendo fuerza a la pista del grid a ensancharse y reacomoda a las demás | `1fr` simple |
| Cards NUNCA cambian de posición/orden en el grid (`gridColumn`/`gridRow` fijos por proyecto) | Corrección explícita del usuario: "La idea no es que cambien de lugar, si no que crezcan" | Slot-swap con GSAP Flip (primera implementación, abandonada) |
| GSAP Flip eliminado del hover-grow | `absolute:true` dejaba estilos inline pegados (`position:absolute`, `grid-area:1/1/1/1`) tras hovers rápidos repetidos — verificado con `getComputedStyle` | Flip sin `absolute:true` (insuficiente, mismo root cause) |
| `baselineRef` + `resetAll()` (kill tweens + `clearProps`) al inicio de cada hover | Garantiza medición limpia con `getBoundingClientRect()` incluso bajo hover rápido sucesivo | Medir sin resetear primero (daba tamaños erróneos a mitad de tween anterior) |
| Video de Huevos Point ERP: `ffmpeg` comprimió `HP-ERP.mov` 19.6MB→393KB (960px/30fps/h264/crf28) + frame extraído como `thumb.jpg` | Mismo pipeline ya validado con `HP-web.mov` en sesión 6, reusado sin pedir nada nuevo al usuario | Subir el .mov sin comprimir |
| Segunda card del bento reemplaza `diamondrose-sanctuary` (placeholder) por `huevos-point-erp` (contenido real) | Usuario priorizó cargar contenido real disponible sobre mantener el placeholder | Insertar como entrada nueva y reordenar/desplazar las demás |

---

## Decisiones arquitectónicas — sesión 8 (tercer proyecto + fix thumbnails + research Figma)

| Decisión | Motivo | Alternativa descartada |
|---|---|---|
| Tercera card `cecilia-brook` reemplaza placeholder `vital-stats-app` | Mismo criterio que sesión 7 — contenido real disponible prioriza sobre placeholder, sin reordenar el array | Insertar como 8va entrada |
| Selección de thumbnail por inspección visual de múltiples frames candidatos (no el primer frame disponible) | El frame fijo en 2s servía para ambos proyectos anteriores pero resultó mala elección: en Cecilia Brook caía sobre la intro con texto que el crop 4:3 del card cortaba feo; en Huevos Point ERP caía en la pantalla de login, poco representativa del producto | Mantener regla fija "frame en 2s" para todo proyecto nuevo — descartada, ahora se evalúan 4-5 candidatos por video antes de elegir |
| Figma MCP usado solo para análisis/lectura, sin cambios de código | Usuario pidió "ver y analizar" un link de referencia (clon de madeinuxstudio.com/works vía html.to.design) — no fue un pedido de implementación | Implementar de una el patrón list/grid toggle visto en la referencia |

---

## Decisiones arquitectónicas — sesiones 1-6 (vigentes, sin cambios)

| Decisión | Motivo | Alternativa descartada |
|---|---|---|
| `split-type` en lugar de SplitText | Sin licencia Club GSAP | SplitText |
| `@emailjs/browser` en lugar de `emailjs-com` | Paquete activo, misma API | emailjs-com (deprecated) |
| MUI `disableRipple: true` global | Inconsistente con estética del proyecto | default ripple |
| MouseContext usa ref (no state) | Evita re-render en cada mousemove | useState |
| Lenis smooth scroll singleton en src/lib/lenis.js | Compartido entre main.jsx y PageTransitionContext | instancia por componente |
| Page transitions: overlay curtain yPercent 100→0→-100 | Limpio, sin bloquear navegación | fade, crossfade |
| useGSAP PROHIBIDO dentro de Canvas R3F | No ejecuta animaciones en el reconciler de R3F | useGSAP en R3F |
| @react-three/postprocessing eliminado | Crash con Suspense en R3F v8 | EffectComposer + Bloom |
| projects.js: businessContext + role + accentColor | Narrativa case-study completa + rol real por proyecto + color de marca por card | Mantener solo problem/solution/results |
| Mobile /work: tap navega a CaseStudy.jsx | Reusa página ya construida y probada | Inline reveal mobile custom |
| ProjectGallery/ProjectBentoCard: onFocus/onBlur replican hover | WCAG 2.1.1 — hover-only deja contenido inalcanzable por teclado | Cards sin tabIndex/onFocus |

---

## Problemas resueltos — sesión 7

| Problema | Causa | Solución |
|---|---|---|
| Texto estirado al crecer una card en hover | `scaleX`/`scaleY` no uniforme deforma todo el subárbol, texto incluido | Animar `width`/`height` reales en px — el contenido reflowea normal, sin distorsión |
| Cards saliéndose de pantalla al crecer (overflow horizontal) | Todo el crecimiento anclaba siempre en top-left; cards de la última fila/columna del bloque no tenían margen y se salían del viewport | `SLOT_ANCHOR` por slot (cada uno ancla en el borde del bloque que ya toca) + `x`/`y` translate rígido compensando el lado opuesto |
| Reacomodo del grid durante la animación de crecimiento | Columnas en `1fr` simple permiten que el contenido oversized de una card ensanche su pista | `repeat(3, minmax(0,1fr))` |
| Estilos inline pegados tras hover rápido sucesivo (primera implementación con Flip) | `Flip.from(..., {absolute:true})` no revertía limpio en llamadas repetidas rápidas | Eliminado Flip del feature; `resetAll()` (kill tweens + clearProps) al inicio de cada hover + `clearProps` al finalizar revert |
| Verificación | — | Playwright: 0 overflow horizontal en ningún hover (big/medium/small, esquinas, Home y /work, 1440px y mobile 375px), texto sin deformar en capturas, estilos inline limpios tras secuencias de hover rápido |

(Problemas de sesiones 4 y 6 — ver versión anterior de este archivo en git log si se necesita detalle.)

---

## Decisiones arquitectónicas — sesión 9 (grid 2 columnas Home, separación de Home y /work)

| Decisión | Motivo | Alternativa descartada |
|---|---|---|
| Reemplazar bento por grid 2 columnas con reveal lateral, **solo en Home** | Usuario compartió grabación de referencia (mismo sitio del research Figma sesión 8) y eligió explícitamente vía AskUserQuestion: "Reemplazar bento por grid 2 columnas... pero solo en el home. No tocar lo desarrollado en la seccion Proyectos" | Aplicar el cambio también a `/work` (descartado por pedido explícito) |
| Componentes nuevos (`ProjectGridHome`/`ProjectGridCard`) en vez de modificar `ProjectBento`/`ProjectBentoCard` | Mantener `/work` intacto exigía no tocar los componentes compartidos — separación limpia por archivo en vez de flags/props condicionales | Agregar prop `variant="grid"` a `ProjectBento` (hubiera acoplado ambos layouts en un solo componente) |
| Animación lateral implementada con el patrón GSAP ScrollTrigger ya validado (`gsap.from` + trigger individual por card), sin reverse-engineering frame-a-frame del video de referencia | ~250 frames muestreados del video (0–25fps, 4 ventanas) no capturaron el frame exacto de `translateX` en tránsito — la grabación está comprimida y el reveal es más rápido que el sampling disponible. El patrón en sí (2 columnas, entrada lateral, fade) es inequívoco por contexto | Seguir extrayendo frames a mayor fps buscando el instante exacto (esfuerzo no proporcional al resultado — el patrón estándar ya cubre el efecto visual buscado) |
| Verificación con Playwright requirió wheel events reales (`dispatchEvent(new WheelEvent(...))` repetidos), no `scrollIntoView`/`scrollBy` | Lenis (smooth scroll global) intercepta scroll nativo — `window.scrollBy`/`scrollIntoView` no avanzan la posición real de Lenis, por lo que ScrollTrigger nunca dispara con scroll programático simple. Mismo problema aplicaría a cualquier test futuro de animaciones scroll-driven en este proyecto | `page.evaluate(() => window.scrollTo(...))` (no mueve a Lenis, deja los triggers sin disparar) |
| Hover en `ProjectGridCard` probado con `browser_hover` (Playwright), no `dispatchEvent('mouseenter')` manual | React 17+ delega `onMouseEnter`/`onMouseLeave` sobre `mouseover`/`mouseout` con lógica de `relatedTarget` — un `mouseenter` nativo despachado a mano no siempre dispara el handler sintético de React | Disparar el evento nativo `mouseenter` directamente (funcionó para verificar estructura del DOM pero no logró encender el handler de React de forma confiable) |
| Reveal lateral de `ProjectGridHome` migrado dos veces tras feedback: `once:true` → `toggleActions:'play reverse play reverse'` → `scrub:true` (final) | Usuario corrigió dos rondas: 1) quería que scroll hacia arriba revierta la animación (no solo play-once); 2) rechazó explícitamente el play/reverse con duración fija — pidió que el scroll mismo controle el progreso de forma proporcional y continua en cualquier punto intermedio ("manivela": "el scroll manda") | `toggleActions` (binario play/reverse con duración fija — no scroll-proporcional, rechazado explícitamente) |
| `CLAUDE.md` del proyecto dividido en `CLAUDE.md` (reglas/triggers activos, 396→274 líneas) + `SKILLS_SETUP.md` nuevo (bash de instalación + prosa "por qué" histórica, 61 líneas) | `CLAUDE.md` se reinyecta completo cada turno — mayor contribuyente fijo al llenado rápido de contexto (396 líneas vs 65 del global). Instalación ya ejecutada y rationale histórico no se consultan para decidir cuándo aplicar una skill | Mantener un solo archivo (seguía creciendo costo por turno sin beneficio operativo) |

## Decisiones arquitectónicas — sesión 10 (ajustes visuales cards Home + video en CaseStudy)

| Decisión | Motivo | Alternativa descartada |
|---|---|---|
| `borderRadius:14px` en `ProjectGridCard` — excepción puntual al `borderRadius:0` del SRS | Usuario pidió redondear; ante conflicto SRS vs pedido se preguntó explícitamente vía AskUserQuestion — usuario eligió "redondear solo estas cards" (excepción, no cambia la regla global) | Actualizar el SRS globalmente a un valor de radius / no redondear nada |
| Tamaño de `ProjectGridCard` +10% vía `aspect-ratio: 40/33` (antes 4/3) + tipografía/padding escalados ×1.1, en vez de `transform: scale(1.1)` en el wrapper | El ancho de la card está fijado por el grid (`1fr`) — no se puede agrandar sin romper layout o solapar. Escalar alto+tipografía da una card visualmente más grande sin pelear con el grid | `transform: scale(1.1)` en el wrapper (genera overlap visual con celdas vecinas y gap) |
| Hover de `ProjectGridCard`: probado "la card crece" (`scale(1.05)` en el box completo) y luego revertido a "zoom leve solo en la imagen" | Usuario corrigió explícitamente tras ver el resultado: "no deben crecer en sí mismas, sino hacer un leve zoom a las imágenes que contienen". Como el hover es un solo componente compartido por todas las cards del grid, el cambio aplica parejo a todas | Mantener el grow del box (rechazado explícitamente) / diferenciar comportamiento por proyecto (sobre-ingeniería para una sola UI compartida) |
| Video reemplazado por imagen estática (mockup) en 3 proyectos: `huevos-point`, `huevos-point-erp`, `cecilia-brook` (`video: null` en los tres) | Pedido directo del usuario, card por card, con assets de mockup ya provistos (`mockup-hpweb.png`, `MacBook_Mockup_1.png`, `mockup-cecibrook.png`) | Mantener el video y solo cambiar el thumbnail de fallback |
| PNGs de mockup (15-17MB cada uno) comprimidos a `thumb.webp` (1200px ancho, q82, `cwebp`) antes de usarlos como thumbnail, sobrescribiendo en `public/assets/projects/<id>/thumb.webp` | Servir un PNG de ~16MB como thumbnail de card rompe CWV (LCP) — mismo criterio de optimización ya aplicado a videos en sesiones anteriores | Usar el PNG pesado directo desde `public/assets/` sin mover/comprimir |
| `preview.mp4` + `thumb.jpg` viejos borrados de los 3 proyectos tras el reemplazo | Limpieza — assets reemplazados, no usados por ningún componente | Dejarlos en disco "por si acaso" (bundle/repo innecesariamente pesado) |
| `CaseStudy.jsx`: thumbnail principal pasa a `<video autoPlay loop>` condicional (`project.video ? <video> : <img>`), aplica a todos los proyectos por igual | Pedido del usuario: "el video debe persistir en la vista del proyecto en sí... aplica para todos los proyectos" — comportamiento uniforme vía el campo `video` ya existente en el esquema, sin lógica especial por id | Componente/prop separado por proyecto |
| Padding lateral -40% (`clamp(24px,6vw,80px)` → `clamp(14.4px,3.6vw,48px)`) en 4 secciones: `ImpactoReal.jsx`, `SelectedWork.jsx`, `Contact.jsx`, `Footer.jsx` | Pedido directo del usuario — las 4 secciones compartían el mismo valor de padding horizontal, se redujo el mismo % en las 4 para no romper la alineación entre secciones | Reducir solo en algunas / valores distintos por sección |
| Video reactivado (`video: null` → `.mp4` real) en `huevos-point`, `huevos-point-erp`, `cecilia-brook` — usuario pidió mantener el hover-video en `/work` (`ProjectBentoCard`) y el autoplay-loop en `CaseStudy`, que habían quedado huérfanos al poner `video: null` antes en esta misma sesión | El usuario aclaró que el `video: null` de antes solo aplicaba al reemplazo de imagen en Home — no era pedido de eliminar el video en `/work`/CaseStudy. `ProjectBentoCard.jsx`/`ProjectBento.jsx`/`CaseStudy.jsx` no se tocaron, ya soportaban `project.video` desde sesión 7/10 | Crear un campo separado `videoDetail` distinto de `video` (innecesario — el esquema ya distinguía bien por componente, el bug era solo el valor `null`) |
| `ProjectGridCard.jsx`: lógica de video (`videoRef`, `<video>`, swap opacity) **eliminada del código**, no solo dejada dormiente con `project.video` truthy | Tras reactivar `video` en los 3 proyectos para `/work`/CaseStudy, el hover en Home volvía a mostrar video (mismo campo compartido) — usuario corrigió de nuevo: "en el home no deben mostrar los videos al hacer hover, solo un zoom leve". Como el campo `video` ahora SÍ está poblado, dejar la rama `{project.video && <video>}` viva la había vuelto a activar — había que sacarla del componente, no alcanzaba con el campo vacío | Volver a poner `video: null` en `projects.js` (rompería el pedido explícito de mantener video en `/work` y CaseStudy con los mismos 3 proyectos) |
| `.mov` originales (HP-web.mov 168MB, HP-ERP.mov 19.6MB, CBROOK-WEB.mov 151MB) comprimidos a `preview.mp4` (h264, scale 1280, crf28, sin audio) vía `ffmpeg` — resultado 3.4MB / 637KB / 2.4MB | Mismo criterio CWV ya aplicado a thumbnails — servir un `.mov` de 150MB+ como video de hover es inviable | Usar el `.mov` directo (formato poco soportado en `<video>` web + tamaño prohibitivo) |

## Decisiones arquitectónicas — sesión 11 (Sobre mí, Kinetic Text, Marquee, placeholders)

| Decisión | Motivo | Alternativa descartada |
|---|---|---|
| `InteractiveGridPattern` (Magic UI) probado como fondo de ImpactoReal/Proyectos/Contacto y **revertido por completo** | Usuario: "no me gusta como queda, revierte todos los cambios" — feedback directo, sin ambigüedad | Iterar sobre el mismo componente (descartado, pedido explícito de revertir) |
| 4 proyectos placeholder (`sistema-de-diseno`, `bold-flavor`, `semantic-search-engine`, `autonomous-code-reviewer`) **comentados** en `projects.js`, no borrados | Portfolio ya en producción — usuario no quiere contenido ficticio visible, pero va a completarlos con datos reales más adelante | Borrar las entradas (perdería el esquema ya armado) / dejarlas visibles |
| Kinetic Text (Magic UI) portado a CSS plano + `split-type` en vez de Tailwind | Proyecto no usa Tailwind/shadcn (confirmado en `package.json`) — todo componente de Magic UI que se traiga vía MCP se porta a CSS-vars + inline styles, mismo patrón que el resto del proyecto | Instalar Tailwind solo para este componente |
| Pesos DM Sans 600 y 700 agregados al link de Google Fonts (`index.html`) | El efecto Kinetic Text necesita pesos reales para evitar font-synthesis (negrita falsa) — antes solo 300/400/500 | Dejar que el browser sintetice los pesos faltantes (se ve peor, especialmente en pantallas no-retina) |
| Ventana del Kinetic Text ampliada ±2→±3 chars + padding/stroke +50% | Pedido explícito: "aumenta el efecto... para que se luzca más" | Solo subir el peso máximo (imposible sin sintetizar — DM Sans no tiene 900 como static file) |
| Bio + cue alineados a la derecha vía `marginLeft:auto` + `maxWidth:70ch` (no cambiar el grid de columnas) | Pedido explícito: "lleva el texto hacia el margen derecho" — el grid foto/contenido se mantiene, solo el bloque de texto se empuja dentro de su columna | Cambiar `gridTemplateColumns` (innecesario, rompía la relación con la foto) |
| Marquee (Magic UI) portado sin Tailwind — chips con hover en `--color-accent-hot`, tamaño +70% | Pedido explícito del usuario, incluida la excepción al lima reservado (ver fila en tabla de componentes) | Mantener los chips estáticos en flex-wrap (versión previa, reemplazada) |
| Cue "Pasá el cursor sobre el texto" (icono + label + pulso GSAP) eliminado del todo | Pedido explícito: "elimina la referencia... no lo utilizaremos más" | Ocultarlo con CSS (`display:none`) sin sacar el código — descartado, el usuario pidió eliminar la referencia, no solo ocultarla |
| Fondo de sección ImpactoReal/Contact: `--color-bg-subtle` → `--color-bg` (negro puro, igual que Proyectos) | Pedido explícito — igualar el negro de fondo detrás de las partículas en las 3 secciones | Mantener `--color-bg-subtle` (rompía la consistencia visual entre secciones con partículas) |

## Problemas resueltos — sesión 11

| Problema | Causa | Solución |
|---|---|---|
| Bio de AboutPage invisible en viewports anchos (~2000px) pese a `opacity:1` confirmado por DOM | `.marquee` (flex + `overflow:hidden`) es item de CSS Grid en una columna `1fr`. `overflow:hidden` clipea visualmente pero NO reduce el ancho mínimo intrínseco usado por Grid para auto-medir la columna — el contenido sin wrap de los chips (`flex-shrink:0`) infló la columna a ~5130px, empujando el bloque de bio (con `marginLeft:auto`) muy afuera del viewport visible | `min-width:0` en `.marquee` (globals.css) y en el div de la columna "Contenido" en `AboutPage.jsx` — gotcha clásico de flex/grid, **recordar para cualquier marquee/carousel futuro dentro de un grid** |
| Screenshot de Playwright timeoutea ("waiting for fonts to load") en páginas con animación CSS/GSAP infinita | El harness de screenshot espera que las animaciones "se asienten" antes de capturar; una animación `repeat:-1`/`infinite` nunca lo hace | No es bug del código — verificar funcionalmente vía `browser_evaluate` (computed styles) en vez de insistir con `take_screenshot` cuando hay animación infinita en la página |
| `rm -rf .playwright-mcp/` borró ~175 archivos de log/screenshot **versionados en git** | Carpeta `.playwright-mcp` está trackeada en el repo (no en `.gitignore`) | `git checkout -- .playwright-mcp/` restaura — **verificar `git status` antes de cualquier `rm -rf` en este proyecto**, esta carpeta es un punto ciego conocido |
| Usuario reportó "no veo el texto" sin más detalle | Múltiples causas posibles (server stale, no deployado, bug real) | Antes de asumir, preguntar dónde mira (local/producción) — en este caso era bug real (ver fila de arriba), pero la pregunta acotó la búsqueda rápido |

---

## Problemas resueltos — sesión 10

| Problema | Causa | Solución |
|---|---|---|
| Card de `huevos-point` mostraba solo el fondo generado (patrón en accentColor) antes del hover, nunca el preview | `thumb.webp` referenciado en `projects.js` no existía en disco (solo `preview.mp4`) — `<img onError>` caía a opacity 0 y el `<video preload="none">` no pinta frame sin interacción | Frame extraído del propio `preview.mp4` con `ffmpeg` (a png) + `cwebp` (a webp) — mismo pipeline que sesiones 7-8, generó el `thumb.webp` faltante |
| `ffmpeg -vf scale ... thumb.webp` directo fallaba: "Automatic encoder selection failed... Encoder not found" | El build de ffmpeg de Homebrew en esta máquina no trae el encoder webp habilitado | Extraer a PNG intermedio con ffmpeg y convertir a webp con `cwebp` (sí instalado vía Homebrew) — dos pasos en vez de uno |

---

## Research — sesión 8 (sin cambios de código)

Usuario compartió link de Figma (clon vía html.to.design de `madeinuxstudio.com/works`) pidiendo análisis. Estructura relevada: header fijo con logo+nav, hero con headline condensada gigante + contador de proyectos + botón circular volver, bloque "list view" de proyectos (texto perdido en la conversión — bug conocido de html.to.design, cajas vacías), grid de 11 cards en 2 columnas (cover+título+subtítulo+tag, sí con texto legible), toggle flotante "Grid View", footer doble (uno con nav numerado 01-05 + contacto + newsletter + redes, otro compacto con tagline+email+copyright). Conclusión: el patrón de card (cover+título+subtítulo+tag) ya está cubierto por `ProjectBentoCard.jsx`; lo único no implementado en este proyecto es el toggle list/grid. **No se tomó acción** — usuario no pidió implementar nada, solo ver y analizar.

---

## Pendientes no bloqueantes

- AboutPage (`/sobre-mi`): falta foto del usuario (placeholder marcado "Foto — próximamente") y background de la sección (usuario lo va a compartir) — ambos quedaron pendientes explícitamente, no son bugs
- AboutPage + `index.html` + `globals.css` + `Marquee.jsx` de sesión 11 **sin commitear** al cierre de la sesión
- 4 proyectos placeholder en `projects.js` siguen comentados (`sistema-de-diseno`, `bold-flavor`, `semantic-search-engine`, `autonomous-code-reviewer`) — completar con datos reales y descomentar cuando estén listos
- EmailJS: configurar VITE_EMAILJS_SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY en Vercel Dashboard
- Contenido real de proyectos restantes (`diamondrose-sanctuary`→`huevos-point-erp` y `vital-stats-app`→`cecilia-brook` ya reemplazados; quedan `sistema-de-diseno`, `bold-flavor`, `semantic-search-engine`, `autonomous-code-reviewer` con placeholders)
- Videos/thumbnails reales para esos proyectos placeholder
- `huevos-point`, `huevos-point-erp`, `cecilia-brook`: estado final de sesión 10 — `thumbnail` = mockup estático (.webp) usado en Home Y como fallback; `video` = `.mp4` real, usado en `/work` (hover) y `CaseStudy` (autoplay-loop). Home (`ProjectGridCard`) ignora `project.video` por diseño — el componente ya no tiene código de video, no hace falta volver a tocar `projects.js` si se agrega/cambia video a futuro, solo `ProjectBentoCard`/`CaseStudy` lo leen
- og-cover.jpg (1200×630px) para OG meta
- Fuentes locales: public/fonts/playfair-900.woff2 + dm-sans-400.woff2
- helmet-mobile.webp (fallback mobile para /ia)
- Confirmar año de lanzamiento real de Huevos Point, Huevos Point ERP y Cecilia Brook (hoy `year: null` en los tres)
- Métricas reales de Huevos Point (web) si el cliente las comparte
- `/impeccable audit` sobre `ProjectBento.jsx`/`ProjectBentoCard.jsx` — pendiente de correr formalmente (se aplicaron sus reglas generales durante el rediseño pero no se ejecutó el comando)
- Evaluar si vale la pena un toggle list/grid en `/work` (idea vista en research de Figma sesión 8, no solicitada aún)

---

## Graphify — Mapa de conocimiento

Ver `graphify-out/GRAPH_REPORT.md` para el detalle completo (god nodes, comunidades, conexiones sorpresivas). Hook `post-commit` activo — rebuild AST automático tras cada commit, sin acción manual requerida. Regla de exploración obligatoria en `CLAUDE.md §9`: usar `graphify query/path/explain` antes de grep/Read a ciegas.

---

## Próxima sesión — continuar en

- Fase actual: terminar AboutPage (`/sobre-mi`) — falta foto + background de sección, ambos a la espera de assets del usuario
- Próximo: integrar foto/background de AboutPage cuando el usuario los comparta; luego, carga de contenido real de los 4 proyectos placeholder restantes, o FASE 8 — Deploy
- Bloqueantes: ninguno técnico. Assets de AboutPage y EmailJS keys pendientes del lado del usuario
- Nota técnica (sesión 11): `min-width:0` es obligatorio en cualquier contenedor flex/marquee con `overflow:hidden` que viva dentro de una columna de CSS Grid (`1fr`/`auto`) — sin esto el contenido sin-wrap infla la columna y puede empujar otro contenido fuera del viewport. Ver `.marquee` en `globals.css` y el div "Contenido" en `AboutPage.jsx`
- Nota técnica (sesión 11): `.playwright-mcp/` está trackeada en git en este repo — nunca `rm -rf` esa carpeta sin `git status` antes; si se borra por error, `git checkout -- .playwright-mcp/` la restaura
- Nota técnica (sesión 11): screenshots de Playwright timeoutean en páginas con animación infinita (CSS o GSAP `repeat:-1`) — usar `browser_evaluate` con `getComputedStyle` para verificar funcionalmente en su lugar, no es indicador de bug
- Nota de diseño (sesión 11): `--color-accent-hot` (lima) sigue reservado a CTA+cursor en todo el sitio, **excepto** los chips del Marquee de AboutPage (excepción explícita del usuario, no extender a otros componentes sin pedido nuevo)
- Nota de diseño (sesión 11): cue de "pasar el cursor sobre el texto" en AboutPage fue eliminado a pedido explícito — no reintroducir sin que se pida de nuevo
- Nota técnica: `ffmpeg` instalado (Homebrew) — reusar sin pedir instalación de nuevo para futuros videos de proyectos
- Nota técnica: al elegir thumbnail de un video nuevo, extraer 4-5 frames candidatos en distintos timestamps y revisarlos antes de fijar uno — no asumir que un timestamp fijo (ej. 2s) funciona para todo video (lección de sesión 8)
- Nota de diseño: Home usa `ProjectGridHome` (grid 2 col + reveal lateral, sesión 9), `/work` sigue con `ProjectBento` (asimétrico, sesión 7) — **layouts deliberadamente distintos entre Home y /work**, no es inconsistencia, es decisión del usuario
- Nota de diseño: ambos layouts (Home y /work) usan los primeros 4 proyectos del array `projects.js` (`FEATURED = projects.slice(0,4)` en `SelectedWork.jsx`) para Home — al agregar/reordenar contenido real, tener en cuenta qué proyectos quedan destacados en Home (hoy: huevos-point, huevos-point-erp, cecilia-brook, sistema-de-diseno)
- Nota técnica: para testear scroll-driven animations con Playwright en este proyecto, usar wheel events reales (no `scrollIntoView`/`scrollBy`) por Lenis — ver decisión sesión 9
- Nota técnica: reveal de `ProjectGridHome` es `scrub:true` (no `once`/`toggleActions`) — scroll controla progreso 1:1 en ambas direcciones tipo manivela. Tunear distancia lateral en la línea `x: fromLeft ? -60 : 60`; tunear largo del tramo de scroll en `start`/`end` del `scrollTrigger`
- Nota técnica: `CLAUDE.md` del proyecto se dividió — reglas/triggers activos quedan en `CLAUDE.md` (274 líneas), instalación + rationale histórico se movieron a `SKILLS_SETUP.md` (61 líneas, no se carga por sesión). Si se reinstala una skill o se pregunta el "por qué" de una decisión de stack, consultar `SKILLS_SETUP.md`
- Nota técnica (sesión 10): hover de `ProjectGridCard` es solo zoom de imagen (`.grid-card__media`, `scale(1.06)`) — el box (`.grid-card__box`) NO debe escalar, ya se probó y se revirtió explícitamente por pedido del usuario. No reintroducir grow del box sin que se pida de nuevo
- Nota técnica (sesión 10): para nuevos mockups/imágenes pesadas (PNG de Figma/export >5MB), comprimir siempre con `cwebp -q 82 -resize <ancho> 0 <input> -o thumb.webp` antes de usarlas como asset — si `ffmpeg -vf scale ... out.webp` falla con "Encoder not found", extraer a PNG intermedio y pasar por `cwebp` en dos pasos
- Nota de diseño (sesión 10): padding lateral de `ImpactoReal`, `SelectedWork`, `Contact`, `Footer` es `clamp(14.4px, 3.6vw, 48px)` (-40% del original `clamp(24px,6vw,80px)`) — si se pide tocar el padding de alguna de estas 4 secciones, mantener el mismo valor en las otras 3 salvo pedido explícito de romper la simetría
- Nota crítica (sesión 10): `project.video` en `projects.js` ya NO gatea comportamiento uniforme entre componentes — `ProjectGridCard.jsx` (Home) lo ignora por completo (sin código de video), mientras `ProjectBentoCard.jsx` (`/work`) y `CaseStudy.jsx` sí lo usan (hover-play y autoplay-loop respectivamente). Antes de tocar el campo `video` de cualquier proyecto, confirmar en cuál de los 3 contextos se quiere el efecto — ya no es un toggle global
- Nota técnica (sesión 10): `.mov` originales pesados (HP-web.mov, HP-ERP.mov, CBROOK-WEB.mov, 19-168MB) siguen en `public/assets/` sin comprimir — los `preview.mp4` ya comprimidos son los que usa el código. Si se pide limpiar espacio, esos 3 `.mov` son candidatos seguros a borrar (no referenciados por ningún componente)

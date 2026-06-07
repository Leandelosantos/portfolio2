# CLAUDE.md — Portfolio Personal
> Fuente de verdad operativa para este proyecto. Leer completo antes de ejecutar cualquier acción.

---

## 1. Documentos de referencia

| Archivo | Propósito | Precedencia |
|---|---|---|
| `SRS_portfolio.md` | Especificaciones completas: stack, paleta, tipografía, animaciones, estructura | **Máxima** |
| `buenas-practicas.md` | Reglas de código del proyecto | Alta |
| `CLAUDE.md` (este archivo) | Operativa de desarrollo, skills, fases | Alta |

**Regla:** Ante conflicto entre documentos → SRS_portfolio.md gana siempre.

---

## 2. Recursos de diseño

### Figma MCP — proyecto "portfolio2.0"

**Instalación:**
```bash
claude plugin install figma@claude-plugins-official
# Luego en Claude Code — autenticación manual obligatoria:
/mcp → seleccionar "figma" → Authenticate → Allow Access (browser)
```

**Qué provee:** acceso directo a componentes, variables de diseño, layout, tokens visuales y specs del proyecto Figma "portfolio2.0". Claude Code puede leer el diseño sin necesidad de describírselo.

**Cuándo usar:**
| Momento | Acción |
|---|---|
| PROMPT_01 (planificación) | Leer "portfolio2.0" para comparar diseño vs SRS_portfolio.md — identificar divergencias antes de planificar |
| Paso 3b (personalizar skills) | Extraer tokens reales de Figma para personalizar skills con valores exactos del diseño |
| Fase 2 (base visual) | Referencia visual para globals.css y muiTheme.js |
| Fase 5 (secciones) | Referencia por componente — leer frame específico antes de implementar |
| Antes de `/impeccable audit` | Comparar implementación vs diseño original |

**Comando de integración con Impeccable:**
```
/impeccable distill   → extrae el design system del proyecto Figma activo
```

**Regla:** Ante divergencia entre Figma y SRS_portfolio.md → pausar y consultar. No asumir cuál es la versión correcta.

---

## 3. Stack técnico

```
React 18 + Vite 5 | GSAP 3.12+ | Three.js r165 | @react-three/fiber | @react-three/drei | MUI v5 | split-type
```

**IMPORTANTE:** `SplitText` de GSAP requiere licencia Club — NO usar. Reemplazo: `split-type`.
API compatible: `new SplitType('.selector', { types: 'chars,words' })` → `.chars` / `.words`

---

## 4. Skills instaladas

### 3.1 freshtechbro/claudedesignskills

Instalación:
```bash
/plugin marketplace add freshtechbro/claudedesignskills
/plugin install threejs-webgl
/plugin install gsap-scrolltrigger
/plugin install react-three-fiber
```

---

#### `threejs-webgl`
**Qué hace:** Conocimiento profundo de Three.js r165 + WebGL — geometrías, materiales, shaders, BufferGeometry, instancing, post-processing, performance budgets.

**Cuándo activar:**
- Todo archivo dentro de `src/components/three/`
- Partículas hero (`ParticleField.jsx`)
- Objeto 3D central (`HeroObject.jsx`)
- Transición page wipe (`PageTransition.jsx`)
- Cualquier shader custom (fragment/vertex)

**Cómo usar:** Activación automática al tocar archivos Three.js. Si no activa, invocar: "Usa la skill threejs-webgl para esta tarea."

**Por qué:** `webgpu-claude-skill` original es para WebGPU — este proyecto usa WebGL (Three.js r165). Esta skill tiene contexto específico de WebGL, performance budgets y patterns R3F.

**Reglas del SRS a respetar siempre:**
- `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))` — siempre
- Máx. 50k tris en escena hero
- Máx. 10 draw calls/frame
- Three.js: siempre lazy load vía `React.lazy()`
- `<Canvas dpr={[1, 1.5]} gl={{ antialias: false }}>` en hero

---

#### `gsap-scrolltrigger`
**Qué hace:** GSAP 3.12 completo — timelines, tweens, ScrollTrigger, Flip, TextPlugin. Patterns de scroll-driven animation, pinning, scrubbing, parallax.

**Cuándo activar:**
- Loader sequence (`main.jsx` / `Loader` component)
- Hero parallax y SplitType reveal
- Scroll animations de todas las secciones (Work rows, About, Contact)
- Custom cursor (`CustomCursor.jsx`)
- Navbar hide-on-scroll
- Magnetic buttons, card hovers
- Cualquier archivo que use `gsap.*` o `ScrollTrigger.*`

**Cómo usar:** Activación automática. Siempre combinar con `react-three-fiber` skill para animaciones que afecten la escena 3D.

**Por qué:** Mismo ecosistema que `threejs-webgl` — documentación de integración entre ambas skills. La skill de greensock/gsap-skills tiene estructura diferente, no compatible con este marketplace.

**Reglas del SRS a respetar siempre:**
- NUNCA usar `useEffect` directo para GSAP — SIEMPRE `useGSAP` hook de `@gsap/react`
- `gsap.registerPlugin(ScrollTrigger, Flip, TextPlugin)` en `main.jsx` — una sola vez
- `ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true })` — global
- Animar SOLO: `transform` (x, y, scale, rotation), `opacity`
- NUNCA animar: `width`, `height`, `top`, `left`, `margin`, `padding`
- `prefers-reduced-motion`: `gsap.globalTimeline.timeScale(0)` cuando detectado
- Mobile (< 768px): desactivar parallax multi-layer con `ScrollTrigger.matchMedia`

---

#### `react-three-fiber`
**Qué hace:** R3F + Drei — integración React/Three.js, hooks (`useFrame`, `useThree`), componentes declarativos, performance con `@react-three/drei` helpers.

**Cuándo activar:**
- `HeroCanvas.jsx` — componente Canvas principal
- `ParticleField.jsx` — campo de partículas
- `HeroObject.jsx` — objeto 3D central
- Cualquier componente que use `<Canvas>`, `useFrame`, `useThree`

**Cómo usar:** Siempre en conjunto con `threejs-webgl`. Si hay conflicto de patterns entre R3F y Three.js imperativo → preferir R3F en componentes React.

**Por qué:** El SRS especifica `@react-three/fiber` + `@react-three/drei` como stack 3D. R3F maneja el loop de render y lifecycle de React — sin esta skill Claude mezcla patterns imperativos y declarativos incorrectamente.

---

### 3.2 pbakaus/impeccable

Instalación:
```bash
npx impeccable skills install   # instala en .claude/skills/ automáticamente
# Luego en Claude Code:
/impeccable init                 # OBLIGATORIO — primer uso, carga contexto del proyecto
```

**Qué hace:** Design language system con 23 comandos. Detecta y corrige AI slop (Inter para todo, gradientes purple-blue, cards anidadas, grey text on color). Opera en modo **brand** para este proyecto (portfolio = marketing/editorial, no producto SaaS).

**Cuándo activar:**
- Al completar cualquier componente visual antes de considerar terminado
- Al implementar cualquier sección nueva
- Antes de cada fase de revisión
- Cuando el diseño se "siente genérico"

**Comandos clave para este proyecto:**
```
/impeccable polish     → refinamiento post-implementación (espaciado, tipografía, color)
/impeccable audit      → detecta anti-patterns en el componente actual
/impeccable typeset    → ajusta jerarquía tipográfica (Playfair + DM Sans + JetBrains)
/impeccable colorize   → verifica uso correcto de paleta del SRS
/impeccable animate    → revisa que las animaciones GSAP no sean "AI genéricas"
/impeccable critique   → feedback editorial del componente
```

**Por qué:** Previene que el output de Claude caiga en los mismos patrones genéricos de AI. La paleta del SRS (lima `#C8F04D`, crema `#E8E0D4`, fondo `#0A0A0A`) ya resuelve el problema de color — Impeccable complementa con tipografía, espaciado y motion.

**Modo brand vs product:** Este portfolio es BRAND. Impeccable ajusta sus reglas al modo editorial/portfolio automáticamente tras `/impeccable init`.

**Regla:** Correr `/impeccable audit` en cada componente antes de marcar como terminado.

---

### 3.3 claude-code-templates

Instalación:
```bash
npx claude-code-templates@latest --skill development/senior-architect
npx claude-code-templates@latest --skill creative-design/frontend-design
npx claude-code-templates@latest --skill creative-design/mobile-design
npx claude-code-templates@latest --skill development/code-reviewer
npx claude-code-templates@latest --skill development/clean-code
npx claude-code-templates@latest --skill development/senior-qa
```

---

#### `senior-architect`
**Cuándo:** FASE 1 únicamente — setup, estructura de archivos, decisiones técnicas, vite.config.js, MUI theme, routing, arquitectura de carpetas.
**Desactivar implícitamente** al salir de Fase 1. No aplicar a componentes individuales.

---

#### `frontend-design`
**Cuándo:** Toda la implementación de componentes React — layout, CSS variables, MUI overrides, componentes UI. Es la skill base de frontend.
**Nota:** Esta skill originó Impeccable. Usarlas en conjunto: `frontend-design` para estructura/implementación, Impeccable para refinamiento y anti-patterns.

---

#### `mobile-design`
**Cuándo:** Al implementar cualquier breakpoint < 768px. Activar junto a `frontend-design` para trabajo responsive.
**Reglas del SRS:**
- Three.js hero → imagen estática en mobile (< 768px)
- Partículas: reducir de 2000 a 500
- Hover previews → tap-to-reveal
- WhatsApp button → sticky bottom-right en mobile

---

### 3.4 Skills de revisión (Fase Review)

> Activar en orden secuencial al completar cada fase de implementación.

#### `code-reviewer`
**Cuándo:** Al completar cada fase. Revisar consistencia, posibles bugs, patterns incorrectos.
**Output esperado:** Lista de issues ordenados por severidad.

#### `clean-code`
**Cuándo:** Después de `code-reviewer`. Aplicar en componentes marcados con issues.
**Foco:** Naming, funciones puras, separación de responsabilidades, comentarios del SRS en cada componente.

#### `senior-qa`
**Cuándo:** Última instancia antes de considerar una fase completa.
**Checklist mínimo:** CWV targets del SRS §5.5 | a11y §5.3 | responsive breakpoints | animaciones con `prefers-reduced-motion`.

---

## 5. Fases de desarrollo

```
FASE 1 — Setup          → senior-architect
FASE 2 — Base visual    → frontend-design + impeccable
FASE 3 — Animaciones    → gsap-scrolltrigger + frontend-design
FASE 4 — 3D             → threejs-webgl + react-three-fiber
FASE 5 — Secciones      → frontend-design + gsap-scrolltrigger + impeccable
FASE 6 — Mobile         → mobile-design + frontend-design
FASE 7 — Review         → code-reviewer → clean-code → senior-qa
FASE 8 — Deploy         → senior-qa (Lighthouse check)
```

**Regla de fases:** Completar y revisar cada fase antes de avanzar. No mezclar fases.

---

## 6. Reglas operativas globales

```
✓ Antes de cada fase: confirmar qué vas a hacer, esperar "ok"
✓ Decisión arquitectónica no cubierta en SRS → pausar y consultar
✓ CSS: SOLO variables de SRS §2.1 — ningún color hardcodeado
✓ Cada componente: comentario indicando qué sección del SRS implementa
✓ GSAP: siempre useGSAP hook, nunca useEffect directo
✓ Three.js: siempre React.lazy(), nunca import directo en bundle principal
✓ split-type en lugar de SplitText en todos los componentes
✓ /impeccable audit antes de marcar cualquier componente como terminado
✓ Al finalizar fase: reportar árbol modificado + errores encontrados
```

---

## 7. Sistema de memoria persistente

### Archivo: `PROJECT_MEMORY.md`
Ubicación: raíz del proyecto. Claude Code lo lee al inicio de cada sesión para conocer el estado actual del proyecto sin repetir trabajo ya hecho.

**Leer al inicio de cada sesión** — antes de cualquier acción, leer `PROJECT_MEMORY.md` completo.
**Si no existe** → crearlo con la estructura vacía definida abajo.

---

### Comando: "actualizar memoria"

Cuando el usuario escriba **"actualizar memoria"**, ejecutar estas acciones en orden:

1. Revisar todo lo trabajado en la sesión actual
2. Actualizar `PROJECT_MEMORY.md` con el siguiente formato:

```markdown
# PROJECT_MEMORY.md — Portfolio Personal
**Última actualización:** [fecha y hora]
**Sesión:** [número incremental]

---

## Estado de fases

| Fase | Estado | Notas |
|---|---|---|
| FASE 1 — Setup | ✅ Completo / 🔄 En progreso / ⬜ Pendiente | [observaciones] |
| FASE 2 — Base visual | ... | ... |
| FASE 3 — Animaciones | ... | ... |
| FASE 4 — 3D | ... | ... |
| FASE 5 — Secciones | ... | ... |
| FASE 6 — Mobile | ... | ... |
| FASE 7 — Review | ... | ... |
| FASE 8 — Deploy | ... | ... |

---

## Componentes completados

| Componente | Archivo | Fase | Skills aplicadas | Notas |
|---|---|---|---|---|
| CustomCursor | src/components/cursor/CustomCursor.jsx | FASE 2 | gsap-scrolltrigger, impeccable | audit pasado |

---

## Decisiones tomadas

| Decisión | Motivo | Alternativa descartada |
|---|---|---|
| split-type en lugar de SplitText | Sin licencia Club GSAP | SplitText |

---

## Problemas resueltos

| Problema | Solución aplicada | Archivo afectado |
|---|---|---|

---

## Datos del proyecto confirmados

| Campo | Valor |
|---|---|
| NOMBRE_COMPLETO | [valor o "pendiente"] |
| WHATSAPP | [valor o "pendiente"] |
| EMAILJS_SERVICE_ID | [valor o "pendiente"] |
| DOMINIO_DEPLOY | [valor o "pendiente"] |

---

## Próxima sesión — continuar en

- Fase actual: [nombre]
- Próximo componente/tarea: [descripción específica]
- Bloqueantes pendientes: [lista o "ninguno"]
```

3. Confirmar al usuario: "Memoria actualizada — sesión [N] guardada."

---

### Regla de uso
- Actualizar memoria al final de cada sesión de trabajo
- Actualizar memoria al completar cualquier fase completa
- NO esperar que el usuario lo pida si se completa una fase — sugerirlo proactivamente: "¿Actualizamos la memoria antes de cerrar?"

---

## 8. Información del proyecto (completar antes de iniciar)

```
NOMBRE_COMPLETO:     [Leandro De Los Santos Aboy]
WHATSAPP:            [formato: +5491168116492]
EMAILJS_SERVICE_ID:  [Pendiente]
EMAILJS_TEMPLATE_ID: [Pendiente]
EMAILJS_PUBLIC_KEY:  [Pendiente]
DOMINIO_DEPLOY:      [https://portfolioleandro.vercel.app/]
GITHUB_URL:          [https://github.com/Leandelosantos]
LINKEDIN_URL:        [https://www.linkedin.com/in/leandrodelossantosaboy/]
```

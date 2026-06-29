# CLAUDE.md — Portfolio Personal
> Fuente de verdad operativa para este proyecto. Leer completo antes de ejecutar cualquier acción.
> Instalación de skills + rationale histórico → `SKILLS_SETUP.md` (no cargar salvo reinstalar/entender el por qué).

---

## 1. Documentos de referencia

| Archivo | Propósito | Precedencia |
|---|---|---|
| `SRS_portfolio.md` | Especificaciones completas: stack, paleta, tipografía, animaciones, estructura | **Máxima** |
| `buenas-practicas.md` | Reglas de código del proyecto | Alta |
| `CLAUDE.md` (este archivo) | Operativa de desarrollo, skills, fases | Alta |

**Regla:** Ante conflicto entre documentos → SRS_portfolio.md gana siempre.

---

## 2. Figma MCP — proyecto "portfolio2.0"

**Qué provee:** acceso directo a componentes, variables de diseño, layout, tokens visuales y specs del proyecto Figma "portfolio2.0".

**Cuándo usar:**
| Momento | Acción |
|---|---|
| Planificación | Leer "portfolio2.0" para comparar diseño vs SRS_portfolio.md — identificar divergencias antes de planificar |
| Personalizar skills | Extraer tokens reales de Figma para personalizar skills con valores exactos del diseño |
| Base visual | Referencia visual para globals.css y muiTheme.js |
| Secciones | Referencia por componente — leer frame específico antes de implementar |
| Antes de `/impeccable audit` | Comparar implementación vs diseño original |

`/impeccable distill` → extrae el design system del proyecto Figma activo.

**Regla:** Ante divergencia entre Figma y SRS_portfolio.md → pausar y consultar. No asumir cuál es la versión correcta.

---

## 3. Stack técnico

```
React 18 + Vite 5 | GSAP 3.12+ | Three.js r165 | @react-three/fiber | @react-three/drei | MUI v5 | split-type
```

**IMPORTANTE:** `SplitText` de GSAP requiere licencia Club — NO usar. Reemplazo: `split-type`.
API compatible: `new SplitType('.selector', { types: 'chars,words' })` → `.chars` / `.words`

---

## 4. Skills instaladas — triggers activos

### `threejs-webgl`
**Cuándo activar:** todo archivo en `src/components/three/`, partículas hero, objeto 3D central, transición page wipe, cualquier shader custom.
**Reglas del SRS a respetar siempre:**
- `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))` — siempre
- Máx. 50k tris en escena hero | Máx. 10 draw calls/frame
- Three.js: siempre lazy load vía `React.lazy()`
- `<Canvas dpr={[1, 1.5]} gl={{ antialias: false }}>` en hero

### `gsap-scrolltrigger`
**Cuándo activar:** loader sequence, hero parallax/SplitType reveal, scroll animations de secciones, custom cursor, navbar hide-on-scroll, magnetic buttons, cualquier archivo con `gsap.*`/`ScrollTrigger.*`. Combinar siempre con `react-three-fiber` si afecta la escena 3D.
**Reglas del SRS a respetar siempre:**
- NUNCA `useEffect` directo para GSAP — SIEMPRE `useGSAP` hook de `@gsap/react`
- `gsap.registerPlugin(ScrollTrigger, Flip, TextPlugin)` en `main.jsx` — una sola vez
- `ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true })` — global
- Animar SOLO: `transform` (x, y, scale, rotation), `opacity`. NUNCA: `width`, `height`, `top`, `left`, `margin`, `padding`
- `prefers-reduced-motion`: `gsap.globalTimeline.timeScale(0)` cuando detectado
- Mobile (< 768px): desactivar parallax multi-layer con `ScrollTrigger.matchMedia`

### `react-three-fiber`
**Cuándo activar:** `HeroCanvas.jsx`, `ParticleField.jsx`, `HeroObject.jsx`, cualquier componente con `<Canvas>`/`useFrame`/`useThree`. Siempre junto a `threejs-webgl`. Conflicto de patterns → preferir R3F declarativo en componentes React.

### `impeccable` (modo brand — portfolio = editorial, no SaaS)
**Cuándo activar:** al completar cualquier componente visual, al implementar sección nueva, antes de cada fase de revisión, cuando el diseño "se siente genérico".
**Comandos clave:**
```
/impeccable polish     → refinamiento post-implementación (espaciado, tipografía, color)
/impeccable audit      → detecta anti-patterns en el componente actual
/impeccable typeset    → ajusta jerarquía tipográfica (Playfair + DM Sans + JetBrains)
/impeccable colorize   → verifica uso correcto de paleta del SRS
/impeccable animate    → revisa que las animaciones GSAP no sean "AI genéricas"
/impeccable critique   → feedback editorial del componente
```
**Regla:** Correr `/impeccable audit` en cada componente antes de marcar como terminado.

### `senior-architect`
**Cuándo:** FASE 1 únicamente — setup, estructura de archivos, decisiones técnicas, vite.config.js, MUI theme, routing. Desactivar implícitamente al salir de Fase 1.

### `frontend-design`
**Cuándo:** toda implementación de componentes React — layout, CSS variables, MUI overrides. Skill base de frontend; usar junto a `impeccable` para refinamiento.

### `mobile-design`
**Cuándo:** cualquier breakpoint < 768px, junto a `frontend-design`.
**Reglas del SRS:**
- Three.js hero → imagen estática en mobile (< 768px)
- Partículas: reducir de 2000 a 500
- Hover previews → tap-to-reveal
- WhatsApp button → sticky bottom-right en mobile

### Skills de revisión (Fase Review) — activar en orden secuencial
- **`code-reviewer`**: al completar cada fase. Output = lista de issues por severidad.
- **`clean-code`**: después de `code-reviewer`. Foco: naming, funciones puras, separación de responsabilidades, comentarios del SRS en cada componente.
- **`senior-qa`**: última instancia antes de cerrar una fase. Checklist mínimo: CWV targets SRS §5.5 | a11y §5.3 | responsive breakpoints | animaciones con `prefers-reduced-motion`.

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
✓ No usar Playwright/MCP de browser para verificar cambios salvo pedido explícito del usuario
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

## 8. Información del proyecto

```
NOMBRE_COMPLETO:     Leandro De Los Santos Aboy
WHATSAPP:            +5491168116492
EMAILJS_SERVICE_ID:  Pendiente
EMAILJS_TEMPLATE_ID: Pendiente
EMAILJS_PUBLIC_KEY:  Pendiente
DOMINIO_DEPLOY:      https://portfolioleandro.vercel.app/
GITHUB_URL:          https://github.com/Leandelosantos
LINKEDIN_URL:        https://www.linkedin.com/in/leandrodelossantosaboy/
```

## 9. Graphify — Mapa de conocimiento del proyecto

El grafo vive en `graphify-out/` (graph.json · graph.html · GRAPH_REPORT.md).

### Regla de exploración OBLIGATORIA

**NUNCA usar `grep`, `find`, ni leer archivos a ciegas para entender el código.**
Siempre usar graphify primero:

| Pregunta | Comando |
|---|---|
| ¿Cómo funciona X? / ¿Dónde está Y? | `graphify query "<pregunta>"` |
| ¿Qué relación hay entre A y B? | `graphify path "<A>" "<B>"` |
| ¿Qué hace este concepto/componente? | `graphify explain "<concepto>"` |

Solo leer archivos fuente después de que graphify haya orientado el contexto, o para editar líneas específicas ya identificadas.

Esta regla aplica también a subagentes — incluirla en todo prompt de exploración.

### MCP server

`graphify-mcp` expone: `query_graph`, `get_node`, `shortest_path` — usar cuando el servidor MCP esté activo.

### Mantenimiento del grafo

- **Automático en cada commit:** `.git/hooks/post-commit` ya instalado — tras CUALQUIER commit, rebuild AST en background (sin bloquear el commit, sin costo de API). No requiere acción manual ni de Claude.
- Verificar que sigue instalado: `cat .git/hooks/post-commit | grep graphify-hook-start` — si no aparece, reinstalar con `graphify hook install`.
- Log del último rebuild: `~/.cache/graphify-rebuild.log`
- Rebuild completo (cambios de arquitectura grandes): `/graphify` (re-extracción semántica con subagentes)
- `.graphifyignore` en raíz controla qué se indexa (excluye node_modules, skills vendored, dist, .env)

**Regla para Claude:** Nunca asumir que el grafo está desactualizado tras un commit propio — el hook ya lo actualiza. Si el hook falla o no existe, avisar al usuario antes de continuar con cualquier exploración basada en graphify.

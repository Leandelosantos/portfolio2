# code-reviewer — Contexto del Proyecto Portfolio

> LEER ANTES que el SKILL.md. Checklist de review específico para este proyecto.

## Stack a revisar

```
React 18 + Vite 5 | GSAP 3.12 + @gsap/react | Three.js r165 + R3F + Drei
MUI v5 | split-type | @emailjs/browser | react-hook-form
```

**NO existe:** backend, base de datos, Docker, CI/CD, tests automatizados.

## Checklist de review por componente

### GSAP — Errores críticos

- [ ] ¿Usa `useEffect` para GSAP? → **ERROR**: cambiar a `useGSAP`
- [ ] ¿Registra plugins dentro del componente? → **ERROR**: solo en `main.jsx`
- [ ] ¿Anima `width`, `height`, `top`, `left`, `margin`, `padding`? → **ERROR**
- [ ] ¿Falta `split.revert()` en cleanup? → **BUG**: memory leak
- [ ] ¿Falta cleanup de `ScrollTrigger`? → **BUG**: listeners huérfanos
- [ ] ¿`will-change` permanente sin remover en `onComplete`? → Degradación de performance

### Three.js — Errores críticos

- [ ] ¿`HeroCanvas` importado sin `React.lazy()`? → **ERROR**: 600kb en bundle inicial
- [ ] ¿`dpr` mayor que `[1, 1.5]`? → **ERROR**: excede budget de performance
- [ ] ¿`antialias: true` en canvas de partículas? → **ERROR**: innecesario, costoso
- [ ] ¿`renderer.setPixelRatio(window.devicePixelRatio)` sin límite 1.5? → **ERROR**
- [ ] ¿Falta `dispose()` en geometría/material/textura? → **BUG**: memory leak
- [ ] ¿`setState` dentro de `useFrame`? → **ERROR**: re-renders cada frame

### React — Patrones

- [ ] ¿Lógica de animación dentro del componente (no en hook)? → Mover a hook
- [ ] ¿Componente > 150 líneas? → Extraer lógica a hook
- [ ] ¿`useState` para valor derivable? → Usar `useMemo`
- [ ] ¿Prop drilling > 2 niveles? → Usar Context
- [ ] ¿Import directo de datos en componente? → Debe ir por `data/projects.js`

### CSS — Estilo

- [ ] ¿Color hex hardcodeado? → Reemplazar con variable de `globals.css`
- [ ] ¿Estilo MUI por defecto visible? → Override faltante en `muiTheme.js`
- [ ] ¿`border-radius` distinto de 0 sin justificación? → Revisar
- [ ] ¿Falta `@media (pointer: fine)` para cursor custom? → Bug en touch devices

### Accesibilidad — SRS §5.3

- [ ] ¿Botón con solo ícono sin `aria-label`? → **ERROR**
- [ ] ¿Imagen decorativa con alt descriptivo? → Debe ser `alt=""`
- [ ] ¿Imagen de proyecto sin alt descriptivo? → Agregar
- [ ] ¿Falta `focus-visible` con `--color-accent-hot`? → Agregar
- [ ] ¿`prefers-reduced-motion` no respetado? → **ERROR** (manejado en `main.jsx`)

### Variables de entorno

- [ ] ¿Key de EmailJS hardcodeada? → **CRÍTICO**: mover a `.env.local`
- [ ] ¿Número WhatsApp hardcodeado? → **ERROR**: usar `import.meta.env.VITE_WHATSAPP_NUMBER`
- [ ] ¿`console.log` en código de producción? → Eliminar (solo en `import.meta.env.DEV`)

## Severidades

| Severidad | Descripción |
|---|---|
| **CRÍTICO** | Bug seguro, security issue, o violación de reglas absolutas del SRS |
| **ERROR** | Violación de buenas-practicas.md o patrón incorrecto |
| **WARNING** | Mejora de performance o legibilidad |
| **INFO** | Sugerencia no bloqueante |

## Orden de review por fase

- **Fase 2:** Loader, CustomCursor, Navbar, Footer, hooks, utils
- **Fase 3:** Hero, HeroCanvas, ParticleField, HeroObject
- **Fase 4:** Work, ProjectRow, FeaturedProject, CaseStudy, projects.js
- **Fase 5:** About, Contact, WhatsAppButton, PageTransition
- **Fase 6:** Responsive en todos los componentes anteriores

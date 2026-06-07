# frontend-design — Contexto del Proyecto Portfolio

> LEER ANTES que el SKILL.md. Contexto específico del proyecto que complementa las guías genéricas.

## Dirección estética — YA DEFINIDA (no reinventar)

**Estilo:** Dark editorial — referencia Lebedev (artemiilebedev.com)
- Texto grande como elemento gráfico
- Alta densidad visual controlada
- Asimetría deliberada
- Tipografía display dominante
- Proyectos como "objetos de peso visual"
- Scroll intencionado

**NO usar:** gradientes purple-blue, cards anidadas, Inter para todo, grey text on color, rounded corners, ripple effects.

## Paleta — SRS §2.1 (SOLO variables CSS, nunca hex hardcodeado)

```css
--color-bg:             #0A0A0A   /* fondo global */
--color-bg-elevated:    #111111   /* cards, overlays */
--color-bg-subtle:      #161616   /* secciones alternadas */
--color-text-primary:   #F0EDE8   /* headlines */
--color-text-secondary: #8A8680   /* metadata, labels */
--color-text-muted:     #3D3B38   /* separadores */
--color-accent:         #E8E0D4   /* hover states */
--color-accent-hot:     #C8F04D   /* CTA ÚNICO + cursor dot */
--color-accent-mid:     #4D7CFF   /* links activos */
--color-border:         rgba(240,237,232,0.08)
--color-border-hover:   rgba(240,237,232,0.20)
```

**Regla crítica:** `--color-accent-hot` SOLO en CTA principal y cursor dot. Nunca más de 2 acentos simultáneos en viewport.

## Tipografía — SRS §2.2

```css
--font-display: 'Playfair Display'   /* headlines, hero, project names */
--font-ui:      'DM Sans'            /* body, labels, nav */
--font-mono:    'JetBrains Mono'     /* stack tech, timestamps, botones CTA */

--type-display:  clamp(56px, 8vw, 120px)  /* weight 900 */
--type-headline: clamp(32px, 4vw, 64px)   /* weight 700 */
--type-project:  clamp(24px, 3vw, 48px)   /* weight 400 italic */
--type-body:     clamp(15px, 1.2vw, 18px) /* weight 300/400 */
--type-label:    12px                      /* weight 500, uppercase, ls 0.1em */
--type-mono:     13px                      /* weight 400, ls 0.05em */
```

**Regla:** máx 3 niveles tipográficos simultáneos. Contraste ≥ 2x entre nivel 1 y 2.

## Layout — SRS §2.3

```
Grid: 12 columnas, gap 24px, max-width 1440px
Márgenes: clamp(24px, 6vw, 120px)
Breakpoints: 375 | 768 | 1280 | 1600px
```

## MUI — Override strategy SRS §2.5

MUI se usa SOLO como base de a11y y comportamiento. Cero estilos por defecto visibles:
- `borderRadius: 0` global
- `textTransform: 'none'` en botones
- `disableRipple: true` global
- Formularios: border crema, focus: lima
- Usar `sx` prop o theme overrides — NUNCA clases MUI directas

## GSAP en componentes

**NUNCA `useEffect` para GSAP** — siempre `useGSAP` de `@gsap/react`.

```jsx
import { useGSAP } from '@gsap/react';

useGSAP(() => {
  // Código GSAP aquí
  // cleanup automático al desmontar
}, { scope: containerRef });
```

## split-type — reemplaza SplitText

```jsx
import SplitType from 'split-type';

useGSAP(() => {
  const split = new SplitType('.hero__name', { types: 'chars,words' });
  gsap.from(split.chars, { opacity: 0, yPercent: 120, stagger: 0.05 });
  return () => split.revert(); // OBLIGATORIO
}, { scope: containerRef });
```

## Cursor custom

Ocultar cursor por defecto en `globals.css`:
```css
@media (pointer: fine) { * { cursor: none !important; } }
```
`CustomCursor.jsx` renderiza dot lima 8px + ring 40px con lag.

## Reglas de CSS

- SOLO variables de `globals.css` — cero hex hardcodeados
- Animar SOLO: `transform (x, y, scale, rotation)`, `opacity`
- NUNCA animar: `width, height, top, left, margin, padding`
- `will-change: transform` en `onStart`, remover en `onComplete`

## Comentarios en componentes

Cada componente lleva comentario en la primera línea indicando qué sección del SRS implementa:
```jsx
// Hero.jsx — SRS §4.2 — Hero Section
// CustomCursor.jsx — SRS §2.4 — Custom Cursor
```

## Checklist por componente (antes de cerrar)

- [ ] Solo variables CSS del SRS §2.1
- [ ] Máx 3 niveles tipográficos en viewport
- [ ] `useGSAP`, nunca `useEffect` para GSAP
- [ ] `split.revert()` en cleanup
- [ ] focus-visible con `--color-accent-hot`
- [ ] Comentario de sección SRS en la primera línea
- [ ] `/impeccable audit` ejecutado

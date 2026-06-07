# gsap-scrolltrigger — Contexto del Proyecto Portfolio

> Complementa la skill gsap-scrolltrigger del plugin. Estas reglas SOBREESCRIBEN los patterns genéricos cuando hay conflicto.

## Reglas absolutas (no negociables)

- NUNCA `useEffect` para GSAP — SIEMPRE `useGSAP` de `@gsap/react`
- Plugins ya registrados en `main.jsx` — NO re-registrar en componentes
- `split-type` en lugar de SplitText — usar `utils/splitTextHelpers.js`
- Solo animar propiedades GPU: `x, y, scale, rotation, opacity`
- NUNCA animar: `width, height, top, left, margin, padding, font-size`
- `will-change: transform` en `onStart`, remover en `onComplete`
- Cleanup: `split.revert()` obligatorio en return del hook
- `prefers-reduced-motion` ya manejado globalmente en `main.jsx` — no duplicar

## ScrollTrigger — Config global (ya en main.jsx)

```js
ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
```

## Responsive (SRS §5.4)

```js
ScrollTrigger.matchMedia({
  '(max-width: 767px)': () => {
    // Solo fade + y translate. Sin parallax. Sin mouse tracking.
  },
  '(min-width: 768px)': () => {
    // Experiencia desktop completa
  }
});
```

## Animaciones del proyecto por sección

### Loader (SRS §3.2)
```js
// 0.0s — counter 0→100 (TextPlugin, ease: power2.inOut, 1.2s)
// 0.8s — nombre letra por letra (split-type, stagger: 0.04s)
// 1.2s — wipe hacia arriba (2 divs, stagger: 0.15s)
// 1.5s — hero content fade-in + slide-up (y: 40→0)
// 1.8s — cursor activo, ScrollTrigger habilitado
```

### Hero (SRS §3.3)
```js
gsap.to('.hero__bg-mesh',  { yPercent: -30, ease: 'none', scrollTrigger: { scrub: 1.5 } });
gsap.to('.hero__headline', { yPercent: -15, ease: 'none', scrollTrigger: { scrub: 1 } });
gsap.to('.hero__subtext',  { yPercent: -8, opacity: 0,    scrollTrigger: { scrub: 0.8, end: 'bottom 30%' } });
```

### Work rows (SRS §3.3)
- Línea divisora: `scaleX: 0 → 1`, `transformOrigin: 'left'`, en `start: 'top 85%'`
- Índice: `x: -20, opacity: 0`, duración 0.4s
- Título: `y: 24, opacity: 0`, ease: power3.out
- Preview imagen sigue cursor: `gsap.quickTo(img, 'x', { duration: 0.5, ease: 'power3' })`

### About — word reveal (SRS §3.3)
```js
// split-type words, stagger: 0.02, yPercent: 50, duration: 0.5, ease: 'power2.out'
```

### Contact entrance (SRS §3.3)
```js
// .contact__big-text: yPercent: 100, duration: 1, ease: 'expo.out'
// .contact__form: opacity: 0, y: 40, duration: 0.6
```

### Navbar (SRS §3.4)
```js
// Ocultar al bajar > 80px: yPercent: -100, duration: 0.3, ease: 'power2.in'
// Mostrar al subir: yPercent: 0, duration: 0.4, ease: 'power2.out'
```

### Magnetic button CTA (SRS §3.4)
```js
// mousemove: x: dx*0.3, y: dy*0.3, duration: 0.3, ease: 'power2.out'
// mouseleave: x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)'
```

## Paleta de colores (SRS §2.1) — usar siempre variables CSS

```css
--color-accent-hot: #C8F04D  /* CTA único, cursor dot */
--color-accent:     #E8E0D4  /* hover states */
--color-accent-mid: #4D7CFF  /* links activos */
```

## REVEAL_STRATEGIES — de utils/gsapHelpers.js

```js
export const REVEAL_STRATEGIES = {
  fadeUp:    { opacity: 0, y: 40,        duration: 0.6, ease: 'power3.out' },
  splitChar: { opacity: 0, yPercent: 120, rotationZ: 8, stagger: 0.05 },
  lineWipe:  { scaleX: 0, transformOrigin: 'left', duration: 0.6 },
};
```

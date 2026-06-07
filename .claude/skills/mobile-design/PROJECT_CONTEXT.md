# mobile-design — Contexto del Proyecto Portfolio

> LEER ANTES que el SKILL.md. Esta skill se usa para web responsivo, NO para React Native ni Flutter.

## Aclaración crítica

Este proyecto es una **web app React + Vite** con diseño responsivo.
NO es React Native, Flutter, SwiftUI, ni ningún framework móvil nativo.

**Ignorar** en el SKILL.md genérico:
- Toda referencia a React Native, Flutter, SwiftUI, Kotlin
- FlatList, SecureStore, Keychain, SSL pinning, Flipper
- APK/IPA, gestos nativos de iOS/Android
- Push notifications, offline sync

**Aplicar** del SKILL.md genérico:
- Principios de touch targets (≥ 44px)
- Thumb zone para CTAs
- Performance de animaciones (GPU only)

## Breakpoints del proyecto (SRS §2.3)

```
mobile:  375px  → degradación máxima
tablet:  768px  → degradación media
desktop: 1280px → experiencia completa
wide:    1600px → full experience
```

## Tabla de degradación por breakpoint (SRS §5.4 + buenas-practicas §4)

| Elemento | ≥ 1280px | 768-1279px | < 768px |
|---|---|---|---|
| Three.js hero | Escena completa, 2000 partículas | 1000 partículas | **Imagen estática** |
| Parallax | Multi-capa | 1 capa | **Desactivado** |
| Preview hover | Imagen sigue cursor | Thumbnail inline | **Tap-to-reveal** |
| Cursor custom | Activo | Activo | **Oculto** |
| WhatsApp button | Normal en footer | Normal | **Sticky bottom-right** |

## Responsive en GSAP

```js
ScrollTrigger.matchMedia({
  '(max-width: 767px)': () => {
    // Solo fade + y translate
    // Sin parallax multi-layer
    // Sin mouse tracking
  },
  '(min-width: 768px)': () => {
    // Experiencia desktop completa
  }
});
```

## Touch en web

- Elementos táctiles: mínimo **44×44px** (buenas-practicas §4)
- Reemplazar hover previews por tap-to-reveal en < 768px
- Swipe gestures en galería de case study
- WhatsApp button: sticky `position: fixed; bottom: 1.5rem; right: 1.5rem` en mobile

## Three.js en mobile (SRS §5.4)

```jsx
// En Hero.jsx — detectar mobile antes de montar canvas
const isMobile = window.matchMedia('(max-width: 767px)').matches;

// Si mobile: imagen estática + no montar HeroCanvas
{isMobile
  ? <img src="/assets/hero-static.webp" alt="" aria-hidden="true" />
  : <Suspense fallback={<div className="hero__canvas-placeholder" />}>
      <HeroCanvas mouseRef={mouseRef} />
    </Suspense>
}
```

## Tablet (768-1279px)

- Partículas: reducir a 1000 (prop `count` en `ParticleField`)
- Preview hover: desactivar imagen flotante, mostrar thumbnail inline en `ProjectRow`
- Layout proyectos: sin lista Lebedev completa, mostrar cards simplificadas

## CSS responsivo — reglas

- Usar `clamp()` para tipografía (ya definido en `typography.css`)
- Márgenes con `clamp(24px, 6vw, 120px)`
- Grid: 12 cols desktop → 6 cols tablet → 4 cols mobile
- Media queries en CSS Modules o inline `sx` prop de MUI — no en GSAP directamente

## Checkpoint mobile (antes de cerrar FASE 6)

- [ ] 375px: canvas estático, sin parallax, WhatsApp sticky, cursor oculto
- [ ] 768px: 1000 partículas, 1 capa parallax, thumbnail inline
- [ ] 1280px+: experiencia completa
- [ ] Todos los táctiles ≥ 44×44px
- [ ] ScrollTrigger.matchMedia activo para parallax
- [ ] Viewport meta tag en index.html (`width=device-width, initial-scale=1`)

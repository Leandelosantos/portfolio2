# Design

## Color palette

Strategy: **Committed** — near-black surface with one saturated lime accent. Dark-native. No warm neutrals, no gradients.

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#0A0A0A` | Global background |
| `--color-bg-elevated` | `#111111` | Cards, overlays |
| `--color-bg-subtle` | `#161616` | Alternate sections |
| `--color-text-primary` | `#F0EDE8` | Headlines, high-emphasis text |
| `--color-text-secondary` | `#8A8680` | Metadata, labels, nav |
| `--color-text-muted` | `#3D3B38` | Separators, disabled |
| `--color-accent` | `#E8E0D4` | Hover states (crema) |
| `--color-accent-hot` | `#C8F04D` | **Single CTA + cursor dot. Nowhere else.** |
| `--color-accent-mid` | `#4D7CFF` | Active links |
| `--color-border` | `rgba(240,237,232,0.08)` | Subtle dividers |
| `--color-border-hover` | `rgba(240,237,232,0.20)` | Hover dividers |

## Typography

Three families, committed roles. Note: Playfair Display and DM Sans are pre-committed brand identity; identity-preservation overrides reflex-reject consideration.

| Token | Font | Weight | Scale | Role |
|---|---|---|---|---|
| `--font-display` | Playfair Display | 900 | `clamp(56px, 8vw, 120px)` | Hero headline, display |
| `--font-ui` | DM Sans | 300/400/500 | body | Nav, labels, body copy |
| `--font-mono` | JetBrains Mono | 400/500 | `13px` | Tech labels, CTAs, timestamps |

Scale tokens:
- `--type-display`: `clamp(56px, 8vw, 120px)` — weight 900
- `--type-headline`: `clamp(32px, 4vw, 64px)` — weight 700
- `--type-project`: `clamp(24px, 3vw, 48px)` — weight 400 italic
- `--type-body`: `clamp(15px, 1.2vw, 18px)` — weight 300/400
- `--type-label`: `12px` — weight 500, uppercase, ls 0.1em
- `--type-mono`: `13px` — weight 400, ls 0.05em

## Components

### Cursor
- Dot: 8px, `--color-accent-hot`, `pointer-events: none`, `position: fixed`
- Ring: 40px, 1px border `--color-accent-hot`, lag behind cursor (GSAP quickTo, 0.4s ease)
- Scales to 2.5× over interactive elements
- Hidden on touch devices (`pointer: coarse`)

### Navbar
- `position: fixed`, full-width, padding `1.25rem 6vw`
- Transparent at top → `rgba(10,10,10,0.92)` + `backdrop-filter: blur(12px)` on scroll
- Brand: "LDS" in mono 13px uppercase
- Links: Proyectos / IA / Exhibiciones / Sobre mí — DM Sans 500, 12px, uppercase
- Hide on scroll-down (GSAP yPercent -110), show on scroll-up

### Loader
- `position: fixed`, inset 0, z-index 9999, `--color-bg` background
- Counter: 000→100 in mono at bottom-left
- Name reveal: split-type chars from yPercent 120
- Exit: yPercent -100, power3.inOut, 0.7s
- Total: 1.8s

### Footer
- Top border `--color-border`
- Brand name at display scale, role in mono
- Links: mono 13px uppercase
- Local time (Buenos Aires ART, updates each minute)
- Social: GitHub, LinkedIn

## Layout

- Grid: 12 columns, gap 24px, max-width 1440px
- Margins: `clamp(24px, 6vw, 120px)`
- Breakpoints: 375 / 768 / 1280 / 1600px

## Motion

- Library: GSAP 3.12 + @gsap/react (useGSAP hook — never useEffect)
- Animate only: `transform` (x, y, scale, rotation), `opacity`
- Never animate: `width`, `height`, `top`, `left`, `margin`, `padding`
- `will-change: transform` on `onStart`, removed on `onComplete`
- prefers-reduced-motion: `gsap.globalTimeline.timeScale(0)`
- Mobile (<768px): parallax disabled via ScrollTrigger.matchMedia

## Three.js / WebGL

- `<Canvas dpr={[1, 1.5]} gl={{ antialias: false }}>` — always
- Lazy loaded via `React.lazy()` — never in main bundle
- Max 50k triangles in hero scene
- Max 10 draw calls/frame
- Mobile (<768px): static image fallback, no canvas

## CSS rules

- Zero hardcoded hex values in components — only CSS variables from above
- `border-radius: 0` everywhere (MUI global override)
- No ripple effects (MUI `disableRipple: true` globally)
- Cursor hidden via `@media (pointer: fine) { * { cursor: none !important; } }`
- focus-visible: `2px solid var(--color-accent-hot)`, outline-offset 2px

# tasks/todo.md — Portfolio Personal

## FASE 1 — Setup base
- [x] Directorio de proyecto creado
- [x] package.json con todas las dependencias
- [x] vite.config.js (alias @, code splitting)
- [x] index.html (SEO, OG tags, JSON-LD, preload fuentes)
- [x] src/main.jsx (GSAP register, prefers-reduced-motion)
- [x] src/App.jsx (Router base + MUI provider)
- [x] src/theme/muiTheme.js (overrides SRS §2.5)
- [x] src/styles/globals.css (CSS variables SRS §2.1 + reset)
- [x] src/styles/typography.css (tokens SRS §2.2)
- [x] .gitignore
- [x] .env.example
- [x] vercel.json (SPA rewrite + security headers)
- [ ] npm install completado
- [ ] npm run dev — verificar arranque sin errores
- [ ] Verificar: fondo #0A0A0A visible en browser
- [ ] Verificar: GSAP registrado (sin errores en console)
- [ ] Verificar: CSS variables disponibles en DevTools

**⚠️ PENDIENTE CONSULTA USUARIO:** Divergencias Figma vs SRS (ver abajo)

---

## FASE 2 — Base visual (Loader, Cursor, Navbar, Footer)
- [ ] Loader.jsx
- [ ] CustomCursor.jsx
- [ ] Navbar.jsx
- [ ] Footer.jsx
- [ ] SkipLink.jsx
- [ ] LoaderContext.jsx
- [ ] MouseContext.jsx
- [ ] hooks/useMousePosition.js
- [ ] hooks/useNavbarBehavior.js
- [ ] hooks/useReducedMotion.js
- [ ] utils/gsapHelpers.js
- [ ] utils/splitTextHelpers.js

## FASE 3 — Hero + Three.js
## FASE 4 — Work + Case Study
## FASE 5 — About + Contact (+ EmailJS setup previo)
## FASE 6 — Mobile responsive
## FASE 7 — Review + QA
## FASE 8 — Deploy Vercel

# tasks/lessons.md — Lecciones aprendidas

## Sesión 1 — Planificación + FASE 1

### Decisiones tomadas
- `emailjs-com@^3.2.0` (SRS §7) → reemplazado por `@emailjs/browser@^4` (paquete activo, mismo equipo)
- `vite-plugin-prerender` → omitido temporalmente, evaluar en FASE 8 (compatibilidad Vite 5 incierta)
- `SplitText` → `split-type` en todo el proyecto (sin licencia Club GSAP)
- MUI `disableRipple: true` global → estética inconsistente con el proyecto
- Hero: Figma gana sobre SRS — tagline "Ingeniería como Arte" + 3D a la derecha
- Nav: Proyectos / IA / Exhibiciones / Sobre mí (Figma)
- Página IA incluida en rutas
- Brand footer: nombre del dev, no "MONOLITH_"

### Patrones a recordar
- GSAP: siempre `useGSAP` de `@gsap/react`, nunca `useEffect`
- Three.js: siempre `React.lazy()`, nunca en bundle principal
- CSS: solo variables de SRS §2.1, cero colores hardcodeados
- split-type: guardar instancia + llamar `.revert()` en cleanup del hook
- Hooks reciben refs como parámetros (inyección de dependencias — buenas-practicas §1)

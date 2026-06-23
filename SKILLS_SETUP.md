# SKILLS_SETUP.md — Instalación y justificación de skills
> Setup de una sola vez + rationale histórico. NO se carga por sesión — solo consultar si hay que reinstalar algo o entender por qué se eligió una skill sobre otra.
> Las reglas activas/triggers de cada skill viven en `CLAUDE.md`. Este archivo es el respaldo de "cómo instalar" y "por qué".

---

## Figma MCP — proyecto "portfolio2.0"

```bash
claude plugin install figma@claude-plugins-official
# Luego en Claude Code — autenticación manual obligatoria:
/mcp → seleccionar "figma" → Authenticate → Allow Access (browser)
```

---

## freshtechbro/claudedesignskills

```bash
/plugin marketplace add freshtechbro/claudedesignskills
/plugin install threejs-webgl
/plugin install gsap-scrolltrigger
/plugin install react-three-fiber
```

### Por qué `threejs-webgl`
`webgpu-claude-skill` original es para WebGPU — este proyecto usa WebGL (Three.js r165). Esta skill tiene contexto específico de WebGL, performance budgets y patterns R3F.

### Por qué `gsap-scrolltrigger`
Mismo ecosistema que `threejs-webgl` — documentación de integración entre ambas skills. La skill de greensock/gsap-skills tiene estructura diferente, no compatible con este marketplace.

### Por qué `react-three-fiber`
El SRS especifica `@react-three/fiber` + `@react-three/drei` como stack 3D. R3F maneja el loop de render y lifecycle de React — sin esta skill Claude mezcla patterns imperativos y declarativos incorrectamente.

---

## pbakaus/impeccable

```bash
npx impeccable skills install   # instala en .claude/skills/ automáticamente
# Luego en Claude Code:
/impeccable init                 # OBLIGATORIO — primer uso, carga contexto del proyecto
```

### Por qué
Previene que el output de Claude caiga en los mismos patrones genéricos de AI. La paleta del SRS (lima `#C8F04D`, crema `#E8E0D4`, fondo `#0A0A0A`) ya resuelve el problema de color — Impeccable complementa con tipografía, espaciado y motion.

---

## claude-code-templates

```bash
npx claude-code-templates@latest --skill development/senior-architect
npx claude-code-templates@latest --skill creative-design/frontend-design
npx claude-code-templates@latest --skill creative-design/mobile-design
npx claude-code-templates@latest --skill development/code-reviewer
npx claude-code-templates@latest --skill development/clean-code
npx claude-code-templates@latest --skill development/senior-qa
```

`frontend-design` originó Impeccable — usarlas en conjunto: `frontend-design` para estructura/implementación, Impeccable para refinamiento y anti-patterns.

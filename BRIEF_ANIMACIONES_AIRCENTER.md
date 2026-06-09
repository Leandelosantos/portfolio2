# Brief técnico — Animaciones inspiradas en aircenter.space
> Para Claude Code. Adaptar al stack y paleta del SRS_portfolio.md.
> Referencia visual analizada: aircenter.space (video scroll completo)

---

## Contexto del análisis

El sitio usa 6 patrones de animación y composición distintos aplicados en secuencia
de scroll. La adaptación al portfolio invierte el color scheme (ellos: blanco → nosotros:
#0A0A0A) pero conserva la lógica compositiva.

---

## PATRÓN 1 — Hero: letras tipográficas oversized como contenedor del objeto 3D

### Qué hace aircenter
Las letras "A", "I", "R" se distribuyen en el viewport a tamaño gigante (300–400px).
Están parcialmente cortadas por los bordes. El objeto 3D vive entre las letras,
occupando el espacio negativo. Al idle rota levemente. Al scroll, las letras se separan
más y el objeto desaparece.

### Adaptación al portfolio
```
IMPLEMENTAR:
- Nombre del dev dividido en 3 fragmentos tipográficos gigantes (ej: "L", "AN", nombre)
  distribuidos en los extremos del viewport — overflow hidden en los bordes
- Fuente: Playfair Display 900 — clamp(200px, 25vw, 400px)
- Color: var(--color-text-primary) #F0EDE8
- El objeto 3D central (ver Patrón 2) vive en el espacio entre las letras

GSAP — reveal de letras al cargar (post-loader):
gsap.from('.hero-letter', {
  opacity: 0,
  scale: 0.85,
  stagger: { each: 0.08, from: 'edges' },
  duration: 1.2,
  ease: 'expo.out',
  delay: 1.5
})

GSAP — al scrollear, letras se separan horizontalmente:
gsap.to('.hero-letter-left',  { x: '-15vw', ease: 'none', scrollTrigger: { scrub: 1.5 } })
gsap.to('.hero-letter-right', { x:  '15vw', ease: 'none', scrollTrigger: { scrub: 1.5 } })
```

---

## PATRÓN 2 — Objeto 3D central: accordion / layered slices

### Qué hace aircenter
El objeto principal del hero es una geometría hecha de láminas/slices apilados
que forman dos formas distintas: un anillo (torus de láminas) y un bloque rectangular.
Material: blanco/off-white, sin textura, solo shadows suaves. Rota en idle.
Con scroll desaparece (opacity fade + scale down).

### Adaptación al portfolio
```
THREE.JS — Objeto de láminas (LayeredSliceGeometry):
- Crear con TubeGeometry o ExtrudeGeometry apilado N veces (N=40–60 láminas)
- Cada lámina: BoxGeometry(2, 0.05, 2) rotada y desplazada en Y
- Alternativa más limpia: usar LatheGeometry con perfil de "acordeón"
- Material: MeshStandardMaterial({ color: #E8E0D4, roughness: 0.3, metalness: 0.1 })
- Escala relativa al nombre tipográfico — debe "vivir" entre las letras

REACT THREE FIBER:
function LayeredObject({ scrollProgress }) {
  const meshRef = useRef()
  useFrame(({ clock, mouse }) => {
    meshRef.current.rotation.y = clock.elapsedTime * 0.003 + mouse.x * 0.05
    meshRef.current.rotation.x = clock.elapsedTime * 0.001 + mouse.y * 0.03
    // Fade con scroll
    meshRef.current.material.opacity = 1 - scrollProgress * 2
    meshRef.current.scale.setScalar(1 - scrollProgress * 0.3)
  })
}

GSAP → THREE.JS sync (patrón del SRS):
ScrollTrigger.create({
  trigger: '.hero',
  start: 'top top',
  end: 'bottom top',
  onUpdate: (self) => {
    setScrollProgress(self.progress) // state que pasa al canvas
  }
})
```

---

## PATRÓN 3 — Objeto 3D secundario: esfera metálica cromada (sección About/Skills)

### Qué hace aircenter
En la sección media, un objeto 3D metálico cromado (esfera con anillos concéntricos
estilo gyroscope o Möbius) flota en un panel oscuro. Es altamente reflectante.
Rota suavemente en idle, reacciona al mouse con parallax leve.

### Adaptación al portfolio
```
Usar en sección: About o Skills

THREE.JS — Gyroscope object:
- Esfera central: SphereGeometry(1, 64, 64)
- 2-3 anillos: TorusGeometry(1.4, 0.04, 16, 100) rotados en ejes distintos
- Material: MeshStandardMaterial({
    color: #888888,
    metalness: 0.95,
    roughness: 0.05,
    envMapIntensity: 1.5
  })
- Agregar Environment de @react-three/drei para reflejos (preset: 'studio' o 'city')

useFrame(({ clock, mouse }) => {
  // Rotación idle
  sphere.current.rotation.y += 0.004
  ring1.current.rotation.x += 0.002
  ring2.current.rotation.z += 0.003
  // Mouse parallax
  group.current.rotation.x = mouse.y * 0.15
  group.current.rotation.y = mouse.x * 0.15
})

LAYOUT (replicar aircenter):
- Sección en dos columnas: left col → texto About, right col → Canvas con gyroscope
- Canvas: height: 100%, background: var(--color-bg-elevated) #111111
- No usar fondo negro puro en el canvas — usar #111111 para que el objeto no flote
```

---

## PATRÓN 4 — Parallax fotográfico multicapa

### Qué hace aircenter
Fotos de arquitectura (renders o fotos reales) con parallax fuerte:
la imagen se mueve a 30–40% de la velocidad del scroll, creando sensación de
profundidad cinematográfica. El texto encima se mueve a velocidad diferente.

### Adaptación al portfolio (sección Work / Case Studies)
```
Implementar en: hero de case studies, sección Work overview

HTML: contenedor overflow:hidden + imagen hija con height: 120%
CSS:
.parallax-container { overflow: hidden; position: relative; }
.parallax-img { width: 100%; height: 120%; object-fit: cover; will-change: transform; }

GSAP:
gsap.utils.toArray('.parallax-img').forEach(img => {
  gsap.to(img, {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: img.parentElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })
})

// Texto encima del parallax — velocidad diferente (más lento que la imagen)
gsap.to('.parallax-headline', {
  yPercent: 30,
  ease: 'none',
  scrollTrigger: { scrub: 0.5 }
})
```

---

## PATRÓN 5 — Titular oversized partido en dos extremos del viewport

### Qué hace aircenter
Titulares de sección (ej: "THE MOMENTUM | TO RISE HIGHER") divididos en dos partes:
una en el extremo izquierdo, otra en el extremo derecho. Aparecen desde fuera del
viewport al scrollear. Crean un "gate" visual que el usuario atraviesa.

### Adaptación al portfolio
```
Usar en: transición entre secciones (hero → work, work → about)

HTML:
<div class="split-headline">
  <span class="split-left">SELECTED</span>
  <span class="split-right">WORK</span>
</div>

CSS:
.split-headline { display:flex; justify-content:space-between; overflow:hidden; }
.split-left, .split-right {
  font-family: var(--font-display);
  font-size: clamp(48px, 8vw, 120px);
  font-weight: 900;
  color: var(--color-text-primary);
}

GSAP — reveal desde bordes:
gsap.from('.split-left',  {
  x: '-100px', opacity: 0, duration: 1, ease: 'expo.out',
  scrollTrigger: { trigger: '.split-headline', start: 'top 80%', once: true }
})
gsap.from('.split-right', {
  x:  '100px', opacity: 0, duration: 1, ease: 'expo.out',
  scrollTrigger: { trigger: '.split-headline', start: 'top 80%', once: true }
})

// Al scrollear la sección: las dos mitades se separan aún más (parallax opuesto)
gsap.to('.split-left',  { x: '-5vw', ease: 'none', scrollTrigger: { scrub: 1 } })
gsap.to('.split-right', { x:  '5vw', ease: 'none', scrollTrigger: { scrub: 1 } })
```

---

## PATRÓN 6 — Inversión de color scheme (footer)

### Qué hace aircenter
El sitio comienza en blanco (#FFFFFF) y termina en negro puro. En el footer,
las letras "A I R" aparecen en blanco sobre negro — la inversión exacta del hero.
El efecto crea un cierre compositivo muy fuerte.

### Adaptación al portfolio (ya aplica — nuestro color scheme es inverso)
```
Nuestro portfolio ya es dark-first (#0A0A0A). El cierre del footer puede hacer
lo contrario: texto enorme del nombre en crema #F0EDE8 sobre #0A0A0A.

// Nombre dividido en footer — espejo del hero
.footer-name {
  font-size: clamp(120px, 20vw, 280px);
  font-weight: 900;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  display: flex;
  justify-content: space-between;
}

// El acento lima aparece solo en footer como único color:
.footer-cta { color: var(--color-accent-hot); } /* #C8F04D */
```

---

## Notas de implementación para Claude Code

```
IMPORTANTE — Diferencias con aircenter que DEBEMOS mantener del SRS:

1. Color scheme INVERTIDO: aircenter es blanco, portfolio es #0A0A0A
   → Los objetos 3D deben ser claros/metálicos sobre fondo oscuro, no al revés

2. Material del objeto laminado (Patrón 2):
   → aircenter usa blanco. Nosotros: usar #E8E0D4 (crema) con emissive leve
   → O alternativamente: wireframe sobre fondo oscuro (más técnico, más dev portfolio)

3. El objeto metálico cromado (Patrón 3):
   → Funciona igual en dark mode — los reflejos del EnvMap se ven mejor sobre oscuro

4. Fotos de parallax (Patrón 4):
   → No tenemos renders de edificios. Usar: screenshots de proyectos reales,
     o video loops de proyectos (< 3MB, autoplay muted)

5. Performance:
   → dpr={[1, 1.5]} siempre en Canvas
   → Lazy load de todos los Canvas
   → En mobile (< 768px): reemplazar Canvas por imagen estática

6. Orden de implementación sugerido:
   FASE 1: Patrón 5 (split headlines) — solo CSS/GSAP, sin Three.js
   FASE 2: Patrón 4 (parallax fotos) — solo GSAP
   FASE 3: Patrón 1 (letras oversized hero) — CSS + GSAP
   FASE 4: Patrón 2 (objeto laminado) — Three.js + R3F
   FASE 5: Patrón 3 (gyroscope) — Three.js + R3F + EnvMap
   FASE 6: Patrón 6 (footer cierre)
```

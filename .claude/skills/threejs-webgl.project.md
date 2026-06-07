# threejs-webgl — Contexto del Proyecto Portfolio

> Complementa la skill threejs-webgl del plugin. Reglas SOBREESCRIBEN patterns genéricos en caso de conflicto.

## Reglas absolutas (SRS §5.1 + buenas-practicas §3)

- `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))` — SIEMPRE, sin excepción
- `antialias: false` en todas las escenas de partículas
- Lazy load OBLIGATORIO — nunca importar Three.js en bundle principal
- `dispose()` en geometrías, materiales y texturas al desmontar
- Pausar render loop cuando canvas no está en viewport
- LOD obligatorio para objetos con > 5k polígonos

## Performance budget — Hero (SRS §5.1)

```
Máx. triángulos:  50,000
Máx. draw calls:  10 por frame
Partículas hero:  2,000 desktop | 1,000 tablet | 500 mobile
```

## Hero Canvas — configuración (SRS §3.5)

```jsx
// HeroCanvas.jsx — SRS §3.5
<Canvas
  dpr={[1, 1.5]}
  gl={{ antialias: false }}
  camera={{ position: [0, 0, 5], fov: 75 }}
>
  <ParticleField mouseRef={mouseRef} count={2000} />
  <HeroObject />
</Canvas>
```

## Lazy load — patrón obligatorio

```jsx
// En Hero.jsx
const HeroCanvas = React.lazy(() => import('./three/HeroCanvas'));

<Suspense fallback={<div className="hero__canvas-placeholder" />}>
  <HeroCanvas mouseRef={mouseRef} />
</Suspense>
```

## ParticleField — specs (SRS §3.5)

```js
// ~2000 partículas en BufferGeometry (no SphereGeometry individual)
// Mouse influence: radio 150px, fuerza 0.3
// Color: #E8E0D4 con opacity 0.4
// Shader custom con noise para movimiento orgánico
// instancedMesh si > 5000 puntos
```

## HeroObject — specs (SRS §3.5)

```js
// Geometría abstracta: TorusKnotGeometry o IcosahedronGeometry
// ShaderMaterial: wireframe + fill parcial
// Rotación idle: 0.003 rad/frame Y, 0.001 rad/frame X
// Mouse parallax: factor 0.05
useFrame(({ clock, mouse }) => {
  mesh.rotation.y = clock.elapsedTime * 0.003 + mouse.x * 0.05;
  mesh.rotation.x = clock.elapsedTime * 0.001 + mouse.y * 0.05;
});
```

## Layout hero — Canvas en mitad DERECHA (Figma, aprobado)

```
Viewport: 1280px
├── Texto hero (izquierda): 640px
└── HeroCanvas (derecha): 640px
```

## Dispose cleanup obligatorio

```js
useEffect(() => {
  return () => {
    geometry.dispose();
    material.dispose();
    if (texture) texture.dispose();
  };
}, []);
```

## Mobile (SRS §5.4)

```jsx
// < 768px: reemplazar HeroCanvas por imagen estática
// Usar CSS media query o matchMedia en el componente Hero
const isMobile = window.matchMedia('(max-width: 767px)').matches;
// Si isMobile: no montar HeroCanvas, mostrar <img src="hero-static.webp" />
```

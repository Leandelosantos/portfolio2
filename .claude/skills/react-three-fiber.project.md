# react-three-fiber — Contexto del Proyecto Portfolio

> Complementa la skill react-three-fiber del plugin. Reglas SOBREESCRIBEN patterns genéricos en caso de conflicto.

## Reglas absolutas

- `dpr={[1, 1.5]}` en TODOS los `<Canvas>` — sin excepción
- `gl={{ antialias: false }}` en canvas de partículas
- NUNCA `useEffect` para GSAP dentro de componentes R3F — usar `useGSAP`
- `useFrame` para animaciones 3D continuas (no GSAP para render loop)
- Si hay conflicto entre pattern R3F y Three.js imperativo: PREFERIR R3F en componentes React

## Canvas principal — Hero

```jsx
<Canvas
  dpr={[1, 1.5]}
  gl={{ antialias: false }}
  camera={{ position: [0, 0, 5], fov: 75 }}
  style={{ position: 'absolute', inset: 0 }}
>
  <ParticleField mouseRef={mouseRef} count={2000} />
  <HeroObject />
</Canvas>
```

## Layout Hero (Figma aprobado)

```
┌─────────────────────────────────┐
│ Hero Section (100vw, 100vh)     │
│ ┌─────────────┐ ┌─────────────┐ │
│ │ Texto hero  │ │ HeroCanvas  │ │
│ │ (50%)       │ │ (50%)       │ │
│ │ - Tagline   │ │ position:   │ │
│ │ - Subtítulo │ │ absolute    │ │
│ │ - CTAs      │ │ right: 0    │ │
│ └─────────────┘ └─────────────┘ │
└─────────────────────────────────┘
```

## useFrame — pattern correcto

```jsx
// Mutación directa de ref — sin setState, sin re-renders
const meshRef = useRef();

useFrame(({ clock, mouse }) => {
  meshRef.current.rotation.y = clock.elapsedTime * 0.003 + mouse.x * 0.05;
  meshRef.current.rotation.x = clock.elapsedTime * 0.001 + mouse.y * 0.05;
});
```

## GSAP dentro de R3F — patrón correcto

```jsx
import { useGSAP } from '@gsap/react'; // NUNCA useEffect

function HeroObject() {
  const meshRef = useRef();

  // GSAP para animaciones de entrada/eventos
  useGSAP(() => {
    gsap.from(meshRef.current.scale, {
      x: 0, y: 0, z: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)'
    });
  }, []);

  // useFrame para animación continua (rotation idle)
  useFrame(({ clock, mouse }) => {
    meshRef.current.rotation.y = clock.elapsedTime * 0.003 + mouse.x * 0.05;
  });

  return <mesh ref={meshRef}>...</mesh>;
}
```

## Performance — Partículas (BufferGeometry, no instancias)

```jsx
function ParticleField({ count = 2000 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#E8E0D4" transparent opacity={0.4} />
    </points>
  );
}
```

## Adaptive performance

```jsx
import { AdaptiveDpr } from '@react-three/drei';

<Canvas dpr={[1, 1.5]}>
  <AdaptiveDpr pixelated /> {/* Reduce DPR si cae rendimiento */}
  <ParticleField />
</Canvas>
```

## Dispose en useEffect (geometría manual)

```jsx
useEffect(() => {
  const geo = new THREE.BufferGeometry();
  return () => geo.dispose(); // OBLIGATORIO
}, []);
```

// ParticleField.jsx — SRS §4.2 — Campo de partículas del hero
// buenas-practicas: useFrame sin setState | dispose automático via R3F JSX
// Performance: count reducido en tablet vía prop

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export function ParticleField({ count = 2000 }) {
  const meshRef = useRef();

  // Float32Array: solo JS memory, no WebGL resource — no dispose necesario
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribución en esfera suavizada (no uniforme — más denso en el centro)
      const r = Math.cbrt(Math.random()) * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  // useFrame sin setState — solo mutación del objeto Three.js
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.04;
    meshRef.current.rotation.x = t * 0.015;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      {/* Color --color-text-muted equivalente — partículas muy sutiles */}
      <pointsMaterial
        size={0.025}
        color="#3D3B38"
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}

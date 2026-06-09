// HeroObject.jsx — SRS §4.2 — Objeto 3D central del hero
// TorusKnot wireframe — matemático, elegante — "Ingeniería como Arte"
// buenas-practicas: useFrame sin setState | mouse influence via MouseContext
// Tris: TorusKnotGeometry(1.2, 0.35, 100, 12) ≈ 2400 tris — dentro del budget

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useMouse } from '../../context/MouseContext';

export function HeroObject() {
  const meshRef = useRef();
  const mouseRef = useMouse();

  // useFrame: mutación directa — sin setState, sin re-renders
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Rotación base + influencia del mouse (normalizado [-1,1])
    meshRef.current.rotation.y = t * 0.18 + mouseRef.current.xNorm * 0.35;
    meshRef.current.rotation.x = t * 0.06 - mouseRef.current.yNorm * 0.25;
  });

  return (
    <mesh ref={meshRef}>
      {/* p=2, q=3: knot clásico — más orgánico que p=2,q=7 */}
      <torusKnotGeometry args={[1.2, 0.35, 100, 12, 2, 3]} />
      {/*
        meshBasicMaterial: sin cálculo de iluminación — máxima performance.
        Color --color-text-secondary equivalente (#8A8680).
        wireframe: true para estética editorial/técnica.
      */}
      <meshBasicMaterial
        color="#C8F04D"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

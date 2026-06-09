// HelmetFallback.jsx — Objeto Three.js mostrado mientras no existe helmet.glb
// Icosaedro wireframe estilo editorial — consistente con HeroObject del hero
// Mouse parallax via useMouse, Float idle, misma estructura que HelmetObject
// Reemplazar cuando helmet.glb esté disponible en /public/assets/

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useMouse } from '../../context/MouseContext';

export function HelmetFallback() {
  const parallaxRef = useRef();
  const mouseRef = useMouse();

  useFrame(() => {
    if (!parallaxRef.current) return;
    const targetY =  mouseRef.current.xNorm * 0.45;
    const targetX = -mouseRef.current.yNorm * 0.22;
    parallaxRef.current.rotation.y += (targetY - parallaxRef.current.rotation.y) * 0.055;
    parallaxRef.current.rotation.x += (targetX - parallaxRef.current.rotation.x) * 0.055;
  });

  return (
    <group ref={parallaxRef}>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.5}>
        {/* Icosaedro wireframe — placeholder editorial */}
        <mesh>
          <icosahedronGeometry args={[1.4, 1]} />
          <meshBasicMaterial color="#8A8680" wireframe transparent opacity={0.4} />
        </mesh>
        {/* Esfera interior — sugiere profundidad */}
        <mesh>
          <icosahedronGeometry args={[0.85, 0]} />
          <meshBasicMaterial color="#C8F04D" wireframe transparent opacity={0.15} />
        </mesh>
      </Float>
    </group>
  );
}

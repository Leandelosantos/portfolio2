// HelmetObject.jsx — Casco GLB para IAPage hero
// useGSAP NO funciona dentro del reconciler de R3F — escala controlada en useFrame
// Estructura: parallaxGroup (mouse) → Float (idle) → scaleGroup (entrada)
// GLB tiene escala interna 0.1345 → primitive scale={5} para compensar

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import { useMouse } from '../../context/MouseContext';

useGLTF.preload('/assets/helmet.glb');

// easeOutBack — curva de entrada con rebote leve
function easeOutBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

export function HelmetObject() {
  const parallaxRef = useRef();
  const scaleRef    = useRef();
  const startTime   = useRef(null);   // null = aún no inició la entrada
  const mouseRef    = useMouse();

  const { scene } = useGLTF('/assets/helmet.glb');

  // Clonar scene — materiales originales del GLB sin emissive forzado
  const clonedScene = useMemo(() => {
    return scene.clone(true);
  }, [scene]);

  useEffect(() => {
    return () => {
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          child.geometry?.dispose();
          child.material?.dispose();
        }
      });
    };
  }, [clonedScene]);

  useFrame(({ clock }) => {
    // ── Mouse parallax ─────────────────────────────────────
    if (parallaxRef.current) {
      const targetY =  mouseRef.current.xNorm * 0.45;
      const targetX = -mouseRef.current.yNorm * 0.22;
      parallaxRef.current.rotation.y += (targetY - parallaxRef.current.rotation.y) * 0.055;
      parallaxRef.current.rotation.x += (targetX - parallaxRef.current.rotation.x) * 0.055;
    }

    // ── Scale entrance — easeOutBack puro en useFrame ──────
    if (scaleRef.current) {
      if (startTime.current === null) {
        startTime.current = clock.getElapsedTime();
        scaleRef.current.scale.setScalar(0);
      }
      const elapsed   = clock.getElapsedTime() - startTime.current;
      const progress  = Math.min(1, elapsed / 1.2);
      const s         = easeOutBack(progress);
      scaleRef.current.scale.setScalar(Math.max(0, s));
    }
  });

  return (
    <group ref={parallaxRef}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5} floatingRange={[-0.08, 0.08]}>
        <group ref={scaleRef}>
          {/* scale=5 compensa la escala interna 0.1345 del GLB Sketchfab */}
          <primitive object={clonedScene} scale={6} position={[0, 0.30, 0]} />
        </group>
      </Float>
    </group>
  );
}

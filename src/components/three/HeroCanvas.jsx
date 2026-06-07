// HeroCanvas.jsx — SRS §4.2 — Canvas Three.js + R3F del hero
// Lazy loaded via React.lazy() en Hero.jsx — NUNCA importar directamente
// buenas-practicas: dpr={[1,1.5]}, gl.antialias=false, sin setState en useFrame
// Mobile (<768px): retorna null — sin WebGL context en dispositivos touch

import { Canvas } from '@react-three/fiber';
import { ParticleField } from './ParticleField';
import { HeroObject } from './HeroObject';

// Detectar mobile en module scope — se evalúa una vez al cargar el chunk lazy
const isMobile = window.matchMedia('(max-width: 767px)').matches;

// Reducir partículas en tablet para mantener 60fps
const particleCount = window.matchMedia('(max-width: 1279px)').matches ? 1000 : 2000;

export default function HeroCanvas() {
  // Mobile: no canvas — sin WebGL context, sin chunk de Three.js activo
  if (isMobile) return null;

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 5.5], fov: 55 }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        // Canvas transparente — fondo lo provee el section (--color-bg)
        background: 'transparent',
      }}
    >
      {/* Sin luz: meshBasicMaterial no requiere iluminación — draw call 0 para luz */}
      <ParticleField count={particleCount} />
      <HeroObject />
    </Canvas>
  );
}

// ParticlesCanvas.jsx — Canvas R3F solo-partículas, reutilizable fuera del hero
// Lazy loaded via React.lazy() — NUNCA importar directamente
// buenas-practicas: dpr={[1,1.5]}, gl.antialias=false
// Mobile (<768px): retorna null — sin WebGL context en dispositivos touch

import { Canvas } from '@react-three/fiber';
import { ParticleField } from './ParticleField';

const isMobile = window.matchMedia('(max-width: 767px)').matches;

// Densidad reducida vs. el hero — fondo secundario, no protagonista
const particleCount = window.matchMedia('(max-width: 1279px)').matches ? 500 : 900;

export default function ParticlesCanvas() {
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
        background: 'transparent',
      }}
    >
      <ParticleField count={particleCount} />
    </Canvas>
  );
}

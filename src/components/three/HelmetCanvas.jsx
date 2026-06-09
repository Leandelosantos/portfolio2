// HelmetCanvas.jsx — Canvas IAPage: helmet GLB sin postprocessing
// Lazy loaded via React.lazy() en IAPage
// Bloom eliminado: @react-three/postprocessing crashea al combinar Suspense + R3F v8
// Glow simulado con emissiveIntensity en HelmetObject + pointLight lima
// ErrorBoundary DOM-level: captura errores del Canvas antes de que rompan la página

import { Component, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { HelmetObject } from './HelmetObject';
import { HelmetFallback } from './HelmetFallback';

const isMobile = window.innerWidth < 768;

// ErrorBoundary DOM-level (fuera del Canvas) — captura errores R3F
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null; // falla silenciosamente
    return this.props.children;
  }
}

function SceneContent() {
  return (
    <>
      <color attach="background" args={['#0A0A0A']} />
      <Environment preset="studio" />

      {/* Key light */}
      <directionalLight position={[2, 3.5, 3]} intensity={1.5} />
      {/* Fill azul brand */}
      <directionalLight position={[-3, 0, 2]} intensity={0.35} color="#4d7cff" />

      <Suspense fallback={<HelmetFallback />}>
        <HelmetObject />
      </Suspense>
    </>
  );
}

export default function HelmetCanvas() {
  if (isMobile) return null;

  return (
    <CanvasErrorBoundary>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        camera={{ position: [0, 0.2, 5], fov: 40 }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <SceneContent />
      </Canvas>
    </CanvasErrorBoundary>
  );
}

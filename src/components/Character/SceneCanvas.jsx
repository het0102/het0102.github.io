import React, { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import { Model } from './Model';

const ResponsiveCamera = () => {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / size.height;
    if (aspect < 0.75) {
      // Narrow portrait mobile
      camera.position.set(0, 0.05, 4.6);
      camera.fov = 44;
    } else if (aspect < 1.15) {
      // Tablet / squareish viewports
      camera.position.set(0, 0.1, 4.3);
      camera.fov = 42;
    } else {
      // Desktop / landscape
      camera.position.set(0, 0.15, 3.9);
      camera.fov = 40;
    }
    camera.updateProjectionMatrix();
  }, [size.width, size.height, camera]);

  return null;
};

export const SceneCanvas = () => {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0.15, 4.0], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <ResponsiveCamera />

        {/* Base Ambient Illumination */}
        <ambientLight intensity={0.8} />

        {/* Cyan Key Light */}
        <directionalLight
          position={[3, 2.5, 2]}
          intensity={1.8}
          color="#00f2fe"
        />

        {/* Deep Purple Fill Light */}
        <directionalLight
          position={[-3, -1, 1]}
          intensity={0.8}
          color="#8a2be2"
        />

        {/* Dramatic Magenta/Pink Rim Backlight */}
        <pointLight
          position={[-3, 2, -2]}
          intensity={2.4}
          color="#ff007f"
        />

        {/* Top Rim Cyan Accent */}
        <pointLight
          position={[0, 4, -1]}
          intensity={1.2}
          color="#00f2fe"
        />

        <Suspense fallback={null}>
          <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.45}>
            <Model />
          </Float>
          <ContactShadows
            position={[0, -1.35, 0]}
            opacity={0.65}
            scale={7}
            blur={2.2}
            far={5}
            color="#00f2fe"
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneCanvas;


import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * High-tech Stylized 3D Cyber Developer Model
 * Features:
 * - Emissive pulsing reactor core
 * - Cybernetic helmet with glowing curved visor
 * - Concentric orbiting holographic rings
 * - Mouse cursor tracking tilt
 */
export const Model = () => {
  const groupRef = useRef();
  const headRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const coreRef = useRef();
  const particlesRef = useRef();

  // Subtle mouse tracking and idle animation loop
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Mouse parallax tracking
    const targetRotY = state.pointer.x * 0.4;
    const targetRotX = -state.pointer.y * 0.25;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotY,
        4,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotX,
        4,
        delta
      );
    }

    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.damp(
        headRef.current.rotation.y,
        targetRotY * 0.5,
        5,
        delta
      );
    }

    // Orbiting holographic rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.4;
      ring1Ref.current.rotation.y = t * 0.6;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.5;
      ring2Ref.current.rotation.z = t * 0.3;
    }

    // Pulsing energy core
    if (coreRef.current) {
      const scale = 1 + Math.sin(t * 3) * 0.08;
      coreRef.current.scale.set(scale, scale, scale);
    }

    // Gentle floating particles rotation
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Head & Helmet Group */}
      <group ref={headRef} position={[0, 0.75, 0]}>
        {/* Main Cyber Head */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.7, 0.75, 0.7]} />
          <meshStandardMaterial
            color="#12151f"
            roughness={0.2}
            metalness={0.85}
          />
        </mesh>

        {/* Curved Glowing Holographic Visor */}
        <mesh position={[0, 0.05, 0.36]}>
          <boxGeometry args={[0.62, 0.28, 0.06]} />
          <meshStandardMaterial
            color="#00f2fe"
            emissive="#00f2fe"
            emissiveIntensity={2.2}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Visor Scanline Accent */}
        <mesh position={[0, -0.04, 0.38]}>
          <boxGeometry args={[0.5, 0.03, 0.04]} />
          <meshStandardMaterial
            color="#ff007f"
            emissive="#ff007f"
            emissiveIntensity={3.0}
          />
        </mesh>

        {/* Cyber Ear Comm Modules (Left & Right) */}
        <mesh position={[-0.4, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.16, 0.16, 0.14, 16]} />
          <meshStandardMaterial
            color="#1e2230"
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[-0.48, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
          <meshStandardMaterial
            color="#00f2fe"
            emissive="#00f2fe"
            emissiveIntensity={2.5}
          />
        </mesh>

        <mesh position={[0.4, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.16, 0.16, 0.14, 16]} />
          <meshStandardMaterial
            color="#1e2230"
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0.48, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
          <meshStandardMaterial
            color="#ff007f"
            emissive="#ff007f"
            emissiveIntensity={2.5}
          />
        </mesh>

        {/* Top Antenna / Signal Fin */}
        <mesh position={[0, 0.44, -0.05]}>
          <boxGeometry args={[0.08, 0.16, 0.35]} />
          <meshStandardMaterial
            color="#00f2fe"
            emissive="#00f2fe"
            emissiveIntensity={1.5}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* Cyber Neck Collar */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.22, 0.26, 0.2, 16]} />
        <meshStandardMaterial
          color="#0d0f17"
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>

      {/* Torso / Tech Armor */}
      <group position={[0, -0.2, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.95, 0.9, 0.55]} />
          <meshStandardMaterial
            color="#151824"
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>

        {/* Angular Shoulder Plates */}
        <mesh position={[-0.62, 0.3, 0]} rotation={[0, 0, 0.25]}>
          <boxGeometry args={[0.35, 0.25, 0.48]} />
          <meshStandardMaterial
            color="#0b0e17"
            roughness={0.3}
            metalness={0.85}
          />
        </mesh>
        <mesh position={[0.62, 0.3, 0]} rotation={[0, 0, -0.25]}>
          <boxGeometry args={[0.35, 0.25, 0.48]} />
          <meshStandardMaterial
            color="#0b0e17"
            roughness={0.3}
            metalness={0.85}
          />
        </mesh>

        {/* Chest Cyber Core (Arc Reactor) */}
        <mesh ref={coreRef} position={[0, 0.12, 0.28]}>
          <cylinderGeometry args={[0.16, 0.16, 0.08, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial
            color="#00f2fe"
            emissive="#00f2fe"
            emissiveIntensity={3.5}
            roughness={0.1}
          />
        </mesh>

        {/* Chest Neon Accent Lines */}
        <mesh position={[-0.24, -0.15, 0.29]}>
          <boxGeometry args={[0.04, 0.35, 0.02]} />
          <meshStandardMaterial
            color="#ff007f"
            emissive="#ff007f"
            emissiveIntensity={2.5}
          />
        </mesh>
        <mesh position={[0.24, -0.15, 0.29]}>
          <boxGeometry args={[0.04, 0.35, 0.02]} />
          <meshStandardMaterial
            color="#00f2fe"
            emissive="#00f2fe"
            emissiveIntensity={2.5}
          />
        </mesh>
      </group>

      {/* Orbiting Holographic Ring 1 */}
      <mesh ref={ring1Ref} position={[0, 0.2, 0]}>
        <torusGeometry args={[1.25, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#00f2fe"
          emissive="#00f2fe"
          emissiveIntensity={2.0}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Orbiting Holographic Ring 2 */}
      <mesh ref={ring2Ref} position={[0, 0.2, 0]}>
        <torusGeometry args={[1.45, 0.012, 16, 64]} />
        <meshStandardMaterial
          color="#ff007f"
          emissive="#ff007f"
          emissiveIntensity={2.0}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Floating Data Crystal Orbs */}
      <group ref={particlesRef} position={[0, 0.2, 0]}>
        <mesh position={[1.1, 0.5, 0.2]}>
          <octahedronGeometry args={[0.08]} />
          <meshStandardMaterial
            color="#00f2fe"
            emissive="#00f2fe"
            emissiveIntensity={3.0}
          />
        </mesh>
        <mesh position={[-1.15, -0.3, 0.4]}>
          <octahedronGeometry args={[0.07]} />
          <meshStandardMaterial
            color="#ff007f"
            emissive="#ff007f"
            emissiveIntensity={3.0}
          />
        </mesh>
        <mesh position={[0.7, -0.7, -0.5]}>
          <octahedronGeometry args={[0.06]} />
          <meshStandardMaterial
            color="#4facfe"
            emissive="#4facfe"
            emissiveIntensity={2.5}
          />
        </mesh>
      </group>
    </group>
  );
};

export default Model;

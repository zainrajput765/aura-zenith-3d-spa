import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, ContactShadows, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Ultra-realistic 3D Stacked Zen Balance Stones with procedural gold vein rings
function ZenStones({ mousePos }) {
  const groupRef = useRef();
  const lotusRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth lerp mouse parallax tilt
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mousePos.x * 0.35 + state.clock.getElapsedTime() * 0.08,
        0.04
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mousePos.y * 0.15,
        0.04
      );
    }

    if (lotusRef.current) {
      // Gentle breathing animation for lotus petals
      lotusRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.15, 0]}>
      {/* Base Large Basalt Stone */}
      <mesh position={[0, -0.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.55, 1.75, 0.6, 64]} />
        <meshStandardMaterial
          color="#151C24"
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>

      {/* Embedded 24K Gold Accent Inlay Ring */}
      <mesh position={[0, -0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.57, 0.025, 16, 64]} />
        <meshStandardMaterial color="#F5E096" metalness={0.95} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.2} />
      </mesh>

      {/* Middle Balanced Stone */}
      <mesh position={[0.08, -0.08, 0.04]} rotation={[0.04, 0.25, -0.04]} castShadow receiveShadow>
        <cylinderGeometry args={[1.15, 1.35, 0.52, 64]} />
        <meshStandardMaterial
          color="#0F141A"
          roughness={0.25}
          metalness={0.5}
        />
      </mesh>

      {/* Gold Inlay Ring on Middle Stone */}
      <mesh position={[0.08, 0.18, 0.04]} rotation={[Math.PI / 2 + 0.04, 0.25, 0]}>
        <torusGeometry args={[1.16, 0.02, 16, 64]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Top Balanced Stone */}
      <mesh position={[-0.04, 0.44, -0.02]} rotation={[-0.06, -0.3, 0.03]} castShadow receiveShadow>
        <cylinderGeometry args={[0.72, 0.92, 0.46, 64]} />
        <meshStandardMaterial
          color="#1A232E"
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* Glowing Lotus Flower resting on top stone */}
      <group ref={lotusRef} position={[-0.04, 0.82, -0.02]} scale={0.85}>
        {/* Glowing Sacred Lotus Stamen */}
        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshBasicMaterial color="#FFF0BD" />
        </mesh>

        <pointLight position={[0, 0.2, 0]} intensity={1.5} color="#F5E096" distance={2} />

        {/* Outer 12 Lotus Petals */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.sin(angle) * 0.28, 0.14, Math.cos(angle) * 0.28]}
              rotation={[0.35, angle, 0.2]}
              castShadow
            >
              <coneGeometry args={[0.16, 0.65, 32]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#F7F4EF" : "#D4AF37"}
                roughness={0.15}
                metalness={0.2}
                transparent
                opacity={0.95}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// Realistic Water Surface Reflection Plane
function ReflectiveWater() {
  return (
    <mesh position={[0, -1.22, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[25, 25]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mirror={0.7}
        mixBlur={0.8}
        mixStrength={1.5}
        roughness={0.1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#080F16"
        metalness={0.85}
      />
    </mesh>
  );
}

export default function HeroZenScene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth) * 2 - 1,
      y: -(clientY / innerHeight) * 2 + 1,
    });
  };

  return (
    <div 
      className="w-full h-full relative cursor-grab active:cursor-grabbing"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 1.1, 4.4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Professional Studio Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 9, 6]} intensity={1.8} color="#FFF0BD" castShadow />
        <pointLight position={[-5, 3, -4]} intensity={1.2} color="#10B981" />
        <pointLight position={[0, 2.5, 3]} intensity={1.0} color="#D4AF37" />

        {/* Floating 3D Zen Stones */}
        <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.25}>
          <ZenStones mousePos={mousePos} />
        </Float>

        {/* Reflective Water & Contact Shadows */}
        <ReflectiveWater />
        <ContactShadows position={[0, -1.2, 0]} opacity={0.7} scale={7} blur={2.5} color="#D4AF37" />

        {/* Multi-layered Gold & Emerald Ambient Sparkle Fields */}
        <Sparkles
          count={75}
          scale={[9, 5, 9]}
          size={3.5}
          speed={0.4}
          opacity={0.8}
          color="#F5E096"
        />
        <Sparkles
          count={35}
          scale={[7, 4, 7]}
          size={4}
          speed={0.3}
          opacity={0.6}
          color="#10B981"
        />

        {/* Smooth Orbit Camera Control */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.15}
          minPolarAngle={Math.PI / 3.6}
          rotateSpeed={0.45}
        />
      </Canvas>
    </div>
  );
}

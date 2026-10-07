import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

export const ELIXIR_PRODUCTS = [
  {
    id: 'gold-jasmine',
    name: '24K Gold & Royal Jasmine Elixir',
    volume: '100ml / 3.4 fl. oz',
    price: '$145',
    color: '#D4AF37',
    liquidColor: '#F5E096',
    ingredients: ['24-Karat Gold Flakes', 'Wild Egyptian Jasmine', 'Pure Cold-Pressed Marula Oil'],
    benefits: 'Radiant skin glow, cellular renewal, and aromatherapy calm.'
  },
  {
    id: 'emerald-detox',
    name: 'Emerald Marine Algae Serum',
    volume: '100ml / 3.4 fl. oz',
    price: '$165',
    color: '#10B981',
    liquidColor: '#34D399',
    ingredients: ['Deep Sea Kelp Extracts', 'Organic Spirulina', 'Eucalyptus Essence'],
    benefits: 'Deep lymphatic detox, antioxidant shield, and intense micro-hydration.'
  },
  {
    id: 'rose-amethyst',
    name: 'Amethyst Damask Rose Oil',
    volume: '100ml / 3.4 fl. oz',
    price: '$155',
    color: '#EC4899',
    liquidColor: '#F472B6',
    ingredients: ['Damascus Rose Petal Oil', 'Liquid Amethyst Crystals', 'Jojoba Base'],
    benefits: 'Stress relief, anti-aging collagen boost, and romantic aroma notes.'
  }
];

function Bottle3D({ color, liquidColor }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Glass Outer Bottle */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.55, 1.4, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.9}
          opacity={1}
          transparent
          roughness={0.1}
          ior={1.5}
          thickness={0.5}
        />
      </mesh>

      {/* Inner Glowing Elixir Liquid */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.42, 0.46, 1.1, 32]} />
        <meshStandardMaterial
          color={liquidColor}
          roughness={0.2}
          metalness={0.3}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Gold Neck Ring */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.22, 0.25, 0.15, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Luxury Obsidian Cap */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.35, 32]} />
        <meshStandardMaterial color="#0E1318" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

export default function ElixirShowcase3D({ selectedElixirId }) {
  const currentElixir = ELIXIR_PRODUCTS.find(e => e.id === selectedElixirId) || ELIXIR_PRODUCTS[0];

  return (
    <div className="w-full h-[360px] relative">
      <Canvas
        camera={{ position: [0, 0.4, 3.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} color="#F5E096" />
        <pointLight position={[-3, 1, -2]} intensity={1} color={currentElixir.color} />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <Bottle3D color={currentElixir.color} liquidColor={currentElixir.liquidColor} />
        </Float>

        <ContactShadows position={[0, -1.0, 0]} opacity={0.5} scale={4} blur={2} color={currentElixir.color} />
        
        <Sparkles
          count={35}
          scale={[3, 3, 3]}
          size={3}
          speed={0.5}
          color={currentElixir.liquidColor}
        />

        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
}

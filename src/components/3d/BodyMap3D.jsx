import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

// Body Node Targets Configuration
export const BODY_NODES = [
  {
    id: 'neck',
    label: 'Cervical Spine & Neck',
    position: [0, 1.2, 0.1],
    treatment: 'Aura Thermal Neck & Shoulders De-Stress Ritual',
    duration: '45 mins',
    price: '$180',
    description: 'Targeted myofascial release using hot volcanic basalt stones and calming lavender extract to erase chronic neck strain.'
  },
  {
    id: 'shoulders',
    label: 'Deltoids & Shoulder Blade',
    position: [-0.65, 0.85, 0],
    treatment: 'Deep Tissue Muscle Tension Release',
    duration: '60 mins',
    price: '$230',
    description: 'Firm, rhythmic acupressure and warm Arnica oil application targeting deep muscle knots and desk posture fatigue.'
  },
  {
    id: 'back',
    label: 'Lumbar & Lower Back',
    position: [0, 0.3, -0.15],
    treatment: 'Himalayan Salt & Warm Herbal Compress',
    duration: '75 mins',
    price: '$290',
    description: 'Infusion of 84 trace minerals via heated Himalayan salt domes to relieve lumbar stiffness and spinal compression.'
  },
  {
    id: 'facial',
    label: 'Facial & Temple Points',
    position: [0, 1.6, 0.25],
    treatment: '24K Gold Leaf & Lymphatic Glow Facial',
    duration: '90 mins',
    price: '$380',
    description: 'Pure 24-karat gold leaf facial treatment combined with chilled jade roller lymphatic drainage for luminous revitalized skin.'
  },
  {
    id: 'feet',
    label: 'Reflexology Feet & Calves',
    position: [0.35, -1.3, 0],
    treatment: 'Royal Botanical Foot Reflexology',
    duration: '60 mins',
    price: '$195',
    description: 'Ancient Ayurvedic pressure point mapping combined with warm coconut water hydro-soak and mint oil massage.'
  }
];

function SilhouetteMesh({ activeNode, onSelectNode }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* Abstract Zen Body Silhouette (Head, Torso, Arms, Legs) */}
      
      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#18222D" roughness={0.3} metalness={0.5} transparent opacity={0.85} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 0.3, 16]} />
        <meshStandardMaterial color="#18222D" roughness={0.3} metalness={0.5} transparent opacity={0.85} />
      </mesh>

      {/* Chest & Torso */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.55, 0.4, 1.2, 32]} />
        <meshStandardMaterial color="#121820" roughness={0.3} metalness={0.5} transparent opacity={0.85} />
      </mesh>

      {/* Shoulders */}
      <mesh position={[0, 0.95, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 1.5, 16]} />
        <meshStandardMaterial color="#18222D" roughness={0.3} metalness={0.5} transparent opacity={0.85} />
      </mesh>

      {/* Pelvis & Legs */}
      <mesh position={[-0.25, -0.6, 0]}>
        <cylinderGeometry args={[0.22, 0.15, 1.3, 16]} />
        <meshStandardMaterial color="#121820" roughness={0.3} metalness={0.5} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0.25, -0.6, 0]}>
        <cylinderGeometry args={[0.22, 0.15, 1.3, 16]} />
        <meshStandardMaterial color="#121820" roughness={0.3} metalness={0.5} transparent opacity={0.85} />
      </mesh>

      {/* Interactive Node Hotspots */}
      {BODY_NODES.map((node) => {
        const isSelected = activeNode?.id === node.id;
        return (
          <group key={node.id} position={node.position}>
            <mesh onClick={() => onSelectNode(node)} className="cursor-pointer">
              <sphereGeometry args={[isSelected ? 0.12 : 0.08, 16, 16]} />
              <meshStandardMaterial
                color={isSelected ? "#10B981" : "#D4AF37"}
                emissive={isSelected ? "#10B981" : "#D4AF37"}
                emissiveIntensity={isSelected ? 1.5 : 0.6}
              />
            </mesh>

            {/* Glowing Ring Outer */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.12, 0.16, 32]} />
              <meshBasicMaterial
                color={isSelected ? "#10B981" : "#D4AF37"}
                side={THREE.DoubleSide}
                transparent
                opacity={isSelected ? 0.8 : 0.4}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function BodyMap3D({ activeNode, onSelectNode }) {
  return (
    <div className="w-full h-[450px] relative">
      <Canvas
        camera={{ position: [0, 0.3, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 4]} intensity={1.2} color="#F5E096" />
        <pointLight position={[-3, -2, -2]} intensity={0.8} color="#10B981" />

        <SilhouetteMesh activeNode={activeNode} onSelectNode={onSelectNode} />

        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
}

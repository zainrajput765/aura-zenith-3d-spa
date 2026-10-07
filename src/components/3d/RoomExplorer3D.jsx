import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Sun, Moon, Sparkles as SparklesIcon, Flame } from 'lucide-react';

export const SPA_SUITES = [
  {
    id: 'hydro',
    name: 'Zenith Hydrotherapy Thermal Suite',
    subtitle: 'Submerged massage loungers & mineral rich thermal waters',
    temp: '38°C Hydro Thermal Water',
    capacity: 'Private Couple or Sovereign VIP',
    features: ['Submerged hydromassage loungers', 'Ozone micro-bubble purification', 'Chromotherapy underwater illumination'],
    color: '#10B981',
    lightColor: '#6EE7B7'
  },
  {
    id: 'salt',
    name: 'Himalayan Pink Salt Sanctuary',
    subtitle: 'Halotherapy micro-particle salt air purification',
    temp: '24°C Purified Ambient Air',
    capacity: 'Up to 4 Sovereign Guests',
    features: ['2,000kg pure Himalayan salt wall', 'Zero-gravity ergonomic loungers', 'Respiratory detox salt mist'],
    color: '#E11D48',
    lightColor: '#FDA4AF'
  },
  {
    id: 'sound',
    name: 'Acoustic Sound Bath Chamber',
    subtitle: 'Vibrational frequency healing with 14 quartz & copper bowls',
    temp: '22°C Sound Sanctuary',
    capacity: 'Private Acoustic Session',
    features: ['Surround binaural acoustic dome', 'Vibrational mattress therapy', 'Custom lotus aromatherapy'],
    color: '#D4AF37',
    lightColor: '#F5E096'
  }
];

export const LIGHT_MOODS = [
  { id: 'gold', label: 'Sunset Gold Solstice', color: '#F5E096', icon: Sun },
  { id: 'emerald', label: 'Emerald Forest Detox', color: '#34D399', icon: SparklesIcon },
  { id: 'amethyst', label: 'Celestial Amethyst', color: '#C084FC', icon: Moon },
  { id: 'candle', label: 'Warm Candlelight', color: '#F97316', icon: Flame },
];

function Suite3DScene({ suiteId, lightMoodColor }) {
  const roomRef = useRef();

  useFrame((state) => {
    if (roomRef.current) {
      roomRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    }
  });

  return (
    <group ref={roomRef}>
      {/* Outer Chamber Walls */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2.8, 2.8, 2.5, 64, 1, true]} />
        <meshStandardMaterial
          color="#0A0E13"
          side={THREE.BackSide}
          roughness={0.8}
        />
      </mesh>

      {/* Reflective Dark Floor */}
      <mesh position={[0, -1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.8, 64]} />
        <meshStandardMaterial color="#141C24" roughness={0.15} metalness={0.85} />
      </mesh>

      {/* Hydro Pool */}
      {suiteId === 'hydro' && (
        <group position={[0, -0.6, 0]}>
          <mesh>
            <torusGeometry args={[1.5, 0.22, 16, 64]} />
            <meshStandardMaterial color="#232E3A" roughness={0.3} metalness={0.6} />
          </mesh>
          <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1.4, 64]} />
            <meshStandardMaterial color={lightMoodColor} roughness={0.05} metalness={0.9} transparent opacity={0.88} />
          </mesh>
        </group>
      )}

      {/* Salt Cave */}
      {suiteId === 'salt' && (
        <group position={[0, -0.5, 0]}>
          {[-0.85, 0, 0.85].map((x, i) => (
            <mesh key={i} position={[x, 0.25, (i % 2) * 0.4 - 0.2]}>
              <coneGeometry args={[0.42, 0.95, 4]} />
              <meshStandardMaterial color="#E11D48" roughness={0.35} emissive={lightMoodColor} emissiveIntensity={0.6} />
            </mesh>
          ))}
        </group>
      )}

      {/* Sound Bath Bowls */}
      {suiteId === 'sound' && (
        <group position={[0, -0.5, 0]}>
          {[0, 1, 2, 3, 4].map((i) => {
            const angle = (i / 5) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.sin(angle) * 1.15, 0.1, Math.cos(angle) * 1.15]}>
                <cylinderGeometry args={[0.26, 0.16, 0.22, 32]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.12} />
              </mesh>
            );
          })}
        </group>
      )}

      {/* Dynamic Ambient Sparkles */}
      <Sparkles
        count={60}
        scale={[4.5, 2.5, 4.5]}
        size={3}
        speed={0.4}
        color={lightMoodColor}
      />
    </group>
  );
}

export default function RoomExplorer3D({ activeSuiteId }) {
  const [activeMood, setActiveMood] = useState(LIGHT_MOODS[0]);

  return (
    <div className="space-y-4">
      
      {/* 3D Canvas Container */}
      <div className="w-full h-[420px] relative rounded-3xl overflow-hidden glass-card border border-spa-gold/30 shadow-2xl">
        <Canvas
          camera={{ position: [0, 0.8, 4.2], fov: 48 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 2.2, 0]} intensity={2.0} color={activeMood.color} />
          <directionalLight position={[3, 4, 3]} intensity={0.8} color="#FFF0BD" />

          <Suite3DScene suiteId={activeSuiteId} lightMoodColor={activeMood.color} />

          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 1.9}
            minPolarAngle={Math.PI / 3}
            rotateSpeed={0.45}
          />
        </Canvas>

        <div className="absolute top-4 left-4 bg-spa-bg/80 backdrop-blur px-3 py-1 rounded-full text-[10px] text-spa-gold uppercase border border-spa-gold/30">
          360° Interactive Suite Viewer
        </div>

        {/* Real-Time Ambient Lighting Controls Overlay */}
        <div className="absolute bottom-4 left-4 right-4 glass-nav rounded-2xl p-2.5 flex items-center justify-between border border-spa-gold/25">
          <span className="text-[10px] uppercase font-bold text-spa-gold tracking-wider hidden sm:inline">
            3D Mood Lighting:
          </span>
          <div className="flex space-x-2 w-full sm:w-auto justify-center">
            {LIGHT_MOODS.map((mood) => {
              const Icon = mood.icon;
              const isActive = activeMood.id === mood.id;
              return (
                <button
                  key={mood.id}
                  onClick={() => setActiveMood(mood)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-[11px] font-medium transition-all ${
                    isActive
                      ? 'bg-spa-gold text-spa-bg font-bold shadow-gold-glow'
                      : 'bg-spa-card text-spa-muted hover:text-spa-pearl border border-spa-cardBorder'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="truncate">{mood.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

interface DNAHelix3DProps {
  sequence: string;
  pattern: string;
  matchPositions: number[];
  colorScheme: any;
}

const HelixStructure: React.FC<{
  sequence: string;
  pattern: string;
  matchPositions: number[];
  colorScheme: any;
}> = ({ sequence, pattern, matchPositions, colorScheme }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const helixData = useMemo(() => {
    const radius = 2;
    const height = sequence.length * 0.1;
    const turns = sequence.length / 10;
    
    return sequence.split('').map((nucleotide, index) => {
      const angle = (index / sequence.length) * turns * Math.PI * 2;
      const y = (index / sequence.length) * height - height / 2;
      
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;
      
      const isMatch = matchPositions.some(pos => 
        index >= pos && index < pos + pattern.length
      );
      
      return {
        nucleotide,
        position1: [x1, y, z1] as [number, number, number],
        position2: [x2, y, z2] as [number, number, number],
        isMatch,
        index
      };
    });
  }, [sequence, pattern, matchPositions]);

  const getNucleotideColor = (nucleotide: string, isMatch: boolean) => {
    const baseColor = colorScheme.nucleotides[nucleotide as keyof typeof colorScheme.nucleotides];
    return isMatch ? '#FFD700' : baseColor; // Gold for matches
  };

  return (
    <group ref={groupRef}>
      {helixData.map((data, index) => (
        <group key={index}>
          {/* First strand */}
          <mesh position={data.position1}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial 
              color={getNucleotideColor(data.nucleotide, data.isMatch)}
              emissive={data.isMatch ? '#FFD700' : '#000000'}
              emissiveIntensity={data.isMatch ? 0.3 : 0}
            />
          </mesh>
          
          {/* Second strand (complementary) */}
          <mesh position={data.position2}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial 
              color={getNucleotideColor(
                data.nucleotide === 'A' ? 'T' : 
                data.nucleotide === 'T' ? 'A' : 
                data.nucleotide === 'G' ? 'C' : 'G',
                data.isMatch
              )}
              emissive={data.isMatch ? '#FFD700' : '#000000'}
              emissiveIntensity={data.isMatch ? 0.3 : 0}
            />
          </mesh>
          
          {/* Connecting line */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  ...data.position1,
                  ...data.position2
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#666666" />
          </line>
          
          {/* Nucleotide label for matches */}
          {data.isMatch && index % 2 === 0 && (
            <Text
              position={[data.position1[0] + 0.3, data.position1[1], data.position1[2]]}
              fontSize={0.15}
              color="#FFD700"
              anchorX="center"
              anchorY="middle"
            >
              {data.nucleotide}
            </Text>
          )}
        </group>
      ))}
    </group>
  );
};

export const DNAHelix3D: React.FC<DNAHelix3DProps> = ({ 
  sequence, 
  pattern, 
  matchPositions, 
  colorScheme 
}) => {
  if (!sequence || matchPositions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">3D DNA Helix Visualization</h3>
        <div className="h-96 flex items-center justify-center text-gray-500">
          <p>Run a search with matches to see 3D DNA visualization</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">3D DNA Helix Visualization</h3>
      <div className="h-96 bg-gray-50 rounded-lg overflow-hidden">
        <Canvas camera={{ position: [5, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.4} />
          
          <HelixStructure
            sequence={sequence}
            pattern={pattern}
            matchPositions={matchPositions}
            colorScheme={colorScheme}
          />
          
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={false}
          />
        </Canvas>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-2">3D Controls:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-blue-700">
          <div>🖱️ <strong>Rotate:</strong> Click and drag</div>
          <div>🔍 <strong>Zoom:</strong> Mouse wheel</div>
          <div>✨ <strong>Gold spheres:</strong> Pattern matches</div>
        </div>
      </div>
    </div>
  );
};
// AvatarWithLipSync.tsx
"use client"
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import type { Mesh, Object3D } from 'three';

interface Viseme {
  time: number;
  value: string;
}

interface AvatarWithLipSyncProps {
  visemes: Viseme[];
  startTime: number | null;
}

export default function AvatarWithLipSync({ visemes, startTime }: AvatarWithLipSyncProps) {
    const gltf = useGLTF("/686a1f893856a81c4825d84a.glb");
    const meshRef = useRef<Object3D | null>(null);
  
    useEffect(() => {
      const headMesh = gltf.scene.getObjectByName("Wolf3D_Head");
      if (headMesh) meshRef.current = headMesh;
    }, [gltf]);
  
    useEffect(() => {
      if (!visemes.length || !startTime) return;
  
      const interval = setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTime;
  
        const current = visemes.find((v: Viseme, i: number) =>
          elapsed >= v.time &&
          (i === visemes.length - 1 || elapsed < visemes[i + 1].time)
        );
  
        if (!current) return;
  
        const mesh = meshRef.current as any;
        const morphName = `viseme_${current.value}`;
        const index = mesh?.morphTargetDictionary?.[morphName];
  
        if (mesh && index !== undefined) {
          // Reset all morph targets
          for (let i = 0; i < mesh.morphTargetInfluences.length; i++) {
            mesh.morphTargetInfluences[i] = 0;
          }
          mesh.morphTargetInfluences[index] = 1;
        }
      }, 40);
  
      return () => clearInterval(interval);
    }, [visemes, startTime]);
  
    return <primitive object={gltf.scene} scale={1.2} position={[0, -1.2, 0]} />;
  }
  
// AvatarViewer.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function AvatarModel() {
  const { scene } = useGLTF("/686a0c118bb684540fcfbfcd.glb");
  return <primitive object={scene} scale={1.2} position={[0, -1.2, 0]} />;
}

export default function AvatarViewer() {
  return (
    <div className="w-full h-[600px] bg-black rounded-lg">
      <Canvas camera={{ position: [0, 1, 3], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <AvatarModel />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/686a0c118bb684540fcfbfcd.glb");
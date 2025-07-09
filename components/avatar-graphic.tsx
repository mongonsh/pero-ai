"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import type { Mesh } from "three"
import { Icosahedron } from "@react-three/drei"
import * as THREE from "three"

function PulsingAvatar() {
  const meshRef = useRef<Mesh>(null!)

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0.0 },
      u_intensity: { value: 0.3 },
    }),
    [],
  )

  useFrame((state: any) => {
    const { clock } = state
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.u_time.value = clock.getElapsedTime()
    }
  })

  return (
    <Icosahedron ref={meshRef} args={[2.2, 20]}>
      <shaderMaterial
        vertexShader={`
          uniform float u_time;
          uniform float u_intensity;
          varying vec3 v_normal;
          varying vec3 v_position;

          void main() {
            v_normal = normal;
            v_position = position;
            
            float distortion = sin(position.y * 4.0 + u_time * 1.5) * u_intensity * 0.2;
            vec3 newPosition = position + normal * distortion;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
        `}
        fragmentShader={`
          uniform float u_time;
          varying vec3 v_normal;
          varying vec3 v_position;

          void main() {
            vec3 normal = normalize(v_normal);
            float fresnel = pow(1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0))), 2.0);
            
            float pulse = sin(v_position.y * 2.0 + u_time * 0.5) * 0.5 + 0.5;
            vec3 color = vec3(0.54, 0.3, 0.9); // Soft violet
            
            vec3 finalColor = mix(color * 0.2, color, fresnel);
            finalColor += pulse * 0.1;

            gl_FragColor = vec4(finalColor, fresnel * 0.8);
          }
        `}
        uniforms={uniforms}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </Icosahedron>
  )
}

export function AvatarGraphic() {
  return (
    <div className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden bg-black/20 border border-white/10 shadow-2xl shadow-violet-500/10">
      {/* <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 1, 1]} intensity={1} />
        <PulsingAvatar />
      </Canvas>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <p className="text-xs text-gray-500 bg-black/30 px-3 py-1 rounded-full border border-white/10">
          Governed, voice-enabled GenAI agent
        </p>
      </div> */}
      <iframe
  src="https://models.readyplayer.me/686a0c118bb684540fcfbfcd.glb"
  style={{
    width: '100%',
    height: '600px',
    border: 'none',
  }}
  allow="camera; microphone"
></iframe>
    </div>
  )
}

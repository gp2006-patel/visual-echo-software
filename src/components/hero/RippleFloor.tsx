import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    vec2 centered = vUv - 0.5;
    float dist = length(centered);
    float rings = sin(dist * 42.0 - uTime * 0.9);
    float highlight = smoothstep(0.75, 1.0, rings) * 0.6;
    float fade = smoothstep(0.5, 0.05, dist);
    vec3 brass = vec3(0.79, 0.65, 0.42);
    gl_FragColor = vec4(brass * highlight, highlight * fade * uOpacity);
  }
`;

export function RippleFloor({ progress }: { progress: MotionValue<number> }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uOpacity: { value: 0 } }),
    [],
  );
  const geometry = useMemo(() => new THREE.PlaneGeometry(16, 16, 1, 1), []);

  useEffect(() => {
    const g = geometry;
    return () => {
      g.dispose();
    };
  }, [geometry]);

  useFrame((_, delta) => {
    const material = materialRef.current;
    if (!material) return;
    material.uniforms.uTime!.value += Math.min(delta, 0.05);
    const p = progress.get();
    material.uniforms.uOpacity!.value = THREE.MathUtils.smoothstep(p, 0.6, 0.82);
  });

  return (
    <mesh geometry={geometry} rotation-x={-Math.PI / 2} position={[0, -2.35, 0]}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

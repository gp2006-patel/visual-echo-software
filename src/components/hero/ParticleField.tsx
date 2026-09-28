import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { buildTargets } from "./particleTargets";

const vertexShader = /* glsl */ `
  attribute vec3 aRoom;
  attribute vec3 aTree;
  attribute vec3 aRipple;
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aSeed;

  uniform float uProgress;
  uniform float uTime;
  uniform float uScale;
  uniform vec2 uParallax;
  uniform float uMorph;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float t1 = smoothstep(0.22, 0.46, uProgress) * uMorph;
    float t2 = smoothstep(0.56, 0.82, uProgress) * uMorph;

    vec3 pos = mix(mix(aRoom, aTree, t1), aRipple, t2);

    float spin = uTime * 0.06 + uProgress * 1.2;
    float c = cos(spin);
    float s = sin(spin);
    pos = vec3(pos.x * c - pos.z * s, pos.y, pos.x * s + pos.z * c);

    pos.y += sin(uTime * 0.5 + aSeed * 6.2831) * 0.05;
    pos.x += uParallax.x * (0.4 + aSeed * 0.6);
    pos.y += uParallax.y * (0.4 + aSeed * 0.6);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uScale * (10.0 / -mv.z);

    vColor = aColor;
    vAlpha = 0.35 + aSeed * 0.5;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float falloff = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, falloff * vAlpha);
  }
`;

interface ParticleFieldProps {
  count: number;
  studioName: string;
  progress: MotionValue<number>;
  parallaxEnabled: boolean;
  morphEnabled: boolean;
}

export function ParticleField({
  count,
  studioName,
  progress,
  parallaxEnabled,
  morphEnabled,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const { size } = useThree();

  const geometry = useMemo(() => {
    const targets = buildTargets(count, studioName);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(targets.room.slice(), 3));
    g.setAttribute("aRoom", new THREE.BufferAttribute(targets.room, 3));
    g.setAttribute("aTree", new THREE.BufferAttribute(targets.tree, 3));
    g.setAttribute("aRipple", new THREE.BufferAttribute(targets.ripple, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(targets.colors, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(targets.sizes, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(targets.seeds, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12);
    return g;
  }, [count, studioName]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uScale: { value: 1 },
      uParallax: { value: new THREE.Vector2(0, 0) },
      uMorph: { value: morphEnabled ? 1 : 0 },
    }),
    [morphEnabled],
  );

  useEffect(() => {
    if (!parallaxEnabled) return;
    const onMove = (event: PointerEvent) => {
      pointer.current.tx = (event.clientX / window.innerWidth - 0.5) * 0.6;
      pointer.current.ty = -(event.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [parallaxEnabled]);

  useEffect(() => {
    const g = geometry;
    return () => {
      g.dispose();
    };
  }, [geometry]);

  useFrame((_, delta) => {
    const material = materialRef.current;
    if (!material) return;
    const dt = Math.min(delta, 0.05);
    material.uniforms.uTime!.value += dt;
    material.uniforms.uProgress!.value = progress.get();
    material.uniforms.uScale!.value = Math.min(size.height / 900, 1.2);

    const p = pointer.current;
    p.x += (p.tx - p.x) * (1 - Math.exp(-3 * dt));
    p.y += (p.ty - p.y) * (1 - Math.exp(-3 * dt));
    (material.uniforms.uParallax!.value as THREE.Vector2).set(p.x, p.y);
  });

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

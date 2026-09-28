import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import type { PerformanceProfile } from "@/lib/performance";
import { ParticleField } from "./ParticleField";
import { RippleFloor } from "./RippleFloor";

interface HeroCanvasProps {
  progress: MotionValue<number>;
  profile: PerformanceProfile;
  studioName: string;
}

export default function HeroCanvas({ progress, profile, studioName }: HeroCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, profile.maxDpr]}
        camera={{ position: [0, 0, 7.5], fov: 55 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <ParticleField
          count={profile.particleCount}
          studioName={studioName}
          progress={progress}
          parallaxEnabled={!profile.isMobile && !profile.reducedMotion}
          morphEnabled={!profile.reducedMotion}
        />
        <RippleFloor progress={progress} />
      </Canvas>
    </div>
  );
}

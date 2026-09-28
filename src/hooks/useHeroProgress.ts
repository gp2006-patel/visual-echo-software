import { useEffect, useRef, type RefObject } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

/**
 * ONE scroll mechanism for the hero. A single rAF-throttled scroll listener
 * writes 0→1 into a MotionValue (never React state). The 3D scene reads it in
 * useFrame; DOM content reads the same MotionValue.
 */
export function useHeroProgress(
  ref: RefObject<HTMLElement | null>,
): MotionValue<number> {
  const progress = useMotionValue(0);
  const ticking = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const measure = () => {
      ticking.current = false;
      const rect = element.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      if (distance <= 0) {
        progress.set(0);
        return;
      }
      const value = Math.min(1, Math.max(0, -rect.top / distance));
      progress.set(value);
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, progress]);

  return progress;
}

export interface PerformanceProfile {
  reducedMotion: boolean;
  webglAvailable: boolean;
  lowPower: boolean;
  isMobile: boolean;
  /** Use the static hero instead of the 3D canvas. */
  useStaticHero: boolean;
  particleCount: number;
  maxDpr: number;
}

export const DEFAULT_PROFILE: PerformanceProfile = {
  reducedMotion: false,
  webglAvailable: false,
  lowPower: false,
  isMobile: false,
  useStaticHero: true,
  particleCount: 12000,
  maxDpr: 1.5,
};

function detectWebgl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

export function detectPerformanceProfile(): PerformanceProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const webglAvailable = detectWebgl();
  const nav = navigator as NavigatorWithMemory;
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  const lowPower = cores <= 4 || memory <= 4;

  return {
    reducedMotion,
    webglAvailable,
    lowPower,
    isMobile,
    useStaticHero: reducedMotion || !webglAvailable || lowPower,
    particleCount: isMobile ? 12000 : 40000,
    maxDpr: 1.5,
  };
}

/** Deterministic seeded PRNG (mulberry32) so particle fields are stable. */
export function createRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** Smooth 0→1 ramp used for scene cross-fades. */
export function rangeProgress(value: number, start: number, end: number): number {
  return clamp((value - start) / (end - start));
}

export function sceneOpacity(
  progress: number,
  start: number,
  end: number,
  fade = 0.08,
): number {
  const fadeIn = rangeProgress(progress, start - fade, start + fade);
  const fadeOut = 1 - rangeProgress(progress, end - fade, end + fade);
  return clamp(Math.min(fadeIn, fadeOut));
}

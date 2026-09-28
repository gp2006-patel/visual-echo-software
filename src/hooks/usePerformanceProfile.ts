import { useEffect, useState } from "react";
import {
  DEFAULT_PROFILE,
  detectPerformanceProfile,
  type PerformanceProfile,
} from "@/lib/performance";

export function usePerformanceProfile(): { profile: PerformanceProfile; ready: boolean } {
  const [profile, setProfile] = useState<PerformanceProfile>(DEFAULT_PROFILE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfile(detectPerformanceProfile());
    setReady(true);
  }, []);

  return { profile, ready };
}

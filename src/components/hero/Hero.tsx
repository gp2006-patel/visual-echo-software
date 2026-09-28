import { Suspense, lazy, useRef } from "react";
import { useHeroProgress } from "@/hooks/useHeroProgress";
import { usePerformanceProfile } from "@/hooks/usePerformanceProfile";
import { site } from "@/data/site";
import { HeroContent } from "./HeroContent";
import { StaticHero } from "./StaticHero";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useHeroProgress(sectionRef);
  const { profile, ready } = usePerformanceProfile();

  if (!ready || profile.useStaticHero) {
    return <StaticHero />;
  }

  return (
    <section ref={sectionRef} className="relative h-[300svh]" aria-label="Introduction">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <Suspense fallback={null}>
          <HeroCanvas progress={progress} profile={profile} studioName={site.studio} />
        </Suspense>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 45%, transparent 40%, oklch(0.145 0.004 106 / 70%) 100%)",
          }}
        />
        <div className="relative h-full">
          <HeroContent progress={progress} />
        </div>
      </div>
    </section>
  );
}

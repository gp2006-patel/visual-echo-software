import { motion, useTransform, type MotionValue } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { site } from "@/data/site";

const heroCards = [
  {
    number: "01",
    title: "Residential",
    copy: "Layered interiors designed around the rituals of everyday life.",
  },
  {
    number: "02",
    title: "Commercial",
    copy: "Distinctive spaces that translate a brand into atmosphere.",
  },
  {
    number: "03",
    title: "Styling",
    copy: "Material, furniture, art, and objects composed with intention.",
  },
  {
    number: "04",
    title: "Consultation",
    copy: "Focused design direction for spaces ready for their next chapter.",
  },
];

const atmospherePills = [
  "Private Residence",
  "Hospitality Group",
  "Featured Press",
  "Luxury Brand",
  "Creative Director",
  "Boutique Hotel",
];

const pillPositions = [
  "left-[6%] top-[22%]",
  "right-[8%] top-[18%]",
  "left-[14%] top-[54%]",
  "right-[12%] top-[48%]",
  "left-[38%] top-[76%]",
  "right-[30%] top-[72%]",
];

export function HeroContent({ progress }: { progress: MotionValue<number> }) {
  const scene1 = useTransform(progress, [0, 0.24, 0.36], [1, 1, 0]);
  const scene2 = useTransform(progress, [0.28, 0.4, 0.6, 0.72], [0, 1, 1, 0]);
  const scene3 = useTransform(progress, [0.64, 0.76, 1], [0, 1, 1]);
  const scene1Events = useTransform(scene1, (v) => (v > 0.5 ? "auto" : "none"));
  const scene2Events = useTransform(scene2, (v) => (v > 0.5 ? "auto" : "none"));
  const scene3Events = useTransform(scene3, (v) => (v > 0.5 ? "auto" : "none"));

  return (
    <div className="pointer-events-none relative z-10 mx-auto flex h-full w-full max-w-6xl items-center px-5 sm:px-8">
      {/* Scene 1 — The Room */}
      <motion.div
        style={{ opacity: scene1, pointerEvents: scene1Events }}
        className="absolute inset-x-5 top-1/2 -translate-y-1/2 sm:inset-x-8"
      >
        <p className="eyebrow">Interior Architecture · {site.city}</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
          Spaces With Soul
        </h1>
        <p className="mt-5 max-w-xl text-sm text-muted-foreground sm:text-base">
          Thoughtful interiors shaped by light, material, proportion, and the lives that unfold
          within them.
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {heroCards.map((card) => (
            <li key={card.number}>
              <GlassCard overCanvas className="h-full">
                <span className="eyebrow">{card.number}</span>
                <h2 className="mt-2 text-lg">{card.title}</h2>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {card.copy}
                </p>
              </GlassCard>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Scene 2 — Philosophy */}
      <motion.div
        style={{ opacity: scene2, pointerEvents: scene2Events }}
        className="absolute inset-x-5 top-1/2 -translate-y-1/2 sm:inset-x-8"
      >
        <span className="glass glass-mobile inline-block px-4 py-2 text-[0.65rem] tracking-[0.3em] text-brass uppercase">
          Design Philosophy
        </span>
        <h2 className="mt-5 max-w-2xl text-3xl leading-tight sm:text-5xl">
          Designed To Be Lived In
        </h2>
        <p className="mt-5 max-w-2xl text-sm text-muted-foreground sm:text-base">
          We believe the most beautiful spaces are not simply seen — they are experienced. Every
          project balances architecture, material, light, and personality to create interiors that
          feel considered without ever feeling over-designed.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center rounded-full bg-brass px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start a Project
          </a>
          <a
            href="#work"
            className="glass glass-mobile inline-flex min-h-11 items-center rounded-full px-6 text-sm text-foreground transition-colors hover:border-brass"
          >
            View Projects
          </a>
        </div>
        <GlassCard overCanvas className="mt-8 flex max-w-xs items-center gap-4">
          <svg viewBox="0 0 48 48" className="h-14 w-14 shrink-0" role="img" aria-label="QR code placeholder">
            <rect width="48" height="48" rx="6" fill="rgba(255,255,255,0.08)" />
            <g fill="currentColor" className="text-brass">
              <rect x="7" y="7" width="10" height="10" />
              <rect x="31" y="7" width="10" height="10" />
              <rect x="7" y="31" width="10" height="10" />
              <rect x="22" y="22" width="4" height="4" />
              <rect x="30" y="24" width="4" height="4" />
              <rect x="24" y="32" width="4" height="4" />
              <rect x="34" y="34" width="6" height="6" />
            </g>
          </svg>
          <div>
            <p className="eyebrow">Chat on WhatsApp</p>
            <p className="mt-1 text-xs text-muted-foreground">Scan to begin a conversation</p>
          </div>
        </GlassCard>
      </motion.div>

      {/* Scene 3 — Atmosphere */}
      <motion.div
        style={{ opacity: scene3, pointerEvents: scene3Events }}
        className="absolute inset-0"
      >
        {atmospherePills.map((label, index) => (
          <motion.span
            key={label}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.4,
            }}
            className={`glass glass-mobile absolute px-4 py-2 text-[0.7rem] tracking-[0.18em] uppercase sm:text-xs ${pillPositions[index]}`}
          >
            {label}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

import heroImage from "@/assets/hero-static.jpg";
import { GlassCard } from "@/components/ui/GlassCard";
import { site } from "@/data/site";

const heroCards = [
  { number: "01", title: "Residential", copy: "Layered interiors designed around the rituals of everyday life." },
  { number: "02", title: "Commercial", copy: "Distinctive spaces that translate a brand into atmosphere." },
  { number: "03", title: "Styling", copy: "Material, furniture, art, and objects composed with intention." },
  { number: "04", title: "Consultation", copy: "Focused design direction for spaces ready for their next chapter." },
];

export function StaticHero() {
  return (
    <section
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(160deg, oklch(0.2 0.02 80 / 60%), oklch(0.145 0.004 106 / 95%))",
      }}
    >
      <img
        src={heroImage}
        alt="Dark warm interior with brass detailing and soft daylight"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 35%, oklch(0.755 0.078 79 / 22%), transparent 70%), linear-gradient(180deg, oklch(0.145 0.004 106 / 75%), oklch(0.145 0.004 106 / 96%))",
        }}
      />
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
        <p className="eyebrow">Interior Architecture · {site.city}</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
          Spaces With Soul
        </h1>
        <p className="mt-5 max-w-xl text-sm text-muted-foreground sm:text-base">
          Thoughtful interiors shaped by light, material, proportion, and the lives that unfold
          within them.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center rounded-full bg-brass px-6 text-sm font-medium text-primary-foreground"
          >
            Start a Project
          </a>
          <a
            href="#work"
            className="glass inline-flex min-h-11 items-center rounded-full px-6 text-sm"
          >
            View Projects
          </a>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {heroCards.map((card) => (
            <li key={card.number}>
              <GlassCard className="h-full">
                <span className="eyebrow">{card.number}</span>
                <h2 className="mt-2 text-lg">{card.title}</h2>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {card.copy}
                </p>
              </GlassCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

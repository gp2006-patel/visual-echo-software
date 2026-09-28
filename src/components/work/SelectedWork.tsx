import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "./Lightbox";

const aspects = [
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[4/5]",
];

export function SelectedWork() {
  const [index, setIndex] = useState<number | null>(null);
  const active = index === null ? null : (projects[index] ?? null);

  return (
    <section id="work" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected Work"
          copy="A collection of interiors shaped by atmosphere, material, and the people who inhabit them."
        />
        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.li
              key={project.id}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: (i % 3) * 0.08 }}
              className={i % 3 === 1 ? "lg:mt-16" : undefined}
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group block w-full overflow-hidden rounded-2xl border border-border text-left"
              >
                <span className={`relative block w-full overflow-hidden ${aspects[i]}`}>
                  <img
                    src={project.image}
                    alt={project.alt}
                    loading="lazy"
                    width={1200}
                    height={1500}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/55" />
                  <span className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <span className="eyebrow block">{project.category}</span>
                    <span className="mt-2 block font-display text-xl">{project.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {project.location} · {project.year}
                    </span>
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <Lightbox
        project={active}
        onClose={() => setIndex(null)}
        onNext={() => setIndex((v) => (v === null ? v : (v + 1) % projects.length))}
        onPrev={() =>
          setIndex((v) => (v === null ? v : (v - 1 + projects.length) % projects.length))
        }
      />
    </section>
  );
}

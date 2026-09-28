import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { journal } from "@/data/journal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Journal() {
  return (
    <section id="journal" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Writing" title="From The Journal" />
        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {journal.map((entry, i) => (
            <motion.li
              key={entry.id}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.1 }}
              className="group"
            >
              <article>
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border">
                  <img
                    src={entry.image}
                    alt={entry.alt}
                    loading="lazy"
                    width={900}
                    height={675}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-5 text-xs tracking-[0.25em] text-muted-foreground uppercase">
                  {entry.category} · {entry.date}
                </p>
                <h3 className="mt-2 text-xl">{entry.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {entry.excerpt}
                </p>
                <a
                  href="#journal"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-brass hover:underline"
                >
                  Read Article
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

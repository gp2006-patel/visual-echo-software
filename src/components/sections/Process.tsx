import { motion } from "framer-motion";
import { processSteps } from "@/data/process";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="How We Work" title="The Process" />

        <div className="relative mt-16">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute top-2 left-0 hidden h-px w-full origin-left bg-brass/60 lg:block"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute top-0 left-[5px] h-full w-px origin-top bg-brass/40 lg:hidden"
          />

          <ol className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-6">
            {processSteps.map((step, i) => (
              <motion.li
                key={step.id}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.12 }}
                className="relative pl-8 lg:pl-0"
              >
                <span className="absolute top-0 left-0 block h-[11px] w-[11px] rounded-full bg-brass lg:relative lg:mb-6" />
                <span className="eyebrow">{step.number}</span>
                <h3 className="mt-2 text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

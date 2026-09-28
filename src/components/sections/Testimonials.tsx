import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index]!;

  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32" aria-label="Client testimonials">
      <div className="mx-auto max-w-4xl text-center">
        <span aria-hidden="true" className="block font-display text-7xl leading-none text-brass/70">
          &ldquo;
        </span>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={current.id}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-2"
          >
            <p className="font-display text-2xl leading-snug sm:text-3xl">{current.quote}</p>
            <footer className="mt-6 text-sm text-muted-foreground">
              — {current.author}, {current.context}
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => setIndex((v) => (v - 1 + testimonials.length) % testimonials.length)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border hover:border-brass"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex gap-2" aria-hidden="true">
            {testimonials.map((item, i) => (
              <span
                key={item.id}
                className={`h-px w-10 transition-colors duration-500 ${
                  i === index ? "bg-brass" : "bg-border"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => setIndex((v) => (v + 1) % testimonials.length)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border hover:border-brass"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

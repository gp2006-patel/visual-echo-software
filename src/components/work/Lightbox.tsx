import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/data/projects";

interface LightboxProps {
  project: Project | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({ project, onClose, onNext, onPrev }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      dialogRef.current?.querySelectorAll<HTMLElement>("button, a[href]") ?? null;
    focusables()?.[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "Tab") {
        const nodes = focusables();
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0]!;
        const last = nodes[nodes.length - 1]!;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      restoreRef.current?.focus();
    };
  }, [project, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-0 z-[70] bg-background/95 p-4 backdrop-blur-xl sm:p-8"
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title}, ${project.location}`}
            className="mx-auto flex h-full max-w-5xl flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <p className="eyebrow">{project.category}</p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <motion.img
              key={project.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src={project.image}
              alt={project.alt}
              className="min-h-0 w-full flex-1 rounded-2xl object-cover"
            />
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl">{project.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {project.location} · {project.year}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous project"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border hover:border-brass"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next project"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border hover:border-brass"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

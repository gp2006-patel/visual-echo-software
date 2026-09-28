import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const node = drawerRef.current;
    const focusables = node?.querySelectorAll<HTMLElement>("a, button");
    focusables?.[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !focusables || focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "glass rounded-none border-x-0 border-t-0" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <a href="#top" className="flex flex-col leading-tight">
          <span className="font-display text-base tracking-wide">{site.studio}</span>
          <span className="text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
            {site.city}
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? "true" : undefined}
                className={`relative py-1 text-sm transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:bg-brass after:transition-transform after:duration-300 after:content-[''] hover:text-brass ${
                  active === link.href
                    ? "text-brass after:w-full after:scale-x-100"
                    : "text-foreground after:w-full after:origin-left after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center rounded-full bg-brass px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Book Consultation
            </a>
          </li>
        </ul>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-label="Open menu"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border md:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="glass fixed inset-0 z-50 flex flex-col gap-2 rounded-none p-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] md:hidden"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 font-display text-2xl"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-6 text-sm font-medium text-primary-foreground"
            >
              Book Consultation
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import { motion } from "framer-motion";
import { Compass, Sofa, Palette, MessageCircle, type LucideIcon } from "lucide-react";
import { services, type Service } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<Service["icon"], LucideIcon> = {
  compass: Compass,
  sofa: Sofa,
  palette: Palette,
  message: MessageCircle,
};

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Services" title="What We Do" />
        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <motion.li
                key={service.id}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.08 }}
                className="glass group p-7 transition-shadow duration-500 hover:shadow-[0_0_60px_-20px_var(--brass)]"
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow">{service.number}</span>
                  <Icon className="h-5 w-5 text-brass" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-2xl">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

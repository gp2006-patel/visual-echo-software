import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="max-w-2xl"
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      {copy ? <p className="mt-4 text-sm text-muted-foreground sm:text-base">{copy}</p> : null}
    </motion.div>
  );
}

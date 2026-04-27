import { motion } from "framer-motion";

const wordmarks = [
  "DISCOVER",
  "DESIGN",
  "BUILD",
  "LAUNCH",
  "OPERATE",
  "ITERATE",
];

export function LogoCloud() {
  return (
    <section className="border-b border-border/60 py-14 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-center text-xs tracking-[0.22em] text-muted-foreground/70 uppercase">
            How we deliver
          </p>
          <div className="mt-8 flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
            {wordmarks.map((name) => (
              <span
                key={name}
                className="text-sm font-semibold tracking-[0.22em] text-muted-foreground/60"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

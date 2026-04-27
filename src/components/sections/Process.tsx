import { motion } from "framer-motion";
import { Activity, Hammer, PenTool, Search, type LucideIcon } from "lucide-react";

type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    description: "Audit the problem, talk to users, define what 'done' looks like.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Design",
    description: "Sketch the system, prototype the riskiest parts, agree on the slice we'll ship first.",
  },
  {
    number: "03",
    icon: Hammer,
    title: "Build",
    description: "Tight cycles. Demo every Friday. Real telemetry from week two.",
  },
  {
    number: "04",
    icon: Activity,
    title: "Operate",
    description: "On-call, observability, and iteration. We stay until it's stable, not just live.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease, delay: i * 0.07 },
  }),
};

export function Process() {
  return (
    <section className="relative isolate border-b border-border/60 py-24 lg:py-32 section-blue-backdrop-strong">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-xs tracking-[0.18em] text-muted-foreground/70 uppercase"
          >
            How we work
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground"
          >
            A short loop, run honestly.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-5 max-w-2xl text-muted-foreground"
          >
            Four phases. Real artifacts at each one. No theater.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-px bg-border/40 border border-border/60 rounded-2xl overflow-hidden mt-16">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-15%" }}
                variants={fadeUp}
                custom={i}
                className="bg-background p-8 lg:p-10 relative group/step transition-colors hover:bg-card/40"
              >
                <Icon
                  className="absolute top-6 right-6 h-4 w-4 text-primary opacity-60 transition-opacity group-hover/step:opacity-100"
                  strokeWidth={1.75}
                />
                <div className="font-serif-accent text-6xl lg:text-7xl text-primary/80 leading-none tracking-tight">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mt-6 tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground mt-2">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

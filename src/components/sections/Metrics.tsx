import { motion } from "framer-motion";
import { TrendingUp, Users, Globe2, LucideIcon } from "lucide-react";

type Stat = {
  icon: LucideIcon;
  number: string;
  label: string;
};

const stats: Stat[] = [
  {
    icon: TrendingUp,
    number: "98%",
    label: "Client retention across the last 12 engagements.",
  },
  {
    icon: Users,
    number: "40+",
    label: "Engineers, designers, and ML practitioners in our network.",
  },
  {
    icon: Globe2,
    number: "12",
    label:
      "Industries shipped to — fintech, health, climate, defense, and more.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-15%" },
};

const ease = [0.22, 1, 0.36, 1] as const;

type Testimonial = {
  quote: string;
  initials: string;
  name: string;
  role: string;
};

const testimonialA: Testimonial = {
  quote:
    "They embedded with our team, shipped a working agent in five weeks, and stayed long enough to make sure it didn't break.",
  initials: "MR",
  name: "Maya Rao",
  role: "VP Engineering, Atlas Health",
};

const testimonialB: Testimonial = {
  quote:
    "The clearest, most honest scoping conversation we've had with an outside team. Then they actually delivered against it.",
  initials: "JC",
  name: "Jordan Chen",
  role: "Founder, Cascade",
};

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-7 backdrop-blur-sm flex flex-col justify-between h-full">
      <p className="text-base lg:text-lg leading-relaxed text-foreground">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-xs text-foreground">
          {t.initials}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{t.name}</span>
          <span className="text-xs text-muted-foreground">{t.role}</span>
        </div>
      </div>
    </div>
  );
}

export function Metrics() {
  return (
    <section className="relative isolate border-b border-border/60 py-24 lg:py-32 section-blue-backdrop">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.45, ease }}
          className="max-w-2xl"
        >
          <p className="text-xs tracking-[0.22em] text-muted-foreground/70 uppercase">
            Outcomes, not theater
          </p>
          <h2 className="mt-4 text-3xl lg:text-5xl font-semibold tracking-tight text-foreground">
            Numbers from recent engagements.
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.number}
                {...fadeUp}
                transition={{
                  duration: 0.45,
                  ease,
                  delay: i * 0.08,
                }}
                className="lg:col-span-1 relative rounded-2xl border border-border/60 bg-card/60 p-7 backdrop-blur-sm"
              >
                <Icon className="absolute top-6 right-6 h-4 w-4 text-primary stroke-[1.75]" />
                <div className="text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
                  {s.number}
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {s.label}
                </p>
              </motion.div>
            );
          })}

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.45, ease, delay: 0.24 }}
            className="lg:col-span-2"
          >
            <TestimonialCard t={testimonialA} />
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.45, ease, delay: 0.32 }}
            className="lg:col-span-5"
          >
            <TestimonialCard t={testimonialB} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

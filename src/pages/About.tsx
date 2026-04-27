import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Target,
  Lightbulb,
  Handshake,
  Users,
  Compass,
  ShieldCheck,
  Flag,
  Rocket,
  Globe2,
  Sparkles,
  UsersRound,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE, delay: i * 0.07 },
  }),
};

type Value = { icon: LucideIcon; title: string; description: string };

const values: Value[] = [
  {
    icon: Target,
    title: "Excellence",
    description:
      "We hold the bar high — code, communication, and craft. Every deliverable should be something we'd sign our name to.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We pick the modern tool when it earns its place — and the boring one when it doesn't. Curiosity, not novelty for its own sake.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    description:
      "Clients aren't tickets. We invest in your roadmap, push back when needed, and stay close after launch.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Small, senior teams that work in the open with you — async-first, decisions documented, no surprises.",
  },
  {
    icon: Compass,
    title: "Clarity",
    description:
      "Honest scopes, honest timelines, honest tradeoffs. We'd rather lose a deal than overpromise on one.",
  },
  {
    icon: ShieldCheck,
    title: "Ownership",
    description:
      "We ship to production, watch the dashboards, and own the on-call. The work isn't done when the PR merges.",
  },
];

type Milestone = {
  date: string;
  icon: LucideIcon;
  title: string;
  description: string;
  status?: "now" | "next";
};

const milestones: Milestone[] = [
  {
    date: "Q1 2026",
    icon: Flag,
    title: "Founded in Saint Louis",
    description:
      "NeosTechs starts with a small, senior team and a single rule: ship engineered outcomes, not slideware. Mission written on day one — still on the wall.",
  },
  {
    date: "Q1 2026",
    icon: Rocket,
    title: "First production launch",
    description:
      "Shipped Fenton Gyro — a real-time POS and online ordering system for a Mediterranean kitchen. First customer paying, first dashboards lit up.",
  },
  {
    date: "Q2 2026",
    icon: Globe2,
    title: "Restaurant & retail wave",
    description:
      "Five more live customer sites in eight weeks: Dulceria Medina, Taco Hectorito, Louisiana Fish, Mariachi, Novedades Latinos Beauty.",
  },
  {
    date: "Q2 2026",
    icon: Sparkles,
    title: "AI-native by default",
    description:
      "Made AI a baseline layer in every build — agents, RAG, automations woven through engineering, data, and cloud. No more 'AI as feature.'",
  },
  {
    date: "Q3 2026",
    icon: UsersRound,
    title: "Team of six",
    description:
      "Full-stack, machine learning, data engineering, and mobile in one room — async-first, working across US time zones.",
  },
  {
    date: "Looking ahead",
    icon: TrendingUp,
    title: "Production AI, regulated environments",
    description:
      "Building toward healthcare, fintech, and platform engagements. Hiring engineers who care about the craft and ship like it matters.",
    status: "next",
  },
];

const stats = [
  { value: "12+", label: "Industries shipped to" },
  { value: "20+", label: "Projects delivered" },
  { value: "98%", label: "Client retention" },
  { value: "6+", label: "Countries served" },
];

const radialMask =
  "radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 80%)";

export default function About() {
  return (
    <Layout>
      <SEO
        title="About"
        description="NeosTechs is an applied AI and full-stack engineering studio shipping production software, data, and cloud systems for ambitious teams."
        path="/about"
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border/60">
        {/* Architectural photo backdrop, faded to white */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=2400&q=80&auto=format&fit=crop"
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--background) / 0.55) 0%, hsl(var(--background) / 0.85) 60%, hsl(var(--background)) 100%)",
            }}
          />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid opacity-30"
          style={{ maskImage: radialMask, WebkitMaskImage: radialMask }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 40% at 50% 0%, hsl(var(--primary) / 0.10), transparent 70%)",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-36 pb-16 lg:pb-20">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                About NeosTechs
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-6 font-semibold tracking-tight leading-[1.05] text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Engineers who actually{" "}
              <span className="font-serif-accent text-primary">ship</span>.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg leading-relaxed text-muted-foreground max-w-2xl mt-6"
            >
              We're a senior, full-stack engineering studio building software,
              data, AI, and cloud systems for organizations ready to move past
              pilots and into production.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative border-t border-border/60 py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15%" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="grid lg:grid-cols-12 gap-12"
          >
            <motion.div variants={fadeUp} custom={0} className="lg:col-span-5">
              <p className="text-xs tracking-[0.18em] text-muted-foreground/70 uppercase">
                Why we exist
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
                Our mission.
              </h2>
            </motion.div>
            <motion.div
              variants={fadeUp}
              custom={1}
              className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed"
            >
              <p>
                We started NeosTechs because too many great ideas stall in slide
                decks and proof-of-concepts. Our mission is to democratize
                access to serious engineering — applied AI, well-built
                platforms, honest cloud — so businesses of every size can move
                from intent to production.
              </p>
              <p>
                We aim to be the partner ambitious teams call when the work has
                to actually land. Innovative where it matters, boring where it
                should be, and accountable from the first conversation through
                long after launch.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline / Journey */}
      <section className="relative border-t border-border/60 py-24 lg:py-32 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid opacity-30"
          style={{
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 50%, #000 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 50% at 50% 50%, #000 30%, transparent 80%)",
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
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
              The journey
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground"
            >
              Built in the open, one milestone at a time.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-5 text-muted-foreground"
            >
              We started in 2026 with a long list of dreams and a short list of
              clients. Here's what's happened since — and what's next.
            </motion.p>
          </motion.div>

          <div className="relative mt-16 max-w-4xl mx-auto">
            {/* vertical spine */}
            <div
              aria-hidden
              className="absolute left-[7.5rem] sm:left-[8.5rem] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden sm:block"
            />

            <ol className="space-y-10">
              {milestones.map((m, i) => {
                const Icon = m.icon;
                const isNext = m.status === "next";
                return (
                  <motion.li
                    key={m.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 0.45,
                      ease: EASE,
                      delay: i * 0.06,
                    }}
                    className="relative flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8"
                  >
                    {/* date column */}
                    <div className="sm:w-28 shrink-0">
                      <div
                        className={
                          "text-xs font-mono tracking-wider uppercase " +
                          (isNext
                            ? "text-primary"
                            : "text-muted-foreground/80")
                        }
                      >
                        {m.date}
                      </div>
                    </div>

                    {/* dot on the spine */}
                    <div className="relative shrink-0 hidden sm:flex items-start justify-center w-4 -ml-2">
                      <span
                        className={
                          "mt-1 h-3 w-3 rounded-full border-2 border-background ring-1 " +
                          (isNext
                            ? "bg-primary ring-primary/40"
                            : "bg-background ring-border")
                        }
                      >
                        {isNext && (
                          <span className="block h-full w-full rounded-full bg-primary" />
                        )}
                      </span>
                    </div>

                    {/* content */}
                    <div className="flex-1 min-w-0">
                      <SpotlightCard
                        className={
                          "rounded-2xl border bg-card/60 backdrop-blur-sm p-6 transition-colors " +
                          (isNext
                            ? "border-primary/40 hover:border-primary/60"
                            : "border-border/60 hover:border-border")
                        }
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={
                              "h-9 w-9 rounded-lg flex items-center justify-center shrink-0 " +
                              (isNext
                                ? "bg-primary/10 border border-primary/30"
                                : "bg-secondary border border-border/60")
                            }
                          >
                            <Icon
                              className="h-4 w-4 text-primary"
                              strokeWidth={1.75}
                            />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-base font-semibold tracking-tight text-foreground leading-snug">
                              {m.title}
                              {isNext && (
                                <span className="ml-2 inline-flex items-center gap-1 align-middle text-[10px] tracking-[0.18em] uppercase text-primary border border-primary/30 bg-primary/5 px-1.5 py-0.5 rounded-full">
                                  Next
                                </span>
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                              {m.description}
                            </p>
                          </div>
                        </div>
                      </SpotlightCard>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative border-t border-border/60 py-24 lg:py-32">
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
              What we believe
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground"
            >
              The values that shape the work.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-5 text-muted-foreground"
            >
              Six principles we hire for, plan around, and check ourselves
              against on every engagement.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/40 border border-border/60 rounded-2xl overflow-hidden mt-14">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-15%" }}
                  variants={fadeUp}
                  custom={i}
                  className="bg-background"
                >
                  <SpotlightCard className="h-full p-8 transition-colors hover:bg-card/40">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                    <h3 className="text-base font-semibold mt-6 tracking-tight text-foreground">
                      {v.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground mt-2">
                      {v.description}
                    </p>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative border-t border-border/60 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15%" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            className="max-w-2xl mb-12"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs tracking-[0.18em] text-muted-foreground/70 uppercase"
            >
              By the numbers
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground"
            >
              A small team with a long reach.
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-15%" }}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-7"
              >
                <div className="text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
                  {s.value}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-border/60 py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15%" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
          >
            <motion.div variants={fadeUp} custom={0} className="max-w-2xl">
              <p className="text-xs tracking-[0.18em] text-muted-foreground/70 uppercase">
                Ready to talk
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
                Let's build something{" "}
                <span className="font-serif-accent text-primary">real</span>.
              </h2>
            </motion.div>
            <motion.div
              variants={fadeUp}
              custom={1}
              className="flex flex-wrap items-center gap-3"
            >
              <Button
                asChild
                size="lg"
                className="group/btn relative rounded-full bg-primary text-primary-foreground transition-shadow duration-300 hover:bg-primary/90 hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.55)]"
              >
                <Link to="/contact">
                  <Calendar className="mr-2 h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" />
                  Book a 30-min call
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="group/ghost rounded-full border border-border hover:bg-secondary"
              >
                <Link to="/projects">
                  See our work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/ghost:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Calendar,
  Check,
  Cloud,
  Code2,
  Compass,
  Database,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO, serviceJsonLd } from "@/components/SEO";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/button";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const radialMask =
  "radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 80%)";

type Capability = {
  number: string;
  title: string;
  heading: string;
  lede: string;
  bullets: string[];
  chips: string[];
  icon: LucideIcon;
};

const capabilities: Capability[] = [
  {
    number: "01 — Strategy",
    title: "Strategy",
    heading: "Strategy & advisory we'd actually pay for.",
    lede:
      "Discovery, architecture, and roadmap work that moves you from 'maybe AI' to 'here's the slice we ship in 8 weeks.'",
    bullets: [
      "Discovery sprints (1–2 weeks, fixed price)",
      "Technical due diligence",
      "Roadmaps with real milestones, not gantts",
    ],
    chips: ["Discovery", "Roadmap", "DD"],
    icon: Compass,
  },
  {
    number: "02 — Engineering",
    title: "Engineering",
    heading: "Software engineering for teams that ship.",
    lede:
      "Web, mobile, and platform builds — for product, internal tools, and customer-facing systems.",
    bullets: [
      "Full-stack web apps (React, TypeScript, Vite, Next)",
      "iOS / Android / cross-platform mobile",
      "Internal tools, admin panels, dashboards",
    ],
    chips: ["React", "Next", "iOS"],
    icon: Code2,
  },
  {
    number: "03 — AI & ML",
    title: "AI & ML",
    heading: "Applied AI, engineered for production.",
    lede:
      "Agents, RAG systems, and model integration that hold up under real traffic — with real evals, not vibes.",
    bullets: [
      "Voice and chat agents on your data",
      "RAG over docs, tickets, and warehouses",
      "Eval pipelines, A/B and observability",
    ],
    chips: ["LLMs", "RAG", "Evals"],
    icon: Brain,
  },
  {
    number: "04 — Data & Analytics",
    title: "Data & Analytics",
    heading: "From scattered data to confident decisions.",
    lede:
      "Pipelines, warehouses, and analytics that turn the data you already have into something a person can act on.",
    bullets: [
      "ETL/ELT pipelines (dbt, Airflow, Dagster)",
      "Warehouses (Snowflake, BigQuery, Postgres)",
      "Dashboards your team will actually open",
    ],
    chips: ["dbt", "Snowflake", "BigQuery"],
    icon: Database,
  },
  {
    number: "05 — Cloud & DevOps",
    title: "Cloud & DevOps",
    heading: "Infra that's quiet, fast, and cheap.",
    lede:
      "Build pipelines, observability, and infra you don't have to think about — including the parts you'd rather not own.",
    bullets: [
      "AWS, GCP, Vercel — pick what fits",
      "CI/CD with real tests and previews",
      "Observability: traces, alerts, on-call",
    ],
    chips: ["AWS", "GCP", "Vercel"],
    icon: Cloud,
  },
  {
    number: "06 — Security & Compliance",
    title: "Security & Compliance",
    heading: "Security as a build constraint, not a checkbox.",
    lede:
      "Threat modeling, hardening, and compliance work for regulated and customer-trusted environments.",
    bullets: [
      "SOC2 / HIPAA readiness",
      "Threat models and pen-test prep",
      "Auth, secrets, and supply chain hygiene",
    ],
    chips: ["SOC2", "HIPAA", "AuthN"],
    icon: ShieldCheck,
  },
];

type ChipPos = { className: string };

const chipPositions: ChipPos[] = [
  { className: "absolute top-6 right-6" },
  { className: "absolute bottom-8 left-6" },
  { className: "absolute top-1/2 left-4 -translate-y-1/2" },
];

function CapabilityVisual({
  icon: Icon,
  chips,
}: {
  icon: LucideIcon;
  chips: string[];
}) {
  return (
    <SpotlightCard className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-8 aspect-[4/3] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--primary) / 0.14), transparent 70%)",
        }}
      />
      <div className="relative h-full w-full flex items-center justify-center">
        <Icon className="h-20 w-20 text-primary" strokeWidth={1.25} />
        {chips.map((chip, i) => (
          <span
            key={chip}
            className={
              chipPositions[i % chipPositions.length].className +
              " text-[10px] tracking-[0.18em] text-muted-foreground bg-secondary border border-border/60 px-2 py-1 rounded-full uppercase"
            }
          >
            {chip}
          </span>
        ))}
      </div>
    </SpotlightCard>
  );
}

function CapabilitySection({
  cap,
  index,
}: {
  cap: Capability;
  index: number;
}) {
  const reduce = useReducedMotion();
  const textFirst = index % 2 === 0;

  const TextBlock = (
    <motion.div
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-80px" }}
      variants={reduce ? undefined : fadeUp}
      className={
        "lg:col-span-7 " + (textFirst ? "lg:order-1" : "lg:order-2")
      }
    >
      <div className="text-xs tracking-[0.22em] text-primary uppercase font-mono">
        {cap.number}
      </div>
      <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight mt-3 leading-tight text-foreground">
        {cap.heading}
      </h2>
      <p className="text-base lg:text-lg text-muted-foreground mt-5 leading-relaxed max-w-xl">
        {cap.lede}
      </p>
      <ul className="mt-6 space-y-2.5">
        {cap.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3">
            <Check
              className="h-4 w-4 mt-0.5 text-primary shrink-0"
              strokeWidth={2}
            />
            <span className="text-sm text-foreground">{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  const VisualBlock = (
    <motion.div
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-80px" }}
      variants={reduce ? undefined : fadeUp}
      className={
        "lg:col-span-5 " + (textFirst ? "lg:order-2" : "lg:order-1")
      }
    >
      <CapabilityVisual icon={cap.icon} chips={cap.chips} />
    </motion.div>
  );

  return (
    <section className="border-b border-border/60 py-20 lg:py-28 section-blue-backdrop">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {TextBlock}
          {VisualBlock}
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <Layout>
      <SEO
        title="Capabilities"
        description="Strategy, software engineering, AI & ML, data & analytics, cloud & DevOps, and security & compliance — all from one accountable team."
        path="/services"
        keywords={[
          "IT services",
          "software engineering",
          "AI machine learning",
          "data analytics",
          "cloud DevOps",
          "security compliance",
          "consulting",
        ]}
        jsonLd={serviceJsonLd({
          name: "NeosTechs Capabilities",
          description: "Full-stack IT services — strategy, software, AI, data, cloud, and security.",
          serviceType: "IT Consulting and Engineering",
          area: "United States, Latin America, Europe",
        })}
      />

      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid opacity-40"
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

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-36 pb-12">
          <motion.div
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "show"}
            variants={reduce ? undefined : fadeUp}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Capabilities
            </span>

            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-foreground">
              One team. The{" "}
              <span className="font-serif-accent text-primary">full</span>{" "}
              stack.
            </h1>

            <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl mt-6">
              From strategy through operate — engineering, AI, data, cloud, and
              security under one roof.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
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
            </div>
          </motion.div>
        </div>
      </section>

      {capabilities.map((cap, i) => (
        <CapabilitySection key={cap.number} cap={cap} index={i} />
      ))}

      <section className="py-20 section-blue-backdrop-strong">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduce ? undefined : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true, margin: "-80px" }}
            variants={reduce ? undefined : fadeUp}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">
              Pick the slice you want shipped first.
            </h2>
            <p className="mt-5 text-base lg:text-lg text-muted-foreground leading-relaxed">
              Bring us a problem worth solving. We'll come back with a sharp
              scope, a real timeline, and a team that ships.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="group/btn relative rounded-full bg-primary text-primary-foreground transition-shadow duration-300 hover:bg-primary/90 hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.55)]"
              >
                <Link to="/contact">
                  <Calendar className="mr-2 h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" />
                  Book a call
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="group/ghost rounded-full border border-border hover:bg-secondary"
              >
                <Link to="/projects">
                  See case studies
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/ghost:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

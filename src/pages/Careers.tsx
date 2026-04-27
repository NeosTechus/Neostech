import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Hammer,
  Compass,
  Banknote,
  Sun,
} from "lucide-react";

type Role = {
  title: string;
  department: string;
  location: string;
  type: string;
  description?: string;
};

const roles: Role[] = [
  {
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote / Saint Louis",
    type: "Full-time",
    description:
      "Own features end-to-end across React, Node, and the cloud. You'll ship to real customers in your first week, not your first quarter.",
  },
  {
    title: "AI/ML Engineer",
    department: "AI Research",
    location: "Remote / Saint Louis",
    type: "Full-time",
    description:
      "Design, evaluate, and ship LLM-backed agents that actually do work. Comfortable arguing about evals, latency, and cost trade-offs.",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote / Saint Louis",
    type: "Full-time",
    description:
      "Drive product surface area from wireframes through production. You think in flows and edge cases, not dribbble shots.",
  },
  {
    title: "Engineering Manager",
    department: "Engineering",
    location: "Remote / Saint Louis",
    type: "Full-time",
    description:
      "Lead a small pod of engineers. Half your time is unblocking people; the other half is still in the codebase.",
  },
];

const values = [
  {
    icon: Hammer,
    title: "Real work",
    description:
      "Production code, real users, hard problems. No make-work tickets, no theater.",
  },
  {
    icon: Compass,
    title: "Real ownership",
    description:
      "You pick the approach, ship it, and answer for it. We trust you to make the call.",
  },
  {
    icon: Banknote,
    title: "Real money",
    description:
      "Honest market comp, reviewed yearly without the negotiation games.",
  },
  {
    icon: Sun,
    title: "Real time off",
    description:
      "Take it without justifying it. We measure output, not hours at the keyboard.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function Careers() {
  return (
    <Layout>
      <SEO
        title="Careers"
        description="Join Neos Techs — we hire engineers and designers who care about shipping. Open roles in engineering, design, and AI."
        path="/careers"
      />

      <section className="relative pt-28 lg:pt-36 pb-12 section-blue-backdrop-strong">
        <div
          className="absolute inset-0 bg-grid opacity-60 pointer-events-none"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 30%, black 40%, transparent 75%)",
            maskImage:
              "radial-gradient(ellipse at 50% 30%, black 40%, transparent 75%)",
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="text-sm text-muted-foreground tracking-wide uppercase mb-6">
              Careers
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-foreground">
              Build the things you'd{" "}
              <span className="font-serif-accent text-primary">actually</span>{" "}
              want to use.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              We're a small studio that ships. We hire people who care about the
              craft, take ownership of outcomes, and would rather argue about
              the right answer than wait to be told.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-border/60 py-24 section-blue-backdrop">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-2xl mb-12"
          >
            <div className="text-sm text-muted-foreground tracking-wide uppercase mb-4">
              Why work here
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Four things, no fluff.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40 border border-border/60 rounded-2xl overflow-hidden">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-background p-8 hover:bg-card/40 transition-colors"
              >
                <v.icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="openings"
        className="border-t border-border/60 py-24 lg:py-32 scroll-mt-24 section-blue-backdrop-strong"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="text-sm text-muted-foreground tracking-wide uppercase mb-4">
              Open roles
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
              What we're hiring for.
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              Send a short note about what you've shipped recently. We read
              every application.
            </p>
          </motion.div>

          <div className="mt-14 flex flex-col gap-4">
            {roles.map((role, i) => (
              <motion.div
                key={role.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: i * 0.06,
                }}
              >
                <Link to="/contact" className="group block">
                  <SpotlightCard className="border border-border/60 bg-card/40 backdrop-blur-sm rounded-2xl px-6 py-6 transition-colors group-hover:border-border">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 justify-between">
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold tracking-tight text-foreground">
                          {role.title}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                          <span>{role.department}</span>
                          <span className="text-muted-foreground/40">·</span>
                          <span>{role.location}</span>
                          <span className="text-muted-foreground/40">·</span>
                          <span>{role.type}</span>
                        </div>
                      </div>
                      <span className="arrow-link text-sm text-foreground">
                        Apply
                        <ArrowRight className="arrow h-4 w-4" />
                      </span>
                    </div>
                    {role.description && (
                      <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                        {role.description}
                      </p>
                    )}
                  </SpotlightCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 py-16 section-blue-backdrop">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="text-lg text-foreground">
              Don't see your role? Tell us what you'd build here anyway.
            </p>
            <div className="mt-6 flex justify-center">
              <Button asChild size="lg">
                <Link to="/contact">
                  Send us a note
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

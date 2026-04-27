import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

type InsightItem = {
  issue: string;
  category: string;
  readTime: string;
  title: string;
  lede: string;
  byline: string;
};

const items: InsightItem[] = [
  {
    issue: "01",
    category: "Field notes",
    readTime: "6 min read",
    title: "When an AI agent actually replaces a human — and when it just adds latency.",
    lede: "We've shipped agents that booked 38 patients a day, and others that only made things slower. Here's the diagnostic we run before we even quote.",
    byline: "By the engineering team",
  },
  {
    issue: "02",
    category: "Playbook",
    readTime: "9 min read",
    title: "The migration kit we use to put restaurants and retail on Vite + Vercel.",
    lede: "What we keep, what we throw away, and the four checks that have caught every regression so far.",
    byline: "Engineering · Platform",
  },
  {
    issue: "03",
    category: "Process",
    readTime: "4 min read",
    title: "The 30-minute scoping call: what we ask, what we listen for, and what we never promise.",
    lede: "If a discovery call is mostly the agency talking, it's already broken. The script we use to make sure that doesn't happen.",
    byline: "Discovery · Strategy",
  },
];

export function Insights() {
  return (
    <section className="relative isolate border-b border-border/60 py-24 lg:py-32 section-blue-backdrop">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.22em] text-muted-foreground/70 uppercase">
              Outlook
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mt-4">
              Notes from the{" "}
              <span className="font-serif-accent text-primary">build floor</span>.
            </h2>
            <p className="mt-5 max-w-xl text-muted-foreground">
              Short, opinionated reads on what we're seeing across engagements — what's working, what isn't, and what to skip.
            </p>
          </div>
          <div className="hidden md:block">
            <Link
              to="/projects"
              className="arrow-link text-sm text-foreground hover:text-primary"
            >
              All articles
              <ArrowRight className="arrow h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {items.map((item, index) => (
            <motion.div
              key={item.issue}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.08,
              }}
            >
              <Link to="/projects" className="group block">
                <SpotlightCard className="card-lift rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden h-full group-hover:border-border">
                  <div
                    className="relative aspect-[3/2] overflow-hidden border-b border-border/60"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--background)) 100%)",
                    }}
                  >
                    <span className="absolute -bottom-4 -right-2 font-serif-accent text-[8rem] leading-none text-primary/20 select-none">
                      {item.issue}
                    </span>
                    <span className="absolute top-4 left-4 text-[10px] tracking-[0.2em] text-muted-foreground bg-background/80 border border-border/60 px-2 py-1 rounded-full uppercase backdrop-blur-sm">
                      {item.category}
                    </span>
                    <span className="absolute bottom-4 left-4 text-[11px] text-muted-foreground font-mono">
                      {item.readTime}
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                      {item.lede}
                    </p>
                    <div className="mt-6 flex items-center justify-between text-sm border-t border-border/60 pt-5">
                      <span className="text-muted-foreground">{item.byline}</span>
                      <span className="arrow-link text-foreground">
                        Read
                        <ArrowRight className="arrow h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const EASE = [0.22, 1, 0.36, 1] as const;

const items = [
  {
    value: "scope",
    q: "How do you scope an engagement?",
    a: "We start with a 30-minute call to understand the problem, then a paid 1-week discovery to produce a concrete plan, milestones, and a fixed price. If the plan doesn't make sense, you don't continue — and you keep everything we wrote.",
  },
  {
    value: "smallest",
    q: "What's the smallest project you take?",
    a: "Two-week prototypes. We've shipped working AI agents, data pipelines, and internal tools in that window. If it's smaller, we'll usually point you to a freelancer or template that fits better.",
  },
  {
    value: "ai-only",
    q: "Do you only work on AI?",
    a: "No. AI is roughly half our work; the rest is custom software, data platforms, and platform engineering. The thing they share is shipping production code that operates reliably.",
  },
  {
    value: "location",
    q: "Where are you based, and do you work remotely?",
    a: "Saint Louis, Missouri — and remote-first. We work async by default, with weekly demos and short overlap windows for whichever timezone the team is in. We've worked with US, EU, and APAC teams.",
  },
  {
    value: "pricing",
    q: "What does pricing look like?",
    a: "Fixed-price for discovery and small builds. Time-and-materials with a cap for longer engagements. Most projects land between $20–80k for a first slice. We'll share a real number after one call — no proposals theatre.",
  },
  {
    value: "ownership",
    q: "Who owns the code, IP, and models?",
    a: "You do — fully, on day one. We work in your repos, on your cloud, with your accounts wherever possible. Our contracts assign all work product to you, including any custom training artifacts.",
  },
];

export function FAQ() {
  return (
    <section className="relative isolate border-b border-border/60 py-24 lg:py-32 section-blue-backdrop-strong">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.45, ease: EASE }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-xs tracking-[0.22em] text-muted-foreground/70 uppercase">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mt-4">
            Common questions, honest answers.
          </h2>
          <p className="text-muted-foreground mt-4">
            If you don't see yours here, just ask on a call.
          </p>
        </motion.div>

        <div className="mt-14 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {items.map((item, i) => (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{
                  duration: 0.45,
                  ease: EASE,
                  delay: i * 0.06,
                }}
              >
                <AccordionItem
                  value={item.value}
                  className="rounded-xl border border-border/60 bg-card/40 px-5 backdrop-blur-sm"
                >
                  <AccordionTrigger className="text-left text-base font-medium hover:no-underline py-5">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

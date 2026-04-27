import { motion } from "framer-motion";
import {
  Utensils,
  ShoppingBag,
  Stethoscope,
  Banknote,
  Cpu,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

type Industry = {
  icon: LucideIcon;
  name: string;
  description: string;
  tags: string[];
};

const industries: Industry[] = [
  {
    icon: Utensils,
    name: "Restaurants & Hospitality",
    description:
      "Brand sites, online ordering, POS, and reservations for kitchens, mariachis, and multi-location chains.",
    tags: ["Ordering", "POS", "SEO"],
  },
  {
    icon: ShoppingBag,
    name: "Retail & E-commerce",
    description:
      "Storefronts, catalog ops, and bilingual checkout flows for specialty retail and consumer brands.",
    tags: ["Storefront", "Catalog", "Checkout"],
  },
  {
    icon: Stethoscope,
    name: "Healthcare & Wellness",
    description:
      "HIPAA-aware patient flows, intake automation, and provider-side dashboards.",
    tags: ["HIPAA", "Intake", "Triage"],
  },
  {
    icon: Banknote,
    name: "Financial Services",
    description:
      "Internal tools, reconciliation pipelines, and customer portals for fintech and banking ops.",
    tags: ["Compliance", "Audit", "Pipelines"],
  },
  {
    icon: Cpu,
    name: "Technology & SaaS",
    description:
      "Platform builds, AI integrations, and developer-grade tooling for product-led teams.",
    tags: ["Platform", "AI", "DX"],
  },
  {
    icon: Building2,
    name: "Public Sector & Civic",
    description:
      "Accessible, multilingual web for nonprofits, agencies, and community organizations.",
    tags: ["A11y", "i18n", "WCAG"],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Industries() {
  return (
    <section className="border-b border-border/60 py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.45, ease }}
          className="max-w-2xl"
        >
          <p className="text-xs tracking-[0.22em] text-muted-foreground/70 uppercase">
            Who we serve
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mt-4">
            Industries we{" "}
            <span className="font-serif-accent text-primary">know</span> cold.
          </h2>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Six verticals where we've shipped, scaled, and stayed on call.
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.45, ease, delay: i * 0.07 }}
              >
                <SpotlightCard className="card-lift rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden h-full hover:border-border">
                  <div className="p-7">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-primary" strokeWidth={1.75} />
                      </div>
                      <h3 className="text-base font-semibold tracking-tight text-foreground">
                        {industry.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                      {industry.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {industry.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] tracking-[0.16em] text-muted-foreground bg-secondary border border-border/60 px-2 py-0.5 rounded-full uppercase"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

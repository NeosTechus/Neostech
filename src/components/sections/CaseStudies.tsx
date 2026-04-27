import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

type Project = {
  name: string;
  url: string;
  domain: string;
  tag: string;
  description: string;
};

const projects: Project[] = [
  {
    name: "Fenton Gyro",
    url: "https://fentongyro.com",
    domain: "fentongyro.com",
    tag: "Restaurant POS",
    description:
      "Custom kiosk, POS, and customer-facing website for a Mediterranean kitchen — Turnkey-powered payments, REST API integrations, MongoDB, role-based auth for staff and admins, and live alerts on every web order.",
  },
  {
    name: "Dulceria Medina",
    url: "https://www.dulceriamedina.com",
    domain: "dulceriamedina.com",
    tag: "Retail · E-commerce",
    description:
      "Full e-commerce for a Mexican candy and ready-to-eat business — Firebase backend, JWT role-based auth, dual product catalog, bilingual checkout, and delivery within a 60-mile radius.",
  },
  {
    name: "Taco Hectorito",
    url: "https://www.tacoshectorito.com",
    domain: "tacoshectorito.com",
    tag: "Restaurant",
    description:
      "Brand site, menu, and reservation flow for a taco restaurant — mobile-first responsive layout, local SEO tuned for the neighborhood, and fast load on cellular networks.",
  },
  {
    name: "Louisiana Fish & Chicken",
    url: "https://louisianafishchicken.com",
    domain: "louisianafishchicken.com",
    tag: "Restaurant",
    description:
      "Hero, menu, and order-online flow for a Louisiana-style fish and chicken kitchen — brand-aligned color palette, mobile-first checkout, and fast pickup-ordering experience.",
  },
  {
    name: "Mariachi",
    url: "https://mariachi2.vercel.app",
    domain: "mariachi2.vercel.app",
    tag: "Restaurant",
    description:
      "Marketing site and menu for a mariachi-themed Mexican restaurant — refined hero and navbar, view-menu flow, and a mobile-responsive layout that loads fast on cellular.",
  },
  {
    name: "Novedades Latinos Beauty",
    url: "https://www.novedadeslatinosbeauty.com",
    domain: "novedadeslatinosbeauty.com",
    tag: "Retail · Beauty",
    description:
      "Bilingual beauty and personal-care e-commerce for the Latin community — image-led product cards, deduplicated catalog, and a fast browse experience across mobile and desktop.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function CaseStudies() {
  return (
    <section className="border-b border-border/60 py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.45, ease }}
          className="max-w-2xl"
        >
          <p className="text-xs tracking-[0.22em] text-muted-foreground/70 uppercase">
            Selected work
          </p>
          <h2 className="mt-4 text-3xl lg:text-5xl font-semibold tracking-tight text-foreground">
            Live in production.
          </h2>
          <p className="mt-5 text-base lg:text-lg text-muted-foreground leading-relaxed">
            A few sites and platforms we've designed, built, and launched. Every
            one is currently serving real customers.
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.slice(0, 3).map((p, i) => (
            <motion.div
              key={p.url}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.45, ease, delay: i * 0.06 }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.4, ease, delay: 0.1 }}
          className="mt-10 flex justify-center"
        >
          <Link to="/projects" className="arrow-link text-sm text-foreground hover:text-primary">
            View all work
            <ArrowRight className="arrow h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  const favicon = `https://www.google.com/s2/favicons?domain=${p.domain}&sz=64`;

  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <SpotlightCard className="card-lift rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden group-hover:border-border">
        {/* Browser-style chrome + iframe preview */}
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-1.5 px-3 py-2 bg-background/80 backdrop-blur-sm border-b border-border/60">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            <span className="ml-2 truncate text-[10px] text-muted-foreground font-mono">
              {p.domain}
            </span>
          </div>

          <div className="absolute inset-0 pt-[34px]">
            <div
              className="absolute origin-top-left"
              style={{
                width: "200%",
                height: "200%",
                transform: "scale(0.5)",
              }}
            >
              <iframe
                src={p.url}
                title={p.name}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                referrerPolicy="no-referrer"
                className="h-full w-full pointer-events-none border-0 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <img
              src={favicon}
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 rounded-sm bg-muted"
              loading="lazy"
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold tracking-tight text-foreground truncate">
                {p.name}
              </h3>
              <p className="text-[11px] text-muted-foreground font-mono truncate">
                {p.domain}
              </p>
            </div>
            <span className="text-[10px] tracking-[0.18em] text-muted-foreground bg-secondary border border-border/60 px-2 py-1 rounded-full uppercase shrink-0">
              {p.tag}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed line-clamp-3">
            {p.description}
          </p>
        </div>
      </SpotlightCard>
    </a>
  );
}

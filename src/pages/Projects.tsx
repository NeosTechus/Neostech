import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
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

const categories = [
  "All",
  "Restaurant",
  "Restaurant POS",
  "Retail · E-commerce",
  "Retail · Beauty",
  "Internal Development",
];

const industryToCategory: Record<string, string> = {
  restaurants: "Restaurant",
  retail: "Retail · E-commerce",
};

export default function Projects() {
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState("All");

  useEffect(() => {
    const ind = searchParams.get("industry");
    if (ind && industryToCategory[ind]) {
      setActive(industryToCategory[ind]);
    }
  }, [searchParams]);

  const filtered = active === "All" ? projects : projects.filter((p) => p.tag === active);

  return (
    <Layout>
      <SEO
        title="Projects"
        description="A selection of real, deployed work from Neos Techs — every site is currently serving real customers."
        path="/projects"
      />

      <section className="relative isolate overflow-hidden border-b border-border/60 pt-32 lg:pt-40 pb-16 section-blue-backdrop-strong">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid opacity-30"
          style={{
            maskImage:
              "radial-gradient(ellipse 70% 50% at 50% 0%, #000 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 50% at 50% 0%, #000 30%, transparent 80%)",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.22em] text-muted-foreground/70 uppercase">
              Selected work
            </p>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
              Live in{" "}
              <span className="font-serif-accent text-primary">production</span>.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl">
              Sites and platforms we've designed, built, and shipped — each one
              currently serving real customers.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 py-12 lg:py-16 section-blue-backdrop">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={
                  "px-4 py-2 rounded-full text-sm font-medium border transition-colors " +
                  (active === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:bg-secondary hover:text-foreground")
                }
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <ProjectCard key={p.url} project={p} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
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
      <SpotlightCard className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden transition-colors group-hover:border-border">
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

          <div
            className="absolute inset-0 z-20 flex items-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(to top, rgba(15,23,62,0.55), transparent 60%)",
            }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-slate-900 px-3 py-1 text-xs font-medium shadow-sm">
              Visit site
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

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
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            {p.description}
          </p>
        </div>
      </SpotlightCard>
    </a>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

type Service = {
  category: string;
  title: string;
  description: string;
  image: string;
  href: string;
  featured?: boolean;
};

const services: Service[] = [
  {
    category: "AI & ML",
    title: "Applied AI, engineered to ship.",
    description:
      "Agents, RAG systems, and model integration that hold up under real traffic — with real evals, not vibes.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&q=80&auto=format&fit=crop",
    href: "/services#ai-ml",
    featured: true,
  },
  {
    category: "Engineering",
    title: "Software Engineering",
    description:
      "Web, mobile, and platform builds for product, internal tools, and customer-facing systems.",
    image:
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&q=80&auto=format&fit=crop",
    href: "/services#engineering",
  },
  {
    category: "Data",
    title: "Data & Analytics",
    description:
      "Pipelines, warehouses, and BI that turn the data you already have into decisions.",
    image:
      "https://images.unsplash.com/photo-1639152201720-5e536d254d81?w=1200&q=80&auto=format&fit=crop",
    href: "/services#data",
  },
  {
    category: "Cloud",
    title: "Cloud & DevOps",
    description:
      "Infrastructure, CI/CD, and observability designed to be quiet, fast, and cheap to run.",
    image:
      "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=1200&q=80&auto=format&fit=crop",
    href: "/services#cloud",
  },
  {
    category: "Strategy",
    title: "Strategy & Advisory",
    description:
      "Discovery, scoping, and architecture — built once, built right.",
    image:
      "https://images.unsplash.com/photo-1542435503-956c469947f6?w=1200&q=80&auto=format&fit=crop",
    href: "/services#strategy",
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

export function Services() {
  const featured = services.find((s) => s.featured) ?? services[0];
  const rest = services.filter((s) => !s.featured);

  return (
    <section className="relative isolate border-b border-border/60 py-24 lg:py-32 section-blue-backdrop">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-xs tracking-[0.22em] text-muted-foreground/70 uppercase"
          >
            Capabilities
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.1] sm:leading-[1.05]"
          >
            Powerful capabilities to{" "}
            <span className="font-serif-accent text-primary">accelerate</span>{" "}
            your transformation.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-6 max-w-2xl text-base lg:text-lg text-muted-foreground leading-relaxed"
          >
            Strategy through operate, with AI woven through every layer —
            engineering, data, cloud, and security under one accountable roof.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-2 lg:grid-rows-2">
          <FeatureCard service={featured} />
          {rest.map((s, i) => (
            <SmallCard key={s.title} service={s} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ service }: { service: Service }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.5, ease }}
      className="lg:col-span-2 lg:row-span-2"
    >
      <Link to={service.href} className="group/card relative block h-full overflow-hidden rounded-sm">
        <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full">
          <img
            src={service.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
          />
          {/* Subtle bottom gradient — present by default for label legibility */}
          <div
            aria-hidden
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(180deg, transparent 50%, rgba(2,6,35,0.65) 100%)",
            }}
          />
          {/* Hover overlay — fills in to reveal description */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
            style={{
              background:
                "linear-gradient(180deg, rgba(2,6,35,0.30) 0%, rgba(2,6,35,0.65) 50%, rgba(2,6,35,0.90) 100%)",
            }}
          />
          {/* Bottom-left content */}
          <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
            <span className="block text-[11px] uppercase tracking-[0.22em] text-white/85">
              {service.category}
            </span>
            <h3 className="mt-2 text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-tight text-white leading-[1.1]">
              {service.title}
            </h3>
            <div
              className="grid transition-all duration-500 ease-out grid-rows-[0fr] opacity-0 group-hover/card:grid-rows-[1fr] group-hover/card:opacity-100 group-hover/card:mt-3"
            >
              <div className="overflow-hidden">
                <p className="max-w-xl text-sm lg:text-base leading-relaxed text-white/80">
                  {service.description}
                </p>
              </div>
            </div>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white opacity-0 transition-opacity duration-500 group-hover/card:opacity-100">
              Learn more
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function SmallCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.45, ease, delay: index * 0.06 }}
    >
      <Link
        to={service.href}
        className="group/card relative block aspect-[4/3] sm:aspect-square overflow-hidden rounded-sm"
      >
        <img
          src={service.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.06]"
        />
        {/* Default subtle bottom gradient */}
        <div
          aria-hidden
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(180deg, transparent 55%, rgba(2,6,35,0.65) 100%)",
          }}
        />
        {/* Hover overlay */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,6,35,0.25) 0%, rgba(2,6,35,0.55) 45%, rgba(2,6,35,0.90) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
          <span className="block text-[10px] uppercase tracking-[0.22em] text-white/85">
            {service.category}
          </span>
          <h3 className="mt-1.5 text-lg lg:text-xl font-semibold tracking-tight text-white leading-snug">
            {service.title}
          </h3>
          <div className="grid transition-all duration-500 ease-out grid-rows-[0fr] opacity-0 group-hover/card:grid-rows-[1fr] group-hover/card:opacity-100 group-hover/card:mt-2">
            <div className="overflow-hidden">
              <p className="text-[13px] leading-relaxed text-white/85">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

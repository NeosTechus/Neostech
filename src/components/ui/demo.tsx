'use client'

import { useEffect, useRef, useState } from "react";
 import { SplineScene } from "@/components/ui/splite";
 import { Card } from "@/components/ui/card";

 export function SplineSceneBasic() {
  const serviceCards = [
    {
      title: "Website Development",
      description:
        "Build stunning, high-performance websites that captivate your audience and drive conversions.",
      details:
        "We design and build modern websites that are fast, responsive, and easy to update. Whether it is a landing page or a full website, we focus on clear messaging, conversions, SEO, and a smooth user experience across devices.",
      points: [
        "React, Next.js & modern frameworks",
        "Responsive & mobile-first design",
        "SEO optimization built-in",
        "Core Web Vitals performance tuning",
        "Accessibility compliance (WCAG)",
        "CMS integration and content workflows",
        "Landing pages and marketing sites",
        "Ecommerce and booking flows",
        "Analytics, tracking, and A/B testing",
        "Ongoing support and updates",
      ],
      position: "top-6 left-6",
      cardPosition: "top-20 left-2",
      align: "items-start text-left",
    },
    {
      title: "AI Agents & Automation",
      description:
        "Deploy intelligent AI agents that work 24/7 to streamline your operations and boost productivity.",
      details:
        "We build AI agents that answer questions, automate tasks, and integrate with your tools. Reduce manual work, improve response time, and keep operations running 24/7 with measurable ROI.",
      points: [
        "Custom AI model development",
        "Process automation workflows",
        "Natural language processing",
        "Intelligent chatbots & copilots",
        "Predictive analytics & insights",
        "Seamless integrations with your stack",
        "CRM and support desk automations",
        "Human-in-the-loop approvals",
        "Knowledge base grounding",
        "Monitoring and usage analytics",
      ],
      position: "top-6 right-6",
      cardPosition: "top-20 right-2",
      align: "items-end text-right",
    },
    {
      title: "Custom Development",
      description:
        "Bespoke software solutions tailored to your unique business requirements.",
      details:
        "We build custom software that fits your workflow, from internal tools to customer‑facing platforms. Expect reliable performance, secure architecture, and scalable code you can grow with.",
      points: [
        "Web apps and internal tools",
        "APIs & third‑party integrations",
        "Product MVPs and rapid prototyping",
        "Secure authentication & user roles",
        "Scalable architecture & clean code",
        "Maintenance, fixes, and upgrades",
        "Multi-tenant SaaS development",
        "Admin dashboards and reporting",
        "Payment and billing workflows",
        "DevOps setup and deployments",
      ],
      position: "bottom-6 left-6",
      cardPosition: "bottom-20 left-2",
      align: "items-start text-left",
    },
    {
      title: "Database Solutions",
      description:
        "Scalable database architecture and optimization for enterprise applications.",
      details:
        "We design databases and data pipelines that are secure, fast, and scalable. From schema design to backups, we ensure your data stays reliable and accessible as you grow.",
      points: [
        "Schema design & data modeling",
        "Query optimization & indexing",
        "Security, backups & disaster recovery",
        "Data migration & cleanup",
        "Performance monitoring & tuning",
        "Scalable infrastructure planning",
        "ETL pipelines and data warehousing",
        "Access control and audit trails",
        "High availability and replication",
        "Cost optimization and scaling",
      ],
      position: "bottom-6 right-6",
      cardPosition: "bottom-20 right-2",
      align: "items-end text-right",
    },
  ];

  const [activeService, setActiveService] = useState<
    (typeof serviceCards)[number] | null
  >(null);
  const [activeOrigin, setActiveOrigin] = useState<"left" | "right">("left");
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  const getOrigin = (position: string) =>
    position.includes("right") ? "right" : "left";

  const showHoverCard = (title: string) => {
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    setHoveredService(title);
  };

  const hideHoverCard = () => {
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = window.setTimeout(() => {
      setHoveredService(null);
      hideTimerRef.current = null;
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

   return (
    <Card className="w-full h-[560px] sm:h-[520px] lg:h-[500px] border-0 bg-transparent relative overflow-hidden">
      {activeService && (
        <div
          className={`absolute left-0 top-0 z-30 h-full w-full rounded-2xl border border-white/15 bg-gradient-to-br from-white/15 to-white/5 p-6 text-white shadow-2xl backdrop-blur-xl sm:p-8 lg:w-1/2 ${
            activeOrigin === "right"
              ? "animate-service-card-in-from-right"
              : "animate-service-card-in-from-left"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-lg font-semibold text-sky-200">
                {activeService.title}
              </div>
              <div className="mt-3 text-sm font-medium text-white/90">
                {activeService.description}
              </div>
                <div className="mt-3 text-[13px] leading-relaxed text-white/70">
                  {activeService.details}
                </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveService(null)}
              className="rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[11px] text-white/80 transition-colors hover:bg-white/20"
            >
              Close
            </button>
            </div>
            <div className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-white/55">
              What you get
            </div>
            <ul className="mt-3 grid gap-2 text-[12px] text-white/80 sm:grid-cols-2">
              {activeService.points.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {activeService && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <svg
            className="absolute left-[52%] top-[46%] hidden h-40 w-40 lg:block"
            viewBox="0 0 160 160"
            fill="none"
          >
            <circle cx="150" cy="40" r="2" fill="rgba(59,130,246,0.95)" />
            <circle cx="128" cy="52" r="2.5" fill="rgba(255,255,255,0.7)" />
            <circle cx="110" cy="66" r="3" fill="rgba(255,255,255,0.65)" />
            <circle cx="90" cy="84" r="3.5" fill="rgba(255,255,255,0.6)" />
            <circle cx="68" cy="104" r="4" fill="rgba(255,255,255,0.55)" />
            <circle cx="42" cy="120" r="4.5" fill="rgba(255,255,255,0.5)" />
            <circle cx="16" cy="140" r="5" fill="rgba(255,255,255,0.45)" />
          </svg>
        </div>
      )}

      <div className="flex h-full flex-col lg:flex-row">
         {/* Left content */}
        <div className="flex-1 p-6 sm:p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Our Services
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg">
            Explore the services around the robot to see how we build, automate, and
            scale your digital products with real business impact.
          </p>
          <p className="mt-3 text-sm text-neutral-400">
            Click any service to know more.
          </p>
         </div>

        {/* Right content */}
        <div className="flex-1 relative min-h-[260px] sm:min-h-[320px] lg:min-h-0">
           <SplineScene
             scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
           />
          <div className="absolute right-10 top-24 hidden pointer-events-none lg:block">
            <div className="relative">
              <svg
                className="absolute -left-16 top-1/2 -translate-y-1/2 h-24 w-24"
                viewBox="0 0 96 96"
                fill="none"
              >
                <circle cx="90" cy="48" r="5" fill="rgba(59,130,246,0.95)" />
                <circle cx="76" cy="50" r="4.5" fill="rgba(255,255,255,0.7)" />
                <circle cx="64" cy="54" r="4" fill="rgba(255,255,255,0.65)" />
                <circle cx="50" cy="60" r="3.5" fill="rgba(255,255,255,0.6)" />
                <circle cx="36" cy="68" r="3" fill="rgba(255,255,255,0.55)" />
                <circle cx="22" cy="76" r="2.5" fill="rgba(255,255,255,0.5)" />
                <circle cx="8" cy="86" r="2" fill="rgba(255,255,255,0.45)" />
              </svg>
              <div className="relative rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold text-white shadow-[0_0_20px_rgba(255,255,255,0.08)] backdrop-blur-md">
                We tell what we do
                <span className="absolute -bottom-2 right-6 h-3 w-3 rotate-45 rounded-sm border border-white/15 bg-white/10 backdrop-blur-md" />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none">
            {serviceCards.map((service) => (
              <div
                key={service.title}
                className={`absolute ${service.position} pointer-events-auto`}
                onMouseLeave={hideHoverCard}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveService(service);
                    setActiveOrigin(getOrigin(service.position));
                  }}
                  onMouseEnter={() => showHoverCard(service.title)}
                  onMouseLeave={hideHoverCard}
                  className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_0_20px_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.18)] sm:px-4 sm:py-2 sm:text-xs"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                  {service.title}
                </button>
                <div
                  className={`absolute ${service.cardPosition} ${service.align} pointer-events-none w-64 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 ${
                    hoveredService === service.title
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-2 scale-[0.97]"
                  } ${
                    activeService?.title === service.title
                      ? "hidden lg:hidden"
                      : "hidden lg:block"
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                      ✓
                    </span>
                    {service.title}
                  </div>
                  <div className="mt-2 text-xs text-white/80">
                    {service.description}
                  </div>
                  <ul className="mt-3 space-y-1.5 text-[11px] text-white/70">
                    {service.points.slice(0, 5).map((point) => (
                      <li key={point} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-white/60" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
         </div>
       </div>
     </Card>
   )
 }

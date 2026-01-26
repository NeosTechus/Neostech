 'use client'

 import { SplineScene } from "@/components/ui/splite";
 import { Card } from "@/components/ui/card";

 export function SplineSceneBasic() {
  const serviceCards = [
    {
      title: "Website Development",
      description: "Modern, high-performance websites designed to convert and scale.",
      points: ["Responsive design", "SEO-ready builds", "Fast performance"],
      position: "top-6 left-6",
      cardPosition: "top-16 left-6",
      align: "items-start text-left",
    },
    {
      title: "AI Agents & Automation",
      description: "Automate workflows and support with smart, always-on AI.",
      points: ["Custom agents", "Workflow automation", "Chat & analytics"],
      position: "top-6 right-6",
      cardPosition: "top-16 right-6",
      align: "items-end text-right",
    },
    {
      title: "Custom Development",
      description: "Tailored software solutions built around your business needs.",
      points: ["Web apps", "APIs & integrations", "Product MVPs"],
      position: "bottom-6 left-6",
      cardPosition: "bottom-16 left-6",
      align: "items-start text-left",
    },
    {
      title: "Database Solutions",
      description: "Reliable data architecture that scales with your growth.",
      points: ["Schema design", "Optimization", "Security & backups"],
      position: "bottom-6 right-6",
      cardPosition: "bottom-16 right-6",
      align: "items-end text-right",
    },
  ];

   return (
    <Card className="w-full h-[500px] border-0 bg-transparent relative overflow-hidden">

       <div className="flex h-full">
         {/* Left content */}
         <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Our Services
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg">
            Explore the services around the robot to see how we build, automate, and
            scale your digital products with real business impact.
          </p>
         </div>

        {/* Right content */}
        <div className="flex-1 relative">
           <SplineScene
             scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
             className="w-full h-full"
           />
          <div className="absolute inset-0 pointer-events-none">
            {serviceCards.map((service) => (
              <div
                key={service.title}
                className={`absolute ${service.position} group pointer-events-auto`}
              >
                <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.18)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                  {service.title}
                </div>
                <div
                  className={`absolute ${service.cardPosition} ${service.align} pointer-events-none w-72 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 text-white opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-300 translate-y-2 scale-[0.97] group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100`}
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
                    {service.points.map((point) => (
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

import { Search, Plug, Rocket, HeartHandshake } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover Your Needs",
    description: "We begin by understanding your business goals, challenges, and vision to craft the perfect solution.",
  },
  {
    number: "02",
    icon: Plug,
    title: "Seamless Integration",
    description: "Our solutions integrate effortlessly into your existing workflows and systems with minimal disruption.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Accelerate Growth",
    description: "Leverage cutting-edge technology to boost efficiency, drive innovation, and scale your business.",
  },
  {
    number: "04",
    icon: HeartHandshake,
    title: "Continuous Support",
    description: "Benefit from ongoing support, updates, and optimization to ensure sustained success.",
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Simplify your{" "}
            <span className="text-gradient">digital transformation</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            No complex setup, no lengthy onboarding. Get started in days, not months.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-border to-transparent z-0" />
              )}

              {/* Step Card */}
              <div className="relative glass rounded-2xl p-6 h-full card-hover">
                {/* Number Badge */}
                <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-primary-foreground">{step.number}</span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

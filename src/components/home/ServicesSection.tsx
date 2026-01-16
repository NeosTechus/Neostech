import { Link } from "react-router-dom";
import { Globe, Bot, Layers, Zap, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Modern, responsive websites built with cutting-edge technologies. From landing pages to complex web applications.",
    features: ["React & Next.js", "Responsive Design", "SEO Optimized", "Fast Performance"],
    color: "primary",
  },
  {
    icon: Bot,
    title: "AI Agents",
    description: "Intelligent automation solutions powered by advanced AI. Streamline operations and enhance productivity.",
    features: ["Custom AI Models", "Process Automation", "24/7 Operations", "Smart Integration"],
    color: "accent",
  },
  {
    icon: Layers,
    title: "Custom Solutions",
    description: "Tailored digital solutions designed specifically for your unique business challenges and goals.",
    features: ["Bespoke Development", "API Integration", "Cloud Architecture", "Scalable Systems"],
    color: "primary",
  },
  {
    icon: Zap,
    title: "Digital Consulting",
    description: "Strategic guidance to navigate digital transformation and maximize your technology investments.",
    features: ["Tech Strategy", "Digital Roadmap", "Team Training", "Best Practices"],
    color: "accent",
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Everything you need to{" "}
            <span className="text-gradient">succeed online</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive digital solutions that drive growth and innovation for your business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative glass rounded-2xl p-8 card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-${service.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className={`w-7 h-7 text-${service.color}`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="grid grid-cols-2 gap-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all"
              >
                Learn more
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className={`absolute inset-0 rounded-2xl bg-${service.color}/5`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

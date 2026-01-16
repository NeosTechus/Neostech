import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Globe, Bot, Layers, Zap, Code, Database, 
  Cloud, Shield, ArrowRight, CheckCircle 
} from "lucide-react";

const mainServices = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Build stunning, high-performance websites that captivate your audience and drive conversions.",
    features: [
      "React, Next.js & modern frameworks",
      "Responsive & mobile-first design",
      "SEO optimization built-in",
      "Lightning-fast performance",
      "Accessibility compliance",
      "CMS integration",
    ],
    highlight: "Most Popular",
  },
  {
    icon: Bot,
    title: "AI Agents & Automation",
    description: "Deploy intelligent AI agents that work 24/7 to streamline your operations and boost productivity.",
    features: [
      "Custom AI model development",
      "Process automation workflows",
      "Natural language processing",
      "Intelligent chatbots",
      "Predictive analytics",
      "Seamless integrations",
    ],
    highlight: "High Impact",
  },
];

const additionalServices = [
  {
    icon: Code,
    title: "Custom Development",
    description: "Bespoke software solutions tailored to your unique business requirements.",
  },
  {
    icon: Database,
    title: "Database Solutions",
    description: "Scalable database architecture and optimization for enterprise applications.",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Robust cloud solutions on AWS, GCP, or Azure with optimal performance.",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Enterprise-grade security implementations and compliance consulting.",
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 relative">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Our Services
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Solutions that{" "}
              <span className="text-gradient">drive growth</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              From web development to AI automation, we provide comprehensive digital 
              solutions to transform your business.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {mainServices.map((service) => (
              <div key={service.title} className="glass rounded-2xl p-8 lg:p-10 relative overflow-hidden group card-hover">
                {/* Highlight Badge */}
                <div className="absolute top-6 right-6">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {service.highlight}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">{service.title}</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button variant="hero" asChild>
                  <Link to="/contact" className="group/btn">
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 lg:py-24 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Additional Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions to support every aspect of your digital presence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service) => (
              <div key={service.title} className="glass rounded-xl p-6 card-hover">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 lg:p-16 text-center glow-primary">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Contact us today to discuss your project and discover how we can help.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Schedule a Call
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

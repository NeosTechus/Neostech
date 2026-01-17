import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import CodeWindow from "@/components/ui/CodeWindow";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-end/10 rounded-full blur-3xl animate-float" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Trusted by innovative companies worldwide
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
              Empowering{" "}
              <span className="text-gradient">Digital</span>
              <br />
              Reinvention
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed animate-fade-in-delay-1">
              We transform businesses with cutting-edge web solutions and intelligent AI agents. 
              Build faster, smarter, and scale without limits.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-delay-2">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact" className="group">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/services">
                  <Play className="w-5 h-5" />
                  See How It Works
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Code Window */}
          <div className="hidden lg:block">
            <CodeWindow />
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-16 border-t border-border/50 animate-fade-in-delay-3">
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Powering digital transformation for leading brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {["TechCorp", "InnovateCo", "FutureStack", "DataFlow", "CloudNine"].map((company) => (
              <span key={company} className="text-lg font-semibold tracking-wider">
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

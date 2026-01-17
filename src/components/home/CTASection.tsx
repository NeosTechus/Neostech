import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import CodeWindow from "@/components/ui/CodeWindow";

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Code Window */}
          <div className="hidden lg:block order-1 opacity-0 animate-slide-in-right" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div className="hover:scale-[1.02] transition-transform duration-500">
              <CodeWindow />
            </div>
          </div>

          {/* Right Content - CTA */}
          <div className="text-center lg:text-left order-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8 animate-fade-in shimmer">
              <MessageCircle className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">
                Free consultation available
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              Ready to{" "}
              <span className="text-gradient">transform</span>
              {" "}your business?
            </h2>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Let's discuss how we can help your business grow online. 
              Our team is ready to bring your vision to life.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              <Button variant="hero" size="xl" asChild className="group hover:scale-105 transition-transform duration-300">
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild className="hover:scale-105 transition-transform duration-300">
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>

            {/* Trust Text */}
            <p className="mt-8 text-sm text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              No commitment required • Free initial consultation • Response within 24 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

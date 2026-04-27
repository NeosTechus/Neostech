import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Home, ArrowLeft } from "lucide-react";

const radialMask =
  "radial-gradient(ellipse 70% 60% at 50% 50%, #000 40%, transparent 80%)";

const NotFound = () => {
  return (
    <Layout>
      <SEO title="Not found" description="The page you're looking for doesn't exist." path="/404" />
      <section className="min-h-[70vh] flex items-center justify-center relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid opacity-30"
          style={{ maskImage: radialMask, WebkitMaskImage: radialMask }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 40% at 50% 50%, hsl(var(--primary) / 0.10), transparent 70%)",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="max-w-md mx-auto">
            <p className="font-mono text-xs tracking-[0.22em] text-muted-foreground/70 uppercase">
              Error 404
            </p>
            <h1 className="mt-4 font-serif-accent text-7xl sm:text-8xl text-primary leading-none">
              Lost.
            </h1>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight">
              That page doesn't exist.
            </h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              It may have moved, been renamed, or never existed in the first
              place.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/">
                  <Home className="mr-2 w-4 h-4" />
                  Go home
                </Link>
              </Button>
              <Button asChild variant="ghost" className="rounded-full border border-border hover:bg-secondary">
                <Link to="/contact">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Contact us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;

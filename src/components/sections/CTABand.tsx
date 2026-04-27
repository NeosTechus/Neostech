import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;

const maskImage =
  "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 80%)";

export function CTABand() {
  return (
    <section className="relative isolate border-b border-blue-900/60 py-24 lg:py-32 overflow-hidden bg-[hsl(222,47%,8%)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, hsl(var(--primary) / 0.35), transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.45, ease: EASE }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-white">
            Ready to ship the thing you've been talking about?
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.06 }}
            className="text-lg leading-relaxed text-blue-200/80 mt-6 max-w-2xl mx-auto"
          >
            30-minute call. No deck, no sales pitch — just a real conversation
            about what you're trying to build and whether we can help.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.12 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <Button
              asChild
              className="h-11 rounded-full bg-white text-slate-950 hover:bg-slate-100"
            >
              <Link to="/contact">
                <Calendar className="mr-2 h-4 w-4" />
                Book a 30-min call
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-11 rounded-full border border-blue-700/50 bg-transparent text-white hover:bg-blue-900/40 hover:text-white"
            >
              <Link to="/projects">
                See our work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

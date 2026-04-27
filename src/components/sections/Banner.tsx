import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Banner() {
  return (
    <section className="relative isolate overflow-hidden border-y border-border/60">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2400&q=80&auto=format&fit=crop"
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Tonal overlay — slate-navy with primary accent */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(2,6,35,0.92) 0%, rgba(2,6,35,0.78) 45%, rgba(2,6,35,0.55) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 80% 30%, hsl(var(--primary) / 0.22), transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="max-w-3xl"
        >
          <p className="text-xs tracking-[0.22em] text-white/60 uppercase">
            Built to a higher bar
          </p>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] sm:leading-[1.04] text-white">
            We design, build, and operate at the{" "}
            <span className="font-serif-accent text-primary">pace</span> of
            ambition.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/75 max-w-2xl">
            Senior teams. Production code. AI engineered into every layer of
            the stack. From discovery to operate, with one accountable team and
            no theater.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full bg-white text-slate-950 px-5 py-2.5 text-sm font-medium hover:bg-slate-100 transition-colors"
            >
              See capabilities
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 text-white px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              Book a call
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

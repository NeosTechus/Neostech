import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Bot, Calendar, Cpu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SLIDE_INTERVAL_MS = 3333;

const wordContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: "100%" },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const wordmarks = [
  "AI-NATIVE",
  "FULL-STACK",
  "PRODUCTION-GRADE",
  "ACCOUNTABLE",
  "ON-CALL",
];

const radialMask =
  "radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 80%)";

type Slide = { before: string; accent: string; after: string; subhead: string };

function AnimatedWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ").filter(Boolean);
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.18em] -mb-[0.18em]">
          <motion.span variants={word} className={"inline-block " + (className ?? "")}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  const slides = (t("hero.slides", { returnObjects: true }) as Slide[]) ?? [];
  const slideCount = slides.length || 1;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused || slideCount <= 1) return;
    const id = setInterval(
      () => setIndex((v) => (v + 1) % slideCount),
      SLIDE_INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, [reduce, paused, slideCount]);

  const current = slides[index] ?? { before: "", accent: "", after: "", subhead: "" };

  return (
    <section
      aria-label="Hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative isolate overflow-hidden border-b border-border/60"
    >
      {/* Procedural premium backdrop — layered gradient mesh + fine pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        {/* Base layered radial gradients (cool deep blue mesh) */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(60% 50% at 80% 15%, hsl(219 90% 56% / 0.18), transparent 70%),
              radial-gradient(45% 40% at 10% 85%, hsl(222 80% 38% / 0.14), transparent 70%),
              radial-gradient(50% 50% at 95% 95%, hsl(219 90% 56% / 0.10), transparent 70%),
              linear-gradient(180deg, hsl(220 36% 99%) 0%, hsl(220 36% 98%) 100%)
            `,
          }}
        />
        {/* Subtle dot pattern for texture */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, hsl(220 30% 70% / 0.5) 1px, transparent 0)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 80%)",
          }}
        />
        {/* Soft top fade to keep navbar clean */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--background) / 0.6) 0%, transparent 12%)",
          }}
        />
      </div>
      <BreathingBlob />
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
            "radial-gradient(60% 40% at 50% 0%, hsl(var(--primary) / 0.10), transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-20 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: rotating headline + subhead */}
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {t("hero.eyebrow")}
              </span>
            </motion.div>

            <div className="relative mt-6 min-h-[12rem] sm:min-h-[11rem] md:min-h-[13rem] lg:min-h-[15rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.h1
                  key={`headline-${index}`}
                  variants={reduce ? undefined : wordContainer}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, transition: { duration: 0.25, ease: EASE } }}
                  className="font-semibold tracking-tight leading-[1.05] sm:leading-[1.02] lg:leading-[0.98] text-foreground text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl absolute top-0 left-0 right-0"
                >
                  <AnimatedWords text={current.before.trim()} />
                  {current.before.endsWith(" ") ? " " : ""}
                  <span className="inline-block overflow-hidden align-bottom pb-[0.18em] -mb-[0.18em]">
                    <motion.span
                      variants={word}
                      className="font-serif-accent text-primary inline-block"
                    >
                      {current.accent}
                    </motion.span>
                  </span>
                  {current.after.startsWith(" ") ? " " : ""}
                  <AnimatedWords text={current.after.trim()} />
                </motion.h1>
              </AnimatePresence>
            </div>

            <div className="relative mt-5 min-h-[4rem] sm:min-h-[3.5rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={`subhead-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.05 }}
                  className="text-lg leading-relaxed text-muted-foreground max-w-xl"
                >
                  {current.subhead}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Slide indicators */}
            <div className="mt-6 flex items-center gap-2">
              {slides.map((_, i) => {
                const active = i === index;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Slide ${i + 1}`}
                    aria-current={active}
                    onClick={() => setIndex(i)}
                    className="group/ind relative h-1.5 rounded-full overflow-hidden transition-all duration-500"
                    style={{ width: active ? 36 : 16 }}
                  >
                    <span className="absolute inset-0 bg-border" />
                    {active && !reduce && !paused && (
                      <motion.span
                        key={`bar-${i}-${index}`}
                        className="absolute inset-0 bg-primary origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: SLIDE_INTERVAL_MS / 1000, ease: "linear" }}
                      />
                    )}
                    {active && (reduce || paused) && (
                      <span className="absolute inset-0 bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="group/btn relative rounded-full bg-primary text-primary-foreground transition-shadow duration-300 hover:bg-primary/90 hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.55)]"
              >
                <Link to="/contact">
                  <Calendar className="mr-2 h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" />
                  {t("hero.ctaPrimary")}
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="group/ghost rounded-full border border-border hover:bg-secondary"
              >
                <Link to="/projects">
                  {t("hero.ctaGhost")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/ghost:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Trust strip */}
            <div className="mt-14">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
                {t("hero.trust")}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
                {wordmarks.map((w) => (
                  <span
                    key={w}
                    className="text-xs tracking-[0.2em] text-muted-foreground/60"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: capability card with parallax */}
          <div className="lg:col-span-5">
            <ParallaxCard reduce={!!reduce} />
          </div>
        </div>
      </div>
    </section>
  );
}

function BreathingBlob() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -right-32 top-32 h-[480px] w-[480px] rounded-full"
      style={{
        background:
          "radial-gradient(closest-side, hsl(var(--primary) / 0.18), transparent 70%)",
      }}
      animate={{
        x: [0, 30, -10, 0],
        y: [0, -20, 10, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function ParallaxCard({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const x = useSpring(mvX, { stiffness: 120, damping: 20, mass: 0.4 });
  const y = useSpring(mvY, { stiffness: 120, damping: 20, mass: 0.4 });
  const rotateX = useTransform(y, [-30, 30], [4, -4]);
  const rotateY = useTransform(x, [-30, 30], [-4, 4]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mvX.set(((e.clientX - cx) / rect.width) * 30);
    mvY.set(((e.clientY - cy) / rect.height) * 30);
  };

  const onLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        reduce
          ? undefined
          : { x, y, rotateX, rotateY, transformPerspective: 1000 }
      }
      initial={reduce ? undefined : { opacity: 0, y: 12 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
      className="relative will-change-transform"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--primary) / 0.18), transparent 70%)",
        }}
      />
      <div className="relative bg-slate-950 border border-slate-800 rounded-2xl shadow-[0_30px_80px_-20px_rgba(15,23,42,0.35)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="leading-tight">
            <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
              Solutions
            </div>
            <div className="mt-1 text-sm font-medium text-slate-100">
              Any problem, solved.
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className={
                  "absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 " +
                  (reduce ? "" : "animate-ping")
                }
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            shipping
          </span>
        </div>

        {/* Solution rows */}
        <div className="divide-y divide-slate-800">
          <SolutionRow
            icon={Bot}
            tag="AI Solutions"
            title="AI agents that handle real work — voice, chat, and automation that ships to production."
            chips={["Voice", "Chat", "RAG", "Automation"]}
          />
          <SolutionRow
            icon={Cpu}
            tag="Custom Software"
            title="Platforms, apps, and internal tools your business actually runs on."
            chips={["Web", "Mobile", "Platforms", "APIs"]}
          />
          <SolutionRow
            icon={Sparkles}
            tag="AI + Software"
            title="The product and the intelligence, engineered together — not bolted on."
            chips={["AI-native", "Integrations", "Evals"]}
            highlighted
          />
        </div>

        {/* Stats footer */}
        <div className="grid grid-cols-3 border-t border-slate-800">
          {[
            { label: "industries", value: "12" },
            { label: "engineers", value: "40+" },
            { label: "retention", value: "98%" },
          ].map((s, i) => (
            <div
              key={s.label}
              className={
                "px-4 py-4 " + (i < 2 ? "border-r border-slate-800" : "")
              }
            >
              <div className="text-[10px] uppercase tracking-wider text-slate-500">
                {s.label}
              </div>
              <div className="mt-1 font-mono text-sm text-slate-100">
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SolutionRow({
  icon: Icon,
  tag,
  title,
  chips,
  highlighted = false,
}: {
  icon: typeof Bot;
  tag: string;
  title: string;
  chips: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={
        "px-5 py-4 " +
        (highlighted ? "bg-primary/[0.08]" : "")
      }
    >
      <div className="flex items-center gap-3">
        <div
          className={
            "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 " +
            (highlighted
              ? "bg-primary/20 border border-primary/40"
              : "bg-slate-900 border border-slate-700")
          }
        >
          <Icon
            className={
              "h-3.5 w-3.5 " + (highlighted ? "text-primary" : "text-slate-300")
            }
            strokeWidth={1.75}
          />
        </div>
        <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
          {tag}
        </span>
      </div>
      <p className="mt-3 text-[13px] leading-snug text-slate-100">{title}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <span
            key={c}
            className={
              "text-[10px] px-2 py-0.5 rounded-full border " +
              (highlighted
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-slate-900 border-slate-700 text-slate-300")
            }
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

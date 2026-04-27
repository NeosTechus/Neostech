import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, MapPin, Phone, Send, Clock, CheckCircle2, Linkedin } from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const radialMask =
  "radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 80%)";

type ServiceArea =
  | "software-engineering"
  | "ai-ml"
  | "data-analytics"
  | "cloud-devops"
  | "security"
  | "strategy-advisory"
  | "not-sure";

type BudgetRange =
  | "under-25k"
  | "25k-75k"
  | "75k-200k"
  | "200k-plus"
  | "not-sure";

type ContactFormValues = {
  fullName: string;
  email: string;
  company: string;
  service: ServiceArea | "";
  budget: BudgetRange | "";
  message: string;
};

const serviceOptions: { value: ServiceArea; label: string }[] = [
  { value: "software-engineering", label: "Software Engineering" },
  { value: "ai-ml", label: "AI & ML" },
  { value: "data-analytics", label: "Data & Analytics" },
  { value: "cloud-devops", label: "Cloud & DevOps" },
  { value: "security", label: "Security" },
  { value: "strategy-advisory", label: "Strategy & Advisory" },
  { value: "not-sure", label: "Not sure yet" },
];

const budgetOptions: { value: BudgetRange; label: string }[] = [
  { value: "under-25k", label: "<$25k" },
  { value: "25k-75k", label: "$25–75k" },
  { value: "75k-200k", label: "$75–200k" },
  { value: "200k-plus", label: "$200k+" },
  { value: "not-sure", label: "Not sure" },
];

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: "info@neostechus.com",
    href: "mailto:info@neostechus.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (314) 978-2326",
    href: "tel:+13149782326",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/company/neostechs",
    href: "https://www.linkedin.com/company/neostechs",
  },
];

export default function Contact() {
  const reduce = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      service: "",
      budget: "",
      message: "",
    },
  });

  const serviceValue = watch("service");
  const budgetValue = watch("budget");

  const onSubmit = (values: ContactFormValues) => {
    console.log("contact submission", values);
    setSubmitted(true);
    reset();
  };

  return (
    <Layout>
      <SEO
        title="Contact"
        description="Get in touch with NeosTechs — book a 30-minute call about software, AI, data, and cloud engagements."
        path="/contact"
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid opacity-40"
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

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-36 pb-12">
          <motion.div
            initial="hidden"
            animate="show"
            variants={reduce ? undefined : stagger}
            className="max-w-3xl"
          >
            <motion.div variants={reduce ? undefined : fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Get in touch
              </span>
            </motion.div>

            <motion.h1
              variants={reduce ? undefined : fadeUp}
              className="mt-6 font-semibold tracking-tight leading-[1.05] text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Let's actually{" "}
              <span className="font-serif-accent text-primary">talk</span>.
            </motion.h1>

            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl"
            >
              30-minute call. No deck, no sales pitch — just a real conversation
              about what you're trying to build.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="border-t border-border/60 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Form */}
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="lg:col-span-7"
            >
              <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 sm:p-8">
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-secondary">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Got it. We'll be in touch.
                    </h2>
                    <p className="mt-3 text-muted-foreground max-w-sm mx-auto leading-relaxed">
                      Thanks for reaching out — we respond within one business
                      day.
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setSubmitted(false)}
                      className="mt-6 rounded-full border border-border hover:bg-secondary"
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Tell us about your project
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        The more context, the better the first call.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                      noValidate
                    >
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full name</Label>
                          <Input
                            id="fullName"
                            placeholder="Jane Doe"
                            aria-invalid={!!errors.fullName}
                            {...register("fullName", {
                              required: "Name is required",
                            })}
                          />
                          {errors.fullName && (
                            <p className="text-xs text-destructive">
                              {errors.fullName.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="jane@company.com"
                            aria-invalid={!!errors.email}
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email",
                              },
                            })}
                          />
                          {errors.email && (
                            <p className="text-xs text-destructive">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">
                          Company{" "}
                          <span className="text-muted-foreground font-normal">
                            (optional)
                          </span>
                        </Label>
                        <Input
                          id="company"
                          placeholder="Acme Inc."
                          {...register("company")}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="service">Service area</Label>
                          <Select
                            value={serviceValue || undefined}
                            onValueChange={(v) =>
                              setValue("service", v as ServiceArea, {
                                shouldValidate: true,
                              })
                            }
                          >
                            <SelectTrigger id="service">
                              <SelectValue placeholder="Select an area" />
                            </SelectTrigger>
                            <SelectContent>
                              {serviceOptions.map((o) => (
                                <SelectItem key={o.value} value={o.value}>
                                  {o.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="budget">Budget</Label>
                          <Select
                            value={budgetValue || undefined}
                            onValueChange={(v) =>
                              setValue("budget", v as BudgetRange, {
                                shouldValidate: true,
                              })
                            }
                          >
                            <SelectTrigger id="budget">
                              <SelectValue placeholder="Select a range" />
                            </SelectTrigger>
                            <SelectContent>
                              {budgetOptions.map((o) => (
                                <SelectItem key={o.value} value={o.value}>
                                  {o.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          rows={6}
                          placeholder="What are you trying to build, and what does success look like?"
                          aria-invalid={!!errors.message}
                          className="resize-none"
                          {...register("message", {
                            required: "A short message helps us prepare",
                            maxLength: {
                              value: 2000,
                              message: "Keep it under 2000 characters",
                            },
                          })}
                        />
                        {errors.message && (
                          <p className="text-xs text-destructive">
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="group/btn w-full sm:w-auto rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.55)] transition-shadow"
                        >
                          {isSubmitting ? "Sending…" : "Send message"}
                          <Send className="ml-2 h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" />
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          We respond within one business day.
                        </p>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              className="lg:col-span-5 space-y-5"
            >
              {contactCards.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="group block rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 transition-colors hover:border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-secondary">
                      <c.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
                        {c.label}
                      </div>
                      <div className="mt-1 text-base font-medium text-foreground group-hover:text-primary transition-colors">
                        {c.value}
                      </div>
                    </div>
                  </div>
                </a>
              ))}

              <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-secondary">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
                      Office
                    </div>
                    <div className="mt-1 text-base font-medium text-foreground">
                      Saint Louis, Missouri
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      Working remote-first across US / EU / APAC.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-secondary">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
                      Office hours
                    </div>
                    <div className="mt-1 text-base font-medium text-foreground">
                      Mon–Fri · 9am–6pm CT
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      Async-friendly outside those hours.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing band */}
      <section className="border-t border-border/60 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground/70">
            Prefer email?
          </p>
          <a
            href="mailto:info@neostechus.com"
            className="arrow-link mt-4 inline-block text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
          >
            info@neostechus.com <span className="arrow">→</span>
          </a>
        </div>
      </section>
    </Layout>
  );
}

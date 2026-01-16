import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small businesses and startups",
    price: { monthly: 2999, yearly: 2499 },
    features: [
      { name: "Custom website (up to 5 pages)", included: true },
      { name: "Responsive design", included: true },
      { name: "Basic SEO optimization", included: true },
      { name: "Contact form integration", included: true },
      { name: "1 month support", included: true },
      { name: "AI agent integration", included: false },
      { name: "Custom dashboard", included: false },
      { name: "Priority support", included: false },
    ],
  },
  {
    name: "Professional",
    description: "For growing businesses with advanced needs",
    price: { monthly: 7999, yearly: 6666 },
    popular: true,
    features: [
      { name: "Custom website (up to 15 pages)", included: true },
      { name: "Responsive design", included: true },
      { name: "Advanced SEO optimization", included: true },
      { name: "Contact form + CRM integration", included: true },
      { name: "3 months support", included: true },
      { name: "1 AI agent integration", included: true },
      { name: "Basic analytics dashboard", included: true },
      { name: "Priority support", included: false },
    ],
  },
  {
    name: "Enterprise",
    description: "Full-scale solutions for large organizations",
    price: { monthly: null, yearly: null },
    features: [
      { name: "Unlimited pages & features", included: true },
      { name: "Responsive design", included: true },
      { name: "Enterprise SEO strategy", included: true },
      { name: "Full system integrations", included: true },
      { name: "12 months dedicated support", included: true },
      { name: "Multiple AI agents", included: true },
      { name: "Custom analytics & reporting", included: true },
      { name: "24/7 Priority support", included: true },
    ],
  },
];

const faqs = [
  {
    question: "What's included in the pricing?",
    answer: "All plans include design, development, testing, and deployment. The price covers the initial project scope outlined during our consultation.",
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes, we offer flexible payment plans. Typically 50% upfront and 50% upon completion, or monthly installments for larger projects.",
  },
  {
    question: "What happens after the support period ends?",
    answer: "You can extend support with our maintenance packages, or we provide documentation for your team to maintain the solution.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Absolutely! You can upgrade at any time. We'll pro-rate the difference and seamlessly transition your project.",
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 relative">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Transparent Pricing
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Simple,{" "}
              <span className="text-gradient">fair pricing</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Choose the plan that fits your needs. All plans include our premium quality 
              and dedicated support.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-2 rounded-full glass">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !isYearly ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isYearly ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Yearly
                <span className="ml-2 text-xs text-accent">Save 17%</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative glass rounded-2xl p-8 ${
                  plan.popular ? "ring-2 ring-primary glow-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  {plan.price.monthly ? (
                    <>
                      <span className="text-4xl font-bold">
                        ${isYearly ? plan.price.yearly : plan.price.monthly}
                      </span>
                      <span className="text-muted-foreground">/project</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold">Custom Quote</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-center gap-3 text-sm">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-primary shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/50 shrink-0" />
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground/50"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "hero" : "heroOutline"}
                  className="w-full"
                  asChild
                >
                  <Link to="/contact">
                    {plan.price.monthly ? "Get Started" : "Contact Sales"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Frequently asked questions
              </h2>
              <p className="text-muted-foreground">
                Got questions? We've got answers.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="glass rounded-xl p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 lg:p-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Need a custom solution?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              We offer tailored packages for unique requirements. Let's discuss your project.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Get Custom Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

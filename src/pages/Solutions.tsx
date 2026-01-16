import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Building2, ShoppingCart, Stethoscope, GraduationCap, 
  Factory, Briefcase, ArrowRight, CheckCircle, Users 
} from "lucide-react";

const industries = [
  {
    icon: Building2,
    title: "Enterprise",
    description: "Scalable solutions for large organizations with complex requirements.",
    solutions: ["Custom ERP systems", "Workflow automation", "Data analytics dashboards"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Complete online retail solutions that drive sales and customer loyalty.",
    solutions: ["Custom storefronts", "Inventory management", "Payment integration"],
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    description: "HIPAA-compliant solutions for modern healthcare providers.",
    solutions: ["Patient portals", "Telemedicine platforms", "Records management"],
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Innovative learning platforms and educational technology.",
    solutions: ["LMS development", "Virtual classrooms", "Student analytics"],
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Industry 4.0 solutions for smart manufacturing operations.",
    solutions: ["IoT integration", "Production monitoring", "Supply chain optimization"],
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    description: "Digital tools for consulting, legal, and financial firms.",
    solutions: ["Client portals", "Document management", "Billing automation"],
  },
];

const caseStudies = [
  {
    company: "TechFlow Solutions",
    industry: "Enterprise",
    result: "40% increase in operational efficiency",
    description: "Implemented custom workflow automation reducing manual processes.",
  },
  {
    company: "MediCare Plus",
    industry: "Healthcare",
    result: "60% reduction in admin time",
    description: "Developed patient portal with automated appointment scheduling.",
  },
  {
    company: "EduLearn Academy",
    industry: "Education",
    result: "3x student engagement",
    description: "Built interactive LMS with AI-powered personalization.",
  },
];

export default function Solutions() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 relative">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
              Industry Solutions
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Tailored for{" "}
              <span className="text-gradient">your industry</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              We understand that every industry has unique challenges. 
              Our solutions are customized to meet your specific needs.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <div key={industry.title} className="glass rounded-2xl p-6 lg:p-8 card-hover group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <industry.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="text-xl font-semibold mb-3">{industry.title}</h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  {industry.description}
                </p>

                <ul className="space-y-2">
                  {industry.solutions.map((solution) => (
                    <li key={solution} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 lg:py-24 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Success Stories
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Real results for real businesses
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how we've helped companies like yours achieve their goals.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <div key={study.company} className="glass rounded-xl p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{study.company}</h4>
                    <span className="text-xs text-muted-foreground">{study.industry}</span>
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-gradient mb-2">
                  {study.result}
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {study.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 lg:p-16 text-center glow-accent">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Don't see your industry?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              We work with businesses across all sectors. Let's discuss your unique needs.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Talk to an Expert
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

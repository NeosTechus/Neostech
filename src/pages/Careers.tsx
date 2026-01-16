import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, MapPin, Clock, Briefcase, 
  Heart, Zap, Globe, Coffee 
} from "lucide-react";

const openings = [
  {
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build scalable web applications using React, Node.js, and cloud technologies.",
  },
  {
    title: "AI/ML Engineer",
    department: "AI Research",
    location: "Remote",
    type: "Full-time",
    description: "Develop and deploy intelligent AI agents and machine learning models.",
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Create beautiful, user-centric designs for web and mobile applications.",
  },
  {
    title: "Project Manager",
    department: "Operations",
    location: "Remote",
    type: "Full-time",
    description: "Lead cross-functional teams to deliver exceptional projects on time.",
  },
];

const benefits = [
  {
    icon: Globe,
    title: "Remote First",
    description: "Work from anywhere in the world with flexible hours.",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health coverage and wellness programs.",
  },
  {
    icon: Zap,
    title: "Learning Budget",
    description: "Annual budget for courses, conferences, and certifications.",
  },
  {
    icon: Coffee,
    title: "Team Events",
    description: "Regular virtual and in-person team gatherings.",
  },
];

export default function Careers() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 relative">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
              Join Our Team
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Build the future{" "}
              <span className="text-gradient">with us</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              We're looking for passionate individuals who want to make an impact. 
              Join us in transforming how businesses embrace digital technology.
            </p>
            <Button variant="hero" size="xl" asChild>
              <a href="#openings">
                View Open Positions
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Why Join Us
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Benefits & Perks
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe in taking care of our team so they can do their best work.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="glass rounded-xl p-6 text-center card-hover">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-16 lg:py-24 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
              Open Positions
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Current Openings
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find your next opportunity and grow with us.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {openings.map((job) => (
              <div key={job.title} className="glass rounded-xl p-6 card-hover group">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {job.department}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Button variant="hero" asChild className="shrink-0">
                    <Link to="/contact">
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
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
              Don't see a perfect fit?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

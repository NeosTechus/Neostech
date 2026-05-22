import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const footerLinks = {
  company: [
    { name: "About", path: "/about" },
    { name: "Team", path: "/team" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ],
  capabilities: [
    { name: "Strategy & Advisory", path: "/services#strategy" },
    { name: "Software Engineering", path: "/services#engineering" },
    { name: "AI & Machine Learning", path: "/services#ai-ml" },
    { name: "Data & Analytics", path: "/services#data" },
    { name: "Cloud & DevOps", path: "/services#cloud" },
    { name: "Security & Compliance", path: "/services#security" },
  ],
  resources: [
    { name: "Selected Work", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Insights", path: "/#outlook" },
    { name: "FAQ", path: "/#faq" },
  ],
  blog: [
    { name: "What Is RAG?", path: "/blog/what-is-retrieval-augmented-generation" },
    {
      name: "RAG in Production",
      path: "/blog/rag-in-production-architecture-and-retrieval",
    },
    {
      name: "RAG vs Fine-Tuning",
      path: "/blog/rag-vs-fine-tuning-vs-long-context",
    },
  ],
  legal: [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Brand Guidelines", path: "/brand" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-[hsl(220,40%,96%)] section-blue-backdrop-strong">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer */}
        <div className="py-12 lg:py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <img
                src={logo}
                alt="NeosTechs"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-semibold tracking-tight text-foreground">
                NeosTechs
              </span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-xs font-medium text-primary">We Make You Online</span>
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              Empowering businesses with cutting-edge digital solutions.
              Transform your ideas into reality with our expert team.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:info@neostechus.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@neostechus.com
              </a>
              <a
                href="tel:+13149782326"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                +1 (314) 978-2326
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Saint Louis, Missouri
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Capabilities</h4>
            <ul className="space-y-3">
              {footerLinks.capabilities.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold text-sm mt-6 mb-4">From the blog</h4>
            <ul className="space-y-3">
              {footerLinks.blog.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} NeosTechs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

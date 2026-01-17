import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone, Sparkles } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", path: "/about" },
    { name: "Team", path: "/team" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ],
  services: [
    { name: "Website Development", path: "/services" },
    { name: "AI Agents", path: "/services" },
    { name: "Custom Software", path: "/services" },
    { name: "Consulting", path: "/services" },
  ],
  resources: [
    { name: "Documentation", path: "#" },
    { name: "Case Studies", path: "#" },
    { name: "API Reference", path: "#" },
    { name: "Support", path: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", path: "#" },
    { name: "Terms of Service", path: "#" },
    { name: "Cookie Policy", path: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/50">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer */}
        <div className="py-12 lg:py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
                <span className="text-primary-foreground font-bold text-xl">N</span>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Neos <span className="text-gradient">Tech</span>
              </span>
            </Link>
            
            {/* We Make You Online Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-medium text-primary">We Make You Online</span>
              <Sparkles className="w-3 h-3 text-primary" />
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

          {/* Company Links */}
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

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
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

          {/* Resources Links */}
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
          </div>

          {/* Legal Links */}
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
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Neos Tech. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
            <Link to="/login" className="hover:text-foreground transition-colors">
              Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

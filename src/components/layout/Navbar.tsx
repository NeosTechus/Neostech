import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  Search,
  Globe,
  Calendar,
  CircleUser,
  Brain,
  Cloud,
  Code2,
  Compass,
  Database,
  ShieldCheck,
  Utensils,
  ShoppingBag,
  Stethoscope,
  Banknote,
  Cpu,
  Building2,
  FileText,
  CornerDownLeft,
  type LucideIcon,
} from "lucide-react";
import { Check } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import logo from "@/assets/logo.png";

type DropdownItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

const capabilities: DropdownItem[] = [
  {
    icon: Compass,
    title: "Strategy & Advisory",
    description: "Discovery, scoping, architecture roadmaps.",
    href: "/services#strategy",
  },
  {
    icon: Code2,
    title: "Software Engineering",
    description: "Web, mobile, and platform builds.",
    href: "/services#engineering",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Agents, RAG, and applied ML in production.",
    href: "/services#ai-ml",
  },
  {
    icon: Database,
    title: "Data & Analytics",
    description: "Pipelines, warehouses, dashboards.",
    href: "/services#data",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Infra, CI/CD, observability.",
    href: "/services#cloud",
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    description: "SOC2, HIPAA, threat modeling.",
    href: "/services#security",
  },
];

const industries: DropdownItem[] = [
  {
    icon: Utensils,
    title: "Restaurants & Hospitality",
    description: "Brand sites, ordering, POS, reservations.",
    href: "/projects?industry=restaurants",
  },
  {
    icon: ShoppingBag,
    title: "Retail & E-commerce",
    description: "Storefronts, catalog, bilingual checkout.",
    href: "/projects?industry=retail",
  },
  {
    icon: Stethoscope,
    title: "Healthcare & Wellness",
    description: "HIPAA-aware patient flows, intake.",
    href: "/contact?industry=healthcare",
  },
  {
    icon: Banknote,
    title: "Financial Services",
    description: "Internal tools, reconciliation, portals.",
    href: "/contact?industry=finance",
  },
  {
    icon: Cpu,
    title: "Technology & SaaS",
    description: "Platforms, AI, developer tooling.",
    href: "/contact?industry=technology",
  },
  {
    icon: Building2,
    title: "Public Sector & Civic",
    description: "Accessible, multilingual web.",
    href: "/contact?industry=public",
  },
];

type SearchEntry = {
  title: string;
  description: string;
  path: string;
  group: string;
  icon: LucideIcon;
  keywords: string;
};

const pageEntries: SearchEntry[] = [
  { title: "Home", description: "Marketing-site overview.", path: "/", group: "Page", icon: Compass, keywords: "home landing main" },
  { title: "Services", description: "What we build and how we work.", path: "/services", group: "Page", icon: Code2, keywords: "services capabilities offerings" },
  { title: "Projects", description: "Selected work, live in production.", path: "/projects", group: "Page", icon: ShoppingBag, keywords: "projects work portfolio case studies demos" },
  { title: "Blog", description: "Notes on RAG, AI, and emerging tech.", path: "/blog", group: "Page", icon: FileText, keywords: "blog articles writing insights" },
  { title: "About", description: "Who we are and what we believe.", path: "/about", group: "Page", icon: Building2, keywords: "about company story mission" },
  { title: "Team", description: "The people behind NeosTechs.", path: "/team", group: "Page", icon: CircleUser, keywords: "team people staff" },
  { title: "Careers", description: "Open roles and how we hire.", path: "/careers", group: "Page", icon: Building2, keywords: "careers jobs hiring roles" },
  { title: "Contact", description: "Start a conversation with us.", path: "/contact", group: "Page", icon: Calendar, keywords: "contact email talk book call quote" },
  { title: "Privacy Policy", description: "How we handle your data.", path: "/privacy", group: "Legal", icon: ShieldCheck, keywords: "privacy policy data gdpr" },
  { title: "Terms of Service", description: "The terms that govern the site.", path: "/terms", group: "Legal", icon: ShieldCheck, keywords: "terms service legal showcase" },
  { title: "Brand Guidelines", description: "Logo, color, and voice.", path: "/brand", group: "Legal", icon: Compass, keywords: "brand guidelines logo design" },
];

type Language = { code: string; label: string; flag: string };

const languages: Language[] = [
  { code: "en", label: "USA", flag: "🇺🇸" },
  { code: "en-IN", label: "India", flag: "🇮🇳" },
  { code: "en-ZA", label: "South Africa", flag: "🇿🇦" },
  { code: "es", label: "Mexico", flag: "🇲🇽" },
  { code: "pt", label: "Brazil", flag: "🇧🇷" },
];

const flatLinks = [
  { key: "work", path: "/projects" },
  { key: "about", path: "/about" },
  { key: "careers", path: "/careers" },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const searchToggleRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Build a searchable index of everything navigable on the site.
  const searchIndex = useMemo<SearchEntry[]>(() => {
    const capEntries: SearchEntry[] = capabilities.map((c) => ({
      title: c.title,
      description: c.description,
      path: c.href,
      group: "Service",
      icon: c.icon,
      keywords: `${c.title} ${c.description} service capability`,
    }));
    const indEntries: SearchEntry[] = industries.map((c) => ({
      title: c.title,
      description: c.description,
      path: c.href,
      group: "Industry",
      icon: c.icon,
      keywords: `${c.title} ${c.description} industry`,
    }));
    const postEntries: SearchEntry[] = blogPosts.map((p) => ({
      title: p.title,
      description: p.excerpt,
      path: `/blog/${p.slug}`,
      group: "Article",
      icon: FileText,
      keywords: `${p.title} ${p.excerpt} ${p.category} article blog`,
    }));
    return [...pageEntries, ...capEntries, ...indEntries, ...postEntries];
  }, []);

  const query = searchValue.trim().toLowerCase();
  const results = useMemo(() => {
    if (!query) return [];
    const terms = query.split(/\s+/);
    return searchIndex
      .map((entry) => {
        const haystack = `${entry.title} ${entry.keywords}`.toLowerCase();
        const titleLc = entry.title.toLowerCase();
        let score = 0;
        for (const term of terms) {
          if (!haystack.includes(term)) return null;
          if (titleLc.startsWith(term)) score += 3;
          else if (titleLc.includes(term)) score += 2;
          else score += 1;
        }
        return { entry, score };
      })
      .filter((r): r is { entry: SearchEntry; score: number } => r !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.entry);
  }, [query, searchIndex]);

  const goTo = (path: string) => {
    setSearchOpen(false);
    setSearchValue("");
    navigate(path);
  };

  // Reset highlighted result whenever the query changes.
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lang =
    languages.find((l) => l.code === i18n.resolvedLanguage) ?? languages[0];
  const setLang = (next: Language) => {
    i18n.changeLanguage(next.code);
  };

  useEffect(() => {
    if (!searchOpen) return;
    setTimeout(() => searchInputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (searchPanelRef.current?.contains(target)) return;
      if (searchToggleRef.current?.contains(target)) return;
      setSearchOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [searchOpen]);

  useEffect(() => {
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav
      className={
        "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl transition-colors " +
        (scrolled ? "border-b border-border/70" : "border-b border-transparent")
      }
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-6">
          {/* Logo — wordmark slides in on hover (Accenture-style); always visible on touch */}
          <Link
            to="/"
            aria-label="NeosTechs home"
            className="group/logo flex items-center shrink-0 overflow-hidden"
          >
            <img
              src={logo}
              alt=""
              className="h-9 w-auto transition-transform duration-300 ease-out group-hover/logo:scale-[1.04]"
              width={36}
              height={36}
            />
            <span
              className={
                "ml-2 whitespace-nowrap text-base font-semibold tracking-tight text-foreground " +
                "transition-all duration-300 ease-out " +
                // Hover-capable (desktop): hide by default, reveal on hover
                "[@media(hover:hover)]:ml-0 [@media(hover:hover)]:max-w-0 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:-translate-x-2 " +
                "group-hover/logo:ml-2 group-hover/logo:max-w-[14rem] group-hover/logo:opacity-100 group-hover/logo:translate-x-0 " +
                "group-focus-visible/logo:ml-2 group-focus-visible/logo:max-w-[14rem] group-focus-visible/logo:opacity-100 group-focus-visible/logo:translate-x-0"
              }
            >
              NeosTechs
            </span>
          </Link>

          {/* Center nav (desktop) */}
          <div className="hidden lg:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-muted-foreground hover:text-foreground data-[state=open]:text-foreground">
                    {t("nav.capabilities")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <DropdownGrid items={capabilities} ctaHref="/services" ctaLabel={t("nav.viewAllCapabilities")} />
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-muted-foreground hover:text-foreground data-[state=open]:text-foreground">
                    {t("nav.industries")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <DropdownGrid items={industries} ctaHref="/projects" ctaLabel={t("nav.seeSelectedWork")} />
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {flatLinks.map((link) => {
                  const isActive = location.pathname.startsWith(link.path);
                  return (
                    <NavigationMenuItem key={link.path}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.path}
                          className={
                            "inline-flex items-center px-4 py-2 text-sm font-medium transition-colors " +
                            (isActive
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground")
                          }
                        >
                          {t(`nav.${link.key}`)}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right utilities (desktop) */}
          <div className="hidden lg:flex items-center gap-1 shrink-0">
            <button
              ref={searchToggleRef}
              type="button"
              aria-label={t("nav.search")}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((v) => !v)}
              className={
                "p-2 rounded-full transition-colors " +
                (searchOpen
                  ? "text-foreground bg-secondary border border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent")
              }
            >
              {searchOpen ? (
                <X className="h-4 w-4" strokeWidth={1.75} />
              ) : (
                <Search className="h-4 w-4" strokeWidth={1.75} />
              )}
            </button>
            <HoverCard openDelay={80} closeDelay={120}>
              <HoverCardTrigger asChild>
                <button
                  type="button"
                  aria-label={t("nav.language")}
                  className="inline-flex items-center gap-1.5 px-2 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors data-[state=open]:text-foreground"
                >
                  <Globe className="h-4 w-4" strokeWidth={1.75} />
                  <span>{lang.label}</span>
                </button>
              </HoverCardTrigger>
              <HoverCardContent
                align="end"
                sideOffset={12}
                className="w-[460px] p-4 rounded-xl border border-border/70 shadow-xl"
              >
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {languages.map((l) => {
                    const active = l.code === lang.code;
                    return (
                      <li key={l.code}>
                        <button
                          type="button"
                          onClick={() => setLang(l)}
                          className={
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-secondary " +
                            (active ? "text-primary font-medium" : "text-foreground")
                          }
                        >
                          <span className="text-base leading-none w-5 text-center" aria-hidden>
                            {l.flag}
                          </span>
                          <span className="flex-1 truncate">{l.label}</span>
                          {active && (
                            <Check className="h-4 w-4 text-primary shrink-0" strokeWidth={2.5} />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </HoverCardContent>
            </HoverCard>
            <Button
              asChild
              size="sm"
              className="ml-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/contact" className="inline-flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" />
                {t("nav.bookCall")}
              </Link>
            </Button>
            <Link
              to="/login"
              aria-label="Sign in"
              className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
            >
              <CircleUser className="h-5 w-5" strokeWidth={1.5} />
            </Link>
          </div>

          {/* Mobile right cluster */}
          <div className="lg:hidden flex items-center gap-1">
            <Link
              to="/login"
              aria-label="Sign in"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
            >
              <CircleUser className="h-5 w-5" strokeWidth={1.5} />
            </Link>
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search panel */}
      <AnimatePresence initial={false}>
      {searchOpen && (
        <motion.div
          ref={searchPanelRef}
          key="search-panel"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            height: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.22, ease: "easeOut" },
          }}
          className="border-t border-border/60 bg-background/95 backdrop-blur-xl overflow-hidden"
        >
          <motion.div
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const target = results[activeIndex] ?? results[0];
                if (target) goTo(target.path);
              }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-shadow focus-within:shadow-lg focus-within:border-primary"
            >
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={1.75} />
              <input
                ref={searchInputRef}
                type="text"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="search-results"
                aria-activedescendant={
                  results.length ? `search-result-${activeIndex}` : undefined
                }
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (!results.length) return;
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActiveIndex((i) => (i + 1) % results.length);
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActiveIndex((i) => (i - 1 + results.length) % results.length);
                  }
                }}
                placeholder="Search pages, services, industries, articles…"
                className="flex-1 bg-transparent text-base lg:text-lg text-foreground placeholder:text-muted-foreground outline-none"
                aria-label={t("nav.search")}
                autoComplete="off"
              />
            </form>

            {query ? (
              results.length > 0 ? (
                <ul
                  id="search-results"
                  role="listbox"
                  className="mt-3 max-h-[60vh] overflow-y-auto rounded-xl border border-border/60 bg-card divide-y divide-border/50"
                >
                  {results.map((r, idx) => {
                    const Icon = r.icon;
                    const active = idx === activeIndex;
                    return (
                      <li key={`${r.path}-${idx}`} role="option" aria-selected={active}>
                        <button
                          id={`search-result-${idx}`}
                          type="button"
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={() => goTo(r.path)}
                          className={
                            "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors " +
                            (active ? "bg-primary/10" : "hover:bg-secondary/60")
                          }
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                            <Icon className="h-4 w-4" strokeWidth={1.75} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className="truncate text-sm font-medium text-foreground">
                                {r.title}
                              </span>
                              <span className="shrink-0 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
                                {r.group}
                              </span>
                            </span>
                            <span className="block truncate text-xs text-muted-foreground">
                              {r.description}
                            </span>
                          </span>
                          {active && (
                            <CornerDownLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="mt-4 px-1 text-sm text-muted-foreground">
                  No matches for “{searchValue}”. Try a page, service, industry,
                  or article name.
                </p>
              )
            ) : (
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="uppercase tracking-[0.18em]">Try</span>
                {[
                  "AI agents",
                  "RAG",
                  "Projects",
                  "Cloud & DevOps",
                  "Contact",
                ].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => {
                      setSearchValue(q);
                      searchInputRef.current?.focus();
                    }}
                    className="px-2.5 py-1 rounded-full border border-border/60 bg-secondary hover:bg-background hover:border-border transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Mobile menu */}
      {isOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 top-16 bg-background/60 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={menuRef}
            id="mobile-menu"
            className="lg:hidden relative z-50 bg-background border-t border-border"
            role="menu"
          >
            <div className="container mx-auto px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <MobileSection title={t("nav.capabilities")} items={capabilities} onClick={() => setIsOpen(false)} />
              <MobileSection title={t("nav.industries")} items={industries} onClick={() => setIsOpen(false)} />
              <div className="pt-2 border-t border-border/60 space-y-1">
                {flatLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                ))}
              </div>
              <div className="pt-3">
                <Button
                  asChild
                  className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    <Calendar className="mr-2 h-4 w-4" />
                    {t("nav.bookCall")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

function DropdownGrid({
  items,
  ctaHref,
  ctaLabel,
}: {
  items: DropdownItem[];
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="w-[640px] p-2">
      <ul className="grid grid-cols-2 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.title}>
              <NavigationMenuLink asChild>
                <Link
                  to={item.href}
                  className="group/item flex gap-3 rounded-lg p-3 transition-colors hover:bg-secondary focus:bg-secondary outline-none"
                >
                  <div className="h-9 w-9 rounded-lg bg-secondary border border-border/60 flex items-center justify-center shrink-0 group-hover/item:bg-background">
                    <Icon className="h-4 w-4 text-primary" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-foreground tracking-tight">
                      {item.title}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </NavigationMenuLink>
            </li>
          );
        })}
      </ul>
      <div className="mt-1 border-t border-border/60 px-3 py-3">
        <NavigationMenuLink asChild>
          <Link
            to={ctaHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            {ctaLabel}
            <span aria-hidden>→</span>
          </Link>
        </NavigationMenuLink>
      </div>
    </div>
  );
}

function MobileSection({
  title,
  items,
  onClick,
}: {
  title: string;
  items: DropdownItem[];
  onClick: () => void;
}) {
  return (
    <details className="group rounded-lg border border-transparent hover:border-border/60">
      <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none text-sm font-medium text-foreground">
        {title}
        <span className="text-muted-foreground transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>
      <ul className="pb-2 px-2 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.title}>
              <Link
                to={item.href}
                onClick={onClick}
                className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors"
              >
                <Icon className="h-4 w-4 text-primary mt-0.5 shrink-0" strokeWidth={1.75} />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-foreground">{item.title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </details>
  );
}

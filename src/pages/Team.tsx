import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/button";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const DEFAULT_TEAM_IMAGE = "/defualt.jpg";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  objectPosition?: string;
  social: {
    linkedin: string;
    twitter: string;
    email: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Harsha Kolla",
    role: "Founder | Software Engineer",
    bio: "Founder and software engineer focused on building scalable, user-first products.",
    image: "/harshakolla.jpeg",
    objectPosition: "object-top",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "harshakolla@neostechus.com",
    },
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    bio: "Expert in AI/ML and cloud architecture with a passion for scalable solutions.",
    image: DEFAULT_TEAM_IMAGE,
    social: {
      linkedin: "#",
      twitter: "#",
      email: "sarah@neostechus.com",
    },
  },
  {
    name: "Fazil Khan",
    role: "Full Stack Developer",
    bio: "Fazil is a versatile full stack developer with 4+ years of experience, skilled in both frontend and backend technologies.",
    image: "/Fazilkhan.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "fazil@neostechus.com",
    },
  },
  {
    name: "Nagaraju",
    role: "Software Developer",
    bio: "Nagaraju is a software developer with 15+ years of experience who has worked at OpenText, contributing to enterprise software solutions.",
    image: DEFAULT_TEAM_IMAGE,
    social: {
      linkedin: "#",
      twitter: "#",
      email: "nagaraju@neostechus.com",
    },
  },
  {
    name: "Uday Bhanu",
    role: "Data Engineer",
    bio: "Uday Bhanu is a seasoned data engineer with 15+ years of experience, specializing in data architecture, ETL pipelines, and big data solutions for enterprise clients.",
    image: "/udaybhanu.png",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "uday@neostechus.com",
    },
  },
  {
    name: "Omkar Naidu",
    role: "Machine Learning Engineer",
    bio: "Omkar Naidu is a machine learning engineer with 15+ years of experience. He has worked as a project manager at Target.",
    image: "/omkar.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "omkar@neostechus.com",
    },
  },
];

const radialMask =
  "radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 80%)";

export default function Team() {
  const reduce = useReducedMotion();

  return (
    <Layout>
      <SEO
        title="Team"
        description="The people behind NeosTechs — engineers, designers, and AI practitioners shipping software, data, and cloud systems."
        path="/team"
      />

      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid opacity-40"
          style={{ maskImage: radialMask, WebkitMaskImage: radialMask }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-36 pb-12">
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              The team
            </span>
            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-foreground">
              The people who{" "}
              <span className="font-serif-accent text-primary">ship</span> the
              work.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl mt-6">
              A small, senior group of engineers, designers, and AI
              practitioners building software, data, and cloud systems for
              ambitious teams.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-border/60 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={reduce ? undefined : { opacity: 0, y: 12 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.45,
                  ease: EASE,
                  delay: i * 0.07,
                }}
              >
                <SpotlightCard className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden h-full transition-colors hover:border-border">
                  <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`absolute inset-0 h-full w-full object-cover ${member.objectPosition || ""}`}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary mt-1">{member.role}</p>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="mt-5 flex gap-2 border-t border-border/60 pt-4">
                      <a
                        href={member.social.linkedin}
                        aria-label={`${member.name} on LinkedIn`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href={member.social.twitter}
                        aria-label={`${member.name} on Twitter`}
                        className="ml-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                      <a
                        href={`mailto:${member.social.email}`}
                        aria-label={`Email ${member.name}`}
                        className="ml-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Want to build with us?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              We're hiring engineers, designers, and AI practitioners.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link to="/careers">See open roles</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="rounded-full border border-border hover:bg-secondary"
              >
                <Link to="/contact">Get in touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

import { Layout } from "@/components/layout/Layout";
import { Linkedin, Twitter, Mail } from "lucide-react";

const DEFAULT_TEAM_IMAGE = "/defualt.jpg";

const teamMembers = [
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

export default function Team() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 relative">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Our Team
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Meet the <span className="text-gradient">experts</span> behind Neos Techs
            </h1>
            <p className="text-lg text-muted-foreground">
              A passionate team of innovators, developers, and designers dedicated to 
              transforming your digital vision into reality.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member) => (
              <div 
                key={member.name} 
                className="glass rounded-2xl p-6 group hover:border-primary/30 transition-all duration-300"
              >
                <div className="relative mb-6">
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className={`w-full h-full object-cover ${member.objectPosition ?? ""} group-hover:scale-105 transition-transform duration-500`}
                    />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                
                <div className="flex items-center gap-3">
                  <a 
                    href={member.social.linkedin} 
                    className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a 
                    href={member.social.twitter} 
                    className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a 
                    href={`mailto:${member.social.email}`} 
                    className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Want to join our team?
            </h2>
            <p className="text-muted-foreground mb-8">
              We're always looking for talented individuals who share our passion for innovation.
            </p>
            <a 
              href="/careers" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

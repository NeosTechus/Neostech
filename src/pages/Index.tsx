import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <SEO
        title="Neos Techs | Web Development, AI Agents & Digital Solutions"
        description="Neos Techs delivers full-stack web solutions, AI agents, custom software, and digital consulting to transform your business."
        path="/"
      />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <StatsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;

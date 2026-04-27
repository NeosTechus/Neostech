import { Layout } from "@/components/layout/Layout";
import { SEO, organizationJsonLd } from "@/components/SEO";
import { Hero } from "@/components/sections/Hero";
import { LogoCloud } from "@/components/sections/LogoCloud";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { Banner } from "@/components/sections/Banner";
import { Process } from "@/components/sections/Process";
import { Metrics } from "@/components/sections/Metrics";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Insights } from "@/components/sections/Insights";
import { FAQ } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";

const Index = () => {
  return (
    <Layout>
      <SEO
        title="Neos Techs | Engineered outcomes for ambitious teams"
        description="NeosTechs is an AI-native IT services and engineering firm building production software, data, AI, and cloud systems for ambitious teams."
        path="/"
        keywords={[
          "AI engineering",
          "AI agents",
          "custom software",
          "IT services",
          "data engineering",
          "cloud DevOps",
          "Saint Louis",
          "production AI",
        ]}
        jsonLd={organizationJsonLd()}
      />
      <div id="hero" className="scroll-mt-20 lg:scroll-mt-24"><Hero /></div>
      <LogoCloud />
      <div id="capabilities" className="scroll-mt-20 lg:scroll-mt-24"><Services /></div>
      <div id="industries" className="scroll-mt-20 lg:scroll-mt-24"><Industries /></div>
      <Banner />
      <div id="process" className="scroll-mt-20 lg:scroll-mt-24"><Process /></div>
      <div id="outcomes" className="scroll-mt-20 lg:scroll-mt-24"><Metrics /></div>
      <div id="work" className="scroll-mt-20 lg:scroll-mt-24"><CaseStudies /></div>
      <div id="outlook" className="scroll-mt-20 lg:scroll-mt-24"><Insights /></div>
      <div id="faq" className="scroll-mt-20 lg:scroll-mt-24"><FAQ /></div>
      <CTABand />
    </Layout>
  );
};

export default Index;

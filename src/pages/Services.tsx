import { Layout } from "@/components/layout/Layout";
import { SplineSceneBasic } from "@/components/ui/demo";
import { Spotlight } from "@/components/ui/spotlight";

export default function Services() {
  return (
    <Layout>
      {/* Services Robot Section */}
      <section className="pt-24 pb-24 lg:pt-32 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SplineSceneBasic />
        </div>
      </section>
    </Layout>
  );
}

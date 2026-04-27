import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";

export default function TermsOfService() {
  return (
    <Layout>
      <SEO
        title="Terms of Service"
        description="The terms that govern your use of the NeosTechs website and services."
        path="/terms"
      />

      <section className="border-b border-border/60 pt-28 lg:pt-36 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <p className="text-xs tracking-[0.22em] text-muted-foreground/70 uppercase">
            Legal
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            Terms of{" "}
            <span className="font-serif-accent text-primary">service</span>.
          </h1>
          <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            These terms govern your use of NeosTechs's website and services.
            Engagement-specific terms are defined in your individual contract.
          </p>
          <p className="mt-6 text-sm text-muted-foreground/80">
            Last updated: April 27, 2026
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <article className="prose prose-slate max-w-none text-foreground">
            <h2 className="text-2xl font-semibold tracking-tight mt-0">
              1. Acceptance
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using neostechus.com you agree to these terms. If
              you don't agree, please don't use the site.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight mt-10">
              2. Use of the site
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The site is provided for informational purposes about NeosTechs's
              services. You agree not to attempt to disrupt, scrape at scale, or
              reverse-engineer the site.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight mt-10">
              3. Engagements & contracts
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Any work we deliver is governed by a separate, signed engagement
              contract. The website itself does not create a contractual
              relationship.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight mt-10">
              4. Intellectual property
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this site — copy, graphics, code — is owned by
              NeosTechs unless otherwise noted. Client logos and case-study
              materials remain the property of those clients.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight mt-10">
              5. Disclaimers & limitations
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The site is provided "as is" without warranties of any kind. To
              the extent permitted by law, NeosTechs is not liable for indirect
              or consequential damages arising from use of the site.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight mt-10">
              6. Governing law
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms are governed by the laws of the State of Missouri,
              United States, without regard to its conflict-of-laws rules.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight mt-10">
              7. Changes
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these terms periodically. Material changes will be
              flagged on this page. Continued use of the site after changes
              constitutes acceptance.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight mt-10">
              8. Contact
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Questions about these terms? Email{" "}
              <a
                href="mailto:info@neostechus.com"
                className="text-primary hover:underline"
              >
                info@neostechus.com
              </a>
              .
            </p>
          </article>
        </div>
      </section>
    </Layout>
  );
}

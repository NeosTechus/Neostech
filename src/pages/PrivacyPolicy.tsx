import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <SEO
        title="Privacy Policy"
        description="How NeosTechs collects, uses, and protects your information."
        path="/privacy"
      />

      <section className="border-b border-border/60 pt-28 lg:pt-36 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <p className="text-xs tracking-[0.22em] text-muted-foreground/70 uppercase">
            Legal
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            Privacy{" "}
            <span className="font-serif-accent text-primary">policy</span>.
          </h1>
          <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            This policy explains what data we collect, how we use it, and the
            controls you have. We aim for plain language over legalese.
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
              1. What we collect
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              When you contact us through the website, we collect the
              information you provide — name, email, company, project details.
              We also collect basic analytics about how the site is used (page
              views, referrers, device type) so we can improve it.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight mt-10">
              2. How we use it
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We use your information to respond to inquiries, deliver work
              you've engaged us for, and operate the site. We do not sell your
              data, ever.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight mt-10">
              3. Cookies & analytics
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We use a small number of cookies for site functionality and
              privacy-respecting analytics. You can control cookie preferences
              through the consent banner shown on first visit.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight mt-10">
              4. Sharing & third parties
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We share data only with vendors required to operate our service
              (e.g. email delivery, hosting). These vendors are bound by
              contractual confidentiality.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight mt-10">
              5. Your rights
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You can request access to, correction of, or deletion of your
              data at any time. Email us at{" "}
              <a
                href="mailto:info@neostechus.com"
                className="text-primary hover:underline"
              >
                info@neostechus.com
              </a>{" "}
              and we'll respond within five business days.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight mt-10">
              6. Contact
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Questions about this policy? Reach us at{" "}
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

import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
  keywords?: string[];
  jsonLd?: Record<string, unknown>;
}

const SITE = "https://neostechus.com";
const DEFAULT_IMAGE = `${SITE}/logo.png`;
const SITE_NAME = "Neos Techs";
const TWITTER_HANDLE = "@NeosTechs";
const SUPPORTED_LANGS = ["en", "es", "pt"] as const;

export function SEO({
  title,
  description,
  path = "",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  keywords,
  jsonLd,
}: SEOProps) {
  const url = `${SITE}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords?.length ? <meta name="keywords" content={keywords.join(", ")} /> : null}
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow,max-image-preview:large,max-snippet:-1"} />
      <link rel="canonical" href={url} />

      {/* hreflang for i18n */}
      {SUPPORTED_LANGS.map((lng) => (
        <link
          key={lng}
          rel="alternate"
          hrefLang={lng}
          href={`${url}${url.includes("?") ? "&" : "?"}lng=${lng}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={`${SITE_NAME} — ${title}`} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${SITE_NAME} — ${title}`} />

      {/* JSON-LD structured data (per-page) */}
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}

/* --------------------------- helpers --------------------------- */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE,
    logo: `${SITE}/logo.png`,
    sameAs: ["https://www.linkedin.com/company/neostechs"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Saint Louis",
      addressRegion: "MO",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-314-978-2326",
      email: "info@neostechus.com",
      contactType: "customer service",
      areaServed: ["US", "Latin America", "EU"],
      availableLanguage: ["English", "Spanish", "Portuguese"],
    },
  };
}

export function webPageJsonLd({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${SITE}${path}`,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE,
    },
  };
}

export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE}${c.path}`,
    })),
  };
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  area?: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? "IT Services",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE,
    },
    areaServed: opts.area ?? "Worldwide",
  };
}

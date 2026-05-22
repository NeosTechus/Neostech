import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Lightbulb,
  AlertTriangle,
  Info,
  Quote as QuoteIcon,
  CheckCircle2,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { getPostBySlug, blogPosts, type BlogBlock } from "@/data/blogPosts";

const calloutStyles = {
  insight: {
    icon: Lightbulb,
    wrap: "border-primary/30 bg-primary/5",
    iconColor: "text-primary",
  },
  warning: {
    icon: AlertTriangle,
    wrap: "border-amber-500/30 bg-amber-500/5",
    iconColor: "text-amber-600",
  },
  info: {
    icon: Info,
    wrap: "border-border bg-secondary/50",
    iconColor: "text-muted-foreground",
  },
} as const;

function ContentBlock({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4 first:mt-0">
          {block.text}
        </h2>
      );

    case "lead":
      return (
        <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed mb-6 font-light">
          {block.text}
        </p>
      );

    case "ul":
      return (
        <ul className="my-5 space-y-2.5 text-muted-foreground leading-relaxed">
          {block.items.map((item, j) => (
            <li key={j} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <figure className="my-10 relative rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 to-transparent p-6 sm:p-8">
          <QuoteIcon className="h-7 w-7 text-primary/40" />
          <blockquote className="mt-3 text-lg sm:text-xl font-medium leading-relaxed tracking-tight text-foreground">
            {block.text}
          </blockquote>
          {block.cite && (
            <figcaption className="mt-4 text-sm text-muted-foreground">
              — {block.cite}
            </figcaption>
          )}
        </figure>
      );

    case "callout": {
      const s = calloutStyles[block.variant];
      const Icon = s.icon;
      return (
        <div className={`my-8 rounded-2xl border p-5 sm:p-6 ${s.wrap}`}>
          <div className="flex items-start gap-3">
            <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${s.iconColor}`} />
            <div>
              {block.title && (
                <p className="font-semibold tracking-tight text-foreground">
                  {block.title}
                </p>
              )}
              <p className="mt-1 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {block.text}
              </p>
            </div>
          </div>
        </div>
      );
    }

    case "stats":
      return (
        <div className="my-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {block.items.map((stat, j) => (
            <div
              key={j}
              className="rounded-2xl border border-border/60 bg-card/60 p-5"
            >
              <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
                {stat.value}
              </div>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      );

    case "steps":
      return (
        <ol className="my-8 space-y-4">
          {block.items.map((step, j) => (
            <li
              key={j}
              className="flex gap-4 rounded-2xl border border-border/60 bg-card/40 p-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                {j + 1}
              </span>
              <div>
                <p className="font-semibold tracking-tight text-foreground">
                  {step.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      );

    case "table":
      return (
        <div className="my-8 overflow-x-auto rounded-2xl border border-border/60">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60">
              <tr>
                {block.headers.map((h, j) => (
                  <th
                    key={j}
                    className="px-4 py-3 font-semibold tracking-tight text-foreground whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-border/60">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={
                        "px-4 py-3 align-top leading-relaxed " +
                        (ci === 0
                          ? "font-medium text-foreground"
                          : "text-muted-foreground")
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "takeaways":
      return (
        <div className="my-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Key takeaways
          </p>
          <ul className="mt-4 space-y-3">
            {block.items.map((item, j) => (
              <li key={j} className="flex gap-3 text-foreground/90 leading-relaxed">
                <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    default:
      return (
        <p className="text-muted-foreground leading-relaxed mb-5">
          {block.text}
        </p>
      );
  }
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <Layout>
        <SEO title="Article not found" path="/blog" />
        <section className="pt-36 pb-24 section-blue-backdrop-strong">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              Article not found
            </h1>
            <p className="mt-4 text-muted-foreground">
              This post may have moved or been renamed.
            </p>
            <Link
              to="/blog"
              className="mt-8 inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> Back to the blog
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
      />

      <article>
        <section className="border-b border-border/60 pt-28 lg:pt-36 pb-12 section-blue-backdrop-strong">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
            <div className="mt-6 flex items-center gap-2">
              <span className="text-[10px] tracking-[0.18em] text-muted-foreground bg-secondary border border-border/60 px-2 py-1 rounded-full uppercase">
                {post.category}
              </span>
              <span className="text-[11px] text-muted-foreground/70">
                {post.readingTime}
              </span>
              <span className="text-[11px] text-muted-foreground/70 font-mono">
                · {formatDate(post.date)}
              </span>
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.08]">
              {post.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24 section-blue-backdrop">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="text-foreground">
              {post.content.map((block, i) => (
                <ContentBlock key={i} block={block} />
              ))}
            </div>

            {related.length > 0 && (
              <div className="mt-16 pt-10 border-t border-border/60">
                <h3 className="text-sm font-semibold tracking-tight uppercase tracking-[0.18em] text-muted-foreground/80">
                  Keep reading
                </h3>
                <div className="mt-5 grid sm:grid-cols-2 gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      to={`/blog/${r.slug}`}
                      className="group block rounded-xl border border-border/60 bg-card/60 p-5 transition-colors hover:border-border"
                    >
                      <h4 className="text-sm font-semibold tracking-tight leading-snug group-hover:text-primary transition-colors">
                        {r.title}
                      </h4>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                        {r.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </article>
    </Layout>
  );
}

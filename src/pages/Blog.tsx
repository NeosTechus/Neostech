import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { blogPosts } from "@/data/blogPosts";

const categories = ["All", "RAG", "AI Engineering", "Emerging Tech"];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function Blog() {
  const [active, setActive] = useState("All");

  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <Layout>
      <SEO
        title="Blog"
        description="Field notes from the NeosTechs team on Retrieval-Augmented Generation (RAG), AI engineering, and building dependable AI products."
        path="/blog"
      />

      <section className="relative isolate overflow-hidden border-b border-border/60 pt-32 lg:pt-40 pb-16 section-blue-backdrop-strong">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid opacity-30"
          style={{
            maskImage:
              "radial-gradient(ellipse 70% 50% at 50% 0%, #000 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 50% at 50% 0%, #000 30%, transparent 80%)",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.22em] text-muted-foreground/70 uppercase">
              Writing
            </p>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
              The{" "}
              <span className="font-serif-accent text-primary">blog</span>.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl">
              Practical notes on Retrieval-Augmented Generation, AI engineering,
              and shipping AI features that stay grounded in real data.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 py-12 lg:py-16 section-blue-backdrop">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={
                  "px-4 py-2 rounded-full text-sm font-medium border transition-colors " +
                  (active === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:bg-secondary hover:text-foreground")
                }
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="group block">
                <SpotlightCard className="h-full rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 transition-colors group-hover:border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-[0.18em] text-muted-foreground bg-secondary border border-border/60 px-2 py-1 rounded-full uppercase">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-muted-foreground/70">
                      {post.readingTime}
                    </span>
                  </div>
                  <h2 className="mt-4 text-base font-semibold tracking-tight text-foreground leading-snug">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground/70 font-mono">
                      {formatDate(post.date)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                      Read
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </SpotlightCard>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

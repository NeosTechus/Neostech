import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { getPostBySlug, blogPosts } from "@/data/blogPosts";

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
              {post.content.map((block, i) => {
                if (block.type === "h2") {
                  return (
                    <h2
                      key={i}
                      className="text-2xl font-semibold tracking-tight mt-10 mb-4 first:mt-0"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "ul") {
                  return (
                    <ul
                      key={i}
                      className="my-4 space-y-2 list-disc pl-5 text-muted-foreground leading-relaxed"
                    >
                      {block.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-muted-foreground leading-relaxed mb-5"
                  >
                    {block.text}
                  </p>
                );
              })}
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

import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import logo from "@/assets/logo.png";

const palette = [
  { name: "Background", value: "#FAFBFC", token: "--background", hsl: "220 36% 98.5%" },
  { name: "Foreground", value: "#0F172A", token: "--foreground", hsl: "222 47% 11%" },
  { name: "Primary", value: "#2D6BF1", token: "--primary", hsl: "219 90% 56%" },
  { name: "Accent", value: "#173FB0", token: "--accent", hsl: "222 80% 38%" },
  { name: "Secondary", value: "#EEF4FF", token: "--secondary", hsl: "215 100% 97%" },
  { name: "Border", value: "#E0E5EC", token: "--border", hsl: "220 15% 90%" },
];

export default function BrandGuidelines() {
  return (
    <Layout>
      <SEO
        title="Brand Guidelines"
        description="The NeosTechs visual identity — logo, color, typography, and tone."
        path="/brand"
      />

      <section className="border-b border-border/60 pt-28 lg:pt-36 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <p className="text-xs tracking-[0.22em] text-muted-foreground/70 uppercase">
            Brand
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            Brand{" "}
            <span className="font-serif-accent text-primary">guidelines</span>.
          </h1>
          <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            How NeosTechs looks, sounds, and reads. Use this as a reference
            when producing communications, decks, or partner materials.
          </p>
        </div>
      </section>

      {/* Logo */}
      <section className="border-b border-border/60 py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-xs tracking-[0.22em] text-muted-foreground/70 uppercase">
            Logo
          </h2>
          <h3 className="mt-3 text-2xl lg:text-3xl font-semibold tracking-tight">
            One logo. Used cleanly.
          </h3>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border/60 bg-card p-10 flex items-center justify-center min-h-[200px]">
              <img src={logo} alt="NeosTechs logo" className="h-16 w-auto" />
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-10 flex items-center justify-center min-h-[200px]">
              <img src={logo} alt="NeosTechs logo on dark" className="h-16 w-auto" />
            </div>
          </div>
          <ul className="mt-8 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li className="flex gap-3">
              <span className="text-primary mt-2 inline-block h-px w-3 shrink-0" />
              Clear-space: at least the height of the mark on every side.
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-2 inline-block h-px w-3 shrink-0" />
              Minimum size: 24px on screen, 8mm in print.
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-2 inline-block h-px w-3 shrink-0" />
              Don't recolor, distort, rotate, or apply effects to the mark.
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-2 inline-block h-px w-3 shrink-0" />
              Pair with the wordmark "NeosTechs" — single word, capitalized N and T.
            </li>
          </ul>
        </div>
      </section>

      {/* Color */}
      <section className="border-b border-border/60 py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-xs tracking-[0.22em] text-muted-foreground/70 uppercase">
            Color
          </h2>
          <h3 className="mt-3 text-2xl lg:text-3xl font-semibold tracking-tight">
            Blue and white. One accent.
          </h3>
          <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
            We do not use multi-color gradients or secondary accent palettes.
            One brand blue, used decisively, on a cool-tinted white surface.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {palette.map((c) => (
              <div
                key={c.name}
                className="rounded-xl border border-border/60 overflow-hidden"
              >
                <div
                  className="h-20"
                  style={{ background: `hsl(${c.hsl})` }}
                />
                <div className="p-3 bg-card">
                  <div className="text-sm font-medium text-foreground">
                    {c.name}
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                    {c.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="border-b border-border/60 py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-xs tracking-[0.22em] text-muted-foreground/70 uppercase">
            Typography
          </h2>
          <h3 className="mt-3 text-2xl lg:text-3xl font-semibold tracking-tight">
            Inter for everything. Instrument Serif for accent.
          </h3>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                UI · Body
              </div>
              <div className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
                Inter
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                300 – 900 weights. Used for everything from interface labels to
                editorial headlines. Tight tracking on headings, relaxed
                line-height on body.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Accent
              </div>
              <div className="mt-4 text-4xl font-serif-accent text-primary">
                Instrument Serif
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Italic, single-word emphasis only. Reserved for one accent
                phrase per headline. Never set body copy in serif.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Voice */}
      <section className="border-b border-border/60 py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-xs tracking-[0.22em] text-muted-foreground/70 uppercase">
            Voice
          </h2>
          <h3 className="mt-3 text-2xl lg:text-3xl font-semibold tracking-tight">
            Confident. Clear. Specific.
          </h3>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-primary">
                Do
              </div>
              <ul className="mt-3 space-y-2 text-sm text-foreground">
                <li>"Production AI, shipped in weeks not quarters."</li>
                <li>"Engineered outcomes for ambitious teams."</li>
                <li>"We design, build, and operate."</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Don't
              </div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>"Empowering businesses with cutting-edge solutions."</li>
                <li>"Synergies for digital transformation."</li>
                <li>"World-class, best-in-class, leading."</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

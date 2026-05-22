import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import prerender from "@prerenderer/rollup-plugin";

const PRERENDER_ROUTES = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/team",
  "/careers",
  "/contact",
  "/blog",
  "/blog/what-is-retrieval-augmented-generation",
  "/blog/rag-in-production-architecture-and-retrieval",
  "/blog/rag-vs-fine-tuning-vs-long-context",
  "/blog/quantum-computing-what-it-means-for-software-teams",
  "/blog/embodied-ai-when-models-get-a-body",
  "/blog/state-of-agentic-ai-2026",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "production" && process.env.ENABLE_PRERENDER === "1" &&
      prerender({
        routes: PRERENDER_ROUTES,
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          maxConcurrentRoutes: 2,
          renderAfterTime: 2500,
        },
        postProcess(renderedRoute: { html: string; route: string }) {
          // Strip dev-only artifacts; keep meta + DOM
          renderedRoute.html = renderedRoute.html.replace(
            /<script (.*?)>(.*?)<\/script>/gis,
            (match, attrs) => (attrs.includes('type="module"') ? match : match)
          );
          return renderedRoute;
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

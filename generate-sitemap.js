
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APP_URL = 'https://neostechus.com';
const SOURCE_FILE = path.join(__dirname, 'src', 'App.tsx');
const OUTPUT_FILE = path.join(__dirname, 'public', 'sitemap.xml');

const EXCLUDED_ROUTES = [
  '*',
  '/login',
  '/forgot-password',
  '/reset-password',
];

const EXCLUDED_PREFIXES = [
  '/admin',
  '/employee'
];

async function generateSitemap() {
  try {
    const appContent = fs.readFileSync(SOURCE_FILE, 'utf-8');
    const routeRegex = /<Route[^>]+path="([^"]+)"/g;
    
    let match;
    const routes = new Set();
    
    // Always include root
    routes.add('/'); 

    while ((match = routeRegex.exec(appContent)) !== null) {
      const routePath = match[1];
      
      // Filter exclusions
      if (!routePath.startsWith('/')) continue;
      if (EXCLUDED_ROUTES.includes(routePath)) continue;
      if (EXCLUDED_PREFIXES.some(prefix => routePath.startsWith(prefix))) continue;
      
      routes.add(routePath);
    }

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(routes).map(route => {
  const url = route === '/' ? APP_URL + '/' : APP_URL + route;
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

    fs.writeFileSync(OUTPUT_FILE, sitemapContent);
    console.log(`✅ Sitemap generated at ${OUTPUT_FILE} with ${routes.size} routes.`);
    console.log('Routes included:', Array.from(routes));

  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();

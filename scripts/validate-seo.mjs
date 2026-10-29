import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const BASE_DOMAIN = 'https://alex.runs-on.dev';

const REQUIRED_ROUTES = [
  { path: '/', file: 'index.html', titleContains: 'Raman Kumar Sharma' },
  { path: '/about', file: 'about/index.html', titleContains: 'About Raman Kumar Sharma' },
  { path: '/projects', file: 'projects/index.html', titleContains: 'Projects & Engineered Systems' },
  { path: '/certifications', file: 'certifications/index.html', titleContains: 'Verified Certifications' },
  { path: '/certificate', file: 'certificate/index.html', titleContains: 'Verified Credentials' },
  { path: '/contact', file: 'contact/index.html', titleContains: 'Contact Raman Kumar Sharma' },
  { path: '/certificate/spec-mcp-agent-env', file: 'certificate/spec-mcp-agent-env/index.html', titleContains: 'Tooling, MCP' },
  { path: '/certificate/spec-agent-sdlc', file: 'certificate/spec-agent-sdlc/index.html', titleContains: 'Designing Agent Architecture' },
  { path: '/certificate/spec-agentic-github', file: 'certificate/spec-agentic-github/index.html', titleContains: 'Foundations of Agentic AI in GitHub' },
  { path: '/certificate/spec-flutter', file: 'certificate/spec-flutter/index.html', titleContains: 'Flutter' },
  { path: '/certificate/spec-java', file: 'certificate/spec-java/index.html', titleContains: 'Java' },
  { path: '/certificate/spec-powerbi', file: 'certificate/spec-powerbi/index.html', titleContains: 'Power BI' },
  { path: '/certificate/spec-genai-agents', file: 'certificate/spec-genai-agents/index.html', titleContains: 'Introduction to Generative AI' },
  { path: '/certificate/spec-ai-concepts', file: 'certificate/spec-ai-concepts/index.html', titleContains: 'Introduction to AI Concepts' },
  { path: '/certificate/spec-ml-concepts', file: 'certificate/spec-ml-concepts/index.html', titleContains: 'Introduction to Machine Learning Concepts' },
  { path: '/certificate/spec-csharp-exceptions', file: 'certificate/spec-csharp-exceptions/index.html', titleContains: 'Create and Throw Exceptions in C#' },
  { path: '/certificate/spec-python', file: 'certificate/spec-python/index.html', titleContains: 'Python' }
];

let failed = 0;
let passed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ❌ FAIL: ${message}`);
  }
}

console.log('🔍 Executing Comprehensive Technical SEO Validation Suite...\n');

// 1. Verify CNAME and 404.html
console.log('--- 1. GitHub Pages Custom Domain & Routing Files ---');
const cnamePath = path.resolve(DIST_DIR, 'CNAME');
assert(fs.existsSync(cnamePath), 'CNAME file exists in dist/');
if (fs.existsSync(cnamePath)) {
  const cnameContent = fs.readFileSync(cnamePath, 'utf8').trim();
  assert(cnameContent === 'alex.runs-on.dev', `CNAME content is "alex.runs-on.dev" (got: "${cnameContent}")`);
}

const notFoundPath = path.resolve(DIST_DIR, '404.html');
assert(fs.existsSync(notFoundPath), '404.html file exists in dist/');
if (fs.existsSync(notFoundPath)) {
  const notFoundContent = fs.readFileSync(notFoundPath, 'utf8');
  assert(notFoundContent.includes('pathSegmentsToKeep = 0'), '404.html uses pathSegmentsToKeep = 0 for custom root domain');
  assert(notFoundContent.includes('robots') && notFoundContent.includes('noindex'), '404.html includes <meta name="robots" content="noindex...');
}

// 2. Validate robots.txt
console.log('\n--- 2. Robots.txt Crawl Directives & AI Policies ---');
const robotsPath = path.resolve(DIST_DIR, 'robots.txt');
assert(fs.existsSync(robotsPath), 'robots.txt exists in dist/');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  assert(robots.includes('User-agent: *') && robots.includes('Allow: /'), 'Allows general web crawlers on /');
  assert(robots.includes('User-agent: OAI-SearchBot') && robots.includes('Allow: /'), 'Explicitly allows OAI-SearchBot for ChatGPT Search');
  assert(robots.includes('User-agent: PerplexityBot') && robots.includes('Allow: /'), 'Explicitly allows PerplexityBot for AI search');
  assert(robots.includes('User-agent: ClaudeBot') && robots.includes('Allow: /'), 'Explicitly allows ClaudeBot for assistant discovery');
  assert(robots.includes('User-agent: Applebot-Extended') && robots.includes('Allow: /'), 'Explicitly allows Applebot-Extended for Apple Intelligence');
  assert(robots.includes('User-agent: GPTBot') && robots.includes('Disallow: /'), 'Separate policy for GPTBot model training (Disallow: /)');
  assert(robots.includes('Sitemap: https://alex.runs-on.dev/sitemap.xml'), 'References canonical sitemap https://alex.runs-on.dev/sitemap.xml');
}

// 2b. Validate AI Discovery Files (llms.txt & llms-full.txt)
console.log('\n--- 2b. AI Discovery Files (llms.txt & llms-full.txt) ---');
const llmsPath = path.resolve(DIST_DIR, 'llms.txt');
assert(fs.existsSync(llmsPath), 'llms.txt exists in dist/');
if (fs.existsSync(llmsPath)) {
  const llmsContent = fs.readFileSync(llmsPath, 'utf8');
  assert(llmsContent.includes('Raman Kumar Sharma'), 'llms.txt contains primary entity name');
  assert(llmsContent.includes('https://alex.runs-on.dev/'), 'llms.txt contains canonical website link');
}
const llmsFullPath = path.resolve(DIST_DIR, 'llms-full.txt');
assert(fs.existsSync(llmsFullPath), 'llms-full.txt exists in dist/');
if (fs.existsSync(llmsFullPath)) {
  const llmsFullContent = fs.readFileSync(llmsFullPath, 'utf8');
  assert(llmsFullContent.includes('CloudPower Multi-Tier Application Ecosystem'), 'llms-full.txt contains full systems case studies');
}

// 3. Validate sitemap.xml
console.log('\n--- 3. XML Sitemap Validation ---');
const sitemapPath = path.resolve(DIST_DIR, 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'sitemap.xml exists in dist/');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  assert(sitemap.startsWith('<?xml'), 'sitemap starts with XML declaration');
  assert(sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'), 'sitemap has valid urlset schema namespace');
  
  // Verify all 17 required URLs are in sitemap
  for (const r of REQUIRED_ROUTES) {
    const expectedLoc = r.path === '/' ? `${BASE_DOMAIN}/` : `${BASE_DOMAIN}${r.path}`;
    assert(sitemap.includes(`<loc>${expectedLoc}</loc>`), `sitemap includes canonical URL: ${expectedLoc}`);
  }
}

// 4. Validate Prerendered HTML Files
console.log('\n--- 4. Prerendered Pages, Head Metadata & Semantic Content ---');
for (const r of REQUIRED_ROUTES) {
  const filePath = path.resolve(DIST_DIR, r.file);
  console.log(`\nChecking route: ${r.path} (${r.file})`);
  assert(fs.existsSync(filePath), `Physical file exists: dist/${r.file}`);
  if (!fs.existsSync(filePath)) continue;

  const html = fs.readFileSync(filePath, 'utf8');

  // Exact one <title>
  const titles = html.match(/<title>.*?<\/title>/gi) || [];
  assert(titles.length === 1, `Exactly 1 <title> tag found (got ${titles.length})`);
  if (titles.length === 1) {
    const rawTitle = titles[0].replace(/&amp;/g, '&');
    assert(rawTitle.includes(r.titleContains), `<title> contains expected topic "${r.titleContains}" (got "${titles[0]}")`);
  }

  // Exact one meta description
  const descriptions = html.match(/<meta\s+name=["']description["'][^>]*>/gi) || [];
  assert(descriptions.length === 1, `Exactly 1 meta description tag found (got ${descriptions.length})`);

  // Canonical URL
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const expectedCanonical = r.path === '/' ? `${BASE_DOMAIN}/` : `${BASE_DOMAIN}${r.path}`;
  assert(canonicalMatch && canonicalMatch[1] === expectedCanonical, `Canonical URL matches "${expectedCanonical}" (got "${canonicalMatch?.[1]}")`);

  // Open Graph
  assert(html.includes('property="og:title"'), 'Contains og:title');
  assert(html.includes('property="og:description"'), 'Contains og:description');
  assert(html.includes('property="og:url"') && html.includes(expectedCanonical), 'og:url matches canonical URL');
  assert(html.includes('property="og:image"') && html.includes(`${BASE_DOMAIN}/og-image.png`), 'og:image is valid absolute URL');

  // Twitter Card
  assert(html.includes('name="twitter:card" content="summary_large_image"'), 'twitter:card is summary_large_image');
  assert(html.includes('name="twitter:image"') && html.includes(`${BASE_DOMAIN}/og-image.png`), 'twitter:image is valid absolute URL');

  // Semantic readable content inside <div id="root">
  const rootIndex = html.indexOf('<div id="root">');
  assert(rootIndex !== -1 && html.length > 5000, `Has substantial prerendered semantic HTML document (${(html.length / 1024).toFixed(1)} KB)`);
  assert(html.includes('<h1'), 'Contains primary <h1> heading');
  assert(html.includes('<nav'), 'Contains semantic <nav> element');
  assert(html.includes('<main id="main-content"'), 'Contains semantic <main id="main-content"> landmark');
  assert(html.includes('<footer'), 'Contains semantic <footer> element');

  // Schema.org JSON-LD
  const jsonLdMatch = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
  assert(Boolean(jsonLdMatch), 'Contains Schema.org JSON-LD script block');
  if (jsonLdMatch) {
    try {
      const parsed = JSON.parse(jsonLdMatch[1]);
      assert(parsed['@context'] === 'https://schema.org', 'JSON-LD @context is https://schema.org');
      assert(Array.isArray(parsed['@graph']) && parsed['@graph'].length >= 3, `JSON-LD @graph contains >= 3 entities (got ${parsed['@graph']?.length})`);
      
      const person = parsed['@graph'].find(x => x['@type'] === 'Person');
      assert(person && person.name === 'Raman Kumar Sharma', 'JSON-LD Person entity verified');
      assert(person && person.url === `${BASE_DOMAIN}/`, 'JSON-LD Person URL verified');
      
      const website = parsed['@graph'].find(x => x['@type'] === 'WebSite');
      assert(website && website.url === `${BASE_DOMAIN}/`, 'JSON-LD WebSite entity verified');
    } catch (e) {
      assert(false, `JSON-LD parsing error: ${e.message}`);
    }
  }
}

// 5. Security & Sensitive Info Check
console.log('\n--- 5. Security & Information Leakage Audit ---');
function scanDirForSecrets(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        scanDirForSecrets(fullPath);
      }
    } else if (entry.isFile()) {
      if (entry.name.endsWith('.html') || entry.name.endsWith('.js') || entry.name.endsWith('.json')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        assert(!content.includes('BEGIN PRIVATE KEY'), `No private keys in ${entry.name}`);
        assert(!content.includes('AIZA') && !content.includes('ghp_'), `No API keys or tokens in ${entry.name}`);
        assert(!content.includes('.env.local'), `No local env references in ${entry.name}`);
      }
    }
  }
}
scanDirForSecrets(DIST_DIR);

console.log(`\n========================================`);
console.log(`Validation Results: ${passed} PASSED, ${failed} FAILED`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('✅ ALL SEO CHECKS PASSED WITH ZERO ERRORS!');
}


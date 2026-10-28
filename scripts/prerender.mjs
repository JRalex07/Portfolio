import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const BASE_DOMAIN = 'https://alex.runs-on.dev';
const OG_IMAGE_URL = `${BASE_DOMAIN}/og-image.png`;
const CACHE_DIR = path.resolve(__dirname, '.cache_data');

// Compile TypeScript data files via esbuild to run on any Node version (Node 18/20/22+) without experimental flags
await esbuild.build({
  entryPoints: [
    path.resolve(ROOT_DIR, 'src/data/personal.ts'),
    path.resolve(ROOT_DIR, 'src/data/projects.ts'),
    path.resolve(ROOT_DIR, 'src/data/credentials.ts'),
    path.resolve(ROOT_DIR, 'src/data/skills.ts'),
    path.resolve(ROOT_DIR, 'src/data/timeline.ts')
  ],
  outdir: CACHE_DIR,
  bundle: false,
  format: 'esm',
  platform: 'node',
  target: 'node20',
  write: true
});

const { personalInfo } = await import(pathToFileURL(path.resolve(CACHE_DIR, 'personal.js')).href);
const { projects } = await import(pathToFileURL(path.resolve(CACHE_DIR, 'projects.js')).href);
const { specializations } = await import(pathToFileURL(path.resolve(CACHE_DIR, 'credentials.js')).href);
const { skillCategories } = await import(pathToFileURL(path.resolve(CACHE_DIR, 'skills.js')).href);
const { timelineMilestones } = await import(pathToFileURL(path.resolve(CACHE_DIR, 'timeline.js')).href);

// Escape HTML helper
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Escape HTML and automatically convert URL domains into styled anchors
function escapeHtmlWithLinks(str) {
  const escaped = escapeHtml(str);
  return escaped.replace(
    /(https?:\/\/[^\s]+|(?:\b[a-zA-Z0-9-]+\.)+(?:runs-on\.dev|dev|in|store|app|com|org)(?:\/[^\s.,]*)?)/g,
    (match) => {
      let url = match;
      let trailing = '';
      if (/[.,;:!]$/.test(url)) {
        trailing = url.slice(-1);
        url = url.slice(0, -1);
      }
      const href = url.startsWith('http') ? url : `https://${url}`;
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="color: #0284c7; text-decoration: underline; text-underline-offset: 3px; font-weight: 600;">${url}</a>${trailing}`;
    }
  );
}

// Generate shared persistent header shell
function renderHeader(activePath) {
  return `
    <header class="site-header" role="banner" style="position: fixed; top: 0; left: 0; right: 0; width: 100%; z-index: 1000; padding: 14px 0; background: transparent; pointer-events: none;">
      <div class="container" style="pointer-events: none;">
        <div class="liquid-glass-navbar pill-shape" style="pointer-events: auto;">
          <div class="liquid-glass-navbar-inner">
            <a href="/" class="brand-logo" aria-label="Raman Kumar Sharma — Portfolio">
              <div class="brand-glyph" aria-hidden="true">R</div>
              <span class="brand-name">${escapeHtml(personalInfo.name)}</span>
            </a>
            <nav class="site-nav desktop-nav" role="navigation" aria-label="Main Navigation">
              <ul class="nav-menu">
                <li class="nav-item"><a href="/" class="nav-link ${activePath === '/' ? 'active' : ''}"><span class="nav-link-text">Home</span></a></li>
                <li class="nav-item"><a href="/about" class="nav-link ${activePath === '/about' ? 'active' : ''}"><span class="nav-link-text">About</span></a></li>
                <li class="nav-item"><a href="/projects" class="nav-link ${activePath === '/projects' ? 'active' : ''}"><span class="nav-link-text">Projects</span></a></li>
                <li class="nav-item"><a href="/certifications" class="nav-link ${activePath.startsWith('/cert') ? 'active' : ''}"><span class="nav-link-text">Certifications</span></a></li>
                <li class="nav-item"><a href="/contact" class="nav-link ${activePath === '/contact' ? 'active' : ''}"><span class="nav-link-text">Contact</span></a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  `;
}

// Generate shared persistent footer shell
function renderFooter() {
  return `
    <footer class="site-footer" style="position: relative; overflow: hidden; background: linear-gradient(180deg, #ffffff 0%, #fbfcfd 50%, #f1f5f9 100%); border-top: 1px solid var(--border-subtle, #e2e8f0); padding: 56px 0 0 0; margin-top: 60px;">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px clamp(28px, 4.5vw, 48px); display: flex; flex-direction: column; gap: 24px; position: relative; z-index: 2;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px;">
          <div>
            <div style="font-weight: 800; font-size: 18px; color: var(--text-primary, #0f172a);">${escapeHtml(personalInfo.name)}</div>
            <p style="color: var(--text-muted, #64748b); font-size: 13px; margin: 4px 0 0;">${escapeHtml(personalInfo.tagline)}</p>
          </div>
          <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <a href="${escapeHtml(personalInfo.contact.github)}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-teal, #0284c7); text-decoration: none; font-size: 13px; font-weight: 600;">GitHub</a>
            <a href="${escapeHtml(personalInfo.contact.linkedin)}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-teal, #0284c7); text-decoration: none; font-size: 13px; font-weight: 600;">LinkedIn</a>
            <a href="mailto:${escapeHtml(personalInfo.contact.email)}" style="color: var(--accent-teal, #0284c7); text-decoration: none; font-size: 13px; font-weight: 600;">${escapeHtml(personalInfo.contact.email)}</a>
            <a href="/sitemap.xml" style="color: var(--text-muted, #64748b); text-decoration: none; font-size: 13px;">XML Sitemap</a>
          </div>
        </div>
        <div class="footer-colophon-bar" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 12px; border-top: 1px solid var(--border-subtle, #e2e8f0); padding-top: 16px; position: relative; z-index: 3;">
          <div class="footer-colophon-left" style="display: flex; flex-direction: column; gap: 3px;">
            <span class="footer-copyright" style="font-weight: 600; color: #0f172a;">© 2026 Raman Kumar Sharma. All rights reserved.</span>
            <span class="footer-build-signature" style="font-family: monospace; font-size: 10.5px; color: #64748b;">Precision Skeuomorphic Architecture · Deterministic State Engineering</span>
          </div>
          <span style="font-size: 12px; color: #64748b;">Verified Systems Archive • Deployed on GitHub Pages</span>
        </div>
      </div>
      <div class="footer-watermark-wrapper" aria-hidden="true">
        <span class="footer-watermark-text">ALEX</span>
      </div>
    </footer>
  `;
}

// Route Content Generators
function generateHomeHtml() {
  const featuredProjects = projects.filter(p => p.isFeatured);
  const featuredCerts = specializations.slice(0, 3);

  return `
    <div class="page-home" style="display: flex; flexDirection: column; gap: 64px;">
      <!-- Hero Section -->
      <section class="hero-section" style="padding: 48px 0 24px;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
          <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px;">
            ${personalInfo.titles.map(t => `<span class="badge" style="background: rgba(2, 132, 199, 0.08); border: 1px solid rgba(2, 132, 199, 0.22); color: #0284c7; padding: 4px 14px; border-radius: 9999px; font-size: 11px; font-weight: 700; font-family: monospace;">${escapeHtml(t)}</span>`).join('')}
          </div>
          <h1 style="font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 900; line-height: 1.15; color: #0f172a; margin: 0 0 18px; letter-spacing: -0.02em;">
            ${escapeHtml(personalInfo.name)}
          </h1>
          <p style="font-size: clamp(1.1rem, 2vw, 1.35rem); color: #0284c7; font-weight: 600; line-height: 1.5; margin: 0 0 20px; max-width: 900px;">
            ${escapeHtml(personalInfo.tagline)}
          </p>
          <div style="display: flex; flex-direction: column; gap: 12px; max-width: 860px; color: #475569; font-size: 1.05rem; line-height: 1.7; margin-bottom: 28px;">
            ${personalInfo.summary.map(s => `<p style="margin: 0;">${escapeHtml(s)}</p>`).join('')}
          </div>
          <div style="display: flex; gap: 14px; flex-wrap: wrap; align-items: center;">
            <a href="/projects" class="btn btn-primary" style="background: #0284c7; color: #ffffff; text-decoration: none; padding: 12px 26px; border-radius: 9999px; font-weight: 700; font-size: 14px;">Explore Production Systems →</a>
            <a href="/certifications" class="btn btn-secondary" style="background: #ffffff; border: 1px solid #cbd5e1; color: #0f172a; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-weight: 700; font-size: 14px;">Verified Credentials (11)</a>
            <a href="/contact" style="color: #0284c7; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 16px;">Get In Touch</a>
          </div>
        </div>
      </section>

      <!-- Architecture Focus Areas -->
      <section style="padding: 20px 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
          <h2 style="font-size: 1.8rem; font-weight: 800; color: #0f172a; margin: 0 0 16px;">Core Architectural Focus Areas</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 16px;">
            ${personalInfo.focusAreas.map(fa => `
              <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                <div style="font-weight: 700; font-size: 1rem; color: #0f172a;">${escapeHtml(fa)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Featured Systems -->
      <section style="padding: 20px 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
            <div>
              <span style="font-family: monospace; font-size: 11px; color: #0284c7; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">ENGINEERED CASE STUDIES</span>
              <h2 style="font-size: 1.8rem; font-weight: 800; color: #0f172a; margin: 4px 0 0;">Featured Production Systems</h2>
            </div>
            <a href="/projects" style="color: #0284c7; text-decoration: none; font-weight: 700; font-size: 14px;">View All 6 Projects →</a>
          </div>
          <div style="display: flex; flex-direction: column; gap: 24px;">
            ${featuredProjects.map(proj => `
              <article style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 28px; box-shadow: 0 4px 16px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 12px;">
                  <div>
                    <span style="font-family: monospace; font-size: 11px; color: #0284c7; background: #e0f2fe; padding: 3px 10px; border-radius: 9999px; font-weight: 700;">${escapeHtml(proj.category)}</span>
                    <h3 style="font-size: 1.5rem; font-weight: 800; color: #0f172a; margin: 8px 0 4px;">${escapeHtml(proj.title)}</h3>
                    <p style="color: #475569; font-size: 1rem; margin: 0 0 14px;">${escapeHtml(proj.subtitle)}</p>
                  </div>
                  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    ${proj.liveUrl ? `<a href="${escapeHtml(proj.liveUrl)}" target="_blank" rel="noopener noreferrer" style="background: #0284c7; color: #ffffff; text-decoration: none; padding: 8px 18px; border-radius: 9999px; font-size: 12px; font-weight: 700;">Live Platform ↗</a>` : ''}
                    ${proj.secondaryUrl ? `<a href="${escapeHtml(proj.secondaryUrl.url)}" target="_blank" rel="noopener noreferrer" style="background: #f1f5f9; color: #0f172a; text-decoration: none; padding: 8px 16px; border-radius: 9999px; font-size: 12px; font-weight: 600;">${escapeHtml(proj.secondaryUrl.label)} ↗</a>` : ''}
                    ${proj.githubUrl ? `<a href="${escapeHtml(proj.githubUrl)}" target="_blank" rel="noopener noreferrer" style="background: #f8fafc; border: 1px solid #cbd5e1; color: #0f172a; text-decoration: none; padding: 8px 16px; border-radius: 9999px; font-size: 12px; font-weight: 600;">GitHub ↗</a>` : ''}
                  </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                  <div>
                    <strong style="font-size: 11px; font-family: monospace; color: #d97706; text-transform: uppercase;">Problem:</strong>
                    <p style="font-size: 0.9rem; color: #475569; margin: 4px 0 0; line-height: 1.6;">${escapeHtmlWithLinks(proj.problem)}</p>
                  </div>
                  <div>
                    <strong style="font-size: 11px; font-family: monospace; color: #059669; text-transform: uppercase;">Engineered Solution:</strong>
                    <p style="font-size: 0.9rem; color: #475569; margin: 4px 0 0; line-height: 1.6;">${escapeHtmlWithLinks(proj.solution)}</p>
                  </div>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                  ${proj.technologies.map(t => `<span style="background: #f1f5f9; border: 1px solid #e2e8f0; color: #475569; font-size: 11px; font-family: monospace; padding: 3px 10px; border-radius: 9999px;">${escapeHtml(t)}</span>`).join('')}
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Verified Credentials Preview -->
      <section style="padding: 20px 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
            <div>
              <span style="font-family: monospace; font-size: 11px; color: #0284c7; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">VERIFIED COMPETENCIES</span>
              <h2 style="font-size: 1.8rem; font-weight: 800; color: #0f172a; margin: 4px 0 0;">Official Specializations Archive</h2>
            </div>
            <a href="/certifications" style="color: #0284c7; text-decoration: none; font-weight: 700; font-size: 14px;">Browse All 11 Verified Certifications →</a>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); gap: 20px;">
            ${featuredCerts.map(cert => `
              <article style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 18px; padding: 24px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.04);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 11px; font-weight: 750; color: #0284c7; background: #e0f2fe; padding: 3px 10px; border-radius: 9999px;">${escapeHtml(cert.provider)}</span>
                  <span style="font-size: 11px; color: #10b981; font-weight: 700;">● Verified Credential</span>
                </div>
                <h3 style="font-size: 1.2rem; font-weight: 800; color: #0f172a; margin: 0;">
                  <a href="/certificate/${cert.id}" style="color: inherit; text-decoration: none;">${escapeHtml(cert.title)}</a>
                </h3>
                <p style="font-size: 0.9rem; color: #475569; line-height: 1.6; margin: 0;">${escapeHtml(cert.summary)}</p>
                <div style="font-family: monospace; font-size: 11px; color: #64748b; margin-top: auto; padding-top: 10px; border-top: 1px solid #f1f5f9;">
                  <div>ID: <strong>${escapeHtml(cert.credentialId)}</strong></div>
                  <div>Issued: ${escapeHtml(cert.issueDate)}</div>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 6px;">
                  <a href="/certificate/${cert.id}" style="color: #0284c7; text-decoration: none; font-weight: 700; font-size: 12px;">Inspect Details →</a>
                  <a href="${escapeHtml(cert.verificationUrl)}" target="_blank" rel="noopener noreferrer" style="color: #64748b; text-decoration: none; font-size: 12px;">Verify Issuer ↗</a>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Engineering Principles -->
      <section style="padding: 20px 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
          <h2 style="font-size: 1.8rem; font-weight: 800; color: #0f172a; margin: 0 0 18px;">Engineering Principles</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 18px;">
            ${personalInfo.principles.map(p => `
              <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                <h3 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin: 0 0 8px;">${escapeHtml(p.title)}</h3>
                <p style="font-size: 0.9rem; color: #64748b; line-height: 1.6; margin: 0;">${escapeHtml(p.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    </div>
  `;
}

function generateAboutHtml() {
  return `
    <div class="page-about" style="display: flex; flex-direction: column; gap: 48px; max-width: 1000px; margin: 0 auto; padding: 36px 20px;">
      <section>
        <span style="font-family: monospace; font-size: 11px; color: #0284c7; background: #e0f2fe; padding: 4px 14px; border-radius: 9999px; font-weight: 700;">ENGINEERING PHILOSOPHY & PERSPECTIVE</span>
        <h1 style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; color: #0f172a; line-height: 1.2; margin: 12px 0 16px;">
          Architectural Discipline, Strict State Invariants & System Clarity
        </h1>
        <p style="font-size: 1.15rem; color: #475569; line-height: 1.7; margin: 0 0 28px;">
          An in-depth perspective on how I reason through distributed systems, design deterministic execution harnesses, and coordinate multi-tier applications across web and mobile.
        </p>
      </section>

      <section style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 32px; box-shadow: 0 4px 16px rgba(0,0,0,0.05);">
        <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin: 0 0 14px;">Systems Perspective & Background</h2>
        <div style="display: flex; flex-direction: column; gap: 14px; color: #334155; font-size: 1rem; line-height: 1.7;">
          ${personalInfo.summary.map(s => `<p style="margin: 0;">${escapeHtml(s)}</p>`).join('')}
        </div>
      </section>

      <section style="display: flex; flex-direction: column; gap: 20px;">
        <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin: 0;">Core Architectural Principles</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 18px;">
          ${personalInfo.principles.map(p => `
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px;">
              <h3 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin: 0 0 8px;">${escapeHtml(p.title)}</h3>
              <p style="font-size: 0.92rem; color: #64748b; line-height: 1.6; margin: 0;">${escapeHtml(p.desc)}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <section style="display: flex; flex-direction: column; gap: 20px;">
        <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin: 0;">Milestone History & Track Record</h2>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${timelineMilestones.map(m => `
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px;">
                <span style="font-family: monospace; font-size: 12px; font-weight: 800; color: #0284c7;">${escapeHtml(m.year)} ${escapeHtml(m.quarter || '')}</span>
                <span style="font-size: 11px; background: #f1f5f9; padding: 2px 10px; border-radius: 9999px; color: #64748b; font-weight: 600;">${escapeHtml(m.category)}</span>
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin: 6px 0 2px;">${escapeHtml(m.title)}</h3>
              <div style="font-size: 0.95rem; color: #0284c7; font-weight: 600; margin-bottom: 8px;">${escapeHtml(m.subtitle)}</div>
              <p style="font-size: 0.92rem; color: #475569; line-height: 1.6; margin: 0 0 12px;">${escapeHtml(m.description)}</p>
              <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                ${m.tags.map(t => `<span style="font-family: monospace; font-size: 11px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 2px 8px; border-radius: 6px; color: #64748b;">${escapeHtml(t)}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}

function generateProjectsHtml() {
  return `
    <div class="page-projects" style="display: flex; flex-direction: column; gap: 48px; max-width: 1100px; margin: 0 auto; padding: 36px 20px;">
      <section>
        <span style="font-family: monospace; font-size: 11px; color: #0284c7; background: #e0f2fe; padding: 4px 14px; border-radius: 9999px; font-weight: 700;">PRODUCTION SYSTEMS & CASE STUDIES</span>
        <h1 style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; color: #0f172a; line-height: 1.2; margin: 12px 0 16px;">
          Engineered Deployments & Distributed Architectures
        </h1>
        <p style="font-size: 1.15rem; color: #475569; line-height: 1.7; margin: 0;">
          Inspect verified production systems built across mobile Flutter clients, synchronized multi-tier commerce portals, and standardized Model Context Protocol (MCP) agent execution runtimes. Every project documented here represents genuine architecture with real live deployments and verifiable source code.
        </p>
      </section>

      <section style="display: flex; flex-direction: column; gap: 32px;">
        ${projects.map(proj => `
          <article id="${escapeHtml(proj.id)}" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; padding: clamp(20px, 4vw, 36px); box-shadow: 0 4px 20px rgba(0,0,0,0.06); display: flex; flex-direction: column; gap: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px;">
              <div>
                <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
                  <span style="font-family: monospace; font-size: 11px; color: #0284c7; background: #e0f2fe; padding: 3px 10px; border-radius: 9999px; font-weight: 700;">${escapeHtml(proj.category)}</span>
                  <span style="font-family: monospace; font-size: 11px; color: #64748b; background: #f1f5f9; padding: 3px 10px; border-radius: 9999px;">${escapeHtml(proj.badge)}</span>
                </div>
                <h2 style="font-size: clamp(1.4rem, 2.4vw, 1.85rem); font-weight: 800; color: #0f172a; margin: 0 0 6px;">${escapeHtml(proj.title)}</h2>
                <p style="font-size: 1rem; color: #475569; margin: 0; line-height: 1.6;">${escapeHtml(proj.subtitle)}</p>
              </div>
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                ${proj.liveUrl ? `<a href="${escapeHtml(proj.liveUrl)}" target="_blank" rel="noopener noreferrer" style="background: #0284c7; color: #ffffff; text-decoration: none; padding: 9px 20px; border-radius: 9999px; font-size: 13px; font-weight: 700;">Live Deployment ↗</a>` : ''}
                ${proj.secondaryUrl ? `<a href="${escapeHtml(proj.secondaryUrl.url)}" target="_blank" rel="noopener noreferrer" style="background: #f1f5f9; color: #0f172a; text-decoration: none; padding: 9px 18px; border-radius: 9999px; font-size: 13px; font-weight: 600;">${escapeHtml(proj.secondaryUrl.label)} ↗</a>` : ''}
                ${proj.githubUrl ? `<a href="${escapeHtml(proj.githubUrl)}" target="_blank" rel="noopener noreferrer" style="background: #f8fafc; border: 1px solid #cbd5e1; color: #0f172a; text-decoration: none; padding: 9px 18px; border-radius: 9999px; font-size: 13px; font-weight: 600;">GitHub Repository ↗</a>` : ''}
              </div>
            </div>

            <!-- Problem / Solution -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 18px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px;">
              <div>
                <strong style="font-size: 11px; font-family: monospace; color: #d97706; text-transform: uppercase;">Architecture Challenge & Problem:</strong>
                <p style="font-size: 0.92rem; color: #334155; line-height: 1.65; margin: 6px 0 0;">${escapeHtmlWithLinks(proj.problem)}</p>
              </div>
              <div>
                <strong style="font-size: 11px; font-family: monospace; color: #059669; text-transform: uppercase;">Engineered Solution & Invariants:</strong>
                <p style="font-size: 0.92rem; color: #334155; line-height: 1.65; margin: 6px 0 0;">${escapeHtmlWithLinks(proj.solution)}</p>
              </div>
            </div>

            <!-- Specifications -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px;">
              <div style="font-family: monospace; font-size: 11px; color: #0284c7; font-weight: 700; margin-bottom: 12px; text-transform: uppercase;">System Specifications & Architectural Invariants:</div>
              <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 0.92rem; line-height: 1.7;">
                ${proj.architectureDetails.map(d => `<li>${escapeHtmlWithLinks(d)}</li>`).join('')}
              </ul>
            </div>

            <!-- Key Features -->
            <div>
              <div style="font-family: monospace; font-size: 11px; color: #64748b; font-weight: 700; margin-bottom: 8px; text-transform: uppercase;">Key Capabilities:</div>
              <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 0.92rem; line-height: 1.7;">
                ${proj.keyFeatures.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
              </ul>
            </div>

            <!-- Tech stack -->
            <div style="border-top: 1px solid #f1f5f9; padding-top: 14px; display: flex; flex-wrap: wrap; gap: 8px;">
              ${proj.technologies.map(t => `<span style="font-family: monospace; font-size: 11.5px; background: #f8fafc; border: 1px solid #cbd5e1; padding: 4px 12px; border-radius: 9999px; color: #334155;">${escapeHtml(t)}</span>`).join('')}
            </div>
          </article>
        `).join('')}
      </section>
    </div>
  `;
}

function generateCertificationsHtml() {
  return `
    <div class="page-certifications" style="display: flex; flex-direction: column; gap: 48px; max-width: 1100px; margin: 0 auto; padding: 36px 20px;">
      <section>
        <span style="font-family: monospace; font-size: 11px; color: #0284c7; background: #e0f2fe; padding: 4px 14px; border-radius: 9999px; font-weight: 700;">OFFICIAL CERTIFIED COMPETENCIES</span>
        <h1 style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; color: #0f172a; line-height: 1.2; margin: 12px 0 16px;">
          Verified Specializations & Technical Curriculums
        </h1>
        <p style="font-size: 1.15rem; color: #475569; line-height: 1.7; margin: 0;">
          Explore 11 verified specializations issued by Microsoft Learn and Tutedude covering Agentic SDLC Integration, Model Context Protocol (MCP) tooling environments, high-concurrency systems, mobile engineering, and data analytics. Every credential is authenticated with verifiable ID records and public issuer certificates.
        </p>
      </section>

      <section style="display: flex; flex-direction: column; gap: 32px;">
        ${specializations.map((cert, idx) => `
          <article id="${escapeHtml(cert.id)}" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; padding: clamp(20px, 4vw, 36px); box-shadow: 0 4px 20px rgba(0,0,0,0.06); display: flex; flex-direction: column; gap: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px;">
              <div>
                <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
                  <span style="font-family: monospace; font-size: 11px; color: #0284c7; background: #e0f2fe; padding: 3px 10px; border-radius: 9999px; font-weight: 700;">${escapeHtml(cert.provider)}</span>
                  <span style="font-family: monospace; font-size: 11px; color: #64748b; background: #f1f5f9; padding: 3px 10px; border-radius: 9999px;">${escapeHtml(cert.category)}</span>
                  <span style="font-size: 11px; color: #10b981; font-weight: 700;">● Verified Credential</span>
                </div>
                <h2 style="font-size: clamp(1.3rem, 2.2vw, 1.75rem); font-weight: 800; color: #0f172a; margin: 0 0 6px;">
                  <a href="/certificate/${cert.id}" style="color: inherit; text-decoration: none;">${escapeHtml(cert.title)}</a>
                </h2>
                <p style="font-size: 1rem; color: #475569; margin: 0; line-height: 1.6;">${escapeHtml(cert.summary)}</p>
              </div>
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <a href="/certificate/${cert.id}" style="background: #0284c7; color: #ffffff; text-decoration: none; padding: 8px 20px; border-radius: 9999px; font-size: 13px; font-weight: 700;">Inspect Full Syllabus →</a>
                <a href="${escapeHtml(cert.verificationUrl)}" target="_blank" rel="noopener noreferrer" style="background: #f8fafc; border: 1px solid #cbd5e1; color: #0f172a; text-decoration: none; padding: 8px 18px; border-radius: 9999px; font-size: 13px; font-weight: 600;">Verify on ${escapeHtml(cert.provider)} ↗</a>
              </div>
            </div>

            <!-- Credential Facts Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">
              <div>
                <span style="font-size: 11px; font-family: monospace; color: #64748b; text-transform: uppercase;">Credential ID:</span>
                <div style="font-family: monospace; font-size: 12px; font-weight: 700; color: #0f172a; margin-top: 2px;">${escapeHtml(cert.credentialId)}</div>
              </div>
              <div>
                <span style="font-size: 11px; font-family: monospace; color: #64748b; text-transform: uppercase;">Issue Date:</span>
                <div style="font-size: 12px; font-weight: 700; color: #0f172a; margin-top: 2px;">${escapeHtml(cert.issueDate)}</div>
              </div>
              <div>
                <span style="font-size: 11px; font-family: monospace; color: #64748b; text-transform: uppercase;">Curriculum Duration:</span>
                <div style="font-size: 12px; font-weight: 700; color: #0f172a; margin-top: 2px;">${escapeHtml(cert.hours)}</div>
              </div>
              <div>
                <span style="font-size: 11px; font-family: monospace; color: #64748b; text-transform: uppercase;">Issuing Organization:</span>
                <div style="font-size: 12px; font-weight: 700; color: #0f172a; margin-top: 2px;">${escapeHtml(cert.provider)}</div>
              </div>
            </div>

            <!-- Applied Competency -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">
              <strong style="font-size: 11px; font-family: monospace; color: #0284c7; text-transform: uppercase;">Applied Competency:</strong>
              <p style="font-size: 0.95rem; color: #1e293b; margin: 4px 0 0; font-weight: 600; line-height: 1.6;">${escapeHtml(cert.appliedCompetency)}</p>
            </div>

            <!-- Syllabus Modules -->
            <div>
              <div style="font-family: monospace; font-size: 11px; color: #64748b; font-weight: 700; margin-bottom: 8px; text-transform: uppercase;">Mastered Curriculum & Syllabus:</div>
              <ol style="margin: 0; padding-left: 20px; color: #475569; font-size: 0.92rem; line-height: 1.7;">
                ${cert.syllabus.map(m => `<li>${escapeHtml(m)}</li>`).join('')}
              </ol>
            </div>

            <!-- Topics -->
            <div style="border-top: 1px solid #f1f5f9; padding-top: 14px; display: flex; flex-wrap: wrap; gap: 8px;">
              ${cert.topics.map(t => `<span style="font-family: monospace; font-size: 11px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 3px 10px; border-radius: 9999px; color: #475569;">${escapeHtml(t)}</span>`).join('')}
            </div>
          </article>
        `).join('')}
      </section>
    </div>
  `;
}

function generateCertificateDetailHtml(cert) {
  const currentIndex = specializations.findIndex(s => s.id === cert.id);
  const prevCert = currentIndex > 0 ? specializations[currentIndex - 1] : null;
  const nextCert = currentIndex < specializations.length - 1 ? specializations[currentIndex + 1] : null;

  return `
    <div class="page-certificate-detail" style="max-width: 1000px; margin: 0 auto; padding: 36px 20px; display: flex; flex-direction: column; gap: 32px;">
      <nav aria-label="Breadcrumb" style="font-size: 12px; color: #64748b; display: flex; gap: 8px; align-items: center;">
        <a href="/" style="color: #0284c7; text-decoration: none;">Home</a>
        <span>/</span>
        <a href="/certifications" style="color: #0284c7; text-decoration: none;">Certifications</a>
        <span>/</span>
        <span style="color: #0f172a; font-weight: 600;">${escapeHtml(cert.title)}</span>
      </nav>

      <section style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; padding: clamp(20px, 4vw, 36px); box-shadow: 0 4px 20px rgba(0,0,0,0.06); display: flex; flex-direction: column; gap: 18px;">
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <span style="font-family: monospace; font-size: 11px; color: #0284c7; background: #e0f2fe; padding: 4px 12px; border-radius: 9999px; font-weight: 700;">${escapeHtml(cert.provider)}</span>
          <span style="font-family: monospace; font-size: 11px; color: #64748b; background: #f1f5f9; padding: 4px 12px; border-radius: 9999px;">${escapeHtml(cert.category)}</span>
          <span style="font-size: 11px; color: #10b981; font-weight: 700;">● Verified Completion Credential</span>
        </div>
        <h1 style="font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 900; color: #0f172a; margin: 0; line-height: 1.25;">
          ${escapeHtml(cert.title)}
        </h1>
        <p style="font-size: 1.1rem; color: #475569; line-height: 1.7; margin: 0;">
          ${escapeHtml(cert.summary)}
        </p>

        <!-- Authority Metadata -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px;">
          <div>
            <span style="font-size: 11px; font-family: monospace; color: #64748b; text-transform: uppercase;">Certified Candidate:</span>
            <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-top: 2px;">Raman Kumar Sharma</div>
          </div>
          <div>
            <span style="font-size: 11px; font-family: monospace; color: #64748b; text-transform: uppercase;">Issuing Organization:</span>
            <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-top: 2px;">${escapeHtml(cert.provider)}</div>
          </div>
          <div>
            <span style="font-size: 11px; font-family: monospace; color: #64748b; text-transform: uppercase;">Credential Identifier:</span>
            <div style="font-family: monospace; font-size: 13px; font-weight: 800; color: #0f172a; margin-top: 2px;">${escapeHtml(cert.credentialId)}</div>
          </div>
          <div>
            <span style="font-size: 11px; font-family: monospace; color: #64748b; text-transform: uppercase;">Date Awarded:</span>
            <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-top: 2px;">${escapeHtml(cert.issueDate)}</div>
          </div>
          <div>
            <span style="font-size: 11px; font-family: monospace; color: #64748b; text-transform: uppercase;">Curriculum Duration:</span>
            <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-top: 2px;">${escapeHtml(cert.hours)}</div>
          </div>
          <div>
            <span style="font-size: 11px; font-family: monospace; color: #64748b; text-transform: uppercase;">Authentication Status:</span>
            <div style="font-size: 13px; font-weight: 800; color: #10b981; margin-top: 2px;">● Digitally Authenticated</div>
          </div>
        </div>

        <!-- Verification Action -->
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="${escapeHtml(cert.verificationUrl)}" target="_blank" rel="noopener noreferrer" style="background: #0284c7; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-weight: 700; font-size: 14px;">Verify Authenticity on ${escapeHtml(cert.provider)} ↗</a>
          <a href="/certifications" style="background: #f1f5f9; color: #0f172a; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-weight: 600; font-size: 14px;">← Back to All Certifications</a>
        </div>
      </section>

      <!-- Competency & Syllabus Breakdown -->
      <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr)); gap: 24px;">
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 28px; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
          <span style="font-family: monospace; font-size: 11px; color: #0284c7; font-weight: 700; text-transform: uppercase;">Applied Engineering Competency</span>
          <p style="font-size: 1.05rem; color: #0f172a; font-weight: 700; line-height: 1.6; margin: 10px 0 16px;">
            ${escapeHtml(cert.appliedCompetency)}
          </p>
          <div style="font-family: monospace; font-size: 11px; color: #64748b; font-weight: 700; margin-bottom: 8px; text-transform: uppercase;">Proficiencies & Topics:</div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${cert.topics.map(t => `<span style="font-family: monospace; font-size: 11.5px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 4px 10px; border-radius: 6px; color: #334155;">${escapeHtml(t)}</span>`).join('')}
          </div>
        </div>

        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 28px; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
          <span style="font-family: monospace; font-size: 11px; color: #0284c7; font-weight: 700; text-transform: uppercase;">Mastered Curriculum & Syllabus Modules</span>
          <ol style="margin: 12px 0 0; padding-left: 20px; color: #334155; font-size: 0.95rem; line-height: 1.8;">
            ${cert.syllabus.map(m => `<li>${escapeHtml(m)}</li>`).join('')}
          </ol>
        </div>
      </section>

      <!-- Prev / Next Navigation -->
      <nav aria-label="Adjacent Credentials" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 20px; flex-wrap: wrap; gap: 12px;">
        ${prevCert ? `<a href="/certificate/${prevCert.id}" style="color: #0284c7; text-decoration: none; font-weight: 700; font-size: 13px;">← Previous: ${escapeHtml(prevCert.title)}</a>` : '<div></div>'}
        ${nextCert ? `<a href="/certificate/${nextCert.id}" style="color: #0284c7; text-decoration: none; font-weight: 700; font-size: 13px;">Next: ${escapeHtml(nextCert.title)} →</a>` : '<div></div>'}
      </nav>
    </div>
  `;
}

function generateContactHtml() {
  return `
    <div class="page-contact" style="max-width: 900px; margin: 0 auto; padding: 36px 20px; display: flex; flex-direction: column; gap: 40px;">
      <section>
        <span style="font-family: monospace; font-size: 11px; color: #0284c7; background: #e0f2fe; padding: 4px 14px; border-radius: 9999px; font-weight: 700;">ENGINEERING INQUIRIES & COLLABORATION</span>
        <h1 style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; color: #0f172a; line-height: 1.2; margin: 12px 0 16px;">
          Direct Engineering Communication & Inquiries
        </h1>
        <p style="font-size: 1.15rem; color: #475569; line-height: 1.7; margin: 0;">
          Available for high-impact software engineering roles, mobile architecture initiatives with Flutter, and enterprise Model Context Protocol (MCP) agent integrations.
        </p>
      </section>

      <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 18px;">
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 18px; padding: 24px; box-shadow: 0 2px 10px rgba(0,0,0,0.04);">
          <div style="font-size: 11px; font-family: monospace; color: #64748b; text-transform: uppercase;">Direct Email</div>
          <div style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin: 6px 0;">
            <a href="mailto:${escapeHtml(personalInfo.contact.email)}" style="color: #0284c7; text-decoration: none;">${escapeHtml(personalInfo.contact.email)}</a>
          </div>
          <p style="font-size: 0.85rem; color: #64748b; margin: 0;">Inquiries, contracts, and architecture reviews</p>
        </div>

        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 18px; padding: 24px; box-shadow: 0 2px 10px rgba(0,0,0,0.04);">
          <div style="font-size: 11px; font-family: monospace; color: #64748b; text-transform: uppercase;">GitHub Engineering</div>
          <div style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin: 6px 0;">
            <a href="${escapeHtml(personalInfo.contact.github)}" target="_blank" rel="noopener noreferrer" style="color: #0284c7; text-decoration: none;">github.com/JRalex07 ↗</a>
          </div>
          <p style="font-size: 0.85rem; color: #64748b; margin: 0;">Public codebases, architectures & contributions</p>
        </div>

        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 18px; padding: 24px; box-shadow: 0 2px 10px rgba(0,0,0,0.04);">
          <div style="font-size: 11px; font-family: monospace; color: #64748b; text-transform: uppercase;">LinkedIn Network</div>
          <div style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin: 6px 0;">
            <a href="${escapeHtml(personalInfo.contact.linkedin)}" target="_blank" rel="noopener noreferrer" style="color: #0284c7; text-decoration: none;">linkedin.com/in/jralex07 ↗</a>
          </div>
          <p style="font-size: 0.85rem; color: #64748b; margin: 0;">Professional network & verified achievements</p>
        </div>

        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 18px; padding: 24px; box-shadow: 0 2px 10px rgba(0,0,0,0.04);">
          <div style="font-size: 11px; font-family: monospace; color: #64748b; text-transform: uppercase;">Location & Availability</div>
          <div style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin: 6px 0;">${escapeHtml(personalInfo.contact.location)}</div>
          <p style="font-size: 0.85rem; color: #10b981; font-weight: 600; margin: 0;">${escapeHtml(personalInfo.contact.status)}</p>
        </div>
      </section>
    </div>
  `;
}

// Route Configuration Definition
function getRoutesConfig() {
  const routes = [
    {
      path: '/',
      outFile: 'index.html',
      title: 'Raman Kumar Sharma | Application Engineer & Systems Builder',
      description: 'Engineering portfolio of Raman Kumar Sharma — Application Engineer, Systems Builder, and Software Architect. Architect of CloudPower cross-platform ecosystem, HimAmrit e-commerce platform, and Model Context Protocol (MCP) agent execution runtimes.',
      canonical: `${BASE_DOMAIN}/`,
      type: 'website',
      schemaType: 'ProfilePage',
      breadcrumbs: [
        { name: 'Home', url: `${BASE_DOMAIN}/` }
      ],
      renderContent: generateHomeHtml
    },
    {
      path: '/about',
      outFile: 'about/index.html',
      title: 'About Raman Kumar Sharma | Systems Architecture & Engineering Philosophy',
      description: 'Architectural philosophy, systems perspective, and engineering background of Raman Kumar Sharma — focus areas, core principles, and verified milestone history.',
      canonical: `${BASE_DOMAIN}/about`,
      type: 'article',
      schemaType: 'AboutPage',
      breadcrumbs: [
        { name: 'Home', url: `${BASE_DOMAIN}/` },
        { name: 'About', url: `${BASE_DOMAIN}/about` }
      ],
      renderContent: generateAboutHtml
    },
    {
      path: '/projects',
      outFile: 'projects/index.html',
      title: 'Projects & Engineered Systems | Raman Kumar Sharma',
      description: 'Production systems and case studies built by Raman Kumar Sharma: CloudPower multi-app ecosystem, HimAmrit shopping platform, Model Context Protocol (MCP) sandbox, and Flutter mobile architectures.',
      canonical: `${BASE_DOMAIN}/projects`,
      type: 'website',
      schemaType: 'CollectionPage',
      breadcrumbs: [
        { name: 'Home', url: `${BASE_DOMAIN}/` },
        { name: 'Projects', url: `${BASE_DOMAIN}/projects` }
      ],
      renderContent: generateProjectsHtml
    },
    {
      path: '/certifications',
      outFile: 'certifications/index.html',
      title: 'Verified Certifications & Technical Curriculums | Raman Kumar Sharma',
      description: '11 verified specializations and credentials awarded to Raman Kumar Sharma by Microsoft Learn and Tutedude across Agentic AI, MCP Tooling, Mobile Architecture, Concurrency, and Data Analytics.',
      canonical: `${BASE_DOMAIN}/certifications`,
      type: 'website',
      schemaType: 'CollectionPage',
      breadcrumbs: [
        { name: 'Home', url: `${BASE_DOMAIN}/` },
        { name: 'Certifications', url: `${BASE_DOMAIN}/certifications` }
      ],
      renderContent: generateCertificationsHtml
    },
    {
      path: '/certificate',
      outFile: 'certificate/index.html',
      title: 'Verified Credentials & Official Syllabuses | Raman Kumar Sharma',
      description: 'Detailed inspection of verified engineering credentials, curriculum syllabuses, and issuer authentications for Raman Kumar Sharma.',
      canonical: `${BASE_DOMAIN}/certificate`,
      type: 'website',
      schemaType: 'CollectionPage',
      breadcrumbs: [
        { name: 'Home', url: `${BASE_DOMAIN}/` },
        { name: 'Certifications', url: `${BASE_DOMAIN}/certifications` },
        { name: 'Certificate', url: `${BASE_DOMAIN}/certificate` }
      ],
      renderContent: () => generateCertificateDetailHtml(specializations[0])
    },
    {
      path: '/contact',
      outFile: 'contact/index.html',
      title: 'Contact Raman Kumar Sharma | Application Engineer & Systems Builder',
      description: 'Get in touch with Raman Kumar Sharma for software engineering, system architecture, Flutter mobile systems, and Model Context Protocol (MCP) agent integrations.',
      canonical: `${BASE_DOMAIN}/contact`,
      type: 'website',
      schemaType: 'ContactPage',
      breadcrumbs: [
        { name: 'Home', url: `${BASE_DOMAIN}/` },
        { name: 'Contact', url: `${BASE_DOMAIN}/contact` }
      ],
      renderContent: generateContactHtml
    }
  ];

  // Add all 11 individual certificate routes
  for (const cert of specializations) {
    routes.push({
      path: `/certificate/${cert.id}`,
      outFile: `certificate/${cert.id}/index.html`,
      title: `${cert.title} — Verified Credential & Syllabus | Raman Kumar Sharma`,
      description: `${cert.summary} Credential ID: ${cert.credentialId}. Issued by ${cert.provider} (${cert.issueDate}).`,
      canonical: `${BASE_DOMAIN}/certificate/${cert.id}`,
      type: 'article',
      schemaType: 'ItemPage',
      certData: cert,
      breadcrumbs: [
        { name: 'Home', url: `${BASE_DOMAIN}/` },
        { name: 'Certifications', url: `${BASE_DOMAIN}/certifications` },
        { name: cert.title, url: `${BASE_DOMAIN}/certificate/${cert.id}` }
      ],
      renderContent: () => generateCertificateDetailHtml(cert)
    });
  }

  return routes;
}

// Generate valid Schema.org JSON-LD for a route
function generateJsonLd(route) {
  const graph = [
    {
      "@type": "Person",
      "@id": `${BASE_DOMAIN}/#person`,
      "name": personalInfo.name,
      "givenName": "Raman Kumar",
      "familyName": "Sharma",
      "jobTitle": "Application Engineer & Systems Builder",
      "email": `mailto:${personalInfo.contact.email}`,
      "url": `${BASE_DOMAIN}/`,
      "image": `${BASE_DOMAIN}/profile.jpeg`,
      "sameAs": [
        personalInfo.contact.github,
        personalInfo.contact.linkedin,
        "https://school.alex.runs-on.dev",
        "https://himamritshop.in",
        "https://cloudpower.store",
        "https://info.cloudpower.store"
      ],
      "knowsAbout": [
        "Cross-Platform Flutter Architecture",
        "Model Context Protocol (MCP)",
        "Agentic AI Integration & Tool Use",
        "FastAPI Python Telemetry & Microservices",
        "Java Enterprise Concurrency & Spring Boot",
        "C# .NET Enterprise Architecture",
        "PostgreSQL Multi-Tenant Schema Design",
        "Redis In-Memory Distributed Caching",
        "Clean Architecture & Domain-Driven Design"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_DOMAIN}/#website`,
      "url": `${BASE_DOMAIN}/`,
      "name": `${personalInfo.name} Portfolio`,
      "description": `Portfolio and engineering systems archive of ${personalInfo.name}.`,
      "publisher": {
        "@id": `${BASE_DOMAIN}/#person`
      },
      "inLanguage": "en-US"
    }
  ];

  // Breadcrumbs
  if (route.breadcrumbs && route.breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${route.canonical}#breadcrumbs`,
      "itemListElement": route.breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": b.name,
        "item": b.url
      }))
    });
  }

  // Route-specific WebPage
  const pageSchema = {
    "@type": route.schemaType || "WebPage",
    "@id": `${route.canonical}#webpage`,
    "url": route.canonical,
    "name": route.title,
    "description": route.description,
    "isPartOf": {
      "@id": `${BASE_DOMAIN}/#website`
    },
    "inLanguage": "en-US",
    "breadcrumb": {
      "@id": `${route.canonical}#breadcrumbs`
    }
  };

  if (route.path === '/') {
    pageSchema.about = { "@id": `${BASE_DOMAIN}/#person` };
    pageSchema.primaryImageOfPage = `${BASE_DOMAIN}/profile.jpeg`;
  } else if (route.path === '/about' || route.path === '/contact') {
    pageSchema.mainEntity = { "@id": `${BASE_DOMAIN}/#person` };
  } else if (route.certData) {
    const cert = route.certData;
    pageSchema.mainEntity = {
      "@type": "EducationalOccupationalCredential",
      "@id": `${route.canonical}#credential`,
      "name": cert.title,
      "credentialCategory": "certificate",
      "educationalLevel": "Professional Specialization",
      "description": cert.summary,
      "recognizedBy": {
        "@type": "Organization",
        "name": cert.provider
      },
      "competencyRequired": cert.appliedCompetency,
      "identifier": cert.credentialId,
      "dateCreated": cert.issueDate,
      "url": cert.verificationUrl
    };
  } else if (route.path === '/projects') {
    pageSchema.hasPart = projects.map(p => ({
      "@type": p.category === "Distributed Ecosystem" || p.category === "E-Commerce" || p.category === "Interactive Web Architecture"
        ? "SoftwareApplication"
        : "SoftwareApplication",
      "name": p.title,
      "description": p.subtitle,
      "applicationCategory": p.category === "E-Commerce" ? "ShoppingApplication" : "DeveloperApplication",
      "operatingSystem": "Web, Android, iOS",
      "creator": { "@id": `${BASE_DOMAIN}/#person` },
      ...(p.liveUrl ? { "url": p.liveUrl } : {})
    }));
  } else if (route.path === '/certifications') {
    pageSchema.hasPart = specializations.map(c => ({
      "@type": "EducationalOccupationalCredential",
      "name": c.title,
      "credentialCategory": "certificate",
      "description": c.summary,
      "recognizedBy": {
        "@type": "Organization",
        "name": c.provider
      },
      "identifier": c.credentialId,
      "url": c.verificationUrl
    }));
  }

  graph.push(pageSchema);

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph
  }, null, 2);
}

// Main Prerendering Pipeline
export async function prerender() {
  console.log('🚀 Starting Production Prerendering Pipeline...');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist/ directory not found. Please run "vite build" first.');
    process.exit(1);
  }

  const baseHtmlPath = path.resolve(DIST_DIR, 'index.html');
  if (!fs.existsSync(baseHtmlPath)) {
    console.error('❌ dist/index.html not found. Ensure Vite built the main entry.');
    process.exit(1);
  }

  const baseTemplate = fs.readFileSync(baseHtmlPath, 'utf8');
  const routes = getRoutesConfig();
  console.log(`📋 Found ${routes.length} public canonical routes to prerender.`);

  for (const route of routes) {
    const outFilePath = path.resolve(DIST_DIR, route.outFile);
    const outDir = path.dirname(outFilePath);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    // Generate Route Content
    const innerHtml = `
      <div class="app-container">
        <a href="#main-content" class="skip-link" style="position: absolute; top: -100px; left: 16px; background: #0284c7; color: #fff; padding: 8px 16px; border-radius: 4px; z-index: 9999; text-decoration: none;">Skip to primary content</a>
        ${renderHeader(route.path)}
        <main id="main-content" class="content-wrapper" role="main">
          ${route.renderContent()}
        </main>
        ${renderFooter()}
      </div>
    `;

    const jsonLdString = generateJsonLd(route);

    // Replace Head Elements in Template
    let html = baseTemplate;

    // 1. Title
    html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(route.title)}</title>`);

    // 2. Meta Description
    html = html.replace(
      /<meta\s+name=["']description["'][^>]*>/i,
      `<meta name="description" content="${escapeHtml(route.description)}" />`
    );

    // 3. Canonical URL
    html = html.replace(
      /<link\s+rel=["']canonical["'][^>]*>/i,
      `<link rel="canonical" href="${escapeHtml(route.canonical)}" />`
    );

    // 4. Open Graph Tags
    html = html.replace(
      /<meta\s+property=["']og:title["'][^>]*>/i,
      `<meta property="og:title" content="${escapeHtml(route.title)}" />`
    );
    html = html.replace(
      /<meta\s+property=["']og:description["'][^>]*>/i,
      `<meta property="og:description" content="${escapeHtml(route.description)}" />`
    );
    html = html.replace(
      /<meta\s+property=["']og:url["'][^>]*>/i,
      `<meta property="og:url" content="${escapeHtml(route.canonical)}" />`
    );
    html = html.replace(
      /<meta\s+property=["']og:type["'][^>]*>/i,
      `<meta property="og:type" content="${escapeHtml(route.type)}" />`
    );

    // 4b. Open Graph Image
    html = html.replace(
      /<meta\s+property=["']og:image["'][^>]*>/i,
      `<meta property="og:image" content="${OG_IMAGE_URL}" />`
    );
    if (!html.includes('property="og:image"')) {
      html = html.replace('</head>', `  <meta property="og:image" content="${OG_IMAGE_URL}" />\n</head>`);
    }

    // 5. Twitter Card Tags
    html = html.replace(
      /<meta\s+name=["']twitter:title["'][^>]*>/i,
      `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
    );
    html = html.replace(
      /<meta\s+name=["']twitter:description["'][^>]*>/i,
      `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
    );
    html = html.replace(
      /<meta\s+name=["']twitter:url["'][^>]*>/i,
      `<meta name="twitter:url" content="${escapeHtml(route.canonical)}" />`
    );
    html = html.replace(
      /<meta\s+name=["']twitter:image["'][^>]*>/i,
      `<meta name="twitter:image" content="${OG_IMAGE_URL}" />`
    );
    if (!html.includes('name="twitter:image"')) {
      html = html.replace('</head>', `  <meta name="twitter:image" content="${OG_IMAGE_URL}" />\n</head>`);
    }

    // 6. JSON-LD
    html = html.replace(
      /<script\s+type=["']application\/ld\+json["']>.*?<\/script>/s,
      `<script type="application/ld+json">\n${jsonLdString}\n  </script>`
    );

    // 7. Inject Semantic Prerendered HTML into <div id="root">
    html = html.replace(
      /<div\s+id=["']root["']><\/div>/,
      `<div id="root">${innerHtml}</div>`
    );

    fs.writeFileSync(outFilePath, html, 'utf8');
    console.log(`  ✓ Prerendered: ${route.path} → dist/${route.outFile} (${(html.length / 1024).toFixed(1)} KB)`);
  }

  // Ensure CNAME exists in dist
  const cnameDest = path.resolve(DIST_DIR, 'CNAME');
  fs.writeFileSync(cnameDest, 'alex.runs-on.dev\n', 'utf8');
  console.log('  ✓ Verified CNAME: alex.runs-on.dev');

  // Ensure 404.html fallback exists in dist
  const notFoundPublic = path.resolve(ROOT_DIR, 'public/404.html');
  const notFoundDest = path.resolve(DIST_DIR, '404.html');
  if (fs.existsSync(notFoundPublic)) {
    fs.copyFileSync(notFoundPublic, notFoundDest);
    console.log('  ✓ Synced 404.html with custom root domain redirect script');
  }

  // Ensure sitemap.xml exists in dist
  const sitemapPublic = path.resolve(ROOT_DIR, 'public/sitemap.xml');
  const sitemapDest = path.resolve(DIST_DIR, 'sitemap.xml');
  if (fs.existsSync(sitemapPublic)) {
    fs.copyFileSync(sitemapPublic, sitemapDest);
    console.log('  ✓ Synced sitemap.xml to dist/');
  }

  // Ensure robots.txt exists in dist
  const robotsPublic = path.resolve(ROOT_DIR, 'public/robots.txt');
  const robotsDest = path.resolve(DIST_DIR, 'robots.txt');
  if (fs.existsSync(robotsPublic)) {
    fs.copyFileSync(robotsPublic, robotsDest);
    console.log('  ✓ Synced robots.txt to dist/');
  }

  // Ensure og-image.png and site.webmanifest exist in dist
  const ogImagePublic = path.resolve(ROOT_DIR, 'public/og-image.png');
  const ogImageDest = path.resolve(DIST_DIR, 'og-image.png');
  if (fs.existsSync(ogImagePublic)) {
    fs.copyFileSync(ogImagePublic, ogImageDest);
    console.log('  ✓ Synced og-image.png to dist/');
  }

  const manifestPublic = path.resolve(ROOT_DIR, 'public/site.webmanifest');
  const manifestDest = path.resolve(DIST_DIR, 'site.webmanifest');
  if (fs.existsSync(manifestPublic)) {
    fs.copyFileSync(manifestPublic, manifestDest);
    console.log('  ✓ Synced site.webmanifest to dist/');
  }

  // Clean up cache
  if (fs.existsSync(CACHE_DIR)) {
    fs.rmSync(CACHE_DIR, { recursive: true, force: true });
  }

  console.log('🎉 Prerendering pipeline completed successfully!');
}

prerender().catch(err => {
  console.error('Prerendering failed:', err);
  process.exit(1);
});


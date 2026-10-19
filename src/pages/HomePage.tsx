import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight,
  Globe,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { personalInfo } from '../data/personal';
import { projects } from '../data/projects';
import { specializations } from '../data/credentials';
import { CertificateHoverCard } from '../components/CertificateHoverCard';
import { HeroProfileCard } from '../components/HeroProfileCard';

interface HomePageProps {
  onNavigate: (path: string, sectionId?: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Only the top 2 featured projects for the concise home page
  const featuredProjects = projects.filter((p) => p.isFeatured).slice(0, 2);

  // Exactly 3 featured certificates for Homepage preview:
  // 1. Flutter — Tutedude (TD-RAMA-FL-1356, 30 July 2026)
  // 2. Tooling, MCP, and Agent Execution Environments — Microsoft (16 September 2026)
  // 3. Designing Agent Architecture and SDLC Integration — Microsoft (16 September 2026)
  const homeFeaturedCertIds = ['spec-flutter', 'spec-mcp-agent-env', 'spec-agent-sdlc'];
  const previewSpecializations = homeFeaturedCertIds
    .map((id) => specializations.find((s) => s.id === id))
    .filter((s): s is (typeof specializations)[0] => Boolean(s));

  // Hero Scroll-linked Parallax & Move Animations
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001,
  });

  const heroLeftY = useTransform(smoothProgress, [0, 1], [0, 75]);
  const heroRightY = useTransform(smoothProgress, [0, 1], [0, 125]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.85], [1, 0.15]);
  const heroScale = useTransform(smoothProgress, [0, 1], [1, 0.95]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="page-home"
      style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}
    >
      {/* ─── 1. HERO SECTION WITH SCROLL REVEAL & 3D SCULPTURE ─── */}
      <section
        ref={heroRef}
        className="section home-hero-section"
        style={{ paddingTop: '40px', paddingBottom: '20px', position: 'relative' }}
        aria-label="Hero"
      >
        <div className="container">
          <div className="home-hero-grid">
            {/* Left Content (Scroll-linked Parallax Plane 1) */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                y: heroLeftY,
                opacity: heroOpacity,
                scale: heroScale,
              }}
            >
              {/* Refined Status Pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-xs)',
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  width: 'fit-content',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#0284c7',
                    boxShadow: '0 0 8px rgba(2, 132, 199, 0.5)',
                  }}
                />
                <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
                  SYSTEMS & COMMERCE ARCHITECT
                </span>
              </div>

              {/* Headline */}
              <div>
                <h1
                  style={{
                    fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                    fontWeight: 900,
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    color: 'var(--text-primary)',
                    marginBottom: '14px',
                  }}
                >
                  {personalInfo.name}
                  <span
                    style={{
                      display: 'block',
                      color: 'var(--accent-teal)',
                      fontSize: 'clamp(1.3rem, 2.4vw, 2rem)',
                      fontWeight: 750,
                      marginTop: '8px',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Distributed Commerce, Agentic Protocols & Mobile Systems
                  </span>
                </h1>

                <p
                  style={{
                    fontSize: 'clamp(1rem, 1.4vw, 1.18rem)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    maxWidth: '680px',
                    fontWeight: 450,
                  }}
                >
                  I architect resilient digital infrastructure: coordinating multi-application logistics ecosystems,
                  deterministic Model Context Protocol (MCP) tool execution harnesses, and high-performance e-commerce platforms.
                </p>
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => onNavigate('/projects', 'projects')}
                  className="btn btn-primary"
                  style={{
                    borderRadius: '9999px',
                    padding: '13px 28px',
                    fontSize: '14px',
                    fontWeight: 700,
                  }}
                >
                  Explore Projects <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/certifications', 'certifications')}
                  className="btn btn-secondary"
                  style={{
                    borderRadius: '9999px',
                    padding: '13px 26px',
                    fontSize: '14px',
                    fontWeight: 650,
                  }}
                >
                  <ShieldCheck size={16} color="#0284c7" /> 11 Verified Credentials
                </button>

                <a
                  href="https://cloudpower.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{
                    borderRadius: '9999px',
                    padding: '13px 22px',
                    fontSize: '13px',
                  }}
                >
                  <Globe size={14} /> cloudpower.store <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>

            {/* Right: Interactive 3D Hero Sculpture */}
            <motion.div
              variants={itemVariants}
              style={{
                position: 'relative',
                y: heroRightY,
                opacity: heroOpacity,
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <HeroProfileCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. CONCISE ABOUT PREVIEW ─── */}
      <section className="section" style={{ padding: '0 0' }} aria-label="About Preview">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass-card liquid-glass-tier-interactive home-about-card"
            style={{
              borderRadius: 'var(--radius-card)',
              alignItems: 'center',
            }}
          >
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-teal)', fontWeight: 700, letterSpacing: '0.06em' }}>
                ABOUT THE ARCHITECT
              </span>
              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginTop: '8px',
                  marginBottom: '14px',
                }}
              >
                Engineering with Formal Invariants & Clean Separation of Concerns
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem' }}>
                I specialize in translating complex commercial requirements into decoupled, highly observable systems.
                From architecting offline-first mobile synchronization in Flutter to implementing Model Context Protocol (MCP)
                execution guardrails and blazing fast React storefronts, my work is built to be deterministic, observable, and production-ready.
              </p>
              <div style={{ marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => onNavigate('/about', 'about')}
                  className="btn btn-secondary"
                  style={{
                    borderRadius: '9999px',
                    padding: '8px 20px',
                    fontSize: '13px',
                    fontWeight: 650,
                  }}
                >
                  Read Full Philosophy & System Journey <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Quick Principles Column */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                background: '#f8f7f4',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-card-sm)',
                padding: '20px',
              }}
            >
              {[
                { title: 'Zero State Fragmentation', desc: 'Single source of truth via event-driven synchronization' },
                { title: 'Deterministic Tool Sandboxing', desc: 'Strict token budgets and policy guardrails for AI agents' },
                { title: 'Sub-Second Responsiveness', desc: 'No bloated bundles or unnecessary runtime indirection' },
              ].map((item) => (
                <div key={item.title} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 3. CURATED FEATURED PROJECTS PREVIEW ─── */}
      <section className="section" style={{ padding: '0 0' }} aria-label="Featured Projects Preview">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}
          >
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-teal)', fontWeight: 700, letterSpacing: '0.06em' }}>
                PORTFOLIO SPOTLIGHT
              </span>
              <h2
                style={{
                  fontSize: 'clamp(1.7rem, 3vw, 2.3rem)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginTop: '6px',
                }}
              >
                Featured Engineering Architectures
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('/projects', 'projects')}
              className="btn btn-primary"
              style={{ borderRadius: '9999px', padding: '10px 22px', fontSize: '13px' }}
            >
              View All {projects.length} Projects <ArrowRight size={14} />
            </button>
          </motion.div>

          <div className="home-projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '28px' }}>
            {featuredProjects.map((proj, idx) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="liquid-glass-card liquid-glass-tier-interactive"
                style={{
                  borderRadius: 'var(--radius-card)',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '20px',
                  position: 'relative',
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--accent-teal)',
                        background: '#e0f2fe',
                        border: '1px solid #bae6fd',
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        fontWeight: 700,
                      }}
                    >
                      {proj.category}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {proj.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                    {proj.title}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {proj.subtitle}
                  </p>

                  {/* Architecture Highlights */}
                  <div
                    style={{
                      background: '#f8f7f4',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-card-sm)',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-teal)', fontWeight: 700 }}>
                      KEY SYSTEM HIGHLIGHTS
                    </span>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {proj.keyFeatures.slice(0, 3).map((feat, i) => (
                        <li key={i} style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', gap: '8px' }}>
                          <span style={{ color: 'var(--accent-teal)' }}>•</span> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {proj.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        style={{
                          background: '#ffffff',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-secondary)',
                          fontSize: '11px',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-pill)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Live Link Buttons */}
                <div style={{ display: 'flex', gap: '10px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ borderRadius: '9999px', padding: '8px 18px', fontSize: '12px', fontWeight: 700 }}
                    >
                      <Globe size={13} /> Live Store <ExternalLink size={11} />
                    </a>
                  )}

                  {proj.secondaryUrl && (
                    <a
                      href={proj.secondaryUrl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ borderRadius: '9999px', padding: '8px 16px', fontSize: '12px' }}
                    >
                      Documentation <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. CORE TECH STACK OVERVIEW ─── */}
      <section className="section" style={{ padding: '0 0' }} aria-label="Core Tech Stack">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass-card liquid-glass-tier-interactive"
            style={{
              borderRadius: 'var(--radius-card)',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              position: 'relative',
              background: '#ffffff',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-teal)', fontWeight: 700, letterSpacing: '0.06em' }}>
                TECHNICAL CAPABILITY
              </span>
              <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                Production Stacks & Architectural Protocols
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '16px' }}>
              {[
                { title: 'Mobile Client Engineering', stack: ['Flutter', 'Dart', 'BLoC Pattern', 'SQLite Cache', 'Background Geolocator'] },
                { title: 'Web & Distributed Commerce', stack: ['React', 'TypeScript', 'Vite', 'RESTful Endpoints', 'WebSocket Sync'] },
                { title: 'Agent Runtimes & MCP', stack: ['Model Context Protocol', 'JSON-RPC 2.0', 'Python Sandboxes', 'Token Budgets'] },
                { title: 'Data & Telemetry', stack: ['Power BI Analytics', 'DAX Pipelines', 'State Machines', 'Logging Traces'] },
              ].map((domain) => (
                <div
                  key={domain.title}
                  style={{
                    background: '#f8f7f4',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-card-sm)',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 750, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                    {domain.title}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {domain.stack.map((t) => (
                      <span
                        key={t}
                        style={{
                          background: '#e0f2fe',
                          border: '1px solid #bae6fd',
                          color: 'var(--accent-teal)',
                          fontSize: '11px',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-pill)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 5. CERTIFICATION PREVIEW (With Emerging Hover Cards) ─── */}
      <section className="section" style={{ padding: '0 0' }} aria-label="Certifications Preview">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}
          >
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-teal)', fontWeight: 700, letterSpacing: '0.06em' }}>
                VERIFIED CREDENTIALS
              </span>
              <h2
                style={{
                  fontSize: 'clamp(1.7rem, 3vw, 2.3rem)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginTop: '6px',
                }}
              >
                Specializations & Continuous Competency
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', marginTop: '6px' }}>
                Directly explore verified specializations from Microsoft Learn and Tutedude with authentic credentials and curriculum records.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('/certifications', 'certifications')}
              className="btn btn-primary"
              style={{ borderRadius: '9999px', padding: '10px 22px', fontSize: '13px' }}
            >
              Browse All 11 Certifications <ArrowRight size={14} />
            </button>
          </motion.div>

          <div className="home-credentials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))', gap: '24px' }}>
            {previewSpecializations.map((spec, idx) => (
              <motion.div
                key={spec.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <CertificateHoverCard
                  specialization={spec}
                  onNavigate={onNavigate}
                />
              </motion.div>
            ))}
          </div>

          {/* Prominent View All Certifications Navigation Link */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
            <button
              type="button"
              onClick={() => onNavigate('/certifications', 'certifications')}
              className="btn btn-secondary"
              style={{
                borderRadius: '9999px',
                padding: '12px 30px',
                fontSize: '13.5px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              View All 11 Verified Certifications <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── 6. CONTACT CALL TO ACTION BANNER ─── */}
      <section className="section" style={{ padding: '0 0 40px 0' }} aria-label="Contact Call To Action">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                borderRadius: '36px',
                background: '#ffffff',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-md)',
                padding: '48px 36px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '18px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--accent-teal)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  background: '#e0f2fe',
                  padding: '4px 14px',
                  borderRadius: '9999px',
                  border: '1px solid #bae6fd',
                }}
              >
                START AN ARCHITECTURAL DIALOGUE
              </span>

              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  color: 'var(--text-primary)',
                  maxWidth: '720px',
                  lineHeight: 1.2,
                }}
              >
                Ready to engineer resilient commerce or autonomous agent systems?
              </h2>

              <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', fontSize: '1rem', lineHeight: 1.6 }}>
                Whether you are discussing distributed systems, contract engineering, or high-throughput commercial applications, let's connect.
              </p>

              <button
                type="button"
                onClick={() => onNavigate('/contact', 'contact')}
                className="btn btn-primary"
                style={{ borderRadius: '9999px', padding: '14px 34px', fontSize: '15px', fontWeight: 700, marginTop: '8px' }}
              >
                Open Direct Contact Channels <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .home-hero-grid,
          .home-about-card {
            grid-template-columns: 1fr !important;
          }
          .home-about-card {
            padding: clamp(20px, 5vw, 32px) !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

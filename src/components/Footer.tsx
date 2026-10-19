import React, { useState, useEffect } from 'react';
import {
  Globe,
  ArrowUpRight,
  Mail,
  ShieldCheck,
  Terminal,
  ArrowUp,
  Activity,
  Check,
  Copy,
  ExternalLink,
  Layers,
  Award
} from 'lucide-react';
import { personalInfo } from '../data/personal';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Footer: React.FC = () => {
  const [copiedPgp, setCopiedPgp] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyPgp = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('4A7F 92B1 C08D E35F 7A11 9B02 D4E8 F61C');
    setCopiedPgp(true);
    setTimeout(() => setCopiedPgp(false), 2200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        {/* ─── 1. TOP TELEMETRY STATUS BAR (INSTRUMENT CONSOLE) ─── */}
        <div className="footer-status-bar">
          <div className="footer-status-item">
            <span className="footer-status-dot pulse-emerald" aria-hidden="true" />
            <span className="footer-status-label">SYSTEM STATUS:</span>
            <span className="footer-status-val">ALL ENDPOINTS OPERATIONAL</span>
          </div>

          <div className="footer-status-divider" />

          <div className="footer-status-item">
            <Activity size={13} className="text-accent" aria-hidden="true" />
            <span className="footer-status-label">LATENCY:</span>
            <span className="footer-status-val">~12ms EDGE SYNC</span>
          </div>

          <div className="footer-status-divider" />

          <div className="footer-status-item">
            <Terminal size={13} className="text-accent" aria-hidden="true" />
            <span className="footer-status-label">RUN-ENV:</span>
            <span className="footer-status-val">REACT 19 · TS 5.8 · VITE</span>
          </div>

          <div className="footer-status-divider" />

          <div className="footer-status-item">
            <span className="footer-status-label">TELEMETRY:</span>
            <span className="footer-status-val font-mono">{currentTime || 'ONLINE'}</span>
          </div>
        </div>

        {/* ─── 2. MAIN ENGINEERING CONSOLE GRID (3-COLUMNS) ─── */}
        <div className="footer-main-grid">
          {/* Column 1: Identity & Architecture Manifesto */}
          <div className="footer-col footer-col-brand">
            <div className="footer-brand-header">
              <div className="footer-brand-glyph" aria-hidden="true">R</div>
              <div>
                <h3 className="footer-brand-name">{personalInfo.name}</h3>
                <span className="footer-brand-role">Application Engineer & Systems Builder</span>
              </div>
            </div>

            <p className="footer-manifesto">
              Architecting production multi-application logistics ecosystems, deterministic
              Model Context Protocol (MCP) agent harnesses, and high-throughput mobile clients.
              Engineered with defensive type runtimes and precision tactile interfaces.
            </p>

            {/* PGP Security & Architecture Identity Tag */}
            <div className="footer-pgp-card" onClick={handleCopyPgp} role="button" tabIndex={0} title="Click to copy verified fingerprint">
              <div className="footer-pgp-left">
                <ShieldCheck size={14} className="text-emerald" />
                <span className="footer-pgp-text">KEY ID: 4A7F 92B1 C08D E35F</span>
              </div>
              <span className="footer-pgp-action">
                {copiedPgp ? (
                  <span className="text-emerald font-semibold" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    <Check size={12} /> Copied
                  </span>
                ) : (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    <Copy size={12} /> Copy
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Column 2: Live Deployments & Key Production Systems */}
          <div className="footer-col footer-col-links">
            <h4 className="footer-col-title">
              <Globe size={14} aria-hidden="true" />
              <span>Production Deployments</span>
            </h4>

            <ul className="footer-links-list">
              <li>
                <a
                  href="https://cloudpower.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-nav-link"
                >
                  <div className="footer-link-content">
                    <span className="footer-link-name">cloudpower.store</span>
                    <span className="footer-link-desc">Enterprise 6-Portal Commerce Engine</span>
                  </div>
                  <ArrowUpRight size={13} className="footer-link-arrow" />
                </a>
              </li>

              <li>
                <a
                  href="https://himamritshop.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-nav-link"
                >
                  <div className="footer-link-content">
                    <span className="footer-link-name">himamritshop.in</span>
                    <span className="footer-link-desc">High-Throughput Grocery & Retail App</span>
                  </div>
                  <ArrowUpRight size={13} className="footer-link-arrow" />
                </a>
              </li>

              <li>
                <a
                  href="https://alex-prototype.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-nav-link"
                >
                  <div className="footer-link-content">
                    <span className="footer-link-name">MountWEB Prototype</span>
                    <span className="footer-link-desc">Interactive Tourism & Booking Platform</span>
                  </div>
                  <ArrowUpRight size={13} className="footer-link-arrow" />
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/JRalex07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-nav-link"
                >
                  <div className="footer-link-content">
                    <span className="footer-link-name">GitHub Repositories</span>
                    <span className="footer-link-desc">20+ Open Systems & MCP Tools</span>
                  </div>
                  <ArrowUpRight size={13} className="footer-link-arrow" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation, Channels & Direct Contact */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-col-title">
              <Layers size={14} aria-hidden="true" />
              <span>Navigation & Direct Channels</span>
            </h4>

            {/* Quick Navigation Pills */}
            <div className="footer-pills-row">
              <a href="/projects" className="footer-pill-btn">
                Projects
              </a>
              <a href="/certifications" className="footer-pill-btn">
                <Award size={12} /> Credentials
              </a>
              <a href="/ecosystem" className="footer-pill-btn">
                Ecosystem
              </a>
              <a href="/about" className="footer-pill-btn">
                About
              </a>
              <a href="/contact" className="footer-pill-btn">
                Contact
              </a>
            </div>

            {/* Tactile Contact Pushbuttons */}
            <div className="footer-social-row">
              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={15} />
                <span>GitHub</span>
                <ExternalLink size={10} className="footer-social-ext" />
              </a>

              <a
                href={personalInfo.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={15} />
                <span>LinkedIn</span>
                <ExternalLink size={10} className="footer-social-ext" />
              </a>

              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="footer-social-btn"
                aria-label="Send Direct Email"
              >
                <Mail size={15} />
                <span>Email</span>
                <ExternalLink size={10} className="footer-social-ext" />
              </a>
            </div>

            <div className="footer-email-box">
              <span className="footer-email-label">PRIMARY INQUIRIES</span>
              <a href={`mailto:${personalInfo.contact.email}`} className="footer-email-val">
                {personalInfo.contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* ─── 3. BOTTOM COLOPHON & RETURN-TO-TOP CHASSIS ─── */}
        <div className="footer-colophon-bar">
          <div className="footer-colophon-left">
            <span className="footer-copyright">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </span>
            <span className="footer-build-signature">
              Precision Skeuomorphic Architecture · Deterministic State Engineering
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-to-top-btn"
            aria-label="Return to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={14} className="footer-top-arrow" />
          </button>
        </div>
      </div>
    </footer>
  );
};

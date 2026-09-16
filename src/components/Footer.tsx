import React from 'react';
import { Globe, ArrowUpRight, Mail } from 'lucide-react';
import { personalInfo } from '../data/personal';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-inner">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <div className="brand-glyph" style={{ width: '22px', height: '22px', fontSize: '11px' }}>R</div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-primary)' }}>
                {personalInfo.name}
              </span>
            </div>
            <p className="footer-colophon">
              Engineered with React 19, TypeScript, and Framer Motion. High-performance Neomorphism design system.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
            <a
              href="https://cloudpower.store"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono"
              style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontWeight: 650 }}
            >
              <Globe size={13} aria-hidden="true" />
              <span>cloudpower.store</span>
              <ArrowUpRight size={11} aria-hidden="true" />
            </a>

            <a
              href="https://himamritshop.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono"
              style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontWeight: 650 }}
            >
              <Globe size={13} aria-hidden="true" />
              <span>himamritshop.in</span>
              <ArrowUpRight size={11} aria-hidden="true" />
            </a>

            <a
              href={personalInfo.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono"
              style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontWeight: 650 }}
            >
              <span>GitHub (JRalex07)</span>
              <ArrowUpRight size={11} aria-hidden="true" />
            </a>

            <a
              href={personalInfo.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono"
              style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontWeight: 650 }}
            >
              <span>LinkedIn (jralex07)</span>
              <ArrowUpRight size={11} aria-hidden="true" />
            </a>

            <a
              href={`mailto:${personalInfo.contact.email}`}
              className="text-mono"
              style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontWeight: 650 }}
            >
              <Mail size={13} aria-hidden="true" />
              <span>{personalInfo.contact.email}</span>
            </a>

            <span className="text-mono text-muted" style={{ fontSize: '0.75rem' }}>
              © {new Date().getFullYear()} {personalInfo.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

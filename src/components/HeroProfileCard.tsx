import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/personal';

export const HeroProfileCard: React.FC = () => {
  // Base URL helper for GitHub Pages sub-path support ('/Portfolio/' in prod, '/' in dev)
  const BASE = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  const profileImg = `${BASE}profile.jpeg`;

  return (
    <motion.div
      className="hero-3d-sculpture-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '480px',
        minHeight: '380px',
        height: 'auto',
        background: '#ffffff',
        border: '1px solid var(--border-subtle)',
        borderRadius: '32px',
        boxShadow: '0 20px 48px -12px rgba(18, 20, 23, 0.08), 0 4px 16px rgba(18, 20, 23, 0.03)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      aria-label={`${personalInfo.name} — Profile Portrait`}
    >
      {/* Top Telemetry / Status Badge */}
      <div className="hero-3d-badge">
        <span
          aria-hidden="true"
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: '#059669',
            boxShadow: '0 0 8px rgba(5, 150, 105, 0.6)',
          }}
        />
        <span className="hero-3d-badge-text">
          {personalInfo.name} · Systems & Architecture
        </span>
      </div>

      {/* Profile Image Portrait Showcase */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 'clamp(36px, 6vw, 48px) 16px',
          background: 'radial-gradient(circle at 50% 50%, rgba(2, 132, 199, 0.04) 0%, transparent 70%)',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 'clamp(200px, 58vw, 280px)',
            height: 'clamp(200px, 58vw, 280px)',
            borderRadius: '28px',
            overflow: 'hidden',
            border: '2px solid var(--border-subtle)',
            boxShadow: '0 12px 32px -6px rgba(18, 20, 23, 0.12), 0 2px 8px rgba(18, 20, 23, 0.04)',
            background: 'var(--bg-canvas)',
          }}
        >
          <img
            src={profileImg}
            alt={personalInfo.name}
            loading="eager"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.4s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </div>
      </div>

      {/* Bottom Capabilities Strip */}
      <div className="hero-3d-footer" style={{ flexWrap: 'wrap', justifyContent: 'center', gap: '6px' }}>
        <span className="hero-3d-node-label">● Application Engineer</span>
        <span className="hero-3d-node-label">● Distributed Commerce</span>
        <span className="hero-3d-node-label">● MCP Runtime</span>
      </div>
    </motion.div>
  );
};

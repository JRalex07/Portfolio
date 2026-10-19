import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { personalInfo } from '../data/personal';
import { timelineMilestones } from '../data/timeline';

interface AboutPageProps {
  onNavigate?: (path: string, sectionId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="page-about"
      style={{ display: 'flex', flexDirection: 'column', gap: '56px', paddingBottom: '60px' }}
    >
      {/* ─── PAGE HEADER ─── */}
      <section className="section" style={{ paddingTop: '36px', paddingBottom: '10px' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: '840px', display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent-teal)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                background: 'rgba(2, 132, 199, 0.08)',
                border: '1px solid rgba(2, 132, 199, 0.22)',
                padding: '4px 14px',
                borderRadius: '9999px',
                width: 'fit-content',
              }}
            >
              ENGINEERING PHILOSOPHY & JOURNEY
            </span>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              Architectural Discipline, Strict State Invariants & System Clarity
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 450 }}>
              An in-depth perspective on how I reason through distributed systems, design deterministic execution harnesses,
              and coordinate multi-tier applications across web and mobile.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── BIO & PRINCIPLES SPLIT ─── */}
      <section className="section" style={{ padding: '0 0' }}>
        <div className="container">
          <div className="about-split-grid">
            {/* Left: Detailed Narrative & Focus Areas */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              <div
                style={{
                  borderRadius: '24px',
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                  padding: 'clamp(18px, 4.5vw, 36px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-teal)', fontWeight: 700 }}>
                    SYSTEMS_PERSPECTIVE.MD
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      background: 'var(--bg-inset)',
                      border: '1px solid var(--border-subtle)',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-pill)',
                    }}
                  >
                    Core Architecture
                  </span>
                </div>

                {personalInfo.summary.map((para, i) => (
                  <p key={i} style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Specialization Domains */}
              <div
                style={{
                  borderRadius: '24px',
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                  padding: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-teal)', fontWeight: 700 }}>
                  CORE PRACTICAL COMPETENCIES
                </span>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                  {personalInfo.focusAreas.map((area, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: 'var(--bg-inset)',
                        border: '1px solid var(--border-subtle)',
                        padding: '10px 18px',
                        borderRadius: 'var(--radius-pill)',
                      }}
                    >
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: 'rgba(2, 132, 199, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--accent-teal)',
                          flexShrink: 0,
                        }}
                      >
                        <Check size={14} />
                      </div>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        {area}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Guiding Engineering Principles */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              <span
                style={{
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                }}
              >
                Guiding Engineering Principles
              </span>

              {personalInfo.principles.map((principle, idx) => (
                <div
                  key={idx}
                  className="liquid-glass-card"
                  style={{
                    background: 'var(--skeuo-plate-bg)',
                    border: '1px solid var(--skeuo-plate-border)',
                    borderRadius: 'var(--radius-card-sm)',
                    padding: 'clamp(16px, 4vw, 24px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    boxShadow: 'var(--skeuo-plate-shadow)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(2, 132, 199, 0.08)',
                        border: '1px solid rgba(2, 132, 199, 0.22)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-teal)',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        fontSize: '12px',
                      }}
                    >
                      0{idx + 1}
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-heading)', fontWeight: 750, color: 'var(--text-primary)' }}>
                      {principle.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    {principle.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SYSTEM MILESTONES TIMELINE ─── */}
      <section className="section" style={{ padding: '0 0' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '32px' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-teal)', fontWeight: 700, letterSpacing: '0.06em' }}>
              CHRONOLOGICAL TRACK RECORD
            </span>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
              Key Architecture & Certification Milestones
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {timelineMilestones.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="timeline-row"
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '20px',
                  padding: 'clamp(16px, 4vw, 24px) clamp(16px, 4vw, 28px)',
                  alignItems: 'center',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-teal)', fontFamily: 'var(--font-heading)' }}>
                    {milestone.year}
                  </div>
                  {milestone.quarter && (
                    <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      {milestone.quarter}
                    </div>
                  )}
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: '6px',
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono)',
                      color: '#7c3aed',
                      background: 'rgba(124, 58, 237, 0.08)',
                      border: '1px solid rgba(124, 58, 237, 0.2)',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-pill)',
                    }}
                  >
                    {milestone.category}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading)', fontWeight: 750, color: 'var(--text-primary)' }}>
                    {milestone.title}
                  </h3>
                  <div style={{ fontSize: '0.86rem', color: 'var(--accent-teal)', fontWeight: 600 }}>
                    {milestone.subtitle}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {milestone.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                    {milestone.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          background: 'var(--bg-canvas)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-muted)',
                          fontSize: '11px',
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-pill)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .about-split-grid {
            grid-template-columns: 1fr !important;
          }
          .timeline-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

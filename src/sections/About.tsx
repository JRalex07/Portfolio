import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { personalInfo } from '../data/personal';
import { ShieldAlert, Cpu, GitCommit, Check } from 'lucide-react';
import { Reveal, StaggerReveal, StaggerChild, HoverCard } from '../components/MotionReveal';

export const About: React.FC = () => {
  return (
    <section id="about" className="section" aria-label="About Raman Kumar Sharma">
      <div className="container">
        <SectionHeading
          kicker="Engineering Profile"
          title="Bridging Client Experience with Coordinated System Runtimes"
          description="A technical view into what I build, how I reason through architectures, and the principles governing my engineering workflow."
        />

        <div className="arch-grid-split">
          {/* Left Column: Narrative Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <Reveal variant="left">
              <div className="arch-frame">
                <div className="arch-frame-header">
                  <span className="arch-tag">SYSTEMS_PERSPECTIVE.MD</span>
                  <span className="badge badge-teal">Core Focus</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {personalInfo.summary.map((para, i) => (
                    <motion.p
                      key={i}
                      style={{ fontSize: '0.9375rem', lineHeight: 1.7 }}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Practical Focus Checklist */}
            <Reveal variant="left" delay={0.1}>
              <div className="arch-frame">
                <div className="arch-frame-header">
                  <span className="arch-tag">SPECIALIZATION_DOMAINS</span>
                </div>
                <StaggerReveal style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-3)' }} fast>
                  {personalInfo.focusAreas.map((area, idx) => (
                    <StaggerChild key={idx}>
                      <motion.div
                        style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}
                        whileHover={{ x: 4, transition: { duration: 0.2 } }}
                      >
                        <motion.div
                          style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(14, 165, 233, 0.12)', border: 'var(--nm-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-teal)', boxShadow: 'var(--nm-shadow-xs)', flexShrink: 0 }}
                          whileHover={{ scale: 1.2, backgroundColor: 'rgba(14, 165, 233, 0.22)' }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                        </motion.div>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                          {area}
                        </span>
                      </motion.div>
                    </StaggerChild>
                  ))}
                </StaggerReveal>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Architectural Principles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Reveal variant="right">
              <span className="text-mono" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 650, color: 'var(--text-muted)' }}>
                Guiding Engineering Principles
              </span>
            </Reveal>

            <StaggerReveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }} delay={0.1}>
              {personalInfo.principles.map((principle, index) => (
                <StaggerChild key={index} variant="right">
                  <HoverCard>
                    <div className="arch-frame" style={{ padding: 'var(--space-5)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                        {index === 0 && <Cpu size={18} color="var(--accent-teal)" aria-hidden="true" />}
                        {index === 1 && <GitCommit size={18} color="var(--accent-amber)" aria-hidden="true" />}
                        {index === 2 && <Cpu size={18} color="var(--accent-blue)" aria-hidden="true" />}
                        {index === 3 && <ShieldAlert size={18} color="var(--accent-emerald)" aria-hidden="true" />}
                        <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 750 }}>{principle.title}</h4>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                        {principle.desc}
                      </p>
                    </div>
                  </HoverCard>
                </StaggerChild>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

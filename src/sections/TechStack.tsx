import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { skillCategories } from '../data/skills';
import { Layers, Terminal, Cpu, BarChart3 } from 'lucide-react';
import { StaggerReveal, StaggerChild } from '../components/MotionReveal';

const iconMap = [
  <Layers size={18} color="var(--accent-teal)" aria-hidden="true" />,
  <Terminal size={18} color="var(--accent-blue)" aria-hidden="true" />,
  <Cpu size={18} color="var(--accent-amber)" aria-hidden="true" />,
  <BarChart3 size={18} color="var(--accent-emerald)" aria-hidden="true" />,
];

export const TechStack: React.FC = () => {
  return (
    <section id="stack" className="section" aria-label="Technical Proficiencies">
      <div className="container">
        <SectionHeading
          kicker="Verified Capabilities"
          title="Technology Stack & Systems Competencies"
          description="Technologies and runtime environments actively utilized across production mobile, backend architectures, and agentic workflows."
        />

        <StaggerReveal className="arch-grid-2" delay={0.05}>
          {skillCategories.map((category, idx) => (
            <StaggerChild key={idx} variant="scale">
              <div className="arch-frame" style={{ height: '100%' }}>
                <div className="arch-frame-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.15, transition: { duration: 0.2 } }}
                    >
                      {iconMap[idx]}
                    </motion.div>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 750 }}>{category.title}</h3>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'var(--space-4)', fontWeight: 450 }}>
                  {category.subtitle}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {category.skills.map((skill, sIdx) => (
                    <motion.div
                      key={sIdx}
                      style={{
                        padding: 'var(--space-3) var(--space-4)',
                        background: 'var(--bg-card)',
                        border: 'var(--nm-border)',
                        boxShadow: 'var(--nm-shadow-xs)',
                        borderRadius: 'var(--radius-xs)',
                        cursor: 'default'
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.4, delay: sIdx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{
                        x: 4,
                        boxShadow: 'var(--nm-shadow-md)',
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 650 }}>
                          {skill.name}
                        </span>
                        <motion.span
                          className="badge badge-teal"
                          style={{ fontSize: '10px' }}
                          whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
                        >
                          {skill.level}
                        </motion.span>
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                        {skill.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </StaggerChild>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
};

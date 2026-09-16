import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { timelineMilestones } from '../data/timeline';

export const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="section" aria-label="Milestones Trajectory">
      <div className="container">
        <SectionHeading
          kicker="Engineering Trajectory"
          title="Technical Milestones & Learning Milestones"
          description="Chronological record of verified skill certifications, architectural systems design, and agentic framework integration."
        />

        <div className="timeline-container">
          {timelineMilestones.map((item, idx) => (
            <motion.div
              key={idx}
              className="timeline-node"
              initial={{ opacity: 0, x: idx % 2 === 0 ? -28 : 28, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <motion.div
                className="timeline-marker"
                aria-hidden="true"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 + 0.2, ease: [0.34, 1.56, 0.64, 1] as const }}
              />
              <motion.div
                className="timeline-card"
                whileHover={{
                  y: -4,
                  boxShadow: 'var(--nm-shadow-hover)',
                  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }
                }}
              >
                <div className="timeline-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span className="timeline-year">
                      {item.year} {item.quarter && `[${item.quarter}]`}
                    </span>
                    <motion.span
                      className="badge badge-teal"
                      whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
                    >
                      {item.category}
                    </motion.span>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.125rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    {item.subtitle}
                  </p>
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {item.description}
                </p>

                <motion.div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)', marginTop: 'var(--space-2)' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.07 + 0.3 }}
                >
                  {item.tags.map((tag, tIdx) => (
                    <motion.span
                      key={tag}
                      className="code-tag"
                      style={{ fontSize: '10px' }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: idx * 0.07 + 0.3 + tIdx * 0.04 }}
                      whileHover={{ scale: 1.07, transition: { duration: 0.15 } }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

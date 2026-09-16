import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { SpecializationModal } from '../components/SpecializationModal';
import { specializations, Specialization } from '../data/credentials';
import { BookOpen, Cpu, ArrowRight } from 'lucide-react';
import { Reveal } from '../components/MotionReveal';

export const Specializations: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedSpec, setSelectedSpec] = useState<Specialization | null>(null);

  const filters = [
    { label: 'All', count: specializations.length },
    { label: 'AI & Agents', count: specializations.filter((c) => c.category === 'AI & Agents').length },
    { label: 'Software Engineering', count: specializations.filter((c) => c.category === 'Software Engineering').length },
    { label: 'Mobile Architecture', count: specializations.filter((c) => c.category === 'Mobile Architecture').length },
    { label: 'Data & Analytics', count: specializations.filter((c) => c.category === 'Data & Analytics').length },
  ];

  const filteredSpecs = specializations.filter((spec) => {
    if (activeFilter === 'All') return true;
    return spec.category === activeFilter;
  });

  return (
    <section id="specializations" className="section" aria-label="Technical Specializations & Applied Knowledge">
      <div className="container">
        <SectionHeading
          kicker="Engineering Competencies"
          title="Specialized Curriculums & Technical Knowledge"
          description="In-depth training and applied engineering proficiencies across agentic workflows, multi-platform mobile architectures, and resilient backend systems."
        />

        {/* Filter Bar */}
        <Reveal variant="up" delay={0.1}>
          <div className="credentials-filter-bar" role="tablist" aria-label="Specialization Categories">
            {filters.map((f, fIdx) => (
              <motion.button
                key={f.label}
                type="button"
                role="tab"
                aria-selected={activeFilter === f.label}
                className={`filter-btn ${activeFilter === f.label ? 'active' : ''}`}
                onClick={() => setActiveFilter(f.label)}
                whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: fIdx * 0.05 }}
              >
                <span>{f.label}</span>
                <span style={{ opacity: 0.6, fontSize: '10px', marginLeft: '4px' }}>({f.count})</span>
              </motion.button>
            ))}
          </div>
        </Reveal>

        {/* Specializations Grid with AnimatePresence for filter transitions */}
        <motion.div className="credential-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredSpecs.map((spec, idx) => (
              <motion.article
                key={spec.id}
                className="credential-card"
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] as const }}
                whileHover={{ y: -5, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const } }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="credential-top">
                  <motion.div
                    className="credential-meta-header"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 + 0.1 }}
                  >
                    <span className={`badge ${spec.provider === 'Microsoft Learn' ? 'badge-teal' : 'badge-amber'}`}>
                      {spec.provider}
                    </span>
                    <span className="provider-stamp">{spec.category}</span>
                  </motion.div>

                  <h3 className="credential-title" style={{ fontSize: '1.0625rem' }}>{spec.title}</h3>

                  <p className="credential-summary" style={{ fontSize: '0.8125rem' }}>
                    {spec.summary}
                  </p>

                  {/* Applied Competency Brief */}
                  <div style={{
                    padding: 'var(--space-2) var(--space-3)',
                    background: 'rgba(39, 175, 163, 0.08)',
                    border: '1px solid rgba(39, 175, 163, 0.22)',
                    borderRadius: 'var(--radius-xs)',
                    marginTop: 'var(--space-2)'
                  }}>
                    <span style={{ fontSize: '0.78rem', color: '#172033', display: 'block', lineHeight: 1.45, fontWeight: 550 }}>
                      <strong style={{ color: '#0B2D61', fontWeight: 750 }}>Focus:</strong> {spec.appliedCompetency}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)', marginTop: 'var(--space-2)' }}>
                    {spec.topics.slice(0, 3).map((topic, tIdx) => (
                      <motion.span
                        key={topic}
                        className="badge"
                        style={{ fontSize: '10px' }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25, delay: idx * 0.04 + tIdx * 0.04 + 0.15 }}
                        whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
                      >
                        {topic}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="credential-footer">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', color: 'var(--text-muted)' }}>
                    <Cpu size={12} aria-hidden="true" />
                    <span className="text-mono" style={{ fontSize: '11px' }}>{spec.syllabus.length} Syllabus Modules</span>
                  </div>

                  <motion.button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedSpec(spec)}
                    aria-label={`Inspect syllabus and certificate for ${spec.title}`}
                    style={{ gap: '6px' }}
                    whileHover={{ scale: 1.05, x: 2, transition: { duration: 0.18 } }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <BookOpen size={13} aria-hidden="true" />
                    <span>Syllabus & Certificate</span>
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowRight size={12} aria-hidden="true" />
                    </motion.span>
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Specialization Detail Modal */}
      <SpecializationModal
        specialization={selectedSpec}
        onClose={() => setSelectedSpec(null)}
      />
    </section>
  );
};

// Export as Credentials as well to satisfy any other imports
export const Credentials = Specializations;

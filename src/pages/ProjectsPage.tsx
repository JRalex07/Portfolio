import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  ExternalLink,
  Search,
  Layers,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { projects } from '../data/projects';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ProjectsPageProps {
  onNavigate?: (path: string, sectionId?: string) => void;
}

const CATEGORIES = [
  'All',
  'Distributed Ecosystem',
  'E-Commerce',
  'Interactive Web Architecture',
  'Agentic Systems',
  'Mobile Engineering',
] as const;

export const ProjectsPage: React.FC<ProjectsPageProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  // Filter projects based on category and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.problem.toLowerCase().includes(q) ||
        project.solution.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="page-projects"
      style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingBottom: '60px' }}
    >
      {/* ─── PAGE HEADER & ARCHITECTURAL INTRO ─── */}
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
                background: '#e0f2fe',
                border: '1px solid #bae6fd',
                padding: '4px 14px',
                borderRadius: '9999px',
                width: 'fit-content',
              }}
            >
              PRODUCTION SYSTEMS & CASE STUDIES
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
              Engineered Deployments & Distributed Architectures
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 450 }}>
              Inspect verified production systems built across mobile Flutter clients, synchronized multi-tier commerce portals,
              and standardized Model Context Protocol (MCP) agent execution runtimes. Every project documented here represents genuine
              architecture with real live deployments and verifiable source code.
            </p>
          </motion.div>

          {/* ─── SEARCH & CATEGORY FILTER BAR ─── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginTop: '36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Search Input */}
            <div style={{ position: 'relative', maxWidth: '520px', width: '100%' }}>
              <Search
                size={16}
                color="#0284c7"
                style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Search by system, technology (Flutter, React, MCP), or feature..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '9999px',
                  padding: '12px 20px 12px 44px',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  boxShadow: 'var(--shadow-xs)',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent-teal)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(2, 132, 199, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-subtle)';
                  e.target.style.boxShadow = 'var(--shadow-xs)';
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      background: isActive ? '#121417' : '#ffffff',
                      border: isActive ? '1px solid #121417' : '1px solid var(--border-subtle)',
                      color: isActive ? '#ffffff' : 'var(--text-secondary)',
                      borderRadius: '9999px',
                      padding: '8px 18px',
                      fontSize: '12px',
                      fontWeight: isActive ? 750 : 600,
                      fontFamily: 'var(--font-heading)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isActive ? '0 4px 12px rgba(18, 20, 23, 0.16)' : 'var(--shadow-xs)',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PROJECTS GRID ─── */}
      <section className="section" style={{ padding: '0 0' }}>
        <div className="container">
          {filteredProjects.length === 0 ? (
            <div
              className="liquid-glass-card"
              style={{
                background: 'var(--glass-l2-bg)',
                borderRadius: 'var(--radius-card)',
                padding: '48px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <Search size={32} color="#94a3b8" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>No projects matched your criteria</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Try adjusting your search query or choosing another category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: '9999px', marginTop: '8px' }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
              {filteredProjects.map((proj, idx) => {
                const isExpanded = expandedProjectId === proj.id;

                return (
                  <motion.div
                    key={proj.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: (idx % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      borderRadius: '24px',
                      background: '#ffffff',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: proj.isFeatured ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                      padding: 'clamp(18px, 4.5vw, 36px)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '24px',
                      position: 'relative',
                    }}
                  >
                    {/* Top Accent Line for Featured */}
                    {proj.isFeatured && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: '36px',
                          right: '36px',
                          height: '2px',
                          background: 'linear-gradient(90deg, transparent, #0284c7, transparent)',
                        }}
                      />
                    )}

                    {/* Card Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '11px',
                              color: 'var(--accent-teal)',
                              background: 'rgba(2, 132, 199, 0.08)',
                              border: '1px solid rgba(2, 132, 199, 0.22)',
                              padding: '3px 10px',
                              borderRadius: '9999px',
                              fontWeight: 700,
                            }}
                          >
                            {proj.category}
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
                            {proj.badge}
                          </span>
                        </div>

                        <h2
                          style={{
                            fontSize: 'clamp(1.4rem, 2.4vw, 1.85rem)',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 800,
                            color: 'var(--text-primary)',
                            lineHeight: 1.3,
                            marginTop: '4px',
                          }}
                        >
                          {proj.title}
                        </h2>

                        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '900px' }}>
                          {proj.subtitle}
                        </p>
                      </div>

                      {/* Action Links Buttons */}
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-sm"
                            style={{ borderRadius: '9999px', padding: '8px 18px', fontWeight: 700 }}
                          >
                            <Globe size={13} /> Live Deployment <ExternalLink size={12} />
                          </a>
                        )}

                        {proj.secondaryUrl && (
                          <a
                            href={proj.secondaryUrl.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-sm"
                            style={{ borderRadius: '9999px', padding: '8px 16px' }}
                          >
                            {proj.secondaryUrl.label} <ExternalLink size={12} />
                          </a>
                        )}

                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-sm"
                            style={{
                              borderRadius: '9999px',
                              padding: '8px 16px',
                            }}
                          >
                            <GithubIcon size={13} /> GitHub Repository
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Problem & Solution Split Container */}
                    <div
                      className="project-problem-solution-grid"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                        gap: '20px',
                        background: 'var(--bg-inset)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '16px',
                        padding: 'clamp(14px, 3.5vw, 22px)',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#d97706', fontWeight: 700, textTransform: 'uppercase' }}>
                            Problem & Architecture Challenge
                          </span>
                        </div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                          {proj.problem}
                        </p>
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#059669', fontWeight: 700, textTransform: 'uppercase' }}>
                            Engineered Solution & Invariants
                          </span>
                        </div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                          {proj.solution}
                        </p>
                      </div>
                    </div>

                    {/* Architecture Details (Expandable) */}
                    <div>
                      <button
                        type="button"
                        onClick={() => toggleExpand(proj.id)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: 'none',
                          border: 'none',
                          color: 'var(--accent-teal)',
                          fontSize: '13px',
                          fontWeight: 700,
                          fontFamily: 'var(--font-heading)',
                          cursor: 'pointer',
                          padding: '6px 0',
                        }}
                      >
                        <Layers size={15} />
                        {isExpanded ? 'Hide Architecture Breakdown & Specifications' : 'Inspect Architectural Breakdown & Specifications'}
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: 'hidden', marginTop: '14px' }}
                          >
                            <div
                              style={{
                                background: '#ffffff',
                                border: '1px solid var(--border-subtle)',
                                boxShadow: 'var(--shadow-xs)',
                                borderRadius: '16px',
                                padding: '22px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '14px',
                              }}
                            >
                              <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--accent-teal)', fontWeight: 700 }}>
                                SYSTEM SPECIFICATIONS & GUARANTEES
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '12px' }}>
                                {proj.architectureDetails.map((detail, idx) => (
                                  <div
                                    key={idx}
                                    style={{
                                      fontSize: '0.86rem',
                                      color: 'var(--text-secondary)',
                                      lineHeight: 1.6,
                                      display: 'flex',
                                      gap: '10px',
                                    }}
                                  >
                                    <span style={{ color: 'var(--accent-teal)', fontWeight: 700 }}>▸</span>
                                    <span>{detail}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Technologies Tag Row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {proj.technologies.map((tech) => (
                          <span
                            key={tech}
                            style={{
                              background: 'var(--bg-canvas)',
                              border: '1px solid var(--border-subtle)',
                              color: 'var(--text-secondary)',
                              fontSize: '11px',
                              padding: '4px 12px',
                              borderRadius: 'var(--radius-pill)',
                              fontFamily: 'var(--font-mono)',
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                        {proj.keyFeatures.length} Key Capabilities
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

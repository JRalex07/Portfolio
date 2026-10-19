import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  X,
  CheckCircle2,
  Award
} from 'lucide-react';
import { specializations } from '../data/credentials';
import { CertificateShowcaseItem } from '../components/CertificateShowcaseItem';

interface CertificationsPageProps {
  onNavigate: (path: string, sectionId?: string) => void;
}

const CATEGORIES = [
  'All',
  'AI & Agents',
  'Software Engineering',
  'Mobile Architecture',
  'Data & Analytics',
] as const;

export const CertificationsPage: React.FC<CertificationsPageProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter credentials based on category and search query
  const filteredCerts = useMemo(() => {
    return specializations.filter((cert) => {
      const matchesCategory =
        selectedCategory === 'All' || cert.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        cert.title.toLowerCase().includes(q) ||
        cert.provider.toLowerCase().includes(q) ||
        cert.credentialId.toLowerCase().includes(q) ||
        cert.summary.toLowerCase().includes(q) ||
        cert.topics.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="page-certifications"
      style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingBottom: '80px' }}
    >
      {/* ─── PAGE HEADER & VERIFICATION REPOSITORY INTRO ─── */}
      <section className="section" style={{ paddingTop: '36px', paddingBottom: '10px' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: '860px', display: 'flex', flexDirection: 'column', gap: '16px' }}
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
              OFFICIAL CERTIFIED COMPETENCIES
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
              Verified Specializations & Technical Curriculums
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 450 }}>
              Explore 11 verified specializations issued by Microsoft Learn and Tutedude covering Agentic SDLC Integration,
              Model Context Protocol (MCP) tooling environments, high-concurrency systems, mobile engineering, and data analytics.
              Every credential is shown directly with high-resolution certificate imagery, curriculum highlights, and direct verification links.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={15} color="#0284c7" /> 7 Microsoft Learn Credentials
              </span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={15} color="#7c3aed" /> 4 Tutedude Applied Specializations
              </span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Award size={15} color="#059669" /> 100% Genuine Verified Achievements
              </span>
            </div>
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
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Search by title, provider, credential ID, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-primary)',
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
                  e.target.style.borderColor = 'var(--border-focus)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.15)';
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
                      background: isActive ? 'var(--text-primary)' : 'var(--bg-primary)',
                      border: isActive ? '1px solid var(--text-primary)' : '1px solid var(--border-subtle)',
                      color: isActive ? '#ffffff' : 'var(--text-secondary)',
                      borderRadius: '9999px',
                      padding: '8px 18px',
                      fontSize: '12px',
                      fontWeight: isActive ? 700 : 550,
                      fontFamily: 'var(--font-heading)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
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

      {/* ─── CERTIFICATIONS ALTERNATING SHOWCASE ─── */}
      <section className="section" style={{ padding: '0 0' }}>
        <div className="container">
          {filteredCerts.length === 0 ? (
            <div
              style={{
                background: 'var(--bg-card)',
                borderRadius: '24px',
                border: '1px solid var(--border-subtle)',
                padding: '48px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <Search size={32} color="var(--text-muted)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>No certifications matched your criteria</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Try adjusting your search terms or picking another category.
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
            <div className="cert-showcase-container">
              {filteredCerts.map((cert, index) => (
                <CertificateShowcaseItem
                  key={cert.id}
                  cert={cert}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

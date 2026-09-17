import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  Download,
  Copy,
  Check,
  ExternalLink,
  Cpu,
  CheckCircle2,
  ZoomIn,
  X,
  Share2
} from 'lucide-react';
import { specializations, Specialization } from '../data/credentials';

interface CertificatePageProps {
  currentPath: string;
  onNavigate: (path: string, sectionId?: string) => void;
}

export const CertificatePage: React.FC<CertificatePageProps> = ({ currentPath, onNavigate }) => {
  // Extract specialization ID from URL if provided (e.g. /certificate/spec-agent-sdlc or /certificate?id=spec-agent-sdlc)
  const getInitialSpecId = (): string => {
    // Check path segment
    const segments = currentPath.split('/').filter(Boolean);
    if (segments.length >= 2 && segments[0] === 'certificate') {
      const match = specializations.find((s) => s.id === segments[1]);
      if (match) return match.id;
    }
    // Check search params
    const searchParams = new URLSearchParams(window.location.search);
    const idParam = searchParams.get('id');
    if (idParam) {
      const match = specializations.find((s) => s.id === idParam);
      if (match) return match.id;
    }
    return specializations[0].id;
  };

  const [selectedId, setSelectedId] = useState<string>(getInitialSpecId);
  const [copied, setCopied] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'certificate' | 'syllabus'>('all');

  const selectedSpec: Specialization =
    specializations.find((s) => s.id === selectedId) || specializations[0];

  const currentIndex = specializations.findIndex((s) => s.id === selectedSpec.id);
  const prevSpec = currentIndex > 0 ? specializations[currentIndex - 1] : null;
  const nextSpec = currentIndex < specializations.length - 1 ? specializations[currentIndex + 1] : null;

  // Sync route and document title
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${selectedSpec.title} — Verified Certificate & Syllabus | Raman Kumar Sharma`;
    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    const targetPath = base ? `${base}/certificate/${selectedSpec.id}` : `/certificate/${selectedSpec.id}`;
    if (window.location.pathname !== targetPath) {
      // OLD: window.history.replaceState(null, '', `/certificate/${selectedSpec.id}`);
      window.history.replaceState(null, '', targetPath);
    }
  }, [selectedSpec]);

  const handleCopyId = () => {
    navigator.clipboard.writeText(selectedSpec.credentialId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedSpec.title,
        text: `Check out Raman Kumar Sharma's verified credential: ${selectedSpec.title} (${selectedSpec.credentialId})`,
        url: window.location.href,
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const isMicrosoft = selectedSpec.provider === 'Microsoft Learn';
  const verificationUrl = selectedSpec.verificationUrl;

  return (
    <div className="certificate-page-container">
      {/* Ambient background glow */}
      <div className="neo-ambient-bg" aria-hidden="true" />

      {/* Main Content Area */}
      <main className="certificate-page-main">
        <div className="container">
          {/* Breadcrumb & Navigation Bar */}
          <div className="cert-page-nav-bar">
            <button
              type="button"
              onClick={() => onNavigate('/specializations', 'specializations')}
              className="btn btn-secondary btn-sm cert-back-btn"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Back to Specializations</span>
            </button>

            <div className="cert-page-selector-wrap">
              <label htmlFor="spec-select" className="cert-select-label">
                Select Credential:
              </label>
              <select
                id="spec-select"
                value={selectedSpec.id}
                onChange={(e) => setSelectedId(e.target.value)}
                className="cert-spec-dropdown"
              >
                {specializations.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.provider}: {spec.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Certificate Hero Header */}
          <motion.div
            key={`hero-${selectedSpec.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="cert-hero-card arch-frame"
          >
            <div className="cert-hero-badges">
              <span
                className="badge"
                style={{
                  backgroundColor: isMicrosoft ? 'rgba(14, 165, 233, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                  color: isMicrosoft ? '#0284c7' : '#b45309',
                  border: isMicrosoft ? '1px solid rgba(14, 165, 233, 0.25)' : '1px solid rgba(245, 158, 11, 0.25)',
                  fontWeight: 750,
                }}
              >
                {selectedSpec.provider}
              </span>

              <span className="badge badge-teal">
                {selectedSpec.category}
              </span>

              <span className="cert-verified-pill">
                <ShieldCheck size={14} aria-hidden="true" />
                <span>Verified Completion Credential</span>
              </span>
            </div>

            <h1 className="cert-hero-title">
              {selectedSpec.title}
            </h1>

            <p className="cert-hero-summary">
              {selectedSpec.summary}
            </p>

            {/* Quick Metadata Strip */}
            <div className="cert-hero-meta-strip">
              <div className="cert-meta-item">
                <span className="cert-meta-label">Credential ID</span>
                <span className="cert-meta-val text-mono">{selectedSpec.credentialId}</span>
              </div>
              <div className="cert-meta-item">
                <span className="cert-meta-label">Issue Date</span>
                <span className="cert-meta-val">{selectedSpec.issueDate}</span>
              </div>
              <div className="cert-meta-item">
                <span className="cert-meta-label">Curriculum Duration</span>
                <span className="cert-meta-val">{selectedSpec.hours}</span>
              </div>
              <div className="cert-meta-item">
                <span className="cert-meta-label">Verification Status</span>
                <span className="cert-meta-val cert-status-active">● Authenticated</span>
              </div>
            </div>
          </motion.div>

          {/* View Tab Selector (Mobile / Small Screen convenience) */}
          <div className="cert-view-mode-tabs">
            <button
              type="button"
              className={`cert-mode-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Details
            </button>
            <button
              type="button"
              className={`cert-mode-btn ${activeTab === 'certificate' ? 'active' : ''}`}
              onClick={() => setActiveTab('certificate')}
            >
              <Award size={13} aria-hidden="true" />
              Certificate Visual
            </button>
            <button
              type="button"
              className={`cert-mode-btn ${activeTab === 'syllabus' ? 'active' : ''}`}
              onClick={() => setActiveTab('syllabus')}
            >
              <BookOpen size={13} aria-hidden="true" />
              Curriculum & Syllabus
            </button>
          </div>

          {/* Two-Column Deep Dive Grid */}
          <div className="cert-details-grid">
            {/* ── LEFT COLUMN: CERTIFICATE VISUAL & AUTHENTICITY ── */}
            {(activeTab === 'all' || activeTab === 'certificate') && (
              <motion.div
                key={`left-${selectedSpec.id}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="cert-visual-column"
              >
                {/* Certificate Framed Canvas */}
                <div
                  className="cert-canvas-card arch-frame"
                  onClick={() => setLightboxOpen(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setLightboxOpen(true); }}
                  title="Click to view fullscreen certificate"
                >
                  <div className="cert-canvas-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Award size={15} color="var(--accent-teal)" aria-hidden="true" />
                      <span className="text-mono" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        OFFICIAL_CERTIFICATE_PREVIEW
                      </span>
                    </div>
                    <span className="badge badge-teal" style={{ fontSize: '10px' }}>Click to Expand</span>
                  </div>

                  <div className="cert-image-wrapper">
                    <img
                      src={selectedSpec.certificateImage}
                      alt={`Certificate for ${selectedSpec.title} awarded to Raman Kumar Sharma`}
                      className="cert-main-img"
                      loading="eager"
                    />

                    <div className="cert-zoom-overlay">
                      <ZoomIn size={14} aria-hidden="true" />
                      <span>Inspect Fullscreen</span>
                    </div>
                  </div>
                </div>

                {/* Verification Authority & Actions Card */}
                <div className="cert-auth-card arch-frame">
                  <div className="cert-auth-header">
                    <ShieldCheck size={18} color="#10b981" aria-hidden="true" />
                    <div>
                      <h3 style={{ fontSize: '1rem', margin: 0, color: 'var(--text-primary)', fontWeight: 750 }}>
                        Official Verification & Authenticity
                      </h3>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        Cryptographically verifiable digital credential
                      </span>
                    </div>
                  </div>

                  <div className="cert-auth-table">
                    <div className="cert-auth-row">
                      <span className="cert-auth-key">Certified Recipient</span>
                      <span className="cert-auth-val"><strong>Raman Kumar Sharma</strong></span>
                    </div>
                    <div className="cert-auth-row">
                      <span className="cert-auth-key">Issuing Authority</span>
                      <span className="cert-auth-val">{selectedSpec.provider}</span>
                    </div>
                    <div className="cert-auth-row">
                      <span className="cert-auth-key">Issuance Date</span>
                      <span className="cert-auth-val">{selectedSpec.issueDate}</span>
                    </div>
                    <div className="cert-auth-row">
                      <span className="cert-auth-key">Credential Identifier</span>
                      <span className="cert-auth-val text-mono">{selectedSpec.credentialId}</span>
                    </div>
                    <div className="cert-auth-row">
                      <span className="cert-auth-key">Recorded Training</span>
                      <span className="cert-auth-val">{selectedSpec.hours}</span>
                    </div>
                    <div className="cert-auth-row" style={{ alignItems: 'flex-start' }}>
                      <span className="cert-auth-key" style={{ minWidth: '110px' }}>Official Verification</span>
                      <a
                        href={verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-auth-val"
                        style={{
                          color: 'var(--accent-teal)',
                          wordBreak: 'break-all',
                          fontSize: '11.5px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          textDecoration: 'none'
                        }}
                      >
                        <span>{verificationUrl}</span>
                        <ExternalLink size={12} style={{ flexShrink: 0 }} aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="cert-auth-actions">
                    <a
                      href={verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary cert-action-btn"
                    >
                      <ExternalLink size={14} aria-hidden="true" />
                      <span>Verify on {selectedSpec.provider}</span>
                    </a>

                    <a
                      href={selectedSpec.certificatePdf}
                      download
                      className="btn btn-secondary cert-action-btn"
                    >
                      <Download size={14} aria-hidden="true" />
                      <span>Download Verified PDF</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyId}
                      className="btn btn-secondary cert-action-btn"
                    >
                      {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                      <span>{copied ? 'Credential ID Copied!' : 'Copy Credential ID'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleShare}
                      className="btn btn-secondary cert-action-btn"
                    >
                      <Share2 size={14} aria-hidden="true" />
                      <span>Share Credential</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── RIGHT COLUMN: CURRICULUM & SYLLABUS ── */}
            {(activeTab === 'all' || activeTab === 'syllabus') && (
              <motion.div
                key={`right-${selectedSpec.id}`}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.08 }}
                className="cert-syllabus-column"
              >
                {/* Applied Engineering Competency Callout */}
                <div className="cert-competency-card arch-frame">
                  <div className="cert-competency-icon-box">
                    <Cpu size={20} color="var(--accent-teal)" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-mono" style={{ fontSize: '11px', color: 'var(--accent-teal)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 800 }}>
                      Applied Engineering Competency
                    </span>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 650, margin: '4px 0 0', lineHeight: 1.5 }}>
                      {selectedSpec.appliedCompetency}
                    </p>
                  </div>
                </div>

                {/* Step-by-Step Curriculum Modules */}
                <div className="cert-modules-card arch-frame">
                  <div className="cert-modules-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BookOpen size={17} color="var(--accent-teal)" aria-hidden="true" />
                      <h3 style={{ fontSize: '1.05rem', margin: 0, color: 'var(--text-primary)', fontWeight: 750 }}>
                        Mastered Curriculum & Syllabus Modules
                      </h3>
                    </div>
                    <span className="badge badge-teal">
                      {selectedSpec.syllabus.length} Completed Modules
                    </span>
                  </div>

                  <div className="cert-modules-stack">
                    {selectedSpec.syllabus.map((module, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: idx * 0.05 }}
                        className="cert-module-row"
                      >
                        <span className="cert-module-badge">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="cert-module-content">
                          <span className="cert-module-title">
                            {module}
                          </span>
                        </div>
                        <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0 }} aria-hidden="true" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Mastered Technologies & Topics */}
                <div className="cert-topics-card arch-frame">
                  <span className="text-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                    Verified Technical Proficiencies & Topics:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {selectedSpec.topics.map((topic) => (
                      <span key={topic} className="code-tag" style={{ fontSize: '11.5px', padding: '5px 12px' }}>
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Navigation: Next / Prev Certificate */}
                <div className="cert-pager-card arch-frame">
                  {prevSpec ? (
                    <button
                      type="button"
                      onClick={() => setSelectedId(prevSpec.id)}
                      className="cert-pager-btn"
                    >
                      <ArrowLeft size={14} aria-hidden="true" />
                      <div className="cert-pager-text">
                        <span className="cert-pager-label">Previous Credential</span>
                        <span className="cert-pager-title">{prevSpec.title}</span>
                      </div>
                    </button>
                  ) : (
                    <div />
                  )}

                  {nextSpec && (
                    <button
                      type="button"
                      onClick={() => setSelectedId(nextSpec.id)}
                      className="cert-pager-btn cert-pager-next"
                    >
                      <div className="cert-pager-text" style={{ textAlign: 'right' }}>
                        <span className="cert-pager-label">Next Credential</span>
                        <span className="cert-pager-title">{nextSpec.title}</span>
                      </div>
                      <ArrowRight size={14} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Fullscreen Certificate Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="spec-lightbox-backdrop"
            onClick={() => setLightboxOpen(false)}
          >
            <div
              className="spec-lightbox-bar"
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href={selectedSpec.certificatePdf}
                download
                className="spec-lightbox-download-btn"
              >
                <Download size={13} />
                <span>Download PDF</span>
              </a>

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="spec-lightbox-close-btn"
                aria-label="Close fullscreen"
              >
                <X size={20} />
              </button>
            </div>

            <motion.img
              src={selectedSpec.certificateImage}
              alt={selectedSpec.title}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.24 }}
              className="spec-lightbox-img"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .certificate-page-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .certificate-page-main {
          padding-top: 24px;
          padding-bottom: 60px;
          flex: 1;
        }

        /* Top Nav Bar */
        .cert-page-nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .cert-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .cert-page-selector-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cert-select-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 650;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .cert-spec-dropdown {
          background: var(--bg-card);
          border: var(--nm-border);
          border-radius: var(--radius-sm);
          padding: 8px 14px;
          font-family: var(--font-heading);
          font-size: 12px;
          font-weight: 650;
          color: var(--text-primary);
          box-shadow: var(--nm-shadow-xs);
          max-width: 320px;
          cursor: pointer;
        }

        /* Hero Card */
        .cert-hero-card {
          padding: var(--space-6) var(--space-8);
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .cert-hero-badges {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .cert-verified-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11.5px;
          font-weight: 750;
          color: #10b981;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 3px 10px;
          border-radius: 9999px;
        }

        .cert-hero-title {
          font-size: clamp(1.4rem, 3.2vw, 2rem);
          font-weight: 850;
          color: var(--text-primary);
          line-height: 1.25;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .cert-hero-summary {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0;
          max-width: 860px;
        }

        .cert-hero-meta-strip {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
          padding-top: 14px;
          border-top: 1px solid rgba(195, 206, 222, 0.45);
          margin-top: 4px;
        }

        .cert-meta-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .cert-meta-label {
          font-family: var(--font-mono);
          font-size: 10.5px;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.06em;
          font-weight: 650;
        }

        .cert-meta-val {
          font-size: 12.5px;
          color: var(--text-primary);
          font-weight: 700;
        }

        .cert-status-active {
          color: #10b981;
        }

        /* View Mode Tabs */
        .cert-view-mode-tabs {
          display: none;
          gap: 6px;
          margin-bottom: 16px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .cert-mode-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 8px 14px;
          border-radius: var(--radius-pill);
          background: var(--bg-card);
          border: var(--nm-border);
          font-size: 11.5px;
          font-weight: 650;
          color: var(--text-secondary);
          cursor: pointer;
          white-space: nowrap;
        }

        .cert-mode-btn.active {
          background: #ffffff;
          color: var(--accent-teal);
          border-color: rgba(14, 165, 233, 0.35);
          box-shadow: var(--nm-shadow-xs);
          font-weight: 750;
        }

        /* Two-Column Grid */
        .cert-details-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 24px;
          align-items: start;
        }

        .cert-visual-column,
        .cert-syllabus-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 0;
        }

        /* Canvas Card */
        .cert-canvas-card {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          cursor: pointer;
        }

        .cert-canvas-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cert-image-wrapper {
          position: relative;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.03);
        }

        .cert-main-img {
          width: 100%;
          height: auto;
          max-height: 480px;
          object-fit: contain;
          border-radius: 8px;
          display: block;
          background: #ffffff;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          transition: transform 0.25s ease;
        }

        .cert-canvas-card:hover .cert-main-img {
          transform: scale(1.015);
        }

        .cert-zoom-overlay {
          position: absolute;
          bottom: 18px;
          right: 18px;
          background: rgba(11, 45, 97, 0.85);
          backdrop-filter: blur(8px);
          color: #ffffff;
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: none;
        }

        /* Auth Card */
        .cert-auth-card {
          padding: var(--space-6);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cert-auth-header {
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid rgba(195, 206, 222, 0.45);
          padding-bottom: 12px;
        }

        .cert-auth-table {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cert-auth-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12.5px;
          padding: 4px 0;
          border-bottom: 1px dashed rgba(195, 206, 222, 0.35);
        }

        .cert-auth-key {
          color: var(--text-muted);
          font-weight: 550;
        }

        .cert-auth-val {
          color: var(--text-primary);
          font-weight: 650;
          text-align: right;
        }

        .cert-auth-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          padding-top: 6px;
        }

        .cert-action-btn {
          font-size: 11.5px;
          gap: 6px;
          text-decoration: none;
          justify-content: center;
          padding: 9px 12px;
        }

        /* Right Column Styles */
        .cert-competency-card {
          padding: 16px 18px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background: rgba(14, 165, 233, 0.05);
          border: 1px solid rgba(14, 165, 233, 0.22);
        }

        .cert-competency-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(14, 165, 233, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .cert-modules-card {
          padding: var(--space-6);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .cert-modules-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(195, 206, 222, 0.45);
          padding-bottom: 10px;
        }

        .cert-modules-stack {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cert-module-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          background: var(--bg-card);
          border: var(--nm-border);
          border-radius: var(--radius-xs);
          box-shadow: var(--nm-shadow-xs);
          transition: all var(--transition-fast);
        }

        .cert-module-row:hover {
          transform: translateX(3px);
          box-shadow: var(--nm-shadow-sm);
        }

        .cert-module-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: var(--text-primary);
          color: #ffffff;
          font-size: 11px;
          font-weight: 800;
          flex-shrink: 0;
        }

        .cert-module-content {
          flex: 1;
        }

        .cert-module-title {
          font-size: 0.875rem;
          color: var(--text-primary);
          font-weight: 600;
          line-height: 1.45;
        }

        .cert-topics-card {
          padding: 16px 18px;
        }

        /* Pager Card */
        .cert-pager-card {
          padding: 14px 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .cert-pager-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--text-primary);
          transition: all 0.15s ease;
          padding: 6px 10px;
          border-radius: 8px;
        }

        .cert-pager-btn:hover {
          background: var(--bg-card);
          color: var(--accent-teal);
        }

        .cert-pager-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .cert-pager-label {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .cert-pager-title {
          font-size: 11.5px;
          font-weight: 700;
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .cert-details-grid {
            grid-template-columns: 1fr;
          }
          .cert-view-mode-tabs {
            display: flex;
          }
          .cert-hero-card {
            padding: 16px 14px;
          }
          .cert-hero-title {
            font-size: 1.35rem;
          }
          .cert-hero-meta-strip {
            grid-template-columns: 1fr 1fr;
          }
          .cert-auth-actions {
            grid-template-columns: 1fr;
          }
          .cert-spec-dropdown {
            max-width: 220px;
          }
        }

        @media (max-width: 600px) {
          .cert-page-nav-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .cert-back-btn {
            width: 100%;
            justify-content: center;
          }
          .cert-page-selector-wrap {
            width: 100%;
          }
          .cert-spec-dropdown {
            max-width: 100%;
            flex: 1;
          }
          .cert-hero-meta-strip {
            grid-template-columns: 1fr;
          }
          .cert-canvas-card,
          .cert-auth-card,
          .cert-modules-card {
            padding: 14px 12px;
          }
          .cert-main-img {
            max-height: 280px;
          }
        }
      `}</style>
    </div>
  );
};

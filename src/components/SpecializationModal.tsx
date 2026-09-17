import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Award,
  BookOpen,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Copy,
  Check,
  Clock,
  Download,
  ZoomIn,
  Maximize2,
  ExternalLink
} from 'lucide-react';
import { Specialization } from '../data/credentials';

interface SpecializationModalProps {
  specialization: Specialization | null;
  onClose: () => void;
}

export const SpecializationModal: React.FC<SpecializationModalProps> = ({ specialization, onClose }) => {
  const [activeTab, setActiveTab] = useState<'certificate' | 'syllabus'>('certificate');
  const [copied, setCopied] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          onClose();
        }
      }
    };
    if (specialization) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setActiveTab('certificate');
      setLightboxOpen(false);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [specialization, onClose, lightboxOpen]);

  if (!specialization) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(specialization.credentialId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const isMicrosoft = specialization.provider === 'Microsoft Learn';

  return (
    <AnimatePresence>
      <motion.div
        className="spec-modal-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="specialization-modal-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          className="spec-modal-card"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] as const }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Fixed Header ── */}
          <div className="spec-modal-header">
            <div className="spec-modal-title-group">
              <div className="spec-modal-badges">
                <span
                  className="spec-badge-provider"
                  style={{
                    backgroundColor: isMicrosoft ? 'rgba(18, 63, 135, 0.08)' : 'rgba(217, 119, 6, 0.1)',
                    color: isMicrosoft ? '#0B2D61' : '#B45309',
                  }}
                >
                  {specialization.provider}
                </span>

                <span className="spec-badge-category">
                  {specialization.category}
                </span>

                <span className="spec-badge-separator">•</span>

                <span className="spec-badge-verified">
                  <ShieldCheck size={13} aria-hidden="true" />
                  Verified Completion
                </span>
              </div>

              <h2 id="specialization-modal-title" className="spec-modal-title">
                {specialization.title}
              </h2>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close popup"
              className="spec-modal-close-btn"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* ── Fixed Segmented Tab Bar & Action Controls ── */}
          <div className="spec-modal-controls-bar">
            {/* Tab Switcher */}
            <div role="tablist" aria-label="Syllabus and Certificate Tabs" className="spec-tab-switcher">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'certificate'}
                onClick={() => setActiveTab('certificate')}
                className={`spec-tab-btn ${activeTab === 'certificate' ? 'active' : ''}`}
              >
                <Award size={14} color={activeTab === 'certificate' ? '#0ea5e9' : '#64748B'} aria-hidden="true" />
                <span>Certificate</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'syllabus'}
                onClick={() => setActiveTab('syllabus')}
                className={`spec-tab-btn ${activeTab === 'syllabus' ? 'active' : ''}`}
              >
                <BookOpen size={14} color={activeTab === 'syllabus' ? '#0ea5e9' : '#64748B'} aria-hidden="true" />
                <span>Curriculum & Syllabus</span>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="spec-actions-row">
              <button
                type="button"
                onClick={handleCopyId}
                className="spec-action-btn"
                aria-label="Copy credential ID"
                title="Copy Credential ID"
              >
                {copied ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                <span className="spec-id-text">{copied ? 'ID Copied' : specialization.credentialId}</span>
              </button>

              <a
                href={specialization.certificatePdf}
                download
                className="spec-action-btn"
                title="Download original verified PDF"
              >
                <Download size={12} />
                <span>PDF</span>
              </a>

              <a
                href={`/certificate/${specialization.id}`}
                className="spec-action-btn"
                title="Open Dedicated Full Page View"
              >
                <ExternalLink size={12} />
                <span>Full Page View</span>
              </a>
            </div>
          </div>

          {/* ── Scrollable Body Area ── */}
          <div className="spec-modal-body">
            {/* TAB 1: CERTIFICATE IMAGE VIEW */}
            {activeTab === 'certificate' && (
              <motion.div
                key="certificate-image-view"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="spec-tab-content"
              >
                {/* Certificate Image Frame Container */}
                <div
                  className="spec-cert-frame"
                  onClick={() => setLightboxOpen(true)}
                  title="Click to view fullscreen certificate"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setLightboxOpen(true); }}
                >
                  <img
                    src={specialization.certificateImage}
                    alt={`Official Certificate: ${specialization.title} awarded to Raman Kumar Sharma`}
                    className="spec-cert-img"
                    loading="eager"
                  />

                  {/* Subtle hover/tap hint */}
                  <div className="spec-cert-expand-hint">
                    <ZoomIn size={13} />
                    <span>Click / Tap to Expand</span>
                  </div>
                </div>

                {/* Certificate Verification Summary Bar */}
                <div className="spec-cert-verify-bar">
                  <div className="spec-cert-verify-info">
                    <span className="spec-verify-kicker">
                      Authenticity Verification
                    </span>
                    <span className="spec-verify-recipient">
                      Recipient: <strong>Raman Kumar Sharma</strong> • Issued: <strong>{specialization.issueDate}</strong>
                    </span>
                  </div>

                  <div className="spec-cert-verify-actions">
                    <button
                      type="button"
                      onClick={() => setLightboxOpen(true)}
                      className="spec-verify-btn spec-verify-btn-secondary"
                    >
                      <Maximize2 size={13} />
                      <span>Fullscreen</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('syllabus')}
                      className="spec-verify-btn spec-verify-btn-primary"
                    >
                      <span>View Syllabus</span>
                      <BookOpen size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: CURRICULUM & SYLLABUS VIEW */}
            {activeTab === 'syllabus' && (
              <motion.div
                key="syllabus-view"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="spec-tab-content"
              >
                {/* Technical Scope Summary Card */}
                <div className="spec-syllabus-card">
                  <span className="spec-section-label">
                    Technical Scope & Overview
                  </span>
                  <p className="spec-summary-text">
                    {specialization.summary}
                  </p>
                </div>

                {/* Applied Competency Callout */}
                <div className="spec-competency-callout">
                  <div className="spec-competency-icon">
                    <Cpu size={18} aria-hidden="true" />
                  </div>
                  <div className="spec-competency-content">
                    <span className="spec-competency-label">
                      Applied Engineering Competency
                    </span>
                    <p className="spec-competency-text">
                      {specialization.appliedCompetency}
                    </p>
                  </div>
                </div>

                {/* Step-by-Step Curriculum Modules */}
                <div className="spec-modules-section">
                  <div className="spec-modules-header">
                    <span className="spec-modules-title">
                      <BookOpen size={15} color="#0ea5e9" aria-hidden="true" />
                      Mastered Curriculum & Syllabus Modules
                    </span>
                    <span className="spec-modules-count">
                      {specialization.syllabus.length} Completed Modules
                    </span>
                  </div>

                  <div className="spec-modules-list">
                    {specialization.syllabus.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.16, delay: idx * 0.03 }}
                        className="spec-module-item"
                      >
                        <span className="spec-module-num">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="spec-module-text">
                          {item}
                        </span>
                        <CheckCircle2 size={16} color="#10B981" className="spec-module-check" aria-hidden="true" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Mastered Technologies & Topics */}
                <div className="spec-topics-section">
                  <span className="spec-section-label">
                    Verified Core Competencies:
                  </span>
                  <div className="spec-topics-wrap">
                    {specialization.topics.map((topic) => (
                      <span key={topic} className="spec-topic-chip">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Fixed Bottom Footer ── */}
          <div className="spec-modal-footer">
            <div className="spec-footer-info">
              <Clock size={13} color="#64748B" aria-hidden="true" />
              <span>{specialization.hours}</span>
            </div>

            <div className="spec-footer-actions">
              {activeTab === 'syllabus' ? (
                <button
                  type="button"
                  onClick={() => setActiveTab('certificate')}
                  className="spec-footer-btn spec-footer-btn-secondary"
                >
                  <Award size={13} color="#0ea5e9" />
                  <span>Certificate Image</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveTab('syllabus')}
                  className="spec-footer-btn spec-footer-btn-secondary"
                >
                  <BookOpen size={13} color="#0ea5e9" />
                  <span>Curriculum & Syllabus</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="spec-footer-btn spec-footer-btn-primary"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Fullscreen Lightbox ── */}
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
                  href={specialization.certificatePdf}
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
                src={specialization.certificateImage}
                alt={specialization.title}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="spec-lightbox-img"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          /* Modal Backdrop — Perfectly Centered on Viewport */
          .spec-modal-backdrop {
            position: fixed;
            inset: 0;
            background-color: rgba(11, 45, 97, 0.68);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            z-index: 1050;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px 16px;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }

          /* Modal Card — Rigidly bounded within viewport, with fixed header/footer and scrollable body */
          .spec-modal-card {
            background: #ffffff;
            border: 1px solid rgba(18, 63, 135, 0.16);
            border-radius: 20px;
            max-width: 820px;
            width: 100%;
            max-height: min(90vh, 760px);
            display: flex;
            flex-direction: column;
            box-shadow: 0 25px 60px -15px rgba(11, 45, 97, 0.4), 0 0 0 1px rgba(18, 63, 135, 0.08);
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
          }

          /* Header — Fixed at top of card */
          .spec-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            border-bottom: 1px solid #eef2f6;
            padding: 18px 24px 14px;
            flex-shrink: 0;
            background: #ffffff;
          }

          .spec-modal-title-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
            min-width: 0;
            flex: 1;
          }

          .spec-modal-badges {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
          }

          .spec-badge-provider {
            display: inline-flex;
            align-items: center;
            padding: 3px 10px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 750;
            letter-spacing: 0.04em;
          }

          .spec-badge-category {
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 650;
            color: #64748b;
          }

          .spec-badge-separator {
            font-size: 11px;
            color: #cbd5e1;
          }

          .spec-badge-verified {
            font-size: 11px;
            font-weight: 700;
            color: #10b981;
            display: inline-flex;
            align-items: center;
            gap: 4px;
          }

          .spec-modal-title {
            font-size: clamp(1.1rem, 2.4vw, 1.35rem);
            color: #0b2d61;
            font-weight: 800;
            line-height: 1.3;
            margin: 0;
            letter-spacing: -0.02em;
            word-break: break-word;
          }

          .spec-modal-close-btn {
            padding: 8px;
            border-radius: 10px;
            color: #475467;
            cursor: pointer;
            border: 1px solid #e2e8f0;
            background: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.15s ease;
            flex-shrink: 0;
            width: 36px;
            height: 36px;
          }

          .spec-modal-close-btn:hover {
            background-color: #eef2f6;
            color: #0b2d61;
          }

          /* Controls Bar — Fixed below header */
          .spec-modal-controls-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
            padding: 10px 24px 12px;
            border-bottom: 1px solid #f1f5f9;
            background: #fafbfc;
            flex-shrink: 0;
          }

          .spec-tab-switcher {
            display: flex;
            background: #eef2f6;
            padding: 3px;
            border-radius: 12px;
            gap: 4px;
            border: 1px solid #e2e8f0;
          }

          .spec-tab-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            padding: 7px 16px;
            border-radius: 9px;
            font-size: 12px;
            font-weight: 750;
            cursor: pointer;
            border: none;
            transition: all 0.18s ease;
            background-color: transparent;
            color: #64748b;
            white-space: nowrap;
          }

          .spec-tab-btn.active {
            background-color: #ffffff;
            color: #0b2d61;
            box-shadow: 0 2px 6px rgba(11, 45, 97, 0.12);
          }

          .spec-actions-row {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
          }

          .spec-action-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            padding: 6px 12px;
            font-size: 11px;
            font-weight: 650;
            border-radius: 8px;
            border: 1px solid #cbd5e1;
            background: #ffffff;
            color: #0b2d61;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.15s ease;
          }

          .spec-action-btn:hover {
            background: #eef2f6;
            border-color: #94a3b8;
          }

          .spec-id-text {
            font-family: var(--font-mono);
            font-size: 10.5px;
            max-width: 180px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          /* Scrollable Modal Body */
          .spec-modal-body {
            flex: 1;
            overflow-y: auto;
            padding: 16px 24px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            -webkit-overflow-scrolling: touch;
          }

          .spec-modal-body::-webkit-scrollbar {
            width: 6px;
          }
          .spec-modal-body::-webkit-scrollbar-track {
            background: transparent;
          }
          .spec-modal-body::-webkit-scrollbar-thumb {
            background: rgba(11, 45, 97, 0.16);
            border-radius: 9999px;
          }

          .spec-tab-content {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          /* Certificate Frame */
          .spec-cert-frame {
            position: relative;
            background-color: #f8fafc;
            border-radius: 14px;
            border: 1px solid #cbd5e1;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(11, 45, 97, 0.06);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            padding: 8px;
          }

          .spec-cert-img {
            width: 100%;
            height: auto;
            max-height: min(44vh, 340px);
            object-fit: contain;
            border-radius: 8px;
            display: block;
            background-color: #ffffff;
            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
          }

          .spec-cert-expand-hint {
            position: absolute;
            bottom: 14px;
            right: 14px;
            background-color: rgba(11, 45, 97, 0.88);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            color: #ffffff;
            padding: 5px 12px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 5px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
            pointer-events: none;
          }

          /* Certificate Verification Bar */
          .spec-cert-verify-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 12px;
            padding: 10px 14px;
            flex-wrap: wrap;
            gap: 10px;
          }

          .spec-cert-verify-info {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .spec-verify-kicker {
            font-size: 10.5px;
            color: #16a34a;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.06em;
          }

          .spec-verify-recipient {
            font-size: 12px;
            color: #0b2d61;
            font-weight: 600;
          }

          .spec-cert-verify-actions {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .spec-verify-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            padding: 6px 14px;
            border-radius: 8px;
            font-size: 11.5px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.15s ease;
          }

          .spec-verify-btn-secondary {
            background: #ffffff;
            color: #0b2d61;
            border: 1px solid #cbd5e1;
          }

          .spec-verify-btn-secondary:hover {
            background: #f1f5f9;
          }

          .spec-verify-btn-primary {
            background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%);
            color: #ffffff;
            border: none;
            box-shadow: 0 2px 8px rgba(14, 165, 233, 0.35);
          }

          .spec-verify-btn-primary:hover {
            background: linear-gradient(135deg, #0369a1 0%, #0284c7 100%);
          }

          /* Syllabus Card */
          .spec-syllabus-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 12px 14px;
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .spec-section-label {
            font-family: var(--font-mono);
            font-size: 10.5px;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: #64748b;
            font-weight: 700;
          }

          .spec-summary-text {
            font-size: 0.88rem;
            color: #334155;
            line-height: 1.55;
            margin: 0;
            font-weight: 450;
          }

          /* Competency Callout */
          .spec-competency-callout {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 12px 14px;
            background-color: #f0fdfa;
            border-radius: 12px;
            border: 1px solid #ccfbf1;
          }

          .spec-competency-icon {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background-color: rgba(14, 165, 233, 0.12);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #0284c7;
            flex-shrink: 0;
            margin-top: 2px;
          }

          .spec-competency-content {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .spec-competency-label {
            font-family: var(--font-mono);
            font-size: 10.5px;
            color: #0284c7;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-weight: 800;
          }

          .spec-competency-text {
            font-size: 0.86rem;
            color: #0b2d61;
            line-height: 1.5;
            font-weight: 650;
            margin: 0;
          }

          /* Modules Section */
          .spec-modules-section {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .spec-modules-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 6px;
          }

          .spec-modules-title {
            font-size: 0.9rem;
            font-weight: 750;
            color: #0b2d61;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .spec-modules-count {
            font-size: 11px;
            color: #64748b;
            font-family: var(--font-mono);
          }

          .spec-modules-list {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .spec-module-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            padding: 10px 12px;
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            transition: border-color 0.15s ease, background-color 0.15s ease;
          }

          .spec-module-item:hover {
            border-color: #cbd5e1;
            background-color: #f1f5f9;
          }

          .spec-module-num {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            border-radius: 6px;
            background-color: #0b2d61;
            color: #ffffff;
            font-size: 10px;
            font-weight: 800;
            flex-shrink: 0;
            margin-top: 1px;
          }

          .spec-module-text {
            font-size: 0.83rem;
            color: #1e293b;
            font-weight: 600;
            line-height: 1.45;
            flex: 1;
          }

          .spec-module-check {
            flex-shrink: 0;
            margin-top: 2px;
          }

          /* Topics Section */
          .spec-topics-section {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .spec-topics-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .spec-topic-chip {
            font-family: var(--font-mono);
            font-size: 10.5px;
            padding: 3px 9px;
            border-radius: 6px;
            background-color: #eef4f8;
            border: 1px solid #cbdceb;
            color: #0b2d61;
            font-weight: 650;
          }

          /* Fixed Bottom Footer */
          .spec-modal-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 24px;
            border-top: 1px solid #eef2f6;
            background: #fafbfc;
            flex-shrink: 0;
            gap: 10px;
          }

          .spec-footer-info {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 11.5px;
            color: #64748b;
            font-weight: 600;
          }

          .spec-footer-actions {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .spec-footer-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            padding: 7px 18px;
            border-radius: 9px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.15s ease;
          }

          .spec-footer-btn-secondary {
            background: #ffffff;
            color: #0b2d61;
            border: 1px solid #cbd5e1;
          }

          .spec-footer-btn-secondary:hover {
            background: #eef2f6;
          }

          .spec-footer-btn-primary {
            background: #0b2d61;
            color: #ffffff;
            border: none;
            box-shadow: 0 2px 8px rgba(11, 45, 97, 0.2);
          }

          .spec-footer-btn-primary:hover {
            background: #123f87;
          }

          /* Lightbox */
          .spec-lightbox-backdrop {
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.94);
            z-index: 1200;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 16px;
          }

          .spec-lightbox-bar {
            position: absolute;
            top: 16px;
            right: 16px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1201;
          }

          .spec-lightbox-download-btn {
            background-color: rgba(255, 255, 255, 0.15);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.3);
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 600;
            text-decoration: none;
          }

          .spec-lightbox-close-btn {
            background-color: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.35);
            border-radius: 50%;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            cursor: pointer;
          }

          .spec-lightbox-img {
            max-width: 95vw;
            max-height: 82vh;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
          }

          /* Mobile Screen Adjustments */
          @media (max-width: 640px) {
            .spec-modal-backdrop {
              padding: 10px 8px;
              align-items: center;
            }

            .spec-modal-card {
              max-height: 94dvh;
              border-radius: 16px;
            }

            .spec-modal-header {
              padding: 12px 14px 10px;
            }

            .spec-modal-badges {
              gap: 5px;
            }

            .spec-modal-title {
              font-size: 1.05rem;
            }

            .spec-modal-close-btn {
              width: 32px;
              height: 32px;
              padding: 6px;
            }

            .spec-modal-controls-bar {
              padding: 8px 12px;
              flex-direction: column;
              align-items: stretch;
              gap: 6px;
            }

            .spec-tab-switcher {
              width: 100%;
            }

            .spec-tab-btn {
              flex: 1;
              padding: 7px 8px;
              font-size: 11px;
            }

            .spec-actions-row {
              width: 100%;
              display: flex;
            }

            .spec-action-btn {
              flex: 1;
              padding: 5px 6px;
              font-size: 10.5px;
            }

            .spec-id-text {
              max-width: 110px;
            }

            .spec-modal-body {
              padding: 10px 12px;
              gap: 10px;
            }

            .spec-cert-frame {
              padding: 4px;
            }

            .spec-cert-img {
              max-height: 240px;
            }

            .spec-cert-verify-bar {
              padding: 8px 10px;
              flex-direction: column;
              align-items: stretch;
              gap: 6px;
            }

            .spec-cert-verify-actions {
              width: 100%;
              display: flex;
            }

            .spec-verify-btn {
              flex: 1;
              padding: 6px 8px;
              font-size: 10.5px;
            }

            .spec-modal-footer {
              padding: 10px 12px;
              flex-direction: column;
              align-items: stretch;
              gap: 6px;
            }

            .spec-footer-info {
              justify-content: center;
              font-size: 10.5px;
            }

            .spec-footer-actions {
              width: 100%;
              display: flex;
            }

            .spec-footer-btn {
              flex: 1;
              padding: 7px 10px;
              font-size: 11px;
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

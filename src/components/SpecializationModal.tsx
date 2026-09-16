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
  Maximize2
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
        className="modal-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="specialization-modal-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(11, 45, 97, 0.72)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
        }}
        onClick={onClose}
      >
        <motion.div
          className="modal-card"
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(18, 63, 135, 0.18)',
            borderRadius: '22px',
            maxWidth: '860px',
            width: '100%',
            padding: '24px 28px',
            boxShadow: '0 25px 65px -12px rgba(11, 45, 97, 0.35), 0 0 0 1px rgba(18, 63, 135, 0.08)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Modal Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    backgroundColor: isMicrosoft ? 'rgba(18, 63, 135, 0.08)' : 'rgba(217, 119, 6, 0.1)',
                    color: isMicrosoft ? '#0B2D61' : '#B45309',
                    fontSize: '11px',
                    fontWeight: 750,
                    letterSpacing: '0.04em',
                  }}
                >
                  {specialization.provider}
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 650,
                    color: '#64748B',
                  }}
                >
                  {specialization.category}
                </span>

                <span style={{ fontSize: '11px', color: '#CBD5E1' }}>•</span>

                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#10B981',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <ShieldCheck size={13} />
                  Verified Completion
                </span>
              </div>

              <h2
                id="specialization-modal-title"
                style={{
                  fontSize: '1.4rem',
                  color: '#0B2D61',
                  fontWeight: 800,
                  lineHeight: 1.3,
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                {specialization.title}
              </h2>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close popup"
              style={{
                padding: '8px',
                borderRadius: '10px',
                color: '#475467',
                cursor: 'pointer',
                border: '1px solid #E2E8F0',
                background: '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EEF2F6';
                e.currentTarget.style.color = '#0B2D61';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.color = '#475467';
              }}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Tab Navigation Controls */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <div
              role="tablist"
              aria-label="Syllabus and Certificate Tabs"
              style={{
                display: 'flex',
                background: '#F1F5F9',
                padding: '3px',
                borderRadius: '12px',
                gap: '4px',
                border: '1px solid #E2E8F0',
              }}
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'certificate'}
                onClick={() => setActiveTab('certificate')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 16px',
                  borderRadius: '9px',
                  fontSize: '12px',
                  fontWeight: 750,
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.18s ease',
                  backgroundColor: activeTab === 'certificate' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'certificate' ? '#0B2D61' : '#64748B',
                  boxShadow: activeTab === 'certificate' ? '0 2px 6px rgba(11, 45, 97, 0.12)' : 'none',
                }}
              >
                <Award size={14} color={activeTab === 'certificate' ? '#27AFA3' : '#64748B'} aria-hidden="true" />
                <span>Certificate Image</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'syllabus'}
                onClick={() => setActiveTab('syllabus')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 16px',
                  borderRadius: '9px',
                  fontSize: '12px',
                  fontWeight: 750,
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.18s ease',
                  backgroundColor: activeTab === 'syllabus' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'syllabus' ? '#0B2D61' : '#64748B',
                  boxShadow: activeTab === 'syllabus' ? '0 2px 6px rgba(11, 45, 97, 0.12)' : 'none',
                }}
              >
                <BookOpen size={14} color={activeTab === 'syllabus' ? '#27AFA3' : '#64748B'} aria-hidden="true" />
                <span>Curriculum & Syllabus</span>
              </button>
            </div>

            {/* Quick Metadata Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={handleCopyId}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '11px', padding: '5px 10px', gap: '5px' }}
                aria-label="Copy credential ID"
              >
                {copied ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                <span>{copied ? 'ID Copied' : specialization.credentialId}</span>
              </button>

              <a
                href={specialization.certificatePdf}
                download
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '11px', padding: '5px 10px', gap: '5px', textDecoration: 'none' }}
                title="Download original verified PDF"
              >
                <Download size={12} />
                <span>Original PDF</span>
              </a>
            </div>
          </div>

          {/* TAB 1: DEDICATED CERTIFICATE IMAGE SECTION (No PDF Viewer) */}
          {activeTab === 'certificate' && (
            <motion.div
              key="certificate-image-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              {/* Certificate Image Frame Container */}
              <div
                style={{
                  position: 'relative',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '16px',
                  border: '1px solid #CBD5E1',
                  overflow: 'hidden',
                  boxShadow: '0 8px 30px rgba(11, 45, 97, 0.09)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '12px',
                }}
                onClick={() => setLightboxOpen(true)}
                title="Click to view fullscreen certificate"
              >
                {/* Certificate Image */}
                <img
                  src={specialization.certificateImage}
                  alt={`Official Certificate: ${specialization.title} awarded to Raman Kumar Sharma`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '480px',
                    objectFit: 'contain',
                    borderRadius: '10px',
                    display: 'block',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                  }}
                  loading="eager"
                />

                {/* Hover overlay hint */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '22px',
                    right: '22px',
                    backgroundColor: 'rgba(11, 45, 97, 0.88)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                    pointerEvents: 'none',
                  }}
                >
                  <ZoomIn size={13} />
                  <span>Click to Expand</span>
                </div>
              </div>

              {/* Certificate Verification Summary Bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#F0F9F8',
                  border: '1px solid #BCE5DF',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '11px', color: '#1A8077', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Authenticity Verification
                  </span>
                  <span style={{ fontSize: '12.5px', color: '#0B2D61', fontWeight: 650 }}>
                    Recipient: <strong>Raman Kumar Sharma</strong> • Issued: <strong>{specialization.issueDate}</strong>
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '12px', gap: '6px' }}
                  >
                    <Maximize2 size={13} />
                    <span>View Fullscreen</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('syllabus')}
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: '12px', gap: '6px' }}
                  >
                    <span>View Syllabus</span>
                    <BookOpen size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: FIXED & REDESIGNED SYLLABUS SECTION */}
          {activeTab === 'syllabus' && (
            <motion.div
              key="syllabus-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {/* Technical Scope Summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#64748B',
                    fontWeight: 700,
                  }}
                >
                  Technical Scope & Overview
                </span>
                <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.65, margin: 0, fontWeight: 450 }}>
                  {specialization.summary}
                </p>
              </div>

              {/* Applied Competency Callout */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px 16px',
                  backgroundColor: '#F0F9F8',
                  borderRadius: '12px',
                  border: '1px solid #BCE5DF',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(39, 175, 163, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1A8077',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <Cpu size={18} aria-hidden="true" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10.5px',
                      color: '#1A8077',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      fontWeight: 800,
                    }}
                  >
                    Applied Engineering Competency
                  </span>
                  <p style={{ fontSize: '0.9rem', color: '#0B2D61', lineHeight: 1.5, fontWeight: 650, margin: 0 }}>
                    {specialization.appliedCompetency}
                  </p>
                </div>
              </div>

              {/* Step-by-Step Curriculum Modules */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 750,
                      color: '#0B2D61',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <BookOpen size={16} color="#27AFA3" aria-hidden="true" />
                    Mastered Curriculum & Syllabus Modules
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                    {specialization.syllabus.length} Completed Modules
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {specialization.syllabus.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.04 }}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '12px 16px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '10px',
                        transition: 'border-color 0.15s ease',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '24px',
                          height: '24px',
                          borderRadius: '6px',
                          backgroundColor: '#0B2D61',
                          color: '#FFFFFF',
                          fontSize: '11px',
                          fontWeight: 800,
                          flexShrink: 0,
                          marginTop: '1px',
                        }}
                      >
                        0{idx + 1}
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                        <span style={{ fontSize: '0.88rem', color: '#1E293B', fontWeight: 600, lineHeight: 1.5 }}>
                          {item}
                        </span>
                      </div>
                      <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mastered Technologies & Topics */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10.5px',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    color: '#64748B',
                    letterSpacing: '0.06em',
                  }}
                >
                  Verified Core Competencies:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {specialization.topics.map((topic) => (
                    <span
                      key={topic}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#EEF4F8',
                        border: '1px solid #CBDCEB',
                        color: '#0B2D61',
                        fontWeight: 650,
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Switch */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '10px',
                  borderTop: '1px solid #E2E8F0',
                  marginTop: '4px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveTab('certificate')}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '6px', fontSize: '12px' }}
                >
                  <Award size={13} color="#27AFA3" />
                  <span>View Certificate Image</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-primary btn-sm"
                  style={{ fontSize: '12px' }}
                >
                  Done
                </button>
              </div>
            </motion.div>
          )}

          {/* Modal Bottom Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '12px',
              borderTop: '1px solid #E2E8F0',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={13} color="#64748B" aria-hidden="true" />
              <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>
                {specialization.hours}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 22px',
                borderRadius: '10px',
                backgroundColor: '#0B2D61',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                boxShadow: '0 4px 12px rgba(11, 45, 97, 0.2)',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#123F87')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0B2D61')}
            >
              Close
            </button>
          </div>
        </motion.div>

        {/* FULLSCREEN LIGHTBOX FOR CERTIFICATE IMAGE */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.92)',
                zIndex: 1100,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
              }}
              onClick={() => setLightboxOpen(false)}
            >
              {/* Lightbox Top Bar */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  zIndex: 1101,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={specialization.certificatePdf}
                  download
                  className="btn btn-secondary btn-sm"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)', gap: '6px' }}
                >
                  <Download size={13} />
                  <span>Download PDF</span>
                </a>

                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.35)',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                  }}
                  aria-label="Close fullscreen"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Lightbox Certificate Image */}
              <motion.img
                src={specialization.certificateImage}
                alt={specialization.title}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  maxWidth: '92vw',
                  maxHeight: '86vh',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          .modal-card::-webkit-scrollbar {
            width: 6px;
          }
          .modal-card::-webkit-scrollbar-track {
            background: transparent;
          }
          .modal-card::-webkit-scrollbar-thumb {
            background: rgba(11, 45, 97, 0.16);
            border-radius: 9999px;
          }
          .modal-card::-webkit-scrollbar-thumb:hover {
            background: rgba(11, 45, 97, 0.32);
          }
          @media (max-width: 640px) {
            .modal-card {
              padding: 16px 16px !important;
              border-radius: 16px !important;
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

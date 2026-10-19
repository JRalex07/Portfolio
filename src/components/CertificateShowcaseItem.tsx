import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ShieldCheck,
  Calendar,
  Clock,
  Copy,
  Check,
  Eye,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { Specialization } from '../data/credentials';

interface CertificateShowcaseItemProps {
  cert: Specialization;
  index: number;
}

export const CertificateShowcaseItem: React.FC<CertificateShowcaseItemProps> = ({ cert, index }) => {
  const [copied, setCopied] = useState(false);
  const [showSyllabus, setShowSyllabus] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Alternating orientation:
  // Even index (0, 2, 4...) -> Image Left, Details Right -> reveals from LEFT
  // Odd index (1, 3, 5...)  -> Image Right, Details Left -> reveals from RIGHT
  const isImageLeft = index % 2 === 0;

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cert.credentialId) {
      navigator.clipboard.writeText(cert.credentialId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isMicrosoft = cert.provider === 'Microsoft Learn';
  const providerColor = isMicrosoft ? '#0078d4' : '#7c3aed';
  const providerBg = isMicrosoft ? 'rgba(0, 120, 212, 0.08)' : 'rgba(124, 58, 237, 0.08)';
  const providerBorder = isMicrosoft ? 'rgba(0, 120, 212, 0.22)' : 'rgba(124, 58, 237, 0.22)';

  // Reveal animation variants — vertical-only on mobile screens to prevent horizontal overflow
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const revealDistance = shouldReduceMotion || isMobile ? 0 : 45;
  const initialX = shouldReduceMotion || isMobile ? 0 : isImageLeft ? -revealDistance : revealDistance;
  const initialY = shouldReduceMotion || isMobile ? 24 : 0;

  return (
    <motion.article
      initial={{ opacity: 0, x: initialX, y: initialY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`cert-showcase-row ${isImageLeft ? '' : 'reverse-layout'}`}
      style={{ willChange: 'transform, opacity' }}
      aria-label={`${cert.title} Certificate`}
    >
      {/* ─── 1. CERTIFICATE IMAGE GALLERY FRAME ─── */}
      <div className="cert-media-col" style={{ width: '100%' }}>
        <div className="cert-gallery-frame">
          <a
            href={cert.certificatePdf || cert.certificateImage}
            target="_blank"
            rel="noopener noreferrer"
            title={`View full-resolution certificate for ${cert.title}`}
            style={{
              display: 'block',
              position: 'relative',
              borderRadius: '14px',
              overflow: 'hidden',
              textDecoration: 'none',
              cursor: 'zoom-in',
            }}
          >
            <img
              src={cert.certificateImage}
              alt={`${cert.title} Official Certificate`}
              loading="lazy"
              className="cert-gallery-img"
            />

            {/* Provider Corner Pill */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${providerBorder}`,
                fontSize: '12px',
                fontWeight: 700,
                color: providerColor,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                zIndex: 2,
              }}
            >
              <Award size={13} color={providerColor} />
              {cert.provider}
            </div>

            {/* Bottom-right Click to Expand hint */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '9999px',
                background: 'rgba(18, 20, 23, 0.78)',
                backdropFilter: 'blur(6px)',
                fontSize: '11px',
                color: '#ffffff',
                fontWeight: 600,
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                zIndex: 2,
              }}
            >
              <Eye size={12} /> Click to expand
            </div>
          </a>
        </div>
      </div>

      {/* ─── 2. DETAILS & COMPETENCY COLUMN ─── */}
      <div className="cert-details-col" style={{ width: '100%' }}>
        <div className="cert-details-card">
          {/* Header Metadata Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 750,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  background: providerBg,
                  color: providerColor,
                  border: `1px solid ${providerBorder}`,
                }}
              >
                {cert.category}
              </span>

              <span
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Calendar size={13} />
                {cert.issueDate}
              </span>

              {cert.hours && (
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Clock size={13} />
                  {cert.hours}
                </span>
              )}
            </div>

            {/* Credential ID Chip */}
            {cert.credentialId && (
              <button
                type="button"
                onClick={handleCopyId}
                title="Click to copy Credential ID"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--bg-inset)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '3px 9px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease, border-color 0.15s ease',
                }}
              >
                <span>ID: {cert.credentialId}</span>
                <span style={{ color: copied ? '#059669' : 'var(--text-muted)' }}>
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                </span>
              </button>
            )}
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 850,
              color: 'var(--text-primary)',
              lineHeight: 1.25,
              margin: 0,
              letterSpacing: '-0.015em',
            }}
          >
            {cert.title}
          </h2>

          {/* Summary */}
          <p
            style={{
              fontSize: '0.95rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              margin: 0,
              fontWeight: 450,
            }}
          >
            {cert.summary}
          </p>

          {/* Applied Competency Callout */}
          {cert.appliedCompetency && (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'var(--bg-inset)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.88rem',
                color: 'var(--text-primary)',
                lineHeight: 1.5,
              }}
            >
              <Sparkles size={16} color={providerColor} style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <strong style={{ color: 'var(--text-primary)', fontWeight: 650 }}>Applied Competency: </strong>
                <span style={{ color: 'var(--text-secondary)' }}>{cert.appliedCompetency}</span>
              </div>
            </div>
          )}

          {/* Topics & Skills Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Skills:</span>
            {cert.topics.map((topic, i) => (
              <span
                key={i}
                style={{
                  fontSize: '11px',
                  fontWeight: 550,
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  background: 'var(--bg-canvas)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {topic}
              </span>
            ))}
          </div>

          {/* Syllabus Accordion (if available) */}
          {cert.syllabus && cert.syllabus.length > 0 && (
            <div style={{ marginTop: '4px' }}>
              <button
                type="button"
                onClick={() => setShowSyllabus(!showSyllabus)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  color: providerColor,
                  fontSize: '12px',
                  fontWeight: 650,
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer',
                  padding: '4px 0',
                }}
              >
                <span>{showSyllabus ? 'Hide Syllabus Modules' : `Explore Syllabus (${cert.syllabus.length} Modules)`}</span>
                {showSyllabus ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {showSyllabus && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    margin: '8px 0 0 0',
                    paddingLeft: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                  }}
                >
                  {cert.syllabus.map((item, idx) => (
                    <li key={idx} style={{ paddingLeft: '4px' }}>
                      {item}
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '12px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-subtle)',
              flexWrap: 'wrap',
            }}
          >
            {cert.certificatePdf && (
              <a
                href={cert.certificatePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  borderRadius: '9999px',
                  padding: '9px 20px',
                  fontSize: '13px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                }}
              >
                <Eye size={14} /> View Certificate
              </a>
            )}

            {cert.verificationUrl && (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                title="Click to verify credential authenticity on official portal"
                style={{
                  borderRadius: '9999px',
                  padding: '9px 20px',
                  fontSize: '13px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                }}
              >
                <ShieldCheck size={14} color="#059669" /> Click to Verify
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

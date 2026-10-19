import React, { useState } from 'react';
import {
  ShieldCheck,
  Calendar,
  Copy,
  Check,
  Eye,
  Award
} from 'lucide-react';
import { Specialization } from '../data/credentials';

export interface CertificateCardProps {
  specialization: Specialization;
  onNavigate?: (path: string, sectionId?: string) => void;
  className?: string;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  specialization,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (specialization.credentialId) {
      navigator.clipboard.writeText(specialization.credentialId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isMicrosoft = specialization.provider === 'Microsoft Learn';

  return (
    <article className={`cert-compact-card ${className}`}>
      {/* ─── CERTIFICATE IMAGE DISPLAY (INLINE) ─── */}
      <div
        style={{
          position: 'relative',
          borderRadius: '14px',
          overflow: 'hidden',
          background: 'var(--bg-canvas)',
          border: '1px solid var(--border-subtle)',
          aspectRatio: '16 / 11',
          marginBottom: '16px',
        }}
      >
        <img
          src={specialization.certificateImage}
          alt={`${specialization.title} Certificate`}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.025)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />

        {/* Provider Tag */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '4px 10px',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            fontSize: '11px',
            fontWeight: 700,
            color: isMicrosoft ? '#0078d4' : '#7c3aed',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
          }}
        >
          <Award size={12} />
          {specialization.provider}
        </div>
      </div>

      {/* ─── DETAILS & METADATA ─── */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 650,
              padding: '2px 8px',
              borderRadius: '6px',
              background: 'var(--bg-inset)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {specialization.category}
          </span>
          <span
            style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Calendar size={12} />
            {specialization.issueDate}
          </span>
        </div>

        <h3
          style={{
            fontSize: '1.1rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 750,
            color: 'var(--text-primary)',
            lineHeight: 1.35,
            margin: 0,
          }}
        >
          {specialization.title}
        </h3>

        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {specialization.summary}
        </p>

        {/* Topics Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto', paddingTop: '8px' }}>
          {specialization.topics.slice(0, 3).map((topic, i) => (
            <span
              key={i}
              style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '9999px',
                background: 'var(--bg-canvas)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Credential ID chip */}
        {specialization.credentialId && (
          <div
            onClick={handleCopyId}
            title="Click to copy Credential ID"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 10px',
              borderRadius: '8px',
              background: 'var(--bg-inset)',
              border: '1px solid var(--border-subtle)',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              marginTop: '4px',
              transition: 'background 0.15s ease',
            }}
          >
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              ID: {specialization.credentialId}
            </span>
            <span style={{ marginLeft: '8px', color: copied ? '#059669' : 'var(--text-muted)' }}>
              {copied ? <Check size={12} /> : <Copy size={12} />}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
          {specialization.certificatePdf && (
            <a
              href={specialization.certificatePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{
                borderRadius: '9999px',
                fontSize: '12px',
                padding: '6px 14px',
                flex: 1,
                justifyContent: 'center',
                textDecoration: 'none',
              }}
            >
              <Eye size={13} /> View Certificate
            </a>
          )}

          {specialization.verificationUrl && (
            <a
              href={specialization.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              title="Click to verify credential authenticity on official portal"
              style={{
                borderRadius: '9999px',
                fontSize: '12px',
                padding: '6px 14px',
                flex: 1,
                justifyContent: 'center',
                textDecoration: 'none',
              }}
            >
              <ShieldCheck size={13} /> Click to Verify
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

// Backward-compatible alias for existing imports without hover popups
export const CertificateHoverCard = CertificateCard;

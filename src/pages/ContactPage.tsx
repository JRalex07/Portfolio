import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Send,
  CheckCircle2,
  MapPin,
  Clock
} from 'lucide-react';
import { personalInfo } from '../data/personal';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface ContactPageProps {
  onNavigate?: (path: string, sectionId?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please complete all required fields.');
      return;
    }
    setError(null);
    setLoading(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const channels = [
    {
      label: 'Direct Email',
      value: personalInfo.contact.email,
      href: `mailto:${personalInfo.contact.email}`,
      icon: <Mail size={18} />,
      color: '#38bdf8',
    },
    {
      label: 'GitHub Engineering',
      value: 'github.com/JRalex07',
      href: personalInfo.contact.github,
      icon: <GithubIcon size={18} />,
      color: '#f8fafc',
    },
    {
      label: 'LinkedIn Network',
      value: 'linkedin.com/in/jralex07',
      href: personalInfo.contact.linkedin,
      icon: <LinkedinIcon size={18} />,
      color: '#0ea5e9',
    },
    {
      label: 'Location & Availability',
      value: `${personalInfo.contact.location} • Remote Global`,
      href: '#',
      icon: <MapPin size={18} />,
      color: '#10b981',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="page-contact"
      style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingBottom: '60px' }}
    >
      {/* ─── PAGE HEADER ─── */}
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
              COMMUNICATION DISPATCH
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
              Initiate Architectural Dialogue & Technical Inquiries
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 450 }}>
              Available for high-impact systems architecture, distributed e-commerce design, Flutter cross-platform applications,
              and Model Context Protocol (MCP) agent execution harness development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT GRID: CHANNELS & FORM ─── */}
      <section className="section" style={{ padding: '0 0' }}>
        <div className="container">
          <div className="contact-layout-grid">
            {/* Left Column: Direct Verified Channels */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '28px',
                  boxShadow: 'var(--shadow-sm)',
                  padding: 'clamp(20px, 4.5vw, 36px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                }}
              >
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-teal)', fontWeight: 700 }}>
                    DIRECT ACCESS
                  </span>
                  <h2 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                    Verified Endpoints
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {channels.map((ch) => (
                    <a
                      key={ch.label}
                      href={ch.href}
                      target={ch.href.startsWith('http') ? '_blank' : undefined}
                      rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        background: '#f8f7f4',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-pill)',
                        padding: '12px 22px',
                        textDecoration: 'none',
                        transition: 'all 0.25s ease',
                      }}
                      className="contact-ch-card"
                    >
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          background: '#ffffff',
                          border: '1px solid var(--border-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: ch.color,
                          flexShrink: 0,
                          boxShadow: 'var(--shadow-xs)',
                        }}
                      >
                        {ch.icon}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                          {ch.label}
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', wordBreak: 'break-all' }}>
                          {ch.value}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Status SLA Box */}
                <div
                  style={{
                    background: '#f8f7f4',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-card-sm)',
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                  }}
                >
                  <Clock size={20} color="#0284c7" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 750, color: 'var(--text-primary)' }}>
                      Typical Response Window
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      Inquiries receive technical review within 24 operational hours.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Transmission Form */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '28px',
                  boxShadow: 'var(--shadow-md)',
                  padding: 'clamp(20px, 4.5vw, 36px)',
                  position: 'relative',
                }}
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        padding: '48px 24px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: '16px',
                      }}
                    >
                      <div
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '50%',
                          background: '#ecfdf5',
                          border: '1px solid #a7f3d0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#059669',
                        }}
                      >
                        <CheckCircle2 size={32} />
                      </div>

                      <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text-primary)' }}>
                        Transmission Acknowledged
                      </h3>

                      <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', fontSize: '0.94rem', lineHeight: 1.6 }}>
                        Thank you, {formData.name}. Your inquiry has been logged. I will review the architecture context and follow up directly via {formData.email}.
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: '', email: '', subject: '', message: '' });
                        }}
                        className="btn btn-secondary btn-sm"
                        style={{ borderRadius: '9999px', marginTop: '12px' }}
                      >
                        Send Another Transmission
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                    >
                      <div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-teal)', fontWeight: 700 }}>
                          TRANSMISSION PAYLOAD
                        </span>
                        <h2 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                          Send Engineering Dispatch
                        </h2>
                      </div>

                      {error && (
                        <div
                          style={{
                            background: '#fff1f2',
                            border: '1px solid #fecdd3',
                            borderRadius: '12px',
                            padding: '10px 14px',
                            color: '#e11d48',
                            fontSize: '13px',
                          }}
                        >
                          {error}
                        </div>
                      )}

                      <div className="contact-inputs-row">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                            YOUR NAME *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Dr. Alex Rivera"
                            className="form-input"
                            style={{
                              background: '#f8f7f4',
                              border: '1px solid var(--border-subtle)',
                              borderRadius: 'var(--radius-pill)',
                              padding: '13px 22px',
                              color: 'var(--text-primary)',
                              fontSize: '13px',
                              outline: 'none',
                            }}
                          />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                            YOUR EMAIL *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="alex@enterprise.io"
                            className="form-input"
                            style={{
                              background: '#f8f7f4',
                              border: '1px solid var(--border-subtle)',
                              borderRadius: 'var(--radius-pill)',
                              padding: '13px 22px',
                              color: 'var(--text-primary)',
                              fontSize: '13px',
                              outline: 'none',
                            }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                          SUBJECT OR SYSTEM DOMAIN
                        </label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="Distributed Ecosystem Integration / MCP Agent Harness"
                          className="form-input"
                          style={{
                            background: '#f8f7f4',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-pill)',
                            padding: '13px 22px',
                            color: 'var(--text-primary)',
                            fontSize: '13px',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                          PROJECT SPECIFICATION & MESSAGE *
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Detail the technical requirements, architecture constraints, or project context..."
                          className="form-textarea"
                          style={{
                            background: '#f8f7f4',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '24px',
                            padding: '16px 22px',
                            color: 'var(--text-primary)',
                            fontSize: '13px',
                            outline: 'none',
                            resize: 'vertical',
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{
                          borderRadius: '9999px',
                          padding: '14px 28px',
                          fontSize: '14px',
                          fontWeight: 700,
                          alignSelf: 'flex-start',
                        }}
                      >
                        {loading ? 'Dispatching...' : (
                          <>
                            <Send size={15} /> Transmit Message
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        .contact-ch-card:hover {
          border-color: var(--accent-teal) !important;
          background: #ffffff !important;
          box-shadow: var(--shadow-sm);
          transform: translateY(-2px);
        }
        @media (max-width: 860px) {
          .contact-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-inputs-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

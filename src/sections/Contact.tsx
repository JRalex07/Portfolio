import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { personalInfo } from '../data/personal';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Reveal } from '../components/MotionReveal';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const channels = [
    {
      href: `mailto:${personalInfo.contact.email}`,
      label: 'Direct Email',
      value: personalInfo.contact.email,
      isExternal: false,
      icon: (
        <Mail size={20} aria-hidden="true" />
      ),
    },
    {
      href: personalInfo.contact.github,
      label: 'GitHub Profile',
      value: 'github.com/JRalex07',
      isExternal: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
    },
    {
      href: personalInfo.contact.linkedin,
      label: 'Professional Network',
      value: 'linkedin.com/in/jralex07',
      isExternal: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="section" aria-label="Contact Raman Kumar Sharma">
      <div className="container">
        <SectionHeading
          kicker="Initiate Communication"
          title="Direct Contact & Engineering Inquiries"
          description="Available for high-impact software engineering, cross-platform mobile architectures, and agent execution environment consultations."
        />

        <div className="contact-grid">
          {/* Left Column: Direct Channels */}
          <Reveal variant="left">
            <div className="contact-info-pane">
              <div className="arch-frame" style={{ padding: 'var(--space-6)' }}>
                <span className="box-title" style={{ color: 'var(--accent-teal)', marginBottom: 'var(--space-3)' }}>
                  Direct Communication Channels
                </span>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--space-6)', lineHeight: 1.6, fontWeight: 450 }}>
                  Reach out directly for technical discussions, architectural reviews, or application collaboration.
                </p>

                <div className="contact-direct-channels">
                  {channels.map((channel, cIdx) => (
                    <motion.a
                      key={channel.label}
                      href={channel.href}
                      className="channel-card"
                      aria-label={`${channel.label}: ${channel.value}`}
                      {...(channel.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: cIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{
                        x: 5,
                        boxShadow: 'var(--nm-shadow-hover)',
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.div
                        className="channel-icon"
                        whileHover={{ scale: 1.15, rotate: 8, transition: { duration: 0.2 } }}
                      >
                        {channel.icon}
                      </motion.div>
                      <div className="channel-text">
                        <span className="channel-label">{channel.label}</span>
                        <span className="channel-value">{channel.value}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <motion.div
                style={{ padding: 'var(--space-4)', background: 'var(--bg-card)', border: 'var(--nm-border)', boxShadow: 'var(--nm-shadow-sm)', borderRadius: 'var(--radius-sm)' }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-mono" style={{ fontSize: '11px', display: 'block', marginBottom: '4px', color: 'var(--text-muted)', fontWeight: 650 }}>
                  CURRENT AVAILABILITY STATUS:
                </span>
                <motion.span
                  style={{ fontSize: '0.875rem', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ● {personalInfo.contact.status}
                </motion.span>
              </motion.div>
            </div>
          </Reveal>

          {/* Right Column: Contact Inquiry Form */}
          <Reveal variant="right" delay={0.1}>
            <div className="contact-form-pane">
              <span className="box-title" style={{ color: 'var(--accent-teal)' }}>
                Send a Structured Message
              </span>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      padding: 'var(--space-8)',
                      background: 'var(--bg-card)',
                      border: 'var(--nm-border)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--nm-shadow-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: 'var(--space-3)'
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      <CheckCircle size={36} color="var(--accent-emerald)" strokeWidth={2.2} aria-hidden="true" />
                    </motion.div>
                    <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.25rem' }}>Message Transmitted</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 450 }}>
                      Thank you for reaching out. Your inquiry has been queued for review.
                    </p>
                    <motion.button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSubmitted(false)}
                      style={{ marginTop: 'var(--space-2)' }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                  >
                    {[
                      { id: 'contact-name', label: 'Your Name', type: 'text', placeholder: 'e.g. Elena Rostova', field: 'name' as const },
                      { id: 'contact-email', label: 'Email Address', type: 'email', placeholder: 'e.g. elena@company.com', field: 'email' as const },
                    ].map((input, iIdx) => (
                      <motion.div
                        key={input.id}
                        className="form-group"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: iIdx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <label htmlFor={input.id} className="form-label">{input.label}</label>
                        <motion.input
                          id={input.id}
                          type={input.type}
                          required
                          className="form-input"
                          placeholder={input.placeholder}
                          value={formData[input.field]}
                          onChange={(e) => setFormData({ ...formData, [input.field]: e.target.value })}
                          onFocus={() => setFocusedField(input.id)}
                          onBlur={() => setFocusedField(null)}
                          animate={focusedField === input.id
                            ? { scale: 1.01, transition: { duration: 0.18 } }
                            : { scale: 1 }}
                        />
                      </motion.div>
                    ))}

                    <motion.div
                      className="form-group"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <label htmlFor="contact-message" className="form-label">Project or Consultation Context</label>
                      <motion.textarea
                        id="contact-message"
                        required
                        rows={4}
                        className="form-textarea"
                        placeholder="Briefly describe the engineering requirements, architectural challenge, or role..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocusedField('contact-message')}
                        onBlur={() => setFocusedField(null)}
                        animate={focusedField === 'contact-message'
                          ? { scale: 1.01, transition: { duration: 0.18 } }
                          : { scale: 1 }}
                      />
                    </motion.div>

                    <motion.button
                      type="submit"
                      className="btn btn-primary"
                      style={{ marginTop: 'var(--space-2)' }}
                      whileHover={{ scale: 1.03, y: -2, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                    >
                      <span>Transmit Inquiry</span>
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Send size={14} aria-hidden="true" />
                      </motion.span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

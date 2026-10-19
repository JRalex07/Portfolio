import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Compass,
  Award,
  User,
  Mail,
  Terminal,
  Copy,
  Check,
  ArrowRight,
  Radio,
  Pause,
  Play
} from 'lucide-react';

interface NotFoundProps {
  onNavigate: (path: string, sectionId?: string) => void;
  currentPath: string;
}

interface SmartSuggestion {
  title: string;
  route: string;
  description: string;
  icon: React.ElementType;
  badge: string;
}

export const NotFound: React.FC<NotFoundProps> = ({ onNavigate, currentPath }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(20);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [timestamp] = useState<string>(() => new Date().toLocaleTimeString());

  // Set page document title
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '404: Sector Route Unresolved | Raman Kumar Sharma';
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // Smart suggestion resolver based on what user was searching for
  const smartSuggestion = useMemo<SmartSuggestion | null>(() => {
    const p = (currentPath || '').toLowerCase();
    if (p.includes('cert') || p.includes('cred') || p.includes('licens') || p.includes('tute') || p.includes('micro') || p.includes('badge')) {
      return {
        title: 'Verified Certifications & Credentials',
        route: '/certifications',
        description: 'Direct route to all 11 verified Microsoft & Tutedude engineering credentials.',
        icon: Award,
        badge: 'Credential Sector'
      };
    }
    if (p.includes('proj') || p.includes('work') || p.includes('app') || p.includes('code') || p.includes('repo') || p.includes('him') || p.includes('cloud')) {
      return {
        title: 'Production Projects & Systems',
        route: '/projects',
        description: 'Direct route to CloudPower, HimAmrit, and MCP Agent Execution architectures.',
        icon: Compass,
        badge: 'Systems Sector'
      };
    }
    if (p.includes('about') || p.includes('bio') || p.includes('exp') || p.includes('skill') || p.includes('story') || p.includes('who') || p.includes('jour')) {
      return {
        title: 'Engineering Philosophy & Journey',
        route: '/about',
        description: 'Read about architecture standards, technical stack, and verified career milestones.',
        icon: User,
        badge: 'Profile Sector'
      };
    }
    if (p.includes('contact') || p.includes('mail') || p.includes('hire') || p.includes('reach') || p.includes('connect') || p.includes('talk')) {
      return {
        title: 'Direct Engineering Inquiry',
        route: '/contact',
        description: 'Establish direct communication regarding software architecture or collaborations.',
        icon: Mail,
        badge: 'Comms Sector'
      };
    }
    return null;
  }, [currentPath]);

  // Handle countdown auto-redirection
  useEffect(() => {
    if (isPaused) return;

    if (countdown <= 0) {
      onNavigate('/');
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, isPaused, onNavigate]);

  const handleCopyPath = useCallback(() => {
    const fullUrl = window.location.href;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  }, []);

  // Primary active sector navigational cards
  const sectorCards = [
    {
      title: 'Home / Overview',
      route: '/',
      description: 'Core competencies, flagship architecture summary, and credentials snapshot.',
      icon: Home,
      badge: 'Main Launchpad'
    },
    {
      title: 'Projects & Systems',
      route: '/projects',
      description: 'CloudPower ecosystem, HimAmrit e-commerce engine, and MCP Agent runtimes.',
      icon: Compass,
      badge: 'Production Systems'
    },
    {
      title: 'Verified Certifications',
      route: '/certifications',
      description: 'Chronological showcase of 11 verified Microsoft & Tutedude software credentials.',
      icon: Award,
      badge: '11 Verified Credentials'
    },
    {
      title: 'Engineering Philosophy',
      route: '/about',
      description: 'System architectural principles, full technology stack, and journey milestones.',
      icon: User,
      badge: 'Architecture & Stack'
    }
  ];

  return (
    <div
      className="page-404-wrapper"
      style={{
        width: '100%',
        minHeight: 'calc(100vh - 140px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(20px, 4vw, 48px) 12px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ maxWidth: '860px', width: '100%', margin: '0 auto', padding: 0 }}>

        {/* Main Skeuomorphic Chassis Container */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="skeuo-surface skeuo-tier-featured"
          style={{
            padding: 'clamp(24px, 4vw, 44px) clamp(16px, 3.5vw, 36px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '24px',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Top Status & Telemetry Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <div
              className="skeuo-pill"
              style={{
                padding: '5px 12px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: '#dc2626',
                background: 'rgba(239, 68, 68, 0.06)',
                border: '1px solid rgba(239, 68, 68, 0.22)',
                boxShadow: 'inset 0 1px 2px rgba(239, 68, 68, 0.06)'
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#dc2626',
                  display: 'inline-block',
                  boxShadow: '0 0 8px #dc2626'
                }}
              />
              <span>HTTP 404 // ROUTE NOT RESOLVED</span>
            </div>

            <div
              className="skeuo-pill"
              style={{
                padding: '5px 12px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                color: 'var(--text-muted)'
              }}
            >
              <Radio size={12} color="var(--accent-teal)" />
              <span>COORDINATE: UNMAPPED</span>
            </div>
          </div>

          {/* Visual Showcase: Dimensional 404 Header */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              margin: '4px 0'
            }}
          >
            {/* Giant Tactile 404 Display */}
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(4.2rem, 15vw, 8rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.05em',
                background: 'linear-gradient(135deg, #121417 0%, #0369a1 50%, #059669 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 8px 32px rgba(2, 132, 199, 0.16)',
                userSelect: 'none',
                maxWidth: '100%',
                overflow: 'hidden'
              }}
            >
              404
            </div>

            {/* Decorative Coordinate Watermark */}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent-teal)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginTop: '6px',
                background: 'var(--bg-canvas)',
                padding: '3px 12px',
                borderRadius: '9999px',
                border: '1px solid var(--border-subtle)',
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              SECTOR NULL // COORDINATE ZERO
            </span>
          </div>

          {/* Heading & Contextual Description */}
          <div style={{ maxWidth: '640px', width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.4rem, 4vw, 2.1rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.025em',
                margin: 0,
                lineHeight: 1.2
              }}
            >
              Pathway Outside System Registry
            </h1>
            <p
              style={{
                fontSize: 'clamp(0.9rem, 2.5vw, 0.98rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                margin: 0,
                wordBreak: 'break-word'
              }}
            >
              The requested pathway{' '}
              <code
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9em',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--skeuo-inset-bg)',
                  border: 'var(--skeuo-inset-border)',
                  color: 'var(--accent-teal)',
                  fontWeight: 700,
                  wordBreak: 'break-all'
                }}
              >
                {currentPath || '/unknown'}
              </code>{' '}
              does not correspond to any active production system, architectural specification, or verified credential archive.
            </p>
          </div>

          {/* Smart Recommendation Banner (If user searched for something related) */}
          {smartSuggestion && (
            <div
              style={{
                width: '100%',
                maxWidth: '680px',
                padding: '14px 16px',
                borderRadius: 'var(--radius-card-sm)',
                backgroundColor: 'rgba(2, 132, 199, 0.05)',
                border: '1px solid rgba(2, 132, 199, 0.28)',
                boxShadow: '0 4px 16px rgba(2, 132, 199, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                textAlign: 'left',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 'min(100%, 240px)' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(2, 132, 199, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-teal)',
                    flexShrink: 0
                  }}
                >
                  <smartSuggestion.icon size={18} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontSize: '10px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--accent-teal)',
                        letterSpacing: '0.06em'
                      }}
                    >
                      Smart Route Match
                    </span>
                    <span
                      style={{
                        fontSize: '10px',
                        backgroundColor: 'var(--bg-primary)',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-muted)'
                      }}
                    >
                      {smartSuggestion.badge}
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '13.5px', marginTop: '2px' }}>
                    {smartSuggestion.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
                    {smartSuggestion.description}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate(smartSuggestion.route)}
                className="btn btn-primary"
                style={{
                  borderRadius: '9999px',
                  padding: '8px 16px',
                  fontSize: '12.5px',
                  gap: '6px',
                  flexShrink: 0,
                  width: 'auto'
                }}
              >
                <span>Navigate Here</span>
                <ArrowRight size={13} />
              </button>
            </div>
          )}

          {/* Diagnostic Inset Telemetry Plate */}
          <div
            style={{
              width: '100%',
              maxWidth: '680px',
              backgroundColor: 'var(--skeuo-inset-bg)',
              border: 'var(--skeuo-inset-border)',
              borderRadius: 'var(--radius-card-sm)',
              boxShadow: 'var(--skeuo-inset-shadow)',
              padding: '14px 16px',
              textAlign: 'left',
              fontFamily: 'var(--font-mono)',
              fontSize: '11.5px',
              color: 'var(--text-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              boxSizing: 'border-box'
            }}
          >
            {/* Header Line */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '6px',
                borderBottom: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Terminal size={13} color="var(--accent-teal)" />
                <span style={{ fontWeight: 700 }}>SYSTEM_DIAGNOSTIC // ROUTER</span>
              </div>

              <button
                type="button"
                onClick={handleCopyPath}
                title="Copy current URL to clipboard"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: copied ? 'var(--accent-emerald)' : 'var(--accent-teal)',
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.6)'
                }}
              >
                {copied ? <Check size={11} /> : <Copy size={11} />}
                <span>{copied ? 'Copied' : 'Copy Route'}</span>
              </button>
            </div>

            {/* Diagnostic Details */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
                gap: '6px',
                paddingTop: '2px'
              }}
            >
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Status: </span>
                <span style={{ color: '#dc2626', fontWeight: 700 }}>404 (Not Found)</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Client Time: </span>
                <span>{timestamp}</span>
              </div>
              <div style={{ gridColumn: '1 / -1', wordBreak: 'break-all', overflowWrap: 'anywhere' }}>
                <span style={{ color: 'var(--text-muted)' }}>Path: </span>
                <span style={{ color: 'var(--accent-teal)', fontWeight: 600 }}>{currentPath || '/'}</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Sector Hub Grid */}
          <div style={{ width: '100%', maxWidth: '780px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2px', flexWrap: 'wrap', gap: '4px' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Valid System Pathways
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Select a sector to navigate
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                gap: '10px',
                textAlign: 'left',
                width: '100%'
              }}
            >
              {sectorCards.map((sector) => {
                const IconComponent = sector.icon;
                return (
                  <motion.button
                    key={sector.route}
                    type="button"
                    onClick={() => onNavigate(sector.route)}
                    whileHover={{ y: -2, transition: { duration: 0.15 } }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: 'var(--bg-primary)',
                      border: 'var(--skeuo-plate-border)',
                      borderRadius: 'var(--radius-card-sm)',
                      boxShadow: 'var(--skeuo-plate-shadow)',
                      padding: '14px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(2, 132, 199, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--accent-teal)',
                          flexShrink: 0
                        }}
                      >
                        <IconComponent size={15} />
                      </div>

                      <span
                        style={{
                          fontSize: '10px',
                          fontFamily: 'var(--font-mono)',
                          padding: '2px 7px',
                          borderRadius: '9999px',
                          backgroundColor: 'var(--bg-canvas)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-muted)',
                          fontWeight: 600
                        }}
                      >
                        {sector.badge}
                      </span>
                    </div>

                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>{sector.title}</span>
                        <ArrowRight size={12} color="var(--accent-teal)" style={{ opacity: 0.8 }} />
                      </div>
                      <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', margin: '3px 0 0 0', lineHeight: 1.45 }}>
                        {sector.description}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Primary Action Button Bar & Auto-Redirect Assistant */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
              width: '100%',
              marginTop: '4px'
            }}
          >
            {/* Primary Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onNavigate('/')}
                style={{
                  borderRadius: '9999px',
                  padding: '10px 22px',
                  gap: '7px',
                  fontSize: '13.5px'
                }}
              >
                <Home size={15} aria-hidden="true" />
                <span>Return to Home</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onNavigate('/projects')}
                style={{
                  borderRadius: '9999px',
                  padding: '10px 20px',
                  gap: '7px',
                  fontSize: '13.5px'
                }}
              >
                <Compass size={15} aria-hidden="true" />
                <span>Browse Projects</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onNavigate('/contact')}
                style={{
                  borderRadius: '9999px',
                  padding: '10px 20px',
                  gap: '7px',
                  fontSize: '13.5px'
                }}
              >
                <Mail size={15} aria-hidden="true" />
                <span>Contact Engineer</span>
              </button>
            </div>

            {/* Auto-Redirect Assistant Helper */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11.5px',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'var(--bg-canvas)',
                padding: '5px 12px',
                borderRadius: '9999px',
                border: '1px solid var(--border-subtle)',
                marginTop: '2px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              <span>Auto-navigating to Home in {countdown}s</span>
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--accent-teal)',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: 0,
                  fontSize: '11px'
                }}
                title={isPaused ? 'Resume countdown' : 'Pause countdown'}
              >
                {isPaused ? <Play size={11} /> : <Pause size={11} />}
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .page-404-wrapper {
            padding: 16px 8px !important;
          }
          .page-404-wrapper .btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;

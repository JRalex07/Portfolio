import React, { useEffect } from 'react';
import { Home, Terminal, AlertTriangle, Compass, Mail } from 'lucide-react';
import { personalInfo } from '../data/personal';

interface NotFoundProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

export const NotFound: React.FC<NotFoundProps> = ({ onNavigate, currentPath }) => {
  useEffect(() => {
    document.title = '404 - Page Not Found | Raman Kumar Sharma';
    return () => {
      document.title = 'Raman Kumar Sharma | Application Engineer & Systems Builder';
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle Neomorphic Ambient Depth Overlay */}
      <div className="neo-ambient-bg" aria-hidden="true" />

      {/* Top Header Bar */}
      <header style={{
        padding: '20px 0',
        borderBottom: 'var(--nm-border)',
        position: 'relative',
        zIndex: 10
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => onNavigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            <div className="brand-glyph" aria-hidden="true">R</div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.05rem' }}>
              {personalInfo.name}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px' }}
          >
            <Home size={14} aria-hidden="true" />
            <span>Home</span>
          </button>
        </div>
      </header>

      {/* Main 404 Container */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-8) var(--space-4)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '620px',
          width: '100%',
          backgroundColor: 'var(--bg-card)',
          border: 'var(--nm-border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--nm-shadow-lg)',
          padding: '40px 36px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '24px'
        }}>
          {/* Status Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            color: '#dc2626',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.04em'
          }}>
            <AlertTriangle size={14} aria-hidden="true" />
            <span>HTTP STATUS 404 // ROUTE NOT RESOLVED</span>
          </div>

          {/* Large Neomorphic 404 Display */}
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(4.5rem, 12vw, 6.5rem)',
            fontWeight: 900,
            lineHeight: 1,
            color: '#0B2D61',
            letterSpacing: '-0.04em',
            textShadow: '3px 3px 6px #cad3df, -3px -3px 6px #ffffff'
          }}>
            404
          </div>

          {/* Heading and Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h1 style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.65rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Engineering Coordinate Unreachable
            </h1>
            <p style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '480px',
              margin: '0 auto',
              fontWeight: 450
            }}>
              The requested route <code style={{
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'rgba(11, 45, 97, 0.06)',
                padding: '2px 6px',
                borderRadius: '4px',
                color: '#0B2D61',
                fontWeight: 700
              }}>{currentPath}</code> does not map to any active production system, architectural specification, or verification log.
            </p>
          </div>

          {/* Terminal-like route diagnostic box */}
          <div style={{
            width: '100%',
            backgroundColor: '#0F172A',
            borderRadius: '10px',
            padding: '14px 18px',
            textAlign: 'left',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: '#94A3B8',
            boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8', borderBottom: '1px solid #1E293B', paddingBottom: '6px' }}>
              <Terminal size={14} aria-hidden="true" />
              <span style={{ fontWeight: 600 }}>SYSTEM_DIAGNOSTIC // ROUTER_EXCEPTION</span>
            </div>
            <div style={{ color: '#F87171' }}>! Error: Sector route verification failed</div>
            <div>&gt; Target: {currentPath}</div>
            <div style={{ color: '#34D399' }}>&gt; Suggestion: Re-route to portfolio root or active sectors</div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
            width: '100%',
            marginTop: '6px'
          }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onNavigate('/')}
              style={{
                backgroundColor: '#0B2D61',
                color: '#FFFFFF',
                boxShadow: '0 4px 14px rgba(11, 45, 97, 0.25)',
                gap: '8px'
              }}
            >
              <Home size={16} aria-hidden="true" />
              <span>Return to Portfolio Root</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onNavigate('/projects')}
              style={{ gap: '8px' }}
            >
              <Compass size={16} aria-hidden="true" />
              <span>View Projects</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onNavigate('/contact')}
              style={{ gap: '8px' }}
            >
              <Mail size={16} aria-hidden="true" />
              <span>Contact Engineer</span>
            </button>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer style={{
        padding: '16px 0',
        borderTop: 'var(--nm-border)',
        textAlign: 'center',
        fontSize: '12px',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        position: 'relative',
        zIndex: 10
      }}>
        <span>&copy; {new Date().getFullYear()} {personalInfo.name} — All system pathways validated</span>
      </footer>
    </div>
  );
};

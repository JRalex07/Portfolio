import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/personal';

export interface NavItem {
  label: string;
  path: string;
  id: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', path: '/', id: 'hero' },
  { label: 'About', path: '/about', id: 'about' },
  { label: 'Projects', path: '/projects', id: 'projects' },
  { label: 'Ecosystem', path: '/ecosystem', id: 'ecosystem' },
  { label: 'Engineering', path: '/engineering', id: 'engineering' },
  { label: 'Stack', path: '/stack', id: 'stack' },
  { label: 'Specializations', path: '/specializations', id: 'specializations' },
  { label: 'Timeline', path: '/timeline', id: 'timeline' },
  { label: 'Contact', path: '/contact', id: 'contact' },
];

interface HeaderProps {
  activeSection: string;
  onNavigate: (path: string, sectionId: string) => void;
}

// ─── Animated Hamburger SVG ────────────────────────────────────────────────────
// Three lines morph into an X with spring physics.
const HamburgerIcon: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      {/* Top line → top arm of X */}
      <motion.line
        x1="3" y1="6" x2="19" y2="6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        animate={
          open
            ? { x1: 4, y1: 4, x2: 18, y2: 18, opacity: 1 }
            : { x1: 3, y1: 6, x2: 19, y2: 6, opacity: 1 }
        }
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Middle line → fades out */}
      <motion.line
        x1="3" y1="11" x2="19" y2="11"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        animate={
          open
            ? { opacity: 0, scaleX: 0 }
            : { opacity: 1, scaleX: 1 }
        }
        style={{ originX: '50%', originY: '50%', transformBox: 'fill-box' }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
      />

      {/* Bottom line → bottom arm of X */}
      <motion.line
        x1="3" y1="16" x2="19" y2="16"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        animate={
          open
            ? { x1: 4, y1: 18, x2: 18, y2: 4, opacity: 1 }
            : { x1: 3, y1: 16, x2: 19, y2: 16, opacity: 1 }
        }
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
};

// ─── Mobile Menu Dropdown ──────────────────────────────────────────────────────
const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: -8,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -6,
    transition: { duration: 0.18, ease: 'easeIn' as const },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, x: -6, transition: { duration: 0.12 } },
};

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileMenuOpen(false);
    };
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path, sectionId);
  };

  return (
    <motion.header
      className="site-header"
      role="banner"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        backgroundColor: isScrolled
          ? 'rgba(234, 240, 248, 0.88)'
          : 'rgba(234, 240, 248, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div className="container">
        <div className="liquid-glass-navbar">
          {/* Brand */}
          <motion.a
            href="/"
            className="brand-logo"
            aria-label="Raman Kumar Sharma — Portfolio"
            onClick={(e) => handleLinkClick(e, '/', 'hero')}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="brand-glyph" aria-hidden="true">R</div>
            <span>{personalInfo.name}</span>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="site-nav desktop-nav" role="navigation" aria-label="Main Navigation">
            <ul className="nav-menu">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} style={{ position: 'relative' }}>
                  <a
                    href={item.path}
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={(e) => handleLinkClick(e, item.path, item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hamburger Button */}
          <div className="header-actions">
            <motion.button
              type="button"
              className="hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-controls="mobile-nav-menu"
              whileTap={{ scale: 0.92, transition: { duration: 0.1 } }}
            >
              <HamburgerIcon open={mobileMenuOpen} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu — AnimatePresence for smooth mount/unmount */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-nav-menu"
            role="navigation"
            aria-label="Mobile Navigation"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'absolute',
              top: '78px',
              left: '10px',
              right: '10px',
              backgroundColor: 'var(--bg-card)',
              border: 'var(--nm-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-4)',
              boxShadow: 'var(--nm-shadow-lg)',
              zIndex: 200,
              maxHeight: 'calc(100dvh - 100px)',
              overflowY: 'auto',
            }}
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {NAV_ITEMS.map((item) => (
                <motion.li key={item.label} variants={menuItemVariants}>
                  <a
                    href={item.path}
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={(e) => handleLinkClick(e, item.path, item.id)}
                    style={{ display: 'block', width: '100%', padding: '11px 16px', fontSize: '0.9rem', borderRadius: '12px' }}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <style>{`
        /* ─── Desktop nav — hidden on mobile ─── */
        .desktop-nav { display: flex; }

        /* ─── Hamburger button — hidden on desktop ─── */
        .hamburger-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--bg-card);
          border: var(--nm-border);
          box-shadow: var(--nm-shadow-xs);
          color: var(--text-primary);
          cursor: pointer;
          transition: box-shadow 160ms ease, background 160ms ease;
          flex-shrink: 0;
        }

        .hamburger-btn:hover {
          box-shadow: var(--nm-shadow-sm);
          color: var(--accent-teal);
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: inline-flex !important; }
        }
      `}</style>
    </motion.header>
  );
};

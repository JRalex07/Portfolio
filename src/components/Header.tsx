import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/personal';
import { NAV_ITEMS } from '../data/navigation';
import { LiquidGlass } from './LiquidGlass';
export type { NavItem } from '../data/navigation';

interface HeaderProps {
  activeSection: string;
  onNavigate: (path: string, sectionId: string) => void;
}

// ─── Animated Hamburger Bars ──────────────────────────────────────────────────
// Three lines morph into an X with spring physics without triggering SVG render errors.
const HamburgerIcon: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <div
      style={{
        width: '18px',
        height: '14px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      aria-hidden="true"
    >
      <motion.span
        style={{
          width: '100%',
          height: '2px',
          backgroundColor: 'currentColor',
          borderRadius: '2px',
          display: 'block',
          transformOrigin: 'left center',
        }}
        animate={
          open
            ? { rotate: 45, x: 2, y: -1 }
            : { rotate: 0, x: 0, y: 0 }
        }
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        style={{
          width: '100%',
          height: '2px',
          backgroundColor: 'currentColor',
          borderRadius: '2px',
          display: 'block',
          transformOrigin: 'center',
        }}
        animate={
          open
            ? { opacity: 0, scaleX: 0 }
            : { opacity: 1, scaleX: 1 }
        }
        transition={{ duration: 0.18 }}
      />
      <motion.span
        style={{
          width: '100%',
          height: '2px',
          backgroundColor: 'currentColor',
          borderRadius: '2px',
          display: 'block',
          transformOrigin: 'left center',
        }}
        animate={
          open
            ? { rotate: -45, x: 2, y: 1 }
            : { rotate: 0, x: 0, y: 0 }
        }
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
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
      className={`site-header ${isScrolled ? 'scrolled' : ''}`}
      role="banner"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container">
        <LiquidGlass
          pill
          level="interactive"
          elevation="floating"
          className="liquid-glass-navbar"
          style={{ width: '100%' }}
          optics={{
            frost: 24,
            dispersion: 0.12,
            sheen: 0.48,
            bend: 0.22,
            curvature: 0.12,
            specular: 0.7,
          }}
        >
          <div className="liquid-glass-navbar-inner">
            {/* Brand Logo */}
            <motion.a
              href="/"
              className="brand-logo"
              aria-label="Raman Kumar Sharma — Portfolio"
              onClick={(e) => handleLinkClick(e, '/', 'hero')}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="brand-glyph" aria-hidden="true">R</div>
              <span className="brand-name">{personalInfo.name}</span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="site-nav desktop-nav" role="navigation" aria-label="Main Navigation">
              <ul className="nav-menu">
                {NAV_ITEMS.map((item) => {
                  const isActive =
                    activeSection === item.id ||
                    (item.id === 'certifications' && activeSection === 'specializations');

                  return (
                    <li key={item.label} className="nav-item">
                      <a
                        href={item.path}
                        className={`nav-link ${isActive ? 'active' : ''}`}
                        onClick={(e) => handleLinkClick(e, item.path, item.id)}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active-nav-indicator"
                            className="active-nav-pill-indicator"
                            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                          />
                        )}
                        <span className="nav-link-text">{item.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Mobile Actions / Hamburger Button */}
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
        </LiquidGlass>
      </div>

      {/* Mobile Dropdown Menu — AnimatePresence for smooth mount/unmount */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            role="navigation"
            aria-label="Mobile Navigation"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mobile-nav-dropdown-wrapper"
          >
            <div className="mobile-nav-dropdown-panel">
              <ul className="mobile-nav-list">
                {NAV_ITEMS.map((item) => {
                  const isActive =
                    activeSection === item.id ||
                    (item.id === 'certifications' && activeSection === 'specializations');

                  return (
                    <motion.li key={item.label} variants={menuItemVariants}>
                      <a
                        href={item.path}
                        className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                        onClick={(e) => handleLinkClick(e, item.path, item.id)}
                      >
                        <span className="mobile-nav-link-label">{item.label}</span>
                        {isActive ? (
                          <span className="mobile-nav-active-badge">Active</span>
                        ) : (
                          <svg className="mobile-nav-chevron" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

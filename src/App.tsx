import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { CursorTrail } from './components/CursorTrail';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CertificationsPage } from './pages/CertificationsPage';
import { CertificatePage } from './pages/CertificatePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFound } from './pages/NotFound';
import { useLenis, scrollToTop, recalculateScroll } from './hooks/useLenis';

// Route aliases mapping to canonical routes
const CANONICAL_ROUTES: Record<string, string> = {
  '/': '/',
  '/overview': '/',
  '/home': '/',
  '/projects': '/projects',
  '/certifications': '/certifications',
  '/specializations': '/certifications',
  '/credentials': '/certifications',
  '/about': '/about',
  '/engineering': '/about',
  '/timeline': '/about',
  '/contact': '/contact',
};

// Base path helper for GitHub Pages sub-path support ('/Portfolio' in prod, '' in dev)
const BASE_PATH = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

const normalizePath = (path: string): string => {
  let cleaned = path.toLowerCase().trim();
  // Strip GitHub Pages repository sub-path (e.g. '/Portfolio')
  if (BASE_PATH && cleaned.startsWith(BASE_PATH.toLowerCase())) {
    cleaned = cleaned.slice(BASE_PATH.length);
  }
  if (cleaned.length > 1 && cleaned.endsWith('/')) {
    cleaned = cleaned.slice(0, -1);
  }
  return cleaned || '/';
};

// Converts an internal route (e.g. '/projects') to a full browser URL (e.g. '/Portfolio/projects' or '/projects')
const toBrowserPath = (path: string): string => {
  const norm = path.startsWith('/') ? path : `/${path}`;
  return BASE_PATH ? `${BASE_PATH}${norm}` : norm;
};

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => normalizePath(window.location.pathname));
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  // Initialize smooth scroll momentum
  useLenis();

  // Determine active section id for navbar highlighting
  const getSectionForPath = (path: string): string => {
    if (path === '/' || path === '/overview') return 'hero';
    if (path === '/projects') return 'projects';
    if (path === '/certifications' || path === '/specializations' || path.startsWith('/certificate')) return 'certifications';
    if (path === '/about') return 'about';
    if (path === '/contact') return 'contact';
    return '';
  };

  // Programmatic navigation handler
  const handleNavigate = useCallback((path: string, sectionId?: string) => {
    const normalized = normalizePath(path);

    // Deep Certificate Route check (/certificate/:id)
    if (normalized.startsWith('/certificate')) {
      setCurrentPath(normalized);
      setIsNotFound(false);
      setActiveSection('certifications');
      window.history.pushState(null, '', toBrowserPath(normalized));
      scrollToTop(true);
      return;
    }

    // Canonical route match
    const canonical = CANONICAL_ROUTES[normalized];
    if (canonical) {
      setCurrentPath(canonical);
      setIsNotFound(false);
      const targetSec = sectionId || getSectionForPath(canonical);
      setActiveSection(targetSec);
      window.history.pushState(null, '', toBrowserPath(canonical));
      scrollToTop(true);
    } else {
      setCurrentPath(normalized);
      setIsNotFound(true);
      setActiveSection('');
      window.history.pushState(null, '', toBrowserPath(normalized));
      scrollToTop(true);
    }
  }, []);

  // Handle initial page load and legacy hash migration (e.g. #projects -> /projects)
  useEffect(() => {
    const path = normalizePath(window.location.pathname);

    // If an old URL hash exists, migrate cleanly
    if (window.location.hash && window.location.hash.length > 1) {
      const hashId = window.location.hash.substring(1);
      const targetPath = hashId === 'hero' ? '/' : `/${hashId}`;
      const canonical = CANONICAL_ROUTES[targetPath] || targetPath;
      window.history.replaceState(null, '', toBrowserPath(canonical));
      setCurrentPath(canonical);
      setIsNotFound(false);
      setActiveSection(getSectionForPath(canonical));
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    if (path.startsWith('/certificate')) {
      setCurrentPath(path);
      setIsNotFound(false);
      setActiveSection('certifications');
      return;
    }

    const canonical = CANONICAL_ROUTES[path];
    if (canonical) {
      setCurrentPath(canonical);
      setIsNotFound(false);
      setActiveSection(getSectionForPath(canonical));
    } else {
      setIsNotFound(true);
      setActiveSection('');
    }
  }, []);

  // Handle browser Back / Forward history buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = normalizePath(window.location.pathname);

      if (path.startsWith('/certificate')) {
        setCurrentPath(path);
        setIsNotFound(false);
        setActiveSection('certifications');
        return;
      }

      const canonical = CANONICAL_ROUTES[path];
      if (canonical) {
        setCurrentPath(canonical);
        setIsNotFound(false);
        setActiveSection(getSectionForPath(canonical));
      } else {
        setCurrentPath(path);
        setIsNotFound(true);
        setActiveSection('');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Intercept internal links for client-side routing
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Handle old hash hrefs if any exist
      if (href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const targetId = href.substring(1);
        if (targetId === 'main-content') {
          const el = document.getElementById('main-content');
          el?.focus();
          el?.scrollIntoView({ behavior: 'smooth' });
          return;
        }
        const targetPath = targetId === 'hero' ? '/' : `/${targetId}`;
        handleNavigate(targetPath, targetId);
      }
      // Handle internal relative paths like /about, /projects, /certifications
      else if (href.startsWith('/') && !href.startsWith('//')) {
        e.preventDefault();
        const normalized = normalizePath(href);
        handleNavigate(normalized);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [handleNavigate]);


  // Page Transition Variants
  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: 'easeIn' as const } },
  };

  // Render Page Content based on currentPath
  const renderPage = () => {
    if (isNotFound) {
      return <NotFound onNavigate={handleNavigate} currentPath={currentPath} />;
    }

    if (currentPath.startsWith('/certificate')) {
      return <CertificatePage currentPath={currentPath} onNavigate={handleNavigate} />;
    }

    switch (currentPath) {
      case '/':
      case '/overview':
        return <HomePage onNavigate={handleNavigate} />;
      case '/projects':
        return <ProjectsPage onNavigate={handleNavigate} />;
      case '/certifications':
      case '/specializations':
        return <CertificationsPage onNavigate={handleNavigate} />;
      case '/about':
        return <AboutPage onNavigate={handleNavigate} />;
      case '/contact':
        return <ContactPage onNavigate={handleNavigate} />;
      default:
        return <NotFound onNavigate={handleNavigate} currentPath={currentPath} />;
    }
  };

  return (
    <div className="app-container">
      {/* Canvas-based Liquid Glass smooth spring cursor trail */}
      <CursorTrail />

      {/* Top Scroll Depth Progress Indicator */}
      <ScrollProgress />

      {/* Liquid Glass Atmospheric Ambient Depth Mesh */}
      <div className="liquid-ambient-bg" aria-hidden="true" />

      {/* Accessible skip link */}
      <a href="#main-content" className="skip-link">
        Skip to primary content
      </a>

      {/* Liquid Glass persistent navigation bar */}
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main content landmark with animated liquid page transition */}
      <main id="main-content" className="content-wrapper">
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            scrollToTop(true);
            recalculateScroll();
          }}
        >
          <motion.div
            key={currentPath}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Colophon & verified links footer */}
      <Footer />

      {/* Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {!isNotFound && activeSection !== 'hero' && activeSection !== '' && (
          <motion.button
            type="button"
            aria-label="Scroll to top"
            onClick={() => scrollToTop(false)}
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.12, y: -3, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'fixed',
              bottom: '28px',
              right: '24px',
              zIndex: 999,
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'var(--skeuo-btn-bg)',
              border: '1px solid var(--skeuo-plate-border)',
              boxShadow: 'var(--skeuo-btn-shadow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-teal)',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: 700,
            }}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

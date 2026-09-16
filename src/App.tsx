import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { NotFound } from './pages/NotFound';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Ecosystem } from './sections/Ecosystem';
import { Engineering } from './sections/Engineering';
import { TechStack } from './sections/TechStack';
import { Specializations } from './sections/Specializations';
import { Timeline } from './sections/Timeline';
import { Contact } from './sections/Contact';
import { useLenis, smoothScrollTo } from './hooks/useLenis';

const ROUTE_SECTION_MAP: Record<string, string> = {
  '/': 'hero',
  '/overview': 'hero',
  '/about': 'about',
  '/projects': 'projects',
  '/ecosystem': 'ecosystem',
  '/engineering': 'engineering',
  '/stack': 'stack',
  '/specializations': 'specializations',
  '/timeline': 'timeline',
  '/contact': 'contact',
};

const SECTION_ROUTE_MAP: Record<string, string> = {
  hero: '/',
  about: '/about',
  projects: '/projects',
  ecosystem: '/ecosystem',
  engineering: '/engineering',
  stack: '/stack',
  specializations: '/specializations',
  timeline: '/timeline',
  contact: '/contact',
};

const normalizePath = (path: string): string => {
  const cleaned = path.toLowerCase().trim();
  if (cleaned.length > 1 && cleaned.endsWith('/')) {
    return cleaned.slice(0, -1);
  }
  return cleaned || '/';
};

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => normalizePath(window.location.pathname));
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  // Initialize Lenis smooth scroll — runs at display refresh rate
  useLenis();

  // Smooth scroll utility — uses Lenis for momentum, falls back to native
  const scrollToSection = useCallback((sectionId: string, smooth: boolean = true) => {
    const el = document.getElementById(sectionId);
    if (el) {
      if (smooth) {
        smoothScrollTo(el, 85);
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY - 85;
        window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
      }
    }
  }, []);


  // Programmatic navigation handler
  const handleNavigate = useCallback((path: string, sectionId?: string) => {
    const normalized = normalizePath(path);
    setCurrentPath(normalized);

    if (ROUTE_SECTION_MAP[normalized]) {
      setIsNotFound(false);
      const targetSection = sectionId || ROUTE_SECTION_MAP[normalized];
      setActiveSection(targetSection);
      window.history.pushState(null, '', normalized);
      scrollToSection(targetSection, true);
    } else {
      setIsNotFound(true);
      window.history.pushState(null, '', normalized);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [scrollToSection]);

  // Handle initial page load and deep linking
  useEffect(() => {
    const path = normalizePath(window.location.pathname);
    // If there is an old hash (e.g. #projects), migrate cleanly to /projects
    if (window.location.hash && window.location.hash.length > 1) {
      const hashId = window.location.hash.substring(1);
      if (SECTION_ROUTE_MAP[hashId]) {
        const cleanPath = SECTION_ROUTE_MAP[hashId];
        window.history.replaceState(null, '', cleanPath);
        setCurrentPath(cleanPath);
        setIsNotFound(false);
        setActiveSection(hashId);
        setTimeout(() => scrollToSection(hashId, false), 100);
        return;
      }
    }

    if (ROUTE_SECTION_MAP[path]) {
      setIsNotFound(false);
      const section = ROUTE_SECTION_MAP[path];
      setActiveSection(section);
      if (section !== 'hero') {
        // Deep link scroll after layout mount
        setTimeout(() => scrollToSection(section, true), 150);
      }
    } else {
      setIsNotFound(true);
    }
  }, [scrollToSection]);

  // Handle browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = normalizePath(window.location.pathname);
      setCurrentPath(path);

      if (ROUTE_SECTION_MAP[path]) {
        setIsNotFound(false);
        const section = ROUTE_SECTION_MAP[path];
        setActiveSection(section);
        scrollToSection(section, true);
      } else {
        setIsNotFound(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [scrollToSection]);

  // Scroll spy with clean URL pathname synchronization (NO hash #)
  useEffect(() => {
    if (isNotFound) return;

    const sections = [
      'hero',
      'about',
      'projects',
      'ecosystem',
      'engineering',
      'stack',
      'specializations',
      'timeline',
      'contact',
    ];

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        ticking = false;
        const scrollPosition = window.scrollY + 220;

        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && el.offsetTop <= scrollPosition) {
            const currentSec = sections[i];
            const targetPath = SECTION_ROUTE_MAP[currentSec] || '/';

            setActiveSection(currentSec);

            // Update browser URL cleanly without page reload and without '#'
            if (window.location.pathname !== targetPath) {
              window.history.replaceState(null, '', targetPath);
              setCurrentPath(targetPath);
            }
            break;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isNotFound]);

  // Intercept any stray in-page anchor clicks to prevent '#' hash changes
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
        const cleanPath = SECTION_ROUTE_MAP[targetId] || `/${targetId}`;
        handleNavigate(cleanPath, targetId);
      }
      // Handle internal relative paths like /about, /projects
      else if (href.startsWith('/') && !href.startsWith('//')) {
        e.preventDefault();
        const normalized = normalizePath(href);
        const targetId = ROUTE_SECTION_MAP[normalized];
        handleNavigate(normalized, targetId);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [handleNavigate]);

  // Render 404 page if path is unmapped
  if (isNotFound) {
    return <NotFound onNavigate={handleNavigate} currentPath={currentPath} />;
  }

  return (
    <div className="app-container">
      {/* Top Scroll Depth Progress Bar (himamritshop.in style) */}
      <ScrollProgress />

      {/* Subtle Neomorphic Ambient Depth Overlay */}
      <div className="neo-ambient-bg" aria-hidden="true" />

      {/* Accessible skip link */}
      <a href="#hero" className="skip-link">
        Skip to primary content
      </a>

      {/* Persistent minimal navigation */}
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main content landmark */}
      <main id="main-content" className="content-wrapper">
        <Hero />
        <About />
        <Projects />
        <Ecosystem />
        <Engineering />
        <TechStack />
        <Specializations />
        <Timeline />
        <Contact />
      </main>

      {/* Colophon & verified links footer */}
      <Footer />

      {/* Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {activeSection !== 'hero' && (
          <motion.button
            type="button"
            aria-label="Scroll to top"
            onClick={() => handleNavigate('/', 'hero')}
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
              background: 'var(--bg-card)',
              border: 'var(--nm-border)',
              boxShadow: 'var(--nm-shadow-md)',
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

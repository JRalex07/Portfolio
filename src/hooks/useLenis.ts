/**
 * useLenis — High-performance smooth scroll engine.
 * 
 * Key architectural guarantees:
 * 1. Desktop: Silky 60fps/120fps wheel momentum interpolation via RAF.
 * 2. Mobile / Touchscreen: Zero touch hijacking. Allows native GPU-accelerated
 *    touch scrolling on mobile devices to prevent touch jank and scroll lock.
 * 3. Dynamic Height Synchronization: Uses a ResizeObserver on document.body so
 *    when dynamic content expands (accordions, filtered cards, lazy images),
 *    Lenis's scroll limit recalculates immediately.
 * 4. Seamless Route Transitions: Dispatches instant position alignment to prevent
 *    race conditions between native scroll and the virtual scroll loop.
 */
import { useEffect } from 'react';
import Lenis from 'lenis';

let globalLenis: Lenis | null = null;

export const useLenis = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Touch-only mobile devices have native 120Hz momentum scrolling.
    // Hijacking touch on mobile is the primary cause of frozen / stuck scroll.
    const isTouchOnly =
      window.matchMedia('(pointer: coarse)').matches &&
      !window.matchMedia('(pointer: fine)').matches;

    if (isTouchOnly) {
      return;
    }

    // Initialize tuned Lenis instance for fine-pointer (mouse / trackpad) devices
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 0, // Never intercept or distort touch events
      syncTouch: false,
      infinite: false,
      autoResize: true,
      prevent: (node: HTMLElement) => {
        return (
          node.classList.contains('lenis-prevent') ||
          node.closest('.lenis-prevent') !== null
        );
      },
    });

    globalLenis = lenis;

    // RAF loop
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Active ResizeObserver to detect dynamic page height changes
    // (e.g. accordion expansion, route mounting, image loads)
    let resizeTimer: number | undefined;
    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        lenis.resize();
      }, 60);
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      window.clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
      globalLenis = null;
    };
  }, []);
};

/**
 * Access the active Lenis instance
 */
export const getLenis = (): Lenis | null => globalLenis;

/**
 * Recalculate scroll dimensions when route or content changes
 */
export const recalculateScroll = (): void => {
  if (globalLenis) {
    globalLenis.resize();
  }
};

/**
 * Scroll to top of viewport cleanly without fighting Lenis
 */
export const scrollToTop = (immediate: boolean = false): void => {
  if (globalLenis) {
    globalLenis.scrollTo(0, {
      immediate,
      duration: immediate ? 0 : 0.85,
      force: true,
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior: immediate ? 'auto' : 'smooth',
    });
  }
};

/**
 * Smooth scroll to a target element or selector
 */
export const smoothScrollTo = (target: HTMLElement | string, offset: number = 85) => {
  if (globalLenis) {
    globalLenis.scrollTo(target, {
      offset: -offset,
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      force: true,
    });
  } else if (typeof target === 'string') {
    const el = document.getElementById(target.replace(/^#/, ''));
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  } else if (target instanceof HTMLElement) {
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

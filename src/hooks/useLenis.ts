/**
 * useLenis — Initializes Lenis smooth scroll for silky 60fps+
 * momentum scrolling, identical to himamritshop.in feel.
 *
 * Integrates with Framer Motion's useScroll for the progress bar.
 */
import { useEffect } from 'react';
import Lenis from 'lenis';

let globalLenis: Lenis | null = null;

export const useLenis = () => {
  useEffect(() => {
    // Create Lenis instance with tuned easing for a premium feel
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.8,
      infinite: false,
      syncTouch: false,
      syncTouchLerp: 0.075,
    });

    globalLenis = lenis;

    // RAF loop — runs at display refresh rate (60fps / 120fps)
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      globalLenis = null;
    };
  }, []);
};

/**
 * Smooth scroll to a specific element via Lenis.
 * Fallback to native scroll if Lenis isn't active.
 */
export const smoothScrollTo = (target: HTMLElement | string, offset: number = 85) => {
  if (globalLenis) {
    globalLenis.scrollTo(target, {
      offset: -offset,
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else if (typeof target === 'string') {
    const el = document.getElementById(target);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  } else if (target instanceof HTMLElement) {
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

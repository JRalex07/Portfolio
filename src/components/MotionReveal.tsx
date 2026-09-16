/**
 * MotionReveal — Utility components for smooth scroll-triggered animations.
 * Uses Framer Motion's useInView + variants for silky 60fps reveals.
 */

import React from 'react';
import { motion, Variants, useInView } from 'framer-motion';
import { useRef } from 'react';

// ─── Shared Variant Presets ───────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 28, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Reusable Reveal Components ───────────────────────────────────────────────

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  variant?: 'up' | 'in' | 'left' | 'right' | 'scale' | 'slide';
  amount?: number;
  once?: boolean;
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'aside' | 'main' | 'span' | 'p' | 'ul' | 'li';
}

const variantMap: Record<string, Variants> = {
  up: fadeUp,
  in: fadeIn,
  left: fadeLeft,
  right: fadeRight,
  scale: scaleIn,
  slide: slideUp,
};

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  style,
  delay = 0,
  variant = 'up',
  amount = 0.12,
  once = true,
  as = 'div',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  const selectedVariant = variantMap[variant] ?? fadeUp;

  // Inject delay into the visible transition
  const variantWithDelay: Variants = {
    hidden: selectedVariant.hidden,
    visible: {
      ...(selectedVariant.visible as Record<string, unknown>),
      transition: {
        ...((selectedVariant.visible as { transition?: object })?.transition ?? {}),
        delay,
      },
    },
  };

  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionComponent
      ref={ref}
      className={className}
      style={style}
      variants={variantWithDelay}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </MotionComponent>
  );
};

// ─── Stagger Container ────────────────────────────────────────────────────────

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  fast?: boolean;
  amount?: number;
  once?: boolean;
  delay?: number;
}

export const StaggerReveal: React.FC<StaggerProps> = ({
  children,
  className,
  style,
  fast = false,
  amount = 0.1,
  once = true,
  delay = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: fast ? 0.06 : 0.1,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
};

// ─── Stagger Child (use inside StaggerReveal) ─────────────────────────────────

interface StaggerChildProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'up' | 'in' | 'left' | 'right' | 'scale' | 'slide';
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'aside' | 'main' | 'span' | 'p' | 'ul' | 'li';
}

export const StaggerChild: React.FC<StaggerChildProps> = ({
  children,
  className,
  style,
  variant = 'up',
  as = 'div',
}) => {
  const selectedVariant = variantMap[variant] ?? fadeUp;
  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionComponent
      className={className}
      style={style}
      variants={selectedVariant}
    >
      {children}
    </MotionComponent>
  );
};

// ─── Hover Card Wrapper ────────────────────────────────────────────────────────

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  liftY?: number;
  onClick?: () => void;
}

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  className,
  style,
  liftY = 4,
  onClick,
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      onClick={onClick}
      whileHover={{ y: -liftY, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      whileTap={{ scale: 0.98, transition: { duration: 0.12 } }}
    >
      {children}
    </motion.div>
  );
};

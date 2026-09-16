import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="scroll-progress-indicator"
      style={{
        scaleX,
        transformOrigin: '0%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3.5px',
        background: 'linear-gradient(90deg, #0B2D61 0%, #123F87 35%, #27AFA3 70%, #70CDBB 100%)',
        zIndex: 2500,
        pointerEvents: 'none',
        boxShadow: '0 2px 10px rgba(39, 175, 163, 0.45)'
      }}
      aria-hidden="true"
    />
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { ArchitectureScene } from './ArchitectureScene';

export const BackgroundCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<ArchitectureScene | null>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  useEffect(() => {
    // 1. WebGL Support Detection
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebGlSupported(false);
      return;
    }

    if (!containerRef.current) return;

    const isMobile = window.innerWidth <= 768;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. Initialize Architecture Scene
    const scene = new ArchitectureScene({
      container: containerRef.current,
      isMobile,
      reducedMotion
    });

    sceneRef.current = scene;
    scene.start();

    // 3. Page Visibility State Handling
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        scene.pause();
      } else {
        scene.start();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 4. Cleanup on unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      scene.dispose();
      sceneRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="canvas-background-container"
      aria-hidden="true"
      style={{
        background: !webGlSupported
          ? 'radial-gradient(ellipse at 50% 20%, rgba(20, 184, 166, 0.04) 0%, transparent 70%)'
          : undefined
      }}
    />
  );
};

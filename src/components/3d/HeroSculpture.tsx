import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroSculpture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Dimensions
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // Renderer with transparent background and anti-aliasing
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // Lighting tuned for Light Theme
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x0284c7, 2.2); // Sapphire key light
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 1.2); // Warm amber rim light
    dirLight2.position.set(-6, -4, 4);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0x10b981, 1.0); // Emerald fill
    dirLight3.position.set(0, -6, -3);
    scene.add(dirLight3);

    // Main Group for interactive mouse parallax
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // --- 1. Central Faceted Core (Icosahedron) ---
    const coreGeo = new THREE.IcosahedronGeometry(2.1, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.85, // Glass-like optical refraction
      ior: 1.45,
      thickness: 1.2,
      specularIntensity: 1.0,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // --- 2. Geometric Wireframe Outer Cage ---
    const cageGeo = new THREE.IcosahedronGeometry(2.14, 0);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x121417,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const wireframeMesh = new THREE.Mesh(cageGeo, wireframeMat);
    rootGroup.add(wireframeMesh);

    // --- 3. Inner Technical Polyhedron ---
    const innerGeo = new THREE.OctahedronGeometry(1.2, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Sapphire core
      roughness: 0.3,
      metalness: 0.8,
      wireframe: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    rootGroup.add(innerMesh);

    // --- 4. Orbiting Rings (Ecosystem Rings) ---
    const ringGeo1 = new THREE.TorusGeometry(3.1, 0.022, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.85,
      roughness: 0.2,
      transparent: true,
      opacity: 0.75,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    rootGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.6, 0.018, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.9,
      roughness: 0.25,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    rootGroup.add(ring2);

    // --- 5. Satellite Node Spheres (Distributed System Nodes) ---
    const nodeGeo = new THREE.SphereGeometry(0.18, 16, 16);
    
    // Node 1: Mobile Client (Sapphire)
    const nodeMat1 = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2, metalness: 0.7 });
    const node1 = new THREE.Mesh(nodeGeo, nodeMat1);
    rootGroup.add(node1);

    // Node 2: Backend Architecture (Emerald)
    const nodeMat2 = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.2, metalness: 0.7 });
    const node2 = new THREE.Mesh(nodeGeo, nodeMat2);
    rootGroup.add(node2);

    // Node 3: MCP Agent Runtime (Amber)
    const nodeMat3 = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.2, metalness: 0.7 });
    const node3 = new THREE.Mesh(nodeGeo, nodeMat3);
    rootGroup.add(node3);

    // Node 4: Cloud Infrastructure (Charcoal)
    const nodeMat4 = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.2, metalness: 0.7 });
    const node4 = new THREE.Mesh(nodeGeo, nodeMat4);
    rootGroup.add(node4);

    // --- 6. Ambient Floating Constellation Particles ---
    const particlesCount = 75;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x64748b,
      size: 0.05,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Tracking with Damped Interpolation
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.35;
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    container.addEventListener('mouseleave', handlePointerLeave);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth damped lerp for mouse parallax
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      rootGroup.rotation.y = elapsedTime * 0.18 + currentX;
      rootGroup.rotation.x = Math.sin(elapsedTime * 0.12) * 0.15 + currentY;

      // Inner components micro-rotations
      innerMesh.rotation.y = -elapsedTime * 0.35;
      innerMesh.rotation.z = elapsedTime * 0.2;

      ring1.rotation.z = elapsedTime * 0.25;
      ring2.rotation.z = -elapsedTime * 0.2;

      // Orbit nodes along harmonic paths
      const t1 = elapsedTime * 0.65;
      node1.position.set(Math.cos(t1) * 3.1, Math.sin(t1 * 0.8) * 1.2, Math.sin(t1) * 3.1);

      const t2 = elapsedTime * 0.5 + Math.PI * 0.7;
      node2.position.set(Math.sin(t2) * 3.4, Math.cos(t2 * 1.1) * 1.5, Math.cos(t2) * 3.4);

      const t3 = elapsedTime * 0.4 + Math.PI * 1.3;
      node3.position.set(Math.cos(t3 * 0.9) * 3.6, Math.sin(t3) * 3.6, Math.sin(t3 * 0.9) * 1.4);

      const t4 = elapsedTime * 0.55 + Math.PI * 0.2;
      node4.position.set(Math.sin(t4 * 1.2) * 1.6, Math.cos(t4) * 3.2, Math.sin(t4) * 3.2);

      // Subtle breath/float
      rootGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.12;

      renderer.render(scene, camera);
    };

    if (prefersReducedMotion) {
      // Just render a single clean frame without running continuous RAF
      renderer.render(scene, camera);
    } else {
      animate();
    }

    // Resize Observer for responsive canvas sizing without layout jumps
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
          if (prefersReducedMotion) {
            renderer.render(scene, camera);
          }
        }
      }
    });

    // Pause rendering when tab is hidden to save GPU cycles
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else if (!prefersReducedMotion) {
        clock.start();
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up all WebGL resources on unmount
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mouseleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      coreGeo.dispose();
      coreMat.dispose();
      cageGeo.dispose();
      wireframeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      nodeGeo.dispose();
      nodeMat1.dispose();
      nodeMat2.dispose();
      nodeMat3.dispose();
      nodeMat4.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-3d-sculpture-card"
      aria-label="Interactive 3D Architectural Core Visualization"
    >
      {/* Top telemetry indicator badge */}
      <div className="hero-3d-badge">
        <span className="hero-3d-badge-dot" />
        <span className="hero-3d-badge-text">Interactive Systems Core · Three.js</span>
      </div>

      <canvas
        ref={canvasRef}
        className="hero-3d-canvas"
        style={{ display: 'block', width: '100%', height: '100%' }}
      />

      {/* Subtle bottom caption */}
      <div className="hero-3d-footer">
        <span className="hero-3d-node-label">● Flutter Client</span>
        <span className="hero-3d-node-label">● Distributed Backend</span>
        <span className="hero-3d-node-label">● MCP Runtime</span>
      </div>
    </div>
  );
};

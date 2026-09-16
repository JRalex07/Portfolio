import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Layers, BookOpen, Mail } from 'lucide-react';
import { personalInfo } from '../data/personal';

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const telemetryItem = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero-wrapper section" aria-label="Introduction">
      <div className="container">
        <motion.div
          className="hero-content"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Status Pill with subtle float */}
          <motion.div
            className="hero-status-pill"
            variants={item}
            whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
          >
            <motion.span
              className="status-dot"
              aria-hidden="true"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span>Systems & Mobile Application Engineer</span>
          </motion.div>

          {/* Main Title Reveal — word-by-word pop */}
          <motion.h1
            className="hero-title"
            variants={item}
          >
            {personalInfo.name}
            <span>Architecting Multi-App Ecosystems & Agentic Execution Environments</span>
          </motion.h1>

          {/* Lead Intro Text */}
          <motion.p
            className="hero-lead"
            variants={item}
          >
            I engineer software systems where mobile clients, distributed backend workflows, and intelligent execution protocols connect. Focused on building production Flutter applications, robust multi-language backends, and standardized Model Context Protocol (MCP) agent environments.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            className="hero-actions"
            variants={item}
          >
            {[
              { href: '/projects', label: 'View Live Projects', icon: <ArrowRight size={14} aria-hidden="true" />, isPrimary: true },
              { href: 'https://cloudpower.store', label: 'cloudpower.store ↗', icon: <Globe size={14} aria-hidden="true" />, isExternal: true },
              { href: 'https://himamritshop.in', label: 'himamritshop.in ↗', icon: <Globe size={14} aria-hidden="true" />, isExternal: true },
              { href: '/ecosystem', label: 'Ecosystem Architecture', icon: <Layers size={14} aria-hidden="true" /> },
              { href: '/specializations', label: 'Technical Curriculums', icon: <BookOpen size={14} aria-hidden="true" /> },
              { href: '/contact', label: 'Contact Me', icon: <Mail size={14} aria-hidden="true" /> },
            ].map((btn, idx) => (
              <motion.a
                key={btn.label}
                href={btn.href}
                className={`btn ${btn.isPrimary ? 'btn-primary' : 'btn-secondary'}`}
                {...(btn.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.35 + idx * 0.06, ease: [0.16, 1, 0.3, 1] as const }}
                whileHover={{ y: -3, scale: 1.04, transition: { duration: 0.18 } }}
                whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
              >
                {btn.icon}
                <span>{btn.label}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Live Telemetry Strip */}
          <motion.div
            className="hero-telemetry-strip"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.7 },
              },
            }}
          >
            {[
              { label: 'Primary Stack', value: 'Flutter · Python · Java · C# · TS' },
              { label: 'Live Deployments', value: 'cloudpower.store & himamritshop.in' },
              { label: 'Architecture Focus', value: 'Multi-Client Systems & MCP Agents' },
              { label: 'Engineering Discipline', value: 'Deterministic State & Defensive Runtimes' },
            ].map((tel) => (
              <motion.div
                key={tel.label}
                className="telemetry-item"
                variants={telemetryItem}
                whileHover={{ y: -2, transition: { duration: 0.18 } }}
              >
                <span className="telemetry-label">{tel.label}</span>
                <span className="telemetry-value">{tel.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

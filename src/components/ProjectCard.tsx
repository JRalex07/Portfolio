import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Terminal, CheckCircle2, ArrowUpRight, Globe } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  return (
    <motion.article
      className={`project-card ${project.isFeatured ? 'featured' : ''}`}
      initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } }}
      whileTap={{ scale: 0.99, transition: { duration: 0.12 } }}
    >
      <div className="project-header">
        <motion.div
          className="project-kicker"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08 + 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="badge badge-teal">{project.category}</span>
          <span className="text-mono" style={{ fontSize: '0.75rem', fontWeight: 650, color: 'var(--text-muted)' }}>{project.badge}</span>
        </motion.div>
        <motion.h3
          className="project-title"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08 + 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.title}
        </motion.h3>
        <p className="project-subtitle">{project.subtitle}</p>
      </div>

      <div className="project-architecture-box">
        <span className="box-title">
          <Layers size={14} aria-hidden="true" />
          The Engineering Challenge
        </span>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55, fontWeight: 450 }}>
          {project.problem}
        </p>
      </div>

      <div className="project-architecture-box">
        <span className="box-title" style={{ color: 'var(--accent-teal)' }}>
          <Terminal size={14} aria-hidden="true" />
          Architectural Implementation
        </span>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)', lineHeight: 1.55, fontWeight: 450 }}>
          {project.solution}
        </p>
        <ul className="arch-list">
          {project.architectureDetails.map((detail, idx) => (
            <motion.li
              key={idx}
              className="arch-list-item"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="arch-list-bullet" style={{ color: 'var(--accent-teal)' }}>›</span>
              <span>{detail}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div>
        <span className="box-title" style={{ color: 'var(--accent-indigo)', marginBottom: 'var(--space-2)' }}>
          <CheckCircle2 size={14} aria-hidden="true" />
          Key System Capabilities
        </span>
        <ul className="arch-list">
          {project.keyFeatures.map((feat, idx) => (
            <motion.li
              key={idx}
              className="arch-list-item"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.045, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="arch-list-bullet" style={{ color: 'var(--accent-indigo)', fontWeight: 700 }}>•</span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{feat}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div
        className="project-tech-pills"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {project.technologies.map((tech, tIdx) => (
          <motion.span
            key={tech}
            className="code-tag"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: tIdx * 0.04 }}
            whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>

      {/* Action Links with Real URLs */}
      <motion.div
        style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'auto', paddingTop: 'var(--space-4)', borderTop: '1px solid rgba(195, 206, 222, 0.45)' }}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        {project.liveUrl && (
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm btn-external"
            aria-label={`Open live site for ${project.title} (${project.liveUrl})`}
            whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
            whileTap={{ scale: 0.97 }}
          >
            <Globe size={14} aria-hidden="true" />
            <span>Launch {project.liveUrl.replace('https://', '')}</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </motion.a>
        )}

        {project.secondaryUrl && (
          <motion.a
            href={project.secondaryUrl.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm btn-external"
            aria-label={`Open ${project.secondaryUrl.label}`}
            whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
            whileTap={{ scale: 0.97 }}
          >
            <Globe size={14} aria-hidden="true" />
            <span>{project.secondaryUrl.label}</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </motion.a>
        )}

        {project.githubUrl && (
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm btn-external"
            aria-label="Inspect GitHub repository"
            whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span>GitHub Profile</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </motion.a>
        )}
      </motion.div>
    </motion.article>
  );
};

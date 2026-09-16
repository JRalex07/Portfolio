import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';
import { Reveal } from '../components/MotionReveal';

export const Projects: React.FC = () => {
  const featuredProjects = projects.filter((p) => p.isFeatured);
  const supportingProjects = projects.filter((p) => !p.isFeatured);

  return (
    <section id="projects" className="section" aria-label="Engineered Projects">
      <div className="container">
        <SectionHeading
          kicker="Production Architectures"
          title="Engineered Systems & Applied Applications"
          description="Projects demonstrating real system design, cross-platform mobile lifecycles, and deterministic agent execution harnesses."
        />

        {/* Featured Projects Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginBottom: 'var(--space-12)' }}>
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Supporting Projects Header */}
        <Reveal variant="up">
          <div style={{ marginBottom: 'var(--space-6)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-8)' }}>
            <span className="section-kicker">Core System Modules</span>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Supporting Platforms & Runtime Harnesses</h3>
          </div>
        </Reveal>

        {/* Supporting 2-Column Grid */}
        <div className="arch-grid-2">
          {supportingProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

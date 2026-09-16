import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { Reveal, StaggerReveal, StaggerChild, HoverCard } from '../components/MotionReveal';

export const Ecosystem: React.FC = () => {
  const cards = [
    {
      color: 'var(--accent-teal)',
      title: 'Idempotent Order Broker',
      desc: 'Ingests high-concurrency order intents with cryptographic client keys to eliminate duplicate checkouts and race conditions across multi-merchant baskets.',
    },
    {
      color: 'var(--accent-amber)',
      title: 'Proximity Dispatch Routing',
      desc: 'Dynamic GPS stream evaluation matching active courier locations to merchant staging bays, reducing idle latency and transit overhead.',
    },
    {
      color: '#0B2D61',
      title: 'Direct Dispatch Confirmation',
      desc: 'End-to-end receipt handover protocol preventing disputed drop-offs and synchronizing merchant ledgers upon verified parcel delivery.',
    },
  ];

  return (
    <section id="ecosystem" className="section" aria-label="CloudPower Software Ecosystem">
      <div className="container">
        <SectionHeading
          kicker="Featured System Ecosystem"
          title="CloudPower: 6-App Distributed Commerce & Logistics Network"
          description="A synchronized enterprise software topology coordinating Consumer, Merchant, Admin, Support, Rider, and Salesman operational surfaces around a unified event broker."
        />

        <Reveal variant="scale">
          <ArchitectureDiagram />
        </Reveal>

        {/* Technical Architectural Notes */}
        <StaggerReveal className="arch-grid-3" style={{ marginTop: 'var(--space-8)' }}>
          {cards.map((card, i) => (
            <StaggerChild key={i} variant="up">
              <HoverCard liftY={5}>
                <div className="arch-frame" style={{ padding: 'var(--space-5)', height: '100%' }}>
                  <motion.span
                    className="box-title"
                    style={{ color: card.color, marginBottom: 'var(--space-2)' }}
                    whileHover={{ x: 3, transition: { duration: 0.2 } }}
                  >
                    {card.title}
                  </motion.span>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {card.desc}
                  </p>
                </div>
              </HoverCard>
            </StaggerChild>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
};

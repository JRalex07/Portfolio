import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { Reveal, HoverCard } from '../components/MotionReveal';

const mcpSteps = [
  { step: 'STEP 01', color: 'var(--accent-teal)', title: 'Client Prompt & Intent', desc: 'LLM identifies required tool action and outputs structured JSON schema invocation parameter.' },
  { step: 'STEP 02', color: 'var(--accent-amber)', title: 'Policy & Sandbox Gate', desc: 'Runtime evaluates parameter safety bounds, validates caller permissions, and allocates execution budget.' },
  { step: 'STEP 03', color: 'var(--accent-indigo)', title: 'Isolated Execution', desc: 'Dedicated worker processes the operation in a stateless execution sandbox with strict memory limits.' },
  { step: 'STEP 04', color: 'var(--accent-emerald)', title: 'Output Tracing', desc: 'Results are structured into standardized schema definitions and captured for operational telemetry.' },
];

const resilienceCards = [
  {
    title: 'Granular Exception Hierarchies',
    desc: 'Custom typed exceptions (e.g., OrderStateConflictException, MerchantQuotaExceededException) provide unambiguous semantic context, preventing generic catch (Exception) antipatterns.',
  },
  {
    title: 'Deterministic Resource Scopes',
    desc: 'Strict utilization of language resource blocks (using statements in C#, try-with-resources in Java, with context managers in Python) guaranteeing zero unclosed connection handles.',
  },
];

export const Engineering: React.FC = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<'mcp' | 'resilience'>('mcp');

  return (
    <section id="engineering" className="section" aria-label="Engineering Thinking & Architectures">
      <div className="container">
        <SectionHeading
          kicker="Systems Thinking"
          title="Architectural Workflows & Execution Topologies"
          description="How I approach deterministic agent execution, fault-tolerant exception hierarchies, and multi-service synchronization."
        />

        {/* Workflow Toggle Buttons */}
        <Reveal variant="up" delay={0.1}>
          <div className="engineering-tabs-bar" style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
            {(['mcp', 'resilience'] as const).map((tab) => (
              <motion.button
                key={tab}
                type="button"
                className={`btn ${activeWorkflow === tab ? 'btn-primary' : 'btn-secondary'} engineering-tab-btn`}
                onClick={() => setActiveWorkflow(tab)}
                whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.97 }}
              >
                {tab === 'mcp' ? <Cpu size={14} aria-hidden="true" /> : <ShieldCheck size={14} aria-hidden="true" />}
                <span>{tab === 'mcp' ? 'MCP Agent Execution Runtime' : 'Defensive Exception & Failure Recovery'}</span>
              </motion.button>
            ))}
          </div>
        </Reveal>

        {/* Animated Workflow Panels */}
        <AnimatePresence mode="wait">
          {activeWorkflow === 'mcp' ? (
            <motion.div
              key="mcp"
              className="arch-frame"
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="arch-frame-header">
                <span className="arch-tag">MODEL_CONTEXT_PROTOCOL_EXECUTION.SYS</span>
                <span className="badge badge-teal">JSON-RPC 2.0 Compliant</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--space-6)', width: '100%', maxWidth: '100%', minWidth: 0 }}>
                <motion.p
                  style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  Instead of granting LLMs unchecked API access, our MCP architecture wraps tools in strict JSON-RPC 2.0 contracts with authorization policies, token budgets, and structured execution telemetry.
                </motion.p>

                {/* Step Sequence */}
                <div className="engineering-steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 'var(--space-4)', width: '100%', maxWidth: '100%', minWidth: 0 }}>
                  {mcpSteps.map((s, i) => (
                    <HoverCard key={s.step} style={{ minWidth: 0, width: '100%', maxWidth: '100%' }}>
                      <motion.div
                        style={{ background: 'var(--bg-card)', padding: 'var(--space-5)', borderRadius: 'var(--radius-sm)', border: 'var(--nm-border)', boxShadow: 'var(--nm-shadow-sm)', height: '100%', minWidth: 0, maxWidth: '100%', boxSizing: 'border-box' }}
                        initial={{ opacity: 0, y: 16, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.45, delay: 0.12 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="text-mono" style={{ fontSize: '11px', color: s.color, fontWeight: 700, display: 'block', marginBottom: 'var(--space-1)' }}>{s.step}</span>
                        <h4 style={{ fontSize: '0.9375rem', margin: '0 0 var(--space-2)', color: 'var(--text-primary)', fontWeight: 750 }}>{s.title}</h4>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{s.desc}</p>
                      </motion.div>
                    </HoverCard>
                  ))}
                </div>

                {/* Code Snippet */}
                <motion.div
                  style={{ background: '#0f172a', padding: 'var(--space-5)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.45)', width: '100%', maxWidth: '100%', minWidth: 0, overflow: 'hidden' }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                    <Terminal size={14} color="#38bdf8" aria-hidden="true" />
                    <span className="text-mono" style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 650 }}>
                      Distributed Service Routing Pipeline Contract
                    </span>
                  </div>
                  <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: '#38bdf8', overflowX: 'auto', maxWidth: '100%', minWidth: 0, WebkitOverflowScrolling: 'touch', margin: 0 }}>
                    {`// Distributed Systems Dispatch Pipeline Specification
{
  "service": "CloudPower_Orchestration_Core",
  "pipelineStage": "DISPATCH_ROUTE_CALCULATED",
  "routingMetadata": {
    "originHub": "Darbhanga_Central_Hub",
    "destinationZone": "Patna_Express_Terminal",
    "estimatedTransitHours": 2.4,
    "fulfillmentStrategy": "SAME_DAY_INTRA_DISTRICT",
    "priorityQueue": "HIGH_EFFICIENCY_BATCH"
  },
  "status": "PIPELINE_SYNCHRONIZED"
}`}
                  </pre>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="resilience"
              className="arch-frame"
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="arch-frame-header">
                <span className="arch-tag">DEFENSIVE_RUNTIME_LIFECYCLE.NET</span>
                <span className="badge badge-amber">Fault Isolation Pattern</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--space-6)', width: '100%', maxWidth: '100%', minWidth: 0 }}>
                <motion.p
                  style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  Application systems must withstand transient network drops, invalid domain inputs, and downstream timeout failures without cascading crashes or database deadlocks.
                </motion.p>

                <div className="engineering-resilience-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'var(--space-4)', width: '100%', maxWidth: '100%', minWidth: 0 }}>
                  {resilienceCards.map((card, i) => (
                    <HoverCard key={card.title} style={{ minWidth: 0, width: '100%', maxWidth: '100%' }}>
                      <motion.div
                        style={{ background: 'var(--bg-card)', padding: 'var(--space-5)', borderRadius: 'var(--radius-sm)', border: 'var(--nm-border)', boxShadow: 'var(--nm-shadow-sm)', height: '100%', minWidth: 0, maxWidth: '100%', boxSizing: 'border-box' }}
                        initial={{ opacity: 0, y: 16, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.45, delay: 0.12 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 750, marginBottom: 'var(--space-2)' }}>{card.title}</h4>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{card.desc}</p>
                      </motion.div>
                    </HoverCard>
                  ))}
                </div>

                <motion.div
                  style={{ background: '#0f172a', padding: 'var(--space-5)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.45)', width: '100%', maxWidth: '100%', minWidth: 0, overflow: 'hidden' }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                    <Terminal size={14} color="#fbbf24" aria-hidden="true" />
                    <span className="text-mono" style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 650 }}>C# / .NET Exception Handling Architecture</span>
                  </div>
                  <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: '#fbbf24', overflowX: 'auto', maxWidth: '100%', minWidth: 0, WebkitOverflowScrolling: 'touch', margin: 0 }}>
                    {`// Defensive Exception Strategy with Explicit Domain Isolation
try {
    using var transaction = await _dbConnection.BeginTransactionAsync(ct);
    await _orderValidator.ValidateStateTransitionAsync(orderId, nextState);
    await _eventPublisher.PublishAsync(new OrderTransitionEvent(orderId, nextState));
    await transaction.CommitAsync(ct);
}
catch (OrderTransitionException ex) {
    _logger.LogWarning(ex, "Domain state transition rejected for Order {OrderId}", orderId);
    throw new SafeClientException("State transition disallowed", ex);
}
catch (TransientNetworkException ex) {
    _logger.LogError(ex, "Transient downstream network timeout. Triggering circuit breaker.");
    await _circuitBreaker.RecordFailureAsync();
    throw;
}`}
                  </pre>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

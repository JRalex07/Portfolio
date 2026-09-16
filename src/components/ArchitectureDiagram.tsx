import React, { useState } from 'react';
import { Network, ArrowRight, Activity, Terminal, Shield, Smartphone, Monitor } from 'lucide-react';
import { ecosystemApps, architectureFlow, EcosystemApp } from '../data/ecosystem';

export const ArchitectureDiagram: React.FC = () => {
  const [selectedAppId, setSelectedAppId] = useState<string>('consumer');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const selectedApp: EcosystemApp =
    ecosystemApps.find((app) => app.id === selectedAppId) || ecosystemApps[0];

  const currentStep = architectureFlow[activeStepIndex];

  return (
    <div className="ecosystem-diagram-container">
      {/* Ecosystem Visual Topology Banner */}
      <div style={{
        padding: 'var(--space-5)',
        backgroundColor: 'var(--bg-card)',
        border: 'var(--nm-border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--nm-shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Network size={18} color="var(--accent-teal)" aria-hidden="true" />
            <span className="text-mono" style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 750 }}>
              CloudPower Unified Multi-App Orchestration Topography
            </span>
          </div>
          <span className="badge badge-teal">6 Synchronized Units</span>
        </div>

        {/* Visual Relationship Chain */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          overflowX: 'auto',
          padding: 'var(--space-2) 0',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none'
        }}>
          <span style={{ padding: '5px 12px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: 'var(--nm-border)', borderRadius: 'var(--radius-pill)', fontWeight: 650, boxShadow: 'var(--nm-shadow-xs)', whiteSpace: 'nowrap', flexShrink: 0 }}>Consumer</span>
          <ArrowRight size={14} color="var(--accent-teal)" style={{ flexShrink: 0 }} aria-hidden="true" />
          <span style={{ padding: '5px 12px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: 'var(--nm-border)', borderRadius: 'var(--radius-pill)', fontWeight: 650, boxShadow: 'var(--nm-shadow-xs)', whiteSpace: 'nowrap', flexShrink: 0 }}>Order Gateway</span>
          <ArrowRight size={14} color="var(--accent-teal)" style={{ flexShrink: 0 }} aria-hidden="true" />
          <span style={{ padding: '5px 12px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: 'var(--nm-border)', borderRadius: 'var(--radius-pill)', fontWeight: 650, boxShadow: 'var(--nm-shadow-xs)', whiteSpace: 'nowrap', flexShrink: 0 }}>Admin & Support</span>
          <ArrowRight size={14} color="var(--accent-teal)" style={{ flexShrink: 0 }} aria-hidden="true" />
          <span style={{ padding: '5px 12px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: 'var(--nm-border)', borderRadius: 'var(--radius-pill)', fontWeight: 650, boxShadow: 'var(--nm-shadow-xs)', whiteSpace: 'nowrap', flexShrink: 0 }}>Merchant</span>
          <ArrowRight size={14} color="var(--accent-teal)" style={{ flexShrink: 0 }} aria-hidden="true" />
          <span style={{ padding: '5px 12px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: 'var(--nm-border)', borderRadius: 'var(--radius-pill)', fontWeight: 650, boxShadow: 'var(--nm-shadow-xs)', whiteSpace: 'nowrap', flexShrink: 0 }}>Rider / Salesman</span>
          <ArrowRight size={14} color="var(--accent-teal)" style={{ flexShrink: 0 }} aria-hidden="true" />
          <span style={{ padding: '5px 12px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: 'var(--nm-border)', borderRadius: 'var(--radius-pill)', fontWeight: 650, boxShadow: 'var(--nm-shadow-xs)', whiteSpace: 'nowrap', flexShrink: 0 }}>Fulfillment</span>
        </div>
      </div>

      {/* Interactive App Selector Tabs */}
      <div>
        <span className="text-mono text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: 'var(--space-2)' }}>
          Select Ecosystem Application Component:
        </span>
        <div className="ecosystem-nav-tabs" role="tablist">
          {ecosystemApps.map((app) => (
            <button
              key={app.id}
              role="tab"
              aria-selected={selectedAppId === app.id}
              className={`app-tab-btn ${selectedAppId === app.id ? 'active' : ''}`}
              onClick={() => setSelectedAppId(app.id)}
            >
              <span className="tab-indicator-dot" style={{ backgroundColor: app.color }} />
              <span>{app.name.replace('CloudPower ', '')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected App Deep-Dive Grid */}
      <div className="ecosystem-details-grid">
        {/* Left Column: App Specifications */}
        <div className="ecosystem-meta-pane">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              {selectedApp.id === 'consumer' || selectedApp.id === 'rider' || selectedApp.id === 'salesman' ? (
                <Smartphone size={18} color={selectedApp.color} aria-hidden="true" />
              ) : (
                <Monitor size={18} color={selectedApp.color} aria-hidden="true" />
              )}
              <h3 style={{ fontSize: '1.35rem', color: '#000000', fontWeight: 900 }}>{selectedApp.name}</h3>
            </div>
            <p style={{ color: '#374151', fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.5 }}>{selectedApp.role}</p>
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
              <span className="badge badge-yellow">Target: {selectedApp.targetUser}</span>
            </div>
          </div>

          <div className="project-architecture-box">
            <span className="box-title">
              <Shield size={14} aria-hidden="true" />
              Operational Responsibilities
            </span>
            <ul className="arch-list">
              {selectedApp.responsibilities.map((resp, i) => (
                <li key={i} className="arch-list-item">
                  <span className="arch-list-bullet">›</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="box-title" style={{ color: '#000000', marginBottom: 'var(--space-2)' }}>
              Integrated Tech Stack
            </span>
            <div className="project-tech-pills">
              {selectedApp.technologies.map((t) => (
                <span key={t} className="code-tag">{t}</span>
              ))}
            </div>
          </div>

          <div>
            <span className="box-title" style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
              Primary Network Interface Contracts
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {selectedApp.keyEndpoints.map((ep) => (
                <span key={ep} className="text-mono" style={{ fontSize: '0.75rem', background: 'var(--bg-card)', padding: '5px 12px', border: 'var(--nm-border)', borderRadius: 'var(--radius-xs)', color: 'var(--text-primary)', fontWeight: 650, boxShadow: 'var(--nm-shadow-xs)', wordBreak: 'break-all', maxWidth: '100%' }}>
                  {ep}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Event Flow Simulator */}
        <div className="ecosystem-flow-pane">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(195, 206, 222, 0.45)', paddingBottom: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Activity size={16} color="var(--accent-teal)" aria-hidden="true" />
              <span className="text-mono" style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                State Machine Event Flow
              </span>
            </div>
            <span className="text-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Step {currentStep.stepNumber} of {architectureFlow.length}
            </span>
          </div>

          {/* Stepper Buttons */}
          <div className="flow-stepper">
            {architectureFlow.map((step, idx) => (
              <button
                key={step.stepNumber}
                type="button"
                className={`step-chip ${activeStepIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveStepIndex(idx)}
                aria-label={`Inspect Stage ${step.stepNumber}: ${step.stage}`}
              >
                {step.stepNumber}. {step.stage.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Current Step Explanation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span className="badge badge-teal">{currentStep.event}</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#1F2937', lineHeight: 1.55, fontWeight: 500 }}>
              {currentStep.description}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#4B5563', fontWeight: 600 }}>
              <span>Origin: <strong style={{ color: '#000000' }}>{currentStep.sourceApp}</strong></span>
              <span>Target: <strong style={{ color: '#000000' }}>{currentStep.targetApp}</strong></span>
            </div>
          </div>

          {/* Dynamic Payload Inspector */}
          <div style={{ marginTop: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <Terminal size={14} color="#000000" aria-hidden="true" />
              <span className="text-mono" style={{ fontSize: '0.75rem', color: '#000000', fontWeight: 800 }}>
                Contract Payload Inspector (JSON):
              </span>
            </div>
            <pre className="payload-inspector">
              {JSON.stringify(currentStep.payloadSample, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

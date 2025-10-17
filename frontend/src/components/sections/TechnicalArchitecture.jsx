import React from 'react';
import { Brain, Zap, Shield, Database } from 'lucide-react';

const TechnicalArchitecture = () => {
  return (
    <section className="tech-architecture-section" id="technical">
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{textAlign: 'center', marginBottom: '4rem'}}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(139, 92, 246, 0.1)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#7c3aed',
            marginBottom: '1rem'
          }}>
            🧠 Advanced AI Architecture
          </div>
          <h2 style={{fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '1rem'}}>
            4-LLM Hidden Relay System
          </h2>
          <p style={{fontSize: '1.125rem', color: '#6b7280', maxWidth: '800px', margin: '0 auto'}}>
            Our proprietary Queer Intelligence (QI) technology leverages a sophisticated multi-model AI architecture for unparalleled accuracy and nuance in LGBTQ+ safety assessment
          </p>
        </div>

        <div className="architecture-diagram">
          <div className="llm-flow">
            <div className="llm-node">
              <Brain style={{width: '32px', height: '32px', margin: '0 auto 0.5rem'}} />
              <div style={{fontSize: '1.125rem', marginBottom: '0.5rem'}}>GPT-5</div>
              <div style={{fontSize: '0.875rem', opacity: 0.9}}>Contextual Analysis</div>
            </div>
            <div className="llm-arrow">→</div>
            <div className="llm-node">
              <Zap style={{width: '32px', height: '32px', margin: '0 auto 0.5rem'}} />
              <div style={{fontSize: '1.125rem', marginBottom: '0.5rem'}}>Claude Sonnet 4</div>
              <div style={{fontSize: '0.875rem', opacity: 0.9}}>Risk Assessment</div>
            </div>
            <div className="llm-arrow">→</div>
            <div className="llm-node">
              <Shield style={{width: '32px', height: '32px', margin: '0 auto 0.5rem'}} />
              <div style={{fontSize: '1.125rem', marginBottom: '0.5rem'}}>Gemini 2.5 Pro</div>
              <div style={{fontSize: '0.875rem', opacity: 0.9}}>Validation Layer</div>
            </div>
            <div className="llm-arrow">→</div>
            <div className="llm-node">
              <Database style={{width: '32px', height: '32px', margin: '0 auto 0.5rem'}} />
              <div style={{fontSize: '1.125rem', marginBottom: '0.5rem'}}>QI Consensus</div>
              <div style={{fontSize: '0.875rem', opacity: 0.9'}}>Final Score</div>
            </div>
          </div>

          <div style={{marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem'}}>
            <div style={{background: '#f9fafb', padding: '2rem', borderRadius: '12px'}}>
              <h3 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem'}}>
                🔒 Data Security
              </h3>
              <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                <li style={{marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem'}}>
                  <span style={{color: '#10b981', fontWeight: 'bold'}}>✔</span>
                  <span style={{fontSize: '0.875rem', color: '#4b5563'}}>End-to-end encryption for all data transmission</span>
                </li>
                <li style={{marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem'}}>
                  <span style={{color: '#10b981', fontWeight: 'bold'}}>✔</span>
                  <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Zero-knowledge architecture - we never see raw travel data</span>
                </li>
                <li style={{marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem'}}>
                  <span style={{color: '#10b981', fontWeight: 'bold'}}>✔</span>
                  <span style={{fontSize: '0.875rem', color: '#4b5563'}}>GDPR, SOC 2 Type II, ISO 27001 certified infrastructure</span>
                </li>
                <li style={{display: 'flex', alignItems: 'start', gap: '0.5rem'}}>
                  <span style={{color: '#10b981', fontWeight: 'bold'}}>✔</span>
                  <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Regular third-party security audits and penetration testing</span>
                </li>
              </ul>
            </div>

            <div style={{background: '#f9fafb', padding: '2rem', borderRadius: '12px'}}>
              <h3 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem'}}>
                📊 Data Sources
              </h3>
              <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                <li style={{marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem'}}>
                  <span style={{color: '#10b981', fontWeight: 'bold'}}>✔</span>
                  <span style={{fontSize: '0.875rem', color: '#4b5563'}}>195+ countries with real-time legal monitoring</span>
                </li>
                <li style={{marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem'}}>
                  <span style={{color: '#10b981', fontWeight: 'bold'}}>✔</span>
                  <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Community-powered safety reporting from 50,000+ LGBTQ+ travelers</span>
                </li>
                <li style={{marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem'}}>
                  <span style={{color: '#10b981', fontWeight: 'bold'}}>✔</span>
                  <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Integration with NGO networks and advocacy organizations</span>
                </li>
                <li style={{display: 'flex', alignItems: 'start', gap: '0.5rem'}}>
                  <span style={{color: '#10b981', fontWeight: 'bold'}}>✔</span>
                  <span style={{fontSize: '0.875rem', color: '#4b5563'}}>Continuous model training on anonymized incident reports</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{marginTop: '3rem', textAlign: 'center'}}>
          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1rem'
            }}
          >
            Download Technical Whitepaper
          </a>
        </div>
      </div>
    </section>
  );
};

export default TechnicalArchitecture;
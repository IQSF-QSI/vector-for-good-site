import React from 'react';
import { Brain, Zap, Shield, Database } from 'lucide-react';

const TechnicalArchitecture = () => {
  return (
    <section style={{padding: '6rem 2rem', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)'}}>      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <h2 style={{fontSize: '2.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '1rem'}}>4-LLM Hidden Relay System</h2>
        <p style={{fontSize: '1.125rem', textAlign: 'center', color: '#6b7280', marginBottom: '4rem'}}>Our proprietary Queer Intelligence technology</p>
        
        <div style={{background: 'white', padding: '3rem', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem'}}>
            <div style={{textAlign: 'center'}}>
              <div style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '2rem', borderRadius: '12px'}}>
                <Brain style={{width: '32px', height: '32px', margin: '0 auto 0.5rem'}} />
                <div style={{fontWeight: '700'}}>GPT-5</div>
                <div style={{fontSize: '0.875rem', opacity: 0.9}}>Analysis</div>
              </div>
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '2rem', borderRadius: '12px'}}>
                <Zap style={{width: '32px', height: '32px', margin: '0 auto 0.5rem'}} />
                <div style={{fontWeight: '700'}}>Claude-4</div>
                <div style={{fontSize: '0.875rem', opacity: 0.9}}>Risk</div>
              </div>
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '2rem', borderRadius: '12px'}}>
                <Shield style={{width: '32px', height: '32px', margin: '0 auto 0.5rem'}} />
                <div style={{fontWeight: '700'}}>Gemini 2.5</div>
                <div style={{fontSize: '0.875rem', opacity: 0.9}}>Validation</div>
              </div>
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '2rem', borderRadius: '12px'}}>
                <Database style={{width: '32px', height: '32px', margin: '0 auto 0.5rem'}} />
                <div style={{fontWeight: '700'}}>QI Consensus</div>
                <div style={{fontSize: '0.875rem', opacity: 0.9}}>Final Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalArchitecture;
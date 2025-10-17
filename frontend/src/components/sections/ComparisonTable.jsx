import React from 'react';
import { CheckCircle, X } from 'lucide-react';

const ComparisonTable = () => {
  return (
    <section className="comparison-section">
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{textAlign: 'center', marginBottom: '4rem'}}>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#1e40af',
            marginBottom: '1rem'
          }}>
            🎯 First-Mover Advantage
          </div>
          <h2 style={{fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '1rem'}}>
            Why Vector for Good?
          </h2>
          <p style={{fontSize: '1.125rem', color: '#6b7280', maxWidth: '700px', margin: '0 auto'}}>
            See how we compare to traditional ESG and social reporting providers
          </p>
        </div>

        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th style={{width: '40%'}}>Capability</th>
                <th style={{textAlign: 'center', background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'}}>Vector for Good</th>
                <th style={{textAlign: 'center', background: '#6b7280'}}>Traditional Providers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{fontWeight: '600'}}>LGBTQ+ Specific Safety Data</td>
                <td style={{textAlign: 'center'}}><CheckCircle className="check-icon" style={{margin: '0 auto'}} /></td>
                <td style={{textAlign: 'center'}}><X className="x-icon" style={{margin: '0 auto'}} /></td>
              </tr>
              <tr>
                <td style={{fontWeight: '600'}}>Real-Time Risk Monitoring</td>
                <td style={{textAlign: 'center'}}><CheckCircle className="check-icon" style={{margin: '0 auto'}} /></td>
                <td style={{textAlign: 'center'}}><X className="x-icon" style={{margin: '0 auto'}} /></td>
              </tr>
              <tr>
                <td style={{fontWeight: '600'}}>AI-Powered Analysis (4-LLM System)</td>
                <td style={{textAlign: 'center'}}><CheckCircle className="check-icon" style={{margin: '0 auto'}} /></td>
                <td style={{textAlign: 'center'}}><X className="x-icon" style={{margin: '0 auto'}} /></td>
              </tr>
              <tr>
                <td style={{fontWeight: '600'}}>195+ Countries Coverage</td>
                <td style={{textAlign: 'center'}}><CheckCircle className="check-icon" style={{margin: '0 auto'}} /></td>
                <td style={{textAlign: 'center'}}>Limited</td>
              </tr>
              <tr>
                <td style={{fontWeight: '600'}}>Community-Powered Data (50K+ travelers)</td>
                <td style={{textAlign: 'center'}}><CheckCircle className="check-icon" style={{margin: '0 auto'}} /></td>
                <td style={{textAlign: 'center'}}><X className="x-icon" style={{margin: '0 auto'}} /></td>
              </tr>
              <tr>
                <td style={{fontWeight: '600'}}>Quantifiable ESG S-Pillar Metrics</td>
                <td style={{textAlign: 'center'}}><CheckCircle className="check-icon" style={{margin: '0 auto'}} /></td>
                <td style={{textAlign: 'center'}}>Generic</td>
              </tr>
              <tr>
                <td style={{fontWeight: '600'}}>API Integration with HRIS/Travel Systems</td>
                <td style={{textAlign: 'center'}}><CheckCircle className="check-icon" style={{margin: '0 auto'}} /></td>
                <td style={{textAlign: 'center'}}>Limited</td>
              </tr>
              <tr>
                <td style={{fontWeight: '600'}}>Personalized Safety Protocols</td>
                <td style={{textAlign: 'center'}}><CheckCircle className="check-icon" style={{margin: '0 auto'}} /></td>
                <td style={{textAlign: 'center'}}><X className="x-icon" style={{margin: '0 auto'}} /></td>
              </tr>
              <tr>
                <td style={{fontWeight: '600'}}>Duty of Care Compliance</td>
                <td style={{textAlign: 'center'}}><CheckCircle className="check-icon" style={{margin: '0 auto'}} /></td>
                <td style={{textAlign: 'center'}}>Partial</td>
              </tr>
              <tr>
                <td style={{fontWeight: '600'}}>Incident Prevention (92% reduction)</td>
                <td style={{textAlign: 'center'}}><CheckCircle className="check-icon" style={{margin: '0 auto'}} /></td>
                <td style={{textAlign: 'center'}}>Reactive Only</td>
              </tr>
              <tr style={{background: '#f0fdf4'}}>
                <td style={{fontWeight: '700'}}>Typical Annual Cost (10K employees)</td>
                <td style={{textAlign: 'center', fontWeight: '700', color: '#10b981'}}>$50,000</td>
                <td style={{textAlign: 'center', fontWeight: '700', color: '#ef4444'}}>$150,000+</td>
              </tr>
              <tr style={{background: '#f0fdf4'}}>
                <td style={{fontWeight: '700'}}>Average ROI</td>
                <td style={{textAlign: 'center', fontWeight: '700', color: '#10b981'}}>4,000%+</td>
                <td style={{textAlign: 'center', fontWeight: '700', color: '#6b7280'}}>Unmeasured</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{marginTop: '3rem', textAlign: 'center'}}>
          <p style={{fontSize: '1rem', color: '#4b5563', marginBottom: '2rem'}}>
            The choice is clear: Be a leader in LGBTQ+ employee safety, or settle for generic checkbox compliance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
import React from 'react';
import { CheckCircle, X } from 'lucide-react';

const ComparisonTable = () => {
  return (
    <section style={{padding: '6rem 2rem', background: 'white'}}>
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <h2 style={{fontSize: '2.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '3rem'}}>Why Vector for Good?</h2>
        
        <div style={{borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr>
                <th style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '1.5rem', textAlign: 'left'}}>Feature</th>
                <th style={{background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', color: 'white', padding: '1.5rem', textAlign: 'center'}}>Vector for Good</th>
                <th style={{background: '#6b7280', color: 'white', padding: '1.5rem', textAlign: 'center'}}>Traditional</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{background: '#f9fafb'}}>
                <td style={{padding: '1rem', fontWeight: '600'}}>LGBTQ+ Safety Data</td>
                <td style={{padding: '1rem', textAlign: 'center'}}><CheckCircle style={{color: '#10b981', margin: '0 auto', display: 'block'}} /></td>
                <td style={{padding: '1rem', textAlign: 'center'}}><X style={{color: '#ef4444', margin: '0 auto', display: 'block'}} /></td>
              </tr>
              <tr>
                <td style={{padding: '1rem', fontWeight: '600'}}>Real-Time Monitoring</td>
                <td style={{padding: '1rem', textAlign: 'center'}}><CheckCircle style={{color: '#10b981', margin: '0 auto', display: 'block'}} /></td>
                <td style={{padding: '1rem', textAlign: 'center'}}><X style={{color: '#ef4444', margin: '0 auto', display: 'block'}} /></td>
              </tr>
              <tr style={{background: '#f9fafb'}}>
                <td style={{padding: '1rem', fontWeight: '600'}}>4-LLM AI System</td>
                <td style={{padding: '1rem', textAlign: 'center'}}><CheckCircle style={{color: '#10b981', margin: '0 auto', display: 'block'}} /></td>
                <td style={{padding: '1rem', textAlign: 'center'}}><X style={{color: '#ef4444', margin: '0 auto', display: 'block'}} /></td>
              </tr>
              <tr style={{background: '#f0fdf4'}}>
                <td style={{padding: '1rem', fontWeight: '700'}}>Annual Cost (10K employees)</td>
                <td style={{padding: '1rem', textAlign: 'center', fontWeight: '700', color: '#10b981'}}>$50,000</td>
                <td style={{padding: '1rem', textAlign: 'center', fontWeight: '700', color: '#ef4444'}}>$150,000+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
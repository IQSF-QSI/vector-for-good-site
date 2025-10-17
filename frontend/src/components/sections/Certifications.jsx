import React from 'react';
import { Shield, Lock, Award, CheckCircle } from 'lucide-react';

const Certifications = () => {
  return (
    <section style={{padding: '4rem 2rem', background: '#f9fafb', textAlign: 'center'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <h2 style={{fontSize: '2rem', fontWeight: '800', marginBottom: '3rem'}}>Enterprise-Grade Security</h2>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem'}}>
          <div style={{background: 'white', padding: '2rem', borderRadius: '12px'}}>
            <Shield style={{width: '48px', height: '48px', color: '#8b5cf6', margin: '0 auto 1rem'}} />
            <h3 style={{fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem'}}>GDPR</h3>
            <p style={{fontSize: '0.875rem', color: '#6b7280'}}>Compliant</p>
          </div>
          <div style={{background: 'white', padding: '2rem', borderRadius: '12px'}}>
            <Lock style={{width: '48px', height: '48px', color: '#8b5cf6', margin: '0 auto 1rem'}} />
            <h3 style={{fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem'}}>SOC 2 Type II</h3>
            <p style={{fontSize: '0.875rem', color: '#6b7280'}}>Certified</p>
          </div>
          <div style={{background: 'white', padding: '2rem', borderRadius: '12px'}}>
            <Award style={{width: '48px', height: '48px', color: '#8b5cf6', margin: '0 auto 1rem'}} />
            <h3 style={{fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem'}}>ISO 27001</h3>
            <p style={{fontSize: '0.875rem', color: '#6b7280'}}>Security</p>
          </div>
          <div style={{background: 'white', padding: '2rem', borderRadius: '12px'}}>
            <CheckCircle style={{width: '48px', height: '48px', color: '#8b5cf6', margin: '0 auto 1rem'}} />
            <h3 style={{fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem'}}>NVIDIA</h3>
            <p style={{fontSize: '0.875rem', color: '#6b7280'}}>Inception</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
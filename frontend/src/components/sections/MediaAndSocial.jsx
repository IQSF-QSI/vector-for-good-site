import React from 'react';
import { Newspaper, Trophy } from 'lucide-react';

const MediaAndSocial = () => {
  return (
    <section style={{padding: '6rem 2rem', background: '#1f2937', color: 'white'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'center'}}>
        <h2 style={{fontSize: '2.5rem', fontWeight: '800', marginBottom: '4rem'}}>Industry Recognition</h2>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem'}}>
          <div style={{background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '12px'}}>
            <Newspaper style={{width: '32px', height: '32px', color: '#fbbf24', margin: '0 auto 1rem'}} />
            <h4 style={{fontWeight: '700', marginBottom: '0.5rem'}}>TechCrunch</h4>
            <p style={{fontSize: '0.875rem', opacity: 0.8}}>AI Safety Platform</p>
          </div>
          <div style={{background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '12px'}}>
            <Trophy style={{width: '32px', height: '32px', color: '#fbbf24', margin: '0 auto 1rem'}} />
            <h4 style={{fontWeight: '700', marginBottom: '0.5rem'}}>Forbes</h4>
            <p style={{fontSize: '0.875rem', opacity: 0.8}}>ESG Innovation</p>
          </div>
          <div style={{background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '12px'}}>
            <Trophy style={{width: '32px', height: '32px', color: '#ec4899', margin: '0 auto 1rem'}} />
            <h4 style={{fontWeight: '700', marginBottom: '0.5rem'}}>NVIDIA Inception</h4>
            <p style={{fontSize: '0.875rem', opacity: 0.8}}>AI Partner</p>
          </div>
          <div style={{background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '12px'}}>
            <Trophy style={{width: '32px', height: '32px', color: '#ec4899', margin: '0 auto 1rem'}} />
            <h4 style={{fontWeight: '700', marginBottom: '0.5rem'}}>HRC Award</h4>
            <p style={{fontSize: '0.875rem', opacity: 0.8}}>Workplace Safety</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaAndSocial;
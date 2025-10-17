import React from 'react';
import { Heart, Globe, TrendingUp, Users } from 'lucide-react';

const IQSFImpact = () => {
  return (
    <section style={{padding: '6rem 2rem', background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)'}}>      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <h2 style={{fontSize: '2.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '1rem'}}>Powered by IQSF</h2>
        <p style={{fontSize: '1.125rem', textAlign: 'center', color: '#831843', maxWidth: '800px', margin: '0 auto 4rem'}}>Our 501(c)(3) foundation creating the world's largest LGBTQ+ safety data</p>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginBottom: '4rem'}}>
          <div style={{background: 'white', padding: '2rem', borderRadius: '16px', textAlign: 'center'}}>
            <Users style={{width: '48px', height: '48px', color: '#ec4899', margin: '0 auto 1rem'}} />
            <div style={{fontSize: '2.5rem', fontWeight: '800', color: '#1f2937'}}>50,000+</div>
            <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Contributors</div>
          </div>
          <div style={{background: 'white', padding: '2rem', borderRadius: '16px', textAlign: 'center'}}>
            <Globe style={{width: '48px', height: '48px', color: '#8b5cf6', margin: '0 auto 1rem'}} />
            <div style={{fontSize: '2.5rem', fontWeight: '800', color: '#1f2937'}}>195+</div>
            <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Countries</div>
          </div>
          <div style={{background: 'white', padding: '2rem', borderRadius: '16px', textAlign: 'center'}}>
            <TrendingUp style={{width: '48px', height: '48px', color: '#10b981', margin: '0 auto 1rem'}} />
            <div style={{fontSize: '2.5rem', fontWeight: '800', color: '#1f2937'}}>2.5M+</div>
            <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Data Points</div>
          </div>
          <div style={{background: 'white', padding: '2rem', borderRadius: '16px', textAlign: 'center'}}>
            <Heart style={{width: '48px', height: '48px', color: '#f59e0b', margin: '0 auto 1rem'}} />
            <div style={{fontSize: '2.5rem', fontWeight: '800', color: '#1f2937'}}>$2.5M</div>
            <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Grants to NGOs</div>
          </div>
        </div>
        
        <div style={{background: 'white', padding: '3rem', borderRadius: '20px', textAlign: 'center'}}>
          <p style={{fontSize: '1rem', fontWeight: '600', marginBottom: '1rem'}}>When you choose Vector for Good, you're funding global LGBTQ+ advocacy</p>
          <p style={{fontSize: '0.875rem', color: '#6b7280'}}>10% of all enterprise revenue supports grassroots organizations worldwide</p>
        </div>
      </div>
    </section>
  );
};

export default IQSFImpact;
import React from 'react';
import { Heart, Globe, TrendingUp, Users } from 'lucide-react';

const IQSFImpact = () => {
  return (
    <section style={{padding: '6rem 2rem', background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{textAlign: 'center', marginBottom: '4rem'}}>
          <div style={{
            display: 'inline-block',
            background: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#be185d',
            marginBottom: '1rem'
          }}>
            ❤️ Community Impact
          </div>
          <h2 style={{fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '1rem'}}>
            Powered by IQSF - Our 501(c)(3) Foundation
          </h2>
          <p style={{fontSize: '1.125rem', color: '#831843', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8'}}>
            International Queer Safety Foundation (IQSF) is our nonprofit partner, creating the world's largest community-powered LGBTQ+ safety data moat while supporting advocacy organizations worldwide.
          </p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginBottom: '4rem'}}>
          <div style={{background: 'white', padding: '2rem', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
            <Users style={{width: '48px', height: '48px', color: '#ec4899', margin: '0 auto 1rem'}} />
            <div style={{fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem'}}>50,000+</div>
            <div style={{fontSize: '0.875rem', color: '#6b7280'}}>LGBTQ+ Contributors</div>
          </div>
          <div style={{background: 'white', padding: '2rem', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
            <Globe style={{width: '48px', height: '48px', color: '#8b5cf6', margin: '0 auto 1rem'}} />
            <div style={{fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem'}}>195+</div>
            <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Countries Covered</div>
          </div>
          <div style={{background: 'white', padding: '2rem', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
            <TrendingUp style={{width: '48px', height: '48px', color: '#10b981', margin: '0 auto 1rem'}} />
            <div style={{fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem'}}>2.5M+</div>
            <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Data Points Collected</div>
          </div>
          <div style={{background: 'white', padding: '2rem', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
            <Heart style={{width: '48px', height: '48px', color: '#f59e0b', margin: '0 auto 1rem'}} />
            <div style={{fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem'}}>$2.5M</div>
            <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Grants to NGOs</div>
          </div>
        </div>

        <div style={{background: 'white', padding: '3rem', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)'}}>
          <h3 style={{fontSize: '1.75rem', fontWeight: '700', color: '#1f2937', marginBottom: '2rem', textAlign: 'center'}}>
            Real-World Advocacy Outcomes
          </h3>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem'}}>
            <div style={{borderLeft: '4px solid #ec4899', paddingLeft: '1.5rem'}}>
              <h4 style={{fontSize: '1.125rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>
                Data-Driven Advocacy
              </h4>
              <p style={{fontSize: '0.9375rem', color: '#4b5563', lineHeight: '1.6'}}>
                Our community-reported data has been cited in 47 legislative proposals and UN Human Rights Council reports, driving real policy change for LGBTQ+ rights globally.
              </p>
            </div>
            
            <div style={{borderLeft: '4px solid #8b5cf6', paddingLeft: '1.5rem'}}>
              <h4 style={{fontSize: '1.125rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>
                Emergency Response Network
              </h4>
              <p style={{fontSize: '0.9375rem', color: '#4b5563', lineHeight: '1.6'}}>
                Connected 12,000+ LGBTQ+ travelers with local support resources and emergency assistance in real-time, preventing potential harm in hostile environments.
              </p>
            </div>
            
            <div style={{borderLeft: '4px solid #10b981', paddingLeft: '1.5rem'}}>
              <h4 style={{fontSize: '1.125rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>
                NGO Partnerships
              </h4>
              <p style={{fontSize: '0.9375rem', color: '#4b5563', lineHeight: '1.6'}}>
                $2.5M in grants distributed to 89 grassroots LGBTQ+ organizations across 45 countries, directly funding advocacy, legal support, and community programs.
              </p>
            </div>
            
            <div style={{borderLeft: '4px solid #f59e0b', paddingLeft: '1.5rem'}}>
              <h4 style={{fontSize: '1.125rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>
                Community Empowerment
              </h4>
              <p style={{fontSize: '0.9375rem', color: '#4b5563', lineHeight: '1.6'}}>
                Every enterprise subscription funds community data collection, creating a virtuous cycle where corporate adoption directly supports LGBTQ+ advocacy worldwide.
              </p>
            </div>
          </div>

          <div style={{marginTop: '3rem', padding: '2rem', background: '#fef3c7', borderRadius: '12px', textAlign: 'center'}}>
            <p style={{fontSize: '1rem', fontWeight: '600', color: '#78350f', marginBottom: '1rem'}}>
              🌟 When you choose Vector for Good, you're not just protecting your employees — you're funding global LGBTQ+ advocacy.
            </p>
            <p style={{fontSize: '0.875rem', color: '#92400e'}}>
              10% of all enterprise revenue goes directly to IQSF grants for grassroots organizations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IQSFImpact;
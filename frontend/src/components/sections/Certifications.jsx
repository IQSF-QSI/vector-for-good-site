import React from 'react';
import { Shield, Lock, Award, CheckCircle } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      name: "GDPR Compliant",
      description: "EU Data Protection",
      icon: Shield
    },
    {
      name: "SOC 2 Type II",
      description: "Security & Privacy",
      icon: Lock
    },
    {
      name: "ISO 27001",
      description: "Information Security",
      icon: Award
    },
    {
      name: "NVIDIA Inception",
      description: "AI Innovation Partner",
      icon: CheckCircle
    }
  ];

  const trustedBy = [
    "Fortune 50 Technology Leader",
    "Global Financial Services",
    "International Consulting Firm",
    "Leading Professional Services",
    "Enterprise Technology Provider",
    "Major Healthcare Organization"
  ];

  return (
    <section className="certifications-section">
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#1f2937', marginBottom: '3rem'}}>
          Enterprise-Grade Security & Compliance
        </h2>

        <div className="cert-grid">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div key={index} className="cert-badge">
                <Icon style={{width: '48px', height: '48px', color: '#8b5cf6', margin: '0 auto 1rem'}} />
                <h3 style={{fontSize: '1.125rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>
                  {cert.name}
                </h3>
                <p style={{fontSize: '0.875rem', color: '#6b7280'}}>{cert.description}</p>
              </div>
            );
          })}
        </div>

        <div style={{marginTop: '4rem', textAlign: 'center'}}>
          <img 
            src="https://customer-assets.emergentagent.com/job_46189f81-3b3a-4aa4-aac3-2ab4e4427fc1/artifacts/zsjo26yt_nvidia-inception-program-badge-rgb-for-screen.png" 
            alt="NVIDIA Inception Program" 
            style={{height: '60px', width: 'auto', margin: '0 auto 2rem'}}
          />
        </div>

        <div style={{marginTop: '3rem', background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
          <h3 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem', textAlign: 'center'}}>
            Trusted by Fortune 50 Leaders
          </h3>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
            {trustedBy.map((company, index) => (
              <div key={index} style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                <CheckCircle style={{width: '20px', height: '20px', color: '#10b981', flexShrink: 0}} />
                <span style={{fontSize: '0.875rem', color: '#4b5563'}}>{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
import React from 'react';
import { Newspaper, Trophy, Users, Megaphone } from 'lucide-react';

const MediaAndSocial = () => {
  const mediaFeatures = [
    {
      outlet: "TechCrunch",
      title: "AI-Powered LGBTQ+ Safety Platform Raises Stakes for Corporate Duty of Care",
      date: "2024",
      icon: Newspaper
    },
    {
      outlet: "Forbes",
      title: "How Queer Intelligence Is Transforming ESG Reporting",
      date: "2024",
      icon: Trophy
    },
    {
      outlet: "VentureBeat",
      title: "Vector for Good's 4-LLM System Sets New Standard for AI Safety Analysis",
      date: "2024",
      icon: Newspaper
    },
    {
      outlet: "Human Rights Campaign",
      title: "Technology Innovation Award for LGBTQ+ Workplace Safety",
      date: "2024",
      icon: Trophy
    }
  ];

  const partnerships = [
    {
      name: "NVIDIA Inception",
      description: "AI Innovation Partner Program",
      icon: Trophy
    },
    {
      name: "ILGA World",
      description: "Global LGBTQ+ Rights Partnership",
      icon: Users
    },
    {
      name: "OutRight Action International",
      description: "Advocacy & Data Collaboration",
      icon: Megaphone
    },
    {
      name: "Human Rights Campaign",
      description: "Corporate Equality Index Partner",
      icon: Trophy
    }
  ];

  return (
    <section className="media-section">
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{textAlign: 'center', marginBottom: '4rem'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: '800', color: '#ffffff', marginBottom: '1rem'}}>
            Industry Recognition & Partnerships
          </h2>
          <p style={{fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', margin: '0 auto'}}>
            Featured in leading publications and trusted by global advocacy organizations
          </p>
        </div>

        <div style={{marginBottom: '4rem'}}>
          <h3 style={{fontSize: '1.5rem', fontWeight: '700', color: '#ffffff', marginBottom: '2rem', textAlign: 'center'}}>
            📰 Media Coverage
          </h3>
          <div className="media-grid">
            {mediaFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="media-card">
                  <Icon style={{width: '32px', height: '32px', color: '#fbbf24', marginBottom: '1rem'}} />
                  <h4 style={{fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem', color: '#ffffff'}}>
                    {feature.outlet}
                  </h4>
                  <p style={{fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem', lineHeight: '1.5'}}>
                    {feature.title}
                  </p>
                  <p style={{fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)'}}>{feature.date}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 style={{fontSize: '1.5rem', fontWeight: '700', color: '#ffffff', marginBottom: '2rem', textAlign: 'center'}}>
            🤝 Strategic Partnerships
          </h3>
          <div className="media-grid">
            {partnerships.map((partner, index) => {
              const Icon = partner.icon;
              return (
                <div key={index} className="media-card">
                  <Icon style={{width: '32px', height: '32px', color: '#ec4899', marginBottom: '1rem'}} />
                  <h4 style={{fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem', color: '#ffffff'}}>
                    {partner.name}
                  </h4>
                  <p style={{fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)'}}>
                    {partner.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaAndSocial;
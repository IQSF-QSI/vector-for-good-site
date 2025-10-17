import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Shield, Award, Briefcase, GraduationCap } from 'lucide-react';

const FounderSection = () => {
  return (
    <section className="founder-section">
      <div className="section-container">
        <div className="section-header-center">
          <Badge className="section-badge">Leadership</Badge>
          <h2 className="section-title-large">Founded by Mission-Driven Technologist</h2>
          <p className="section-subtitle">
            Levi Hankins combines 20 years of military leadership with cutting-edge AI expertise and lived experience
          </p>
        </div>

        <div className="founder-content">
          <Card className="founder-bio-card">
            <CardContent className="founder-bio">
              <div className="founder-header">
                <div>
                  <h3 className="founder-name">Levi Hankins</h3>
                  <p className="founder-title">Founder & CEO</p>
                  <p className="founder-subtitle">Inventor of Queer Intelligence</p>
                </div>
                <div className="founder-badges">
                  <Badge className="nvidia-badge-small">NVIDIA Inception</Badge>
                </div>
              </div>

              <div className="founder-highlights">
                <div className="highlight-item">
                  <Shield className="h-5 w-5" />
                  <div>
                    <strong>20 Years US Navy</strong>
                    <p>Human Resources Manager • 400 Personnel • 100% Retention Rate</p>
                  </div>
                </div>

                <div className="highlight-item">
                  <Briefcase className="h-5 w-5" />
                  <div>
                    <strong>AI Architect & Serial Entrepreneur</strong>
                    <p>Multi-Agent AI Systems • Portfolio of LGBTQ+ Travel Ventures • Fortune 50 Solutions</p>
                  </div>
                </div>

                <div className="highlight-item">
                  <Award className="h-5 w-5" />
                  <div>
                    <strong>Recognized Innovation Leader</strong>
                    <p>Awarded for Training & Readiness Innovation • NVIDIA Inception Member</p>
                  </div>
                </div>

                <div className="highlight-item">
                  <GraduationCap className="h-5 w-5" />
                  <div>
                    <strong>Deep Technical Expertise</strong>
                    <p>Ethical AI Product Development • Privacy-First Design • Digital Sovereignty • SAP Implementation</p>
                  </div>
                </div>
              </div>

              <div className="founder-mission">
                <p className="mission-text">
                  "After 20 years protecting our country, I'm now protecting the LGBTQ+ community with the same 
                  dedication and precision. Vector for Good isn't just a company—it's a mission to quantify 
                  social impact and make the world measurably safer for marginalized communities."
                </p>
                <p className="mission-attribution">— Levi Hankins, Founder & CEO</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
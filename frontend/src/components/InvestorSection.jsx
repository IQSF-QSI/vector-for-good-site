import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, Users, Globe, DollarSign, Target, Zap } from 'lucide-react';

const InvestorSection = () => {
  return (
    <section className="investor-section">
      <div className="section-container">
        <div className="section-header-center">
          <Badge className="section-badge">Investment Opportunity</Badge>
          <h2 className="section-title-large">Capturing the $63B ESG Intelligence Market</h2>
          <p className="section-subtitle">
            First-mover advantage in quantifiable LGBTQ+ safety intelligence with proven enterprise traction
          </p>
        </div>

        {/* Market Opportunity */}
        <div className="market-opportunity">
          <Card className="market-card">
            <CardHeader>
              <Globe className="h-8 w-8 text-orange-500 mb-2" />
              <CardTitle>Market Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="market-metric">
                <span className="market-value">$63B</span>
                <span className="market-label">Global ESG Data & Analytics Market (2024)</span>
              </div>
              <div className="market-metric">
                <span className="market-value">18.2%</span>
                <span className="market-label">CAGR through 2030</span>
              </div>
              <div className="market-metric">
                <span className="market-value">1st</span>
                <span className="market-label">Only platform for LGBTQ+ safety intelligence</span>
              </div>
            </CardContent>
          </Card>

          <Card className="market-card">
            <CardHeader>
              <Target className="h-8 w-8 text-emerald-500 mb-2" />
              <CardTitle>Addressable Market</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="market-metric">
                <span className="market-value">3,000+</span>
                <span className="market-label">Fortune 5000 Companies (ICP)</span>
              </div>
              <div className="market-metric">
                <span className="market-value">$120K</span>
                <span className="market-label">Average Annual Contract Value</span>
              </div>
              <div className="market-metric">
                <span className="market-value">$360M</span>
                <span className="market-label">Immediate TAM (Top 3,000)</span>
              </div>
            </CardContent>
          </Card>

          <Card className="market-card">
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-purple-500 mb-2" />
              <CardTitle>Traction & Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="market-metric">
                <span className="market-value">NVIDIA</span>
                <span className="market-label">Inception Program Member</span>
              </div>
              <div className="market-metric">
                <span className="market-value">9 Cities</span>
                <span className="market-label">Live QSI Coverage (Expanding to 50+)</span>
              </div>
              <div className="market-metric">
                <span className="market-value">501(c)(3)</span>
                <span className="market-label">IQSF Partnership (Data Moat)</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Competitive Advantage */}
        <div className="competitive-advantage">
          <h3 className="advantage-title">Unfair Advantages</h3>
          <div className="advantage-grid">
            <div className="advantage-item">
              <Zap className="h-6 w-6 text-orange-500" />
              <h4>Proprietary QI Technology</h4>
              <p>Multi-LLM hidden relay system (4 models) - can't be replicated with standard AI</p>
            </div>
            <div className="advantage-item">
              <Users className="h-6 w-6 text-orange-500" />
              <h4>Community Data Moat</h4>
              <p>Built by queer for queer - authentic data access competitors can't fake or buy</p>
            </div>
            <div className="advantage-item">
              <DollarSign className="h-6 w-6 text-orange-500" />
              <h4>First Quantifiable "S" Metrics</h4>
              <p>Only platform providing investor-grade social impact data for ESG reporting</p>
            </div>
            <div className="advantage-item">
              <Globe className="h-6 w-6 text-orange-500" />
              <h4>Global QSI Standard</h4>
              <p>Becoming the Bloomberg Terminal for LGBTQ+ safety intelligence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorSection;
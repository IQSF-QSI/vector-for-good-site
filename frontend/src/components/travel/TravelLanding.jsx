import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { 
  Plane, Shield, DollarSign, TrendingUp, 
  Globe, Lock, Zap, CheckCircle, ArrowRight,
  Brain, BarChart3, AlertCircle
} from 'lucide-react';

const TravelLanding = () => {
  return (
    <div className="travel-landing">
      {/* Header */}
      <header className="landing-header">
        <div className="landing-header-content">
          <div className="flex items-center">
            <Plane className="w-8 h-8 text-white mr-3" />
            <h1 className="text-2xl font-bold text-white">Vector Travel Intelligence</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-white hover:text-purple-200">
              Back to Home
            </Link>
            <Link to="/corporate-travel/login">
              <Button variant="outline" className="bg-white text-purple-600 hover:bg-purple-50">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="travel-hero">
        <div className="travel-hero-content">
          <div className="travel-hero-badge">
            <Brain className="w-4 h-4 mr-2" />
            Powered by GPT-5, Claude-4 & Gemini-2.5
          </div>
          <h1 className="travel-hero-title">
            Corporate Travel Intelligence
            <br />
            <span className="gradient-text">Built for Safety, Scale & Savings</span>
          </h1>
          <p className="travel-hero-subtitle">
            The only corporate travel platform with multi-AI safety intelligence, 
            comprehensive booking management, and automated policy compliance for Fortune 50 companies.
          </p>
          <div className="travel-hero-cta">
            <Link to="/corporate-travel/register">
              <Button size="lg" className="cta-primary">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/corporate-travel/login">
              <Button size="lg" variant="outline" className="cta-secondary">
                Sign In
              </Button>
            </Link>
          </div>
          <div className="travel-hero-stats">
            <div className="stat-item">
              <div className="stat-value">195+</div>
              <div className="stat-label">Countries Analyzed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">3 AI</div>
              <div className="stat-label">Models Integrated</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Safety Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="travel-features">
        <div className="travel-features-content">
          <div className="section-header">
            <h2 className="section-title">Everything You Need for Corporate Travel</h2>
            <p className="section-subtitle">
              End-to-end travel management with AI-powered safety intelligence
            </p>
          </div>

          <div className="features-grid">
            <Card className="feature-card">
              <CardContent className="p-6">
                <div className="feature-icon-wrapper bg-purple-100">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="feature-title">Multi-AI Safety Intelligence</h3>
                <p className="feature-description">
                  Get real-time safety assessments powered by GPT-5, Claude Sonnet 4, and Gemini 2.5 Pro. 
                  Comprehensive LGBTQ+ safety ratings, political stability analysis, health advisories, and crime data.
                </p>
                <ul className="feature-list">
                  <li><CheckCircle className="w-4 h-4" /> 195+ countries analyzed</li>
                  <li><CheckCircle className="w-4 h-4" /> Real-time threat alerts</li>
                  <li><CheckCircle className="w-4 h-4" /> Personalized mitigation strategies</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="p-6">
                <div className="feature-icon-wrapper bg-blue-100">
                  <Plane className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="feature-title">Complete Travel Booking</h3>
                <p className="feature-description">
                  Search and book flights, hotels, and car rentals all in one platform. 
                  Integrated itinerary management with policy compliance checks.
                </p>
                <ul className="feature-list">
                  <li><CheckCircle className="w-4 h-4" /> Multi-source flight search</li>
                  <li><CheckCircle className="w-4 h-4" /> Hotel ratings & reviews</li>
                  <li><CheckCircle className="w-4 h-4" /> Car rental comparisons</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="p-6">
                <div className="feature-icon-wrapper bg-green-100">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="feature-title">Expense Management</h3>
                <p className="feature-description">
                  Track expenses automatically with receipt capture. Automated approval workflows 
                  and comprehensive reporting for finance teams.
                </p>
                <ul className="feature-list">
                  <li><CheckCircle className="w-4 h-4" /> Receipt scanning</li>
                  <li><CheckCircle className="w-4 h-4" /> Approval workflows</li>
                  <li><CheckCircle className="w-4 h-4" /> Real-time reporting</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="p-6">
                <div className="feature-icon-wrapper bg-orange-100">
                  <BarChart3 className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="feature-title">Policy Compliance</h3>
                <p className="feature-description">
                  Automated travel policy enforcement with real-time violation alerts. 
                  Custom policy rules and approval requirements.
                </p>
                <ul className="feature-list">
                  <li><CheckCircle className="w-4 h-4" /> Custom policy rules</li>
                  <li><CheckCircle className="w-4 h-4" /> Automated checks</li>
                  <li><CheckCircle className="w-4 h-4" /> Violation alerts</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety Focus Section */}
      <section className="safety-section">
        <div className="safety-content">
          <div className="safety-text">
            <div className="safety-badge">
              <Shield className="w-4 h-4 mr-2" />
              Industry-Leading Safety Intelligence
            </div>
            <h2 className="safety-title">
              Protecting LGBTQ+ Travelers Worldwide
            </h2>
            <p className="safety-description">
              Built by Vector for Good, the same team behind Queer Intelligence (QI) technology. 
              Our platform provides comprehensive safety assessments specifically designed for LGBTQ+ corporate travelers.
            </p>
            <div className="safety-stats">
              <div className="safety-stat">
                <AlertCircle className="w-6 h-6 text-purple-600 mb-2" />
                <div className="safety-stat-value">Real-Time</div>
                <div className="safety-stat-label">Threat Monitoring</div>
              </div>
              <div className="safety-stat">
                <Globe className="w-6 h-6 text-purple-600 mb-2" />
                <div className="safety-stat-value">195+</div>
                <div className="safety-stat-label">Countries Covered</div>
              </div>
              <div className="safety-stat">
                <Lock className="w-6 h-6 text-purple-600 mb-2" />
                <div className="safety-stat-value">24/7</div>
                <div className="safety-stat-label">Safety Support</div>
              </div>
            </div>
          </div>
          <div className="safety-visual">
            <div className="safety-card">
              <div className="safety-score-display">
                <div className="score-circle">
                  <span className="score-number">87</span>
                  <span className="score-label">Safety Score</span>
                </div>
              </div>
              <div className="safety-metrics">
                <div className="metric">
                  <span className="metric-label">LGBTQ+ Safety</span>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{width: '85%'}}></div>
                  </div>
                  <span className="metric-value">85</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Political Stability</span>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{width: '90%'}}></div>
                  </div>
                  <span className="metric-value">90</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Health Advisory</span>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{width: '88%'}}></div>
                  </div>
                  <span className="metric-value">88</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Transform Corporate Travel?</h2>
          <p className="cta-subtitle">
            Join leading companies using Vector Travel Intelligence for safer, smarter business travel.
          </p>
          <div className="cta-buttons">
            <Link to="/corporate-travel/register">
              <Button size="lg" className="cta-button-primary">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/investors">
              <Button size="lg" variant="outline" className="cta-button-secondary">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="travel-footer">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="flex items-center mb-4">
                <Plane className="w-6 h-6 text-purple-600 mr-2" />
                <span className="text-xl font-bold">Vector Travel</span>
              </div>
              <p className="text-gray-600">
                Part of Vector for Good's mission to protect and empower LGBTQ+ communities worldwide.
              </p>
            </div>
            <div className="footer-links-group">
              <div>
                <h4 className="footer-link-title">Product</h4>
                <ul className="footer-links">
                  <li><Link to="/corporate-travel/register">Sign Up</Link></li>
                  <li><Link to="/corporate-travel/login">Sign In</Link></li>
                  <li><Link to="/">Enterprise Solutions</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="footer-link-title">Company</h4>
                <ul className="footer-links">
                  <li><Link to="/community">Our Story</Link></li>
                  <li><Link to="/investors">Investors</Link></li>
                  <li><a href="mailto:levi@vectorforgood.com">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="text-gray-600">© 2025 Vector for Good. All rights reserved.</p>
            <p className="text-gray-600">Powered by Queer Intelligence (QI)</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TravelLanding;

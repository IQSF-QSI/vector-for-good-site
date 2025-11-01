import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Link } from 'react-router-dom';
import { Download, ArrowRight, TrendingUp, Target, Globe, DollarSign, Users, Zap, Shield, Award, ChevronLeft, Mail, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import InvestorSection from './InvestorSection';
import FounderSection from './FounderSection';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const InvestorPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const investorData = {
        ...formData,
        message: `[INVESTOR INQUIRY] ${formData.message}`
      };
      const response = await axios.post(`${API}/demo-requests`, investorData);
      
      if (response.data.success) {
        toast.success('Thank you! We\'ll contact you within 24 hours to discuss investment opportunities.');
        setFormData({ name: '', email: '', company: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('Failed to submit inquiry. Please email directly: hello@vectorforgood.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="investor-page">
      {/* Header */}
      <header className="investor-header">
        <div className="investor-header-content">
          <Link to="/" className="back-link">
            <ChevronLeft className="h-5 w-5" />
            Back to Home
          </Link>
          <div className="header-logo">
            <img 
              src="https://customer-assets.emergentagent.com/job_46189f81-3b3a-4aa4-aac3-2ab4e4427fc1/artifacts/e5ypx4zy_EEF96F90-7D62-411E-92B2-8B4BF5630EF7.PNG" 
              alt="Vector for Good Logo" 
              className="logo-img"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="investor-hero">
        <div className="investor-hero-content">
          <Badge className="investor-hero-badge">Investment Opportunity • €750K SAFE</Badge>
          <h1 className="investor-hero-title">
            The Bloomberg Terminal for
            <span className="gradient-text"> LGBTQ+ Safety Intelligence</span>
          </h1>
          <p className="investor-hero-subtitle">
            First-mover in the $63B ESG market's blind spot: quantifiable "S" metrics. 
            Capturing the €20B+ Global ESG/DEI Analytics opportunity with proprietary Queer Intelligence technology.
          </p>
          
          <div className="investor-hero-stats">
            <div className="hero-stat-item">
              <div className="stat-value">€750K</div>
              <div className="stat-label">Raising (SAFE / Equity)</div>
            </div>
            <div className="hero-stat-item">
              <div className="stat-value">€20B+</div>
              <div className="stat-label">ESG/DEI Analytics Market</div>
            </div>
            <div className="hero-stat-item">
              <div className="stat-value">€360M</div>
              <div className="stat-label">Immediate TAM</div>
            </div>
            <div className="hero-stat-item">
              <div className="stat-value">€120K</div>
              <div className="stat-label">Average ACV</div>
            </div>
          </div>

          <div className="investor-hero-cta">
            <Button size="lg" className="primary-cta" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              Schedule Investor Call <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <a href="https://customer-assets.emergentagent.com/job_46189f81-3b3a-4aa4-aac3-2ab4e4427fc1/artifacts/kjnp8fr5_Vector%20for%20Good.pptx" download>
              <Button size="lg" variant="outline" className="secondary-cta">
                <Download className="mr-2 h-5 w-5" />
                Download Pitch Deck
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Pitch Video Section */}
      <section className="pitch-video-section">
        <div className="section-container">
          <div className="section-header-center">
            <Badge className="section-badge">Founder Pitch</Badge>
            <h2 className="section-title-large">Watch the Full Pitch</h2>
            <p className="section-subtitle">Levi Hankins, Founder & CEO, presents Vector for Good</p>
          </div>
          
          <div className="video-wrapper">
            <video 
              controls 
              className="pitch-video"
              poster="https://customer-assets.emergentagent.com/job_46189f81-3b3a-4aa4-aac3-2ab4e4427fc1/artifacts/lawirn1j_IMG_0284%202.PNG"
            >
              <source src="https://customer-assets.emergentagent.com/job_46189f81-3b3a-4aa4-aac3-2ab4e4427fc1/artifacts/4apyzfqv_Vector_for_Good_Pitch.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* The Opportunity */}
      <section className="opportunity-section">
        <div className="section-container">
          <div className="section-header-center">
            <Badge className="section-badge">The Opportunity</Badge>
            <h2 className="section-title-large">Solving ESG's Blind Spot</h2>
            <p className="section-subtitle">
              $63B ESG market, yet 89% of investors say social impact data is unreliable
            </p>
          </div>

          <div className="opportunity-grid">
            <Card className="opportunity-card problem-card">
              <CardHeader>
                <Target className="h-8 w-8 text-red-500 mb-2" />
                <CardTitle>The Problem</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="opportunity-list">
                  <li><strong>71%</strong> of LGBTQ+ adults avoid public spaces out of fear</li>
                  <li><strong>4th consecutive year</strong> of rising hate crimes</li>
                  <li><strong>Zero</strong> tailored data solutions for LGBTQ+ safety</li>
                  <li><strong>$150M+</strong> annual liability exposure for Fortune 50</li>
                  <li><strong>ESG/DEI platforms</strong> blind to intersectional risks</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="opportunity-card solution-card">
              <CardHeader>
                <Zap className="h-8 w-8 text-emerald-500 mb-2" />
                <CardTitle>Our Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="opportunity-list">
                  <li><strong>Queer Intelligence (QI):</strong> 4-LLM hidden relay system</li>
                  <li><strong>Real-time</strong> geo-contextual safety analytics</li>
                  <li><strong>Privacy-preserving</strong> data fusion architecture</li>
                  <li><strong>First quantifiable "S"</strong> metrics for ESG reporting</li>
                  <li><strong>Community-built moat</strong> competitors can't replicate</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Market Opportunity - Reuse InvestorSection */}
      <InvestorSection />

      {/* Traction */}
      <section className="traction-section">
        <div className="section-container">
          <div className="section-header-center">
            <Badge className="section-badge">Traction & Validation</Badge>
            <h2 className="section-title-large">Proven Momentum</h2>
          </div>

          <div className="traction-grid">
            <Card className="traction-card">
              <CardHeader>
                <div className="traction-icon">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_46189f81-3b3a-4aa4-aac3-2ab4e4427fc1/artifacts/zsjo26yt_nvidia-inception-program-badge-rgb-for-screen.png" 
                    alt="NVIDIA Inception" 
                    style={{height: '60px', width: 'auto'}}
                  />
                </div>
                <CardTitle>NVIDIA Inception Program</CardTitle>
                <CardDescription>Access to cutting-edge AI infrastructure and enterprise network</CardDescription>
              </CardHeader>
            </Card>

            <Card className="traction-card">
              <CardHeader>
                <Globe className="h-12 w-12 text-orange-500 mb-3" />
                <CardTitle>9 Cities Live</CardTitle>
                <CardDescription>Global QSI coverage with expansion to 50+ cities in pipeline</CardDescription>
              </CardHeader>
            </Card>

            <Card className="traction-card">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-500 mb-3" />
                <CardTitle>Advocacy Partnerships</CardTitle>
                <CardDescription>Letters of support from LGBTQ+ advocacy groups and community organizations</CardDescription>
              </CardHeader>
            </Card>

            <Card className="traction-card">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-500 mb-3" />
                <CardTitle>Functional Prototype</CardTitle>
                <CardDescription>Live platform with core analytics, safety features, and enterprise demo</CardDescription>
              </CardHeader>
            </Card>

            <Card className="traction-card">
              <CardHeader>
                <Award className="h-12 w-12 text-emerald-500 mb-3" />
                <CardTitle>Legal Entities Formed</CardTitle>
                <CardDescription>US (PBC) and Estonia operations established for global reach</CardDescription>
              </CardHeader>
            </Card>

            <Card className="traction-card">
              <CardHeader>
                <Target className="h-12 w-12 text-red-500 mb-3" />
                <CardTitle>Fortune 50 Interest</CardTitle>
                <CardDescription>Early pilot discussions with enterprise partners for workforce safety</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <FounderSection />

      {/* Business Model */}
      <section className="business-model-section">
        <div className="section-container">
          <div className="section-header-center">
            <Badge className="section-badge">Business Model</Badge>
            <h2 className="section-title-large">Scalable SaaS Revenue</h2>
          </div>

          <div className="business-model-grid">
            <Card className="business-model-card">
              <CardHeader>
                <CardTitle>SaaS Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="model-description">Tiered by features and organization size with flexible monthly and annual billing</p>
                <div className="model-metrics">
                  <div className="metric-item">
                    <span className="metric-label">Average ACV</span>
                    <span className="metric-value">€120K</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Target Customer</span>
                    <span className="metric-value">Fortune 5000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="business-model-card">
              <CardHeader>
                <CardTitle>Enterprise Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="model-description">Custom reports, API integrations, and premium support for large-scale deployments</p>
                <div className="model-metrics">
                  <div className="metric-item">
                    <span className="metric-label">Revenue Type</span>
                    <span className="metric-value">High-Margin</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Contracts</span>
                    <span className="metric-value">Multi-Year</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="business-model-card">
              <CardHeader>
                <CardTitle>Freemium Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="model-description">Free tier for grassroots organizations to drive adoption and social impact</p>
                <div className="model-metrics">
                  <div className="metric-item">
                    <span className="metric-label">Strategy</span>
                    <span className="metric-value">Land & Expand</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Impact</span>
                    <span className="metric-value">Community Trust</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use of Funds */}
      <section className="use-of-funds-section">
        <div className="section-container">
          <div className="section-header-center">
            <Badge className="section-badge">Investment</Badge>
            <h2 className="section-title-large">€750K SAFE / Equity</h2>
            <p className="section-subtitle">Funds allocated to scale platform and accelerate go-to-market</p>
          </div>

          <div className="funds-allocation">
            <div className="funds-chart">
              <div className="fund-item" style={{width: '45%'}}>
                <div className="fund-bar engineering"></div>
                <div className="fund-details">
                  <span className="fund-category">Engineering & Product</span>
                  <span className="fund-amount">45%</span>
                </div>
                <p className="fund-description">Scale platform capabilities, deliver enterprise-grade features, expand QSI to 50+ cities</p>
              </div>

              <div className="fund-item" style={{width: '30%'}}>
                <div className="fund-bar data"></div>
                <div className="fund-details">
                  <span className="fund-category">Data Integrations</span>
                  <span className="fund-amount">30%</span>
                </div>
                <p className="fund-description">API partnerships, enhance analytics, expand proprietary data sources</p>
              </div>

              <div className="fund-item" style={{width: '25%'}}>
                <div className="fund-bar team"></div>
                <div className="fund-details">
                  <span className="fund-category">Team Growth</span>
                  <span className="fund-amount">25%</span>
                </div>
                <p className="fund-description">Estonia and Berlin expansion, customer success, go-to-market execution</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="investor-contact-section" id="contact">
        <div className="investor-contact-container">
          <div className="contact-content">
            <h2 className="contact-title">Ready to Invest?</h2>
            <p className="contact-subtitle">
              Join us in capturing the $63B ESG market opportunity and making the world measurably safer for LGBTQ+ communities.
            </p>
            <div className="contact-info">
              <div className="info-item">
                <Mail className="h-5 w-5" />
                <a href="mailto:levi@vectorforgood.com">levi@vectorforgood.com</a>
              </div>
            </div>
          </div>

          <Card className="investor-contact-form-card">
            <CardHeader>
              <CardTitle>Schedule Investor Call</CardTitle>
              <CardDescription>We'll respond within 24 hours to discuss the opportunity</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Jane Smith"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="jane@vc-firm.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Firm / Organization</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Venture Capital Firm"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Investment Interest</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="form-textarea"
                    placeholder="Tell us about your investment focus and interest in Vector for Good..."
                  />
                </div>
                <Button type="submit" size="lg" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Schedule Call <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="investor-footer">
        <div className="investor-footer-content">
          <p>&copy; 2025 Vector for Good. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/">Enterprise</Link>
            <Link to="/community">Community</Link>
            <Link to="/demo">Live Demo</Link>
            <a href="mailto:levi@vectorforgood.com">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InvestorPage;
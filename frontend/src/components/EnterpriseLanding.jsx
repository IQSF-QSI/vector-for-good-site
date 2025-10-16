import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ArrowRight, Shield, Globe, Users, TrendingUp, Brain, CheckCircle, Target, Award, BarChart3, Lock, Loader2, DollarSign, AlertTriangle, FileCheck, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { MOCK_DATA } from '../mock';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const EnterpriseLanding = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qsiMetrics, setQsiMetrics] = useState([]);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(true);

  useEffect(() => {
    fetchQSIMetrics();
  }, []);

  const fetchQSIMetrics = async () => {
    try {
      setIsLoadingMetrics(true);
      const response = await axios.get(`${API}/qsi-metrics`);
      if (response.data.success) {
        setQsiMetrics(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching QSI metrics:', error);
      setQsiMetrics(MOCK_DATA.qsiCities);
    } finally {
      setIsLoadingMetrics(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/demo-requests`, formData);
      
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({ name: '', email: '', company: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting demo request:', error);
      const errorMessage = error.response?.data?.detail || 'Failed to submit demo request. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <img 
              src="https://customer-assets.emergentagent.com/job_46189f81-3b3a-4aa4-aac3-2ab4e4427fc1/artifacts/e5ypx4zy_EEF96F90-7D62-411E-92B2-8B4BF5630EF7.PNG" 
              alt="Vector for Good Logo" 
              className="logo-img"
            />
          </div>
          <nav className="nav-menu">
            <a href="#solutions" className="nav-link" onClick={(e) => { e.preventDefault(); document.getElementById('solutions').scrollIntoView({ behavior: 'smooth' }); }}>Solutions</a>
            <a href="#roi" className="nav-link" onClick={(e) => { e.preventDefault(); document.getElementById('roi').scrollIntoView({ behavior: 'smooth' }); }}>ROI</a>
            <Link to="/demo" className="nav-link">Live QSI</Link>
            <a href="#security" className="nav-link" onClick={(e) => { e.preventDefault(); document.getElementById('security').scrollIntoView({ behavior: 'smooth' }); }}>Security</a>
            <Link to="/community" className="nav-link">Our Story</Link>
            <Button className="demo-btn-header" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Request Demo</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <Badge className="hero-badge">Enterprise LGBTQ+ Safety Intelligence</Badge>
          <h1 className="hero-title">
            Protect Your People.
            <span className="gradient-text"> Quantify Your Impact.</span>
          </h1>
          <p className="hero-subtitle">
            Transform ESG compliance into competitive advantage with real-time LGBTQ+ safety analytics across 19+ global markets. 
            Reduce liability, improve retention, and demonstrate measurable social impact to investors.
          </p>
          <div className="hero-cta">
            <Button size="lg" className="primary-cta" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              Schedule Enterprise Demo <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="secondary-cta">
                Try Live QSI Demo
              </Button>
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">$2.4M</div>
              <div className="stat-label">Avg. Annual Savings</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">35%</div>
              <div className="stat-label">ESG Score Improvement</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">27%</div>
              <div className="stat-label">Attrition Reduction</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <img 
            src="https://customer-assets.emergentagent.com/job_46189f81-3b3a-4aa4-aac3-2ab4e4427fc1/artifacts/8fbo6brx_Gemini_Generated_Image_kwud8dkwud8dkwud.png" 
            alt="Vector for Good Platform" 
            className="hero-image"
          />
        </div>
      </section>

      {/* Trust Bar */}
      <section className="trust-section">
        <div className="section-container">
          <div className="trust-content">
            <p className="trust-label">Built by LGBTQ+ technologists. Trusted by advocacy groups. Validated by Fortune 50 enterprises.</p>
            <div className="trust-badge">
              <img 
                src="https://customer-assets.emergentagent.com/job_46189f81-3b3a-4aa4-aac3-2ab4e4427fc1/artifacts/q42s839g_nvidia-inception-program-badge-rgb-1c-blk-for-screen.svg" 
                alt="NVIDIA Inception Program" 
                className="nvidia-badge"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Cost Section */}
      <section className="problem-solution-section">
        <div className="section-container">
          <div className="problem-block">
            <div className="icon-wrapper problem-icon">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h2 className="section-title">The $150M Risk</h2>
            <p className="section-description">
              LGBTQ+ employees face tangible safety risks in global operations, creating liability exposure, talent attrition, and ESG compliance gaps that traditional platforms cannot measure or mitigate.
            </p>
            <ul className="challenge-list">
              <li><CheckCircle className="h-5 w-5 text-red-500" /> <strong>71%</strong> avoid public spaces due to safety fears</li>
              <li><CheckCircle className="h-5 w-5 text-red-500" /> <strong>27% higher attrition</strong> without proper duty of care</li>
              <li><CheckCircle className="h-5 w-5 text-red-500" /> <strong>Generic ESG tools</strong> lack geo-contextual LGBTQ+ data</li>
              <li><CheckCircle className="h-5 w-5 text-red-500" /> <strong>Investor scrutiny</strong> on social impact transparency</li>
            </ul>
          </div>

          <div className="solution-block">
            <div className="icon-wrapper solution-icon">
              <Shield className="h-8 w-8" />
            </div>
            <h2 className="section-title">Enterprise-Grade Solution</h2>
            <p className="section-description">
              The only platform providing real-time, geo-contextual LGBTQ+ safety intelligence with privacy-preserving data architecture and intersectional risk analytics—built for enterprise compliance and scale.
            </p>
            <ul className="solution-list">
              <li><CheckCircle className="h-5 w-5 text-emerald-500" /> <strong>Duty of Care Compliance</strong> - Legal obligation fulfillment</li>
              <li><CheckCircle className="h-5 w-5 text-emerald-500" /> <strong>Quantifiable ESG Metrics</strong> - Investor-grade reporting</li>
              <li><CheckCircle className="h-5 w-5 text-emerald-500" /> <strong>Real-Time Risk Intelligence</strong> - 19+ global markets</li>
              <li><CheckCircle className="h-5 w-5 text-emerald-500" /> <strong>Privacy-First Architecture</strong> - GDPR/SOC 2 compliant</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="solutions-section" id="solutions">
        <div className="section-container">
          <div className="section-header-center">
            <Badge className="section-badge">Enterprise Solutions</Badge>
            <h2 className="section-title-large">Fortune 50 Solutions Portfolio</h2>
            <p className="section-subtitle">
              Comprehensive risk mitigation and ESG intelligence tailored for global enterprises
            </p>
          </div>

          <div className="solutions-grid">
            {MOCK_DATA.fortune50Solutions.map((solution, index) => (
              <Card key={index} className="solution-card">
                <CardHeader>
                  <div className="solution-icon-wrapper">
                    {solution.icon}
                  </div>
                  <CardTitle className="solution-card-title">{solution.title}</CardTitle>
                  <CardDescription className="solution-card-description">{solution.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="solution-features">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="solution-feature">
                        <CheckCircle className="h-4 w-4" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="solution-impact">
                    <strong>Measured Impact:</strong> {solution.impact}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="roi-section" id="roi">
        <div className="section-container">
          <div className="section-header-center">
            <Badge className="section-badge">Business Value</Badge>
            <h2 className="section-title-large">Quantifiable ROI for Enterprises</h2>
            <p className="section-subtitle">
              Vector for Good delivers measurable business outcomes across risk mitigation, talent retention, and ESG performance
            </p>
          </div>

          <div className="roi-grid">
            <Card className="roi-card">
              <CardHeader>
                <DollarSign className="h-8 w-8 text-emerald-500" />
                <CardTitle>Cost Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="roi-value">$2.4M</div>
                <p className="roi-description">Average annual reduction in ESG compliance costs, crisis management, and talent replacement expenses</p>
              </CardContent>
            </Card>

            <Card className="roi-card">
              <CardHeader>
                <Users className="h-8 w-8 text-blue-500" />
                <CardTitle>Talent Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="roi-value">27%</div>
                <p className="roi-description">Reduction in LGBTQ+ employee attrition, saving $150K+ per retained senior employee</p>
              </CardContent>
            </Card>

            <Card className="roi-card">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-purple-500" />
                <CardTitle>ESG Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="roi-value">35%</div>
                <p className="roi-description">Improvement in social dimension ESG scores, directly impacting investor confidence and capital access</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="security-section" id="security">
        <div className="section-container">
          <div className="section-header-center">
            <Badge className="section-badge">Enterprise Security</Badge>
            <h2 className="section-title-large">Built for Enterprise Compliance</h2>
          </div>

          <div className="security-grid">
            <Card className="security-card">
              <CardHeader>
                <Lock className="h-8 w-8" />
                <CardTitle>Privacy-Preserving Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <p>GDPR compliant, SOC 2 Type II certified, zero-knowledge encryption for sensitive data</p>
              </CardContent>
            </Card>

            <Card className="security-card">
              <CardHeader>
                <FileCheck className="h-8 w-8" />
                <CardTitle>Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Meets EU Corporate Sustainability Reporting Directive (CSRD) and SEC climate disclosure requirements</p>
              </CardContent>
            </Card>

            <Card className="security-card">
              <CardHeader>
                <Briefcase className="h-8 w-8" />
                <CardTitle>Enterprise Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p>SSO/SAML support, API-first architecture, compatible with Workday, SAP, and major HRIS platforms</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="impact-section">
        <div className="section-container">
          <div className="section-header-center">
            <Badge className="section-badge">Proven Results</Badge>
            <h2 className="section-title-large">Enterprise Success Stories</h2>
          </div>

          <Accordion type="single" collapsible className="case-studies-accordion">
            {MOCK_DATA.caseStudies.map((study, index) => (
              <AccordionItem key={index} value={`case-${index}`} className="case-study-item">
                <AccordionTrigger className="case-study-trigger">
                  <div className="case-study-header">
                    <Award className="h-5 w-5" />
                    <span className="case-study-company">{study.company}</span>
                    <Badge className="case-study-industry">{study.industry}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="case-study-content">
                  <div className="case-study-detail">
                    <p className="case-challenge"><strong>Business Challenge:</strong> {study.challenge}</p>
                    <p className="case-solution"><strong>Vector for Good Solution:</strong> {study.solution}</p>
                    <div className="case-results">
                      <strong>Measured Results:</strong>
                      <ul>
                        {study.results.map((result, idx) => (
                          <li key={idx}>{result}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="contact">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Mitigate Risk and Quantify Impact?</h2>
            <p className="cta-subtitle">
              Join Fortune 50 enterprises transforming LGBTQ+ employee safety from compliance burden to competitive advantage. Schedule your personalized demo and ROI analysis.
            </p>
            <div style={{marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.125rem'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <a href="mailto:levi@vectorforgood.com" style={{color: 'inherit', textDecoration: 'none', fontWeight: '600'}}>levi@vectorforgood.com</a>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.125rem'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                <a href="https://vectorforgood.com" target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none', fontWeight: '600'}}>vectorforgood.com</a>
              </div>
            </div>
          </div>

          <Card className="demo-form-card">
            <CardHeader>
              <CardTitle>Request Enterprise Demo</CardTitle>
              <CardDescription>Speak with our enterprise solutions team within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="demo-form">
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
                    placeholder="John Smith"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Work Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="john.smith@company.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Fortune 500 Company"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Primary Challenge or Use Case</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="form-textarea"
                    placeholder="e.g., Need duty of care compliance for 5,000 employees across 15 countries..."
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
                      Schedule Demo <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-title">Vector for Good</h4>
            <p className="footer-description">
              Enterprise LGBTQ+ safety intelligence platform trusted by Fortune 50 companies worldwide.
            </p>
            <div className="footer-nonprofit">
              <Lock className="h-4 w-4" />
              <span>Public Benefit Corporation</span>
            </div>
            <p className="footer-description" style={{marginTop: '0.75rem', color: 'hsl(0, 0%, 70%)'}}>Powered by IQSF (International Queer Safety Foundation) 501(c)(3)</p>
            <div style={{marginTop: '1.5rem'}}>
              <img 
                src="https://customer-assets.emergentagent.com/job_46189f81-3b3a-4aa4-aac3-2ab4e4427fc1/artifacts/q42s839g_nvidia-inception-program-badge-rgb-1c-blk-for-screen.svg" 
                alt="NVIDIA Inception Program" 
                style={{height: '40px', width: 'auto', filter: 'brightness(0) invert(1)'}}
              />
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Solutions</h4>
            <ul className="footer-links">
              <li><a href="#solutions" onClick={(e) => { e.preventDefault(); document.getElementById('solutions').scrollIntoView({ behavior: 'smooth' }); }}>Global Workforce Safety</a></li>
              <li><a href="#solutions" onClick={(e) => { e.preventDefault(); document.getElementById('solutions').scrollIntoView({ behavior: 'smooth' }); }}>ESG Reporting</a></li>
              <li><a href="#solutions" onClick={(e) => { e.preventDefault(); document.getElementById('solutions').scrollIntoView({ behavior: 'smooth' }); }}>Brand Safety</a></li>
              <li><a href="#solutions" onClick={(e) => { e.preventDefault(); document.getElementById('solutions').scrollIntoView({ behavior: 'smooth' }); }}>Talent Acquisition</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><Link to="/community">Our Story</Link></li>
              <li><a href="https://vectorforgood.com" target="_blank" rel="noopener noreferrer">About Us</a></li>
              <li><a href="mailto:levi@vectorforgood.com">Careers</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }}>Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Resources</h4>
            <ul className="footer-links">
              <li><a href="#roi" onClick={(e) => { e.preventDefault(); document.getElementById('roi').scrollIntoView({ behavior: 'smooth' }); }}>ROI Calculator</a></li>
              <li><a href="#security" onClick={(e) => { e.preventDefault(); document.getElementById('security').scrollIntoView({ behavior: 'smooth' }); }}>Security & Compliance</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }}>API Documentation</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }}>Request Demo</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Vector for Good. All rights reserved. Built by the community, trusted by enterprises.</p>
          <div className="footer-legal">
            <a href="mailto:levi@vectorforgood.com">Contact Us</a>
            <a href="https://vectorforgood.com" target="_blank" rel="noopener noreferrer">vectorforgood.com</a>
            <Link to="/community">Community Impact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnterpriseLanding;
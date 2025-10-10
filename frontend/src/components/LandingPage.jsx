import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ArrowRight, Shield, Globe, Users, TrendingUp, Brain, Zap, CheckCircle, Target, Award, BarChart3, Lock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { MOCK_DATA } from '../mock';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LandingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qsiMetrics, setQsiMetrics] = useState([]);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(true);

  // Fetch QSI metrics on component mount
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
      toast.error('Failed to load QSI metrics. Using cached data.');
      // Fallback to mock data
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
              src="https://customer-assets.emergentagent.com/job_46189f81-3b3a-4aa4-aac3-2ab4e4427fc1/artifacts/428w8e7e_queer-inteligence-qi.png" 
              alt="Queer Intelligence Logo" 
              className="logo-img"
            />
            <span className="logo-text">Vector for Good</span>
          </div>
          <nav className="nav-menu">
            <a href="#solutions" className="nav-link">Solutions</a>
            <a href="#technology" className="nav-link">Technology</a>
            <a href="#impact" className="nav-link">Impact</a>
            <a href="#contact" className="nav-link">Contact</a>
            <Button className="demo-btn-header">Request Demo</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <Badge className="hero-badge">Revolutionizing ESG Intelligence</Badge>
          <h1 className="hero-title">
            Unlock the "S" in ESG with
            <span className="gradient-text"> Queer Intelligence</span>
          </h1>
          <p className="hero-subtitle">
            The first AI platform delivering quantifiable social impact metrics through multi-LLM collaborative intelligence. 
            Transform ESG reporting from checkbox compliance to competitive advantage.
          </p>
          <div className="hero-cta">
            <Button size="lg" className="primary-cta">
              Request Enterprise Demo <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="secondary-cta">
              View QSI Metrics
            </Button>
          </div>
          <div className="hero-stats">
            {MOCK_DATA.heroStats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <img 
            src="https://customer-assets.emergentagent.com/job_46189f81-3b3a-4aa4-aac3-2ab4e4427fc1/artifacts/8fbo6brx_Gemini_Generated_Image_kwud8dkwud8dkwud.png" 
            alt="Queer Intelligence Platform" 
            className="hero-image"
          />
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="problem-solution-section">
        <div className="section-container">
          <div className="problem-block">
            <div className="icon-wrapper problem-icon">
              <Target className="h-8 w-8" />
            </div>
            <h2 className="section-title">The ESG Challenge</h2>
            <p className="section-description">
              While Environmental and Governance metrics have clear frameworks, the "Social" component remains 
              the most difficult to quantify, measure, and report. Standard AI approaches miss cultural nuance, 
              intersectionality, and authentic inclusion signals.
            </p>
            <ul className="challenge-list">
              <li><CheckCircle className="h-5 w-5 text-red-500" /> No standardized social impact metrics</li>
              <li><CheckCircle className="h-5 w-5 text-red-500" /> "Rainbow washing" vs. genuine inclusion</li>
              <li><CheckCircle className="h-5 w-5 text-red-500" /> Hidden workforce safety risks</li>
              <li><CheckCircle className="h-5 w-5 text-red-500" /> Insufficient investor transparency</li>
            </ul>
          </div>

          <div className="solution-block">
            <div className="icon-wrapper solution-icon">
              <Brain className="h-8 w-8" />
            </div>
            <h2 className="section-title">The QI Solution</h2>
            <p className="section-description">
              Queer Intelligence isn't just another AI model—it's a paradigm shift. Our hidden relay system 
              orchestrates 4 specialized LLMs (GPT-4, Gemini, Hermes, Mistral) in collaborative deliberation, 
              mimicking diverse team intelligence rather than singular AI reasoning.
            </p>
            <ul className="solution-list">
              <li><CheckCircle className="h-5 w-5 text-emerald-500" /> Real-time Global Queer Safety Index (QSI)</li>
              <li><CheckCircle className="h-5 w-5 text-emerald-500" /> Quantifiable "S" metrics for ESG reporting</li>
              <li><CheckCircle className="h-5 w-5 text-emerald-500" /> Multi-LLM collaborative intelligence</li>
              <li><CheckCircle className="h-5 w-5 text-emerald-500" /> Built by queer for queer authenticity</li>
            </ul>
          </div>
        </div>
      </section>

      {/* QI Technology Deep Dive */}
      <section className="technology-section" id="technology">
        <div className="section-container">
          <div className="section-header-center">
            <Badge className="section-badge">Revolutionary Technology</Badge>
            <h2 className="section-title-large">The QI Advantage: Beyond Standard AI</h2>
            <p className="section-subtitle">
              Discover how Queer Intelligence delivers superior insights through collaborative multi-model deliberation
            </p>
          </div>

          <div className="tech-grid">
            {MOCK_DATA.qiAdvantages.map((advantage, index) => (
              <Card key={index} className="tech-card">
                <CardHeader>
                  <div className="tech-icon">{advantage.icon}</div>
                  <CardTitle className="tech-card-title">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="tech-card-description">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="qi-process">
            <h3 className="process-title">How QI Works: The Hidden Relay System</h3>
            <div className="process-steps">
              {MOCK_DATA.qiProcess.map((step, index) => (
                <div key={index} className="process-step">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">
                    <h4 className="step-title">{step.title}</h4>
                    <p className="step-description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fortune 50 Solutions */}
      <section className="solutions-section" id="solutions">
        <div className="section-container">
          <div className="section-header-center">
            <Badge className="section-badge">Enterprise Solutions</Badge>
            <h2 className="section-title-large">Fortune 50 Solutions Portfolio</h2>
            <p className="section-subtitle">
              Tailored QI solutions that transform your ESG strategy from compliance burden to competitive advantage
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
                    <strong>Impact:</strong> {solution.impact}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global QSI Metrics */}
      <section className="qsi-metrics-section">
        <div className="section-container">
          <div className="section-header-center">
            <Badge className="section-badge">Live Intelligence</Badge>
            <h2 className="section-title-large">Global Queer Safety Index</h2>
            <p className="section-subtitle">
              Real-time LGBTQ+ inclusion metrics across 19+ global cities—the first comprehensive social impact benchmark for ESG
            </p>
          </div>

          <div className="qsi-grid">
            {isLoadingMetrics ? (
              // Loading skeleton
              Array(6).fill(0).map((_, index) => (
                <Card key={index} className="qsi-card">
                  <CardHeader className="qsi-card-header">
                    <div className="qsi-city-info">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-12 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              qsiMetrics.map((city, index) => (
                <Card key={index} className="qsi-card">
                <CardHeader className="qsi-card-header">
                  <div className="qsi-city-info">
                    <Globe className="h-5 w-5" />
                    <CardTitle className="qsi-city-name">{city.name}</CardTitle>
                  </div>
                  <div className={`qsi-score score-${city.rating}`}>{city.score}</div>
                </CardHeader>
                <CardContent>
                  <div className="qsi-metrics">
                    <div className="qsi-metric">
                      <span className="metric-label">Legal Protection</span>
                      <div className="metric-bar">
                        <div className="metric-fill" style={{width: `${city.legalProtection}%`}}></div>
                      </div>
                    </div>
                    <div className="qsi-metric">
                      <span className="metric-label">Social Acceptance</span>
                      <div className="metric-bar">
                        <div className="metric-fill" style={{width: `${city.socialAcceptance}%`}}></div>
                      </div>
                    </div>
                    <div className="qsi-metric">
                      <span className="metric-label">Safety Index</span>
                      <div className="metric-bar">
                        <div className="metric-fill" style={{width: `${city.safetyIndex}%`}}></div>
                      </div>
                    </div>
                  </div>
                  <Badge className={`qsi-trend trend-${city.trend}`}>{city.trend}</Badge>
                </CardContent>
              </Card>
              ))
            )}
          </div>
          {!isLoadingMetrics && qsiMetrics.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No QSI metrics available at the moment.
            </div>
          )}
        </div>
      </section>

      {/* Impact & Case Studies */}
      <section className="impact-section" id="impact">
        <div className="section-container">
          <div className="section-header-center">
            <Badge className="section-badge">Proven Results</Badge>
            <h2 className="section-title-large">The Business Impact</h2>
            <p className="section-subtitle">
              Fortune 50 companies implementing QI solutions see measurable improvements across all ESG dimensions
            </p>
          </div>

          <div className="impact-stats-grid">
            {MOCK_DATA.businessImpact.map((stat, index) => (
              <Card key={index} className="impact-stat-card">
                <CardContent className="impact-stat-content">
                  <div className="impact-stat-value">{stat.value}</div>
                  <div className="impact-stat-label">{stat.label}</div>
                  <div className="impact-stat-description">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="case-studies">
            <h3 className="case-studies-title">Enterprise Success Stories</h3>
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
                      <p className="case-challenge"><strong>Challenge:</strong> {study.challenge}</p>
                      <p className="case-solution"><strong>Solution:</strong> {study.solution}</p>
                      <div className="case-results">
                        <strong>Results:</strong>
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="contact">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your ESG Strategy?</h2>
            <p className="cta-subtitle">
              Join Fortune 50 leaders who are unlocking the full potential of the "S" in ESG with Queer Intelligence.
              Schedule your personalized demo today.
            </p>
          </div>

          <Card className="demo-form-card">
            <CardHeader>
              <CardTitle>Request Enterprise Demo</CardTitle>
              <CardDescription>We'll contact you within 24 hours to schedule your personalized QI demonstration</CardDescription>
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
                  <label htmlFor="message">How can QI help your organization?</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="form-textarea"
                    placeholder="Tell us about your ESG goals and challenges..."
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
                      Request Demo <ArrowRight className="ml-2 h-5 w-5" />
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
              A Public Benefit Corporation revolutionizing ESG with Queer Intelligence—the first AI platform delivering quantifiable social impact metrics.
            </p>
            <div className="footer-nonprofit">
              <Lock className="h-4 w-4" />
              <span>Public Benefit Corporation</span>
            </div>
            <p className="footer-description" style={{fontSize: '0.875rem', marginTop: '0.5rem', color: 'hsl(0, 0%, 70%)'}}>
              Powered by IQSF (International Queer Safety Foundation) 501(c)(3)
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Solutions</h4>
            <ul className="footer-links">
              <li><a href="#">Global Workforce Safety</a></li>
              <li><a href="#">ESG Reporting</a></li>
              <li><a href="#">Brand Safety</a></li>
              <li><a href="#">Talent Acquisition</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Technology</h4>
            <ul className="footer-links">
              <li><a href="#">Queer Intelligence</a></li>
              <li><a href="#">Global QSI</a></li>
              <li><a href="#">Multi-LLM Platform</a></li>
              <li><a href="#">API Access</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Impact Report</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Vector for Good. All rights reserved. Built for queer by queer.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Data Protection</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;